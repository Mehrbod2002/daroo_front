const searchparams = new URLSearchParams(window.location.search);
var urlpath = searchparams.get("requestid");
var urlpath2 = searchparams.get("userid");
var urlpath3 = searchparams.get("centerid");

if (urlpath) {
  getCustomeProfile();
  document.querySelectorAll(".requestRemove").forEach((e) => e.remove());
} else if (urlpath2) {
  document.querySelector("#profile2").remove();
  document.querySelector("#user-type option:nth-of-type(2)").remove();
} else if (urlpath3) {
  document.querySelector("#profile1").remove();
  document.querySelector("#user-type option:nth-of-type(1)").remove();
} else {
  getCenterProfile();
  getProfile();
  getData();
}
function getData() {
  var url = urldemo + `/api/support/add/doc/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        var html = "";
        response.forEach((key, index) => {
          console.log(key.document);
          html += `<div><a href="${key.document}">فایل${index + 1} </a></div>`;
        });
        document.getElementById("filebox2").innerHTML = html;
        document.getElementById("filebox").innerHTML = html;
      } else if (request.status == 400) {
        const res = JSON.parse(request.response);
        console.log(res);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          console.log(`${res[key]}`);
          msg = msg + `${res[key]}<br>`;
        });
        if (msg) {
          const errors = document.getElementById("errors");
          errors.innerHTML = msg;
          errors.className = errors.className.replace(
            "text-success",
            "text-danger"
          );
        }
      } else {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-danger'>متاسفانه مشکلی در سایت پیش آمده است لطفا بعدا تلاش کنید </span>";
      }
      setTimeout(clearMessageBox, 1000);
    };

    request.onloadstart = function () {
      $(".loader").fadeIn();
    };
    request.open("GET", url);
    request.setRequestHeader(
      "Authorization",
      `Token ${localStorage.getItem("token")}`
    );
    request.send();
  } catch (error) {
    console.error(error);
  }
}
function getCustomeProfile() {
  var url = urldemo + `/api/admin/requests/show/profile/${urlpath}/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);

        console.log(response);

        if (response.role == "CENTER") {
          document
            .getElementById("profile2")
            .classList.replace("d-none", "d-block");
          document
            .getElementById("profile")
            .classList.replace("d-block", "d-none");
          document.getElementById("user-type").selectedIndex = 1;
          //   *****************
          document.querySelector("#user-position2").value =
            response.pepresentative_position;
          document.querySelector("#phone2").value = response.phone;
          document.querySelector("#national-code2").value =
            response.national_id;
          document.querySelector("#address2").value = response.address;
          document.querySelector("#shaba2").value = response.sheba;
          document.querySelector("#card-number2").value = response.card_number;
          document.querySelector("#account-number2").value =
            response.account_number;
          document.querySelector("#name2").value = response.name;
          document.querySelector("#mobile2").value = response.mobile;
          document.querySelector("#username2").value = response.username;
          document.querySelector("#office-name2").value =
            response[0].center_name;
          document.querySelector("#postal-code2").value = response.postal_code;
          document.querySelector("#office-type2").value = response.center_type;
          document.querySelector("#office-code2").value = response.center_code;
          document.querySelector("#tracking-code2").value =
            response.economy_code;
        } else {
          document
            .getElementById("profile")
            .classList.replace("d-none", "d-block");
          document
            .getElementById("profile2")
            .classList.replace("d-block", "d-none");
          document.getElementById("user-type").selectedIndex = 0;
          //   ***************
          document.querySelector("#phone").value = response.phone;
          document.querySelector("#national-code").value = response.national_id;
          document.querySelector("#address").value = response.address;
          document.querySelector("#shaba").value = response.sheba;
          document.querySelector("#card-number").value = response.card_number;
          document.querySelector("#account-number").value =
            response.account_number;
          document.querySelector("#name").value = response.name;
          document.querySelector("#mobile").value = response.mobile;
          document.querySelector("#username").value = response.username;
        }
      } else if (request.status == 400) {
        const res = JSON.parse(request.response);
        console.log(res);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          console.log(`${res[key]}`);
          msg = msg + `${res[key]}<br>`;
        });
        if (msg) {
          const errors = document.getElementById("errors");
          errors.innerHTML = msg;
          errors.className = errors.className.replace(
            "text-success",
            "text-danger"
          );
        }
      } else {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-danger'>متاسفانه مشکلی در سایت پیش آمده است لطفا بعدا تلاش کنید </span>";
      }
      setTimeout(clearMessageBox, 1000);
    };

    request.onloadstart = function () {
      $(".loader").fadeIn();
    };
    request.open("GET", url);
    request.setRequestHeader(
      "Authorization",
      `Token ${localStorage.getItem("token")}`
    );
    request.send();
  } catch (error) {
    console.error(error);
  }
}
function getProfile() {
  var url = urldemo + `/api/profile/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);

        console.log(response[0]);
        // document.querySelector("#user-position").value = response[0].role;

        document
          .querySelector("#profile")
          .setAttribute("formid", response[0].id);
        document.querySelector("#phone").value = response[0].phone;
        document.querySelector("#national-code").value =
          response[0].national_id;
        document.querySelector("#address").value = response[0].address;
        document.querySelector("#shaba").value = response[0].sheba;
        document.querySelector("#card-number").value = response[0].card_number;
        document.querySelector("#account-number").value =
          response[0].account_number;
        document.querySelector("#name").value = response[0].name;
        document.querySelector("#mobile").value = response[0].mobile;
        document.querySelector("#username").value = response[0].username;
        document.querySelector("#password").value = response[0].password;
      } else if (request.status == 400) {
        const res = JSON.parse(request.response);
        console.log(res);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          console.log(`${res[key]}`);
          msg = msg + `${res[key]}<br>`;
        });
        if (msg) {
          const errors = document.getElementById("errors");
          errors.innerHTML = msg;
          errors.className = errors.className.replace(
            "text-success",
            "text-danger"
          );
        }
      } else {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-danger'>متاسفانه مشکلی در سایت پیش آمده است لطفا بعدا تلاش کنید </span>";
      }
      setTimeout(clearMessageBox, 1000);
    };

    request.onloadstart = function () {
      $(".loader").fadeIn();
    };
    request.open("GET", url);
    request.setRequestHeader(
      "Authorization",
      `Token ${localStorage.getItem("token")}`
    );
    request.send();
  } catch (error) {
    console.error(error);
  }
}

function getCenterProfile() {
  var url = urldemo + `/api/center/profile/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);

        console.log(response[0]);
        document
          .querySelector("#profile2")
          .setAttribute("formid", response[0].id);
        if (response[0].role == "CENTER") {
          document
            .getElementById("profile2")
            .classList.replace("d-none", "d-block");
          document
            .getElementById("profile")
            .classList.replace("d-block", "d-none");
          document.getElementById("user-type").selectedIndex = 1;
        } else {
          document
            .getElementById("profile")
            .classList.replace("d-none", "d-block");
          document
            .getElementById("profile2")
            .classList.replace("d-block", "d-none");
          document.getElementById("user-type").selectedIndex = 0;
        }
        document.querySelector("#user-position2").value =
          response[0].pepresentative_position;
        document.querySelector("#phone2").value = response[0].phone;
        document.querySelector("#national-code2").value =
          response[0].national_id;
        document.querySelector("#address2").value = response[0].address;
        document.querySelector("#shaba2").value = response[0].sheba;
        document.querySelector("#card-number2").value = response[0].card_number;
        document.querySelector("#account-number2").value =
          response[0].account_number;
        document.querySelector("#office-name2").value = response[0].center_name;
        document.querySelector("#mobile2").value = response[0].mobile;
        document.querySelector("#name2").value = response[0].name;
        document.querySelector("#username2").value = response[0].username;

        document.querySelector("#password2").value = response[0].password;
        document.querySelector("#postal-code2").value = response[0].postal_code;
        document.querySelector("#office-type2").value = response[0].center_type;
        document.querySelector("#office-code2").value = response[0].center_code;
        document.querySelector("#tracking-code2").value =
          response[0].economy_code;
      } else if (request.status == 400) {
        const res = JSON.parse(request.response);
        console.log(res);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          console.log(`${res[key]}`);
          msg = msg + `${res[key]}<br>`;
        });
        if (msg) {
          const errors = document.getElementById("errors");
          errors.innerHTML = msg;
          errors.className = errors.className.replace(
            "text-success",
            "text-danger"
          );
        }
      } else {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-danger'>متاسفانه مشکلی در سایت پیش آمده است لطفا بعدا تلاش کنید </span>";
      }
      setTimeout(clearMessageBox, 1000);
    };

    request.onloadstart = function () {
      $(".loader").fadeIn();
    };
    request.open("GET", url);
    request.setRequestHeader(
      "Authorization",
      `Token ${localStorage.getItem("token")}`
    );
    request.send();
  } catch (error) {
    console.error(error);
  }
}
