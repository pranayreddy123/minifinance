import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor() { }
  register(form) {
    alert(form.value)
  //  this.authService.register(form.value).subscribe((res) => {
    //  this.router.navigateByUrl('home');
    
  }

  ngOnInit() {
  }

}
