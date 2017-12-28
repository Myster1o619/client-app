import { SettingsService } from './../services/settings.service';
import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class RegisterGuard implements CanActivate {

    constructor(
        private settingsService: SettingsService,
        private router: Router,
    ) {}

    canActivate(): boolean{
     if (this.settingsService.getSettings().allowRegistration) {
         return true;
     } else {
         this.router.navigate(['/login']);
         return false;
     }
    }
}