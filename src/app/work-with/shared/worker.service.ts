import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private http: HttpClient) { }
  postWorker(data: any) {
    return this.http.post(environment.configURI + '/worker', data)
  }
  getWorkers() {
    return this.http.get(environment.configURI + "/worker")
  }
  getBlockedWorkers() {
    return this.http.get(environment.configURI + "/worker/blockedworker")
  }
  blockWorker(id: any) {
    let data = { id: id }
    return this.http.patch(environment.configURI + '/worker/blockworker', data)
  }
  unblockWorker(id: any) {
    let data = { id: id }
    return this.http.patch(environment.configURI + '/worker/unblockworker', data)
  }
  getWorker(id: string) {
    return this.http.get(environment.configURI + '/worker/id/' + id)
  }
  checkUserNameAvailability(userName: string) {
    return this.http.get(environment.configURI + '/worker/username/' + userName, { responseType: 'text' })
  }
}
