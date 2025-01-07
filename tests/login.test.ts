//Login Tests
//All tests related to Login page/scenario is implemented here

import { test, expect } from "../base/testFixtures";
import * as data from "../test-data/testData.json";

test.describe("Login page tests", async ()=> {

    const validUsername = data.validUsername
    const validPassword = data.validPassword
    const invalidUsername = data.invalidUsername
    const invalidPassword = data.invalidPassword
    const specialChars = data.specialCharString
    const lengthyUname = data.lengthyString

    //Tests below are implementation of test cases in Question 3

    test("Test001 - User with valid credentials",async ({page, baseURL, loginPage, homePage}) => {
        await page.goto(`${baseURL}`)
        expect(await page.title()).toBe(data.LoginPageTiTle);

        await loginPage.login(validUsername,validPassword);
        await expect(homePage.homeButton).toBeVisible(); //Validates user is in home page
    })

    test("Test002 - User with valid username and invalid password",async ({page, baseURL, loginPage, errorPage}) => {
        await page.goto(`${baseURL}`)
        expect(await page.title()).toBe(data.LoginPageTiTle);

        await loginPage.login(validUsername,invalidPassword);
        await expect(errorPage.loginError).toBeVisible();
        expect(await errorPage.getErrorMsg()).toContain(data.loginErrorMessage); //Validates user is in error page and shown login error message
    })

    test("Test003 - User with invalid username and valid password",async ({page, baseURL, loginPage, errorPage}) => {
        await page.goto(`${baseURL}`)
        expect(await page.title()).toBe(data.LoginPageTiTle);

        await loginPage.login(invalidUsername, validPassword);
        await expect(errorPage.loginError).toBeVisible();
        expect(await errorPage.getErrorMsg()).toContain(data.loginErrorMessage); //Validates user is in error page and shown login error message
    })

    test("Test004 - User with invalid username and invalid password",async ({page, baseURL, loginPage, errorPage}) => {
        await page.goto(`${baseURL}`)
        expect(await page.title()).toBe(data.LoginPageTiTle);

        await loginPage.login(invalidUsername, invalidPassword);
        await expect(errorPage.loginError).toBeVisible();
        expect(await errorPage.getErrorMsg()).toContain(data.loginErrorMessage); //Validates user is in error page and shown login error message
    })

    test("Test005 - User with blank username and blank password",async ({page, baseURL, loginPage}) => {
        await page.goto(`${baseURL}`);
        expect(await page.title()).toBe(data.LoginPageTiTle);

        await loginPage.login("", "");
        expect(await page.title()).toBe(data.LoginPageTiTle);
        expect(loginPage.isFocused(loginPage.usernameTxtBox)).toBeTruthy(); 
        //As the warning message is from 'required' in HTML5, the DOM has no changes and not possible to locate and validate.
        //An alternate approach for validation is implemented. Validated the user remains on login page and the focus is on username box after login button is clicked
    })

    test("Test006 - User tried to enter special characters - Type in",async ({page, baseURL, loginPage}) => {
        await page.goto(`${baseURL}`);
        expect(await page.title()).toBe(data.LoginPageTiTle);

        await loginPage.typeInloginCreds(specialChars,"") //types in username
        expect(await page.title()).toBe(data.LoginPageTiTle);
        const textboxValue = await loginPage.usernameTxtBox.inputValue();
        //The current value inside textbox is retrived and validated below to make sure the special characters didn't go in while typing
        expect(textboxValue).not.toContain(specialChars);
    })

    test("Test007 - User tried to enter lengthy username > 31 chars",async ({page, baseURL, loginPage}) => {
        await page.goto(`${baseURL}`);
        expect(await page.title()).toBe(data.LoginPageTiTle);

        await loginPage.typeInloginCreds(lengthyUname,"");
        expect(await page.title()).toBe(data.LoginPageTiTle);
        const textboxValue = await loginPage.usernameTxtBox.inputValue();
        //The current value inside textbox is retrived and validates the entire value hasn't got in
        expect(textboxValue).not.toBe(lengthyUname);
    })

    //This test fails as the textbox allows special characters to be pasted in - To skip the test wile execution, use test.skip() in the below line => test.skip("Test008...")
    test("Test008 - User tried to enter special characters - copy/fill",async ({page, baseURL, loginPage}) => {
        await page.goto(`${baseURL}`);
        expect(await page.title()).toBe(data.LoginPageTiTle);

        await loginPage.login(specialChars, ""); //Fill or paste in username
        expect(await page.title()).toBe(data.LoginPageTiTle);
        const textboxValue = await loginPage.usernameTxtBox.inputValue();
        //The current value inside textbox is retrived and checked to make sure the special characters didn't go in while typing
        expect(textboxValue).not.toContain(specialChars);
    })

})
