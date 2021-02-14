import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private http: HttpClient) { }
  register(form: NgForm) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        //'Authorization': 'my-auth-token'
      })
    };
    
    const jsonBody = {
      "email": form.controls['email'].value,
      "firstName": form.controls['fname'].value,
      "lastName": form.controls['lname'].value,
      "aadharCardNo": form.controls['adharNumber'].value,
      "phoneNo": Number(form.controls['phoneNumber'].value),
      "address": form.controls['address'].value,
      "dow": form.controls['dowo'].value
    }
    
      console.log(JSON.stringify(jsonBody));
   // alert(JSON.stringify(jsonBody))

    this.http.post(
      "http://ec2-3-20-228-130.us-east-2.compute.amazonaws.com:8080/minifinan/mini-finance/createUser", jsonBody, httpOptions
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

  ngOnInit() {
  }

}
