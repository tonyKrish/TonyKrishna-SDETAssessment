//Login Error Page
//All the locators and functions necessary to perform tests on Error page is available here

import { Locator, Page } from "@playwright/test";

export default class ErrorPage {

    public loginError: Locator;

    constructor(public page : Page) {
        this.loginError = page.locator('#error-text');
    }

    async getErrorMsg() {
        return await this.page.locator(".p-a").textContent();
    }

    async clickBackButton() {
        await this.page.locator('.back').click();
    }

    async getPageTitle() {
        return await this.page.title();
    }

}