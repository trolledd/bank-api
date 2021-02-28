var money = 0, coal = 0, oil = 0, uranium = 0, iron = 0, bauxite = 0, lead = 0, gasoline = 0, muniton = 0, steel = 0, aluminum = 0, food = 0;
var bankValue = [money, coal, oil, uranium, iron, bauxite, lead, gasoline, muniton, steel, aluminum, food];
var nation_id = 72231;
var alliance_id = 4221;
var testURL = 'https://run.mocky.io/v3/9b97dca2-c97c-4979-9d84-a4d6fa9b8f1c';
var officialURL = `https://pnw-bankapi.herokuapp.com/memberAndAlliance/nationid=${nation_id}`;

$(document).ready(function() {
  $('.js-example-basic-single').select2();
});


document.querySelector("input").addEventListener("keydown", function(event) {
    if (event.which === 69) {
      event.preventDefault();
    }
  });

function TableAppend(nation_id, alliance_id, bankValue){
  return tableValue = `<table class="table table-hover">
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
      <td>${bankValue[0]}</td>
      <td>${bankValue[1]}</td>
      <td>${bankValue[2]}</td>
      <td>${bankValue[3]}</td>
      <td>${bankValue[4]}</td>
      <td>${bankValue[5]}</td>
      <td>${bankValue[6]}</td>
      <td>${bankValue[7]}</td>
      <td>${bankValue[8]}</td>
      <td>${bankValue[9]}</td>
      <td>${bankValue[10]}</td>
      <td>${bankValue[11]}</td>
    </tr>
  </tbody>
  </table>`
}

// On submit
$(document).on('submit', '#bank-form', function () {
    $('#btn-submit').addClass('d-none');
    $('.spinner-grow').removeClass('d-none');
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

    fetch(`https://pnw-bankapi.herokuapp.com/memberAndAlliance/nationid=${nation_id}`, {
        method: 'GET',
        })
    
        .then(response => response.json())
        .then(data => {
            
        for(var x = 0; x < data.data.length; x++){
            //nation is the receiver, alliance is sender
            if(data.data[x].receiver_id == nation_id && data.data[x].sender_id == alliance_id){
                bankValue[0] += data.data[x].money;
                bankValue[1]  += data.data[x].coal;
                bankValue[2]  += data.data[x].oil;
                bankValue[3]  += data.data[x].uranium;
                bankValue[4]  += data.data[x].iron;
                bankValue[5]  += data.data[x].bauxite;
                bankValue[6]  += data.data[x].lead;
                bankValue[7]  += data.data[x].gasoline;
                bankValue[8]  += data.data[x].munitions;
                bankValue[9]  += data.data[x].steel;
                bankValue[10]  += data.data[x].aluminum;
                bankValue[11]  += data.data[x].food;
            }
            //nation is sender, alliance is receiver
            else if(data.data[x].sender_id == nation_id && data.data[x].receiver_id == alliance_id){
                bankValue[0] -= data.data[x].money;
                bankValue[1] -= data.data[x].coal;
                bankValue[2] -= data.data[x].oil;
                bankValue[3] -= data.data[x].uranium;
                bankValue[4] -= data.data[x].iron;
                bankValue[5] -= data.data[x].bauxite;
                bankValue[6] -= data.data[x].lead;
                bankValue[7] -= data.data[x].gasoline;
                bankValue[8] -= data.data[x].munitions;
                bankValue[9] -= data.data[x].steel;
                bankValue[10] -= data.data[x].aluminum;
                bankValue[11] -= data.data[x].food;
            }

            for(let y = 0; y < bankValue.length; y++){
              bankValue[y] = Math.round(bankValue[y] * 100) / 100
            }
        }
        //Positive means nations owe debt to alliance, vice versa
        $('#bank-records-main').addClass('d-none');
            $('.spinner-grow').addClass('d-none');
            $('#btn-submit').removeClass('d-none');
            $( "#container-main" ).append($(TableAppend(nation_id, alliance_id, bankValue)));
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    
    
});

