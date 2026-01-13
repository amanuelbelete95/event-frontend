import { Page } from '@playwright/test';

export class CustomerPage {
  constructor(private page: Page) {}

  async gotoAddCustomer() {
    await this.page.click('text=CRM');
    await this.page.click('text=Customers');
    await this.page.click('text=Add Customer');
  }

  async fillCustomerForm(data: { name: string; phone: string; tin: string; region: string; zone: string; woreda: string; }) {
    await this.page.fill('input[name="customerName"]', data.name);
    await this.page.selectOption('select[name="customerType"]', 'individual');
    await this.page.fill('input[name="tin"]', data.tin);
    await this.page.fill('input[name="phone"]', data.phone);
    await this.page.selectOption('select[name="region"]', data.region);
    await this.page.selectOption('select[name="zone"]', data.zone);
    await this.page.selectOption('select[name="woreda"]', data.woreda);
  }

  async clickCreateCustomer() {
    await this.page.click('button:has-text("Create customer")');
  }

  async createCustomer(data: { name: string; phone: string; tin: string; region: string; zone: string; woreda: string; }) {
    await this.fillCustomerForm(data);
    await this.clickCreateCustomer();
  }

  async updateCustomer(name: string, region: string, zone: string, woreda: string) {
    await this.page.click('button:has-text("edit")');
    await this.page.fill('input[name="customerName"]', name);
    await this.page.selectOption('select[name="region"]', region);
    await this.page.selectOption('select[name="zone"]', zone);
    await this.page.selectOption('select[name="woreda"]', woreda);
    await this.page.click('button:has-text("Update Customer")');
  }

  async deleteCustomer() {
    await this.page.click('button:has-text("remove")');
    await this.page.click('button:has-text("Yes")');
  }

  async searchCustomer(name: string) {
    await this.page.fill('input[placeholder="Search"]', name);
  }
}
