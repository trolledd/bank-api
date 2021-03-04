const fetch = require("node-fetch");

alliance_id = 4221;
var bankTransaction = [];

function returnpromise(val) {
    return new Promise((resolve, reject) => {
      if (val > 5) {
        resolve("resolved"); // fulfilled
      } else {
        reject("rejected"); // rejected
      }
    });
  }
  
  //This is how you handle errors in await
  async function apicall() {
    try {
      console.log(await returnpromise(5))
    } catch (error) {
      console.log(error)
    }
  }
  
  async function apicall2() {
    let data = await returnpromise(2).catch((error) => {
      console.log(error)
    })
  }
  
  apicall2();
  apicall();