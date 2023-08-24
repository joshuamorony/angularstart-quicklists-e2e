import { test, expect, type Page } from "@playwright/test";
import { HomePage } from "./home.po";
import { ChecklistPage } from "../checklist/checklist.po";

let homePage: HomePage;
let checklistPage: ChecklistPage;
let currentPage: Page;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  checklistPage = new ChecklistPage(page);
  currentPage = page;
  await homePage.goto();
});

test("no checklists message displayed", async () => {
  await expect(homePage.noChecklistsMessage).toBeVisible();
});

test("can add checklists", async () => {
  const testTitle = "my test checklist";
  await homePage.createChecklist(testTitle);

  expect(currentPage.getByText(testTitle)).toBeVisible();
});

test("can cancel adding checklist", async () => {
  const testTitle = "abc";
  await homePage.createChecklistButton.click();
  await homePage.titleInput.fill(testTitle);
  await homePage.closeModalButton.click();

  expect(homePage.titleInput).not.toBeVisible();

  await homePage.createChecklistButton.click();

  expect(homePage.titleInput).toHaveValue("");
});

test("can delete checklist", async () => {
  const testTitle = "my test checklist";
  await homePage.createChecklist(testTitle);
  await homePage.deleteChecklistButton.click();

  expect(currentPage.getByText(testTitle)).not.toBeVisible();
});

test("can edit checklist", async () => {
  const originalTitle = "my test checklist";
  const editedTitle = "my edited checklist";

  await homePage.createChecklist(originalTitle);
  await homePage.editChecklist(editedTitle);

  expect(currentPage.getByText(editedTitle)).toBeVisible();
  expect(currentPage.getByText(originalTitle)).not.toBeVisible();
});

test("can view detail for specific checklist", async () => {
  await homePage.createChecklist("test");
  await homePage.checklistLink.click();

  expect(checklistPage.checklistTitle).toBeVisible();
});
