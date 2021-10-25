import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkerService } from '../../shared/worker.service';
import { Validators } from '@angular/forms';
import { JobService } from '../../shared/job.service';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { ImageChangeModelComponent } from '../../features/image-change-model/image-change-model.component';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css']
})
export class AddWorkerComponent implements OnInit {
  public selectedImg: File | null = null
  public userNameErrorMsg: any
  public userNameAvailableMsg: any
  public imgSrc: any
  public workerId: any
  public name:any
  public animal:any
  public isWorkerId=true
  public Worker = new FormGroup({
    Name: new FormControl('', Validators.required),
    UserName: new FormControl('', Validators.required),
    ContactNo: new FormControl('', Validators.required),
    WhatsUpNo: new FormControl('', Validators.required),
    Address: new FormControl('', Validators.required),
    Age: new FormControl('', Validators.required),  
    NICNo: new FormControl('', Validators.required),
    Rating: new FormControl('', Validators.required),
    WorkArea: new FormArray([]),
    District: new FormControl('', Validators.required),
    Job: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    Experience: new FormControl('', Validators.required), 
    ProfileImg: new FormControl('')
    // id: new FormControl('')
  })

  public ratingArr: number[] = [1, 2, 3, 4, 5];
  private rating: number = 3
  public jobList: any
  constructor(private dialog:MatDialog , private _workerService: WorkerService, private snackBar: MatSnackBar, private _jobService: JobService, private route: ActivatedRoute) { }

  get workAreaControls() {
    return (<FormArray>this.Worker.get('WorkArea')).controls
  }

  ngOnInit(): void {
    this.updateJob()
    this.route.params.subscribe(
        res => {
          console.log(res.id);
        this.workerId = res.id; 
        console.log(this.workerId);
        
      },
        err => console.log(err),
        () => console.log("success")
      )
   
      this._workerService.getWorkerById(this.workerId).subscribe
          (data => {
            this.Worker.patchValue(data);
          }, err => console.log(err),
            () => console.log("recive worker success")
          )

          if(this.workerId!== undefined){
            this.isWorkerId=false
          }
  }

  updateJob() {
    this._jobService.getJobs().subscribe(data => {
      this.jobList = data
    })
  }

  onClick(rating: number) {
    this.rating = rating
    return false;
  }
  checkUserName() {
    this.userNameErrorMsg = null
    this.userNameAvailableMsg = null
    this._workerService.checkUserNameAvailability(this.Worker.value.UserName).subscribe(data => {
      this.userNameAvailableMsg = data
      console.log(data);

    }, err => this.userNameErrorMsg = err.error, () => {
      console.log(this.userNameErrorMsg + this.userNameAvailableMsg + 'data');
    }
    )
  }
  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  addWorkArea() {
    const control = new FormControl('');
    (<FormArray>this.Worker.get('WorkArea')).push(control)
  }

  onFileChange(event: any) {
    this.selectedImg = <File>event.target.files[0]
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imgSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }

  openDialog(): void {
    let submitImage = this.dialog.open(ImageChangeModelComponent, { data: this.workerId});
    console.log(this.workerId);
    
    submitImage.afterClosed().subscribe(result => {
        if (result === "true") {
          console.log(result);
          this.Worker.reset();
          this.imgSrc = ''
          
        }
      })
    // const dialogRef = this.dialog.open(ImageChangeModelComponent, {
    //   width: '100%',
    //   data: {ProfileImg: this.selectedImg}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.selectedImg = result;
    // });
  }

  submit() {
    this.Worker.controls.Rating.setValue(this.rating)
    if (this.userNameErrorMsg !== null || this.Worker.status !== 'INVALID') {


      if (this.selectedImg === null) {
        this._workerService.postWorker(this.Worker.value).subscribe((result) => {
          console.log(result);
        }, (err) => {
          console.log(err);
        }, () => {
          this.Worker.reset()
          this.imgSrc = ''
        })
      }
      else {
        const formData = new FormData();
        formData.append('worker-img', this.selectedImg, this.selectedImg.name);
        for (var key in this.Worker.value) {
          formData.append(key, this.Worker.value[key]);
        }
        this._workerService.postWorker(formData).subscribe((result) => {
          console.log(result);
        }, (err) => {
          console.log(err);
        }, () => {
          this.Worker.reset()
        })
      }
    } else {
      this.snackBar.open('Please create a new username', 'ok')

    }
  }
}
