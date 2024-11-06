function getAdminUser() {
  var url = urldemo + `/api/admin/users/first/page/`;
  let front = "http://127.0.0.1:8080"; // "https://daroocard.com";
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
         
          <td>${key.name}</td>
          <td style="direction: ltr;">${key.balance}</td>
          <td> ${key.status}</td>
   
         
        
        </tr>`;
          html = html + item;
        });
        document.querySelector("#reportsTable tbody").innerHTML = html;
        const userDetailItem = document.querySelectorAll(".userDetailItem");
        for (const el of userDetailItem) {
          el.addEventListener("click", function () {
            window.location.href = `${front}/admin-user-information.html?id=${el.getAttribute(
              "id"
            )}`;
          });
        }

        // const editfilebtn = document.querySelectorAll(".editfilebtn");
        // for (const el of editfilebtn) {
        //   el.addEventListener("click", function () {
        //     editfilefun(el.getAttribute("id"));
        //   });
        // }

        // const removeFile = document.querySelectorAll(".remove-file");
        // for (const el of removeFile) {
        //   el.addEventListener("click", function () {
        //     removeFileFunc(el.getAttribute("id"));
        //   });
        // }
        // const unblock = document.querySelectorAll(".unblock-user");
        // for (const el of unblock) {
        //   el.addEventListener("click", function () {
        //     unblockUser(el.getAttribute("id"));
        //   });
        // }

        // const accept = document.querySelectorAll(".accept-user");
        // for (const el of accept) {
        //   el.addEventListener("click", function () {
        //     acceptUser(el.getAttribute("id"));
        //   });
        // }

        // const transaction = document.querySelectorAll(".transaction-user");
        // for (const el of transaction) {
        //   el.addEventListener("click", function () {
        //     window.location.href = `https://daroocard.com/main-reports.html?id=${el.getAttribute(
        //       "id"
        //     )}`;
        //   });
        // }
        // const wallet = document.querySelectorAll(".wallet-user");
        // for (const el of wallet) {
        //   el.addEventListener("click", function () {
        //     window.location.href = `https://daroocard.com/main-wallet.html?id=${el.getAttribute(
        //       "id"
        //     )}`;
        //   });
        // }
        // const profile = document.querySelectorAll(".profile-user");
        // for (const el of profile) {
        //   el.addEventListener("click", function () {
        //     window.location.href = `https://daroocard.com/main-profile.html?userid=${el.getAttribute(
        //       "id"
        //     )}`;
        //   });
        // }
        setRemoveUserEvent();
        setEditWalletEvent();
        setBlockWalletEvent();
        setUnblockWalletEvent();
        setRemoveUserEvent();
        setBlockUserEvent();
        setAcceptEjectUserEvents();
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
getAdminUser();

function unblockUser(val) {
  var url = urldemo + `/api/admin/users/unblock/user/${val}/`;
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
function blockUser(val) {
  var url = urldemo + `/api/admin/users/block/user/${val}/`;
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

function acceptUser(val) {
  var url = urldemo + `/api/admin/users/verify/user/${val}/`;
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
  var url = urldemo + `/api/admin/users/transaction/reports/${val}/`;
  try {
    const formData = new FormData();
    formData.append("id", val);
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        console.log(request.response);
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
    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}

function removeFileFunc(val) {
  var url = urldemo + `/api/admin/users/delete/document/${val}/`;
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
  var url = urldemo + `/api/admin/users/add/document/${val}/`;
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
            keyf = "مدارک";
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
    request.open("POST", url, true);

    request.setRequestHeader(
      "Authorization",
      `Token ${localStorage.getItem("token")}`
    );
    // request.setRequestHeader("Content-Type", "multipart/form-data");
    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}
