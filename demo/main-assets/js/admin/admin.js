// //////////////////////////////////////////////////
// Table Sections Controls In Admin

// Search In Tables
function search(filter, isSecondBox) {
  let rows, tdValue;
  if (isSecondBox) {
    rows = document.querySelectorAll(
      ".table-section:nth-of-type(2) table tbody tr"
    );
    console.log(rows);
  } else {
    rows = document.querySelectorAll(
      ".table-section:nth-of-type(1) table tbody tr"
    );
  }

  for (let i = 0; i < rows.length; i++) {
    let isResult = false;
    for (const td of rows[i].getElementsByTagName("td")) {
      tdValue = td.textContent || td.innerText;
      if (tdValue.toLowerCase().indexOf(filter) !== -1) {
        rows[i].style.display = "";
        isResult = true;
        break;
      }
    }
    if (isResult === false) {
      rows[i].style.display = "none";
    }
  }
}

try {
  for (const el of document.getElementsByClassName("searchable")) {
    el.addEventListener("input", function () {
      search(
        this.value.toLowerCase(),
        this.getAttribute("data-is-second-box") === "true"
      );
    });
  }
} catch {}

try {
  const urlParams = new URLSearchParams(window.location.search);
  const mySearch = urlParams.get("search");
  if (mySearch !== null) {
    for (const el of document.getElementsByClassName("searchable")) {
      el.value = mySearch;
      search(mySearch, el.getAttribute("data-is-second-box") === "true");
    }
  }
} catch {}

// Print Button
try {
  document.querySelector(".print").addEventListener("click", function () {
    window.print();
  });
} catch {}

// Copy Button
try {
  for (const el of document.querySelectorAll(".copy")) {
    el.addEventListener("click", function () {
      try {
        navigator.clipboard.writeText(
          this.parentElement.firstElementChild.innerText.trim()
        );
      } catch {
        const inputEl = document.createElement("input");
        inputEl.value = this.parentElement.firstElementChild.innerText.trim();
        this.appendChild(inputEl);
        inputEl.select();
        inputEl.setSelectionRange(0, 99999);
        document.execCommand("copy");
        inputEl.remove();
      }
      this.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">\n' +
        '<path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>\n' +
        "</svg>";

      setTimeout(function () {
        el.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-copy" viewBox="0 0 16 16">\n' +
          '<path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>\n' +
          "</svg>";
      }, 1500);
    });
  }
} catch {}

// Set Click Event Function For Get User Requests Button In Admin-Users & Admin-Centers
try {
  document
    .getElementById("getUserRequests")
    .addEventListener("click", function () {
      window.open(
        "admin-requests.html?search=" +
          document.getElementById("username").innerText.trim()
      );
    });
} catch {}

// Set Click Event Function For Block Wallet Button In Admin-Users & Admin-Centers
try {
  function setBlockWalletEvent() {
    for (const el of document.getElementsByClassName("block-wallet")) {
      el.addEventListener("click", function () {
        const walletCash = this.parentElement.firstElementChild.innerHTML;
        this.parentElement.innerHTML =
          "<span> علت مسدودسازی: </span>" +
          "<textarea class='form-control mx-1 border border-dark' style='min-height: 40px;'></textarea>" +
          "<button class='btn btn-secondary cancel-block-wallet mx-1'> لغو </button>" +
          "<button class='btn btn-danger block-wallet-final mx-1'> تایید </button>";
        makeBlockWalletForm(walletCash);
      });
    }
  }
  setBlockWalletEvent();

  function makeBlockWalletForm(walletCash) {
    for (const el of document.getElementsByClassName("cancel-block-wallet")) {
      el.addEventListener("click", function () {
        this.parentElement.innerHTML =
          "<span>" +
          walletCash +
          "</span>" +
          "<button class='btn btn-success edit-wallet mx-1'> ویرایش </button>" +
          "<button class='btn btn-danger block-wallet mx-1'> مسدودسازی </button>";
        setBlockWalletEvent();
        setEditWalletEvent();
      });
    }
    for (const el of document.getElementsByClassName("block-wallet-final")) {
      el.addEventListener("click", function () {
        blockbalanceUser(
          document.querySelector("#mainWrapper").getAttribute("detail"),
          el
        );
      });
    }
    function blockbalanceUser(val, el) {
      var url =
        urldemo +
        `/api/admin/${el.parentElement.getAttribute(
          "type"
        )}/block/balance/${val}/`;
      try {
        const formData = new FormData();
        formData.append("id", val);
        formData.append(
          "reason",
          el.parentElement.querySelector("textarea").value
        );

        const request = new XMLHttpRequest();
        request.onloadend = function () {
          console.log(request.status);
          if (request.status == 200 || request.status == 201) {
            el.parentElement.innerHTML =
              "<span>" +
              walletCash +
              " | مسدود شده (به علت:" +
              el.parentElement.querySelector("textarea").value +
              ") </span>" +
              "<button class='btn btn-success unblock-wallet mx-1'> رفع مسدودسازی کیف پول </button>";
            setUnblockWalletEvent();
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
              } else if (key == "reason") {
                keyf = "دلیل";
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
  }
} catch {}

// Set Click Event Function For Unblock Wallet Button In Admin-Users & Admin-Centers
try {
  function setUnblockWalletEvent() {
    for (const el of document.getElementsByClassName("unblock-wallet")) {
      el.addEventListener("click", function () {
        unblockbalanceUser(
          document.querySelector("#mainWrapper").getAttribute("detail"),
          el
        );
      });
    }
    function unblockbalanceUser(val, el) {
      var url =
        urldemo +
        `/api/admin/${el.parentElement.getAttribute(
          "type"
        )}/unblock/balance/${val}/`;
      try {
        const formData = new FormData();
        formData.append("id", val);
        const request = new XMLHttpRequest();
        request.onloadend = function () {
          console.log(request.status);
          if (request.status == 200 || request.status == 201) {
            el.parentElement.innerHTML =
              "<span>" +
              el.parentElement.firstElementChild.innerHTML.split("|").at(0) +
              "</span>" +
              "<button class='btn btn-secondary edit-wallet mx-1'> ویرایش    </button>" +
              "<button class='btn btn-danger block-wallet mx-1'> مسدودسازی   </button>";
            setEditWalletEvent();
            setBlockWalletEvent();
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
  }
  setUnblockWalletEvent();
} catch {}

// Set Click Event Function For Edit Wallet Button In Admin-Users & Admin-Centers
try {
  function setEditWalletEvent() {
    for (const el of document.getElementsByClassName("edit-wallet")) {
      el.addEventListener("click", function () {
        const mainWalletCash = this.parentElement.firstElementChild.innerHTML;
        const walletCash = mainWalletCash
          .slice(0, mainWalletCash.indexOf("ریال"))
          .replaceAll(",", "")
          .trim();
        this.parentElement.innerHTML =
          "<span> تعیین موجودی: </span>" +
          "<input type='number' class='form-control mx-1 border border-dark' value='" +
          walletCash +
          "'>" +
          "<button class='btn btn-secondary cancel-edit-wallet mx-1'> لغو </button>" +
          "<button class='btn btn-danger edit-wallet-final mx-1'> تایید </button>";
        makeEditWalletForm(mainWalletCash);
      });
    }
  }
  setEditWalletEvent();

  function makeEditWalletForm(walletCash) {
    for (const el of document.getElementsByClassName("cancel-edit-wallet")) {
      el.addEventListener("click", function () {
        this.parentElement.innerHTML =
          "<span>" +
          walletCash +
          "</span>" +
          "<button class='btn btn-success edit-wallet mx-1'> ویرایش </button>" +
          "<button class='btn btn-danger block-wallet mx-1'> مسدودسازی  </button>";
        setEditWalletEvent();
        setBlockWalletEvent();
      });
    }
    for (const el of document.getElementsByClassName("edit-wallet-final")) {
      el.addEventListener("click", function () {
        balanceUser(
          document.querySelector("#mainWrapper").getAttribute("detail"),
          el
        );
      });
    }
    function balanceUser(val, el) {
      var url = urldemo + `/api/admin/users/edit/balance/${val}/`;
      try {
        const formData = new FormData();
        formData.append("id", val);
        formData.append(
          "balance",
          el.parentElement.querySelector("input").value
        );

        const request = new XMLHttpRequest();
        request.onloadend = function () {
          console.log(request.status);
          if (request.status == 200 || request.status == 201) {
            $(".messagewrapper").fadeIn();
            messageBox.innerHTML =
              "<span class='text-sm text-success'>درخواست شما با موفقیت انجام شد</span>";
            el.parentElement.innerHTML =
              "<span>" +
              el.parentElement.querySelector("input").value +
              " ریال </span>" +
              "<button class='btn btn-secondary edit-wallet mx-1'> ویرایش موجودی کیف پول </button>" +
              "<button class='btn btn-danger block-wallet mx-1'> مسدودسازی کیف پول </button>";
            setEditWalletEvent();
            setBlockWalletEvent();
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
  }
} catch {}

// Set Click Event Function For User Acceptation In Admin-Users & Admin-Centers
try {
  function setAcceptEjectUserEvents() {
    for (const el of document.getElementsByClassName("accept-user")) {
      el.addEventListener("click", function () {
        verifyUser(
          document.querySelector("#mainWrapper").getAttribute("detail"),
          el
        );
      });
    }

    function verifyUser(val, el) {
      var url =
        urldemo +
        `/api/admin/${el.parentElement.getAttribute(
          "type"
        )}/verify/user/${val}/`;
      try {
        const formData = new FormData();

        formData.append("id", val);
        const request = new XMLHttpRequest();
        request.onloadend = function () {
          if (request.status == 200 || request.status == 201) {
            el.parentElement.innerHTML =
              "<span> تایید شده </span>" +
              "<button class='btn btn-danger mx-1 block-user'> مسدودسازی کاربر </button>";
            setBlockUserEvent();
            $(".messagewrapper").fadeIn();
            messageBox.innerHTML =
              "<span class='text-sm text-success'>درخواست شما با موفقیت انجام شد</span>";
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
    for (const el of document.getElementsByClassName("eject-user")) {
      el.addEventListener("click", function () {
        this.parentElement.innerHTML =
          "<span> علت عدم تایید کاربر: </span>" +
          "<textarea class='form-control mx-1 border border-dark' style='min-height: 40px;'></textarea>" +
          "<button class='btn btn-secondary cancel-eject-user mx-1'> لغو </button>" +
          "<button class='btn btn-danger eject-user-final mx-1'> تایید </button>";
        makeEjectUserForm();
      });
    }
  }
  setAcceptEjectUserEvents();

  function makeEjectUserForm() {
    for (const el of document.getElementsByClassName("cancel-eject-user")) {
      el.addEventListener("click", function () {
        this.parentElement.innerHTML =
          "<span> در انتظار تایید </span>" +
          "<button class='btn btn-success mx-1 accept-user'> تایید کاربر </button>" +
          "<button class='btn btn-danger mx-1 eject-user'> عدم تایید کاربر </button>";
        setAcceptEjectUserEvents();
      });
    }
    for (const el of document.getElementsByClassName("eject-user-final")) {
      el.addEventListener("click", function () {
        ejectUser(
          document.querySelector("#mainWrapper").getAttribute("detail"),
          el
        );
      });
    }
    function ejectUser(val, el) {
      var url =
        urldemo +
        `/api/admin/${el.parentElement.getAttribute(
          "type"
        )}/unverify/user/${val}/`;
      try {
        const formData = new FormData();
        formData.append(
          "reason",
          el.parentElement.querySelector("textarea").value
        );
        formData.append("id", val);
        const request = new XMLHttpRequest();
        request.onloadend = function () {
          if (request.status == 200 || request.status == 201) {
            el.parentElement.innerHTML =
              "رد شده (به علت: " +
              el.parentElement.querySelector("textarea").value +
              ")";
            $(".messagewrapper").fadeIn();
            messageBox.innerHTML =
              "<span class='text-sm text-success'>درخواست شما با موفقیت انجام شد</span>";
            // getAdminUser();
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
  }
} catch {}

// Set Click Event Function For Remove User Button In Admin-Users & Admin-Centers
try {
  function setRemoveUserEvent() {
    for (const el of document.getElementsByClassName("remove-user")) {
      el.addEventListener("click", function () {
        this.parentElement.innerHTML =
          "<span class='fs-5'> آیا از حذف کاربر اطمینان دارید؟ </span>" +
          "<button class='btn btn-secondary fs-5 cancel-remove-user ms-2'> لغو عملیات </button>" +
          "<button class='btn btn-danger fs-5 remove-user-final ms-2'> تایید </button>";
        makeRemoveUserForm();
      });
    }
  }
  setRemoveUserEvent();

  function makeRemoveUserForm() {
    for (const el of document.getElementsByClassName("cancel-remove-user")) {
      el.addEventListener("click", function () {
        this.parentElement.innerHTML =
          "<button class='btn btn-danger fs-5 w-50 remove-user'> حذف کاربر </button>";
        setRemoveUserEvent();
      });
    }
    for (const el of document.getElementsByClassName("remove-user-final")) {
      el.addEventListener("click", function () {
        removeUser(
          document.querySelector("#mainWrapper").getAttribute("detail"),
          el
        );
      });
    }
    function removeUser(val, el) {
      var url =
        urldemo +
        `/api/admin/${el.parentElement.getAttribute(
          "type"
        )}/delete/user/${val}/`;
      try {
        const formData = new FormData();
        formData.append("id", val);
        const request = new XMLHttpRequest();
        request.onloadend = function () {
          console.log(request.status);
          if (request.status == 200 || request.status == 201) {
            el.parentElement.parentElement.remove();
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
  }
} catch {}

// Set Click Event Function For Unblock User Button In Admin-Users & Admin-Centers
try {
  function setUnblockUserEvent() {
    for (const el of document.getElementsByClassName("unblock-user")) {
      el.addEventListener("click", function () {
        unblockUser(
          document.querySelector("#mainWrapper").getAttribute("detail"),
          el
        );
      });
    }
    function unblockUser(val, el) {
      var url =
        urldemo +
        `/api/admin/${el.parentElement.getAttribute(
          "type"
        )}/unblock/user/${val}/`;
      try {
        const formData = new FormData();

        formData.append("id", val);
        const request = new XMLHttpRequest();
        request.onloadend = function () {
          console.log(request);
          if (request.status == 200 || request.status == 201) {
            $(".messagewrapper").fadeIn();
            messageBox.innerHTML =
              "<span class='text-sm text-success'>درخواست شما با موفقیت انجام شد</span>";
            el.parentElement.innerHTML =
              "<span> تایید شده </span>" +
              "<button class='btn btn-danger mx-1 block-user'> مسدودسازی کاربر </button>";
            setBlockUserEvent();
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
              } else if (key == "reason") {
                keyf = "دلیل";
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
  }
  setUnblockUserEvent();
} catch {}

// Set Click Event Function For Block User Button In Admin-Users & Admin-Centers
try {
  function setBlockUserEvent() {
    for (const el of document.getElementsByClassName("block-user")) {
      el.addEventListener("click", function () {
        this.parentElement.innerHTML =
          "<span> علت مسدودسازی: </span>" +
          "<textarea class='form-control mx-1 border border-dark' style='min-height: 40px;'></textarea>" +
          "<button class='btn btn-secondary cancel-block-user mx-1'> لغو </button>" +
          "<button class='btn btn-danger block-user-final mx-1'> تایید </button>";
        makeBlockUserForm();
      });
    }
  }
  setBlockUserEvent();

  function makeBlockUserForm() {
    for (const el of document.getElementsByClassName("cancel-block-user")) {
      el.addEventListener("click", function () {
        el.parentElement.innerHTML =
          "<span> تایید شده </span>" +
          "<button class='btn btn-danger mx-1 block-user'> مسدودسازی کاربر </button>";
        setBlockUserEvent();
      });
    }
    for (const el of document.getElementsByClassName("block-user-final")) {
      el.addEventListener("click", function () {
        blockUser(
          document.querySelector("#mainWrapper").getAttribute("detail"),
          el
        );
      });
    }
    function blockUser(val, el) {
      var url =
        urldemo +
        `/api/admin/${el.parentElement.getAttribute(
          "type"
        )}/block/user/${val}/`;
      try {
        const formData = new FormData();
        formData.append(
          "reason",
          el.parentElement.querySelector("textarea").value
        );
        formData.append("id", val);
        const request = new XMLHttpRequest();
        request.onloadend = function () {
          if (request.status == 200 || request.status == 201) {
            $(".messagewrapper").fadeIn();
            messageBox.innerHTML =
              "<span class='text-sm text-success'>درخواست شما با موفقیت انجام شد</span>";
            el.parentElement.innerHTML =
              "<span> مسدود شده (به علت: " +
              el.parentElement.querySelector("textarea").value +
              ") </span>" +
              "<button class='btn btn-success mx-1 unblock-user'> رفع مسدودسازی  </button>";
            setUnblockUserEvent();
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
              } else if (key == "reason") {
                keyf = "دلیل";
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
  }
} catch {}

// Set Click Event Function For Request Acceptation In Admin-Requests
try {
  function setAcceptEjectRequestEvents() {
    for (const el of document.getElementsByClassName("accept-request")) {
      el.addEventListener("click", function () {
        const element = this.parentElement.parentElement;
        element.lastElementChild.previousElementSibling.innerHTML = "تایید شده";
        element.lastElementChild.innerHTML =
          "<a href='main-profile.html' target='_blank' class='btn btn-info mx-1'> مشاهده پروفایل کاربر </a>";
        element.insertBefore(
          document.createElement("td"),
          element.children.item(2)
        );
        element.children.item(2).innerHTML = "امروز";

        document
          .getElementById("lastRequests")
          .querySelector("tbody")
          .insertBefore(
            element,
            document.getElementById("lastRequests").querySelector("tbody")
              .firstElementChild
          );
      });
    }
    for (const el of document.getElementsByClassName("eject-request")) {
      el.addEventListener("click", function () {
        this.parentElement.innerHTML =
          "<span> علت لغو درخواست: </span>" +
          "<textarea class='form-control mx-1 border border-dark' style='min-height: 40px;'></textarea>" +
          "<button class='btn btn-secondary cancel-eject-request mx-1'> لغو عملیات </button>" +
          "<button class='btn btn-danger eject-request-final mx-1'> تایید </button>";
        makeEjectRequestForm();
      });
    }
  }
  setAcceptEjectRequestEvents();

  function makeEjectRequestForm() {
    for (const el of document.getElementsByClassName("cancel-eject-request")) {
      el.addEventListener("click", function () {
        this.parentElement.innerHTML =
          "<a href='main-profile.html' target='_blank' class='btn btn-info mx-1'> مشاهده پروفایل کاربر </a>" +
          "<button class='btn btn-success mx-1 accept-request'> تایید درخواست </button>" +
          "<button class='btn btn-danger mx-1 eject-request'> رد درخواست </button>";
        setAcceptEjectRequestEvents();
      });
    }
    for (const el of document.getElementsByClassName("eject-request-final")) {
      el.addEventListener("click", function () {
        rejectrequest(
          document.querySelector("#mainWrapper").getAttribute("detail"),
          el
        );
        // const element = this.parentElement.parentElement;
        // element.lastElementChild.previousElementSibling.innerHTML =
        //   "رد شده (به علت: " +
        //   this.parentElement.querySelector("textarea").value +
        //   ")";
        // element.lastElementChild.innerHTML =
        //   "<a href='main-profile.html' target='_blank' class='btn btn-info mx-1'> مشاهده پروفایل کاربر </a>";
        // element.insertBefore(
        //   document.createElement("td"),
        //   element.children.item(2)
        // );
        // element.children.item(2).innerHTML = "امروز";

        // document
        //   .getElementById("lastRequests")
        //   .querySelector("tbody")
        //   .insertBefore(
        //     element,
        //     document.getElementById("lastRequests").querySelector("tbody")
        //       .firstElementChild
        //   );
      });
    }
    function rejectrequest(val, el) {
      var url = urldemo + `/api/admin/requests/reject/${val}/`;
      try {
        const formData = new FormData();
        formData.append("id", val);
        formData.append(
          "reason",
          el.parentElement.querySelector("textarea").value
        );

        const request = new XMLHttpRequest();
        request.onloadend = function () {
          console.log(request.status);
          if (request.status == 200 || request.status == 201) {
            $(".messagewrapper").fadeIn();
            messageBox.innerHTML =
              "<span class='text-sm text-success'>درخواست شما با موفقیت انجام شد</span>";
            window.location.reload();
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
              } else if (key == "reason") {
                keyf = "دلیل";
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
  }
} catch {}

// // Set Click Event Function For Remove Requests Button In Admin-Requests
// try {
//   document
//     .getElementsByClassName("remove-request")
//     .item(0)
//     .addEventListener("click", function () {
//       for (const el of document.querySelectorAll(
//         ".table-section:nth-of-type(2) tr:has(td:first-of-type input:checked)"
//       )) {
//         el.remove();
//       }
//     });
// } catch {}
