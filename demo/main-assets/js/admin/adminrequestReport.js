const searchparams = new URLSearchParams(window.location.search);
var urlpath = searchparams.get("requestid");

function getReport() {
  var url = urldemo + `/api/admin/requests/reports/${urlpath}/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        var data = Object.entries(response);
        var html = "";
        data.forEach((key, index) => {
          var item = `<div class="item w-100 d-flex justify-content-between align-items-center position-relative bg-white shadow rounded-3 py-2 px-3 mb-2">
                  <span class="label">  ${key[0]}</span>
                  <span class="value">  ${key[1]} </span>
            </div>`;
          html = html + item;
        });
        document.querySelector("#reportBox").innerHTML = html;
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
          "<span class='text-sm text-danger'> متاسفانه مشکلی در سایت پیش آمده است لطفا بعدا تلاش کنید </span>";
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
getReport();
