const comment = document.getElementById("comment");

form.addEventListener("submit", (e) => {
  if (!checkInputs()) {
    e.preventDefault();
    checkInputs();
  }
});

function checkInputs() {
  // trim to remove the whitespaces

  const commentValue = comment.value.trim();


  // check if value is ready for submit or not

  let checkCommentValue = false;


  if (commentValue === "") {
    setErrorFor(comment, "comment cannot be blank");
    checkCommentValue = false;
  } else {
    setSuccessFor(comment);
    checkCommentValue = true;
  }



  if (checkCommentValue ) {
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





