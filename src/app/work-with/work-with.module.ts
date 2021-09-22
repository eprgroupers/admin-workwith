import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { BlockedCompaniesComponent } from './company/blocked-companies/blocked-companies.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { MaterialModule } from '../material/material.module';
import { CompanyComponent } from './company/company.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddWorkerComponent } from './worker/add-worker/add-worker.component';
import { WorkerListComponent } from './worker/worker-list/worker-list.component';
import { WorkerComponent } from './worker/worker.component';
import { BlockedWorkersComponent } from './worker/blocked-workers/blocked-workers.component';
import { WorkerPageComponent } from './worker/worker-page/worker-page.component';
import { AddJobComponent } from './Job/add-job/add-job.component';
import { JobComponent } from './Job/job.component';



@NgModule({
  declarations: [
    AddCompanyComponent,
    BlockedCompaniesComponent,
    CompanyListComponent,
    CompanyComponent,
    AddWorkerComponent,
    WorkerListComponent,
    WorkerComponent,
    BlockedWorkersComponent,
    WorkerPageComponent,
    AddJobComponent,
    JobComponent,
  ],
  imports: [
    CommonModule, MaterialModule, HttpClientModule, AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class WorkWithModule { }
