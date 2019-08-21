import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  logs: string[] = [];

  constructor() { }

  addLog(log: string) {
    this.logs.push(log);
  }

  getLogs(): Observable<string[]> {
    return of(this.logs);
  }

}
