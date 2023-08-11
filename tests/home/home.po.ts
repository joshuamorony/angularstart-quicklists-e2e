import { Locator, Page } from "@playwright/test";

export class HomePage {
  page: Page;
  createChecklistButton: Locator;
  titleInput: Locator;
  saveChecklistButton: Locator;
  noChecklistsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createChecklistButton = page.getByTestId("create-checklist-button");
    this.saveChecklistButton = page.getByTestId("save-checklist-button");
    this.titleInput = page.getByLabel("title");
    this.noChecklistsMessage = page.getByText("create your first");
  }

  async goto() {
    await this.page.goto("/home");
  }

  async createChecklist(title: string) {
    await this.createChecklistButton.click();
    await this.titleInput.fill(title);
    await this.saveChecklistButton.click();
  }
}
