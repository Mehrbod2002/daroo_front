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
        function setEditReportEvent() {
          for (const el of document.querySelectorAll(".editReqBtn")) {
            el.addEventListener("click", function () {
              const mainData = el.getAttribute("name");
              const mainWalletCash = this.parentElement.innerHTML;
              this.parentElement.innerHTML =
                "<span> تغییر عنوان: </span>" +
                "<input type='text' id='datatitle' class='form-control mx-1 border border-dark' value='" +
                mainData +
                "'>" +
                "<button class='btn btn-secondary cancel-edit-report mx-1'> لغو عملیات </button>" +
                `<button class='btn btn-danger edit-report-final mx-1' id="${el.getAttribute(
                  "id"
                )}"> تایید </button>`;
              makeEditReport(mainWalletCash);
            });
          }
        }

        setEditReportEvent();
        function makeEditReport(mainWalletCash) {
          for (const el of document.getElementsByClassName(
            "cancel-edit-report"
          )) {
            el.addEventListener("click", function () {
              this.parentElement.innerHTML = mainWalletCash;
              setEditReportEvent();
              // setBlockWalletEvent();
            });
          }
          for (const el of document.getElementsByClassName(
            "edit-report-final"
          )) {
            el.addEventListener("click", function () {
              var url = urldemo + `/api/services/${el.getAttribute("id")}/`;

              try {
                const formData = new FormData();
                formData.append(
                  "service",
                  el.parentElement.querySelector("input").value
                );

                const request = new XMLHttpRequest();
                request.onloadend = function () {
                  if (request.status == 200 || request.status == 201) {
                    $(".messagewrapper").fadeIn();
                    messageBox.innerHTML =
                      "<span class='text-sm text-success'>درخواست شما با موفقیت ارسال شد</span>";
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

                request.open("PATCH", url);

                request.setRequestHeader(
                  "Authorization",
                  `Token ${localStorage.getItem("token")}`
                );
                request.send(formData);
              } catch (error) {
                console.error(error);
              }
            });
          }
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
