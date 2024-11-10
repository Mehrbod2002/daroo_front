function getCards() {
  var url = urldemo + `/api/card/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        var html = "";
        response.forEach((key, index) => {
          var buttonsDisabled = key.active ? "" : "disabled";
          var display = key.active ? "none" : "";

          var item = `<tr>
            <td> ${index + 1} </td>
            <td> ${key.number}</td>
            <td> ${key.card_type} </td>
            <td sorttable_customkey="14020216"> ${key.issueــdate} </td>
            <td sorttable_customkey="14030216">${key.expiration_date} </td>
            <td> ${key.status} </td>
            <td> ${key.discription}</td>
            <td>
                <button class="btn btn-danger" ${buttonsDisabled} onclick="navigateTo('#')"> تمدید </button>
                <button class="btn btn-warning" style="display: ${display};" onclick="openVerify()"> فعال سازی </button>
                <button class="btn btn-success" ${buttonsDisabled} onclick="navigateTo('main-issuing-daroo-card.html')"> ارتقا </button>
                <button class="btn btn-warning" ${buttonsDisabled} onclick="navigateTo('main-daroo-card-info.html?q=${key.id}')"> ویرایش </button>
            </td>
          </tr>`;
          html = html + item;
        });
        document.querySelector("#reportsTable tbody").innerHTML = html;
      } else if (request.status == 400 || request.status == 403) {
        const res = JSON.parse(request.response);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
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

function sendotp() {
  var url = urldemo + `/api/send/otpcode/`;
  try {
    const formData = new FormData();
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
      } else if (request.status == 400 || request.status == 403) {
        const res = JSON.parse(request.response);
        const keys = Object.keys(res);
        let msg = "";

        keys.forEach((key) => {
          var keyf = key === "error" ? "ارور" : key;
          msg += `${keyf} : ${res[key]}<br>`;
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
        const errors = document.getElementById("errors");
        errors.innerHTML = msg;
        errors.className = errors.className.replace(
          "text-success",
          "text-danger"
        );
      }
      setTimeout(clearMessageBox, 1000);
    };

    request.onloadstart = function () {
      $(".loader").fadeIn();
    };
    request.open("POST", url);
    request.setRequestHeader(
      "Authorization",
      `Token ${localStorage.getItem("token")}`
    );
    console.log("Authorization",
      `Token ${localStorage.getItem("token")}`)
    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}

function openVerify() {
  $("#boxotp").fadeIn();
  sendotp();
}

function navigateTo(url) {
  if (url && url !== "#") {
    window.location.href = url;
  }
}

function validateotp() {
  const otpValue = document.getElementById("otpInput").value.trim();
  if (otpValue === "") {
    alert("لطفاً کد تایید را وارد کنید");
    return;
  }
  var url = urldemo + `/api/validate/otpcode/`;
  try {
    const formData = new FormData();
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        location.reload();
      } else if (request.status == 400 || request.status == 403) {
        const res = JSON.parse(request.response);
        const keys = Object.keys(res);
        let msg = "";

        keys.forEach((key) => {
          var keyf = key === "error" ? "ارور" : key;
          msg += `${keyf} : ${res[key]}<br>`;
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
    request.open("POST", url);
    request.setRequestHeader(
      "Authorization",
      `Token ${localStorage.getItem("token")}`
    );
    console.log("Authorization",
      `Token ${localStorage.getItem("token")}`)
    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}

getCards();