var Categorys = module.exports
const axios = require('axios')
var Users = require("../controllers/users")

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

Categorys.getCatList = async function(){
    
    var query = `select ?id ?categ where {
        ?g a :Category.
        bind(strafter(str(?g), 'steamGames#') AS ?id).
        ?g :name ?categ.	
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

Categorys.getCategGames = async function(idCateg, userId){
    
    var query = `select ?id ?name ?desc ?price ?rating ?rdate ?trophys ?avgPlayTime ?image ?site ?salePrice ?discount where {
        ?g a :Game.
    	?g :hasCategory ?categ.
    	bind(strafter(str(?categ), 'steamGames#') AS ?catId).
        FILTER(?catId = "${idCateg}").
        bind(strafter(str(?g), 'steamGames#') AS ?id).
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
    optional {
        ?g :hasSale ?sale.
        ?sale :salePrice ?salePrice.
        ?sale :discount ?discount.
    }
}` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
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
        }

        return gameList
    }
    catch(e){
        throw(e)
    } 
}
