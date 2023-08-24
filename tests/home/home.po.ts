import { Locator, Page } from "@playwright/test";

export class HomePage {
  page: Page;
  createChecklistButton: Locator;
  titleInput: Locator;
  closeModalButton: Locator;
  saveChecklistButton: Locator;
  deleteChecklistButton: Locator;
  editChecklistButton: Locator;
  checklistLink: Locator;
  noChecklistsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createChecklistButton = page.getByTestId("create-checklist-button");
    this.saveChecklistButton = page.getByTestId("save-checklist-button");
    this.closeModalButton = page.getByTestId("close-modal-button");
    this.deleteChecklistButton = page.getByTestId("delete-checklist");
    this.editChecklistButton = page.getByTestId("edit-checklist");
    this.titleInput = page.getByLabel("title");
    this.noChecklistsMessage = page.getByText("create your first");
    this.checklistLink = page.getByTestId("checklist-link");
  }

  async goto() {
    await this.page.goto("/home");
  }

  async createChecklist(title: string) {
    await this.createChecklistButton.click();
    await this.titleInput.fill(title);
    await this.saveChecklistButton.click();
  }

  async editChecklist(title: string) {
    await this.editChecklistButton.click();
    await this.titleInput.clear();
    await this.titleInput.fill(title);
    await this.saveChecklistButton.click();
  }
}
