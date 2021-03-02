const fetch = require("node-fetch");
alliance_id = 4221;
var bankTransaction = [];
var nationList = [];

let getMemberCount = new Promise((resolve, reject) => {
    fetch(`https://run.mocky.io/v3/1dfb79ff-4eb1-4b10-84e4-30c86156211c`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            for (let x = 0; x < data.data.length; x++) {
                nationList.push(data.data[x].nation_id);
            }
            resolve(nationList) 
        })
})

let fetchBankTransact = function (nationID){
    return fetch(`https://pnw-bankapi. herokuapp.com/memberAndAlliance/nationid=${nationID}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            var nationObj = {}
            nationObj[nationID] = data;
            console.log(bankTransaction)
            bankTransaction.push(nationObj)
        })
}

let getBankTransact = function (results) {
    console.log(results)
    return new Promise(async (resolve, reject) => {
        for(let result in results){
            await fetchBankTransact(results[result])
        }
        resolve("")
    }) 
}

getMemberCount.then((results) => {
    return getBankTransact(results)
})
    .then((results) => {
        console.log(results)
        console.log(bankTransaction)
    })
