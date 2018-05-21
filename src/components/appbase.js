
const Appbase = require("appbase-js");

// Create appbase instance to use methods
const appbaseRef = new Appbase({
	url: "https://scalr.api.appbase.io",
	app: "evolumebr",
    credentials: "ehOVesXRe:1768a981-95c0-4ef0-b24f-af67f3ae744b"
});


var jsonObject = {
	category: 'Suporte de bike no teto',
	subcategory: 'Transbikes de teto',
	date_from: 20180410,
	date_to: 20180413,
	url: 'http://www.evolume.com.br/equipamento/rack/123',
	price: 110,
    contact: 'Jose Valdvogel',
    image: 'https://s3.us-east-2.amazonaws.com/evolumbreapp/b2.jpg'
}

/*
appbaseRef.index({
	type: "equipment",
	id: "X1",
	body: jsonObject
}).on('data', function(response) {
	console.log(response);
}).on('error', function(error) {
	console.log(error);
})

/*
// Search for matching documents in a type.
// Querying all data with match_all
appbaseRef.search({
	type: "equipment",
	body: {
	  query: {
	    match_all: {}
	  }
	}
}).on('data', response => {
  // Logging hits which contains all the data matched by query
	console.log("@search hits: ", JSON.stringify(response, null, '\t'));
}).on('error', error => {
	console.log("@search error:", error);
});

// Get or read data based on an `id`
appbaseRef.get({
	type: "listing",
	id: "H1"
}).on('data', response => {
	console.log("@get success: ", response);
}).on('error', error => {
	console.log("@get error:", error);
});

*/

