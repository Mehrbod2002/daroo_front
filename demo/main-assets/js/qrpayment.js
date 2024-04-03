let urldemo = "https://api.daroocard.com";
let messageBox = document.querySelector(".messageBox p");
let fetchHeader = {
  "Content-Type": "application/json; charset=utf-8",
};
$(".messagewrapper").hide();
$(".messageBtn").click(function () {
  $(".messagewrapper").fadeOut();
});
function clearMessageBox() {
  $(" .loader ").fadeOut();
}

function sendqrpayment(){
   
       
        var url = urldemo + `/api/qr/payment/send/data/`;
        try {
          const formData = new FormData();
     
          formData.append("center_name",  document.getElementById("center_name").innerText);
          formData.append("service_id",  document.getElementById("service_list").value);
          formData.append("mablagh",  document.getElementById("center_mablag").innerText);
          formData.append("center_phone_number", document.getElementById("center_phone").innerText);
          formData.append("user_phone_number", document.getElementById("user_phone_number").value);
          formData.append("user_national_id", document.getElementById("user_national_id").value);
          formData.append("user_name",document.getElementById("user_name").value);

          const request = new XMLHttpRequest();
          request.onloadend = function () {
            if (request.status == 200 || request.status == 201) {
            
                var data = JSON.parse(this.responseText);
                    console.log(data)
                      window.location.replace(data);
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
                } else if (key == "document") {
                  keyf = "مدرک";
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
          request.open("POST", url, true);
          request.setRequestHeader("Content-Type", "multipart/form-data");
          // request.setRequestHeader(
          //   "Authorization",
          //   `Token ${localStorage.getItem("token")}`
          // );
      
          request.send(formData);
        } catch (error) {
          console.error(error);
        }
      
}
$('#service_list').on('change', function(event) {
    
    document.querySelector("#center_mablag").innerHTML = $(this).children(":selected")[0].attributes["mablagh"].nodeValue;
    document.querySelector("#center_phone").innerHTML = $(this).children(":selected")[0].attributes["phone_number"].nodeValue;
  });
function getvizitReport() {
    const searchparams = new URLSearchParams(window.location.search);
    console.log(searchparams)
    var url = urldemo + `/api/qr/payment/center/${searchparams.get("q")}/`;
    try {
      const request = new XMLHttpRequest();
      request.onloadend = function () {
        if (request.status == 200 || request.status == 201) {
          var response = JSON.parse(this.responseText);
          console.log(response);
  
          document.querySelector("#center_name").innerHTML = response.center;
          
          var html = "";
          response.services.forEach((key, index) => {
            var item = `<option value="${key.id}" mablagh="${key.mablagh}" phone_number="${key.phone_number}" service="${key.service}">${key.service}</option>`;
            html = html + item;
          });
          document.querySelector("#service_list").innerHTML = html;
          document.querySelector("#center_mablag").innerHTML = $("#service_list").children(":selected")[0].attributes["mablagh"].nodeValue;
document.querySelector("#center_phone").innerHTML = $("#service_list").children(":selected")[0].attributes["phone_number"].nodeValue;
        
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
      // request.setRequestHeader(
      //   "Authorization",
      //   `Token ${localStorage.getItem("token")}`
      // );
      request.send();
    } catch (error) {
      console.error(error);
    }
  }
  getvizitReport();
  