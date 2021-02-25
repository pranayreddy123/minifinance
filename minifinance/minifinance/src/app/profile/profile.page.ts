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
  users: any ;
  selectedUser: User;
  selectedGroupUsers:[]

  constructor(private http: HttpClient) {  

    this.http.get(
      "http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/users"
    ).subscribe(data => {
      this.users= data;
    }, error => {
      alert(error);
    });
}
  userChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    if(event.value.length<11){
      this.selectedGroupUsers = event.value;
   }else{
   alert("Max 10 users are allowed in group");
   }
  }
  submitUser(user: Object) {
    console.log(JSON.stringify(user));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        //'Authorization': 'my-auth-token'
      })
    };
    console.log(JSON.stringify(user))
    
    


   this.http.post(
      "http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/users", JSON.stringify(user), httpOptions
    ).subscribe(data => {
      console.log(data);
     // alert(data['_body'])
     // form.controls['userMessage'].value == data['_body'];
     }, error => {
      //form.controls['userMessage'].value == error;
      console.log(JSON.stringify(error));
    //  alert(JSON.stringify(error))
    });
    

  }

  submitGroup(group: any) {
    group.groupUsers=this.selectedGroupUsers;
    group.startDate = group.startDate.split('T')[0];
    group.endDate = group.endDate.split('T')[0];
   // alert(JSON.stringify(group))
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        //'Authorization': 'my-auth-token'
      })
    };
    
    console.log(JSON.stringify(group))
    this.http.post(
      "http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/groups",JSON.stringify(group), httpOptions 
   ).subscribe(data => {
    console.log(data);
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
