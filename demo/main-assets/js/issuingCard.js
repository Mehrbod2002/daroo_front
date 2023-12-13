// *************** loan
function getLoan() {
  var url = urldemo + `/api/cards/types/`;
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
          <h3 class="fw-bold my-2">${key.title} </h3>
          <span class="text-danger fs-5 fw-bold">
            ${key.per_year} هزار تومان <sub class="text-muted"> / سالیانه </sub>
          </span>
          <ul class="border-top mt-3 text-start">
            <li class="text-dark my-1">تا سقف   ${
              key.per_month
            } میلیون تومان خرید ماهانه</li>
            ${
              key.online_visit
                ? `<li class="text-dark my-1"> ویزیت آنلاین</li>`
                : " "
            } 
            ${
              key.laboratory_services
                ? `<li class="text-dark my-1">خدمات آزمایشگاهی</li>`
                : " "
            } 
           
            ${
              key.nursing_services
                ? `<li class="text-dark my-1">خدمات پرستاری</li>`
                : " "
            } 
            ${
              key.imaging_services
                ? `<li class="text-dark my-1">خدمات تصویربرداری</li>`
                : " "
            } 
            ${
              key.online_visit
                ? `<li class="text-dark my-1">خدمات فیزیوتراپی</li>`
                : " "
            } 
            ${
              key.pharmaceutical_services
                ? `<li class="text-dark my-1">خدمات دارویی</li>`
                : " "
            } 
    
          </ul>
          <a href="main-daroo-card-info.html" class="btn btn-primary align-self-end me-3 mb-2">
            خرید
          </a>
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
