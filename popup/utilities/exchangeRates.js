import apiKey from "./api.js"; //Need to have an api key. Here api key is stored in a hidden file. The api key can be obtained from https://openexchangerates.org/

const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

const secondsForRetrivingData = 3*24*3600; //The api call will be made once in every 3 days

async function setData() {
    let footer = document.getElementById("footer")
    let errid = footer.querySelector("#error")
    if (errid) {
        footer.removeChild(errid)
    }
    try {
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        console.log(jsonData)
        let currentTime = Math.floor(Date.now() / 1000);
        chrome.storage.local.set({ lastApiCall: currentTime }, () => {
            console.log(`Time for lastApiCall stored: ${currentTime}`)
        })

        await chrome.storage.local.set({ myData: jsonData }, () => {
            console.log('JSON data saved in Chrome local storage');
        });
        return jsonData
    } catch (err) {
        console.log(err)
        errid = footer.querySelector("#error")
        if (!errid) {
            let ErrorMessage = document.createElement("p")
            ErrorMessage.textContent = ("No internet connection found!")
            ErrorMessage.style.color = "red";
            ErrorMessage.id = "error"
            footer.appendChild(ErrorMessage);
        }
    }
};

async function getData() {

    return new Promise(function (resolve) {
        chrome.storage.local.get(['myData', 'lastApiCall'], async (result) => {
            let rates
            if (Object.keys(result).length != 2) {
                console.log("No result found")
                rates = await setData()
            } else {
                let currentTime = Math.floor(Date.now() / 1000);
                const timeOfLastUpdate = result.lastApiCall
                let timeElapsed = currentTime - timeOfLastUpdate;
                rates = result.myData
                if (timeElapsed > secondsForRetrivingData) {
                    console.log("Last retrieved more than 3 days ago..")
                    let data = await setData();
                    if (data) {
                        rates = data
                    }
                } else {
                    console.log("Result given")
                    resolve(rates)
                }
            }
            resolve(rates);
        })
    });
}

async function getRates(base, target) {
    let currentExchangeRates = await getData();
    if (currentExchangeRates) {
        let num = 1, denom = 1;
        if (base != "USD") {
            num = currentExchangeRates.rates[base];
        }
        if (target != "USD") {
            denom = currentExchangeRates.rates[target];
        }
        return num / denom;
    }
}

export default getRates
export { getData }


