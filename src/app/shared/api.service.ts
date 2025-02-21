import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  getGigs(status: any, type: any): any {
      throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  registerProvider(body: any): Promise<any> {
    return this.http
      .post(`auth/provider-signup`, body, { params: { s: 'v1' } })
      .toPromise();
  }

  getProviderCategoriesAll(): Promise<any> {
    return this.http
      .get(`auth/provider-skills-all`, { params: { s: 'v1' } })
      .toPromise();
  }

  uploadFiles(body: any, id: string): Promise<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http
      .post(`files/${id}/temp-files`, body, { headers, params: { s: 'v1' } })
      .toPromise();
  }

  signIn(body: any): Promise<any> {
    return this.http.post(`auth/signup`, body).toPromise();
  }

  verifyOtp(body: any): Promise<any> {
    return this.http.post(`auth/verify`, body).toPromise();
  }

  signUp(body: any): Promise<any> {
    return this.http
      .patch(`users/info`, body, {
        headers: { Authorization: `Bearer ${body.token}` },
      })
      .toPromise();
  }

  getProviderCategories() {
    return this.http.get(`provider-category`).toPromise();
  }

  // wallet
  getAllCard() {
    return this.http.get(`payment/sources`).toPromise();
  }

  getTransactions() {
    return this.http.get(`transaction/all`).toPromise();
  }

  addCard(body: any) {
    return this.http.post(`payment/add-source`, body).toPromise();
  }

  addPayment(body: any) {
    return this.http.post(`payment/pay`, body).toPromise();
  }

  // jobs
  getJobs(status: any, type: any) {
    const p: any = {};
    if (status) {
      p.status = status;
    }
    if (type) {
      p.type = type;
    }
    return this.http
      .get(`job`, {
        params: p,
      })
      .toPromise();
  }

  // service provider

  loginProvider(body: any) {
    return this.http.post(`auth/login`, body).toPromise();
  }

  updateProviderProfile(body: any, id: any) {
    return this.http.patch(`service-provider/${id}`, body).toPromise();
  }
}
