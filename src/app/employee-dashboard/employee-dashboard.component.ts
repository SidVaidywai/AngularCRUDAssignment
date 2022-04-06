import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators,} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import {EmployeeModel} from './employee-dash board.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  rowId=0;
  formValue !: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
   employeeData !: any;
   showAdd!: boolean;
   showUpdate !:boolean;
  
  constructor(private formbuilder:FormBuilder,
private api: ApiService) { }
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
     firstName: ['',Validators.required],
      email: ['',Validators.required],
      dateofBirth : [''],
      country: ['',Validators.required],
      avatar: ['',Validators.required],
      age: ['',Validators.required]
    }),
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postEmployeeDetails() {
    this.employeeModelObj.firstName= this.formValue.value.firstName;
    this.employeeModelObj.email= this.formValue.value.email;
    this.employeeModelObj.dateofBirth= this.formValue.value.dateofBirth;
    this.employeeModelObj.age= this.formValue.value.age;
    this.employeeModelObj.country= this.formValue.value.country;
    this.employeeModelObj.avatar= this.formValue.value.avatar;
   
    
    this.api.postEmploye(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully")
       let  ref = document.getElementById('cancel')
       ref?.click();
      
      this.formValue.reset();
      this.getAllEmployee();

    },
    err=>{
      alert("Something went wrong");
    })
  }


  getAllEmployee() {
  this.api.getEmployee()
  .subscribe(res=>{
this.employeeData = res;
  })
}


deleteEmployee(row: any){
 this.api.deleteEmployee(row)
 .subscribe(res => {
   alert("Employee Deleted");
   this.getAllEmployee();
 })
}
onEdit(card:any) {
  this.showAdd=false;
  this.showUpdate=true;
  this.employeeModelObj.id = card.id;
this.formValue.controls['firstName'].setValue(card.firstName)
this.formValue.controls['email'].setValue(card.email)
this.formValue.controls['dateofBirth'].setValue(card.dateofBirth)
this.formValue.controls['age'].setValue(card.age)
this.formValue.controls['country'].setValue(card.country)
this.formValue.controls['avatar'].setValue(card.avatar)

}

checkEmptyData(element:any):boolean
{
  if(element=="")
  {
    return false;
  }
  return true;
}


updateEmployeeDetails(){
// let emailData=this.formValue.value.email;
//   if (emailData=="" ){
// alert("email is empty");
// return;
//   }


// if(! this.checkEmptyData(this.formValue.value.firstName)) {
//   alert("FirstName is Empty");
//   return false;
// }

//  if(! this.checkEmptyData(this.formValue.value.email)) {
//    alert("Email is Empty");
//    return false;
//  }


  this.employeeModelObj.firstName= this.formValue.value.firstName;
  this.employeeModelObj.email= this.formValue.value.email;
  this.employeeModelObj.dateofBirth= this.formValue.value.dateofBirth;
  this.employeeModelObj.age= this.formValue.value.age;
  this.employeeModelObj.country= this.formValue.value.country;
  this.employeeModelObj.avatar= this.formValue.value.avatar;
  
  this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
  .subscribe(res=>{
    alert("Updated Sucessfully");
    let  ref = document.getElementById('cancel')
    ref?.click();
   
   this.formValue.reset();
   this.getAllEmployee();
  
  })
  return true;
}

validate(email:any){
  var mailformat = "/^([a-zA-Z0-9\._]+)@([a-zA-Z0-9]+).([a-z]+)(.[a-z]+)?$/";
    if(email.match(mailformat))
    {
      alert("Valid email address!");
    }
    else
    {
      alert("You have entered an invalid email address!");
    }
}
}
