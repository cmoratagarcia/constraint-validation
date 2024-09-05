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
    let repeatPassword = document.getElementById("confirm_password");

    //after changing the whole value
    email.addEventListener("change", APP.testEmail); //Use blur instead?
    zip.addEventListener("blur", APP.testZip);
    password.addEventListener("change", APP.testPassword);
    repeatPassword.addEventListener("change", APP.testRepeatPassword);

    //while typing
    email.addEventListener("input", function () {
      email.setCustomValidity(""); //so the prompt doesn't keep displaying while the user types
    }); //Move this to separate function for all fields?

    zip.addEventListener("input", APP.formatZip); //change to all caps

    //what to do if something went wrong during validation

    //when the form gets submitted, in case of any last-minute changes. Add high five here
  },

  testEmail(event) {
    let email = event.target;
    email.setCustomValidity(""); //clear old message
    //built-in test for error based on type, pattern, and other attrs
    let emReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emReg.test(email.value) === false) {
      //not a valid address
      email.setCustomValidity("Please enter a valid email address.");
      email.reportValidity(); //show the custom message, trigger invalid event
    }
  },

  testCountry() {
    country.setCustomValidity(""); //clear old message
    if (!country.value) {
      country.setCustomValidity("Please select a country.");
      country.reportValidity(); //show the custom message, trigger invalid event
    }
  },

  formatZip(event) {
    let enteredZip = event.target;
    let ZipVal = enteredZip.value;
    ZipVal = ZipVal.toUpperCase();
    enteredZip.value = ZipVal; //converts anything typed to uppercase
  },

  testZip() {
    let selectedCountry = country.value;
    zip.setCustomValidity("");
    switch (selectedCountry) {
      case "us":
        zip.setAttribute("pattern", "\\d{5}(-\\d{4})?");
        zip.setAttribute("maxlength", "10");
        break;
      case "ca":
        zip.setAttribute("pattern", "[A-Za-z]\\d[A-Za-z] ?\\d[A-Za-z]\\d");
        zip.setAttribute("maxlength", "7");
        break;
      case "uk":
        zip.setAttribute(
          "pattern",
          "^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\\s?[0-9][A-Z]{2}$"
        );
        zip.setAttribute("maxlength", "8");
        break;
      default:
        zip.removeAttribute("pattern");
        zip.removeAttribute("maxlength");
    }
    let zipStatus = zip.checkValidity();
    if (!zipStatus) {
      console.log(selectedCountry);
      zip.setCustomValidity("Please enter a valid zip code.");
      zip.reportValidity();
    }
  },
};
document.addEventListener("DOMContentLoaded", APP.init);
//If all is well and the form is “submitted”, give the user a high five.
