


var bMName = document.getElementById('sName');
var webUrl = document.getElementById('sUrl');
var tContent = document.getElementById('tableContent');
var checkValid = document.getElementById('validate');
var noneOverlay = document.getElementById('overlay');
var data = JSON.parse(localStorage.getItem('data'));


if(JSON.parse(localStorage.getItem('data')) == null){
    data = [];
}
// .ljb.ljb
showData()

function addData() {
    if (!validUrl(webUrl.value) || !validName(bMName.value)) {
        poshAlert();
        return;
    }
    validateName();
    validateUrl();
    var websiteData = {
        sName: bMName.value,
        sUrl: webUrl.value,
    };
    data.push(websiteData);
    localStorage.setItem('data', JSON.stringify(data));
    showData();
    clearData();
    bMName.classList.remove('is-invalid');
    bMName.classList.remove('is-valid');
    webUrl.classList.remove('is-invalid');
    webUrl.classList.remove('is-valid');
}

function showData() {
    var trData = "";
    for (var i = 0; i < data.length; i++) {
        trData += `
            <tr class="border-black border-bottom">
                <td class="p-2 text-danger">${i + 1}</td>
                <td class="p-2 text-success">${data[i].sName}</td>
                <td class="p-2">
                    <button class="visit  border-0 rounded-2 px-2 py-1">
                        <a class="text-decoration-none text-light" href="${data[i].sUrl}" target="_blank"><i class="fas fa-eye"></i> Visit</a>
                    </button>
                </td>
                <td class="p-2">
                    <button class="border-0 rounded-2 px-2 py-1 text-light" onclick="deleteData(${i})"><i class="fas fa-trash-alt"></i> Delete</button>
                </td>
            </tr>
        `;
    }
    tContent.innerHTML = trData;
}

function clearData() {
    bMName.value = "";
    webUrl.value = "";
}

function deleteData(index){
    JSON.parse(localStorage.getItem('data'))
    data.splice(index, 1)
    localStorage.setItem('data', JSON.stringify(data));
    showData()
}

function validUrl(url) {
    var checkTOrF = /https?:\/\/[^\s/$.?#].[^\s]*/;
    return checkTOrF.test(url);
}
function validName(name) {
    var checkTOrF = /^.{3,}$/;
    return checkTOrF.test(name);
}

function validateName(){
    if(/^.{3,}$/.test(bMName.value)){
        bMName.classList.add('is-valid')
        bMName.classList.remove('is-invalid')
        return true;
    }else{
        bMName.classList.remove('is-valid')
        bMName.classList.add('is-invalid')
        return false;
    }
}

function validateUrl(){
    if(/https?:\/\/[^\s/$.?#].[^\s]*/.test(webUrl.value)){
        webUrl.classList.add('is-valid');
        webUrl.classList.remove('is-invalid');
        return true;
    }else{
        webUrl.classList.remove('is-valid');
        webUrl.classList.add('is-invalid');
        return false;
    }
}

bMName.addEventListener('blur', validateName);
webUrl.addEventListener('blur', validateUrl);

function poshAlert(){
    if(webUrl.value == '' || bMName.value == '' || !/^.{3,}$/.test(bMName.value) || !/https?:\/\/[^\s/$.?#].[^\s]*/.test(webUrl.value)){
        checkValid.classList.remove('d-none');
        noneOverlay.classList.remove('d-none');
    }
}

function closeAlert(){
    checkValid.classList.add('d-none');
    noneOverlay.classList.add('d-none');
}