const allianceID = localStorage.getItem('allianceID');
const apiKey = localStorage.getItem('apiKey');
const localEnabledSettings = JSON.parse(localStorage.getItem('checkboxSettings'));
var checkboxes = document.querySelectorAll('input[type="checkbox"]');
var bankTransaction = [];
var nationList = [];
var resources = [];

if (localStorage.getItem('checkboxSettings') == null) {
  localStorage.setItem('checkboxSettings', JSON.stringify({}))
}

if (allianceID != null) {
  $('#allianceid').val(allianceID);
}
if (apiKey != null) {
  $('#apikey').val(apiKey);
}

if (localEnabledSettings != null) {
  for (let setting in localEnabledSettings) {
    checkboxes.forEach(checkbox => {
      if (checkbox.getAttribute("value") == setting) {
        checkbox.checked = localEnabledSettings[setting];
      }
    })
  }
}

$(document).ready(function () {
  $('.js-example-basic-single').select2();
});


document.querySelector("input").addEventListener("keydown", function (event) {
  if (event.which === 69) {
    event.preventDefault();
  }
});

// Select all checkboxes with the name 'settings' using querySelectorAll.
let enabledSettings = {}

checkboxes.forEach(checkbox => {
  checkbox.addEventListener("click", function () {
    enabledSettings = JSON.parse(localStorage.getItem("checkboxSettings"));
    if (checkbox.checked) {
      enabledSettings[checkbox.value] = checkbox.checked;
    } else {
      enabledSettings[checkbox.value] = checkbox.checked;
      localStorage.removeItem(`${checkbox.value}`);
    }

    localStorage.setItem('checkboxSettings', JSON.stringify(enabledSettings));
  });
});


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
    for (let result in results) {
      await fetchBankTransact(results[result])
    }
    resolve("")
  })
}

// On submit
$(document).on('submit', '#bank-form', function () {
  $('#btn-submit').addClass('d-none');
  $('.spinner-grow').removeClass('d-none');
  $('#tableDiv').remove();

  //Overwrite default values
  input_alliance_id = document.getElementById('allianceid').value;
  input_apiKey = $('#apikey').val();

  let digitRegex = /^\d+$/;

  if (digitRegex.test(input_alliance_id)) {
    alliance_id = input_alliance_id
  }
  if (input_apiKey != '') {
    apiKey = input_apiKey
  }

  enabledSettings = JSON.parse(localStorage.getItem('checkboxSettings'))

  for (let setting in enabledSettings) {
    if (setting == 'allianceID') {
      localStorage.setItem('allianceID', alliance_id);
    }
    else if (enabledSettings[setting] == 'apiKey' && input_apiKey != '') {
      localStorage.setItem('apiKey', apiKey);
    }
  }

  Object.keys(resources).forEach(v => resources[v] = 0)


  getMemberCount.then((results) => {
    return getBankTransact(results)
  })
    .then(() => {
      for (let x = 0; x < bankTransaction.length; x++) {
        var bankObj = {}
        bankObj[Object.keys(bankTransaction[x])] = {
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

      console.log(bankTransaction)
      console.log(resources)
      for(let y = 0; y < bankTransaction.length; y++){
        let key = Object.keys(bankTransaction[y]) //nationid
        let bankTransactData = bankTransaction[y][key].data //all Transaction by user 0
        insertKey = resources[y][key] //just the summarised value for user 0
        for(let x = 0; x < bankTransaction[y][key].data.length; x++){
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
        console.log(key)
        console.log(insertKey)
    } 
    })
  });