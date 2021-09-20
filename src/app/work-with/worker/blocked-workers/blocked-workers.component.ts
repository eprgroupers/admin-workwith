import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../../shared/worker.service';

@Component({
  selector: 'app-blocked-workers',
  templateUrl: './blocked-workers.component.html',
  styleUrls: ['./blocked-workers.component.css']
})
export class BlockedWorkersComponent implements OnInit {
  public workerList: any
  constructor(private _workerService: WorkerService) { }

  ngOnInit(): void {
    this._workerService.getBlockedWorkers().subscribe(data => {
      this.workerList = data
    })
  }
}
