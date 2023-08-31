import { Locator, Page } from "@playwright/test";
import { HomePage } from "../home/home.po";

export class ChecklistPage {
  page: Page;
  homePage: HomePage;
  checklistTitle: Locator;
  noChecklistItemsMessage: Locator;
  createChecklistItemButton: Locator;
  deleteChecklistItemButton: Locator;
  editChecklistItemButton: Locator;
  toggleChecklistItemButton: Locator;
  checkedFalse: Locator;
  checkedTrue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.checklistTitle = page.getByTestId("checklist-title");
    this.noChecklistItemsMessage = page.getByText("your first item");
    this.createChecklistItemButton = page.getByTestId(
      "create-checklist-item-button"
    );
    this.deleteChecklistItemButton = page.getByTestId(
      "delete-checklist-item-button"
    );
    this.editChecklistItemButton = page.getByTestId(
      "edit-checklist-item-button"
    );
    this.toggleChecklistItemButton = page.getByTestId(
      "toggle-checklist-item-button"
    );

    this.checkedFalse = page.getByTestId("checked-false");
    this.checkedTrue = page.getByTestId("checked-true");
  }

  async goto() {
    const title = "test-checklist";
    await this.homePage.goto();
    await this.homePage.createChecklist(title);
    await this.homePage.checklistLink.click();
  }

  async createItem(title: string) {
    await this.createChecklistItemButton.click();
    await this.homePage.titleInput.fill(title);
    await this.homePage.saveChecklistButton.click();
  }

  async editItem(title: string) {
    await this.editChecklistItemButton.click();
    await this.homePage.titleInput.clear();
    await this.homePage.titleInput.fill(title);
    await this.homePage.saveChecklistButton.click();
  }
}
