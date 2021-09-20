import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient) { }

  getCompanies() {
    return this.http.get(environment.configURI + "/company")
  }
  getBlockedCompanies() {
    return this.http.get(environment.configURI + "/company/blockedcompany")
  }
  postCompany(data: any) {
    return this.http.post(environment.configURI + '/company', data)
  }
  blockCompany(id: any) {
    let data = { id: id }
    return this.http.patch(environment.configURI + '/company/blockcompany', data)
  }
  unblockCompany(id: any) {
    let data = { id: id }
    return this.http.patch(environment.configURI + '/company/unblockcompany', data)
  }
}
