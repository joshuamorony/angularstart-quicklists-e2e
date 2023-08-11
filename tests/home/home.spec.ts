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
