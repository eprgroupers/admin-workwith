import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkerService } from '../../shared/worker.service';

@Component({
  selector: 'app-worker-page',
  templateUrl: './worker-page.component.html',
  styleUrls: ['./worker-page.component.css']
})
export class WorkerPageComponent implements OnInit {
  public loading = true
  public id: any
  public workerDetail: any
  constructor(private route: ActivatedRoute, private router: Router, private _workerService: WorkerService) { }

  ngOnInit() {
    let sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this._workerService.getWorker(this.id).subscribe(data => {
        this.workerDetail = data
      }, err => {
        console.log(err);
      }, () => {
        setTimeout(() => { this.loading = false }, 2000)
      })
    });
  }

}
