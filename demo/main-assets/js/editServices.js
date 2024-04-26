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
                <button class="btn btn-danger p-2 editReqBtn" 
                mablagh="${key.mablagh}"
                phone_number="${key.phone_number}" name="${key.service}" id="${
            key.id
          }">  ویرایش </button>
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
                "<div ><span style='display: block;text-align: right;'> تغییر عنوان: </span>" +
                "<input type='text' id='datatitle' class='service form-control mx-1 border border-dark' value='" +
                el.getAttribute("name") +
                "'>" +
                "<span style='display: block;text-align: right;'> تغییر مبلغ: </span>" +
                "<input type='text' id='datatitle2' class='mablagh form-control mx-1 border border-dark' value='" +
                el.getAttribute("mablagh") +
                "'>" +
                "<span style='display: block;text-align: right;'> تغییر شماره تماس: </span>" +
                "<input type='text' id='datatitle3' class=' phone_number form-control mx-1 border border-dark mb-2' value='" +
                el.getAttribute("phone_number") +
                "'>" +
                "<button class='btn btn-secondary cancel-edit-report mx-1'> لغو عملیات </button>" +
                `<button class='btn btn-danger edit-report-final mx-1' id="${el.getAttribute(
                  "id"
                )}"> تایید </button></div>`;
              makeEditReport(mainWalletCash);
              // Control Keyboard On Amount Sectiongggggggggggg
              for (const el of document.querySelectorAll("#datatitle2")) {
                try {
                  const amountInput = el;
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
                      if (
                        !/\D/.test(event.key) ||
                        event.key.toLowerCase() === "backspace"
                      ) {
                        checkAmount();
                      }
                    }
                  });
                  // For Mobile Devices
                  setInterval(function () {
                    checkAmount();
                  }, 1);
                } catch {}
              }
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
                  el.parentElement.querySelector(".service").value
                );
                formData.append(
                  "mablagh",
                  el.parentElement
                    .querySelector(".mablagh")
                    .value.replaceAll(",", "")
                );
                formData.append(
                  "phone_number",
                  el.parentElement.querySelector(".phone_number").value
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
