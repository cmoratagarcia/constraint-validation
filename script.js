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
    let form = document.getElementById("form");
    let email = document.getElementById("email");
    let country = document.getElementById("country");
    let zip = document.getElementById("zip");
    let password = document.getElementById("password");
    let repeatPassword = document.getElementById("confirm_password");

    //after changing the whole value
    email.addEventListener("change", APP.testEmail); //Use blur instead?
    zip.addEventListener("change", APP.testZip);
    country.addEventListener("blur", APP.testCountry);
    password.addEventListener("change", APP.testPassword);
    repeatPassword.addEventListener("change", APP.testRepeatPassword);

    //while typing
    email.addEventListener("input", function () {
      email.setCustomValidity(""); //so the prompt doesn't keep displaying while the user types
    }); //Move this to separate function for all fields?

    zip.addEventListener("input", APP.formatZip); //change to all caps

    //create fail function with switch statement for all errors?

    //when the form gets submitted, in case of any last-minute changes.
    form.addEventListener("submit", APP.validate);
    //If all is well and the form is “submitted”, give the user a high five.
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
        zip.setAttribute("pattern", "\\d{5}(-\\d{4})?"); //5 digits or ZIP+4
        zip.setAttribute("maxlength", "10");
        break;
      case "ca":
        zip.setAttribute("pattern", "[A-Za-z]\\d[A-Za-z] ?\\d[A-Za-z]\\d"); //Alphanumeric in the format A1A 1A1
        zip.setAttribute("maxlength", "7");
        break;
      case "uk":
        zip.setAttribute(
          "pattern",
          "^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\\s?[0-9][A-Z]{2}$"
        ); //2-4ch + 3ch
        zip.setAttribute("maxlength", "8");
        break;
      default:
        zip.removeAttribute("pattern");
        zip.removeAttribute("maxlength");
    }
    let zipStatus = zip.checkValidity();
    if (!zipStatus) {
      zip.setCustomValidity("Please enter a valid zip code.");
      zip.reportValidity();
    }
  },

  testPassword() {
    const lengthSpec = document.getElementById("length");
    const upperSpec = document.getElementById("uppercase");
    const lowerSpec = document.getElementById("lowercase");
    const numberSpec = document.getElementById("number");
    const pwRequirements = document.getElementById("password-requirements");

    let enteredPw = password.value;

    enteredPw.length >= 8
      ? (lengthSpec.style.display = "none")
      : lengthSpec.classList.add("invalid");

    /[A-Z]/.test(enteredPw)
      ? (upperSpec.style.display = "none")
      : upperSpec.classList.add("invalid");

    /[a-z]/.test(enteredPw)
      ? (lowerSpec.style.display = "none")
      : lowerSpec.classList.add("invalid");

    /[0-9]/.test(enteredPw)
      ? (numberSpec.style.display = "none")
      : numberSpec.classList.add("invalid");

    let requirements = document.querySelectorAll(".requirement");
    let hasInvalid = true;

    for (let item of requirements) {
      //hide 'Pasword must include' if all correct
      if (item.classList.contains("invalid")) {
        break; // Exit the loop if we find an invalid item
      } else {
        hasInvalid = false;
      }
    }

    if (!hasInvalid) {
      pwRequirements.classList.add("valid");
    }
  },

  testRepeatPassword(event) {
    let confirmPw = event.target;
    confirmPw.setCustomValidity("");
    if (confirmPw.value !== password.value) {
      confirmPw.setCustomValidity("Passwords don't match");
      confirmPw.reportValidity();
    }
  },

  validate(event) {
    event.preventDefault();

    let form = event.target;
    if (!form.checkValidity()) {
      form.setCustomValidity("Please review incorrect fields");
      form.reportValidity();
    } else {
      const highFive = document.getElementById("high-five");
      highFive.style.display = "block";
    }
  },
};
document.addEventListener("DOMContentLoaded", APP.init);
