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


  getMemberCount(alliance_id).then((results) => {
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

        //Positive means nations owe debt to alliance, vice versa
        // $('#bank-records-main').addClass('d-none');
        $('.spinner-grow').addClass('d-none');
        $('#btn-submit').removeClass('d-none');

        $("#container-main").append(
          `
          <div id="tableDiv">
                <h3 class="pt-3 mb-0">Results: </h3>
                <div id="toolbar" class="select">
                  <select class="form-control">
                    <option value="">Export Basic</option>
                    <option value="all">Export All</option>
                    <option value="selected">Export Selected</option>
                  </select>
                </div>
  
              <h3 class="pt-3">Bank Transaction(s): </h3>
              <table id="table"
              data-search="true"
                data-sortable="true"
                data-show-export="true"
                data-pagination="true"
                data-click-to-select="true"
                data-toolbar="#toolbar"
                data-show-toggle="true"
                data-show-columns="true"
                data-show-jump-to="true"
                data-reorderable-columns="true"
                >
              </table>
              </div>
                `
        );

        var $table = $('#table')
          console.log(resources)
        $(function () {
          $('#toolbar').find('select').change(function () {
            var data = resources
            $table.bootstrapTable('destroy').bootstrapTable({
              exportDataType: $(this).val(),
              exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'excel', 'pdf'],
              columns: [
                {
                  field: 'state',
                  checkbox: true,
                  visible: $(this).val() === 'selected'
                },
                {
                  field: 'nationID',
                  title: 'Nation ID',
                  sortable: true
                }, {
                  field: 'money',
                  title: 'Money',
                  sortable: true
                }, {
                  field: 'coal',
                  title: 'Coal',
                  sortable: true
                }, {
                  field: 'oil',
                  title: 'Oil',
                  sortable: true
                }, {
                  field: 'uranium',
                  title: 'Uranium',
                  sortable: true
                }, {
                  field: 'bauxite',
                  title: 'Bauxite',
                  sortable: true
                }, {
                  field: 'iron',
                  title: 'Iron',
                  sortable: true
                }, {
                  field: 'lead',
                  title: 'Lead',
                  sortable: true
                }, {
                  field: 'gasoline',
                  title: 'Gasoline',
                  sortable: true
                }, {
                  field: 'muniton',
                  title: 'Munition',
                  sortable: true
                }, {
                  field: 'steel',
                  title: 'Steel',
                  sortable: true
                }, {
                  field: 'aluminum',
                  title: 'Aluminum',
                  sortable: true
                }, {
                  field: 'food',
                  title: 'Food',
                  sortable: true
                }
              ],
              data: data
            })
          }).trigger('change')
        })

    })
});