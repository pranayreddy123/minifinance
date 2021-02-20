import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  selectedGroup = 0;
  selectedUser = 0;
   
  users = [];
  cities = [];
   
   
  onSelectGroup(group_id: number) {
  this.selectedGroup = group_id;
  this.selectedUser = 0;
  this.cities = [];
  this.users = this.getUsers().filter((item) => {
  return item.group_id === Number(group_id)
  });
  }
   
  onSelectUser(user_id: number) {
  this.selectedUser = user_id;
  this.cities = this.getCity().filter((item) => {
  return item.user_id === Number(user_id)
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
   
  getCity() {
  return [
  { id: 1, user_id: 1, name: 'City1' },
  { id: 2, user_id: 1, name: 'City11' },
  { id: 3, user_id: 1, name: 'City12' },
  { id: 4, user_id: 1, name: 'City13' },
  { id: 5, user_id: 2, name: 'City14' },
  { id: 6, user_id: 2, name: 'City15' },
  { id: 7, user_id: 2, name: 'City16' },
  { id: 8, user_id: 2, name: 'City17' },
  { id: 9, user_id: 3, name: 'City18' },
  { id: 10, user_id: 3, name: 'City19' },
  { id: 11, user_id: 3, name: 'City20' },
  { id: 12, user_id: 4, name: 'City21' },
  { id: 13, user_id: 4, name: 'City23' },
  { id: 14, user_id: 5, name: 'City24' },
  { id: 15, user_id: 5, name: 'City25' },
  { id: 16, user_id: 5, name: 'City26' },
  { id: 17, user_id: 6, name: 'City27' },
  { id: 18, user_id: 6, name: 'City28' },
  ]
  }
}
