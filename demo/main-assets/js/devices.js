function getDevicesRules() {
    var url = urldemo + `/api/rules/`;
    try {
        const request = new XMLHttpRequest();
        request.onloadend = function () {
            if (request.status == 200 || request.status == 201) {
                let datas = JSON.stringify(request.response);
                localStorage.setItem("rules", datas);
                let resp = JSON.parse(request.response);
                document.getElementById("rulesBox").innerText = resp[0].rules;
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

function getDevicesTypes() {
    var url = urldemo + `/api/devices_types/`;
    try {
        const request = new XMLHttpRequest();
        request.onloadend = function () {
            if (request.status == 200 || request.status == 201) {
                let datas = JSON.stringify(request.response);
                localStorage.setItem("devices", datas);
                const dropdown = document.getElementById("dropdown");
                let resp = JSON.parse(request.response);
                resp.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item.id;
                    option.text = item.device_name;
                    dropdown.appendChild(option);
                });
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

function getDevices() {
    var url = urldemo + `/api/devices/`;
    try {
        const request = new XMLHttpRequest();
        request.onloadend = function () {
            if (request.status == 200 || request.status == 201) {
                var response = JSON.parse(this.responseText);
                var html = "";
                response.forEach((key, index) => {
                    const is_document = key.status == "آپلود مدارک" ? "" : "none";
                    const is_active = key.status == "صادر شده فعال" ? "" : "none";
                    const is_payment = key.status == "آماده پرداخت" ? "" : "none";
                    var item = `<tr>
                        <td> ${index + 1} </td>
                        <td> ${key.serial_number ?? ""}</td>
                        <td> ${key.terminal_number ?? ""}</td>
                        <td> ${key.center_number ?? ""}</td>
                        <td> ${key.device_type ?? ""}</td>
                        <td> ${key.status ?? ""}</td>
                        <td sorttable_customkey="14020216"> ${key.activation_date ?? ""} </td>
                        <td sorttable_customkey="14030216">${key.expiration_date ?? ""} </td>
                        <td>
                            <button class="btn btn-warning" onclick="wallet_payment_direct('${key.device_id}')" style="display: ${is_payment}"> پرداخت مستقیم </button>
                            <button class="btn btn-danger" onclick="wallet_payment('${key.device_id}')" style="display: ${is_payment}"> پرداخت از کیف پول </button>
                            <button class="btn btn-danger" onclick="generate_deal('${key.device_id}')" style="display: ${is_active}"> قرارداد </button>
                            <button onclick="open_document('${key.device_id}');" class="btn btn-warning" style="display: ${is_document}" onclick="navigateTo('#')"> آپلود مدارک </button>
                        </td>
                        </tr>`;
                    html = html + item;
                });
                document.querySelector("#reportsTable tbody").innerHTML = html;
            } else if (request.status == 400 || request.status == 403) {
                const res = JSON.parse(request.response);
                const keys = Object.keys(res);
                let msg = "";
                keys.forEach((key, index) => {
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

getDevicesTypes();
getDevicesRules()
getDevices();

document.getElementById('acceptRules').addEventListener('change', function () {
    document.getElementById('confirmButton').disabled = !this.checked;
});

function createDevice() {
    const deviceType = document.getElementById("dropdown").value;
    const user_signature = document.getElementById("userInput").value;
    const otp_code = document.getElementById("otp_code").value;
    try {
        const request = new XMLHttpRequest();
        request.onloadend = function () {
            $(".loader").fadeOut();
            if (request.status == 200 || request.status == 201) {
                location.reload();
            } else {
                const res = JSON.parse(request.response);
                const keys = Object.keys(res);
                let msg = "";

                keys.forEach((key) => {
                    msg += `${res[key]}<br>`;
                });
                if (msg) {
                    const errors = document.getElementById("errors");
                    errors.innerHTML = msg;
                    errors.className = errors.className.replace(
                        "text-success",
                        "text-danger"
                    );
                }
            }
        }

        const formData = new FormData();
        formData.append("user_signature", user_signature);
        formData.append("device_type", deviceType);
        formData.append("otp_code", otp_code);

        const url = urldemo + "/api/create/devices/";

        request.open("POST", url, true);

        request.setRequestHeader(
            "Authorization",
            `Token ${localStorage.getItem("token")}`
        );

        request.onerror = function () {
            alert("خطای شبکه! لطفاً بررسی کنید.");
            console.error("Network Error");
        };

        request.onloadstart = function () {
            $(".loader").fadeIn();
        };

        request.send(formData);
    } catch (err) {
        console.error(err)
    }
}

function toggleConfirmButton() {
    const acceptRules = document.getElementById("acceptRules").checked;
    const confirmButton = document.getElementById("confirmButton");
    confirmButton.disabled = !acceptRules;
}

function sendotp_center() {
    var url = urldemo + `/api/otp_center/`;
    try {
        const formData = new FormData();
        const request = new XMLHttpRequest();
        request.onloadend = function () {
            if (request.status == 200 || request.status == 201) {
                const errors = document.getElementById("errors");
                errors.innerHTML = "";
            } else if (request.status == 400 || request.status == 403) {
                const res = JSON.parse(request.response);
                const keys = Object.keys(res);
                let msg = "";

                keys.forEach((key) => {
                    var keyf = key === "error" ? "ارور" : key;
                    msg += `${keyf} : ${res[key]}<br>`;
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
                const errors = document.getElementById("errors");
                errors.innerHTML = msg;
                errors.className = errors.className.replace(
                    "text-success",
                    "text-danger"
                );
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
}

function send_document() {
    try {
        const formData = new FormData();

        const businessLicense = document.getElementById("businessLicense").files[0];
        const nationalCard = document.getElementById("nationalCard").files[0];
        const birthCertificate = document.getElementById("birthCertificate").files[0];

        if (!businessLicense || !nationalCard || !birthCertificate) {
            const errors = document.getElementById("errors_document");
            errors.innerHTML = "لطفاً تمام مدارک را آپلود کنید.";
            errors.className = errors.className.replace("text-success", "text-danger");
            return;
        }

        formData.append("device_id", localStorage.getItem("device_id"));
        formData.append("business_license", businessLicense);
        formData.append("national_card", nationalCard);
        formData.append("birth_certificate", birthCertificate);

        const request = new XMLHttpRequest();

        request.onloadend = function () {
            $(".loader").fadeOut();

            if (request.status === 200 || request.status === 201) {
                const errors = document.getElementById("errors_document");
                errors.innerHTML = "مدارک با موفقیت آپلود شدند.";
                errors.className = errors.className.replace("text-danger", "text-success");
                location.reload();
            } else if (request.status === 400 || request.status === 403) {
                const res = JSON.parse(request.response);
                const keys = Object.keys(res);
                let msg = "";

                keys.forEach((key) => {
                    const keyf = key === "error" ? "ارور" : key;
                    msg += `${keyf} : ${res[key]}<br>`;
                });

                if (msg) {
                    const errors = document.getElementById("errors_document");
                    errors.innerHTML = msg;
                    errors.className = errors.className.replace("text-success", "text-danger");
                }
            } else {
                const errors = document.getElementById("errors_document");
                errors.innerHTML = "خطایی رخ داده است. لطفاً دوباره تلاش کنید.";
                errors.className = errors.className.replace("text-success", "text-danger");
            }

            setTimeout(clearMessageBox, 3000);
        };

        request.onloadstart = function () {
            $(".loader").fadeIn();
        };

        let device_id = localStorage.getItem("device_id");
        request.open('PATCH', `${urldemo}/api/devices/${device_id}/update_image/`);
        request.setRequestHeader(
            "Authorization",
            `Token ${localStorage.getItem("token")}`
        );
        request.send(formData);
    } catch (error) {
        console.error(error);
    }
}

function open_document(id) {
    localStorage.setItem("device_id", id);
    $("#upload_document").fadeIn();
}

function wallet_payment(id) {
    try {
        const request = new XMLHttpRequest();
        request.onloadend = function () {
            if (request.status == 200 || request.status == 201) {
                location.reload();
            } else if (request.status == 400 || request.status == 403) {
                const res = JSON.parse(request.response);
                const keys = Object.keys(res);
                let msg = "";
                keys.forEach((key, index) => {
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

        const formData = new FormData();
        formData.append("device_id", id);
        request.onloadstart = function () {
            $(".loader").fadeIn();
        };
        request.open('PATCH', `${urldemo}/api/devices_payment/${id}/process_payment/`);
        request.setRequestHeader(
            "Authorization",
            `Token ${localStorage.getItem("token")}`
        );
        request.send(formData);
    } catch (error) {
        console.error(error);
    }
}

function wallet_payment_direct(id) {
    try {
        const request = new XMLHttpRequest();
        request.onloadend = function () {
            if (request.status == 200 || request.status == 201) {
                const data = JSON.parse(request.response);
                if (data) {
                    window.location = data;
                }
            } else if (request.status == 400 || request.status == 403) {
                const res = JSON.parse(request.response);
                const keys = Object.keys(res);
                let msg = "";
                keys.forEach((key, index) => {
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

        const formData = new FormData();
        formData.append("device_id", id);
        request.onloadstart = function () {
            $(".loader").fadeIn();
        };
        request.open('PATCH', `${urldemo}/api/devices_payment/${id}/process_payment_direct/`);
        request.setRequestHeader(
            "Authorization",
            `Token ${localStorage.getItem("token")}`
        );
        request.send(formData);
    } catch (error) {
        console.error(error);
    }
}

function generate_deal(id) {
    try {
        const request = new XMLHttpRequest();
        request.onloadend = function () {
            if (request.status == 200 || request.status == 201) {
                window.open(`https://testbackend.daroocard.com/${request.response}`, "_blank");
            } else if (request.status == 400 || request.status == 403) {
                const res = JSON.parse(request.response);
                const keys = Object.keys(res);
                let msg = "";
                keys.forEach((key, index) => {
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

        const formData = new FormData();
        formData.append("device_id", id);
        request.onloadstart = function () {
            $(".loader").fadeIn();
        };
        request.open('PATCH', `${urldemo}/api/contracts/${id}/contract/`);
        request.setRequestHeader(
            "Authorization",
            `Token ${localStorage.getItem("token")}`
        );
        request.send(formData);
    } catch (error) {
        console.error(error);
    }
}
