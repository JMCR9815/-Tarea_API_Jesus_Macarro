const url = "https://api.coinlore.net/api/global/";
//devuelve informacion generica del contenido de la api;
const allCoins = 'https://api.coinlore.net/api/tickers/';
//(First 100 Coins);

const specificCoinsBTC = "https://api.coinlore.net/api/ticker/?id=90 (BTC)";
//devuelve la informacion sobre el Bitcoin;
const specificCoinsETH = "https://api.coinlore.net/api/ticker/?id=80 (ETH)";
//devuelve la informacion sobre el Ethereum;
const marketCoins = " https://api.coinlore.net/api/coin/markets/?id=90";
//Requiere el id de la moneda  //devuelve la informacion sobre el estado del mercado de esa moneda
const exchanges = "https://api.coinlore.net/api/exchanges/";
//devuelve todos los intercambios exixtentes del mercado registrados en la api;

const socialStatsForCoin = "https://api.coinlore.net/api/social_tats/?id=80";
//devuelve el estado de las estadistcias sociales sobre la moneda indicada con el id;


const btn_AllCoins = document.getElementById("btn_AllCoins");
const btn_Buscador = document.getElementById("btn_Buscador")
const Buscador_id = document.getElementById("Buscador_id");
const main = document.getElementById("main");
const titulo = document.getElementById("titulo");
const globalMarketData = document.getElementById("market_global_btc");
const cryptoCurrency = document.getElementById("crypto_currency");
const btcExchanges = document.getElementById("btc_exchanges");
const socialStadistics = document.getElementById("social_stadistics");



globalMarketData.addEventListener('click', () => {
    main.innerHTML = "";

    async function GlobalMarketData(url) {
        const respuesta = await fetch(url);
        const json = await respuesta.json();
        return json;
    }

    GlobalMarketData(url).then(json => {
        for (var i = 0; i < json.length; i++) {
            var datos = document.createElement("div");
            datos.classList.add("Datos");
            datos.setAttribute("id", "datos");
            for (let value of Object.entries(json[i])) {
                data1 = document.createElement("p");
                data1.innerText = value[0] + ": " + value[1];
                datos.appendChild(data1);
                main.appendChild(datos);

            }

        }


    })
});

cryptoCurrency.addEventListener('click', () => {
        main.innerHTML = "";
        CrearBuscador();


    }) //Pendiante de revision: El boton "Todas las monedas no funciona" y falta terminar el filtrado por busquedas y resultados



btcExchanges.addEventListener('click', () => {
    main.innerHTML = "";
    CrearBuscador2();

}); //Inacabado, falta el metodo de obtencion de datos y el de filtrado de monedas por el id 

function buscadorMonedas(cantidad, cantidad2) {
    const allCoins2 = "https://api.coinlore.net/api/tickers/?start=" + cantidad + "&&limit=" + cantidad2;
    console.log(cantidad, cantidad2);

    return allCoins2;
}

function buscadorIntercambios(id) {
    const specificDataExchange = "https://api.coinlore.net/api/exchange/?id=" + id;
    return specificDataExchange;
}

function OcultarElementos() {
    globalMarketData.addEventListener('click', () => {
        main.innerHTML = "";
        GlobalMarketData();
    });
    cryptoCurrency.addEventListener('click', () => {
        main.innerHTML = "";
        AllCoins();
    });


}

function CrearBuscador2() {
    const div = document.createElement("div")
    div.classList.add("Bsucador-API");

    const input = document.createElement("input");
    input.type = "search";
    input.placeholder = "Search";
    div.appendChild(input);


    const button = document.createElement("button");
    button.textContent = "Search";
    button.setAttribute("id", "btn_Buscador");
    div.appendChild(button);

    if (button) {
        console.log("Existe");
        button.addEventListener('click', () => {
            main.innerHTML = "";
            CrearBuscador2();

            const CoinsSearch = buscadorIntercambios(input.value);
            async function CoinExchanges(CoinsSearch) {
                const respuesta = await fetch(CoinsSearch);
                const json3 = await respuesta.json(CoinsSearch);
                return json3;

            }

            CoinExchanges(CoinsSearch).then(json3 => {
                console.log(json3);
                for (let i = 0; i < json3.length; index++) {
                    var datos2 = document.createElement("div");
                    datos2.classList.add("Datos");
                    for (let value of Object.entries(json3[i])) {
                        console.log(value[0] + ": " + value[1]);
                        data2 = document.createElement("p");
                        data2.innerText = value[0] + ": " + value[1];
                        datos2.appendChild(data2);
                        main.appendChild(datos2);

                    }

                }
            })
        })
    }

    main.appendChild(div)
} //Metodo de creacion del buscador para las monedas 

function CrearBuscador() {
    const div = document.createElement("div")
    div.classList.add("Bsucador-API");

    const input = document.createElement("input");
    input.type = "search";
    input.placeholder = "Busquedas";
    div.appendChild(input);

    const input2 = document.createElement("input");
    input2.type = "search";
    input2.placeholder = "Resultados";
    div.appendChild(input2);


    const button = document.createElement("button");
    button.textContent = "Search";
    button.setAttribute("id", "btn_Buscador");
    div.appendChild(button);
    if (button) {
        button.addEventListener('click', () => {
            main.innerHTML = "";
            CrearBuscador();

            main.innerHTML = "";
            const allCoins2 = buscadorMonedas(input.value, input2.value);

            async function AllCoins(allCoins2) {
                const respuesta = await fetch(allCoins2);
                const json2 = await respuesta.json(allCoins2);
                return json2;
            }

            AllCoins(allCoins2).then(json2 => {
                console.log(json2.data.length);
                for (let i = 0; i < json2.data.length; i++) {

                    var datos2 = document.createElement("div");
                    datos2.classList.add("Datos");


                    for (let value of Object.entries(json2.data[i])) {
                        console.log(value[0] + ": " + value[1]);

                        data2 = document.createElement("p");
                        data2.innerText = value[0] + ": " + value[1];
                        datos2.appendChild(data2);
                        main.appendChild(datos2);
                    }

                }
            });

        })
    }


    const button2 = document.createElement("button");
    button2.type = "button";
    button2.setAttribute("id", "btn_AllCoins");
    button2.placeholder = " monedas ";
    button2.style.width = "20%";
    button2.style.marginLeft = "150px";
    button2.style.marginRight = "auto";
    button2.style.marginTop = "20px";
    button2.textContent = "AllCoins";
    div.appendChild(button2);

    main.appendChild(div)

    if (button2) {

        button2.addEventListener('click', () => {
            main.innerHTML = "";

            async function AllCoins() {
                const respuesta = await fetch(allCoins);
                const json2 = await respuesta.json();
                return json2;
            }

            AllCoins(allCoins).then(json2 => {
                for (let i = 0; i <= json2.data.length - 1; i++) {
                    var datos2 = document.createElement("div");
                    datos2.classList.add("Datos");

                    for (let value of Object.entries(json2.data[i])) {

                        data2 = document.createElement("p");
                        data2.innerText = value[0] + ": " + value[1];
                        datos2.appendChild(data2);
                        main.appendChild(datos2);
                    }
                }
            });
        })
    }
} //metodo de creacion del buscador para los intercambios




//Metodo para obtener Los intercambios del bitcoin (Pendiante de revision : no muestra los datos)

// async function BTC_exchanges(exchanges) {
//     const respuesta = await fetch(exchanges);
//     const json3 = await respuesta.json();
//     return json3;
// }
// BTC_exchanges(exchanges).then(json3 => {
//     for (var i = 0; i < json3.length; i++) {
//         var datos = document.createElement("div");
//         datos.classList.add("Datos");
//         datos.setAttribute("id", "datos");
//         data3 = document.createElement("p");
//         data3.innerText = json3[i].id;
//         datos.appendChild(data3);
//     }

//     //data3.innerText=json3[i]
// })