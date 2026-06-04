//flows engine\
import { onboardFlow } from "./onboard";
import { rugbyFlow } from "./rugby";
import { qriosWelcomeFlow } from "./qrios_welcome";
import { qriosFormFlow } from "./qrios";
import { qriosFormSpanishFlow } from "./qrios_spanish";

export const flowRegistry = {
    "onboard": onboardFlow,
    "rugby" : rugbyFlow,
    "qrios_welcome": qriosWelcomeFlow,
    "qrios_form": qriosFormFlow,
    "qrios_form_spanish": qriosFormSpanishFlow
};