import { Locator, Page } from "@playwright/test";

export default class LoginPage {

    public usernameTxtBox: Locator;
    public passwordTxtBox: Locator;

    constructor(public page : Page) {
        this.usernameTxtBox = page.locator('#username');
        this.passwordTxtBox = page.locator('#password');
    }

    async login(username:string, password:string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickOnLoginBtn();
    }

    async typeInloginCreds(username:string, password:string) {
        await this.typeInUsername(username);
        await this.typeInPassword(password);
        await this.clickOnLoginBtn();
    }

    async enterUsername(username: string) {
        await this.usernameTxtBox.fill(username)
    }

    async typeInUsername(username: string) {
        await this.usernameTxtBox.pressSequentially(username)
    }

    async enterPassword(password: string) {
        await this.passwordTxtBox.fill(password)
    }

    async typeInPassword(password: string) {
        await this.passwordTxtBox.pressSequentially(password)
    }

    async clickOnLoginBtn() {
            this.page.locator('input[type="submit"][value="Login"]').click()
    }

    async getError() {
        return await this.page.locator(".error").textContent();
    }

    async isFocused(locator: Locator): Promise<boolean> {
        return await locator.evaluate((el) => document.activeElement === el);
    }


}