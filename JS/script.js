// globale variable declration

let allUserInfo = [];
let regForm = document.querySelector(".reg-form");
let loginForm = document.querySelector(".login-form");
let allInputs = regForm.querySelectorAll("input");
let allLoginInputs = loginForm.querySelectorAll("input");
let loginBtn = loginForm.querySelector("button");
let regBtn = regForm.querySelector("button");

// getting data from local storage
if ((userInfo = localStorage.getItem("allUserInfo") != null)) {
  allUserInfo = JSON.parse((userInfo = localStorage.getItem("allUserInfo")));
}
// registration coding
regForm.onsubmit = (e) => {
  e.preventDefault();
  let checkEmail = allUserInfo.find((data) => {
    return data.email == allInputs[4].value;
  });
  if (checkEmail == undefined) {
    let data = {};
    for (const el of allInputs) {
      let key = el.name;
      data[key] = el.value;
    }
    regBtn.innerText = "Processing...";
    setTimeout(() => {
      regBtn.innerText = "Register";
      allUserInfo.push(data);
      localStorage.setItem("allUserInfo", JSON.stringify(allUserInfo));
      swal("Good job !", "Registration success.", "success");
    }, 2000);
  } else {
    swal("Failed !", "Email already registered !", "warning");
  }

  regForm.reset(" ");
};

// login coding
loginForm.onsubmit = (e) => {
  e.preventDefault();
  //   check email in your data base
  let checkEmail = allUserInfo.find((data) => {
    return data.email == allLoginInputs[0].value;
  });
  if (checkEmail != undefined) {
    if (checkEmail.password == allLoginInputs[1].value) {
      swal("Good !", "Login success.", "success");
      loginBtn.innerText = "Wait please..";
      setTimeout(() => {
        loginBtn.innerText = "Login";
        window.location = "profile/profile.html";
        checkEmail.password = null;
        sessionStorage.setItem("__au__", JSON.stringify(checkEmail));
      }, 3000);
    } else {
      swal("Failed !", "wrong password !", "warning");
    }
  } else {
    swal("Failed !", "Email is not registered !", "warning");
  }
};
