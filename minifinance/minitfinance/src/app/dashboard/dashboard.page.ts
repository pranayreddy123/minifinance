import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor() { }

  register(form) {
    alert(form.value)
  //  this.authService.register(form.value).subscribe((res) => {
    //  this.router.navigateByUrl('home');
    
  }

  ngOnInit() {
  }

}
