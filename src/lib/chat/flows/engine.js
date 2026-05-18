//flows engine\
import { onboardFlow } from "./onboard";
import { rugbyFlow } from "./rugby";

export const flowRegistry = {
    "onboard": onboardFlow,
    "rugby" : rugbyFlow
};