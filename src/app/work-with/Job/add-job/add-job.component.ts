import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../shared/job.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  public selectedImg: File | null = null
  public userNameErrorMsg: any
  public userNameAvailableMsg: any
  public imgSrc: any
  public id: any
  public showButton=true
  public Jobs = new FormGroup({
    Job: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    Image: new FormControl(''),
    Icon: new FormControl(''),
    count: new FormControl(''),
    available: new FormControl(''),
    _Id: new FormControl(''),
  })



  constructor(private _jobService: JobService, private snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      data => {
        this.id = data.id
        console.log(this.id)
      },
      err => (console.log(err))
    ), () => console.log('succes');
    this._jobService.getJobById(this.id).subscribe
    (data => {console.log(data),this.Jobs.patchValue(data),
      console.log(this.Jobs);
      },
    err=>console.log(err),
    ()=>console.log('recieve job success')
    )
    if(this.id !== undefined){
      console.log(this.id)
      this.showButton=false
    }
  }

  onFileChange(event: any) {
    this.Jobs.value.Image = ''
    this.selectedImg = <File>event.target.files[0]
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imgSrc = reader.result;
      reader.readAsDataURL(file);
    }
    console.log(this.selectedImg);
  }


  submit() {
    console.log(this.Jobs.value);
    if (this.selectedImg === null) {
      this._jobService.postJob(this.Jobs.value).subscribe((res) => {
        console.log(res);
        console.log(this.Jobs.value);

      }, err => {
        console.log(err);
      }, () => {
        this.Jobs.reset()
        this.imgSrc = ''
      })
    }
    else {
      const formData = new FormData();
      formData.append('job-img', this.selectedImg, this.selectedImg.name);
      for (var key in this.Jobs.value) {
        formData.append(key, this.Jobs.value[key]);
      }
      this._jobService.postJob(formData).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      }, () => {
        this.Jobs.reset()
        this.imgSrc = ''
      })

    }
  }

  editWorker() {
    console.log(this.Jobs.value);
    console.log(this.id);
    this._jobService.updateJob(this.Jobs.value)
    // .subscribe
    // (res=>{console.log(res),console.log(this.Jobs.value);
    // },
    //   err=>console.log(err),
    //   ()=>console.log('update success')
    // )
  }
  
  changeImage(){
   
  }


}
