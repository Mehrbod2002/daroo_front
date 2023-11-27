function getCards() {
  var url = urldemo + `/api/card/`;
  try {
    const request = new XMLHttpRequest();
    request.onloadend = function () {
      if (request.status == 200 || request.status == 201) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        var html = "";
        response.forEach((key, index) => {
          var item = `<tr>
            <td> ${index + 1} </td>
            <td> ${key.number}</td>
            <td> ${key.card_type} </td>
            <td sorttable_customkey="14020216"> ${key.issueــdate} </td>
            <td sorttable_customkey="14030216">${key.expiration_date} </td>
            <td>  ${key.status} </td>
            <td> ${key.discription}</td>
            <td>
                <a href="#" class="btn btn-danger"> تمدید </a>
                <a href="main-issuing-daroo-card.html" class="btn btn-success"> ارتقا </a>
                <a href="main-daroo-card-info.html?q=${
                  key.id
                }" class="btn btn-warning"> ویرایش </a>
            </td>

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
getCards();
