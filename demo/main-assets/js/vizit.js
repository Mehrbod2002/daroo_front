function getvizit() {
  const searchparams = new URLSearchParams(window.location.search);
  var urlpath = searchparams.get("id");
  var urlpath2 = searchparams.get("centerid");
  var url = urldemo + `/api/vizit/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        var html = "";
        response.forEach((key, index) => {
          var item = `<tr>
            <td> ${index + 1} </td>
            <td sorttable_customkey="14020215" style="direction: ltr;"> ${key.created_at} </td>
            <td>${key.name}</td>
            <td> ${key.title}</td>
            <td> ${key.national_id}  </td>
            <td> ${key.phone_number}  </td>
            <td sorttable_customkey="${key.mablagh}" style="direction: ltr;"> ${key.mablagh} </td>
            <td>${key.tracking_code}</td>
            <td> ${key.status}</td>
            <td>
            ${
              key.status == "در انتظار تایید اپراتور"
                ? `<button class="btn btn-danger p-2 linkReqBtn" id="${key.id}"> ارسال لینک پرداخت </button>`
                : ""
            }
            ${
              key.status == "در انتظار پذیرش اپراتور"
                ? `<button class="btn btn-danger p-2 acceptReqBtn" id="${key.id}"> پذیرش </button>`
                : ""
            }  </td>
            <td> ${key.dsc} </td>
            <td> <button class="get-report btn btn-secondary p-2" id="${
              key.id
            }"> گزارش درخواست </button> </td>
        </tr>`;
          html = html + item;
        });
        document.querySelector("#reportsTable tbody").innerHTML = html;
        // +++
        for (const el of document.querySelectorAll(".get-report")) {
          el.addEventListener("click", function () {
            window.open(
              `./main-reception-report.html?q=${el.getAttribute("id")}`
            );
          });
        }
        const accs = document.querySelectorAll(".acceptReqBtn");
        for (const el of accs) {
          el.addEventListener("click", function () {
            console.log(el.getAttribute("id"));
            acceptVisit(el.getAttribute("id"));
          });
        }
        // +++
        const Link = document.querySelectorAll(".linkReqBtn");
        for (const el of Link) {
          el.addEventListener("click", function () {
            sendVisit(el.getAttribute("id"));
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
getvizit();

function acceptVisit(val) {
  var url = urldemo + `/api/vizit/operation/accept/${val}/`;
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

function sendVisit(val) {
  var url = urldemo + `/api/vizit/operation/send/link/${val}/`;
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
