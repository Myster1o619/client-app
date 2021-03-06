import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.email, this.password).
    then(response => {
      this.router.navigate(['/login']);
      this.flashMessagesService.show('You have successfully registered. Please log in with your new account details.', {
        cssClass: 'alert-success', timeout: 4000
      });
      // this.router.navigate(['/']);
    }).catch (error => {
      this.flashMessagesService.show(error.message, {
        cssClass: 'alert-danger', timeout: 4000
      });
    });
  }

}
