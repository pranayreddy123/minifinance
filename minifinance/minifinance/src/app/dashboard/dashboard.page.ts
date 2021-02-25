import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  log: any = { 'collectionAmount': Number, 'actualDate': Date }
  groups:any; 
  constructor(private http: HttpClient) { }
  selectedGroup = 0;
  selectedUser = 0;
  users:any = [];

  submit(log: any) {
   log.actualDate = log.actualDate.split('T')[0];
   console.log(JSON.stringify(log));
   // alert(JSON.stringify(log))
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        //'Authorization': 'my-auth-token'
      })
    };
  this.http.post("http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/collection", JSON.stringify(log), httpOptions
    ).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  onSelectGroup(groupId: number) {
    this.selectedGroup = groupId;
console.log("groupId"+groupId)
    this.http.get(
      "http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/usersByGroup/"+groupId
    ).subscribe(data => {
      console.log(JSON.stringify(data));
      //alert(JSON.stringify(data));
      this.users = data;
    }, error => {
      alert(error);
    });
    this.selectedUser = 0;
    
  }
  onSelectUser(userId: number) {
    this.selectedUser = userId;
  }
  get(){
    this.http.get(
      "http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/groups"
    ).subscribe(data => {
      console.log(data["groupsAll"])
      this.groups =data["groupsAll"];
    
    }, error => {
      alert(error);
    });
  }
  getGroups() {

    return this.groups;
  }
  getUsers() {

    this.http.get(
      "http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/usersByGroup/"+this.selectedGroup 
    ).subscribe(data => {
      console.log(JSON.stringify(data));
      //alert(JSON.stringify(data));
      
      this.users = data;
    }, error => {
      alert(error);
    });
  
  }

  ngOnInit() {
   this.get();
    this.log = { 'collectionAmount': null, 'actualDate': null }
  }

}
