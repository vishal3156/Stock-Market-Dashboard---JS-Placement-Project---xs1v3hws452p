// var currSymbol = document.getElementById('searchbar').value;
var searchSymbol = "";
var newId = 0;
var searchDataList = [];


const searchHandler = () => {
    val = document.getElementById('searchbar').value;
    // console.log('searched')
    if (val.length >= 3) {
        // console.log(val);
        // searchSymbol = val;
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${val}&apikey=K6HYT0RQQ4R8ND1K`)
            .then(response => response.json())
            .then((data) => {
                // console.log("Searched Symbol: ", data);
                searchDataList = data.bestMatches;
                if (searchDataList.length > 0) {
                    for (i = 0; i < searchDataList.length; i++) {
                        document.getElementById('stocks').innerHTML += `<option value="${searchDataList[i]['1. symbol']}">${searchDataList[i]['1. symbol']} ${searchDataList[i]['2. name']}</option>`
                    }
                } else {
                    document.getElementById('stocks').innerHTML += `<option value="No Stocks Found">No Stocks Found</option>`
                }
                // console.log()
            })
        clearInterval();
    }
}

const togglePriceList = (id) => {
    document.getElementById(`price-${id}`).classList.toggle("d-none");
}



// Fetching Data of Time Frames

const createIntradayPriceObj = (data, callback) => {
    if (!data) return callback(err);
    let newData = [];
   
    for (i=0; i<5; i++) {
        newData.push({
            date: Object.keys(data['Time Series (5min)'])[i].split(' ')[0],
            time: Object.keys(data['Time Series (5min)'])[i].split(' ')[1],
            open: data[`Time Series (5min)`][Object.keys(data[`Time Series (5min)`])[i]][`1. open`],
            high: data[`Time Series (5min)`][Object.keys(data[`Time Series (5min)`])[i]][`2. high`],
            low: data[`Time Series (5min)`][Object.keys(data[`Time Series (5min)`])[i]][`3. low`],
            close: data[`Time Series (5min)`][Object.keys(data[`Time Series (5min)`])[i]][`4. close`],
            volume: data[`Time Series (5min)`][Object.keys(data[`Time Series (5min)`])[i]][`5. volume`],
        })
    }

    return callback(null, newData);
}

const getIntraday = async () => {
    // console.log("Intraday");
    let datafetched;
    await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${document.getElementById('searchbar').value}&interval=5min&apikey=K6HYT0RQQ4R8ND1K`)
        .then(response => response.json())
        .then((data) => {
            // console.log('fetchedNew Data', data)
            // currSymbol = data['Meta Data']['2. Symbol'];
            if ('Request Limit is exceeded, Please wait for 1 min and try again!', data['Note']) {
                // console.log(data['Note']);
                alert(data['Note']);
            } else {

                createIntradayPriceObj(data, (err, obj) => {
                    if (err) return console.error(err);
                    datafetched = obj
                    // console.log('after ', obj)
                    return (obj);
                })
            }
        })
    // console.log('data', datafetched)
    return datafetched;
}

const createDailyPriceObj = (data, callback) => {
    if (!data) return callback(err);
    let newData = [];
   
    for (i=0; i<5; i++) {
        newData.push({
            date: 'Date',
            time: Object.keys(data['Time Series (Daily)'])[i],
            open: data[`Time Series (Daily)`][Object.keys(data[`Time Series (Daily)`])[i]][`1. open`],
            high: data[`Time Series (Daily)`][Object.keys(data[`Time Series (Daily)`])[i]][`2. high`],
            low: data[`Time Series (Daily)`][Object.keys(data[`Time Series (Daily)`])[i]][`3. low`],
            close: data[`Time Series (Daily)`][Object.keys(data[`Time Series (Daily)`])[i]][`4. close`],
            volume: data[`Time Series (Daily)`][Object.keys(data[`Time Series (Daily)`])[i]][`6. volume`],
        })
    }

    return callback(null, newData);
}

const getDaily = async () => {
    // console.log("Intraday");
    let datafetched;
    await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${document.getElementById('searchbar').value}&apikey=K6HYT0RQQ4R8ND1K`)
        .then(response => response.json())
        .then((data) => {
            // console.log('fetchedNew Data', data)
            // currSymbol = data['Meta Data']['2. Symbol'];
            if ('Request Limit is exceeded, Please wait for 1 min and try again!', data['Note']) {
                // console.log(data['Note']);
                alert(data['Note']);
            } else {

                createDailyPriceObj(data, (err, obj) => {
                    if (err) return console.error(err);
                    datafetched = obj
                    // console.log('after ', obj)
                    return (obj);
                })
            }
        })
    // console.log('data', datafetched)
    return datafetched;
}

const createWeeklyPriceObj = (data, callback) => {
    if (!data) return callback(err);
    let newData = [];
   
    for (i=0; i<5; i++) {
        newData.push({
            date: 'Date',
            time: Object.keys(data['Weekly Time Series'])[i],
            open: data[`Weekly Time Series`][Object.keys(data[`Weekly Time Series`])[i]][`1. open`],
            high: data[`Weekly Time Series`][Object.keys(data[`Weekly Time Series`])[i]][`2. high`],
            low: data[`Weekly Time Series`][Object.keys(data[`Weekly Time Series`])[i]][`3. low`],
            close: data[`Weekly Time Series`][Object.keys(data[`Weekly Time Series`])[i]][`4. close`],
            volume: data[`Weekly Time Series`][Object.keys(data[`Weekly Time Series`])[i]][`5. volume`],
        })
    }

    return callback(null, newData);
}

const getWeekly = async () => {
    // console.log("Intraday");
    let datafetched;
    await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${document.getElementById('searchbar').value}&apikey=K6HYT0RQQ4R8ND1K`)
        .then(response => response.json())
        .then((data) => {
            // console.log('fetchedNew Data', data)
            // currSymbol = data['Meta Data']['2. Symbol'];
            if (data['Note']) {
                // console.log(data['Note']);
                alert('Request Limit is exceeded, Please wait for 1 min and try again!', data['Note']);
            } else {

                createWeeklyPriceObj(data, (err, obj) => {
                    if (err) return console.error(err);
                    datafetched = obj
                    // console.log('after ', obj)
                    return (obj);
                })
            }
        })
    // console.log('data', datafetched)
    return datafetched;
}

const createMonthlyPriceObj = (data, callback) => {
    if (!data) return callback(err);
    let newData = [];
   
    for (i=0; i<5; i++) {
        newData.push({
            date: 'Date',
            time: Object.keys(data['Monthly Time Series'])[i],
            open: data[`Monthly Time Series`][Object.keys(data[`Monthly Time Series`])[i]][`1. open`],
            high: data[`Monthly Time Series`][Object.keys(data[`Monthly Time Series`])[i]][`2. high`],
            low: data[`Monthly Time Series`][Object.keys(data[`Monthly Time Series`])[i]][`3. low`],
            close: data[`Monthly Time Series`][Object.keys(data[`Monthly Time Series`])[i]][`4. close`],
            volume: data[`Monthly Time Series`][Object.keys(data[`Monthly Time Series`])[i]][`5. volume`],
        })
    }

    return callback(null, newData);
}

const getMonthly = async () => {
    // console.log("Intraday");
    let datafetched;
    await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${document.getElementById('searchbar').value}&apikey=K6HYT0RQQ4R8ND1K`)
        .then(response => response.json())
        .then((data) => {
            // console.log('fetchedNew Data', data)
            // currSymbol = data['Meta Data']['2. Symbol'];
            if (data['Note']) {
                // console.log('Request Limit is exceeded, Please wait for 1 min and try again!', data['Note']);
                alert(data['Note']);
            } else {
                createMonthlyPriceObj(data, (err, obj) => {
                    if (err) return console.error(err);
                        datafetched = obj
                        // console.log('after ', obj)
                        return (obj);
                });
            }
        })
    // console.log('data', datafetched)
    return datafetched;
}

// Watchlist
const watchListTemplate = (symbol, cmp, timeOption, data) => {
    let id = newId++;
    let watchlistId = `watchlist-${id}`;
    let priceId = `price-${id}`;
    let rows = ``;
    let cmpBgColor = data[0] > data[4] ? 'success' : 'danger';
    for (i = 0; i < 5; i++) {
        rows = rows + `
        <tr>
            <td>${data[i].time}</td>
            <td>${data[i].open}</td>
            <td>${data[i].high}</td>
            <td>${data[i].low}</td>
            <td>${data[i].close}</td>
            <td>${data[i].volume}</td>
        </tr>
    `
    }

    let template = `
        <div id=${watchlistId}>
            <div class="d-flex align-items-center justify-content-between bg-secondary p-2 h-100 rounded-4 mt-2">
                <div class="d-flex align-items-center" onclick="togglePriceList(${id})" style="cursor: pointer;">
                    <h4>${symbol}</h3>
                    <span class="bg-${cmpBgColor} fs-5 p-2 px-2 text-white rounded-pill mx-2">
                        ${data[0].close}
                    </span>
                    <button class="btn btn-lg btn-secondary w-100 rounded-pill"
                    >
                        ${timeOption}
                    </button>
                </div>
                <button class="btn btn danger p-0"
                onclick="removeWatchlist(${id})">
                    <i class="bi bi-x-circle-fill text-danger fs-1"></i>
                </button>
            </div>
            <div id=${priceId} class="table-responsive pt-2  d-none">
                <table class="table table-secondary rounded-4">
                    <thead>
                        <tr>
                            <th scope="col">${data[0].date}</th>
                            <th scope="col">OPEN</th>
                            <th scope="col">HIGH</th>
                            <th scope="col">LOW</th>
                            <th scope="col">CLOSE</th>
                            <th scope="col">VOLUME</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        ${rows}
                        
                    </tbody>
                </table>
            </div>
        </div>
    `
    return (template);
}

const addWatchlist = async (symbol, timeOption) => {
    const watchlist = document.getElementById('watchlist');
    console.log("Watchlist Added", symbol);
    if (symbol) {
        if (timeOption === 'Intraday') {
            const data = await getIntraday();
            if (!data) return alert("Error: obj not found");
            watchlist.innerHTML += watchListTemplate(symbol, 126.3, timeOption, data);
        }
        if (timeOption === 'Daily') {
            const data = await getDaily();
            if (!data) return alert("Error: obj not found");
            watchlist.innerHTML += watchListTemplate(symbol, 126.3, timeOption, data);
        }
        if (timeOption === 'Weekly') {
            const data = await getWeekly();
            if (!data) return alert("Error: obj not found");
            watchlist.innerHTML += watchListTemplate(symbol, 126.3, timeOption, data);
        }
        if (timeOption === 'Monthly') {
            const data = await getMonthly();
            if (!data) return alert("Error: obj not found");
            watchlist.innerHTML += watchListTemplate(symbol, 126.3, timeOption, data);
        }
    } else {
        alert("Something went wrong! Try again.");
    }

}

const removeWatchlist = (id) => {
    console.log("Watchlist Removed");
    const element = document.getElementById(`watchlist-${id}`);
    element.remove();
}


// Element Variables
const searchbar = document.getElementById('searchbar');
const intraday = document.getElementById('btn-intraday');
const daily = document.getElementById('btn-daily');
const monthly = document.getElementById('btn-monthly');
const weekly = document.getElementById('btn-weekly');

var myTimeout;
searchbar.addEventListener('keyup', (e) => {
   
    const value = e.target.value;
    myTimeout = setTimeout(searchHandler, 2000);
    // changeHandler(value);
});
searchbar.addEventListener('keydown', (e) => {
    clearTimeout(myTimeout);
});


//Adding to Watchlist
intraday.addEventListener('click', () => {
    console.log('currentsymbol', document.getElementById('searchbar').value)
    addWatchlist(document.getElementById('searchbar').value, 'Intraday');
});

daily.addEventListener('click', () => {
    console.log('currentsymbol', document.getElementById('searchbar').value)
    addWatchlist(document.getElementById('searchbar').value, 'Daily');
});

weekly.addEventListener('click', () => {
    console.log('currentsymbol', document.getElementById('searchbar').value)
    addWatchlist(document.getElementById('searchbar').value, 'Weekly');
});

monthly.addEventListener('click', () => {
    console.log('currentsymbol', document.getElementById('searchbar').value)
    addWatchlist(document.getElementById('searchbar').value, 'Monthly');
});