// var money = 0, coal = 0, oil = 0, uranium = 0, iron = 0, bauxite = 0, lead = 0, gasoline = 0, muniton = 0, steel = 0, aluminum = 0, food = 0;
// var bankValue = [money, coal, oil, uranium, iron, bauxite, lead, gasoline, muniton, steel, aluminum, food];

var resources = {
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

var testURL = 'https://run.mocky.io/v3/9b97dca2-c97c-4979-9d84-a4d6fa9b8f1c';
// var officialURL = `https://pnw-bankapi.herokuapp.com/memberAndAlliance/nationid=${nation_id}`;

const nationID = localStorage.getItem('nationID');
const allianceID = localStorage.getItem('allianceID');
const apiKey = localStorage.getItem('apiKey');
const localEnabledSettings = JSON.parse(localStorage.getItem('checkboxSettings'));
var checkboxes = document.querySelectorAll('input[type="checkbox"]');

if(localStorage.getItem('checkboxSettings') == null) {
  localStorage.setItem('checkboxSettings', JSON.stringify({}))
}

if(nationID != null){
  $('#nationid').val(nationID);
}
if(allianceID != null){
  $('#allianceid').val(allianceID); 
}
if(apiKey != null){
  $('#apikey').val(apiKey);
}

if(localEnabledSettings != null){
  for(let setting in localEnabledSettings) {
    checkboxes.forEach(checkbox => {
      if(checkbox.getAttribute("value") == setting) {
        checkbox.checked = localEnabledSettings[setting];
      }
    })
  }
}

$(document).ready(function() {
  $('.js-example-basic-single').select2();
});


document.querySelector("input").addEventListener("keydown", function(event) {
    if (event.which === 69) {
      event.preventDefault();
    }
  });

// Select all checkboxes with the name 'settings' using querySelectorAll.
let enabledSettings = {}

checkboxes.forEach(checkbox => {
  checkbox.addEventListener("click", function(){
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

function TableAppend(nation_id, alliance_id, bankValue, data){
  function titleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  var BankRecordsHTML = 
  `
  <table id="example" class="display">
    <thead>
        <tr>
            <th>Date</th>
            <th>Sender ID</th>
            <th>Receiver ID</th>
            <th>Note</th>
            <th>Banker</th>
            <th>Money</th>
            <th>Food</th>
            <th>Coal</th>
            <th>Oil</th>
            <th>Uranium</th>
            <th>Lead</th>
            <th>Iron</th>
            <th>Bauxite</th>
            <th>Gasoline</th>
            <th>Munitons</th>
            <th>Steel</th>
            <th>Aluminum</th>
        </tr>
    </thead>
    <tbody>
  `

  for(let x = 0; x < data.data.length; x++){
    BankRecordsHTML += 
    `
    <tr>
      <td>${data.data[x].tx_datetime}</td>
      <td>${data.data[x].sender_id}</td>
      <td>${data.data[x].receiver_id}</td>
      <td>${titleCase(data.data[x].note)}</td>
      <td>${data.data[x].banker_nation_id}</td>
      <td>${data.data[x].money}</td>
      <td>${data.data[x].food}</td>
      <td>${data.data[x].coal}</td>
      <td>${data.data[x].oil}</td>
      <td>${data.data[x].uranium}</td>
      <td>${data.data[x].lead}</td>
      <td>${data.data[x].iron}</td>
      <td>${data.data[x].bauxite}</td>
      <td>${data.data[x].gasoline}</td>
      <td>${data.data[x].munitions}</td>
      <td>${data.data[x].steel}</td>
      <td>${data.data[x].aluminum}</td>
    </tr>
    `
  }

  BankRecordsHTML += 
  `
  </tbody>
    <tfoot>
      <tr>
         <th>Date</th>
          <th>Sender ID</th>
          <th>Receiver ID</th>
          <th>Note</th>
          <th>Banker</th>
          <th>Money</th>
          <th>Food</th>
          <th>Coal</th>
          <th>Oil</th>
          <th>Uranium</th>
          <th>Lead</th>
          <th>Iron</th>
          <th>Bauxite</th>
          <th>Gasoline</th>
          <th>Munitons</th>
          <th>Steel</th>
          <th>Aluminum</th>
      </tr>
    </tfoot>
  </table>
  `

  return tableValue = `
  <div id="tableDiv">
    <h3 class="pt-3 pb-2">Results: </h3>
    <table class="table table-hover pt-3">
      <thead>
        <tr>
          <th scope="col">Nation ID</th>
          <th scope="col">Alliance ID</th>
          <th scope="col">Money</th>
          <th scope="col">Coal</th>
          <th scope="col">Oil</th>
          <th scope="col">Uranium</th>
          <th scope="col">Iron</th>
          <th scope="col">Bauxite</th>
          <th scope="col">Lead</th>
          <th scope="col">Gasoline</th>
          <th scope="col">Muniton</th>
          <th scope="col">Steel</th>
          <th scope="col">Aluminum</th>
          <th scope="col">Food</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">${nation_id}</th>
          <td>${alliance_id}</td>
          <td>${resources.money}</td>
          <td>${resources.coal}</td>
          <td>${bankValue.oil}</td>
          <td>${bankValue.uranium}</td>
          <td>${bankValue.iron}</td>
          <td>${bankValue.bauxite}</td>
          <td>${bankValue.lead}</td>
          <td>${bankValue.gasoline}</td>
          <td>${bankValue.muniton}</td>
          <td>${bankValue.steel}</td>
          <td>${bankValue.aluminum}</td>
          <td>${bankValue.food}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div id="bankTable">
  <h3 class="pt-3 pb-2">All bank transactions: </h3>
    ${BankRecordsHTML}
  </div>
    `
}

// On submit
$(document).on('submit', '#bank-form', function () {
    $('#btn-submit').addClass('d-none');
    $('.spinner-grow').removeClass('d-none');
    $('#tableDiv').remove();
    $('#bankTable').remove();

    //Overwrite default values
    input_nation_id = $('#nationid').val();
    input_alliance_id = document.getElementById('allianceid').value;
    input_apiKey = $('#apikey').val();
    
    let digitRegex = /^\d+$/;

    if(digitRegex.test(input_nation_id)){
        nation_id = input_nation_id
    }
    if(digitRegex.test(input_alliance_id)){
        alliance_id = input_alliance_id
    }
    if(input_apiKey != ''){
        apiKey = input_apiKey
    }

    enabledSettings = JSON.parse(localStorage.getItem('checkboxSettings'))
    
    for(let setting in enabledSettings){
      if(setting=='nationID'){
        localStorage.setItem('nationID', nation_id);
      }
      else if(setting=='allianceID'){
        localStorage.setItem('allianceID', alliance_id);
      }
      else if(enabledSettings[setting]=='apiKey' && input_apiKey!= ''){
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
        for(let x = 0; x < data.data.length; x++){
            //nation is the receiver, alliance is sender
            if(data.data[x].receiver_id == nation_id && data.data[x].sender_id == alliance_id){
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
            else if(data.data[x].sender_id == nation_id && data.data[x].receiver_id == alliance_id){
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

            for(let resource in resources) {
              resources[resource] = Math.round(resources[resource]  * 100) / 100
            }
        }
        //Positive means nations owe debt to alliance, vice versa
        // $('#bank-records-main').addClass('d-none');
            $('.spinner-grow').addClass('d-none');
            $('#btn-submit').removeClass('d-none');
            $( "#container-main" ).append($(TableAppend(nation_id, alliance_id, resources, data)));

            $(document).ready(function() {
              $('#example').DataTable();
          } );
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    
    
});

