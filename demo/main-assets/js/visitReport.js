function getvizitReport() {
  const searchparams = new URLSearchParams(window.location.search);
  var url = urldemo + `/api/vizit/${searchparams.get("q")}/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        document.querySelector(".valTitle").innerHTML = response.title;
        document.querySelector(".valName").innerHTML = response.name;
        document.querySelector(".valDtae").innerHTML = response.created_at;
        document.querySelector(".valNational").innerHTML = response.national_id;
        document.querySelector(".valPhone").innerHTML = response.phone_number;
        document.querySelector(".valMablagh").innerHTML = response.mablagh;
        document.querySelector(".valTracking").innerHTML =
          response.tracking_code;
        document.querySelector(".valStatus").innerHTML = response.status;
        document.querySelector(".valDsc").innerHTML = response.dsc;
      } else if (request.status == 400) {
        const res = JSON.parse(request.response);
        console.log(res);
        const keys = Object.keys(res);
        let msg = "";
        keys.forEach((key, index) => {
          console.log(`${res[key]}`);
          msg = msg + `${res[key]}<br>`;
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
