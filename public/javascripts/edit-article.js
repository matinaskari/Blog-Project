const title = document.getElementById("title");

const text = document.getElementById("text");

const header = document.getElementById("articleHeader");

form.addEventListener("submit", (e) => {
  if (!checkInputs()) {
    e.preventDefault();
    checkInputs();
  }
});

function checkInputs() {
  // trim to remove the whitespaces

  const titleValue = title.value.trim();

  const textValue = text.value.trim();

  //

  let checktitleValue = false;

  let checktextValue = false;

  if (header.files.length !== 0) {
    setSuccessFor(header);
  }

  if (titleValue === "") {
    setErrorFor(title, "title cannot be blank");
    checktitleValue = false;
  } else {
    setSuccessFor(title);
    checktitleValue = true;
  }

  if (textValue === "") {
    setErrorFor(text, "text cannot be blank");
    checktextValue = false;
  } else {
    setSuccessFor(text);
    checktextValue = true;
  }

  if (checktitleValue && checktextValue) {
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

var loadFile = function (event) {
  var reader = new FileReader();
  reader.onload = function () {
    var output = document.getElementById("output");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
};


// tiny mce

tinymce.init({
  selector: "textarea#text",
  height: 500,
  menubar: false,
  plugins: [
    "advlist autolink lists link image charmap print preview anchor",
    "searchreplace visualblocks code fullscreen",
    "insertdatetime media table paste code help wordcount",
  ],
  toolbar:
    "undo redo | formatselect | " +
    "bold italic backcolor | alignleft aligncenter " +
    "alignright alignjustify | bullist numlist outdent indent | " +
    "removeformat | help",
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
});