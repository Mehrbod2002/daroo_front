const searchparams = new URLSearchParams(window.location.search);

var urlpath = searchparams.get("id");
if (urlpath) {
  var url = urldemo + `/api/admin/users/details/${urlpath}/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        console.log(response);

        document
          .querySelector("#mainWrapper")
          .setAttribute("detail", response.id);
        document.querySelector("#address").innerHTML = response.address;
        document.querySelector("#national_id").innerHTML = response.national_id;
        document.querySelector("#phone").innerHTML = response.phone;
        document.querySelector("#sheba").innerHTML = response.sheba;
        document.querySelector("#card_number").innerHTML = response.card_number;
        document.querySelector("#name").innerHTML = response.name;

        document.querySelector("#name").innerHTML = response.name;

        document.querySelector("#mobile").innerHTML = response.mobile;

        document.querySelector("#username").innerHTML = response.username;

        document.querySelector("#account_number").innerHTML =
          response.account_number;
        document.querySelector("#wallet_number").innerHTML =
          response.wallet_number;
        document.querySelector("#wallet_balance").innerHTML =
          response.wallet_balance;

        document.querySelector("#sign").innerHTML = response.sign;

        var document2 = response.docs;
        var documentList = ``;
        if (documentList.length > 0) {
          document2.forEach((temp, index) => {
            datadoc = `<div class="my-2"><a href="${temp.url}">${
              index + 1
            } فایل   </a> <button class="btn-close btn btn-danger remove-file" id=${
              temp.id
            } ></button> </div>`;
            documentList = documentList + datadoc;
          });
          document.querySelector("#documentList").innerHTML =
            response.documentList;
        }
        // +++++++
        if (
          response.user_is_verified == false &&
          response.user_is_rejected == false
        ) {
          document.querySelector(
            "#userStatus"
          ).innerHTML = `<span> در انتظار تایید </span>
            <button class="btn btn-success mx-1 accept-user" id="${response.id}">
              تایید کاربر
            </button>
            <button class="btn btn-secondary mx-1 eject-user" id="${response.id}">
              عدم تایید کاربر
            </button>`;
        }
        if (response.wallet_blocked == "TRUE") {
          document.querySelector(
            "#walletStatus"
          ).innerHTML = `| مسدود شده (به علت: ${response.wallet_reason_of_block} )<button class='btn btn-success unblock-wallet mx-1'> 
              رفع مسدودسازی کیف پول </button>`;
        } else {
          document.querySelector(
            "#walletStatus"
          ).innerHTML = ` <span  id="wallet_balance"
          style="direction: ltr; display: inline-block"> ${response.wallet_balance} ریال </span><button class="btn btn-secondary edit-wallet mx-1">
              ویرایش موجودی کیف پول
            </button>
            <button class="btn btn-danger block-wallet mx-1">
              مسدودسازی کیف پول
            </button>`;
        }
        if (response.user_is_rejected == true) {
          document.querySelector(
            "#userStatus"
          ).innerHTML = `<span> رد شده </span>`;
        }
        if (
          response.user_is_blocked == false &&
          response.user_is_verified == true
        ) {
          document.querySelector(
            "#userStatus"
          ).innerHTML = ` <span> تایید شده </span>
            <button class="btn btn-danger mx-1 block-user" id="${response.id}">
              مسدودسازی کاربر
            </button>`;
        }
        if (
          response.user_is_blocked == true &&
          response.user_is_verified == true
        ) {
          document.querySelector(
            "#userStatus"
          ).innerHTML = `  <span> مسدود شده </span>
            | مسدود شده (به علت: ${response.reason_of_block} )
            <button class="btn btn-success mx-1 unblock-user" id="${response.id}">
              رفع مسدودسازی کاربر
            </button>`;
        }
        setRemoveUserEvent();
        setEditWalletEvent();
        setBlockWalletEvent();
        setUnblockWalletEvent();
        setRemoveUserEvent();
        setBlockUserEvent();
        setUnblockUserEvent();
        setAcceptEjectUserEvents();
        // ++++++++++
        document
          .querySelector("#reqreport")
          .setAttribute("href", `/admin-requests-user.html?id=${response.id}`);
        document
          .querySelector("#profileEdit")
          .setAttribute("href", `/main-profile.html?userid=${response.id}`);
        document
          .querySelector("#profileReport")
          .setAttribute("href", `/main-reports.html?id=${response.id}`);
        document
          .querySelector("#profileWallet")
          .setAttribute("href", `/main-wallet.html?id=${response.id}`);

        const editfilebtn = document.querySelectorAll(".editfilebtn");
        for (const el of editfilebtn) {
          el.addEventListener("click", function () {
            editfilefun(response.id);
          });
        }
        const removeFile = document.querySelectorAll(".remove-file");
        for (const el of removeFile) {
          el.addEventListener("click", function () {
            removeFileFunc(el.getAttribute("id"));
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
