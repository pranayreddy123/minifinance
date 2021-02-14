import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private http: HttpClient) { }

  register(form: NgForm) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        //'Authorization': 'my-auth-token'
      })
    };
    const jsonBody = {
      "groupName": form.controls['name'].value,
      "duration":  form.controls['lname'].value,
      "startDate": form.controls['startDate'].value,
      "endDate": form.controls['endDate'].value,
      "laonAmount": form.controls['loanAmount'].value,
      "interestRate": form.controls['interestRate'].value,
     
    }

    this.http.post(
      "http://ec2-18-191-169-9.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/createUser",jsonBody, httpOptions 
   ).subscribe(data => {
    console.log(data['_body']);
   // form.controls['groupMessage'].value == data['_body'];
   }, error => {
    //form.controls['groupMessage'].value == error;
    console.log(error);
  });

  }

  ngOnInit() {
  }

}
