import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  log: any = { 'collectionAmount': Number, 'actualDate': Date }
  groups:any; 
  isLogForm: FormGroup;
  isUser: boolean = false;
  message: any;
  constructor(private http: HttpClient, private readonly formBuilder: FormBuilder) { }
  selectedGroup = 0;
  selectedUser = 0;
  users:any = [];

  ngOnInit() {
    this.buildForm();
   this.get();
    this.log = { 'collectionAmount': null, 'actualDate': null }
  }
  saveLogsdata(){
       const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        //'Authorization': 'my-auth-token'
      })
    };
    this.isLogForm.controls.actualDate.setValue(this.isLogForm.controls.actualDate.value.split('T')[0]);
  this.http.post("http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/collection",this.isLogForm.value, httpOptions
    ).subscribe((data: any) => {
      console.log(data);
      this.isLogForm.reset();
      this.isUser = false;
      this.message = data.result
      setTimeout( () => {
        this.message = ''
     }, 5000);
    }, error => {
      console.log(error);
    });
  }
buildForm(){
  this.isLogForm = this.formBuilder.group({
    collectionAmount: ['', [Validators.required]],
    actualDate: ['', [Validators.required]],
    user: ['', Validators.required],
    group: ['', Validators.required]
  });
}
get formControls() {
  return this.isLogForm.controls;
}

  onSelectGroup(groupId: number) {
    this.isUser = true;
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

 

}
