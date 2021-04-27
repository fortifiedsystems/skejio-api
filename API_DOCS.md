* AUTH *

To register:

{
    "firstName": [String],
    "lastName": [String],
    "email": [String],
    "username": [String],
    "password": [String],
    "accountType": [String]
}

method: POST
endpoint: /api/v1/register

****************************************************************

To login: 

{
    email: [String]
    password: [String]
}

method: POST
endpoint: /api/v1/login

****************************************************************

Notes:
1. accountType can be "Manage", "Artist", "Agent", "Teammate"
2. See regex in utils/constants to get password requirements cuz i can't friggin remember.


================================================================


* TOURS *

To create a tour, send this in the body:

{
    "name": [String] name of the tour,
    "artist": [ArtistId] id of the artist you want to create the tour for
}

method: POST
endpoint: api/v1/tours

NOTE: creating a tour will automatically add it to the artists tour array

****************************************************************

To get access to one tour:

method: GET
endpoint: /api/v1/tours/[artistId]

****************************************************************

To get access to all tours for one artist:

requires a query in the url.

method: GET
endpoint: /api/v1/tours?artist=[artistId]

****************************************************************

To edit or delete a tour:

method: PUT, DELETE
endpoint: /api/v1/tours?artist=[tourId]

****************************************************************



================================================================







<div class="postman-run-button"
data-postman-action="collection/import"
data-postman-var-1="1f59c2c4370d5980d713"></div>
<script type="text/javascript">
  (function (p,o,s,t,m,a,n) {
    !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
    !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
      (n = o.createElement("script")),
      (n.id = s+t), (n.async = 1), (n.src = m), n
    ));
  }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
</script>