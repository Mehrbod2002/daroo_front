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
          var item = `
          <div class="col-md-6 col-xl-4 my-3">
          <section class=" d-flex flex-column justify-content-center align-items-center bg-light mx-auto p-2 mb-md-0 mb-3 rounded-4 shadow">
          <img src="${key.logo}"  style="max-width: 123px;">
          <h3 class="fw-bold my-2">${key.title} </h3>
          <span class="text-danger fs-5 fw-bold">
         <span style="display: inline-flex;direction: ltr;">   ${
           key.per_year
         } </span> تومان <sub class="text-muted"> / سالیانه </sub>
          </span>
          <ul class="border-top mt-3 text-start" style="list-style: none;padding: 10px;min-width: 220px;">
          ${
            key.per_month 
              ? `<li class="text-dark my-1">
              تا سقف ${key.per_month} میلیون تومان خرید ماهانه
            </li>`
              : ""
          }
            
            ${
              key.online_visit
                ? `<li class="text-dark my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
              </svg> 
              ویزیت آنلاین</li>`
                : `<li class="text-dark my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
              ویزیت آنلاین</li>`
            } 
            ${
              key.laboratory_services
                ? `<li class="text-dark my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
              </svg> 
                خدمات آزمایشگاهی</li>`
                : `<li class="text-dark my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
                خدمات آزمایشگاهی</li>`
            } 
           
            ${
              key.nursing_services
                ? `<li class="text-dark my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
              </svg> 
                خدمات پرستاری</li>`
                : `<li class="text-dark my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
                خدمات پرستاری</li>`
            } 
            ${
              key.imaging_services
                ? `<li class="text-dark my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
              </svg> 
                خدمات تصویربرداری</li>`
                : `<li class="text-dark my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
                خدمات تصویربرداری</li>`
            } 
            ${
              key.online_visit
                ? `<li class="text-dark my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
              </svg> 
                خدمات فیزیوتراپی</li>`
                :`<li class="text-dark my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
                خدمات فیزیوتراپی</li>`
            } 
            ${
              key.pharmaceutical_services
                ? `<li class="text-dark my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
              </svg> 
                خدمات دارویی</li>`
                : `<li class="text-dark my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg> 
                خدمات دارویی</li>`
            } 
            ${
              key.tourismـservices
                ? `<li class="text-dark my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
              </svg> 
                خدمات گردشگری </li>`
                : `<li class="text-dark my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
                خدمات گردشگری </li>`
            } 
            ${
              key.loanـwithoutـcirculation
                ? `<li class="text-dark my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
              </svg> 
                وام بدون گردش</li>`
                : `<li class="text-dark my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
                وام بدون گردش</li>`
            } 
            ${
              key.gold_and_silver
                ? `<li class="text-dark my-1"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
              </svg> 
                طلا و نقره</li>`
                : `<li class="text-dark my-1"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
                طلا و نقره</li>`
            } 
            ${
              key.essential_products
                ? `<li class="text-dark my-1"> 	
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
              </svg> 
                کالاهای اساسی</li>`
                : `<li class="text-dark my-1"> 	
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
                کالاهای اساسی</li>`
            } 
            ${
              key.home_appliances
                ? `<li class="text-dark my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check2" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
              </svg> 
                لوازم خانگی </li>`
                :`<li class="text-dark my-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
                لوازم خانگی </li>`
            } 
          </ul>
         
${
  key.per_year == "۰"
    ? ` <button class="btn btn-primary  align-self-end me-3 mb-2">
      تماس بگیرید
    </button>`
    : `<button
      id="${key.id}"
      class="btn btn-primary buyCard align-self-end me-3 mb-2"
    >
      خرید
    </button>`
}
         
        </section>
          </div>`;
          html = html + item;
        });
        document.querySelector("#itemsbox").innerHTML = html;
        // +++
        for (const el of document.querySelectorAll(".buyCard")) {
          el.addEventListener("click", function () {
            var url = urldemo + `/api/ipg/issue/card/`;
            try {
              const formData = new FormData();
              formData.append("card_id", el.getAttribute("id"));
              const request = new XMLHttpRequest();
              request.onloadend = function () {
                if (request.status == 200 || request.status == 201) {
                  var data = JSON.parse(this.responseText);

                  window.location.replace(data);
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
                    } else if (key == "card_id") {
                      keyf = "card id";
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

    request.send();
  } catch (error) {
    console.error(error);
  }
}
getLoan();
