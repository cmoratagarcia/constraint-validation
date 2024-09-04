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

    //after changing the whole value
    email.addEventListener("change", APP.testEmail);
    zip.addEventListener("change", APP.testZip);
    password.addEventListener("change", APP.testPassword);
    repeatPassword.addEventListener("change", APP.testRepeatPassword);
  },

  testEmail(event) {
    let email = event.target;
    email.setCustomValidity(""); //clear old message
    //built-in test for error based on type, pattern, and other attrs
    let isValid = email.checkValidity();
    //console.log('currently', currently);
    if (isValid) {
      let emReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emReg.test(email.value) === false) {
        //not a valid address
        email.setCustomValidity("Please enter a valid email address.");
        email.reportValidity(); //show the custom message, trigger invalid event
      }
    }
  },
};
document.addEventListener("DOMContentLoaded", APP.init);
//If all is well and the form is “submitted”, give the user a high five.
