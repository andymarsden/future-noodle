import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { qriosFormFlow } from '../qrios.js';
import { executeCommand } from '../../commands/execute.js';

const POSTCODE_LOOKUP_API = "https://infojam.app.n8n.cloud/webhook/8b3f24d0-1cfd-457f-ab50-431eb33ab5df";

describe('qriosFormFlow Demographics Postcode Integration', () => {

	describe('Form Step Configuration', () => {
		it('should have demographics_postcode at index 5', () => {
			const step = qriosFormFlow.steps[5];
			expect(step).toBeDefined();
			expect(step.index).toBe(5);
			expect(step.id).toBe('demographics_postcode');
		});

		it('should have demographics_postcode configured with util.getPostcodeInfo command', () => {
			const step = qriosFormFlow.steps[5];
			expect(step.command).toBe('util.getPostcodeInfo');
			expect(step.name).toBe('Ward');
			expect(step.question).toBe('What is your postcode?');
			expect(step.section).toBe('demographics');
		});
	});

	describe('util.getPostcodeInfo Command Execution', () => {
		let fetchMock;

		beforeEach(() => {
			// Mock global fetch
			fetchMock = vi.fn();
			global.fetch = fetchMock;
		});

		afterEach(() => {
			vi.restoreAllMocks();
		});

		it('should execute util.getPostcodeInfo command successfully with valid postcode', async () => {
			const mockWard = 'Ward Name';
			const testPayload = {
				answer: 'SW1A2AA'
			};

			// Mock successful API response
			fetchMock.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					admin_ward: mockWard
				})
			});

			const result = await executeCommand('util.getPostcodeInfo', testPayload);

			// Verify fetch was called with correct parameters
			expect(fetchMock).toHaveBeenCalledTimes(1);
			expect(fetchMock).toHaveBeenCalledWith(
				POSTCODE_LOOKUP_API,
				expect.objectContaining({
					method: 'POST',
					headers: expect.objectContaining({
						'Content-Type': 'application/json'
					}),
					body: JSON.stringify({ postcode: 'SW1A2AA' })
				})
			);

			// Verify response structure
			expect(result).toEqual({
				pre_text: `You entered the postcode: **SW1A2AA**. I have saved the ward of **${mockWard}** rather than the postcode itself.\n\n`,
				data: mockWard
			});
		});

		it('should handle API failure gracefully with fallback to raw postcode', async () => {
			const testPayload = {
				answer: 'INVALID123'
			};

			// Mock failed API response
			fetchMock.mockResolvedValueOnce({
				ok: false,
				status: 400
			});

			const result = await executeCommand('util.getPostcodeInfo', testPayload);

			expect(result).toEqual({
				pre_text: 'Unable to resolve the postcode. Saving the entered value instead.',
				data: 'INVALID123'
			});
		});

		it('should handle network errors gracefully', async () => {
			const testPayload = {
				answer: 'SW1A2AA'
			};

			// Mock network error
			fetchMock.mockRejectedValueOnce(new Error('Network error'));

			const result = await executeCommand('util.getPostcodeInfo', testPayload);

			expect(result).toEqual({
				pre_text: 'Unable to resolve the postcode. Saving the entered value instead.',
				data: 'SW1A2AA'
			});
		});

		it('should handle API response without admin_ward field', async () => {
			const testPayload = {
				answer: 'SW1A2AA'
			};

			// Mock API response without admin_ward
			fetchMock.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					some_other_field: 'value'
				})
			});

			const result = await executeCommand('util.getPostcodeInfo', testPayload);

			expect(result).toEqual({
				pre_text: 'Unable to resolve the postcode. Saving the entered value instead.',
				data: 'SW1A2AA'
			});
		});

		it('should correctly format various valid postcodes', async () => {
			const testCases = [
				{ postcode: 'M11AA', ward: 'Manchester Ward' },
				{ postcode: 'B334TH', ward: 'Birmingham Ward' },
				{ postcode: 'EH81DH', ward: 'Edinburgh Ward' }
			];

			for (const testCase of testCases) {
				fetchMock.mockResolvedValueOnce({
					ok: true,
					json: async () => ({
						admin_ward: testCase.ward
					})
				});

				const result = await executeCommand('util.getPostcodeInfo', {
					answer: testCase.postcode
				});

				expect(result.data).toBe(testCase.ward);
				expect(result.pre_text).toContain(testCase.postcode);
				expect(result.pre_text).toContain(testCase.ward);
			}
		});
	});
});
