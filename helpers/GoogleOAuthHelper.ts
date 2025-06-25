import { expect, Page } from "@playwright/test";

export async function signInWithGoogle(
  page: Page,
  userEmail: string,
  userPassword: string
) {
  const nextButton = page.getByRole("button", { name: "Next" })
  const continueWithGoogleButton = page.getByRole("button", { name: /continue with google/i })

  await expect(continueWithGoogleButton).toBeVisible();
  await continueWithGoogleButton.click();

  await page.getByLabel("Email or phone").fill(userEmail);
  await nextButton.click();
  await page.getByLabel("Enter your password").fill(userPassword);
  await nextButton.click();
}
