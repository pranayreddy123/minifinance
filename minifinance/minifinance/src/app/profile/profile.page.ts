import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonicSelectableComponent } from 'ionic-selectable';

class User {
  public id: number;
  public name: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  type: string = "";
  isItemAvailable = false;
  users: any ;
  selectedUser: User;
  selectedGroupUsers:any =[]
  message:String;
  isUserForm: FormGroup;
  isMessage: boolean = false;
  isUserGroupForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {  
this.getUsers();
}
ngOnInit() {
  this.buildForm();
}
getUsers(){
  this.http.get(
    "http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/users"
  ).subscribe(data => {
    this.users= data; 
  }, error => {
    alert(error);
  });
}
buildForm(){
  this.isUserForm = this.formBuilder.group({
    fname: ['', [Validators.required]],
    lname: ['', [Validators.required]],
    address: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    dowo: ['', Validators.required],
    email: ['', Validators.required],
    aadharNumber: ['', Validators.required]
  });
  this.isUserGroupForm = this.formBuilder.group({
    groupName: ['', [Validators.required]],
    duration: ['', [Validators.required]],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    loanAmount: ['', Validators.required],
    interestRate: ['', Validators.required],
    investment: ['', Validators.required],
    groupUsers: [[], Validators.required],
  });
  
}
get formControls() {
  return this.isUserForm.controls;
}
  userChange(event: {
    component: IonicSelectableComponent,
    value: any,
  }) {
    if(event.value.length<11){
      this.selectedGroupUsers = event.value;
   }else{
   alert("Max 10 users are allowed in group");
   }
  }
submitUser(){
  const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
          //'Authorization': 'my-auth-token'
        })
      };
      this.http.post(
            "http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/users", this.isUserForm.value, httpOptions
          ).subscribe((data: any) => { 
             this.isMessage = true;
            this.message = data["result"];
            this.isUserForm.reset();
            this.message = data.result
            setTimeout( () => {
              this.message = ''
              this.isMessage = false;
           }, 5000);
            this.getUsers();
           }, error => {
            console.log(JSON.stringify(error));
          });
}
submitGroup() {
  this.isUserGroupForm.controls.startDate.setValue(this.isUserGroupForm.controls.startDate.value.split('T')[0]);
  this.isUserGroupForm.controls.endDate.setValue(this.isUserGroupForm.controls.endDate.value.split('T')[0]);
  this.isUserGroupForm.controls.groupUsers.setValue(this.selectedGroupUsers);
 // alert(JSON.stringify(group))
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      //'Authorization': 'my-auth-token'
    })
  };
  this.http.post(
    "http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/groups",this.isUserGroupForm.value, httpOptions 
 ).subscribe((data: any) => {
  this.isMessage = true;
 this.message = data["result"];
 this.isUserGroupForm.reset();
 this.message = data.result
 setTimeout( () => {
   this.message = ''
   this.isMessage = false;
}, 5000);
 // form.controls['groupMessage'].value == data['_body'];
 }, error => {
  //form.controls['groupMessage'].value == error;
  console.log(error);
});

}
}
