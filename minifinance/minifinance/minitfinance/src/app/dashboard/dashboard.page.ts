import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  log: Object = {'collectionAmount':Number,'actualDate':Date}
  constructor(private http: HttpClient) { }

  selectedGroup = 0;
  selectedUser = 0;
  

   
  users = [];
   
  submit(log: Object) {
    alert(JSON.stringify(log))
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        //'Authorization': 'my-auth-token'
      })
    };
    

    this.http.post(
      "http://ec2-18-191-169-9.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/createUser",JSON.stringify(log), httpOptions 
   ).subscribe(data => {
    console.log(data['_body']);
   }, error => {
    console.log(error);
  });
  }
  onSelectGroup(group_id: number) {
  this.selectedGroup = group_id;
  this.selectedUser = 0;
  this.users = this.getUsers().filter((item) => {
  return item.group_id === Number(group_id)
  });
  }
   
  onSelectUser(user_id: number) {
  this.selectedUser = user_id;
  
  }
   
  getGroups() {
  return [
  { id: 1, name: 'Group1' },
  { id: 2, name: 'Group2' },
  { id: 3, name: 'Group3' }
  ];
  }
   
  getUsers() {
  return [
  { id: 1, group_id: 1, name: 'User1 of group1' },
  { id: 2, group_id: 1, name: 'User2 of group2' },
  { id: 3, group_id: 2, name: 'User1 of group2' },
  { id: 4, group_id: 2, name: 'User2 of group2' },
  { id: 5, group_id: 3, name: 'User1 of group3' },
  { id: 6, group_id: 3, name: 'User2 of group3' },
  ]
  }
   

  
  ngOnInit() {
    this.log={'collectionAmount':null,'actualDate':null}
  }

}
