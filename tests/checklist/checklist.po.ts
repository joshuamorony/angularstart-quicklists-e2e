import { Locator, Page } from "@playwright/test";
import { HomePage } from "../home/home.po";

export class ChecklistPage {
  page: Page;
  homePage: HomePage;
  checklistTitle: Locator;
  noChecklistItemsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.checklistTitle = page.getByTestId("checklist-title");
    this.noChecklistItemsMessage = page.getByText("your first item");
  }

  async goto() {
    const title = "test-checklist";
    await this.homePage.goto();
    await this.homePage.createChecklist(title);
    await this.homePage.checklistLink.click();
  }
}
