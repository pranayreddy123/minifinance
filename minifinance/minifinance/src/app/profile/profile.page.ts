import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  group: any = {'groupName':String,'duration':Number,'startDate':Date,'endDate':Date,'loanAmount':Number,'interestRate':Number,'investment':Number,'groupUsers':[]};
  user: Object = {'firstName':String,'lastName':Number,'address':String,'phoneNumber':Number,'aadharNumber':String,'dowo':String,'email':String};
  type: string = "";
  isItemAvailable = false;
  users: User[];
  selectedUser: User;
  selectedGroupUsers:[]

  constructor(private http: HttpClient) {  
  this.users = [
    { id: 1, name: 'pedi, reddy' },
    { id: 2, name: 'praharsh' },
    { id: 3, name: 'Swathi' },
    { id: 4, name: 'Sandhya' },
    { id: 5, name: 'Mallesh' },
    { id: 6, name: 'Sanvi' },
    { id: 7, name: 'John' },
    { id: 8, name: 'Ravi' },
    { id: 9, name: 'Raj Kumar' },
    { id: 10, name: 'Reddy reddy' },
    { id: 11, name: 'Anugu, reddy' },
    { id: 12, name: 'Bala, raju' }
  ];}
  userChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
   this.selectedGroupUsers = event.value;
   // alert(JSON.stringify(event.value));
  }
  submitUser(user: Object) {
    alert(JSON.stringify(user))
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        //'Authorization': 'my-auth-token'
      })
    };
    console.log(JSON.stringify(user))
    
    


    this.http.post(
      "http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/createUser", JSON.stringify(user), httpOptions
    ).subscribe(data => {
      console.log(data['_body']);
     // alert(data['_body'])
     // form.controls['userMessage'].value == data['_body'];
     }, error => {
      //form.controls['userMessage'].value == error;
      console.log(JSON.stringify(error));
      alert(JSON.stringify(error))
    });

  }

  submitGroup(group: any) {
    group.groupUsers=this.selectedGroupUsers;
    alert(JSON.stringify(group))
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        //'Authorization': 'my-auth-token'
      })
    };
    
    console.log(JSON.stringify(group))
    this.http.post(
      "http://ec2-18-191-169-9.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/createUser",JSON.stringify(group), httpOptions 
   ).subscribe(data => {
    console.log(data['_body']);
   // form.controls['groupMessage'].value == data['_body'];
   }, error => {
    //form.controls['groupMessage'].value == error;
    console.log(error);
  });

  }

  getUsers() {
    return [
    { id: 1, name: 'User1 ' },
    { id: 2, name: 'User2 ' },
    { id: 3, name: 'User3' },
    { id: 4, name: 'User4' },
    { id: 5, name: 'User5' },
    { id: 6, name: 'User6' },
    ]
    }


  ngOnInit() {
    
    this.group = {'groupName':null,'duration':null,'startDate':null,'endDate':null,'loanAmount':null,'interestRate':null};
    this.user= {'firstName':null,'lastName':null,'address':null,'phoneNumber':null,'aadharNumber':null,'dowo':null,'email':null};
  }

}
