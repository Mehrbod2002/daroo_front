// *************** loan
function getLoan() {
  var url = urldemo + `/api/loan/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        var html = "";
        response.forEach((key, index) => {
          var item = `<tr>
            <td> ${index + 1} </td>
            <td sorttable_customkey="14020215">${key.created_at} </td>
            <td> ${key.loan_type} </td>
            <td sorttable_customkey="${
              key.loan_amount
            }" style="direction: ltr;"> ${key.loan_amount} </td>
            <td> ${key.payment_time} </td>
            <td> ${key.tracking_code} </td>
            <td> ${key.description}</td>
            <td>  ${key.state}</td>
            <td style="direction: ltr;">  ${key.installment} </td>
            <td style="direction: ltr;">  ${key.guaranteed_deposit} </td>
            <td style="direction: ltr;">  
            ${
              key.state == "پرداخت سپرده تضمینی"
                ? `<button  class="get-data-link btn btn-secondary p-2" dataid="${key.id}">   تکیل اطلاعات </button>`
                : ""
            }
            ${
              key.state == "تایید اولیه"
                ? ` <button  class="get-payment-link btn btn-secondary p-2" paymentid="${key.id}">  لینک پرداخت </button>`
                : ""
            } 
            
            </td>
           
            <td> <button class="get-report2 btn btn-secondary p-2" id="${
              key.id
            }"> گزارش درخواست </button> </td>
        </tr>`;
          html = html + item;
        });

        document.querySelector("#reportsTable tbody").innerHTML = html;
        for (const el of document.querySelectorAll(".get-data-link")) {
          el.addEventListener("click", function () {
            getCompeleteDoc(el.getAttribute("dataid"));
          });
        }
        for (const el of document.querySelectorAll(".get-payment-link")) {
          el.addEventListener("click", function () {
            getPymentLink(el.getAttribute("paymentid"));
          });
        }
        for (const el of document.querySelectorAll(".get-report2")) {
          el.addEventListener("click", function () {
            window.open(
              `./main-facility-report.html?q=${el.getAttribute("id")}`
            );
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
getLoan();
function getPymentLink(id) {
  var url = urldemo + `/api/loan/payment/link/${id}/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        window.open(response);
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
function getCompeleteDoc(id) {
  window.open(`./main-loan-complete.html?id=${id}`);
}
