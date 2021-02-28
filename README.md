# BANK-API
Bank-API is API tool for game Politics & War. It is a static website hosted on github pages. 

* Not very aesthetically pleasing landing page.
* A poorly made Bank API that currently allows singular search.

# Who uses this website?
Mainly for alliance leaders who intend to micro manage the alliance. Alliance members can utilise it so as to pay up potential debts.

# How it works?
Due to limitation of the P&W APIs (CORS not enabled by the administrator), this website is required to call the API indirectly.

This website -> backend server hosted on heroku (proxy) -> API page 

This website will make a fetch request to my backend server and after receiving the request, it will request for the API from P&W API Page. 

P&W API page will return requested information back to the backend server and the website will subsequently retrieve the information and process it.

Additionally, the **API key** will be stored in backend server [HEROKU as environment variables]
