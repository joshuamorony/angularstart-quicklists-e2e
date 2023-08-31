import { test, expect, type Page } from "@playwright/test";
import { ChecklistPage } from "./checklist.po";
import { HomePage } from "../home/home.po";

let checklistPage: ChecklistPage;
let homePage: HomePage;
let currentPage: Page;

test.beforeEach(async ({ page }) => {
  checklistPage = new ChecklistPage(page);
  homePage = new HomePage(page);
  currentPage = page;
  await checklistPage.goto();
});

test("no checklist items message displayed", async () => {
  await expect(checklistPage.noChecklistItemsMessage).toBeVisible();
});

test("can add checklist item", async () => {
  const testTitle = "my checklist item";
  await checklistPage.createItem(testTitle);

  expect(currentPage.getByText(testTitle)).toBeVisible();
});

test("can cancel adding checklist item", async () => {
  const testTitle = "abc";
  await checklistPage.createChecklistItemButton.click();
  await homePage.titleInput.fill(testTitle);
  await homePage.closeModalButton.click();

  expect(homePage.titleInput).not.toBeVisible();

  await checklistPage.createChecklistItemButton.click();

  expect(homePage.titleInput).toHaveValue("");
});

test("can delete checklist item", async () => {
  const testTitle = "my checklist item";
  await checklistPage.createItem(testTitle);
  await checklistPage.deleteChecklistItemButton.click();

  expect(currentPage.getByText(testTitle)).not.toBeVisible();
});

test("can edit checklist item", async () => {
  const originalTitle = "my item";
  const editedTitle = "my edited item";

  await checklistPage.createItem(originalTitle);
  await checklistPage.editItem(editedTitle);

  expect(currentPage.getByText(editedTitle)).toBeVisible();
  expect(currentPage.getByText(originalTitle)).not.toBeVisible();
});
