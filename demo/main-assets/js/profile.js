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
  document.querySelectorAll(".requestRemove").forEach((e) => e.remove());

  getProfile();
} else if (urlpath3) {
  document.querySelector("#profile").remove();
  document.querySelector("#user-type option:nth-of-type(1)").remove();
  document.querySelectorAll(".requestRemove").forEach((e) => e.remove());
  getCenterProfile();
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
      } else if (request.status == 400 || request.status == 403) {
        const res = JSON.parse(request.response);
        console.log(res);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          console.log(`${res[key]}`);
          msg = msg + `${res[key]}<br>`;
        });
        if (msg) {
          $(".messagewrapper").fadeIn();
          messageBox.innerHTML = msg;
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
          document.querySelector("#office-name2").value = data.center_name;
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
      } else if (request.status == 400 || request.status == 403) {
        const res = JSON.parse(request.response);
        console.log(res);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          console.log(`${res[key]}`);
          msg = msg + `${res[key]}<br>`;
        });
        if (msg) {
          $(".messagewrapper").fadeIn();
          messageBox.innerHTML = msg;
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
  if (urlpath2) {
    var url = urldemo + `/api/admin/users/get/profile/${urlpath2}/`;
  } else {
    var url = urldemo + `/api/profile/`;
  }

  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);

        console.log(response);
        if (urlpath2) {
          var data = response;
        } else {
          var data = response[0];
        }
        // document.querySelector("#user-position").value = response[0].role;

        document.querySelector("#profile").setAttribute("formid", data.id);
        document.querySelector("#phone").value = data.phone;
        document.querySelector("#national-code").value = data.national_id;
        document.querySelector("#address").value = data.address;
        document.querySelector("#shaba").value = data.sheba;
        document.querySelector("#card-number").value = data.card_number;
        document.querySelector("#account-number").value = data.account_number;
        document.querySelector("#name").value = data.name;
        document.querySelector("#mobile").value = data.mobile;
        document.querySelector("#username").value = data.username;
      } else if (request.status == 400 || request.status == 403) {
        const res = JSON.parse(request.response);
        console.log(res);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          console.log(`${res[key]}`);
          msg = msg + `${res[key]}<br>`;
        });
        if (msg) {
          $(".messagewrapper").fadeIn();
          messageBox.innerHTML = msg;
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
  if (urlpath3) {
    var url = urldemo + `/api/admin/centers/get/profile/${urlpath3}/`;
  } else {
    var url = urldemo + `/api/center/profile/`;
  }
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        if (urlpath3) {
          var data = response;
        } else {
          var data = response[0];
        }
        console.log(response);
        document.querySelector("#profile2").setAttribute("formid", data.id);
        if (data.role == "CENTER") {
          document
            .getElementById("profile2")
            .classList.replace("d-none", "d-block");
          document
            .getElementById("profile")
            .classList.replace("d-block", "d-none");
          document.getElementById("user-type").selectedIndex = 1;
        } else {
          if (!urlpath3) {
            document
              .getElementById("profile")
              .classList.replace("d-none", "d-block");
            document
              .getElementById("profile2")
              .classList.replace("d-block", "d-none");
            document.getElementById("user-type").selectedIndex = 0;
          }
        }
        document.querySelector("#user-position2").value =
          data.pepresentative_position;
        document.querySelector("#phone2").value = data.phone;
        document.querySelector("#national-code2").value = data.national_id;
        document.querySelector("#address2").value = data.address;
        document.querySelector("#shaba2").value = data.sheba;
        document.querySelector("#card-number2").value = data.card_number;
        document.querySelector("#account-number2").value = data.account_number;
        document.querySelector("#office-name2").value = data.center_name;
        document.querySelector("#mobile2").value = data.mobile;
        document.querySelector("#name2").value = data.name;
        document.querySelector("#username2").value = data.username;

        document.querySelector("#postal-code2").value = data.postal_code;
        document.querySelector("#office-type2").value = data.center_type;
        document.querySelector("#office-code2").value = data.center_code;
        document.querySelector("#tracking-code2").value = data.economy_code;
      } else if (request.status == 400 || request.status == 403) {
        const res = JSON.parse(request.response);
        console.log(res);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          console.log(`${res[key]}`);
          msg = msg + `${res[key]}<br>`;
        });
        if (msg) {
          $(".messagewrapper").fadeIn();
          messageBox.innerHTML = msg;
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
