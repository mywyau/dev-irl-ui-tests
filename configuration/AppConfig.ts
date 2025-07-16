// ./configuration/Appconfig

import * as dotenv from "dotenv";

// #####################

export const devEmail1 =
  process.env.DEV_EMAIL_1 || "No client email defined for USER_DEV_EMAIL_1";
export const devPassword1 =
  process.env.DEV_PASSWORD_1 || "No client password defined for DEV_PASSWORD_1";

export const devEmail2 =
  process.env.DEV_EMAIL_2 || "No client email defined for DEV_EMAIL_2";
export const devPassword2 =
  process.env.DEV_PASSWORD_2 || "No client password defined for DEV_PASSWORD_2";

export const devEmail3 =
  process.env.DEV_EMAIL_3 || "No client email defined for DEV_EMAIL_3";
export const devPassword3 =
  process.env.DEV_PASSWORD_3 || "No client password defined for DEV_PASSWORD_3";

export const devEmail4 =
  process.env.DEV_EMAIL_4 || "No client email defined for DEV_EMAIL_4";
export const devPassword4 =
  process.env.DEV_PASSWORD_4 || "No client password defined for DEV_PASSWORD_4";

// #####################

export const clientEmail1 =
  process.env.CLIENT_EMAIL_1 || "No client email defined for CLIENT_EMAIL_1";
export const clientPassword1 =
  process.env.CLIENT_PASSWORD_1 ||
  "No client password defined for CLIENT_PASSWORD_1";

export const clientEmail2 =
  process.env.CLIENT_EMAIL_2 || "No client email defined for CLIENT_EMAIL_2";
export const clientPassword2 =
  process.env.CLIENT_PASSWORD_2 ||
  "No client password defined for CLIENT_PASSWORD_2";

export const clientEmail3 =
  process.env.CLIENT_EMAIL_3 || "No client email defined for CLIENT_EMAIL_3";
export const clientPassword3 =
  process.env.CLIENT_PASSWORD_3 ||
  "No client password defined for CLIENT_PASSWORD_3";

export const clientEmail4 =
  process.env.CLIENT_EMAIL_4 || "No client email defined for CLIENT_EMAIL_4";
export const clientPassword4 =
  process.env.CLIENT_PASSWORD_4 ||
  "No client password defined for CLIENT_PASSWORD_4";
