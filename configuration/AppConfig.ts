// ./configuration/Appconfig

import * as dotenv from "dotenv";

export const testDevUserEmail1 = process.env.TEST_USER_DEV_EMAIL || "No client email defined for TEST_USER_DEV_EMAIL"; 
export const testDevUserPassword1 = process.env.TEST_USER_DEV_PASSWORD || "No client password defined for TEST_USER_DEV_PASSWORD"; 

export const testDevUserEmail2 = process.env.TEST_USER_DEV2_EMAIL || "No client email defined for TEST_USER_DEV2_EMAIL"; 
export const testDevUserPassword2 = process.env.TEST_USER_DEV2_PASSWORD || "No client password defined for TEST_USER_DEV2_PASSWORD"; 

export const testClientUserEmail1 = process.env.TEST_USER_CLIENT_EMAIL || "No client email defined for TEST_USER_CLIENT_EMAIL"; 
export const testClientUserPassword1 = process.env.TEST_USER_CLIENT_PASSWORD || "No client password defined for TEST_USER_CLIENT_PASSWORD"; 

export const testClientUserEmail2 = process.env.TEST_USER_CLIENT2_EMAIL || "No client email defined for TEST_USER_CLIENT2_EMAIL"; 
export const testClientUserPassword2 = process.env.TEST_USER_CLIENT2_PASSWORD || "No client password defined for TEST_USER_CLIENT2_PASSWORD"; 