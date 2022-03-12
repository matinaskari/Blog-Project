const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const username = document.getElementById("username");
const gender = document.getElementById("gender");
const phoneNumber = document.getElementById("phoneNumber");

form.addEventListener("submit", (e) => {
  if (!checkInputs()) {
    e.preventDefault();
    checkInputs();
  }
});


function checkInputs() {
  // trim to remove the whitespaces

  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const usernameValue = username.value.trim();
  const genderValue = $("#gender").val();
  const phoneNumberValue = phoneNumber.value.trim();

  //

  let checkFirstNameValue = false;
  let checkLastNameValue = false;
  let checkUsernameValue = false;
  let checkPhoneNumberValue = false;
  let checkgenderValue = false;

  if (firstNameValue === "") {
    setErrorFor(firstName, "first name cannot be blank");
    checkFirstNameValue = false;
  } else {
    setSuccessFor(firstName);
    checkFirstNameValue = true;
  }

  if (lastNameValue === "") {
    setErrorFor(lastName, "last name cannot be blank");
    checkLastNameValue = false;
  } else {
    setSuccessFor(lastName);
    checkLastNameValue = true;
  }

  if (usernameValue === "") {
    setErrorFor(username, "username cannot be blank");
    checkUsernameValue = false;
  } else {
    setSuccessFor(username);
    checkUsernameValue = true;
  }

  if (genderValue) {
    setSuccessFor(gender);
    checkgenderValue = true;
  }

  if (phoneNumberValue === "") {
    setErrorFor(phoneNumber, "phone number cannot be blank");
    checkPhoneNumberValue = false;
  } else if (!isPhoneNumber(phoneNumberValue)) {
    setErrorFor(phoneNumber, "not a valid phone number");
    checkPhoneNumberValue = false;
  } else {
    setSuccessFor(phoneNumber);
    checkPhoneNumberValue = true;
  }

  if (checkUsernameValue) {
    return true;
  } else {
    return false;
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function isPhoneNumber(phoneNumber) {
  return /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/.test(
    phoneNumber
  );
}

var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function () {
      div.style.visibility = "hidden";
    }, 600);
  };
}

var loadFile = function (event) {
  var reader = new FileReader();
  reader.onload = function () {
    var output = document.getElementById("output");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
};
