import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../shared/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  public companies: any
  constructor(private _companyService: CompanyService) { }

  ngOnInit(): void {
    this._companyService.getCompanies().subscribe((data) => {
      this.companies = data
    })
  }
  blockCompany(id: any) {
    this._companyService.blockCompany(id).subscribe((data) => {
      console.log(data);

    })

  }
}
