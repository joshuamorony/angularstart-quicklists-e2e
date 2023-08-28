import { test, expect, type Page } from "@playwright/test";
import { ChecklistPage } from "./checklist.po";

let checklistPage: ChecklistPage;
let currentPage: Page;

test.beforeEach(async ({ page }) => {
  checklistPage = new ChecklistPage(page);
  currentPage = page;
  await checklistPage.goto();
});

test("no checklist items message displayed", async () => {
  await expect(checklistPage.noChecklistItemsMessage).toBeVisible();
});