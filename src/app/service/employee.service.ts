import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Employee } from '../model/employee';
import { HttpMethods, HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeUriPrefix = "employees";

  constructor(
    private httpService: HttpService,
    ) { }

    loadEmployee(empId: string) : Observable<Employee> {
      const url = `${this.employeeUriPrefix}/${empId}`;
      return this.httpService.callServer(url, HttpMethods.GET);
    }

    loadEmployees() : Observable<Employee[]> {
      const url = `${this.employeeUriPrefix}`;
      // return new Observable((observable: Observer<Employee[]>)=>{
      //   observable.next([{_id: 1, name: "abcd"}]);
      // });
      return this.httpService.callServer(url, HttpMethods.GET);
    }

    save(employee: Employee) : Observable<Employee> {
      if(employee._id) {
        const url = `${this.employeeUriPrefix}/${employee._id}`;
        return this.httpService.callServer(url, HttpMethods.PUT, employee);
      }

      const url = `${this.employeeUriPrefix}`;
      return this.httpService.callServer(url, HttpMethods.POST, employee);
    }
}
