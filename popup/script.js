import setOptionsForSelect from "./utilities/currencies.js"
import getRates from "./utilities/exchangeRates.js";
import { getData } from "./utilities/exchangeRates.js";
import {setCurrency} from "./utilities/defaultCurrencies.js";

var input = document.getElementById('inputnumber');
var output = document.getElementById('outputnumber');
var baseCurrency = document.getElementById('baseCurrency');
var outputCurrency = document.getElementById('outputCurrency');


setOptionsForSelect();
getData();

//changes in the values of input and output
input.addEventListener('input', function () {
  getRates(outputCurrency.value,baseCurrency.value).then((exchangeRate) => {
    if(typeof exchangeRate ==  "number")output.value=Math.floor(input.value*exchangeRate*10000)/10000;
  })
});

output.addEventListener('input',function () {
  getRates(baseCurrency.value,outputCurrency.value).then((exchangeRate) => {
    if(typeof exchangeRate ==  "number")input.value=Math.floor(output.value*exchangeRate*10000)/10000;
  })
});

//Changes in the currency
baseCurrency.addEventListener('change',async function(){
  await setCurrency("baseCurrency",baseCurrency.value)
  //changes the output value
  const exchangeRate = await getRates(outputCurrency.value,baseCurrency.value);
  if(typeof exchangeRate ==  "number")output.value=Math.floor(input.value*exchangeRate*10000)/10000;  
});
outputCurrency.addEventListener('change',async function(){
  await setCurrency("outputCurrency",outputCurrency.value)
  //changes the output value  
  const exchangeRate = await getRates(outputCurrency.value,baseCurrency.value);
  if(typeof exchangeRate ==  "number")output.value=Math.floor(input.value*exchangeRate*10000)/10000;  
})

