import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  group: Object = {'groupName':String,'duration':Number,'startDate':Date,'endDate':Date,'loanAmount':Number,'interestRate':Number,'investment':Number};
  user: Object = {'firstName':String,'lastName':Number,'address':String,'phoneNumber':Number,'aadharNumber':String,'dowo':String,'email':String};
  type: string = "";
  constructor(private http: HttpClient) { }
  submitUser(user: Object) {
    alert(JSON.stringify(user))
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        //'Authorization': 'my-auth-token'
      })
    };
    
    


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

  submitGroup(group: Object) {
    
    alert(JSON.stringify(group))
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        //'Authorization': 'my-auth-token'
      })
    };
    

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

  ngOnInit() {

    this.group = {'groupName':null,'duration':null,'startDate':null,'endDate':null,'loanAmount':null,'interestRate':null};
    this.user= {'firstName':null,'lastName':null,'address':null,'phoneNumber':null,'aadharNumber':null,'dowo':null,'email':null};
  }

}
