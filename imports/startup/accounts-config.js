import { Accounts } from 'meteor/accounts-base';
import './route_controllers.js';



Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});