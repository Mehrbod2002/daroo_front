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
                ? `<button  class="get-data-link btn  btn-warning p-2" dataid="${key.id}">   تکمیل اطلاعات </button>`
                : ""
            }
            ${
              key.state == "در جریان"
                ? `<button  class="get-installment-modal btn btn-info p-2" modalid="${key.id}" > پرداخت قسط    </button>`
                : ""
            }
         
            ${
              key.state == "در حال بررسی مدارک"
                ? `<button  class="get-data-link btn btn-secondary p-2   " disabled >   پرداخت قسط </button>`
                : ""
            }
            ${
              key.state == "تایید اولیه"
                ? ` <button  class="get-payment-modal  btn btn-success p-2" modalpayment="${key.id}">   پرداخت سپرده تضمینی   </button>`
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

      
        for (const el of document.querySelectorAll(".get-report2")) {
          el.addEventListener("click", function () {
            // window.open(
            //   `./main-facility-report.html?q=${el.getAttribute("id")}`
            // );
            window.location.assign( `./main-facility-report.html?q=${el.getAttribute("id")}`)
          });
        }
       
       
        for (const el of document.querySelectorAll(".get-installment-modal")) {
          el.addEventListener("click", function () {
            var html = ``
            html = `<div class=" ">
            <div class="mb-4">
            ابتدا نوع پرداخت قسط خود را انتخاب نمایید
            </div>
            <div class="bg-light rounded-1 my-3 py-3">
            <div class="form-check text-start mb-4 d-flex justify-content-center  ">
  <input class="form-check-input me-2" type="radio" name="exampleRadios" id="exampleRadios1" value="bank" checked>
  <label class="form-check-label" for="exampleRadios1">
   پرداخت از طریق درگاه بانکی
  </label>
</div>
<div class="form-check text-start d-flex justify-content-center">
  <input class="form-check-input me-2" type="radio" name="exampleRadios" id="exampleRadios2" value="wallet">
  <label class="form-check-label" for="exampleRadios2">
    پرداخت از طریق کیف پول
  </label>
</div>
            </div>
            

<div
class="buttons d-flex flex-sm-row flex-column justify-content-between align-items-center"
>
<button class="btn btn-danger fs-5 mb-sm-0 mb-2 closeModal">بستن</button>
<button class="btn  btn-success fs-5 mb-sm-0 mb-2" id="paymentbuttton">
پرداخت
</button>


</div>
            </div>`
            document.querySelector("#modalResponseTransferBox").innerHTML = html;
            $("#modalResponseTransfer").fadeIn();
            // window.open(
            //   `./main-facility-report.html?q=${el.getAttribute("id")}`
            // );
            $(".closeModal").click(function () {
              $("#modalResponseTransfer").fadeOut();
            });
            $("#paymentbuttton").click(function () {
              $("#modalResponseTransfer").fadeOut();
              if($('input[type="radio"][name="exampleRadios"]:checked').val() =="bank"){
                getInstallmentDoc(el.getAttribute("modalid"))
              }
              if($('input[type="radio"][name="exampleRadios"]:checked').val() =="wallet"){
                getInstallmentWalletDoc(el.getAttribute("modalid"))
              }
            });
          });

        }
        for (const el of document.querySelectorAll(".get-payment-modal")) {
          el.addEventListener("click", function () {
            var html = ``
            html = `<div class=" ">
            <div class="mb-4">
            ابتدا نوع پرداخت سپرده تضمینی خود را انتخاب نمایید
            </div>
            <div class="bg-light rounded-1 my-3 py-3">
            <div class="form-check text-start mb-4 d-flex justify-content-center  ">
  <input class="form-check-input me-2" type="radio" name="exampleRadios" id="exampleRadios1" value="bank" checked>
  <label class="form-check-label" for="exampleRadios1">
   پرداخت از طریق درگاه بانکی
  </label>
</div>
<div class="form-check text-start d-flex justify-content-center">
  <input class="form-check-input me-2" type="radio" name="exampleRadios" id="exampleRadios2" value="wallet">
  <label class="form-check-label" for="exampleRadios2">
    پرداخت از طریق کیف پول
  </label>
</div>
            </div>
            

<div
class="buttons d-flex flex-sm-row flex-column justify-content-between align-items-center"
>
<button class="btn btn-danger fs-5 mb-sm-0 mb-2 closeModal">بستن</button>
<button class="btn  btn-success fs-5 mb-sm-0 mb-2" id="paymentbuttton">
پرداخت
</button>


</div>
            </div>`
            document.querySelector("#modalResponseTransferBox").innerHTML = html;
            $("#modalResponseTransfer").fadeIn();
            // window.open(
            //   `./main-facility-report.html?q=${el.getAttribute("id")}`
            // );
            $(".closeModal").click(function () {
              $("#modalResponseTransfer").fadeOut();
            });
            $("#paymentbuttton").click(function () {
              $("#modalResponseTransfer").fadeOut();
              if($('input[type="radio"][name="exampleRadios"]:checked').val() =="bank"){
                getPymentLink(el.getAttribute("modalpayment"))
              }
              if($('input[type="radio"][name="exampleRadios"]:checked').val() =="wallet"){
                getPymentWalletLink(el.getAttribute("modalpayment"))
              }
            });
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

function getPymentWalletLink(id) {
  var url = urldemo + `/api/loan/payment/by/wallet/${id}/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML = `<span class='text-sm text-success'> ${response} </span>`;
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
function getInstallmentWalletDoc(id) {
  var url = urldemo + `/api/loan/payment/installment/${id}/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        var html = ``;

        html = ` <div
              class="mb-3 item w-100 d-flex justify-content-between align-items-center position-relative bg-white shadow rounded-3 py-2 px-3 mb-2"
            >
              <span class="label">شماره قسط </span>
              <span class="value ltr" style="direction: ltr;"> ${response.number} </span>
            </div>
            <div
            class="mb-3 item w-100 d-flex justify-content-between align-items-center position-relative bg-white shadow rounded-3 py-2 px-3 mb-2"
          >
            <span class="label">تاریخ</span>
            <span class="value ltr" style="direction: ltr;"> ${response.date} </span>
          </div>
          <div
          class="mb-3 item w-100 d-flex justify-content-between align-items-center position-relative bg-white shadow rounded-3 py-2 px-3 mb-2"
        >
          <span class="label">مقدار</span>
          <span class="value ltr" style="direction: ltr;"> ${response.amount} </span>
        </div>
        
      
      <div
class="buttons d-flex flex-sm-row flex-column justify-content-between align-items-center"
>
<button class="btn btn-danger fs-5 mb-sm-0 mb-2 closeModal">بستن</button>
<button class="btn btn-success fs-5 mb-sm-0 mb-2 withdrawBtn">برداشت</button>
</div>
`;

        document.querySelector("#modalResponseTransferBox").innerHTML = html;
        $("#modalResponseTransfer").fadeIn();
        $(".closeModal").click(function () {
          $("#modalResponseTransfer").fadeOut();
        });
        $(".withdrawBtn").click(function () {
          $("#modalResponseTransfer").fadeOut();
          HandlewithdrawBtn(id)
        });
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
function HandlewithdrawBtn(id){
  var url = urldemo + `/api/loan/payment/installment/by/wallet/${id}/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        $(".messagewrapper").fadeIn();
        messageBox.innerHTML = `<span class='text-sm text-success'> ${response} </span>`;
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
function getInstallmentDoc(id) {
  var url = urldemo + `/api/loan/payment/installment/${id}/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        var html = ``;

        html = ` <div
              class="mb-3 item w-100 d-flex justify-content-between align-items-center position-relative bg-white shadow rounded-3 py-2 px-3 mb-2"
            >
              <span class="label">شماره قسط </span>
              <span class="value ltr" style="direction: ltr;"> ${response.number} </span>
            </div>
            <div
            class="mb-3 item w-100 d-flex justify-content-between align-items-center position-relative bg-white shadow rounded-3 py-2 px-3 mb-2"
          >
            <span class="label">تاریخ</span>
            <span class="value ltr" style="direction: ltr;"> ${response.date} </span>
          </div>
          <div
          class="mb-3 item w-100 d-flex justify-content-between align-items-center position-relative bg-white shadow rounded-3 py-2 px-3 mb-2"
        >
          <span class="label">مقدار</span>
          <span class="value ltr" style="direction: ltr;"> ${response.amount} </span>
        </div>
       
      
      <div
class="buttons d-flex flex-sm-row flex-column justify-content-between align-items-center"
>
<span class="value ltr" style="direction: ltr;"> <a  target="_blank" class="get-payment-link btn btn-success p-2" href=${response.link} >     پرداخت    </a>  </span>
<button class="btn btn-danger fs-5 mb-sm-0 mb-2 closeModal">بستن</button>



</div>
`;

        document.querySelector("#modalResponseTransferBox").innerHTML = html;
        $("#modalResponseTransfer").fadeIn();
        $(".closeModal").click(function () {
          $("#modalResponseTransfer").fadeOut();
        });
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
function getPymentLink(id) {
  var url = urldemo + `/api/loan/payment/link/${id}/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        // window.open(response);
        window.location.assign(response)
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
  // window.open(`./main-loan-complete.html?id=${id}`);
  window.location.assign(`./main-loan-complete.html?id=${id}`)
}
