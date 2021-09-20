import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CompanyService } from '../../shared/company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  public Company = new FormGroup({
    Name: new FormControl(''),
    WhoWeAre: new FormControl(''),
    Mission: new FormControl(''),
    Vision: new FormControl(''),
    RegNumber: new FormControl(''),
    Ownership: new FormControl(''),
    ContactNo: new FormControl(''),
    Email: new FormControl(''),
    Address: new FormControl('')
  })
  constructor(private _companyService: CompanyService) { }

  ngOnInit(): void {
  }
  submit() {
    this._companyService.postCompany(this.Company.value).subscribe((result) => {
      console.log(result);

    }, (err) => {
      console.log(err);

    }, () => {
      this.Company.reset()
    })

  }

}
