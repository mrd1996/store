var Sales = module.exports;
const axios = require("axios");
var Users = require("../controllers/users");

function normalize(r) {
  return r.results.bindings.map(o => {
    var novo = {};
    for (let [k, v] of Object.entries(o)) {
      novo[k] = v.value;
    }
    return novo;
  });
}

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX : <http://prc.di.uminho.pt/steamGames#>
`;

var getLink = "http://localhost:7200/repositories/test" + "?query=";
var postLink =
  "http://localhost:7200/repositories/test/statements" + "?update=";

async function getTotalGames() {
  var query = `select (count(?g) as ?total) where {
        ?s a :Sale.
    	?s :isSaleOf ?g.
}`;
  var encoded = encodeURIComponent(prefixes + query);

  try {
    var response = await axios.get(getLink + encoded);
    return Number(normalize(response.data)[0].total);
  } catch (e) {
    throw e;
  }
}

Sales.getSaleGames = async function (limit = 25, page = 0, userId) {
  page -= 1;
  if (page == -1) page = 0;

  var query = `select ?id ?name ?desc ?price ?rating ?rdate ?image ?trophys ?avgPlayTime ?site ?salePrice ?discount where {
        ?g a :Game.
    	?g :hasSale ?s .
        bind(strafter(str(?g), 'steamGames#') AS ?id).
        ?g :name ?name.
        ?g :description ?desc.
        ?g :price ?price.
        ?g :rating ?rating.
        ?g :releaseDate ?rdate.
        ?g :image ?image.
        ?g :achievements ?trophys.
        ?g :averagePlaytime ?avgPlayTime.
        optional {
            ?g :website ?site.
        }
    optional {
        ?g :hasSale ?sale.
        ?sale :salePrice ?salePrice.
        ?sale :discount ?discount.
    }
}
    orderby DESC(?rdate)
    limit ${limit}
    offset ${page * limit}`;

  var encoded = encodeURIComponent(prefixes + query);

  try {
    var response = await axios.get(getLink + encoded);

    var gameList = normalize(response.data);
    var lib = await Users.getUserLibrary(userId);
    var wish = await Users.getUserWishlist(userId);
    var libGames = [];
    var wishGames = [];

    for (game of lib) libGames.push(game.id);

    for (game of wish) wishGames.push(game.id);

    for (var i = 0; i < gameList.length; i++) {
      if (libGames.includes(gameList[i].id)) gameList[i].inLibrary = "1";

      if (wishGames.includes(gameList[i].id)) gameList[i].inWishlist = "1";
    }

    let total = await getTotalGames();
    return { total, data: gameList };
  } catch (e) {
    throw e;
  }
};

Sales.removeSales = async function () {
  var query = `DELETE WHERE
    {
       ?s a :Sale.
       ?s :isSaleOf ?g.
       ?g :hasSale ?s.

    }`;
  var encoded = encodeURIComponent(prefixes + query);
  try {
    await axios.post(postLink + encoded);
  } catch (e) {
    throw e;
  }
};

Sales.insert = async function (game) {
  let appid = Object.keys(game)[0];
  var query = `
    DELETE WHERE{
        :g_${appid} :price ?p
    }
    ;
    INSERT DATA{
        :s_${appid} rdf:type owl:NamedIndividual;
                    rdf:type :Sale;
                    :salePrice "${game[appid].price.replace(
                      "€",
                      ""
                    )}"^^xsd:float ;
                    :discount "${game[appid].discount}".

         :g_${appid} :hasSale :s_${appid}.
         :g_${appid} :price "${game[appid].oldprice.replace(
    "€",
    ""
  )}"^^xsd:float.
 }`;
  var encoded = encodeURIComponent(prefixes + query);
  try {
    await axios.post(postLink + encoded);
  } catch (e) {
    throw e;
  }
};
