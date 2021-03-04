// var money = 0, coal = 0, oil = 0, uranium = 0, iron = 0, bauxite = 0, lead = 0, gasoline = 0, muniton = 0, steel = 0, aluminum = 0, food = 0;
// var bankValue = [money, coal, oil, uranium, iron, bauxite, lead, gasoline, muniton, steel, aluminum, food];

var resources = {
  nation_id: 0,
  alliance_id: 0,
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
}

//Mock JSON data
var testURL = 'https://run.mocky.io/v3/9b97dca2-c97c-4979-9d84-a4d6fa9b8f1c';

//Local Storage 
const nationID = localStorage.getItem('nationID');
const allianceID = localStorage.getItem('allianceID');
const apiKey = localStorage.getItem('apiKey');
const localEnabledSettings = JSON.parse(localStorage.getItem('checkboxSettings'));
var checkboxes = document.querySelectorAll('input[type="checkbox"]');

//Retrieving settings for checkboxes
if (localStorage.getItem('checkboxSettings') == null) {
  localStorage.setItem('checkboxSettings', JSON.stringify({}))
}

//Check if value is null
if (nationID != null) {
  $('#nationid').val(nationID);
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

//Load JS for select2()
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

// On submit
$(document).on('submit', '#bank-form', function () {
  $('#btn-submit').addClass('d-none');
  $('.spinner-grow').removeClass('d-none');
  $('#tableDiv').remove();

  //Overwrite default values
  input_nation_id = $('#nationid').val();
  input_alliance_id = document.getElementById('allianceid').value;
  input_apiKey = $('#apikey').val();

  let digitRegex = /^\d+$/;

  if (digitRegex.test(input_nation_id)) {
    nation_id = input_nation_id
  }
  if (digitRegex.test(input_alliance_id)) {
    alliance_id = input_alliance_id
  }
  if (input_apiKey != '') {
    apiKey = input_apiKey
  }

  enabledSettings = JSON.parse(localStorage.getItem('checkboxSettings'))

  for (let setting in enabledSettings) {
    if (setting == 'nationID') {
      localStorage.setItem('nationID', nation_id);
    }
    else if (setting == 'allianceID') {
      localStorage.setItem('allianceID', alliance_id);
    }
    else if (enabledSettings[setting] == 'apiKey' && input_apiKey != '') {
      localStorage.setItem('apiKey', apiKey);
    }
  }

  Object.keys(resources).forEach(v => resources[v] = 0)

  // for(let x = 0; x < bankValue.length; x++){
  //   bankValue[x] = 0;
  // }

  fetch(`https://pnw-bankapi.herokuapp.com/memberAndAlliance/nationid=${nation_id}`, {
    method: 'GET',
  })

    .then(response => response.json())
    .then(data => {
      resources.nation_id = nation_id;
      resources.alliance_id = alliance_id;

      for (let x = 0; x < data.data.length; x++) {
        //nation is the receiver, alliance is sender
        if (data.data[x].receiver_id == nation_id && data.data[x].sender_id == alliance_id) {
          //[money, coal, oil, uranium, iron, bauxite, lead, gasoline, muniton, steel, aluminum, food]
          resources.money += data.data[x].money;
          resources.coal += data.data[x].coal;
          resources.oil += data.data[x].oil;
          resources.uranium += data.data[x].uranium;
          resources.iron += data.data[x].iron;
          resources.bauxite += data.data[x].bauxite;
          resources.lead += data.data[x].lead;
          resources.gasoline += data.data[x].gasoline;
          resources.muniton += data.data[x].munitions;
          resources.steel += data.data[x].steel;
          resources.aluminum += data.data[x].aluminum;
          resources.food += data.data[x].food;
        }
        //nation is sender, alliance is receiver
        else if (data.data[x].sender_id == nation_id && data.data[x].receiver_id == alliance_id) {
          resources.money -= data.data[x].money;
          resources.coal -= data.data[x].coal;
          resources.oil -= data.data[x].oil;
          resources.uranium -= data.data[x].uranium;
          resources.iron -= data.data[x].iron;
          resources.bauxite -= data.data[x].bauxite;
          resources.lead -= data.data[x].lead;
          resources.gasoline -= data.data[x].gasoline;
          resources.muniton -= data.data[x].munitions;
          resources.steel -= data.data[x].steel;
          resources.aluminum -= data.data[x].aluminum;
          resources.food -= data.data[x].food;
        }

        for (let resource in resources) {
          resources[resource] = Math.round(resources[resource] * 100) / 100
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

              <table id="table"
              data-show-export="true"
              data-pagination="true"
              data-click-to-select="true"
              data-toolbar="#toolbar"
              data-show-toggle="true"
              data-show-columns="true"
              >
            </table>

            <h3 class="pt-3">Bank Transaction(s): </h3>
            <table id="table2"
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
      var $table2 = $('#table2')

      $(function () {
        $('#toolbar').find('select').change(function () {
          var indData = [resources]
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
                field: 'nation_id',
                title: 'Nation ID',
              }, {
                field: 'alliance_id',
                title: 'Alliance ID'
              }, {
                field: 'money',
                title: 'Money'
              }, {
                field: 'coal',
                title: 'Coal'
              }, {
                field: 'oil',
                title: 'Oil'
              }, {
                field: 'uranium',
                title: 'Uranium'
              }, {
                field: 'bauxite',
                title: 'Bauxite'
              }, {
                field: 'iron',
                title: 'Iron'
              }, {
                field: 'lead',
                title: 'Lead'
              }, {
                field: 'gasoline',
                title: 'Gasoline'
              }, {
                field: 'muniton',
                title: 'Munition'
              }, {
                field: 'steel',
                title: 'Steel'
              }, {
                field: 'aluminum',
                title: 'Aluminum'
              }, {
                field: 'food',
                title: 'Food'
              }
            ],
            data: indData
          })
        }).trigger('change')
      })

      
      let newData = data
      $(function () {
        $('#toolbar').find('select').change(function () {
          var data = newData.data
          $table2.bootstrapTable('destroy').bootstrapTable({
            exportDataType: $(this).val(),
            exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'excel', 'pdf'],
            columns: [
              {
                field: 'state',
                checkbox: true,
                visible: $(this).val() === 'selected'
              },
              {
                field: 'tx_datetime',
                title: 'Date',
                sortable: true
              }, {
                field: 'sender_id',
                title: 'Sender ID',
                sortable: true
              }, {
                field: 'receiver_id',
                title: 'Receiver ID',
                sortable: true
              }, {
                field: 'note',
                title: 'Note',
                sortable: true
              }, {
                field: 'banker_nation_id',
                title: 'Banker',
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
    .catch((error) => {
      console.error('Error:', error);
    });


});

