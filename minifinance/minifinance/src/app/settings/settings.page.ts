import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  collectedAmount = 0;
  totalAmount = 0;
  investment =0;
  interestAmount = 0;
  rateOfInterest = 0;
  pendingAmount = 0;
  profitAmount = 0;
  ageOfAccount = 0;


  groups: any;
  constructor(private http: HttpClient) {


  }

  ngOnInit() {

    this.http.get(
      "http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/summary/All/ALL"
    ).subscribe(data => {
      //alert(JSON.stringify(data));
    }, error => {
      alert(error);
    });
    this.groups = this.getGroupNames();
  }
  selectedGroup = 0;
  selectedUser = 0;

  users: any = [];


  onSelectGroup(group_id: number) {
    this.selectedGroup = group_id;

    this.http.get(
      "http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/usersByGroup/" + group_id
    ).subscribe(data => {
      console.log(data);
      // alert(JSON.stringify(data));
      this.users = data;
    }, error => {
      alert(error);
    });
    this.http.get(
      "http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/summary/" + this.selectedGroup + "/ALL"
    ).subscribe(data => {
      this.totalAmount = data["totalAmount"];
      this.investment = data["investment"];
      this.rateOfInterest = data["rateOfInterest"];
      this.pendingAmount = data["pendingAmount"];
      this.profitAmount = data["profit"];
      this.ageOfAccount = data["ageOfAccount"];
      this.collectedAmount = data["collectedAmount"];
      console.log(JSON.stringify(data));
     // alert(JSON.stringify(data))falert;
    }, error => {
      alert(error);
    });
  }

  onSelectUser(user_id: number) {
    this.selectedUser = user_id;
    this.http.get(
      "http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/summary/" + this.selectedGroup + "/" + user_id
    ).subscribe(data => {
      this.totalAmount = data["totalAmount"];
      this.investment = data["investment"];
      this.rateOfInterest = data["rateOfInterest"];
      this.pendingAmount = data["pendingAmount"];
      this.profitAmount = data["profit"];
      this.ageOfAccount = data["ageOfAccount"];
      this.collectedAmount = data["collectedAmount"];
      console.log(JSON.stringify(data));
    }, error => {
      alert(error);
    });

  }

  getGroupNames() {
    this.http.get(
      "http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/groups"
    ).subscribe(data => {
      console.log(data["groupsAll"])
      this.groups = data["groupsAll"];

    }, error => {
      alert(error);
    });
  }

  getGroups() {
    return this.groups;
  }




}
