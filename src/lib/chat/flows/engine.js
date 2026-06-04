//flows engine\
import { onboardFlow } from "./onboard";
import { rugbyFlow } from "./rugby";
import { qriosWelcomeFlow } from "./qrios_welcome";

export const flowRegistry = {
    "onboard": onboardFlow,
    "rugby" : rugbyFlow,
    "qrios_welcome": qriosWelcomeFlow,
};