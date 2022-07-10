import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  {path: "employees", component: EmployeesComponent},
  {path: "employee/:id", component: EmployeeComponent},
  {path: "", redirectTo: "/employees", pathMatch: "full"},
  {path: "**", redirectTo: "/employees", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
