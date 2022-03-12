const firstName = document.getElementById("f_name");
const lastName = document.getElementById("l_name");
const username = document.getElementById("u_name");
const gender = document.getElementById("gender");
const phoneNumber = document.getElementById("phone");
const password = document.getElementById("psw");
const password2 = document.getElementById("psw_repeat");



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
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  // check if value is ready for submit or not
  let checkFirstNameValue = false;
  let checkLastNameValue = false;
  let checkUsernameValue = false;
  let checkPhoneNumberValue = false;
  let checkgenderValue = false;
  let checkpasswordValue = false;
  let checkpassword2Value = false;

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

  if (passwordValue === "") {
    setErrorFor(password, "password cannot be blank");
    checkpasswordValue = false;
  } else if (!isPassword(passwordValue)) {
    setErrorFor(password, "password must contain minimum eight characters, at least one letter and one number");
    checkpasswordValue = false;
  } else {
    setSuccessFor(password);
    checkpasswordValue = true;
  }

  if (password2Value === "") {
    setErrorFor(password2, "repeat password cannot be blank");
    checkpassword2Value = false;
  } else if (passwordValue !== password2Value) {
    setErrorFor(password2, "passwords does not match");
    checkpassword2Value = false;
  } else if (!isPassword(password2Value)) {
    setErrorFor(password2, "password pattern doesn't match");
    checkpasswordValue = false;
  } else {
    setSuccessFor(password2);
    checkpassword2Value = true;
  }
  if (
    checkFirstNameValue &&
    checkLastNameValue &&
    checkUsernameValue &&
    checkPhoneNumberValue &&
    checkgenderValue &&
    checkpasswordValue &&
    checkpassword2Value
  ) {
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

function isPassword(password) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}

var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.visibility = "hidden"; }, 600);
  }
}