function getvizitReport() {
  const searchparams = new URLSearchParams(window.location.search);
  var url = urldemo + `/api/loan/${searchparams.get("q")}/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        console.log(response);

        document.querySelector(".valName").innerHTML = response.name;
        document.querySelector(".valDtae").innerHTML = response.created_at;
        document.querySelector(".valType").innerHTML = response.loan_type;
        document.querySelector(".valpayment").innerHTML = response.payment_time;
        document.querySelector(".valMablagh").innerHTML = response.loan_amount;
        document.querySelector(".valTracking").innerHTML =
          response.tracking_code;
        document.querySelector(".valStatus").innerHTML = response.state;
        document.querySelector(".valDsc").innerHTML = response.description;
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
getvizitReport();