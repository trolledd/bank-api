
  /*       for (let y = 0; y < bankTransaction[y].length; y++) {
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
        }
        //Positive means nations owe debt to alliance, vice versa
        // $('#bank-records-main').addClass('d-none');
        $('.spinner-grow').addClass('d-none');
        $('#btn-submit').removeClass('d-none');
        $("#container-main").append();
  
        $(document).ready(function () {
          $('#example').DataTable();
        }); */
    /* async function getAllianceMemberCount() {
      fetch(`https://pnw-bankapi.herokuapp.com/noOfMembers/allianceid=${alliance_id}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          var nationList = [];
          for (let x = 0; x < data.data.length; x++) {
            nationList.push(data.data[x].nation_id);
          }
          return nationList
        })
        .then(function (result) {
          getTransaction(result);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    
    async function getTransaction(result) {
      let x = 0;
      let y = 0;
      var callAPIInterval = setInterval(() => {
        for (i = 0; i < 5; i++, x++) {
          if (x == result.length) {
            clearInterval(callAPIInterval);
            break;
          } else {
            fetch(`https://pnw-bankapi.herokuapp.com/memberAndAlliance/nationid=${result[x]}`, {
              method: 'GET',
            })
              .then(response => response.json())
              .then(data => {
                var nationObj = {}
                nationObj[result[y]] = data
                bankTransaction.push(nationObj)
                y++;
                return bankTransaction
              })
          }
        }
      }, 2000);
    }
    
     */
    
      /* 
            .then((results) => {
          for (let x = 0; x < bankTransaction[x].length; x++) {
          var bankObj = {}
          bankObj[Object.keys(bankTransaction)[x]] = {
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
          console.log(resources)
    
            for (let y = 0; y < bankTransaction[x].data.data.length; y++) {
              //nation is the receiver, alliance is sender
              if (data.data[y].receiver_id == nation_id && data.data[y].sender_id == alliance_id) {
                //[money, coal, oil, uranium, iron, bauxite, lead, gasoline, muniton, steel, aluminum, food]
                resources.money += data.data[y].money;
                resources.coal += data.data[y].coal;
                resources.oil += data.data[y].oil;
                resources.uranium += data.data[y].uranium;
                resources.iron += data.data[y].iron;
                resources.bauxite += data.data[y].bauxite;
                resources.lead += data.data[y].lead;
                resources.gasoline += data.data[y].gasoline;
                resources.muniton += data.data[y].munitions;
                resources.steel += data.data[y].steel;
                resources.aluminum += data.data[y].aluminum;
                resources.food += data.data[y].food;
              }
              //nation is sender, alliance is receiver
              else if (data.data[y].sender_id == nation_id && data.data[y].receiver_id == alliance_id) {
                resources.money -= data.data[y].money;
                resources.coal -= data.data[y].coal;
                resources.oil -= data.data[y].oil;
                resources.uranium -= data.data[y].uranium;
                resources.iron -= data.data[y].iron;
                resources.bauxite -= data.data[y].bauxite;
                resources.lead -= data.data[y].lead;
                resources.gasoline -= data.data[y].gasoline;
                resources.muniton -= data.data[y].munitions;
                resources.steel -= data.data[y].steel;
                resources.aluminum -= data.data[y].aluminum;
                resources.food -= data.data[y].food;
              }
    
              for (let resource in resources) {
                resources[resource] = Math.round(resources[resource] * 100) / 100
              }
            }
          }
            $('#bank-records-main').addClass('d-none');
            $('.spinner-grow').addClass('d-none');
            $('#btn-submit').removeClass('d-none');
            $("#container-main").append();
        })
        
        */

        
let bankTransactAppendEach = function (resourcesObject) {
  bankTransactHTML =
    `
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
  `
  for (let y = 0; y < resourcesObject.length; y++) {
    let key = Object.keys(resourcesObject[y])
    bankTransactHTML +=
      `
    <tr>
          <th scope="row">${key}</th>
          <td>${alliance_id}</td>
          <td>${resourcesObject[y][key].money}</td>
          <td>${resourcesObject[y][key].coal}</td>
          <td>${resourcesObject[y][key].oil}</td>
          <td>${resourcesObject[y][key].uranium}</td>
          <td>${resourcesObject[y][key].iron}</td>
          <td>${resourcesObject[y][key].bauxite}</td>
          <td>${resourcesObject[y][key].lead}</td>
          <td>${resourcesObject[y][key].gasoline}</td>
          <td>${resourcesObject[y][key].muniton}</td>
          <td>${resourcesObject[y][key].steel}</td>
          <td>${resourcesObject[y][key].aluminum}</td>
          <td>${resourcesObject[y][key].food}</td>
        </tr>
    `
  }


  bankTransactHTML +=
    `
  </tbody>
  </table>
</div>
  `
  return bankTransactHTML;
}

let bankTransactAppend = function (resourcesObject) {
  return new Promise(async (resolve, reject) => {
    await bankTransactAppendEach(resourcesObject);
    resolve(bankTransactHTML);
  })
}


        /* bankTransactAppend(resources)
          .then((result) => {
            $("#container-main").append($(result));
            
            // console.log(result)
          }) */