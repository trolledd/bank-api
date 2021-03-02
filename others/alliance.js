
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