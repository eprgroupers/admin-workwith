import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../../shared/worker.service';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.css']
})
export class WorkerListComponent implements OnInit {
  public workerList: any
  public loading=true
  

  constructor(private _workerService: WorkerService) { }

  ngOnInit(): void {
    this.updateWorkerList()
  }
  
  blockAWorker(id:String){
    console.log(id);
    this._workerService.blockWorker(id).subscribe(res=>{
      console.log(res);
    },err=>console.log(err.error),
    ()=> this.updateWorkerList()
    )
  }

  updateWorkerList(){
    this._workerService.getWorkers().subscribe(data => {
      this.workerList = data
    },err=>{
      console.log(err);
    },()=>{
      setTimeout(() => { this.loading = false }, 2000)   
    });
  }

 


}
