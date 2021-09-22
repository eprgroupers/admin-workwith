import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  postReview(data:any){
    console.log(data);
    return this.http.post(environment.configURI +'/worker/review',data)
    
    
  }
}
