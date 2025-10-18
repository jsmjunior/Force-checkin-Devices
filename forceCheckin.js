const url = "https://eu1.mobileiron.com/";
const forceCheckinEndpoint = "api/v1/devices/forceCheckin";
let devices_info = [];
let credentials = localStorage.getItem('apiCredentials') || '';
function getDevices() {
    const input = document.getElementById('insert_devices').value;
    devices_info = input.split('\n').map(item => item.trim()).filter(item => item !== '');
    generateObject(devices_info);
    generateQuery();
    consumeAPI(devices_info);
}
function uptdateOptions() {
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic ' // Uncomment and set your API token if needed
        },
        formatData: "json"
    };
}
function updateDeviceData() {
    const input = document.getElementById('insert_devices').value;
    devices_info = input.split('\n').map(item => item.trim()).filter(item => item !== '');
}

async function executeForceCheckin() {
    updateDeviceData();

    let formData = new FormData();
    devices_info.forEach(element => {
        formData.append('ids', element);
    });
    callApiForDeviceForceCheckin(formData);

}
function saveCredentials() {
    const credentials = btoa(`${document.getElementById('username').value}:${document.getElementById('password').value}`);
    localStorage.setItem('apiCredentials', credentials);
}
function getCredentials() {
    return localStorage.getItem('apiCredentials') || '';
}

function callApiForDeviceForceCheckin(formData) {

    fetch(`${url}${forceCheckinEndpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + getCredentials()
        },
        body: JSON.stringify({ ids: devices_info })
    })
        .then(response => response.json())
        .then(data => {
            console.log(`Force check-in initiated for device: ${device}`, data);
        })
        .catch(error => {
            console.error(`Error initiating force check-in for device: ${device}`, error);
        })
}