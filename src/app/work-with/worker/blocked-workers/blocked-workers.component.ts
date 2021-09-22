import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../../shared/worker.service';

@Component({
  selector: 'app-blocked-workers',
  templateUrl: './blocked-workers.component.html',
  styleUrls: ['./blocked-workers.component.css']
})
export class BlockedWorkersComponent implements OnInit {
  public workerList: any
  public loading=true
  constructor(private _workerService: WorkerService) { }

  ngOnInit(): void {
    this.updateUnblock()
  }

  unblockAworker(id:String){
    console.log(id);
    this._workerService.unblockWorker(id).subscribe(res=>console.log(res),
    err=>console.log(err.error),
    ()=>this.updateUnblock()
    
      )
  }

  updateUnblock(){
    this._workerService.getBlockedWorkers().subscribe(data => {
      this.workerList = data
    },err=>{
      console.log(err);
    },()=>{
      setTimeout(() => {
        this.loading=false
      }, 1000);
    })
  }



}
