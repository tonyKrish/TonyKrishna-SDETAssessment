import { Locator, Page } from "@playwright/test";

export default class HomePage {


    public homeButton: Locator;

    constructor(public page : Page) {
        this.homeButton = page.locator('text=HOME');
    }

}