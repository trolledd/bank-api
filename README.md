# BANK-API
Bank-API is API tool for game Politics & War. It is a static website hosted on github pages. 

* Not very aesthetically pleasing landing page.
* A mediocrely-made Bank API that currently allows singular search.
* A mediocrely-made Alliance API that displays all debts owed by the alliance members.

# Who uses this website?
Mainly for alliance leaders who intend to micro manage the alliance. Alliance members can utilise it so as to pay up potential debts.

# How it works?
Due to limitation of the P&W APIs (CORS not enabled by the administrator), this website is required to call the API indirectly.

This website -> backend server hosted on heroku (proxy) -> API page 

This website will make a fetch request to my backend server and after receiving the request, it will request for the API from P&W API Page. 

P&W API page will return requested information back to the backend server and the website will subsequently retrieve the information and process it.

Additionally, the **API key** will be stored in backend server [HEROKU as environment variables]

# Behind the scenes
For a breakdown of the page **alliance bank records**, 
1) The user data is firstly either stored based on the user's preferences. [Storing of Alliance ID/API Key]
2) A fetch request will be made to retrieve the data of the members of the alliance. https://politicsandwar.com/api/v2/nations/info

![image](https://user-images.githubusercontent.com/62585987/109750814-10550a00-7c18-11eb-9452-168a812e7316.png)

3) After fetch request is being made and the data has been retrieved, the data is being inserted into nationList and to be returned as a Promise.
4) Subsequently, using the result [nationList], fetch request(s) is/are being made, depending on the number of members in the alliance.
5) As of now, I am using **Run Sequentially With Delay Between Each Request** method. https://stackoverflow.com/questions/61569652/how-to-make-multiple-api-calls-with-a-delay-between-each-in-node-js
6) After the Promise is fulfilled using Step 5, the data is being used and inserted into array.
7) A double for loop is being utilised, such that the **outer for loop** is to loop through each nation and the **inner for loop** is to loop through each nation's bank transactions.
8) ~After all the bank records have been loaded, another Promise is being made, and will wait for ALL values to be inserted into HTML table before the Promise is being resolved.~
