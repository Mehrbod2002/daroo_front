function getAdminUser() {
  var url = urldemo + `/api/admin/centers/`;
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
            } فایل  <button class="btn-close btn btn-danger remove-file" id=${
              temp.id
            } ></button> </a> </div>`;
            documentList = documentList + datadoc;
          });
          var item = `<tr>
            <td class="d-flex justify-content-center align-items-center form-check">
              <input type="checkbox" class="form-check-input me-2 border border-dark">
              <label class="form-check-label"> ${index + 1} </label>
            </td>
            <td>${key.username}</td>
           
            <td>------</td>
            <td>${key.center_type}</td>
            <td>${key.center_code}</td>
            <td>${key.name}</td>
            <td> ${key.pepresentative_position}</td>
            <td>${key.postal_code}</td>
            <td>${key.national_id}</td>
            <td>${key.mobile}</td>
            <td>${key.phone}</td>
            <td>${key.address}</td>
            <td class="d-flex justify-content-center align-items-center"  id="${
              key.id
            }">
                <span> ${key.wallet_balance} ریال </span>
                ${
                  key.wallet_blocked
                    ? `<button class='btn btn-success unblock-wallet mx-1'> رفع مسدودسازی کیف پول </button>`
                    : `<button class="btn btn-secondary edit-wallet mx-1">
                ویرایش موجودی کیف پول
              </button>
              <button class="btn btn-danger block-wallet mx-1">
                مسدودسازی کیف پول
              </button>`
                }
            
              </td>
            <td> ${key.address}</td>
           
            <td>${key.card_number}</td>
            <td>${key.account_number}</td>
            <td>${key.economy_code}</td>
            <td class="d-flex justify-content-center align-items-center" style="width: max-content">
              <form action="" method="post" class="d-flex justify-content-center align-items-center me-2 pe-2 border-end border-dark">
                <input type="file" class="form-control me-2" style="width: 200px !important; height: max-content">
                <input type="submit" class="btn btn-info" value="ویرایش اسناد">
              </form>
              <span>
                اسناد فعلی:
               ${documentList}
              </span>
            </td>
            <td>${key.sign}</td>
            <td class="d-flex justify-content-center align-items-center">
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
                <button class="btn btn-success mx-1 unblock-user" id="${key.id}">
                  رفع مسدودسازی کاربر
                </button>`
                : ""
            }
            </td>
            <td>
              
            <button  class="btn btn-info profile-user"  id="${key.id}">
            ویرایش اطلاعات
          </button>
          <button   class="btn btn-secondary transaction-user" id="${key.id}">
          گزارش گیری تراکنش ها
        </button>
        <button   class="btn btn-secondary wallet-user" id="${key.id}">
          گزارش گیری کیف پول
        </button>
            <button  class="btn btn-secondary reception-user"  id="${key.id}" >
              گزارش گیری پذیرش ها
            </button>
            <button class="btn btn-danger mx-1 remove-user" id="${key.id}">
              حذف کاربر
            </button>
              
            </td>
          
          </tr>`;
          html = html + item;
        });
        document.querySelector("#reportsTable tbody").innerHTML = html;

        const removeFile = document.querySelectorAll(".remove-file");
        for (const el of removeFile) {
          el.addEventListener("click", function () {
            removeFile(el.getAttribute("id"));
          });
        }
        const unblock = document.querySelectorAll(".unblock-user");
        for (const el of unblock) {
          el.addEventListener("click", function () {
            unblockUser(el.getAttribute("id"));
          });
        }
        const block = document.querySelectorAll(".block-user");
        for (const el of block) {
          el.addEventListener("click", function () {
            blockUser(el.getAttribute("id"));
          });
        }
        const eject = document.querySelectorAll(".eject-user");
        for (const el of eject) {
          el.addEventListener("click", function () {
            ejectUser(el.getAttribute("id"));
          });
        }
        const accept = document.querySelectorAll(".accept-user");
        for (const el of accept) {
          el.addEventListener("click", function () {
            acceptUser(el.getAttribute("id"));
          });
        }

        const reception = document.querySelectorAll(".reception-user");
        for (const el of reception) {
          el.addEventListener("click", function () {
            window.location.href = `https://daroocard.com/main-reception-requests.html?id=${el.getAttribute(
              "id"
            )}`;
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
            window.location.href = `https://daroocard.com/main-profile.html?id=${el.getAttribute(
              "id"
            )}`;
          });
        }
        setRemoveUserEvent();
        setEditWalletEvent();
        setBlockWalletEvent();
        setUnblockWalletEvent();
        setRemoveUserEvent();
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
