fetch(`https://run.mocky.io/v3/4e2c973a-93bf-49c7-8e34-9671fc53df5f`, {
    method: 'GET',
    })

    .then(response => response.json())
    .then(data => {
        var stringValue = `<option value="" disabled selected>Choose your alliance</option>`
        for(var x = 0; x < data.alliances.length; x++){
            stringValue += `<option value="${data.alliances[x].id}">${data.alliances[x].name}</option>`
        }
        console.log(stringValue);
    })