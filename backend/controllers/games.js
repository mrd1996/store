var Games = module.exports
const axios = require('axios')
var Users = require("../controllers/users")

function normalize(r) {
    return r.results.bindings.map(o => {
        var novo = {}
        for (let [k, v] of Object.entries(o)) {
            novo[k] = v.value
        }
        return novo
    })
}

function normalizeID(r) {
    return r.results.bindings.map(o => {
        var novo = []
        for (let [k, v] of Object.entries(o)) {
            novo += v.value
        }
        return novo
    })
}

async function getTotalGames(category,genre) {

    var query = `select (count(*) as ?total) where {
        ?g a :Game.
    }`

    var query2 = `select (count(*) as ?total) where {
        ?g a :Game.
    	?g :hasCategory ?categ.
    	bind(strafter(str(?categ), 'steamGames#') AS ?catId).
    	FILTER(?catId = "${category}").
    	?g :hasGenre ?gen.
    	bind(strafter(str(?gen), 'steamGames#') AS ?genId).
    	FILTER(?genId = "${genre}").
    }`

    var query3 = `select (count(*) as ?total) where {
        ?g a :Game.
    	?g :hasCategory ?categ.
    	bind(strafter(str(?categ), 'steamGames#') AS ?catId).
    	FILTER(?catId = "${category}").
    }`

    var query4 = `select (count(*) as ?total) where {
        ?g a :Game.
    	?g :hasGenre ?gen.
    	bind(strafter(str(?gen), 'steamGames#') AS ?genId).
    	FILTER(?genId = "${genre}").
    }`

    if(category!="" && genre!="")
      var encoded = encodeURIComponent(prefixes + query2)
    else if (category!="")
      var encoded = encodeURIComponent(prefixes + query3)
    else if (genre!="")
      var encoded = encodeURIComponent(prefixes + query4)
    else
      var encoded = encodeURIComponent(prefixes + query)

    try {
        var response = await axios.get(getLink + encoded)
        return Number(normalize(response.data)[0].total);
    }
    catch (e) {
        throw (e)
    }
}

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX : <http://prc.di.uminho.pt/steamGames#>
`

var getLink = "http://localhost:7200/repositories/test" + "?query="


Games.getGamesList = async function (limit = 25, page = 0, category = "", genre = "", userId) {
    page -= 1;
    if (page == -1) page = 0;

    var query = `select ?id ?name ?desc ?price ?rating ?rdate ?image ?trophys ?avgPlayTime ?site (GROUP_CONCAT(distinct ?plat;SEPARATOR=",") AS ?platforms) ?salePrice ?discount where {
        ?g a :Game.
        bind(strafter(str(?g), 'steamGames#') AS ?id).
        ?g :name ?name.
        ?g :description ?desc.
        ?g :price ?price.
        ?g :rating ?rating.
        ?g :releaseDate ?rdate.
        ?g :image ?image.
        ?g :achievements ?trophys.
        ?g :averagePlaytime ?avgPlayTime.
        ?g :hasPlatform ?pla.
        ?pla :name ?plat.
        optional {
            ?g :website ?site.
        }
    optional {
        ?g :hasSale ?sale.
        ?sale :salePrice ?salePrice.
        ?sale :discount ?discount.
    }
} group by ?id ?name ?desc ?price ?rating ?rdate ?image ?trophys ?avgPlayTime ?site ?salePrice ?discount
  orderby DESC(?rdate)
  limit ${limit}
  offset ${page * limit}`

    var query2 = `select ?id ?name ?desc ?price ?rating ?rdate ?image ?trophys ?avgPlayTime ?site (GROUP_CONCAT(distinct ?plat;SEPARATOR=",") AS ?platforms) ?salePrice ?discount  where {
    ?g a :Game.
    bind(strafter(str(?g), 'steamGames#') AS ?id).
    ?g :hasCategory ?categ.
    bind(strafter(str(?categ), 'steamGames#') AS ?catId).
    FILTER(?catId = "${category}").
    ?g :hasGenre ?gen.
    bind(strafter(str(?gen), 'steamGames#') AS ?genId).
    FILTER(?genId = "${genre}").
    ?g :name ?name.
    ?g :description ?desc.
    ?g :price ?price.
    ?g :rating ?rating.
    ?g :releaseDate ?rdate.
    ?g :image ?image.
    ?g :achievements ?trophys.
    ?g :averagePlaytime ?avgPlayTime.
    ?g :hasPlatform ?pla.
    ?pla :name ?plat.
    optional {
        ?g :website ?site.
    }
optional {
    ?g :hasSale ?sale.
    ?sale :salePrice ?salePrice.
    ?sale :discount ?discount.
}
} group by ?id ?name ?desc ?price ?rating ?rdate ?image ?trophys ?avgPlayTime ?site ?salePrice ?discount
orderby DESC(?rdate)
limit ${limit}
offset ${page * limit}`

    var query3 = `select ?id ?name ?desc ?price ?rating ?rdate ?image ?trophys ?avgPlayTime ?site (GROUP_CONCAT(distinct ?plat;SEPARATOR=",") AS ?platforms) ?salePrice ?discount  where {
        ?g a :Game.
        bind(strafter(str(?g), 'steamGames#') AS ?id).
    	?g :hasCategory ?categ.
    	bind(strafter(str(?categ), 'steamGames#') AS ?catId).
        FILTER(?catId = "${category}").
        ?g :name ?name.
        ?g :description ?desc.
        ?g :price ?price.
        ?g :rating ?rating.
        ?g :releaseDate ?rdate.
        ?g :image ?image.
        ?g :achievements ?trophys.
        ?g :averagePlaytime ?avgPlayTime.
    	?g :hasPlatform ?pla.
    	?pla :name ?plat.
        optional {
            ?g :website ?site.
        }
    optional {
        ?g :hasSale ?sale.
        ?sale :salePrice ?salePrice.
        ?sale :discount ?discount.
    }
} group by ?id ?name ?desc ?price ?rating ?rdate ?image ?trophys ?avgPlayTime ?site ?salePrice ?discount
  orderby DESC(?rdate)
  limit ${limit}
  offset ${page * limit}`

    var query4 = `select ?id ?name ?desc ?price ?rating ?rdate ?image ?trophys ?avgPlayTime ?site (GROUP_CONCAT(distinct ?plat;SEPARATOR=",") AS ?platforms) ?salePrice ?discount  where {
    ?g a :Game.
    bind(strafter(str(?g), 'steamGames#') AS ?id).
    ?g :hasGenre ?gen.
    bind(strafter(str(?gen), 'steamGames#') AS ?genId).
    FILTER(?genId = "${genre}").
    ?g :name ?name.
    ?g :description ?desc.
    ?g :price ?price.
    ?g :rating ?rating.
    ?g :releaseDate ?rdate.
    ?g :image ?image.
    ?g :achievements ?trophys.
    ?g :averagePlaytime ?avgPlayTime.
    ?g :hasPlatform ?pla.
    ?pla :name ?plat.
    optional {
        ?g :website ?site.
    }
optional {
    ?g :hasSale ?sale.
    ?sale :salePrice ?salePrice.
    ?sale :discount ?discount.
}
} group by ?id ?name ?desc ?price ?rating ?rdate ?image ?trophys ?avgPlayTime ?site ?salePrice ?discount
  orderby DESC(?rdate)
  limit ${limit}
  offset ${page * limit}`

  if(category!="" && genre!="")
    var encoded = encodeURIComponent(prefixes + query2)
  else if (category!="")
    var encoded = encodeURIComponent(prefixes + query3)
  else if (genre!="")
    var encoded = encodeURIComponent(prefixes + query4)
  else
    var encoded = encodeURIComponent(prefixes + query)
    
    try {
        var response = await axios.get(getLink + encoded)

        var gameList = normalize(response.data)
        var lib = await Users.getUserLibrary(userId)
        var wish = await Users.getUserWishlist(userId)
        var libGames = []
        var wishGames = []

        for(game of lib)
            libGames.push(game.id)
                    
        for(game of wish)
            wishGames.push(game.id)

        for (var i = 0; i < gameList.length; i++) {
            if (libGames.includes(gameList[i].id)) 
              gameList[i].inLibrary = "1";
              
            if (wishGames.includes(gameList[i].id)) 
              gameList[i].inWishlist = "1";
            
            var data_plat = gameList[i].platforms.split(",")
            gameList[i].platforms = JSON.parse(JSON.stringify(data_plat));                            
        }

        let total = await getTotalGames(category,genre);
        return { total, data: gameList }
    }
    catch (e) {
        throw (e)
    }
}

Games.getGameCategories = async function (idGame) {
    var query = `select ?cat ?category where {
        ?g a :Game.
        bind(strafter(str(?g), 'steamGames#') AS ?id).
        FILTER(?id = "${idGame}").
        ?g :hasCategory ?c.
        bind(strafter(str(?c), 'steamGames#') AS ?cat).
        ?c :name ?category.
    }`
    var encoded = encodeURIComponent(prefixes + query)

    try {
        var response = await axios.get(getLink + encoded)
        return normalize(response.data)
    }
    catch (e) {
        throw (e)
    }
}

Games.getGamesId = async function () {
    var query = `select ?id where {
        ?g a :Game.
        bind(strafter(str(?g), 'steamGames#g_') AS ?id).
    }`
    var encoded = encodeURIComponent(prefixes + query)

    try {
        var response = await axios.get(getLink + encoded)
        return normalizeID(response.data)
    }
    catch (e) {
        throw (e)
    }
}

Games.getGameGenres = async function (idGame) {
    var query = `select ?gen ?genre where {
        ?g a :Game.
        bind(strafter(str(?g), 'steamGames#') AS ?id).
        FILTER(?id = "${idGame}").
        ?g :hasGenre ?gnr.
        bind(strafter(str(?gnr), 'steamGames#') AS ?gen).
        ?gnr :name ?genre.
    }`
    var encoded = encodeURIComponent(prefixes + query)

    try {
        var response = await axios.get(getLink + encoded)
        return normalize(response.data)
    }
    catch (e) {
        throw (e)
    }
}


Games.getGamePlatforms = async function (idGame) {
    var query = `select ?plt ?platform where {
        ?g a :Game.
        bind(strafter(str(?g), 'steamGames#') AS ?id).
        FILTER(?id = "${idGame}").
        ?g :hasPlatform ?p.
        bind(strafter(str(?p), 'steamGames#') AS ?plt).
        ?p :name ?platform.
    }`
    var encoded = encodeURIComponent(prefixes + query)

    try {
        var response = await axios.get(getLink + encoded)
        return normalize(response.data)
    }
    catch (e) {
        throw (e)
    }
}


Games.getGameDevs = async function (idGame) {
    var query = `select ?dev ?developer where {
        ?g a :Game.
        bind(strafter(str(?g), 'steamGames#') AS ?id).
        FILTER(?id = "${idGame}").
        ?g :hasDeveloper ?d.
        bind(strafter(str(?d), 'steamGames#') AS ?dev).
        ?d :name ?developer.
    }`
    var encoded = encodeURIComponent(prefixes + query)

    try {
        var response = await axios.get(getLink + encoded)
        return normalize(response.data)
    }
    catch (e) {
        throw (e)
    }
}

Games.getGamePubs = async function (idGame) {
    var query = `select ?pub ?publisher where {
        ?g a :Game.
        bind(strafter(str(?g), 'steamGames#') AS ?id).
        FILTER(?id = "${idGame}").
        ?g :hasPublisher ?p.
        bind(strafter(str(?p), 'steamGames#') AS ?pub).
        ?p :name ?publisher.
    }`
    var encoded = encodeURIComponent(prefixes + query)

    try {
        var response = await axios.get(getLink + encoded)
        return normalize(response.data)
    }
    catch (e) {
        throw (e)
    }
}

Games.getGameSale = async function (idGame) {
    var query = `select ?salePrice ?discount where {
        ?g a :Game.
        bind(strafter(str(?g), 'steamGames#') AS ?id).
        FILTER(?id = "${idGame}").
    optional {
        ?g :hasSale ?sale.
        ?sale :salePrice ?salePrice.
        ?sale :discount ?discount.
    }
}`
    var encoded = encodeURIComponent(prefixes + query)

    try {
        var response = await axios.get(getLink + encoded)
        return normalize(response.data)
    }
    catch (e) {
        throw (e)
    }
}

Games.getGameAtomic = async function (idGame) {
    var query = `select ?id ?name ?desc ?price ?rating ?rdate ?site ?image ?trophys ?avgPlayTime where {
        ?g a :Game.
        bind(strafter(str(?g), 'steamGames#') AS ?id).
        FILTER(?id = "${idGame}").
        ?g :name ?name.
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
    }`
    var encoded = encodeURIComponent(prefixes + query)
    try {
        var response = await axios.get(getLink + encoded)
        return normalize(response.data)
    }
    catch (e) {
        throw (e)
    }
}

Games.getGame = async function (idGame) {
    try {
        var atomic = await Games.getGameAtomic(idGame)
        var categories = await Games.getGameCategories(idGame)
        var genres = await Games.getGameGenres(idGame)
        var devs = await Games.getGameDevs(idGame)
        var pubs = await Games.getGamePubs(idGame)
        var platforms = await Games.getGamePlatforms(idGame)
        var sale = await Games.getGameSale(idGame)

        var game = {
            info: atomic[0],
            categories: categories,
            genres: genres,
            devs: devs,
            publishers: pubs,
            platforms: platforms,
            sale: sale
        }
        return game
    }
    catch (e) {
        throw (e)
    }
}