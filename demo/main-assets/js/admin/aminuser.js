function getAdminUser() {
  var url = urldemo + `/api/admin/users/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        var html = "";
        response.forEach((key, index) => {
          var document = key.docs;
          var documentList = ``;
          document.forEach((temp, index) => {
            datadoc = `<div class="my-2"><a href="${temp.url}">${
              index + 1
            } فایل   </a><button class="btn-close btn btn-danger remove-file" id=${
              temp.id
            } ></button> </div>`;
            documentList = documentList + datadoc;
          });
          var item = `<tr>
          <td class="d-flex justify-content-center align-items-center form-check">
            <input type="checkbox" class="form-check-input me-2 border border-dark">
            <label class="form-check-label"> ${index + 1} </label>
          </td>
          <td>${key.username}</td>
     
          <td>${key.name}</td>
          <td>${key.national_id}</td>
          <td>${key.mobile}</td>
          <td>${key.phone}</td>
          <td> ${key.address}</td>
          <td class="d-flex justify-content-center align-items-center"  dir="ltr" type="users" id="${
            key.id
          }">
            <span> ${key.wallet_balance}   ریال </span>
            ${
              key.wallet_blocked == "TRUE"
                ? `| مسدود شده (به علت: ${
                    key.wallet_reason_of_block ? key.wallet_reason_of_block : ""
                  } )<button class='btn btn-success unblock-wallet mx-1'> رفع مسدودسازی کیف پول </button>`
                : `<button class="btn btn-secondary edit-wallet mx-1">ویرایش موجودی کیف پول</button>
                <button class="btn btn-danger block-wallet mx-1"> مسدودسازی کیف پول</button>`
            }
           
          </td>
          <td>${key.sheba}</td>
          <td>${key.card_number}</td>
          <td>${key.account_number}</td>
          <td class="d-flex justify-content-center align-items-center" style="width: max-content">
          <form action="" method="post" class="d-flex justify-content-center align-items-center me-2 pe-2 border-end border-dark">
            <input type="file" id="editfileitem" class="form-control me-2" style="width: 200px !important; height: max-content">
            <input type="button" id="${
              key.id
            }" class="btn btn-info editfilebtn" value="ویرایش اسناد">
          </form>
          <span>
            اسناد فعلی:
           ${documentList}
          </span>
        </td>
          <td>${key.sign}</td>
          <td class="d-flex justify-content-center align-items-center" type="users" id="${
            key.id
          }">
          ${
            key.user_is_verified == false && key.user_is_rejected == false
              ? `<span> در انتظار تایید </span> 
          <button class="btn btn-success mx-1 accept-user" id="${key.id}">
            تایید کاربر
          </button>
          <button class="btn btn-secondary mx-1 eject-user" id="${key.id}">
            عدم تایید کاربر
          </button>`
              : ""
          }
          ${key.user_is_rejected == true ? `<span> رد شده </span>` : ""}
          ${
            key.user_is_blocked == false && key.user_is_verified == true
              ? ` <span> تایید شده </span>
              <button class="btn btn-danger mx-1 block-user" id="${key.id}">
                مسدودسازی کاربر
              </button>`
              : ""
          }
          ${
            key.user_is_blocked == true && key.user_is_verified == true
              ? `  <span> مسدود شده </span>
              | مسدود شده (به علت: ${key.reason_of_block} )
              <button class="btn btn-success mx-1 unblock-user" id="${key.id}">
                رفع مسدودسازی کاربر
              </button>`
              : ""
          }
          </td>
          <td id="${key.id}" type="users">
            <button  class="btn btn-info profile-user"  id="${key.id}">
              ویرایش اطلاعات
            </button>
            <button   class="btn btn-secondary transaction-user" id="${key.id}">
              گزارش گیری تراکنش ها
            </button>
            <button   class="btn btn-secondary wallet-user" id="${key.id}">
              گزارش گیری کیف پول
            </button>
            <button class="btn btn-danger mx-1 remove-user" id="${key.id}">
              حذف کاربر
            </button>
          </td>
        
        </tr>`;
          html = html + item;
        });
        document.querySelector("#reportsTable tbody").innerHTML = html;
        const editfilebtn = document.querySelectorAll(".editfilebtn");
        for (const el of editfilebtn) {
          el.addEventListener("click", function () {
            editfilefun(el.getAttribute("id"));
          });
        }

        const removeFile = document.querySelectorAll(".remove-file");
        for (const el of removeFile) {
          el.addEventListener("click", function () {
            removeFileFunc(el.getAttribute("id"));
          });
        }
        const unblock = document.querySelectorAll(".unblock-user");
        for (const el of unblock) {
          el.addEventListener("click", function () {
            unblockUser(el.getAttribute("id"));
          });
        }

        const accept = document.querySelectorAll(".accept-user");
        for (const el of accept) {
          el.addEventListener("click", function () {
            acceptUser(el.getAttribute("id"));
          });
        }

        const transaction = document.querySelectorAll(".transaction-user");
        for (const el of transaction) {
          el.addEventListener("click", function () {
            window.location.href = `https://daroocard.com/main-reports.html?id=${el.getAttribute(
              "id"
            )}`;
          });
        }
        const wallet = document.querySelectorAll(".wallet-user");
        for (const el of wallet) {
          el.addEventListener("click", function () {
            window.location.href = `https://daroocard.com/main-wallet.html?id=${el.getAttribute(
              "id"
            )}`;
          });
        }
        const profile = document.querySelectorAll(".profile-user");
        for (const el of profile) {
          el.addEventListener("click", function () {
            window.location.href = `https://daroocard.com/main-profile.html?userid=${el.getAttribute(
              "id"
            )}`;
          });
        }
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
