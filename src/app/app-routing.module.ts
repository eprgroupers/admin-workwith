import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './work-with/company/add-company/add-company.component';
import { BlockedCompaniesComponent } from './work-with/company/blocked-companies/blocked-companies.component';
import { CompanyListComponent } from './work-with/company/company-list/company-list.component';
import { CompanyComponent } from './work-with/company/company.component';
import { AddJobComponent } from './work-with/Job/add-job/add-job.component';
import { JobListComponent } from './work-with/Job/job-list/job-list.component';
import { JobComponent } from './work-with/Job/job.component';
import { AddWorkerComponent } from './work-with/worker/add-worker/add-worker.component';
import { BlockedWorkersComponent } from './work-with/worker/blocked-workers/blocked-workers.component';
import { WorkerListComponent } from './work-with/worker/worker-list/worker-list.component';
import { WorkerPageComponent } from './work-with/worker/worker-page/worker-page.component';
import { WorkerComponent } from './work-with/worker/worker.component';

const routes: Routes = [
  {
    path: '', component: AddWorkerComponent
  },
  {
    path: 'blockedcompany',
    component: BlockedCompaniesComponent
  },
  {
    path: 'company',
    component: CompanyComponent,
    children: [{
      path: '',
      redirectTo: "add-new",
      pathMatch: "full"
    },
    {
      path: 'list',
      component: CompanyListComponent
    },
    {
      path: 'blocked',
      component: BlockedCompaniesComponent
    },
    {
      path: "add-new",
      component: AddCompanyComponent
    }
    ]
  },
  {
    path: 'worker',
    component: WorkerComponent,
    children: [{
      path: '',
      redirectTo: "add-new",
      pathMatch: "full"
    }, {
      path: 'list',
      component: WorkerListComponent,
      pathMatch: "full"

    },
    {
      path: 'blocked',
      component: BlockedWorkersComponent
    },
    {
      path: "add-new",
      component: AddWorkerComponent
    },
    {
      path: 'view/:id/active',
      component: WorkerPageComponent
    },
    {
      path: "edit/id/:id",
      component: AddWorkerComponent
    }
    ]
  },
  {
    path: 'job',
    component: JobComponent,
    children: [{
      path: '',
      redirectTo: "add-new",
      pathMatch: "full"
    }, {
      path: 'list',
      component: JobListComponent,
      pathMatch: "full"

    },
    {
      path: "add-new",
      component: AddJobComponent
    },
    {
      path: "edit/id/:id",
      component: AddJobComponent
    }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
