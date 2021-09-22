import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../../shared/review.service';
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
  public isAddReveiw = false
  public reviewsOfTheWorker: any
  public ratingArr: number[] = [1, 2, 3, 4, 5];
  private rating: number = 3

  public Reveiws = new FormGroup({
    Name: new FormControl('', Validators.required),
    Review: new FormControl('', Validators.required),
    Rating: new FormControl('', Validators.required),
    workerID: new FormControl('', Validators.required)
  })

  constructor(private route: ActivatedRoute, private router: Router, private _reviewService: ReviewService, private _workerService: WorkerService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    let sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this._workerService.getWorker(this.id).subscribe(data => {
        this.workerDetail = data
        this.Reveiws.controls.workerID.patchValue(this.workerDetail._id)
      }, err => {
        console.log(err);
      }, () => {
        setTimeout(() => { this.loading = false }, 1000)
        this._reviewService.getReviewsOfWorker(this.workerDetail._id).subscribe(
          (data) => {
            this.reviewsOfTheWorker = data, console.log(data);
          },
          err => console.log(err),
          () => {
            console.log("done");
          }
        )
      })
    });
  }

  onClick(rating: number) {
    this.rating = rating
    return false;
  }
  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  addReveiw() {
    this.isAddReveiw = !this.isAddReveiw
    // this.isAddReveiw !=this.isAddReveiw
  }

  submitReview() {
    this.Reveiws.controls.Rating.patchValue(this.rating)
    console.log(this.Reveiws.value);
    if (this.Reveiws.status !== 'INVALID') {
      this._reviewService.postReview(this.Reveiws.value).subscribe(res => console.log(res),
        err => console.log(err),
        () => {
          console.log('success');
          this.Reveiws.reset()
          this.isAddReveiw = false
        }
      )
    } else {
      this.snackbar.open('Please fullfill the form', 'ok')
    }

  }



}
