import { APIRequestContext } from '@playwright/test';

export class ApiHelper {
  constructor(private request: APIRequestContext) {}

  async createCustomer(data: { name: string; email: string; phone: string }) {
    const response = await this.request.post('/api/customers', {
      data,
    });
    return response;
  }

  async getCustomerById(customerId: string) {
    const response = await this.request.get(`/api/customers/${customerId}`);
    return response;
  }

  async deleteCustomer(customerId: string) {
    const response = await this.request.delete(`/api/customers/${customerId}`);
    return response;
  }
}