var Games = module.exports
const axios = require('axios')

function normalize(r){
    return r.results.bindings.map(o => {
        var novo = {}
        for (let [k, v] of Object.entries(o)) {
            novo[k] = v.value
          }
        return novo
    })
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


Games.getGamesList = async function(limit = 25, page = 0){
    page-=1;
    if (page == -1) page = 0;

    var query = `select ?id ?name ?desc ?price ?rating ?rdate ?salePrice ?discount where {
        ?g a :Game.
        bind(strafter(str(?g), 'steamGames#') AS ?id).
        ?g :name ?name.
        ?g :price ?price.
        ?g :rating ?rating.
        ?g :releaseDate ?rdate.
    optional {
        ?g :hasSale ?sale.
        ?sale :salePrice ?salePrice.
        ?sale :discount ?discount.
    }
}
  orderby DESC(?rdate)
  limit ${limit}
  offset ${page*limit}`
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return normalize(response.data)
    }
    catch(e){
        throw(e)
    }
}

Games.getGameCategories = async function(idGame){
    var query = `select ?category where {
        ?g a :Game.
        bind(strafter(str(?g), 'steamGames#') AS ?id).
        FILTER(?id = "${idGame}").
        ?g :hasCategory ?cat.
        ?cat :name ?category.
    }`
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return normalize(response.data)
    }
    catch(e){
        throw(e)
    }
}

Games.getGameGenres = async function(idGame){
    var query = `select ?genres where {
        ?g a :Game.
        bind(strafter(str(?g), 'steamGames#') AS ?id).
        FILTER(?id = "${idGame}").
        ?g :hasGenre ?gen.
        ?gen :name ?genres.
    }`
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return normalize(response.data)
    }
    catch(e){
        throw(e)
    }
}


Games.getGamePlatforms = async function(idGame){
    var query = `select ?platforms where {
        ?g a :Game.
        bind(strafter(str(?g), 'steamGames#') AS ?id).
        FILTER(?id = "${idGame}").
        ?g :hasPlatform ?plt.
        ?plt :name ?platforms.
    }`
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return normalize(response.data)
    }
    catch(e){
        throw(e)
    }
}


Games.getGameDevs = async function(idGame){
    var query = `select ?devs where {
        ?g a :Game.
        bind(strafter(str(?g), 'steamGames#') AS ?id).
        FILTER(?id = "${idGame}").
        ?g :hasDeveloper ?dev.
        ?dev :name ?devs.
    }`
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return normalize(response.data)
    }
    catch(e){
        throw(e)
    }
}

Games.getGamePubs = async function(idGame){
    var query = `select ?pubs where {
        ?g a :Game.
        bind(strafter(str(?g), 'steamGames#') AS ?id).
        FILTER(?id = "${idGame}").
        ?g :hasPublisher ?pub.
        ?pub :name ?pubs.
    }`
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return normalize(response.data)
    }
    catch(e){
        throw(e)
    }
}

Games.getGameSale = async function(idGame){
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

    try{
        var response = await axios.get(getLink + encoded)
        return normalize(response.data)
    }
    catch(e){
        throw(e)
    }
}

Games.getGameAtomic = async function(idGame){
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
    try{
        var response = await axios.get(getLink + encoded)
        return normalize(response.data)
    }
    catch(e){
        throw(e)
    }
}

Games.getGame = async function(idGame){
    try{
        var atomic = await Games.getGameAtomic(idGame)
        var categories = await Games.getGameCategories(idGame)
        var genres = await Games.getGameGenres(idGame)
        var devs = await Games.getGameDevs(idGame)
        var pubs = await Games.getGamePubs(idGame)
        var platforms = await Games.getGamePlatforms(idGame)
        var sale = await Games.getGameSale(idGame)

        var game = {
            info : atomic[0],
            categories : categories,
            genres : genres,
            devs : devs,
            publishers : pubs,
            platforms : platforms,
            sale : sale
        }
        return game
    }
    catch(e){
        throw(e)
    }
}