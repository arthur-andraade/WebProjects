const URL_API = "https://api.coincap.io/v2/assets";
var request = new XMLHttpRequest()
let responseJSON;

function buildDataAboutCoin(data) {
    const { rank, symbol, name, supply, maxSupply, marketCapUsd, priceUsd } = data;

    function convertToMillion(value) {
        const million = 1000000;
        return parseFloat(value) / million;
    }

    function addPrefixMillion(value) {
        return `${value} M`
    }

    return {
        rank,
        symbol,
        name,
        supply: addPrefixMillion(convertToMillion(supply)),
        maxSupply: addPrefixMillion(convertToMillion(maxSupply)),
        marketCapUsd: addPrefixMillion(convertToMillion(marketCapUsd)),
        priceUsd: addPrefixMillion(convertToMillion(priceUsd))
    }
}

function buildInfo(name, value) {
    const info = `  
        <div class="info">
            <span class="info-name">${name}</span>
            <span class="info-value">${value}</span>
        </div>
    `;

    return info;
}

function showModalData(data) {

    const modal = document.getElementById("data-modal");
    if (modal) {
        modal.classList.add('show');
        const container = modal.getElementsByClassName("container")[0];
        const content = container.getElementsByClassName("content")[0];

        let info = "";
        for (const key in data) {
            info += buildInfo(key, data[key])
        }
        content.innerHTML = info;

        modal.addEventListener('click', (event) => {
            event.preventDefault()
            if (event.target.id == 'idModal' || event.target.className == 'closeBtn') {
                modal.classList.remove('show')
            }
        })
    }
}

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
        if (coins[index].name === coinName) {
            coinId = coins[index].id;
            break;
        }
    }

    if (coinId) {
        request.open('GET', URL_API + `/${coinId}`, true)
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                showModalData(
                    buildDataAboutCoin(JSON.parse(request.responseText).data)
                );
            }
        }
        request.send()
    }
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