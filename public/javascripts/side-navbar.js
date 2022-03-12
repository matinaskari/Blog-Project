function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

async function request(method, url = "", data) {
  const options = {
    method,
    referrerPolicy: "no-referrer",
    credentials: "same-origin",
    cache: "no-cache",
    mode: "cors",
  };
  if (!!data) {
    options["body"] = JSON.stringify(data);
    options["headers"] = {
      "Content-Type": "application/json",
    };
  }
  // Default options are marked with *
  const response = await fetch(url, options);
  return response.json(); // parses JSON response into native JavaScript objects
}

function remove() {
  const id = document.getElementById("userId").value;
  console.log(id);
  if (confirm("Are you sure you want to delete your account?")) {
    request("DELETE", `/${id}`);
    window.location.href = "/";
  }
}
