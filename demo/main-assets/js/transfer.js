function getTransfer() {
  const searchparams = new URLSearchParams(window.location.search);
  var urlpath = searchparams.get("id");
  console.log(urlpath);
  if (urlpath) {
    var url = urldemo + `/api/admin/users/wallet/reports/${urlpath}/`;
    try {
      const request = new XMLHttpRequest();
      request.onloadend = function () {
        if (request.status == 200 || request.status == 201) {
          var response = JSON.parse(this.responseText);
          console.log(response);
          var html = "";
          response.forEach((key, index) => {
            var item = `<tr>
            <td> ${index + 1}</td>
            <td sorttable_customkey="14020215"> ${key.created_at} </td>
            <td> ${key.transaction_type}</td>
            <td> (شماره کیف پول) ${key.origin_object_id} </td>
            <td> (شماره کیف پول) ${key.destination_object_id} </td>
            <td sorttable_customkey="${key.mablagh}"> ${key.mablagh} </td>
            <td>${key.phone_number} </td>
            <td> ${key.tracking_code}</td>
            <td> ${key.status}  </td>
            <td> ${key.dsc}</td>
        </tr>`;
            html = html + item;
          });
          document.querySelector("#reportsTable tbody").innerHTML = html;
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
  } else {
    var url = urldemo + `/api/transfer/`;
    try {
      const request = new XMLHttpRequest();
      request.onloadend = function () {
        if (request.status == 200 || request.status == 201) {
          var response = JSON.parse(this.responseText);
          var html = "";
          response.forEach((key, index) => {
            var item = `<tr>
            <td> ${index + 1}</td>
            <td sorttable_customkey="14020215"> ${key.created_at} </td>
            <td> ${key.transaction_type}</td>
            <td> (شماره کیف پول) ${key.origin_object_id} </td>
            <td> (شماره کیف پول) ${key.destination_object_id} </td>
            <td sorttable_customkey="${key.mablagh}"> ${key.mablagh} </td>
            <td>${key.phone_number} </td>
            <td> ${key.tracking_code}</td>
            <td> ${key.status}  </td>
            <td> ${key.dsc}</td>
        </tr>`;
            html = html + item;
          });
          document.querySelector("#reportsTable tbody").innerHTML = html;
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
}
getTransfer();
