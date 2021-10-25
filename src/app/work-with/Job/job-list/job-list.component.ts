import { Component, OnInit } from '@angular/core';
import { JobService } from '../../shared/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  constructor(private jobServ:JobService) { }
  public jobList:any
  public loading= true
  ngOnInit(): void {
    this.updateJobList()
  }
  updateJobList(){
    this.jobServ.getJobs().subscribe(data=>{
      this.jobList=data,console.log(data)},
    err=>console.log(err),
    ()=>{setTimeout(() => { this.loading = false }, 2000) ,console.log('success')}
    )
  }

  

}
