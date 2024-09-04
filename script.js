/****
 * References
 * Tutorial used: https://www.youtube.com/watch?v=D9JHizCAx8U&list=PLyuRouwmQCjmSOb_TsD5qm0c4iO1NwDOX&index=33
 * https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation
 * https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
 * https://regexr.com/ - Tool by Grant Skinner for testing Regular Expressions
 *
 */

const APP = {
  init() {
    APP.addListeners();
  },
  addListeners() {
    let form = document.getElementsByClassName("form");
    let email = document.getElementById("email");
    let country = document.getElementById("country");
    let zip = document.getElementById("zip");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirm_password");
  },
};
document.addEventListener("DOMContentLoaded", APP.init);
//If all is well and the form is “submitted”, give the user a high five.
