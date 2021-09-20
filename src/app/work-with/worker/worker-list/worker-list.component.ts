import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../../shared/worker.service';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.css']
})
export class WorkerListComponent implements OnInit {
  public workerList: any
  constructor(private _workerService: WorkerService) { }

  ngOnInit(): void {
    this._workerService.getWorkers().subscribe(data => {
      this.workerList = data
    })
  }

}
