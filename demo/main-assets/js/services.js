// //////////////////////////////////////////////////
// **************************** global
let urldemo = "https://dl.eramglobal.com";
let messageBox = document.querySelector(".messageBox p");
let fetchHeader = {
  "Content-Type": "application/json; charset=utf-8",
};
$(".messagewrapper").hide();
$(".messageBtn").click(function () {
  $(".messagewrapper").fadeOut();
});
function clearMessageBox() {
  $(" .loader ").fadeOut();
}

function getUser() {
  var url = urldemo + `/api/user/info/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      console.log(request.status);
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        console.log(response);

        try {
          if (response[0].role != "(پذیرنده) مراکز") {
            document.querySelector("#menu .nav li:nth-of-type(6)").remove();
            document.querySelector("#menu .nav li:nth-of-type(7)").remove();
          }

          document.querySelector("#userName_box").innerHTML =
            response[0].username;
        } catch {}
        try {
          document.querySelector("section.items.d-flex").classList.add("mt-5");
          document
            .querySelector("section.items.d-flex>div:nth-of-type(1)")
            .classList.add("d-none");
        } catch {}
        try {
          document.querySelector("a.cta.d-flex").classList.add("d-none");
        } catch {}
      } else if (request.status == 401) {
        try {
          document
            .querySelector(".menu-toggler.bg-transparent")
            .classList.add("d-none");
        } catch {}
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
getUser();
// General Form Controls & Other
const allowedKeys = ["enter", "backspace", "tab"];

// Change Radio Options
function changeOption(senderEl, parentClass) {
  let activeEl;
  let disableEl;
  for (const element of document.querySelectorAll(
    "." + parentClass + " input[type=radio]"
  )) {
    if (element.checked) {
      activeEl = element;
    } else {
      disableEl = element;
    }
  }
  activeEl.parentElement.nextElementSibling.removeAttribute("disabled");
  disableEl.parentElement.nextElementSibling.setAttributeNode(
    document.createAttribute("disabled")
  );
  try {
    for (const el of activeEl.parentElement.nextElementSibling.children) {
      el.removeAttribute("disabled");
    }
  } catch {}
  try {
    for (const el of disableEl.parentElement.nextElementSibling.children) {
      el.setAttributeNode(document.createAttribute("disabled"));
    }
  } catch {}
}
if (document.getElementsByClassName("choice").length !== 0) {
  changeOption(
    document.querySelector(".choice input[type=radio]:first-of-type"),
    "choice"
  );
}
if (document.getElementsByClassName("target-choice").length !== 0) {
  changeOption(
    document.querySelector(".target-choice input[type=radio]:first-of-type"),
    "target-choice"
  );
}

// Control Keyboard On Card Number Section
for (const el of document.querySelectorAll("#card-numbers input")) {
  el.addEventListener("keydown", function (event) {
    if (event.key !== undefined) {
      if (allowedKeys.indexOf(event.key.toLowerCase()) === -1) {
        if (/\D/.test(event.key)) {
          event.preventDefault();
        } else {
          if (!/\D/.test(event.key)) {
            let text = this.value;
            text += event.key;
            if (text.length > 4) {
              try {
                this.nextElementSibling.focus();
              } catch {
                try {
                  document.getElementById("amount").focus();
                } catch {
                  // document.getElementById("name").focus();
                }
              }
            } else if (text.length === 4) {
              this.value = text;
              try {
                this.nextElementSibling.focus();
              } catch {
                try {
                  document.getElementById("amount").focus();
                } catch {
                  // document.getElementById("name").focus();
                }
              }
            } else {
              this.value = text;
            }
            event.preventDefault();
          }
        }
      }
    }
  });
}

// Control Keyboard On Input Sections
const elementList = [
  "amount",
  "shaba",
  "phone",
  "mobile",
  "activation-code",
  "card-number",
  "account-number",
  "national-code",
  "postal-code",
  "tracking-code",
  "office-code",
  "constant-password",
];
for (let i = 0; i < elementList.length; i++) {
  try {
    const el = document.getElementById(elementList.at(i));
    el.addEventListener("keydown", function (event) {
      if (event.key !== undefined) {
        if (
          allowedKeys.indexOf(event.key.toLowerCase()) === -1 &&
          /\D/.test(event.key)
        ) {
          event.preventDefault();
        }
      }
    });
  } catch {}
}

// Control Keyboard On Amount Section
try {
  const amountInput = document.getElementById("amount");
  function checkAmount() {
    let text = amountInput.value.replaceAll(",", "");
    let result = "";
    for (let i = text.length; i >= 1; i--) {
      const chr = text.charAt(i - 1);
      result = chr + result;
      if (i !== 1 && (text.length - i + 1) % 3 === 0) {
        result = "," + result;
      }
    }
    amountInput.value = result;
  }
  // For Desktop Devices
  amountInput.addEventListener("keyup", function (event) {
    if (event.key !== undefined) {
      if (!/\D/.test(event.key) || event.key.toLowerCase() === "backspace") {
        checkAmount();
      }
    }
  });
  // For Mobile Devices
  setInterval(function () {
    checkAmount();
  }, 1);
} catch {}

// Activate SMS (Show Message)
function activeSMS(val) {
  smsblock();
  // // Show Message
  // let errstatus = false;
  // const errors = document.getElementById("errors");
  // if (
  //   document.querySelectorAll("#card-numbers input.form-control[disabled]")
  //     .length === 0
  // ) {
  //   const cardNumber = document.querySelectorAll("#card-numbers input");
  //   for (const el of cardNumber) {
  //     if (el.value.length !== 4 || /\D/.test(el.value)) {
  //       errors.innerHTML =
  //         "لطفا شماره ی دارو کارت را به درستی (با اعداد انگلیسی) وارد کنید.";
  //       errstatus = false;
  //     } else {
  //       errstatus = true;
  //     }
  //   }
  //   if (errstatus) {
  //     val();
  //   }
  // }
}
// function activeSMS2(val) {
//   // Show Message

//   let errstatus = false;
//   const errors = document.getElementById("errors");

//   const cardNumber = document.querySelectorAll("#mobile");
//   for (const el of cardNumber) {
//     if (el.value.length !== 4 || /\D/.test(el.value)) {
//       errors.innerHTML =
//         "لطفا شماره ی  تلفن را به درستی (با اعداد انگلیسی) وارد کنید.";
//       errstatus = false;
//     } else {
//       errstatus = true;
//     }
//   }
//   if (errstatus) {
//     val();
//   }
// }
function smsregister() {
  var url =
    urldemo +
    `/api/register/send/code/?phone_number=${
      document.getElementById("mobile").value
    }`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>کد احراز هویت برای تلفن همراه شما ارسال شد.</span>";
      } else if (request.status == 400 || request.status == 403) {
        const res = JSON.parse(request.response);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          msg = msg + `${key} : ${res[key]}<br>`;
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

    request.send();
  } catch (error) {
    console.error(error);
  }
}

function smsblock() {
  var xx = "";
  if (document.getElementById("wallet-number-radio").checked) {
    xx = document.getElementById("wallet-number").value;
  } else {
    const cardnums = document.querySelectorAll("#card-numbers input");

    for (const el of cardnums) {
      xx = xx + el.value;
    }
  }
  console.log(xx);
  var url = urldemo + `/api/block/send/code/?number=${xx}`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>کد احراز هویت برای تلفن همراه شما ارسال شد.</span>";
      } else if (
        request.status == 400 ||
        request.status == 403 ||
        request.status == 404
      ) {
        const res = JSON.parse(request.response);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          msg = msg + `${key} : ${res[key]}<br>`;
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

function forgetsms() {
  var url =
    urldemo +
    `/api/forget/password/send/code/?phone_number=${
      document.querySelector("#mobile").value
    }`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>کد  برای تلفن همراه شما ارسال شد.</span>";
      } else if (request.status == 400 || request.status == 403) {
        const res = JSON.parse(request.response);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          msg = msg + `${key} : ${res[key]}<br>`;
        });
        if (msg) {
          const errors = document.getElementById("supportErrors");
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

    request.send();
  } catch (error) {
    console.error(error);
  }
}

// Validate Form On Submit
try {
  document
    .querySelector("form:not(.profileForm)")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      validate(event);
    });
} catch {}
function validate(event) {
  let message = "";
  let isTrue = true;
  for (const el of document.querySelectorAll(
    "main form>section input:not(#office-code), main form>section textarea"
  )) {
    if (
      !el.hasAttribute("disabled") &&
      el.className.indexOf("d-none") === -1 &&
      el.value.trim() === ""
    ) {
      console.log(el);
      message = "برای انجام عملیات هیچ یک از ورودی ها نباید خالی باشد.";
      isTrue = false;
    }
  }
  if (isTrue === true) {
    if (
      document.querySelectorAll("#card-numbers input.form-control[disabled]")
        .length === 0
    ) {
      const cardNumber = document.querySelectorAll("#card-numbers input");
      for (const el of cardNumber) {
        if (el.value.length !== 4 || /\D/.test(el.value)) {
          message =
            "لطفا شماره ی دارو کارت را به درستی (با اعداد انگلیسی) وارد کنید.";
          isTrue = false;
        }
      }
    }

    if (isTrue === true) {
      const amount = document.getElementById("amount") || undefined;
      const name1 =
        document.getElementById("owner-name") ||
        document.getElementById("name") ||
        document.getElementById("target-name") ||
        undefined;
      const name2 = document.getElementById("depositor-name") || undefined;
      const nationalCode =
        document.getElementById("national-code") || undefined;
      const cardNumber = document.getElementById("card-number") || undefined;
      const accountNumber =
        document.getElementById("account-number") || undefined;
      const trackingCode =
        document.getElementById("tracking-code") || undefined;
      const mobile = document.getElementById("mobile") || undefined;
      const phone = document.getElementById("phone") || undefined;
      const lastPassword = document.getElementById("lastPassword") || undefined;
      const postalCode = document.getElementById("postal-code") || undefined;
      const shaba = document.getElementById("shaba") || undefined;
      const code = document.getElementById("activation-code") || undefined;
      const accept = document.getElementById("accept") || undefined;
      const constantPassword =
        document.getElementById("constant-password") || undefined;

      if (amount !== undefined) {
        if (
          /\D/.test(amount.value.replaceAll(",", "")) ||
          parseInt(amount.value.replaceAll(",", "")) === 0
        ) {
          message = "لطفا میزان مبلغ را به درستی (با اعداد انگلیسی) وارد کنید.";
          isTrue = false;
        } else if (parseInt(amount.value.replaceAll(",", "")) > 499445000) {
          message = "مبلغ نمی تواند از 499,445,000 ریال بیشتر باشد.";
          isTrue = false;
        }
      }
      if (isTrue === true) {
        if (
          shaba !== undefined &&
          document.querySelectorAll("#shaba[disabled]").length === 0 &&
          (shaba.value.length !== 24 || /\D/.test(shaba.value))
        ) {
          message =
            "لطفا شماره شبا را به روش صحیح (و با اعداد انگلیسی) وارد نمایید.";
          isTrue = false;
        } else if (
          (name1 !== undefined && !/^[ا-ی\s]+$/.test(name1.value)) ||
          (name2 !== undefined && !/^[ا-ی\s]+$/.test(name2.value))
        ) {
          message =
            "لطفا نام و نام خانوادگی را به روش صحیح و فارسی (بدون همزه) وارد نمایید.";
          isTrue = false;
        } else if (
          nationalCode !== undefined &&
          (nationalCode.value.length !== 10 || /\D/.test(nationalCode.value))
        ) {
          message =
            "لطفا کد ملی را به روش صحیح (و با اعداد انگلیسی) وارد نمایید (برای مثال: 097----116)";
          isTrue = false;
        } else if (
          mobile !== undefined &&
          (mobile.value.length !== 11 ||
            !/^09/.test(mobile.value) ||
            /\D/.test(mobile.value))
        ) {
          message =
            "لطفا شماره ی موبایل را به روش صحیح (و با اعداد انگلیسی) وارد نمایید (برای مثال: 1234----0913)";
          isTrue = false;
        } else if (
          phone !== undefined &&
          (phone.value.length !== 11 ||
            !/^0/.test(phone.value) ||
            /\D/.test(phone.value))
        ) {
          message =
            "لطفا شماره ی تلفن را به روش صحیح (و با اعداد انگلیسی) وارد نمایید (برای مثال: 1234----031)";
          isTrue = false;
        } else if (
          postalCode !== undefined &&
          (postalCode.value.length !== 10 || /\D/.test(postalCode.value))
        ) {
          message =
            "لطفا کد پستی را به روش صحیح (و با اعداد انگلیسی) وارد نمایید";
          isTrue = false;
        } else if (
          cardNumber !== undefined &&
          (cardNumber.value.length !== 16 || /\D/.test(cardNumber.value))
        ) {
          message =
            "لطفا شماره کارت را به روش صحیح (و با اعداد انگلیسی) وارد نمایید (برای مثال: 2342--------6731)";
          isTrue = false;
        } else if (
          accountNumber !== undefined &&
          /\D/.test(accountNumber.value)
        ) {
          message =
            "لطفا شماره حساب را به روش صحیح (و با اعداد انگلیسی) وارد نمایید (برای مثال: )";
          isTrue = false;
        } else if (
          trackingCode !== undefined &&
          /\D/.test(trackingCode.value)
        ) {
          message =
            "لطفا کد رهگیری/کد اقتصادی را به روش صحیح (و با اعداد انگلیسی) وارد نمایید (برای مثال: )";
          isTrue = false;
        } else if (
          code !== undefined &&
          (code.value.length !== 6 || /\D/.test(code.value))
        ) {
          message =
            "لطفا کد احراز هویت را به درستی (با اعداد انگلیسی) وارد نمایید.";
          isTrue = false;
        } else if (
          password !== undefined &&
          password.value !== lastPassword &&
          (/\s/.test(password.value) || password.value.length < 1)
        ) {
          message = "رمز عبور باید حداقل 8 کاراکتر و بدون فاصله باشد.";
          isTrue = false;
        } else if (
          confirmPassword !== undefined &&
          password.value !== lastPassword &&
          confirmPassword.value !== password.value
        ) {
          message = "لطفا رمز عبور خود را به درستی تایید کنید.";
          isTrue = false;
        } else if (
          constantPassword !== undefined &&
          constantPassword.style.display !== "none" &&
          (constantPassword.value.length !== 4 ||
            /\D/.test(constantPassword.value))
        ) {
          message = "لطفا رمز ثابت را به درستی با 4 رقم انگلیسی وارد نمایید.";
          isTrue = false;
        } else if (accept !== undefined && accept.checked === false) {
          message =
            "برای انجام عملیات باید با قوانین و شرایط موافقت کرده و تیک آن را بزنید.";
          isTrue = false;
        }
      }
    }
  }
  if (isTrue === false) {
    const errors = document.getElementById("errors");
    errors.innerText = message;
    errors.className = errors.className.replace("text-success", "text-danger");
    event.preventDefault();
    return false;
  } else {
    event.preventDefault();

    var act = document.querySelector("form").getAttribute("type");

    if (act == "register") {
      register();
    } else if (act == "login") {
      login();
    } else if (act == "support") {
      support();
    } else if (act == "loan") {
      loan();
    } else if (act == "sms") {
      sms();
    } else if (act == "block") {
      block();
    } else if (act == "cardInfo") {
      cardInfo();
    } else if (act == "transfer") {
      transfer();
    } else if (act == "forget") {
      forget();
    } else if (act == "visitReq") {
      visitReq();
    } else if (act == "increase") {
      increase();
    } else if (act == "service") {
      service();
    }
  }
}

// Print Page
try {
  document.querySelector(".print").addEventListener("click", function () {
    window.print();
  });
} catch {}

// //////////////////////////////////////////////////
// Profile Section Controls

// Control Keyboard On Password Section
const password = document.getElementById("password") || undefined;
const confirmPassword =
  document.getElementById("confirm-password") || undefined;
if (confirmPassword !== undefined) {
  try {
    lastPassword = password.value;
    password.addEventListener("keyup", function (event) {
      if (event.key !== undefined) {
        if (password.value !== lastPassword) {
          if (confirmPassword.hasAttribute("disabled")) {
            confirmPassword.removeAttribute("disabled");
          }
        } else {
          confirmPassword.setAttributeNode(
            document.createAttribute("disabled")
          );
        }
      }
    });
  } catch {}
}

// Control Changing User Type Selection
try {
  document.getElementById("user-type").selectedIndex = "0";
  document.getElementById("profile").classList.replace("d-none", "d-block");
  document.getElementById("user-type").addEventListener("change", function () {
    if (this.selectedIndex === 0) {
      document.getElementById("profile").classList.replace("d-none", "d-block");
      document
        .getElementById("profile2")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("profile2")
        .classList.replace("d-none", "d-block");
      document.getElementById("profile").classList.replace("d-block", "d-none");
    }
  });
} catch {}

// //////////////////////////////////////////////////
// Special Sections Controls

// Set Click Event Function For Digital Sign Section
try {
  document
    .querySelector(".digital-sign button:first-of-type")
    .addEventListener("click", function (e) {
      var url = urldemo + `/api/sign/`;
      try {
        const request = new XMLHttpRequest();
        request.onloadend = function () {
          if (request.status == 200 || request.status == 201) {
            var response = JSON.parse(this.responseText);

            document
              .querySelector(".digital-sign .btn-secondary ")
              .removeAttribute("disabled");
            document.querySelector(".digital-sign .btn-secondary ").innerHTML =
              "Copy";
            document.querySelector(".digital-sign .input-group-text ").value =
              response.token;
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
            console.log(request);
          }
        };
        request.open("POST", url);
        request.setRequestHeader(
          "Authorization",
          `Token ${localStorage.getItem("token")}`
        );
        request.send();
      } catch (error) {
        console.error(error);
      }
    });
  document
    .querySelectorAll(".digital-sign button")
    .item(1)
    .addEventListener("click", function () {
      try {
        navigator.clipboard.writeText(
          this.parentElement.querySelector("input").value
        );
        this.innerText = "Copied";
      } catch {}
      try {
        this.parentElement.querySelector("input").select();
        document.execCommand("copy");
        this.parentElement.querySelector("input").setSelectionRange(0, 0);
      } catch {}
    });
} catch {}

// Control Changing Card Type Selection In Issuing Daroo-Card Info
try {
  document.getElementById("card-type").addEventListener("change", function () {
    if (this.selectedIndex === 1) {
      for (const el of document.querySelectorAll("main form>section.d-none")) {
        el.classList.replace("d-none", "d-none-inactive");
      }
    } else {
      for (const el of document.querySelectorAll(
        "main form>section.d-none-inactive"
      )) {
        el.classList.replace("d-none-inactive", "d-none");
      }
    }
  });
} catch {}

// **************************** register

function register() {
  var url = urldemo + `/api/register/`;
  try {
    const formData = new FormData();
    formData.append("username", document.getElementById("username").value);
    formData.append("password", document.getElementById("password").value);
    formData.append("code", document.getElementById("activation-code").value);
    formData.append("phone_number", document.getElementById("mobile").value);

    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);

        console.log(response);
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML = `<span class='text-sm text-success'>ثبت نام شما با موفقیت انجام شد</span>`;
        window.location.replace("http://127.0.0.1:5500/main-signin.html");
      } else if (request.status == 400) {
        const res = JSON.parse(request.response);
        console.log(res);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          var keyf = "";
          if (key == "error") {
            keyf = "ارور";
          } else if (key == "username") {
            keyf = "نام کاربری";
          } else if (key == "password") {
            keyf = "رمزعبور";
          } else if (key == "code") {
            keyf = "کد";
          } else if (key == "phone_number") {
            keyf = "شماره موبایل";
          } else {
            keyf = key;
          }
          msg = msg + `${keyf} : ${res[key]}<br>`;
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
    // request.setRequestHeader("Content-Type", "application/json");
    // request.setRequestHeader("Access-Control-Allow-Origin", "*");
    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}
// **************************** login

function login() {
  var url = urldemo + `/api/login/`;
  try {
    const formData = new FormData();
    formData.append("username", document.getElementById("username").value);
    formData.append("password", document.getElementById("password").value);
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var data = JSON.parse(this.responseText);
        console.log(data.detail);
        window.localStorage.setItem("token", data.detail.token);
        window.location.replace("http://127.0.0.1:5500/main-index.html");
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
    request.open("POST", url);
    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}
function increase() {
  var url = urldemo + `/api/increase/`;
  try {
    const formData = new FormData();
    var xx = "";
    if (document.getElementById("wallet-number-radio").checked) {
      formData.append(
        "wallet_number",
        document.getElementById("wallet-number").value
      );
    } else {
      const cardnums = document.querySelectorAll("#card-numbers input");

      for (const el of cardnums) {
        xx = xx + el.value;
      }
      formData.append("daroo_card_number", xx);
    }

    formData.append(
      "mablagh",
      document.getElementById("amount").value.replaceAll(",", "")
    );
    formData.append("dscription", document.getElementById("description").value);
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var data = JSON.parse(this.responseText);
        console.log(data.detail);
        window.localStorage.setItem("token", data.detail.token);
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'> ئرخواست شما با موفقیت انجام شد </span>";
      } else if (request.status == 401) {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>  لطفا ابتدا وارد سایت شوید   </span>";
      } else if (request.status == 400 || request.status == 403) {
        const res = JSON.parse(request.response);
        console.log(res);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          var keyf = "";
          if (key == "error") {
            keyf = "ارور";
          } else if (key == "wallet_number") {
            keyf = "شماره ی کیف پول";
          } else if (key == "daroo_card_number") {
            keyf = "شماره ی دارو کارت";
          } else if (key == "mablagh") {
            keyf = "مبلغ";
          } else if (key == "dscription") {
            keyf = "توضیحات";
          } else {
            keyf = key;
          }
          msg = msg + `${keyf} : ${res[key]}<br>`;
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
    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}

// **************************** logout

function logout() {
  var url = urldemo + "/api/logout/";

  try {
    const formData = new FormData();
    formData.append("token", localStorage.getItem("token"));
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        localStorage.clear();
        window.location.replace("http://127.0.0.1:5500/main-index.html");
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
    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}

// **************************** change password
function changePass() {
  var url = urldemo + `/api/change/password/`;
  try {
    const request = new XMLHttpRequest();
    const formData = new FormData();
    formData.append(
      "old_password",
      document.getElementById("lastpassword").value
    );
    formData.append("new_password", document.getElementById("password").value);
    formData.append(
      "repeat_new_password",
      document.getElementById("confirmPassword").value
    );
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);

        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>Your password has been successfully changed</span>";
      } else if (request.status == 400) {
        const res = JSON.parse(request.response);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          msg = msg + `${key} : ${res[key]}<br>`;
        });
        if (msg) {
          const errors = document.getElementById("passErrors");
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
    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}

// **************************** support

function supportfile(event) {
  event.preventDefault();
  var url = urldemo + `/api/support/add/doc/`;
  try {
    const formData = new FormData();
    const fileInput = document.getElementById("file");
    formData.append("document", fileInput.files[0]);

    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>پیام شما با موفقیت ارسال شد</span>";
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
    request.open("POST", url, true);
    // request.setRequestHeader("Content-Type", "multipart/form-data");
    request.setRequestHeader(
      "Authorization",
      `Token ${localStorage.getItem("token")}`
    );

    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}
function service() {
  var url = urldemo + `/api/services/`;
  try {
    const formData = new FormData();
    formData.append("service", document.getElementById("title").value);

    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>درخواست شما با موفقیت ارسال شد</span>";
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
          } else if (key == "service") {
            keyf = "عنوان";
          } else {
            keyf = key;
          }
          msg = msg + `${keyf} : ${res[key]}<br>`;
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
    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}

function support() {
  var url = urldemo + `/api/support/`;
  try {
    const formData = new FormData();
    formData.append("title", document.getElementById("title").value);
    formData.append("message", document.getElementById("message").value);

    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>پیام شما با موفقیت ارسال شد</span>";
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
          } else if (key == "title") {
            keyf = "عنوان";
          } else if (key == "message") {
            keyf = "پیام";
          } else {
            keyf = key;
          }
          msg = msg + `${keyf} : ${res[key]}<br>`;
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
    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}

// **************************** center profile
function patchCenterProfile(event) {
  event.preventDefault();
  const searchparams = new URLSearchParams(window.location.search);
  var urlpath = searchparams.get("userid");
  var urlpath2 = searchparams.get("centerid");
  if (urlpath) {
    var xx = `/api/admin/users/edit/profile/${urlpath}/`;
  } else if (urlpath2) {
    var xx = `/api/admin/centers/edit/profile/${urlpath}/`;
  } else {
    var xx = `/api/center/profile/${document
      .querySelector("#profile2")
      .getAttribute("formid")}/`;
  }
  var url = urldemo + xx;
  try {
    const formData = new FormData();

    formData.append("role", document.getElementById("user-type").value);
    formData.append("phone", document.getElementById("phone2").value);
    formData.append(
      "national_id",
      document.getElementById("national-code2").value
    );
    formData.append("address", document.getElementById("address2").value);
    formData.append("sheba", document.getElementById("shaba2").value);
    formData.append(
      "card_number",
      document.getElementById("card-number2").value
    );
    formData.append(
      "account_number",
      document.getElementById("account-number2").value
    );
    formData.append("name", document.getElementById("name2").value);
    formData.append(
      "postal_code",
      document.getElementById("postal-code2").value
    );
    formData.append(
      "pepresentative_position",
      document.getElementById("user-position2").value
    );
    formData.append(
      "center_name",
      document.getElementById("user-position2").value
    );
    formData.append(
      "center_type",
      document.getElementById("office-type2").value
    );
    formData.append(
      "center_code",
      document.getElementById("office-code2").value
    );
    formData.append(
      "economy_code",
      document.getElementById("tracking-code2").value
    );
    formData.append("password", document.getElementById("password2").value);

    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);

        console.log(response);
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML = `<span class='text-sm text-success'>درخواست شما با موفقیت انجام شد</span>`;
      } else if (request.status == 401) {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>  لطفا ابتدا وارد سایت شوید   </span>";
      } else if (request.status == 400 || request.status == 403) {
        const res = JSON.parse(request.response);
        console.log(res);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          var keyf = "";
          if (key == "error") {
            keyf = "ارور";
          } else if (key == "mobile") {
            keyf = "شماره موبایل";
          } else if (key == "name") {
            keyf = "نام و نام خانوادگی";
          } else if (key == "password") {
            keyf = "رمز عبور";
          } else if (key == "account_number") {
            keyf = "شماره حساب ";
          } else if (key == "card_number") {
            keyf = "شماره کارت";
          } else if (key == "address") {
            keyf = "آدرس";
          } else if (key == "national_id") {
            keyf = "کد ملی";
          } else if (key == "phone") {
            keyf = " تلفن همراه";
          } else if (key == "role") {
            keyf = "نقش کاربر";
          } else if (key == "username") {
            keyf = "نام کاربری";
          } else if (key == "postal_code") {
            keyf = "کد پستی";
          } else if (key == "center_name") {
            keyf = "نام مرکز";
          } else if (key == "pepresentative_position") {
            keyf = "سمت نماینده";
          } else if (key == "center_type") {
            keyf = "	نوع مرکز";
          } else if (key == "center_code") {
            keyf = "	کد مرکز";
          } else if (key == "economy_code") {
            keyf = "کد رهگیری/کداقتصادی ";
          } else if (key == "sheba") {
            keyf = "شماره شبا";
          } else {
            keyf = key;
          }
          msg = msg + `${keyf} : ${res[key]}<br>`;
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

function patchProfile(event) {
  const searchparams = new URLSearchParams(window.location.search);
  var urlpath = searchparams.get("userid");
  var urlpath2 = searchparams.get("centerid");
  if (urlpath) {
    var xx = `/api/admin/users/edit/profile/${urlpath}/`;
  } else if (urlpath2) {
    var xx = `/api/admin/centers/edit/profile/${urlpath}/`;
  } else {
    var xx = `/api/center/profile/${document
      .querySelector("#profile")
      .getAttribute("formid")}/`;
  }
  var url = urldemo + xx;
  console.log(xx);
  event.preventDefault();

  try {
    const formData = new FormData();
    formData.append("role", document.getElementById("user-type").value);
    formData.append("phone", document.getElementById("phone").value);
    formData.append(
      "national_id",
      document.getElementById("national-code").value
    );
    formData.append("address", document.getElementById("address").value);
    formData.append("sheba", document.getElementById("shaba").value);
    formData.append(
      "card_number",
      document.getElementById("card-number").value
    );
    formData.append(
      "account_number",
      document.getElementById("account-number").value
    );

    formData.append("name", document.getElementById("name").value);

    formData.append("password", document.getElementById("password").value);

    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);

        console.log(response);
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML = `<span class='text-sm text-success'>درخواست شما با موفقیت انجام شد</span>`;
      } else if (request.status == 401) {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>  لطفا ابتدا وارد سایت شوید   </span>";
      } else if (request.status == 400 || request.status == 403) {
        const res = JSON.parse(request.response);
        console.log(res);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          var keyf = "";
          if (key == "error") {
            keyf = "ارور";
          } else if (key == "name") {
            keyf = "نام و نام خانوادگی";
          } else if (key == "password") {
            keyf = "رمز عبور";
          } else if (key == "account_number") {
            keyf = "شماره حساب ";
          } else if (key == "card_number") {
            keyf = "شماره کارت";
          } else if (key == "address") {
            keyf = "آدرس";
          } else if (key == "national_id") {
            keyf = "کد ملی";
          } else if (key == "phone") {
            keyf = "تلفن";
          } else if (key == "role") {
            keyf = "نقش کاربر";
          } else if (key == "sheba") {
            keyf = "شماره شبا";
          } else {
            keyf = key;
          }
          msg = msg + `${keyf} : ${res[key]}<br>`;
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

// **************************** visitReq
function visitReq() {
  var url = urldemo + `/api/vizit/`;
  try {
    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("title", document.getElementById("title").value);
    formData.append("service", document.getElementById("service-type").value);
    formData.append(
      "national_id",
      document.getElementById("national-code").value
    );
    formData.append(
      "mablagh",
      parseInt(document.getElementById("amount").value.replaceAll(",", ""))
    );
    formData.append("phone_number", document.getElementById("mobile").value);
    formData.append("dsc", document.getElementById("description").value);
    formData.append(
      "payment_method",
      document.getElementById("payment-type").value
    );
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>درخواست شما با موفقیت ارسال شد</span>";
        window.location.replace(
          "http://127.0.0.1:5500/main-reception-requests.html"
        );
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
          } else if (key == "name") {
            keyf = "نام و نام خانوادگی";
          } else if (key == "title") {
            keyf = "عنوان";
          } else if (key == "national_id") {
            keyf = "کد ملی";
          } else if (key == "mablagh") {
            keyf = "مبلغ";
          } else if (key == "phone_number") {
            keyf = "شماره موبایل";
          } else if (key == "dsc") {
            keyf = "توضیحات";
          } else if (key == "payment_method") {
            keyf = "روش پرداخت";
          } else if (key == "service") {
            keyf = " خدمت";
          } else {
            keyf = key;
          }
          msg = msg + `${keyf} : ${res[key]}<br>`;
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
    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}
// **************************** loan
function loan() {
  var url = urldemo + `/api/loan/`;
  try {
    const formData = new FormData();
    formData.append(
      "loan_type",
      document.getElementById("facility-type").value
    );
    formData.append(
      "loan_amount",
      parseInt(document.getElementById("amount").value.replaceAll(",", ""))
    );
    formData.append(
      "payment_time",
      document.getElementById("refund-time").value
    );
    formData.append(
      "description",
      document.getElementById("description").value
    );
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>درخواست شما با موفقیت ارسال شد</span>";
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
          } else if (key == "loan_type") {
            keyf = "نوع وام";
          } else if (key == "loan_amount") {
            keyf = "مبلغ";
          } else if (key == "payment_time") {
            keyf = "مدت بازپرداخت";
          } else if (key == "description") {
            keyf = "توضیحات";
          } else {
            keyf = key;
          }
          msg = msg + `${keyf} : ${res[key]}<br>`;
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
    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}

// **************************** cardInfo
function cardInfo() {
  const searchParams = new URLSearchParams(window.location.search);
  var url = urldemo + `/api/card/${searchParams.get("q")}/`;
  try {
    const formData = new FormData();
    formData.append("card_type", document.getElementById("card-type").value);
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        console.log(request.response);
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
          } else if (key == "card_type") {
            keyf = "نوع کارت";
          } else {
            keyf = key;
          }
          msg = msg + `${keyf} : ${res[key]}<br>`;
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
function changeOption(senderEl, parentClass) {
  let activeEl;
  let disableEl;
  for (const element of document.querySelectorAll(
    "." + parentClass + " input[type=radio]"
  )) {
    if (element.checked) {
      activeEl = element;
    } else {
      disableEl = element;
    }
  }
  activeEl.parentElement.nextElementSibling.removeAttribute("disabled");
  disableEl.parentElement.nextElementSibling.setAttributeNode(
    document.createAttribute("disabled")
  );
  try {
    for (const el of activeEl.parentElement.nextElementSibling.children) {
      el.removeAttribute("disabled");
    }
  } catch {}
  try {
    for (const el of disableEl.parentElement.nextElementSibling.children) {
      el.setAttributeNode(document.createAttribute("disabled"));
    }
  } catch {}
}
// **************************** sms
function sms() {
  var xx = "";
  if (document.getElementById("wallet-number-radio").checked) {
    xx = document.getElementById("wallet-number").value;
  } else {
    const cardnums = document.querySelectorAll("#card-numbers input");

    for (const el of cardnums) {
      xx = xx + el.value;
    }
  }
  console.log(xx);
  var url = urldemo + `/api/active/sms/${xx}/`;
  try {
    const formData = new FormData();

    formData.append(
      "description",
      document.getElementById("description").value
    );
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        console.log(request.response);
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>درخواست شما با موفقیت ارسال شد</span>";
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
          } else if (key == "number") {
            keyf = "شماره";
          } else if (key == "description") {
            keyf = "توضیحات";
          } else {
            keyf = key;
          }
          msg = msg + `${keyf} : ${res[key]}<br>`;
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

// **************************** block
function block() {
  var xx = "";
  if (document.getElementById("wallet-number-radio").checked) {
    xx = document.getElementById("wallet-number").value;
  } else {
    const cardnums = document.querySelectorAll("#card-numbers input");

    for (const el of cardnums) {
      xx = xx + el.value;
    }
  }
  console.log(xx);
  var url = urldemo + `/api/block/card/${xx}/`;
  try {
    const formData = new FormData();

    formData.append(
      "description",
      document.getElementById("description").value
    );
    formData.append("code", document.getElementById("activation-code").value);
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        console.log(request.response);
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>درخواست شما با موفقیت ارسال شد</span>";
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
          } else if (key == "description") {
            keyf = "توضیحات";
          } else if (key == "code") {
            keyf = "کد";
          } else {
            keyf = key;
          }
          msg = msg + `${keyf} : ${res[key]}<br>`;
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

// **************************** forget
function forget() {
  var url = urldemo + `/api/forget/password/`;
  try {
    const formData = new FormData();

    formData.append("phone_number", document.getElementById("mobile").value);
    formData.append("code", document.getElementById("activation-code").value);

    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var data = JSON.parse(this.responseText);
        console.log(data.detail);
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML =
          "<span class='text-sm text-success'>درخواست شما با موفقیت انجام شد</span>";
        window.localStorage.setItem("token", data.detail.token);
        window.location.replace("http://127.0.0.1:5500/main-profile.html");
      } else if (request.status == 400 || request.status == 403) {
        const res = JSON.parse(request.response);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          var keyf = "";
          if (key == "error") {
            keyf = "ارور";
          } else if (key == "phone_number") {
            keyf = "شماره موبایل";
          } else if (key == "code") {
            keyf = "کد";
          } else {
            keyf = key;
          }
          msg = msg + `${keyf} : ${res[key]}<br>`;
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

    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}

// **************************** transfer
function transfer() {
  var url = urldemo + `/api/transfer/`;
  try {
    const formData = new FormData();
    var xx = "";
    if (document.getElementById("wallet-number-radio").checked) {
      formData.append(
        "from_wallet_number",
        document.getElementById("wallet-number").value
      );
    } else {
      const cardnums = document.querySelectorAll("#card-numbers input");

      for (const el of cardnums) {
        xx = xx + el.value;
      }
      formData.append("from_daroo_card_number", xx);
    }
    if (document.getElementById("target-wallet-number-radio").checked) {
      formData.append(
        "to_wallet_number",
        document.getElementById("target-wallet-number").value
      );
    } else {
      formData.append("sheba", document.getElementById("shaba").value);
    }

    formData.append(
      "mablagh",
      document.getElementById("amount").value.replaceAll(",", "")
    );
    formData.append("name", document.getElementById("target-name").value);
    formData.append("phone_number", document.getElementById("mobile").value);
    formData.append("dscription", document.getElementById("description").value);
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        console.log(request.response);
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
          } else if (key == "from_wallet_number") {
            keyf = "شماره ی کیف پول";
          } else if (key == "from_daroo_card_number") {
            keyf = "شماره ی کیف پول";
          } else if (key == "mablagh") {
            keyf = "مبلغ";
          } else if (key == "to_wallet_number") {
            keyf = "شماره ی کیف پول مقصد";
          } else if (key == "sheba") {
            keyf = "شماره شبا مقصد ";
          } else if (key == "phone_number") {
            keyf = "تلفن همراه";
          } else if (key == "name") {
            keyf = "نام و نام خانوادگی";
          } else if (key == "dscription") {
            keyf = "توضیحات";
          } else {
            keyf = key;
          }
          msg = msg + `${keyf} : ${res[key]}<br>`;
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
    request.send(formData);
  } catch (error) {
    console.error(error);
  }
}
