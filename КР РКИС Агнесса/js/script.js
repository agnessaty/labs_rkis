const HOST = `http://apiweb.api-web-tech.local`;
var TOKEN = '';
const content = document.querySelector('.content');

function _get(params, callback) {
    let http_request = new XMLHttpRequest();
    http_request.open('GET', `${params.url}`);
    http_request.send();
    http_request.onreadystatechange = function() {
        if(http_request.readyState == 4) {
            callback(http_request.responseText)
        }
        
    }
}

function _post(params, callback) {
    let http_request = new XMLHttpRequest();
    http_request.open('POST', params.url);
    http_request.send(params.data);
    http_request.onreadystatechange = function() {
        if(http_request.readyState == 4) {
            callback(http_request.responseText)
        }
    }
}
LoadPageAuth()
function LoadPageAuth() {
    _get({url: '/modules/authorization.html'}, function(responseText){
        content.innerHTML = responseText;
        OnLoadAuth()
    })
}

function OnLoadAuth(){
    document.querySelector('.authorize').addEventListener('click', function(){
        var request_data = new FormData();        
        request_data.append('email', document.querySelector('input[name="email"]').value)
        request_data.append('password', document.querySelector('input[name="password"]').value)        
        
    _post({url: `${HOST}/authorization`, data: request_data}, function(response){
        response = JSON.parse(response);
        if (response.success){
            TOKEN = response.token;
            console.log(TOKEN)
            LoadPageData();
        } else {
            alert('Login Failed')
        }
    })
    })
}

function LoadPageData() {
    _get({url: '/modules/data.html'}, function(response){
        content.innerHTML = response;
        document.querySelector('.exit').addEventListener('click', OnClickLogout)
    })

    let fdata = new FormData();
    fdata.append('token', TOKEN)
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${HOST}/data`);
    xhr.send(fdata);
    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        //console.log(this.responseText)
        if (xhr.status == 200) {
            let response = JSON.parse(xhr.responseText)
            MakeTableData(response)
        }
        if (xhr.status == 401) {
            let response = JSON.parse(xhr.responseText)
            alert(response.message)
        }
    }
}
}

function OnClickLogout() {
    let edata = new FormData();
    edata.append('token', TOKEN)
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${HOST}/logout`);
    xhr.send(edata);
    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        console.log(this.responseText)
        if (xhr.status == 200) {
            LoadPageAuth()
        }
        if (xhr.status == 401) {
            let response = JSON.parse(xhr.responseText)
            alert(response.message)
        }
    }
}
}

//Таблица
function MakeTableCell(content) {
    let cell = document.createElement('td')
    cell.textContent = content;
    return cell;
}

function MakeTableData(data) {
    data.forEach(element => {
        let row = document.createElement('tr')
        row.append(MakeTableCell(element.name))
        row.append(MakeTableCell(element.age))
        row.append(MakeTableCell(element.gender))
        row.append(MakeTableCell(element.eyeColor))
        row.append(MakeTableCell(element.company))
        row.append(MakeTableCell(element.email))
        row.append(MakeTableCell(element.phone))
        row.append(MakeTableCell(element.address))
        row.append(MakeTableCell(element.registered))
        row.append(MakeTableCell(element.favoriteFruit))

        document.querySelector('.user-data tbody').append(row)
    })
}