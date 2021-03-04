      $("#container-main").append($(TableAppend(nation_id, alliance_id, resources, data)));

      $(document).ready(function () {
        $('#example').DataTable();
      });

      function TableAppend(nation_id, alliance_id, bankValue, data) {
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
      
        for (let x = 0; x < data.data.length; x++) {
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