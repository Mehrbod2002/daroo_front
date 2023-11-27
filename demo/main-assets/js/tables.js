// //////////////////////////////////////////////////
// Table Sections Controls

// Search In Tables
try {
    for (const el of document.getElementsByClassName('searchable')){
        el.addEventListener('input', function (){search(this)})
    }
} catch {}
function search(element) {
    let filter, rows, tdValue;
    filter = element.value.toLowerCase();
    if (element.getAttribute('data-is-second-box') === 'true'){
        rows = document.querySelectorAll('.table-section:nth-of-type(2) table tbody tr');
        console.log(rows);
    } else {
        rows = document.querySelectorAll('.table-section:nth-of-type(1) table tbody tr');
    }

    for (let i=0; i<rows.length; i++) {
        let isResult = false;
        for (const td of rows[i].getElementsByTagName('td')){
            tdValue = td.textContent || td.innerText;
            if (tdValue.toLowerCase().indexOf(filter) !== -1) {
                rows[i].style.display = "";
                isResult = true;
                break
            }
        }
        if (isResult === false){
            rows[i].style.display = 'none';
        }
    }
}

// Set Click Event Function For Get Report Buttons (in reception requests page & facilities requests page)
try {
    for (const el of document.querySelectorAll('.get-report')){
        el.addEventListener('click', function (){
            window.open('./main-reception-report.html');
        })
    }
    for (const el of document.querySelectorAll('.get-report2')){
        el.addEventListener('click', function (){
            window.open('./main-facility-report.html');
        })
    }
} catch {}

// Set Click Event Function For Pay Facility & Charge Wallet Buttons (in facilities page)
try {
    for (const el of document.getElementsByClassName('pay-facility')){
        el.addEventListener('click', function (){
            // If Wallet Has Enough Money:
            // this.parentElement.innerHTML = 'پرداخت شده';

            // If Wallet Doesn't Have Enough Money:
            const container = document.createElement('div');
            container.className = 'alert alert-danger alert-dismissible fade show position-absolute';
            container.style.width = '350px';
            container.style.right = '20px';
            container.style.bottom = '10px';
            container.setAttribute('role', 'alert');

            const span = document.createElement('span');
            span.innerHTML = 'موجودی کیف پول کافی نمی باشد. لطفا کیف پول خود را شارژ نموده و سپس دوباره امتحان کنید.'

            const btn = document.createElement('button');
            btn.className = 'btn-close';
            btn.setAttribute('data-bs-dismiss', 'alert');

            container.appendChild(span);
            container.appendChild(btn);
            try {
                document.body.querySelector('.alert').remove();
            } catch {}
            document.body.firstElementChild.appendChild(container);
            setTimeout(function (){
                try {
                    document.body.querySelector('.alert').remove()
                } catch {}
            }, 5000);
        })
    }
} catch {}

// Set Click Event Function For Checking Rows In Admin Tables
try {
    for (const el of document.querySelectorAll('.table-section:nth-of-type(2) tbody tr td:first-of-type input')){
        el.addEventListener('input', function (){
            if (document.querySelector('.table-section:nth-of-type(2) tbody tr td:first-of-type input:checked') !== null){
                for (const el2 of document.querySelectorAll('.actions *')){
                    el2.removeAttribute('disabled');
                }
            } else {
                for (const el2 of document.querySelectorAll('.actions button')){
                    el2.setAttributeNode(document.createAttribute('disabled'));
                }
            }
        })
    }
} catch {}

// Set Click Event Function For Block Wallet Button In Admin-Users & Admin-Centers
try {
    function setBlockWalletEvent(){
        for (const el of document.getElementsByClassName('block-wallet')){
            el.addEventListener('click', function (){
                const walletCash = this.parentElement.firstElementChild.innerHTML;
                this.parentElement.innerHTML = "<span> علت مسدودسازی کیف پول: </span>" +
                    "<textarea class='form-control mx-1 border border-dark' style='min-height: 40px;'></textarea>" +
                    "<button class='btn btn-secondary cancel-block-wallet mx-1'> لغو عملیات </button>" +
                    "<button class='btn btn-danger block-wallet-final mx-1'> تایید </button>";
                makeBlockWalletForm(walletCash);
            })
        }
    }
    setBlockWalletEvent();

    function makeBlockWalletForm(walletCash){
        for (const el of document.getElementsByClassName('cancel-block-wallet')){
            el.addEventListener('click', function (){
                this.parentElement.innerHTML = "<span>" + walletCash + "</span>" +
                    "<button class='btn btn-danger block-wallet mx-1'> مسدودسازی کیف پول </button>"
                setBlockWalletEvent();
            })
        }
        for (const el of document.getElementsByClassName('block-wallet-final')){
            el.addEventListener('click', function (){
                this.parentElement.innerHTML = "<span>" + walletCash + " | مسدود شده (به علت:" + this.parentElement.querySelector('textarea').value + ") </span>" +
                    "<button class='btn btn-success unblock-wallet mx-1'> رفع مسدودسازی کیف پول </button>";
                setUnblockWalletEvent();
            })
        }
    }
} catch {}

// Set Click Event Function For Unblock Wallet Button In Admin-Users & Admin-Centers
try {
    function setUnblockWalletEvent(){
        for (const el of document.getElementsByClassName('unblock-wallet')){
            el.addEventListener('click', function (){
                this.parentElement.innerHTML = "<span>" + this.parentElement.firstElementChild.innerHTML.split('|').at(0) + "</span>" +
                    "<button class='btn btn-danger block-wallet mx-1'> مسدودسازی کیف پول </button>";
                setBlockWalletEvent();
            })
        }
    }
    setUnblockWalletEvent();
} catch {}

// Set Click Event Function For Edit Wallet Button In Admin-Users & Admin-Centers
try {
    function setEditWalletEvent(){
        for (const el of document.getElementsByClassName('edit-wallet')){
            el.addEventListener('click', function (){
                const mainWalletCash = this.parentElement.firstElementChild.innerHTML;
                const walletCash = mainWalletCash.slice(0, mainWalletCash.indexOf('ریال')).replaceAll(',', '').trim();
                this.parentElement.innerHTML = "<span> تعیین موجودی: </span>" +
                    "<input type='number' class='form-control mx-1 border border-dark' value='" + walletCash + "'>" +
                    "<button class='btn btn-secondary cancel-edit-wallet mx-1'> لغو عملیات </button>" +
                    "<button class='btn btn-danger edit-wallet-final mx-1'> تایید </button>";
                makeEditWalletForm(mainWalletCash);
            })
        }
    }
    setEditWalletEvent();

    function makeEditWalletForm(walletCash){
        for (const el of document.getElementsByClassName('cancel-edit-wallet')){
            el.addEventListener('click', function (){
                this.parentElement.innerHTML = "<span>" + walletCash + "</span>" +
                    "<button class='btn btn-secondary edit-wallet mx-1'> ویرایش موجودی کیف پول </button>" +
                    "<button class='btn btn-danger block-wallet mx-1'> مسدودسازی کیف پول </button>"
                setEditWalletEvent();
                setBlockWalletEvent();
            })
        }
        for (const el of document.getElementsByClassName('edit-wallet-final')){
            el.addEventListener('click', function (){
                this.parentElement.innerHTML = "<span>" + this.parentElement.querySelector('input').value + " ریال </span>" +
                    "<button class='btn btn-secondary edit-wallet mx-1'> ویرایش موجودی کیف پول </button>" +
                    "<button class='btn btn-danger block-wallet mx-1'> مسدودسازی کیف پول </button>"
                setEditWalletEvent();
                setBlockWalletEvent();
            })
        }
    }
} catch {}

// Set Click Event Function For User Acceptation In Admin-Users & Admin-Centers
try {
    function setAcceptEjectUserEvents(){
        for (const el of document.getElementsByClassName('accept-user')){
            el.addEventListener('click', function (){
                this.parentElement.innerHTML = "<span> تایید شده </span>" +
                    "<button class='btn btn-danger mx-1 block-user'> مسدودسازی کاربر </button>";
                setBlockUserEvent();
            })
        }
        for (const el of document.getElementsByClassName('eject-user')){
            el.addEventListener('click', function (){
                this.parentElement.innerHTML = "<span> علت عدم تایید کاربر: </span>" +
                    "<textarea class='form-control mx-1 border border-dark' style='min-height: 40px;'></textarea>" +
                    "<button class='btn btn-secondary cancel-eject-user mx-1'> لغو عملیات </button>" +
                    "<button class='btn btn-danger eject-user-final mx-1'> تایید </button>";
                makeEjectUserForm();
            })
        }
    }
    setAcceptEjectUserEvents();

    function makeEjectUserForm(){
        for (const el of document.getElementsByClassName('cancel-eject-user')){
            el.addEventListener('click', function (){
                this.parentElement.innerHTML = "<span> در انتظار تایید </span>" +
                    "<button class='btn btn-success mx-1 accept-user'> تایید کاربر </button>" +
                    "<button class='btn btn-secondary mx-1 eject-user'> عدم تایید کاربر </button>"
                setAcceptEjectUserEvents();
            })
        }
        for (const el of document.getElementsByClassName('eject-user-final')){
            el.addEventListener('click', function (){
                this.parentElement.innerHTML = 'رد شده (به علت: ' + this.parentElement.querySelector('textarea').value + ')';
            })
        }
    }

} catch {}

// Set Click Event Function For Remove User Button In Admin-Users & Admin-Centers
try {
    function setRemoveUserEvent(){
        for (const el of document.getElementsByClassName('remove-user')){
            el.addEventListener('click', function (){
                this.parentElement.innerHTML = "<span> آیا از حذف کاربر اطمینان دارید؟ </span>" +
                    "<button class='btn btn-secondary cancel-remove-user mx-1'> لغو عملیات </button>" +
                    "<button class='btn btn-danger remove-user-final mx-1'> تایید </button>";
                makeRemoveUserForm();
            })
        }
    }
    setRemoveUserEvent();

    function makeRemoveUserForm(){
        for (const el of document.getElementsByClassName('cancel-remove-user')){
            el.addEventListener('click', function (){
                this.parentElement.innerHTML = "<a href='main-profile.html' target='_blank' class='btn btn-info'> ویرایش اطلاعات </a>" +
                    "<a href='main-reports.html' target='_blank' class='btn btn-secondary'> گزارش گیری تراکنش ها </a>" +
                    "<a href='main-wallet.html' target='_blank' class='btn btn-secondary'> گزارش گیری کیف پول </a>" +
                    "<button class='btn btn-danger mx-1 remove-user'> حذف کاربر </button>"
                setRemoveUserEvent();
            })
        }
        for (const el of document.getElementsByClassName('remove-user-final')){
            el.addEventListener('click', function (){
                this.parentElement.parentElement.remove();
            })
        }
    }

} catch {}

// Set Click Event Function For Unblock User Button In Admin-Users & Admin-Centers
try {
    function setUnblockUserEvent(){
        for (const el of document.getElementsByClassName('unblock-user')){
            el.addEventListener('click', function (){
                this.parentElement.innerHTML = "<span> تایید شده </span>" +
                    "<button class='btn btn-danger mx-1 block-user'> مسدودسازی کاربر </button>"
                setBlockUserEvent();
            })
        }
    }
    setUnblockUserEvent();
} catch {}

// Set Click Event Function For Block User Button In Admin-Users & Admin-Centers
try {
    function setBlockUserEvent(){
        for (const el of document.getElementsByClassName('block-user')){
            el.addEventListener('click', function (){
                this.parentElement.innerHTML = "<span> علت مسدودسازی کاربر: </span>" +
                    "<textarea class='form-control mx-1 border border-dark' style='min-height: 40px;'></textarea>" +
                    "<button class='btn btn-secondary cancel-block-user mx-1'> لغو عملیات </button>" +
                    "<button class='btn btn-danger block-user-final mx-1'> تایید </button>";
                makeBlockUserForm();
            })
        }
    }
    setBlockUserEvent();

    function makeBlockUserForm(){
        for (const el of document.getElementsByClassName('cancel-block-user')){
            el.addEventListener('click', function (){
                el.parentElement.innerHTML = "<span> تایید شده </span>" +
                    "<button class='btn btn-danger mx-1 block-user'> مسدودسازی کاربر </button>"
                setBlockUserEvent();
            })
        }
        for (const el of document.getElementsByClassName('block-user-final')){
            el.addEventListener('click', function (){
                this.parentElement.innerHTML = "<span> مسدود شده (به علت: " + this.parentElement.querySelector('textarea').value + ") </span>" +
                    "<button class='btn btn-success mx-1 unblock-user'> رفع مسدودسازی کاربر </button>"
                setUnblockUserEvent();
            })
        }
    }

} catch {}

// Set Click Event Function For Request Acceptation In Admin-Requests
try {
    function setAcceptEjectRequestEvents(){
        for (const el of document.getElementsByClassName('accept-request')){
            el.addEventListener('click', function (){
                const element = this.parentElement.parentElement;
                element.lastElementChild.previousElementSibling.innerHTML = 'تایید شده';
                element.lastElementChild.innerHTML = "<a href='main-profile.html' target='_blank' class='btn btn-info mx-1'> مشاهده پروفایل کاربر </a>";
                element.insertBefore(document.createElement('td'), element.children.item(2))
                element.children.item(2).innerHTML = 'امروز';

                document.getElementById('lastRequests').querySelector('tbody').insertBefore(element, document.getElementById('lastRequests').querySelector('tbody').firstElementChild);
            })
        }
        for (const el of document.getElementsByClassName('eject-request')){
            el.addEventListener('click', function (){
                this.parentElement.innerHTML = "<span> علت لغو درخواست: </span>" +
                    "<textarea class='form-control mx-1 border border-dark' style='min-height: 40px;'></textarea>" +
                    "<button class='btn btn-secondary cancel-eject-request mx-1'> لغو عملیات </button>" +
                    "<button class='btn btn-danger eject-request-final mx-1'> تایید </button>";
                makeEjectRequestForm();
            })
        }
    }
    setAcceptEjectRequestEvents();

    function makeEjectRequestForm(){
        for (const el of document.getElementsByClassName('cancel-eject-request')){
            el.addEventListener('click', function (){
                this.parentElement.innerHTML = "<a href='main-profile.html' target='_blank' class='btn btn-info mx-1'> مشاهده پروفایل کاربر </a>" +
                    "<button class='btn btn-success mx-1 accept-request'> تایید درخواست </button>" +
                    "<button class='btn btn-danger mx-1 eject-request'> رد درخواست </button>"
                setAcceptEjectRequestEvents();
            })
        }
        for (const el of document.getElementsByClassName('eject-request-final')){
            el.addEventListener('click', function (){
                const element = this.parentElement.parentElement;
                element.lastElementChild.previousElementSibling.innerHTML = 'رد شده (به علت: ' + this.parentElement.querySelector('textarea').value + ')';
                element.lastElementChild.innerHTML = "<a href='main-profile.html' target='_blank' class='btn btn-info mx-1'> مشاهده پروفایل کاربر </a>";
                element.insertBefore(document.createElement('td'), element.children.item(2))
                element.children.item(2).innerHTML = 'امروز';

                document.getElementById('lastRequests').querySelector('tbody').insertBefore(element, document.getElementById('lastRequests').querySelector('tbody').firstElementChild);
            })
        }
    }
} catch {}

// Set Click Event Function For Remove Requests Button In Admin-Requests
try {
    document.getElementsByClassName('remove-request').item(0).addEventListener('click', function (){
        for (const el of document.querySelectorAll('.table-section:nth-of-type(2) tr:has(td:first-of-type input:checked)')){
            el.remove();
        }
    })
} catch {}
