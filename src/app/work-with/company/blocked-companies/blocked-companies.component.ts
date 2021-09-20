import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../shared/company.service';

@Component({
  selector: 'app-blocked-companies',
  templateUrl: './blocked-companies.component.html',
  styleUrls: ['./blocked-companies.component.css']
})
export class BlockedCompaniesComponent implements OnInit {
  public companies: any
  constructor(public _companyService: CompanyService) { }

  ngOnInit(): void {
    this.loadCompany()
  }

  loadCompany() {
    this._companyService.getBlockedCompanies().subscribe((data) => {
      this.companies = data
    })
  }
  unblockCompany(id: any) {
    this._companyService.unblockCompany(id).subscribe(result => {
      console.log(result);

    }, err => {
      console.log(err);

    }, () => {
      console.log('done');
      this.loadCompany()
    })
  }
}
