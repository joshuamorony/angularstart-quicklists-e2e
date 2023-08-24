import { Locator, Page } from "@playwright/test";

export class ChecklistPage {
  page: Page;
  checklistTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checklistTitle = page.getByTestId("checklist-title");
  }

  async goto() {
    // TODO: create checklists
    await this.page.goto("/checklist/id");
  }
}
