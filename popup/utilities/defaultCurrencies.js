//Sets the currencies selected 
async function setCurrency(id,value){
    if(id == "baseCurrency"){
        chrome.storage.local.set({ baseCurrency: value },() =>{
            console.log(`${id} is set to ${value}`)
        });
    }else{
        chrome.storage.local.set({ outputCurrency: value },() =>{
            console.log(`${id} is set to ${value}`)
        });
    }
}

//Returns the last selected currencies by the user 
async function getCurrency(id){
    return new Promise(function(resolve){
        if(id=="baseCurrency"){
            chrome.storage.local.get([`baseCurrency`],async (result) =>{
                let currency;
                if(Object.keys(result).length == 0){
                    console.log(`No default ${id} found`)
                    await setCurrency(id,"USD")
                    currency="USD"
                }else{
                    currency=result.baseCurrency;
                }
                resolve(currency)
            });
        }else{
            chrome.storage.local.get(['outputCurrency'],async (result) =>{
                let currency;
                if(Object.keys(result).length == 0){
                    console.log(`No default ${id} found`)
                    await setCurrency(id,"BDT")
                    currency="BDT"
                }else{
                    currency=result.outputCurrency;
                }
                resolve(currency)
            });
        }       
    })
}

export {getCurrency,setCurrency}