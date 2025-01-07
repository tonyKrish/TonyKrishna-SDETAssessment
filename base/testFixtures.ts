import { chromium, test as baseTest } from "@playwright/test";

import LoginPage  from "../pages/loginPage";
import HomePage from "../pages/homePage";
import ErrorPage from "../pages/errorPage";

type pages = {
    loginPage: LoginPage
    homePage: HomePage
    errorPage: ErrorPage
}

const testPages = baseTest.extend<pages>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    errorPage: async ({ page }, use) => {
        await use(new ErrorPage(page))
    }

})

export const test = testPages;
export const expect = testPages.expect;