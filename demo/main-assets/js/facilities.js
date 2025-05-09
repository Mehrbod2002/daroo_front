// *************** loan
function getLoan() {
  var url = urldemo + `/api/loansdetails/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        var html = "";
        response.forEach((key, index) => {
          var item = `<section class="plan d-flex flex-column justify-content-center align-items-center bg-light mx-auto p-2 mb-md-0 mb-3 rounded-4 shadow">
          
          <img src="${key.logo}">
          <h3 class="fw-bold my-2">${key.loan_type}</h3>
          <ul class="border-top mt-3 text-start">
            <li class="text-dark my-1">  ${key.limitation}</li>
            <li class="text-dark my-1">${key.Interest}  </li>
            <li class="text-dark my-1"> ${key.installment}   </li>
            <li class="text-dark my-1"> ${key.support}</li>
          </ul>
        </section>`;
          html = html + item;
        });
        document.querySelector("#itemsbox").innerHTML = html;
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

    request.send();
  } catch (error) {
    console.error(error);
  }
}
getLoan();

function getText() {
  var url = urldemo + `/api/loans/text/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);

        document.querySelector("#facilities_desc").innerHTML =
          response[0].content;
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

    request.send();
  } catch (error) {
    console.error(error);
  }
}
getText();
