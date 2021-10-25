import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { WorkerService } from '../../shared/worker.service';

@Component({
  selector: 'app-image-change-model',
  templateUrl: './image-change-model.component.html',
  styleUrls: ['./image-change-model.component.css']
})
export class ImageChangeModelComponent implements OnInit {
  public worker:any
  public selectedImg:any
  public imgSrc:any
  public workerForm = new FormGroup({
    ProfileImg: new FormControl('')
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _workerService: WorkerService)
    { }
    //  

  ngOnInit(): void {
    console.log(this.data);
    this._workerService.getWorkerById(this.data).subscribe(
      res=>{console.log(res);
        this.worker=res;
        this.workerForm.patchValue(this.worker.ProfileImg)
        console.log(this.worker.ProfileImg);
      },err=> console.log(err),
      ()=>console.log("Image recieve Successful")
    )
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

  submitImage(){
    const formData = new FormData();
    formData.append('worker-img', this.selectedImg, this.selectedImg.name);
    this._workerService.postWorker(formData).subscribe((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('change dp success');
      
    })
  }
}
