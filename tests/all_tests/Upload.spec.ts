// These tests bleed into each other i.e. they sequentially set next test up with data creation, edits etc.

// Note to self do not let tests/app/data state bleed from one spec to another. As a necessary evil keep within the same spec.

import { expect, test } from "@playwright/test";

import {
  testClientUserEmail2,
  testClientUserPassword2,
  testDevUserEmail1,
  testDevUserPassword1,
} from "@/configuration/Appconfig";

import { clientQuestElements } from "@/pages/ClientQuestPage";
import { devQuestElements } from "@/pages/DevQuestPage";



test("Developer when the task is in progress can upload a file", async ({ page }) => {




});

test("Developer when the task is in review can upload a file", async ({ page }) => {




});


test("Client is able to download a file uploaded by the dev", async ({ page }) => {




});