function getAdminUser() {
  var url = urldemo + `/api/admin/requests/`;
  let front = "https://daroocard.com"; // "https://daroocard.com";
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        var html = "";
        response.forEach((key, index) => {
          var item = `<tr>
              <td class="d-flex justify-content-center align-items-center form-check">
                <input type="checkbox" class="form-check-input me-2 border border-dark">
                <label class="form-check-label"> ${index + 1} </label>
              </td>
              <td>${key.created_at}</td>
              <td>${key.username}</td>
              <td>${key.role}</td>
              <td>${key.request_type}</td>
              <td>${key.information_of_request}</td>
              <td> ${key.status}</td>
              <td class="d-flex justify-content-center align-items-center" id="${
                key.id
              }">
              <button   class="request-report btn btn-info mx-1" id="${key.id}">
                گزارش گیری
              </button>
              <button id="${
                key.id
              }" class="btn btn-success mx-1 accept-request">
                تایید درخواست
              </button>
              <button id="${key.id}" class="btn btn-danger mx-1 eject-request">
                رد درخواست
              </button>
            </td>
            </tr>`;
          html = html + item;
        });
        document.querySelector("#currentRequests tbody").innerHTML = html;
        setAcceptEjectRequestEvents();
        const accept = document.querySelectorAll(".accept-request");
        for (const el of accept) {
          el.addEventListener("click", function () {
            acceptRequest(el.getAttribute("id"));
          });
        }
        const report = document.querySelectorAll(".request-report");
        for (const el of report) {
          el.addEventListener("click", function () {
            window.open(
              `${front}/admin-request-report.html?requestid=${el.getAttribute(
                "id"
              )}`,
              "_blank"
            );
          });
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
  const searchparams = new URLSearchParams(window.location.search);
  var pagepath = searchparams.get("page");

  if (pagepath) {
    var url2 = urldemo + `/api/admin/requests/history/?page=${pagepath}`;
  } else {
    var url2 = urldemo + `/api/admin/requests/history/`;
  }
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        var indexitem = 0;
        if (pagepath && pagepath > 1) {
          indexitem = (Number(pagepath) - 1) * 10;
        }
        var html = "";
        response.results.forEach((key, index) => {
          var item = `<tr id="${key.id}">
              <td id="${
                key.id
              }" class="d-flex justify-content-center align-items-center form-check">
                <input type="checkbox" class="form-check-input me-2 border border-dark">
                <label class="form-check-label"> ${
                  indexitem + index + 1
                } </label>
              </td>
              <td>${key.created_at}</td>
              <td>${key.updated_at}</td>
              <td>${key.username}</td>
              <td>${key.role}</td>
              <td>${key.request_type}</td>
              <td>${key.information_of_request}</td>
              <td> ${key.status}</td>
              <td class="d-flex justify-content-center align-items-center">
              <button   class="request-report btn btn-info mx-1" id="${key.id}">
              گزارش گیری
            </button>
            </td>
            </tr>`;
          html = html + item;
        });
        document.querySelector("#lastRequests tbody").innerHTML = html;
        document.querySelector("#cointReq").innerHTML = response.count;
        if (response.next) {
          console.log(response.next);

          document
            .querySelector("#nextpage")
            .addEventListener("click", function () {
              let arry = response.next.split("/?page=");
              let lastElement = arry[arry.length - 1];
              window.location.href = `${front}/admin-requests.html?page=${lastElement}`;
            });
          document.querySelector("#nextpage").removeAttribute("disabled");
        } else {
          document.querySelector("#nextpage").setAttribute("disabled", "true");
        }
        if (response.previous) {
          document
            .querySelector("#prevpage")
            .addEventListener("click", function () {
              let arry = response.previous.split("/?page=");
              let lastElement = arry[arry.length - 1];
              if (arry.length > 1) {
                window.location.href = `${front}/admin-requests.html?page=${lastElement}`;
              } else {
                window.location.href = `${front}/admin-requests.html`;
              }
            });
          document.querySelector("#prevpage").removeAttribute("disabled");
        } else {
          document.querySelector("#prevpage").setAttribute("disabled", "true");
        }
        const report = document.querySelectorAll(".request-report");
        for (const el of report) {
          el.addEventListener("click", function () {
            window.open(
              `${front}/admin-request-report.html?requestid=${el.getAttribute(
                "id"
              )}`,
              "_blank"
            );
          });
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
    request.open("GET", url2);
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
  var url = urldemo + `/api/admin/centers/block/user/${val}/`;
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
function ejectUser(val) {
  var url = urldemo + `/api/admin/centers/unverify/user/${val}/`;
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

function removeFile(val) {
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
function acceptRequest(val) {
  var url = urldemo + `/api/admin/requests/verify/${val}/`;
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
