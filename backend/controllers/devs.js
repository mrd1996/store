var Devs = module.exports;
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

Devs.getDevsList = async function (limit = 25, page = 0) {
  page -= 1;
  if (page == -1) page = 0;
  var query = `select distinct ?id ?dev where {
        ?d a :Developer.
        bind(strafter(str(?d), 'steamGames#') AS ?id).
        ?d :name ?dev.
}
  limit ${limit}
  offset ${page * limit}
`;
  var encoded = encodeURIComponent(prefixes + query);

  try {
    var response = await axios.get(getLink + encoded);
    let total = await getTotalDevs();
    let devList = normalize(response.data);
    return { total, data: devList };
  } catch (e) {
    throw e;
  }
};

async function getTotalGames(idDev) {
  var query = `select (count(?g) as ?total) where {
        ?d a :Developer.
        bind(strafter(str(?d), 'steamGames#') AS ?dev).
        FILTER(?dev = "${idDev}").
        ?d :isDeveloperOf ?g.
}`;
  var encoded = encodeURIComponent(prefixes + query);

  try {
    var response = await axios.get(getLink + encoded);
    return Number(normalize(response.data)[0].total);
  } catch (e) {
    throw e;
  }
}

async function getTotalDevs() {
  var query = `select distinct (count(?id) as ?total) where {
        ?d a :Developer.
        bind(strafter(str(?d), 'steamGames#') AS ?id).
}`;
  var encoded = encodeURIComponent(prefixes + query);

  try {
    var response = await axios.get(getLink + encoded);
    return Number(normalize(response.data)[0].total);
  } catch (e) {
    throw e;
  }
}

Devs.getDevGames = async function (limit = 25, page = 0, idDev, userId) {
  page -= 1;
  if (page == -1) page = 0;

  var query = `select ?dev ?id ?name ?desc ?price ?rating ?rdate ?trophys ?avgPlayTime ?image ?site ?salePrice ?discount where {
        ?d a :Developer.
        bind(strafter(str(?d), 'steamGames#') AS ?dev).
        FILTER(?dev = "${idDev}").
        ?d :isDeveloperOf ?g.
        ?g :name ?name.
        bind(strafter(str(?g), 'steamGames#') AS ?id).
        ?g :description ?desc.
        ?g :price ?price.
        ?g :rating ?rating.
        ?g :releaseDate ?rdate.
        ?g :achievements ?trophys.
        ?g :averagePlaytime ?avgPlayTime.
        optional {
            ?g :image ?image.
        }
        optional {
            ?g :website ?site.
        }
    optional{
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

    let total = await getTotalGames(idDev);
    return { total, data: gameList };
  } catch (e) {
    throw e;
  }
};
