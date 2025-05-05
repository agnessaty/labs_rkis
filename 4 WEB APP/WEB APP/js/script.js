//#region Глобальные переменные
const HOST = `http://web-app.api-web-tech.local`;
const content = document.querySelector('.content');
var TOKEN = '';
//#endregion

//#region Авторизация
loadPageAuth()
function loadPageAuth() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/modules/authorization.html')
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            content.innerHTML = xhr.responseText;
            onLoadPageAuth()
            onLoadPageReg()
        }
}}


// Загрузка страницы Профиля по кнопке Авторизация
function onLoadPageAuth() {
    document.querySelector('.authorize').addEventListener('click', function(){
        let fdata = new FormData();
        fdata.append('email', document.querySelector('input[name="email"]').value)
        fdata.append('password', document.querySelector('input[name="password"]').value)

        let xhr = new XMLHttpRequest();
        fdata.append('TOKEN', TOKEN)
        xhr.open('POST', `${HOST}/authorization`)
        xhr.send(fdata);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                console.log(this.responseText);
                if (xhr.status == 200) {
                    LoadPageProfile()
                }
                if (xhr.status == 401) {
                    let response = JSON.parse(xhr.responseText)
                    alert(response.message)
                }
            }
    }
    })
}
function logout() {
    let xhr = new XMLHttpRequest();
        fdata.append('TOKEN', TOKEN)
        xhr.open('GET', `${HOST}/logout`)
        xhr.send();
        xhr.onreadystatechange = function() {
            let response = JSON.parse(response)
            if (response.succes) {
                
            }
    }
}

//#endregion АВТОРИЗАЦИЯ

//#region ПРОФИЛЬ

// Загрузка страницы Профиля
function LoadPageProfile() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/modules/profile.html')
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            content.innerHTML = xhr.responseText;
            onLoadPageUpload()
        }
    }
}
//#endregion ПРОФИЛЬ

//#region РЕГИСТРАЦИЯ
// Загрузка страницы Регистрации
function LoadPageReg() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/modules/registration.html')
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            content.innerHTML = xhr.responseText;
            onloadPageProfReg()
        }
    }
}

// Загрузка страницы Регистрации по кнопке Регистрация в авторизации
function onLoadPageReg() {
    document.querySelector('.go-register').addEventListener('click', LoadPageReg)
}

// Загрузка страницы Профиля по кнопке регистрация
function onloadPageProfReg() {
    document.querySelector('.register').addEventListener('click', function() {
        let edata = new FormData();
        edata.append('first_name', document.querySelector('input[name="first_name"]').value)
        edata.append('last_name', document.querySelector('input[name="last_name"]').value)
        edata.append('email', document.querySelector('input[name="email"]').value)
        edata.append('password', document.querySelector('input[name="password"]').value)

        let xhr = new XMLHttpRequest();
        edata.append('TOKEN', TOKEN)
        xhr.open('POST', `${HOST}/registration`)
        xhr.send(edata);
        xhr.onreadystatechange = function() {
            let response = JSON.parse(response)
            if (response.success) {
                LoadPageProfile()
                TOKEN = response.TOKEN
            }
    }
    })
}
//#endregion РЕГИСТРАЦИЯ


//#region ЗАГРУЗИТЬ ФАЙЛЫ
function loadPageUpload() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/modules/upload.html')
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            content.innerHTML = xhr.responseText;
            BtnUpload()
        }
    }
}

// Загрузка страницы UPLOAD в профиле по кнопке
function onLoadPageUpload() {
    document.querySelector('.btn-upload-file').addEventListener('click', function() {
        loadPageUpload()
    })
}

// Кнопки в ЗАГРУЗКЕ ФАЙЛОВ - назад, загрузить
function BtnUpload() {
    document.querySelector('.btn-to-disk').addEventListener('click', function (){
        LoadPageProfile()
    })
    document.querySelector('.upload-files').addEventListener('click', function() {
        let edata = new FormData();
        edata.append('TOKEN', TOKEN)
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `${HOST}/upload`)
        xhr.send();
        xhr.onreadystatechange = function() {
            let response = JSON.parse(response)
            if (response.success) {
                
            }
        }
    })
}
//#endregion UPLOAD