function getAdminUser() {
  var url = urldemo + `/api/admin/centers/first/page/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        var html = "";
        response.forEach((key, index) => {
          var item = `<tr class="userDetailItem" id="${key.id}">
            <td  class="d-flex justify-content-center align-items-center form-check " >
             
              <label class="form-check-label"> ${index + 1} </label>
            </td>
            <td>${key.username}</td>
           
            <td>${key.center_name}</td>
            <td>${key.center_type}</td>
            <td>${key.center_code}</td>
            <td>${key.name}</td>
            <td>${key.balance}</td>
            <td> ${key.status}</td>
     
     
          
          </tr>`;
          html = html + item;
        });
        document.querySelector("#reportsTable tbody").innerHTML = html;

        const profile = document.querySelectorAll(".userDetailItem");
        for (const el of profile) {
          el.addEventListener("click", function () {
            window.location.href = `https://daroocard.com/admin-center-information.html?centerid=${el.getAttribute(
              "id"
            )}`;
          });
        }
        // setRemoveUserEvent();
        // setEditWalletEvent();
        // setBlockWalletEvent();
        // setUnblockWalletEvent();
        // setRemoveUserEvent();
        // setBlockUserEvent();
        // setAcceptEjectUserEvents();
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
getAdminUser();

function unblockUser(val) {
  var url = urldemo + `/api/admin/centers/unblock/user/${val}/`;

  try {
    const formData = new FormData();
    formData.append("id", val);
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        console.log(request.response);
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>درخواست شما با موفقیت انجام شد</span>";
        getAdminUser();
      } else if (request.status == 401) {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>  لطفا ابتدا وارد سایت شوید   </span>";
      } else if (request.status == 400 || request.status == 403) {
        const res = JSON.parse(request.response);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          var keyf = "";
          if (key == "error") {
            keyf = "ارور";
          } else if (key == "balance") {
            keyf = "مقدار";
          } else {
            keyf = key;
          }
          msg = msg + `${keyf} : ${res[key]}<br>`;
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
    request.open("PATCH", url);
    request.setRequestHeader(
      "Authorization",
      `Token ${localStorage.getItem("token")}`
    );
    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}

function acceptUser(val) {
  var url = urldemo + `/api/admin/centers/verify/user/${val}/`;
  try {
    const formData = new FormData();
    formData.append("id", val);
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>درخواست شما با موفقیت انجام شد</span>";
        getAdminUser();
      } else if (request.status == 401) {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>  لطفا ابتدا وارد سایت شوید   </span>";
      } else if (request.status == 400 || request.status == 403) {
        const res = JSON.parse(request.response);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          var keyf = "";
          if (key == "error") {
            keyf = "ارور";
          } else {
            keyf = key;
          }
          msg = msg + `${keyf} : ${res[key]}<br>`;
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
    request.open("PATCH", url);
    request.setRequestHeader(
      "Authorization",
      `Token ${localStorage.getItem("token")}`
    );
    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}

function transactionUserUser(val) {
  var url = urldemo + `/api/admin/centers/transaction/reports/${val}/`;
  try {
    const formData = new FormData();

    formData.append("id", val);
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        console.log(request.response);
      } else if (request.status == 401) {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>  لطفا ابتدا وارد سایت شوید   </span>";
      } else if (request.status == 400 || request.status == 403) {
        const res = JSON.parse(request.response);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          var keyf = "";
          if (key == "error") {
            keyf = "ارور";
          } else if (key == "balance") {
            keyf = "مقدار";
          } else {
            keyf = key;
          }
          msg = msg + `${keyf} : ${res[key]}<br>`;
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
    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}

function removeFileFunc(val) {
  var url = urldemo + `/api/admin/centers/delete/document/${val}/`;
  try {
    const formData = new FormData();
    formData.append("id", val);
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>درخواست شما با موفقیت انجام شد</span>";
        getAdminUser();
      } else if (request.status == 401) {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>  لطفا ابتدا وارد سایت شوید   </span>";
      } else if (request.status == 400 || request.status == 403) {
        const res = JSON.parse(request.response);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          var keyf = "";
          if (key == "error") {
            keyf = "ارور";
          } else {
            keyf = key;
          }
          msg = msg + `${keyf} : ${res[key]}<br>`;
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
    request.open("DELETE", url);
    request.setRequestHeader(
      "Authorization",
      `Token ${localStorage.getItem("token")}`
    );
    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}
function editfilefun(val) {
  var url = urldemo + `/api/admin/centers/add/document/${val}/`;
  try {
    const formData = new FormData();
    const fileInput = document.getElementById("editfileitem");
    formData.append("document", fileInput.files[0]);
    formData.append("id", val);
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>درخواست شما با موفقیت انجام شد</span>";
        getAdminUser();
      } else if (request.status == 401) {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>  لطفا ابتدا وارد سایت شوید   </span>";
      } else if (request.status == 400 || request.status == 403) {
        const res = JSON.parse(request.response);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          var keyf = "";
          if (key == "error") {
            keyf = "ارور";
          } else if (key == "document") {
            keyf = "مدرک";
          } else {
            keyf = key;
          }
          msg = msg + `${keyf} : ${res[key]}<br>`;
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
    request.open("POST", url);

    request.setRequestHeader(
      "Authorization",
      `Token ${localStorage.getItem("token")}`
    );
    request.setRequestHeader("Content-Type", "multipart/form-data");
    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}
