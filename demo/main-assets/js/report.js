function getTransfer() {
  const searchparams = new URLSearchParams(window.location.search);
  var urlpath = searchparams.get("id");
  var urlpath2 = searchparams.get("centerid");

  if (urlpath2) {
    var url = urldemo + `/api/admin/centers/transaction/reports/${urlpath2}/`;
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
              <td>  ${
                key.origin_object_id
                  ? key.origin_object_id + "(شماره کیف پول)"
                  : "-"
              } </td>
              <td>  ${
                key.destination_object_id
                  ? key.destination_object_id + "(شماره کیف پول)"
                  : "-"
              } </td>
              <td sorttable_customkey="${key.mablagh}"> ${key.mablagh} </td>
              <td>${key.phone_number} </td>
              <td> ${key.tracking_code}</td>
              <td> ${key.status}  </td>
              <td> ${key.dsc}</td>
          </tr>`;
            html = html + item;
          });
          document.querySelector("#reportsTable tbody").innerHTML = html;
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
  } else if (urlpath) {
    var url = urldemo + `/api/admin/users/transaction/reports/${urlpath}/`;
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
              <td>  ${
                key.origin_object_id
                  ? key.origin_object_id + "(شماره کیف پول)"
                  : "-"
              } </td>
              <td>  ${
                key.destination_object_id
                  ? key.destination_object_id + "(شماره کیف پول)"
                  : "-"
              } </td>
              <td sorttable_customkey="${key.mablagh}"> ${key.mablagh} </td>
              <td>${key.phone_number} </td>
              <td> ${key.tracking_code}</td>
              <td> ${key.status}  </td>
              <td> ${key.dsc}</td>
          </tr>`;
            html = html + item;
          });
          document.querySelector("#reportsTable tbody").innerHTML = html;
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
  } else {
    var url = urldemo + `/api/reports/`;
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
              <td> ${
                key.origin_object_id
                  ? key.origin_object_id + "(شماره کیف پول)"
                  : "-"
              } </td>
              <td>  ${
                key.destination_object_id
                  ? key.destination_object_id + "(شماره کیف پول)"
                  : "-"
              } </td>
              <td sorttable_customkey="${key.mablagh}"> ${key.mablagh} </td>
              <td>${key.phone_number} </td>
              <td> ${key.tracking_code}</td>
              <td> ${key.status}  </td>
              <td> ${key.dsc}</td>
          </tr>`;
            html = html + item;
          });
          document.querySelector("#reportsTable tbody").innerHTML = html;
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
}
getTransfer();
