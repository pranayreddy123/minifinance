import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  loanAmount=0;
  totalAmount=0;
  interestAmount=0;
  rateOfInterest=0;
  pendingAmount=0;
  profitAmount=0;
  ageOfAccount=0;
  constructor(private http: HttpClient) { 
    this.http.get(
      "http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/summary?groupID=All&userID=ALL"
    ).subscribe(data => {
      alert(JSON.stringify(data['_body']));
    }, error => {
      alert(error);
    });

  }

  ngOnInit() {
  }
  selectedGroup = 0;
  selectedUser = 0;
   
  users = [];
  cities = [];
   
   
  onSelectGroup(group_id: number) {
  this.selectedGroup = group_id;

  this.http.get(
    "http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/usersByGroup?groupID="+group_id
  ).subscribe(data => {
    alert(JSON.stringify(data['_body']));
  }, error => {
    alert(error);
  });
  this.http.get(
    "http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/summary?groupID="+this.selectedGroup+"& userID=ALL"
  ).subscribe(data => {
    this.users = data['_body'];
    alert(JSON.stringify(data['_body']));
  }, error => {
    alert(error);
  });
  this.selectedUser = 0;
  }
   
  onSelectUser(user_id: number) {
  this.selectedUser = user_id;
  this.http.get(
    "http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/summary?groupID="+this.selectedGroup+"&userID="+user_id
  ).subscribe(data => {
    alert(JSON.stringify(data['_body']));
  }, error => {
    alert(error);
  });
  
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
   

}
