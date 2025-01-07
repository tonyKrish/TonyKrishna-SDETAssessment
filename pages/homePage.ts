//Home Page
//All the locators and functions necessary to perform tests on Home page is available here. Includes Ticket purachase and Contact sections

import { Locator, Page } from "@playwright/test";

export default class HomePage {

    public homeButton: Locator;
    public homeLandingPage: Locator;
    public tourPage: Locator;
    public contactPage: Locator;
    public contactBtn: Locator;
    public ticketModal: Locator;
    public resultModal: Locator;

    constructor(public page : Page) {
        this.homeButton = page.locator('text=HOME');
        this.tourPage = page.locator('#tour');
        this.contactPage = page.locator('#contact');
        this.contactBtn = page.getByText('CONTACT').first();
        this.homeLandingPage = page.locator('.mySlides');
        this.ticketModal = page.locator('#ticketModal');
        this.resultModal = page.locator('#resultModal');
    }

    async clickOnHomeBtn() {
        await this.page.locator('text=HOME').click();
    }

    async clickOnTourBtn() {
        await this.page.getByRole('link', { name: 'TOUR' }).first().click();
    }

    async expandMoreBtn() {
        await this.page.locator('button[title="More"]').click();
    }

    async clickOnContactBtn() {
        await this.page.getByText('CONTACT').first().click();
    }

    async clickOnBuyTickets() {
        await this.page.locator('button:has-text("Buy Tickets")').first().click();
    }

    async buyTicket(quantity: string, email: string) {
        await this.enterTicketQuantity(quantity);
        await this.enterTicketEmail(email);
        await this.clickPay();
    }

    async enterTicketQuantity(quantity: string) {
        await this.page.locator('#how_many').fill(quantity);
    }

    async enterTicketEmail(email: string) {
        await this.page.locator('#send_to').fill(email);
    }

    async clickPay() {
        const modal = this.page.locator('#ticketModal');
        await modal.locator('button[type="submit"]').click();
    }

    async getTicketCount() {
        return await this.page.locator('#send_ticket').textContent();
    }

    async getTicketEmail() {
        return await this.page.locator('#send_email').textContent();
    }

    async closeTicketResultModal() {
        const modal = this.page.locator('#resultModal');
        await modal.locator('button:has-text("Close")').click();
    }

    async sendContactNote(contactName: string, contactEmail: string, message: string) {
        await this.enterContactName(contactName);
        await this.enterContactEmail(contactEmail);
        await this.enterContactMsg(message);
        await this.clickSendBtn();
    }
    
    async enterContactName(contactName: string) {
        await this.page.locator('#Name').fill(contactName);
    }

    async enterContactEmail(contactEmail: string) {
        await this.page.locator('#Email').fill(contactEmail);
    }

    async enterContactMsg(message: string) {
        await this.page.locator('#Message').fill(message);
    }

    async clickSendBtn() {
        const contactBlock = this.page.locator('#contact')
        await contactBlock.locator('button:has-text("SEND")').click();
    }

    async getAlertMessage(): Promise<string> {
        return new Promise((resolve) => {
            this.page.on('dialog', async (dialog) => {
            const alertMessage = dialog.message(); // Capture the alert message
            await dialog.accept(); // Accept the alert
            resolve(alertMessage);
            });
        });
    }

}