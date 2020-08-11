import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isExpanded = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  collapse() {
    this.isExpanded = false;
  }

  goHome() {
    this.isExpanded = false;
    this.router.navigate(['/']);
  }

  onBtnSignInClick() {
    this.isExpanded = false;
    this.router.navigate(['/signIn']);
  }

  onBtnNewAccountClick() {
    this.isExpanded = false;
    this.router.navigate(['/newAccount']);
  }
}
