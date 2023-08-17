import { test, expect, type Page } from "@playwright/test";
import { HomePage } from "./home.po";

let homePage: HomePage;
let currentPage: Page;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
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
