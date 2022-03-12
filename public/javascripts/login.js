const username = document.getElementById("u_name");

const password = document.getElementById("psw");

form.addEventListener("submit", (e) => {
  if (!checkInputs()) {
    e.preventDefault();
    checkInputs();
  }
});

function checkInputs() {
  // trim to remove the whitespaces

  const usernameValue = username.value.trim();

  const passwordValue = password.value;

  // check if value is ready for submit or not

  let checkUsernameValue = false;

  let checkpasswordValue = false;

  if (usernameValue === "") {
    setErrorFor(username, "username cannot be blank");
    checkUsernameValue = false;
  } else {
    setSuccessFor(username);
    checkUsernameValue = true;
  }

  if (passwordValue === "") {
    setErrorFor(password, "password cannot be blank");
    checkpasswordValue = false;
  } else {
    setSuccessFor(password);
    checkpasswordValue = true;
  }

  if (checkUsernameValue && checkpasswordValue) {
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


var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.visibility = "hidden"; }, 600);
  }
}