import { Settings } from './../models/Settings';
import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  settings: Settings = {
    allowRegistration: false,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true
  }

  constructor() { }

  getSettings() {
    return this.settings;
  }

}
