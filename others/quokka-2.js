const fetch = require("node-fetch");

alliance_id = 1723

let getMemberCount = function (alliance_id) {
    return new Promise((resolve, reject) => {
      fetch(`https://pnw-bankapi.herokuapp.com/noOfMembers/allianceid=${alliance_id}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          nationList = [];
          for (let x = 0; x < data.data.length; x++) {
            nationList.push(data.data[x].nation_id);
          }
          resolve(nationList)
        })
    })
  }
  
  let fetchBankTransact = function (nationID) {
    return fetch(`https://pnw-bankapi.herokuapp.com/memberAndAlliance/nationid=${nationID}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        var nationObj = {}
        nationObj[nationID] = data;
        bankTransaction.push(nationObj)
      })
  }

  let getBankTransact = function (results) {
    return new Promise(async (resolve, reject) => {
      bankTransaction = [];
      for (let result in results) {
        await fetchBankTransact(results[result])
      }
      resolve("")
    })
  }

getMemberCount(1723).then((results) => {
    return getBankTransact(results)
  })
    .then(() => {
      resources = []
      for (let x = 0; x < bankTransaction.length; x++) {
        var bankObj = {} 
        bankObj = {
          nationID: nationList[x],
          money: 0, 
          coal: 0, 
          oil: 0,
          uranium: 0,
          bauxite: 0,
          iron: 0,
          lead: 0,
          gasoline: 0,
          muniton: 0,
          steel: 0,
          aluminum: 0,
          food: 0
        };
        resources.push(bankObj);
      } 

      for (let y = 0; y < bankTransaction.length; y++) {
        let key = Object.keys(bankTransaction[y]) //nationid
        let bankTransactData = bankTransaction[y][key].data //all Transaction by user 0
        insertKey = resources[y]//just the summarised value for user 0
        for (let x = 0; x < bankTransaction[y][key].data.length; x++) {
          if (bankTransactData[x].receiver_id == key && bankTransactData[x].sender_id == alliance_id) {
            //[money, coal, oil, uranium, iron, bauxite, lead, gasoline, muniton, steel, aluminum, food]
            insertKey.money += bankTransactData[x].money;
            insertKey.coal += bankTransactData[x].coal;
            insertKey.oil += bankTransactData[x].oil;
            insertKey.uranium += bankTransactData[x].uranium;
            insertKey.iron += bankTransactData[x].iron;
            insertKey.bauxite += bankTransactData[x].bauxite;
            insertKey.lead += bankTransactData[x].lead;
            insertKey.gasoline += bankTransactData[x].gasoline;
            insertKey.muniton += bankTransactData[x].munitions;
            insertKey.steel += bankTransactData[x].steel;
            insertKey.aluminum += bankTransactData[x].aluminum;
            insertKey.food += bankTransactData[x].food;
          }
          //nation is sender, alliance is receiver
          else if (bankTransactData[x].sender_id == key && bankTransactData[x].receiver_id == alliance_id) {
            insertKey.money -= bankTransactData[x].money;
            insertKey.coal -= bankTransactData[x].coal;
            insertKey.oil -= bankTransactData[x].oil;
            insertKey.uranium -= bankTransactData[x].uranium;
            insertKey.iron -= bankTransactData[x].iron;
            insertKey.bauxite -= bankTransactData[x].bauxite;
            insertKey.lead -= bankTransactData[x].lead;
            insertKey.gasoline -= bankTransactData[x].gasoline;
            insertKey.muniton -= bankTransactData[x].munitions;
            insertKey.steel -= bankTransactData[x].steel;
            insertKey.aluminum -= bankTransactData[x].aluminum;
            insertKey.food -= bankTransactData[x].food;
          }
          for (let resource in insertKey) {
            insertKey[resource] = Math.round(insertKey[resource] * 100) / 100
          }
        }
      }

      console.log(resources)    

      
        //Positive means nations owe debt to alliance, vice versa
        // $('#bank-records-main').addClass('d-none');
        $('.spinner-grow').addClass('d-none');
        $('#btn-submit').removeClass('d-none');
        bankTransactAppend(resources)
          .then((result) => {
            $("#container-main").append($(result));
            
            // console.log(result)
          })
    })