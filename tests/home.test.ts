//Home Page Tests
//All tests related to Home page/scenario is implemented here

import { test, expect } from "../base/testFixtures";
import * as data from "../test-data/testData.json";

test.describe("Home page tests", async ()=> {

    const validUsername = data.validUsername
    const validPassword = data.validPassword
    const quantity = data.ticketQuantity
    const email = data.ticketEmail
    const invalidEmail = data.invalidEmail
    const contactName = data.contactName
    const contactEmail = data.contactEmail
    const message = data.contactMessage


    test("Test001 - Validate Header Links",async ({page, baseURL, loginPage, homePage}) => {
        await page.goto(`${baseURL}`)
        expect(await page.title()).toBe(data.LoginPageTiTle);

        await loginPage.login(validUsername,validPassword);
        await expect(homePage.homeButton).toBeVisible(); 

        //Home Link validation
        await homePage.clickOnHomeBtn();
        await expect(homePage.homeLandingPage.first()).toBeVisible();

        //Tour Link validation
        await homePage.clickOnTourBtn();
        await expect(homePage.tourPage).toBeInViewport();

        //Contact Link validation
        await homePage.expandMoreBtn();
        await expect(homePage.contactBtn).toBeVisible();
        await homePage.clickOnContactBtn();
        await expect(homePage.contactPage).toBeInViewport();
    })

    test("Test002 - Buy tickets",async ({page, baseURL, loginPage, homePage}) => {
        await page.goto(`${baseURL}`)
        expect(await page.title()).toBe(data.LoginPageTiTle);

        await loginPage.login(validUsername,validPassword);
        await expect(homePage.homeButton).toBeVisible(); 

        await homePage.clickOnTourBtn();
        await expect(homePage.tourPage).toBeInViewport();

        await homePage.clickOnBuyTickets();
        await homePage.buyTicket(quantity, email);

        //Validate quantity and email in Ticket result modal
        expect(await homePage.getTicketCount()).toContain(quantity);
        expect(await homePage.getTicketEmail()).toContain(email);

        await homePage.closeTicketResultModal();
    })

    //The below test fails as invalid detail doesn't raise an error message
    test("Test003 - Buy tickets with Invalid Email",async ({page, baseURL, loginPage, homePage}) => {
        await page.goto(`${baseURL}`)
        expect(await page.title()).toBe(data.LoginPageTiTle);

        await loginPage.login(validUsername,validPassword);
        await expect(homePage.homeButton).toBeVisible(); 

        await homePage.clickOnTourBtn();
        await expect(homePage.tourPage).toBeInViewport();

        await homePage.clickOnBuyTickets();
        await homePage.buyTicket(quantity, invalidEmail);

        //Validate ticket result doesn't appear for invalid user
        await expect(homePage.resultModal).not.toBeVisible();
    })

    //The below test fails as invalid detail doesn't raise an error message
    test("Test004 - Buy tickets with Blank details",async ({page, baseURL, loginPage, homePage}) => {
        await page.goto(`${baseURL}`)
        expect(await page.title()).toBe(data.LoginPageTiTle);

        await loginPage.login(validUsername,validPassword);
        await expect(homePage.homeButton).toBeVisible(); 

        await homePage.clickOnTourBtn();
        await expect(homePage.tourPage).toBeInViewport();

        await homePage.clickOnBuyTickets();
        await homePage.buyTicket("", "");

        //Validate ticket result doesn't appear for invalid user
        await expect(homePage.resultModal).not.toBeVisible();
    })

    test("Test005 - Contact",async ({page, baseURL, loginPage, homePage}) => {
        await page.goto(`${baseURL}`)
        expect(await page.title()).toBe(data.LoginPageTiTle);

        await loginPage.login(validUsername,validPassword);
        await expect(homePage.homeButton).toBeVisible(); 

        //Go to contact section
        await homePage.expandMoreBtn();
        await expect(homePage.contactBtn).toBeVisible();
        await homePage.clickOnContactBtn();
        await expect(homePage.contactPage).toBeInViewport();

        //Submit contact note and Validate details in alert
        const alertMsgText = homePage.getAlertMessage();
        await homePage.sendContactNote(contactName, contactEmail, message);
        const alertMessage = await alertMsgText;

        expect(alertMessage).toContain(contactName);
        expect(alertMessage).toContain(contactEmail);
        expect(alertMessage).toContain(message);

    })

})
