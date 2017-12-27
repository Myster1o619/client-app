import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUserEmail: string;
  showRegister: boolean;

  constructor(private authService: AuthService,
  private router: Router,
  private flashMessagesService: FlashMessagesService ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUserEmail = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.flashMessagesService.show('You have successfully logged out.', {
      cssClass: 'alert-success', timeout: 4000
    });
  }

}
