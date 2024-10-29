/****
 * References
 * Tutorial used: https://www.youtube.com/watch?v=D9JHizCAx8U&list=PLyuRouwmQCjmSOb_TsD5qm0c4iO1NwDOX&index=33
 * https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation
 * https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
 * https://regexr.com/ - Tool by Grant Skinner for testing Regular Expressions
 *
 */

const APP = {
  submitted: false,
  init() {
    APP.addListeners();
  },
  addListeners() {
    const form = document.getElementById("form");

    form.querySelectorAll("input").forEach((field) => {
      field.addEventListener("change", () => APP.handleFieldValidity(field));
      field.addEventListener("input", () => APP.handleFieldValidity(field)); // Listen for input to clear messages immediately
    });

    form.addEventListener("submit", APP.validate);

    zip.addEventListener("input", APP.formatZip); //change to all caps

    //when the form gets submitted, in case of any last-minute changes.
    form.addEventListener("submit", APP.validate);
    //If all is well and the form is “submitted”, give the user a high five.
  },

  handleFieldValidity(field) {
    field.setCustomValidity(""); // Clear old message

    // Test and show messages based on field's id or name
    switch (field.id) {
      case "email":
        this.testEmail(field);

        break;

      case "country":
        this.testCountry(field);

        break;

      case "zip":
        this.testZip(field);

        break;

      case "password":
        this.testPassword(field);

        break;

      case "confirm_password":
        this.testRepeatPassword(field);

        break;
    }

    // Show the custom message if validity fails
    if (field.validationMessage) {
      field.reportValidity();
    }
  },

  testEmail(field) {
    //built-in test for error based on type, pattern, and other attrs
    let emReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emReg.test(field.value)) {
      // If invalid, set custom message
      field.setCustomValidity("Please enter a valid email address.");
    }
  },

  testCountry(field) {
    if (!field.value) {
      field.setCustomValidity("Please select a country.");
    }
  },

  formatZip(event) {
    let enteredZip = event.target;
    let ZipVal = enteredZip.value;
    ZipVal = ZipVal.toUpperCase();
    enteredZip.value = ZipVal; //converts anything typed to uppercase
  },

  testZip(field) {
    let selectedCountry = document.getElementById("country").value;

    switch (selectedCountry) {
      case "us":
        field.setAttribute("pattern", "\\d{5}(-\\d{4})?"); //5 digits or ZIP+4
        field.setAttribute("maxlength", "10");
        break;
      case "ca":
        field.setAttribute("pattern", "[A-Za-z]\\d[A-Za-z] ?\\d[A-Za-z]\\d"); //Alphanumeric in the format A1A 1A1
        field.setAttribute("maxlength", "7");
        break;
      case "uk":
        field.setAttribute(
          "pattern",
          "^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\\s?[0-9][A-Z]{2}$"
        ); //2-4ch + 3ch
        field.setAttribute("maxlength", "8");
        break;
      default:
        field.removeAttribute("pattern");
        field.removeAttribute("maxlength");
    }

    if (!field.checkValidity()) {
      field.setCustomValidity("Please enter a valid zip code.");
    }
  },

  testPassword(field) {
    const lengthSpec = document.getElementById("length");
    const upperSpec = document.getElementById("uppercase");
    const lowerSpec = document.getElementById("lowercase");
    const numberSpec = document.getElementById("number");
    const pwRequirements = document.getElementById("password-requirements");

    let enteredPw = field.value;

    const criteria = [
      { regex: /.{8,}/, element: lengthSpec },
      { regex: /[A-Z]/, element: upperSpec },
      { regex: /[a-z]/, element: lowerSpec },
      { regex: /[0-9]/, element: numberSpec },
    ];

    criteria.forEach(({ regex, element }) => {
      if (regex.test(enteredPw)) {
        element.classList.add("valid");
        element.classList.remove("invalid");
      } else {
        element.classList.add("invalid");
        element.classList.remove("valid");
      }
    });

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
      pwRequirements.classList.remove("invalid");
    } else {
      pwRequirements.classList.add("invalid");
      pwRequirements.classList.remove("valid");
    }
    // Revalidate the confirm password field after password changes
    const confirmPasswordField = document.getElementById("confirm_password");
    this.testRepeatPassword(confirmPasswordField);
  },

  testRepeatPassword(field) {
    let confirmPw = field.value;
    let password = document.getElementById("password").value;

    if (confirmPw !== password) {
      field.setCustomValidity("Passwords don't match");
    }
  },

  validate(event) {
    event.preventDefault(); // Prevent form submission for validation check
    this.submitted = true; // Set flag to indicate form has been submitted

    let form = event.target;
    let isFormValid = true;

    // Loop through each field and validate
    form.querySelectorAll("input, select").forEach((field) => {
      APP.handleFieldValidity(field);

      // Add or remove 'invalid-submitted' based on 'submitted' flag and validity
      if (this.submitted && !field.checkValidity()) {
        field.classList.add("invalid-submitted");
      } else {
        field.classList.remove("invalid-submitted");
      }

      // If any field is invalid, set isValid to false
      if (!field.checkValidity()) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      // Display success message or proceed with form submission
      const highFive = document.getElementById("high-five");
      highFive.style.display = "block";
    } else {
      // Report validity to highlight all invalid fields
      form.reportValidity();
    }
  },
};
document.addEventListener("DOMContentLoaded", APP.init);
