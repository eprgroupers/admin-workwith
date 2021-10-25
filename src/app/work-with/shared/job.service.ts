import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient,) { }
  getJobs() {
    return this.http.get(environment.configURI + "/job")
  }
  getJobById(id:String) {
    console.log(id);
    return this.http.get(environment.configURI + "/job/" + id)
  }
  updateJob(data:any){
    // return this.http.patch(environment.configURI + "/job/"+ id, data)
    console.log(data);
    
  }
  postJob(data:any) {
    console.log(data);
    return this.http.post(environment.configURI + "/job", data)
  }

}
