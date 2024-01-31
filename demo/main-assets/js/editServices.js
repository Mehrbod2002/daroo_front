function getservice() {
  const searchparams = new URLSearchParams(window.location.search);
  var urlpath = searchparams.get("id");
  if (urlpath) {
    document.getElementById("mainTitle").innerHTML = " ویرایش خدمت";
  } else {
    document.getElementById("mainTitle").innerHTML = "افزودن خدمت";
  }
  var url = urldemo + `/api/services/`;

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
              <td sorttable_customkey="14020215" style="direction: ltr;"> ${
                key.service
              } </td>

              <td>
              <button class="btn btn-danger p-2 editReqBtn" name="${
                key.service
              }" id="${key.id}">  ویرایش </button>
              </td>
            
          </tr>`;
          html = html + item;
        });
        document.querySelector("#reportsTable tbody").innerHTML = html;
        // +++
        for (const el of document.querySelectorAll(".editReqBtn")) {
          el.addEventListener("click", function () {
            window.location.href = `https://daroocard.com/main-create-service.html?id=${el.getAttribute(
              "id"
            )}`;
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
getservice();
