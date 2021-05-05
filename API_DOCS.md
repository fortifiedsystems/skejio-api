First create Artist Users

Second create Manager User,
- need artistId

Tour (contains tourdates);
- name of the tour
- id of the artist


Tourdates can be added to a tour
- on the front, query the ticketmaster api but send only the venueId back with the request.
- {
    "date": "2021-10-10",
    "venueId": "KovZpZA7AAEA" (from ticket master),
    "artist": [artistId],
    "tour": [tourId]
}

Thread 
- Tourdates have Thread reference which is an array of refs to threads.
- {
    "author": [will be the current user],
    "tourdate": [tourdateId],
    "content": [content of the comment],
}

Comment
- Threads have comment array which is an array of refs to comments.
- {
    "thread": "609018236a490c6a3242c7b7",
    "content": "Here's a comment",
    "artist": "5fce655ed0456686b4d4dc2e"
}

Todos
- need tourdate to create a todo
- {
    "user": [userId],
    "tourdate": [tourdateId],
    "content": [written content of the todo],
    "dueDate": "2020-12-15T17:24:46.526+00:00",
    "artist": [artistId],
    "createdBy": [userId]
}


Report
- You have to have a tourdate
- and the date attached to that tourdate has to have passed.
- {
    "deal": "guarantee", [must be 'guarantee', 'guarantee vs', 'percentage', 'bar cut', 'other']
    "eventType": "cover", [must be 'ticketed', 'cover charge', 'free']
    "tixAvail": [amount of tickets available],
    "tixSold": [amount of tickets sold],
    "tixPrice": [ticket price],
    "guarantee": [guarantee amount not required],
    "comps": [ number of guests],
    "compsAttended": [number of guests on guest list that actually attended],
    "paidAttendance": [number of guests who paid AND attended (different from tixSold)],
    "totalMerchSales": [gross amount made off of sales of artist merchandise (shirts, hats, mugs)],
    "barTotal": [total made at the bar],
    "venueRateOnMerch": [the cut that the venue takes of merch sales],
    "notes": [notes about the show from the artist]
}

Company
- only manager can create Mgmt
- only agent can create agency
- keeps track of artists and employees for both.
