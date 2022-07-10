import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employee: Employee = {};
  formGroup!: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      const empId = this.route.snapshot.paramMap.get('id');
      this.loadEmployee(empId);
    });

    this.formGroup = this.formBuilder.group({
      employee: this.formBuilder.group({
        empId: ['', Validators.required],
        name: ['', Validators.required],
      }),
    });
  }

  loadEmployee(empId: string | null): void {
    if (!empId || empId == 'new') {
      this.employee = {};
    } else {
      this.employeeService.loadEmployee(empId).subscribe((emp) => {
        this.employee = emp;
      });
    }
  }

  set empId(a:any){}
  get empId() {
    return this.formGroup.get('employee.empId');
  }
  set name(a:any){}
  get name() {
    return this.formGroup.get('employee.name');
  }

  saveEmployee(): void {
    if(this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.employeeService.save(this.employee).subscribe(obs=>{
      this.employee = obs;
    });
  }
}
