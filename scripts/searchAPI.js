const URL_API = "https://api.coincap.io/v2/assets";
var request = new XMLHttpRequest()
let responseJSON;

function showOptions(data) {
    const list = document.getElementById("coins")
    let options = "";
    for (let index = 0; index < data.length; index++) {
        const option = `<option value="${data[index].name}" >${data[index].name}</option>`
        options += option
    }
    list.innerHTML = options;
}

function searchCoin(coinName) {

    const coins = responseJSON.data;
    let coinId;
    for (let index = 0; index < responseJSON.data.length; index++) {
        if(coins[index].name === coinName ){
            coinId = coins[index].id;
            break;
        }
    }

    request.open('GET', URL_API + `/${coinId}`, true)
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            console.log(JSON.parse(request.responseText))
        }
    }
    request.send()
}

function clickSearch() {
    const coinName = document.getElementById("inputSearch").value
    searchCoin(coinName)
}

const buttonSearch = document.getElementsByClassName("searchBtn")[0]
buttonSearch.addEventListener("click", clickSearch)


function searchCoinData() {
    request.open('GET', URL_API, true)
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            responseJSON = JSON.parse(request.responseText)
            showOptions(responseJSON.data)
        }
    }
    request.send()
}

window.onload = searchCoinData()