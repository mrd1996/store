var Users = module.exports
const axios = require('axios')
var Games = require("../controllers/games")

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

var postLink = "http://localhost:7200/repositories/test/statements" + "?update=" 

Users.getUser = async function(id){
    var query = `select ?email ?username ?password where {
        ?u a :User.
    	?u :id "${id}".
        ?u :email ?email.
        ?u :password ?password.
        ?u :username ?username.
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

Users.getUserByEmail = async function(email){
    var query = `select ?id ?username ?password where {
        ?u a :User.
        ?u :email "${email}".
    	?u :username ?username.
        ?u :password ?password.
    	?u :id ?id.
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

Users.getUserWishlist = async function(id){
    var query = `select ?id ?name ?desc ?price ?rating ?rdate ?trophys ?avgPlayTime ?image ?site ?salePrice ?discount where {
        ?u a :User.
    	?u :id "${id}".
        ?u :wishes ?g.
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

        for (var i = 0; i < gameList.length; i++) {
            var categories = await Games.getGameCategories(gameList[i].id)
            var genres = await Games.getGameGenres(gameList[i].id)
            gameList[i].categories = categories
            gameList[i].genres = genres    
        }  
        return gameList
    }
    catch(e){
        throw(e)
    } 
}

Users.getWishlistSales = async function(id){
    var query = `select ?id ?name ?desc ?price ?rating ?rdate ?trophys ?avgPlayTime ?image ?site ?salePrice ?discount where {
        ?u a :User.
    	?u :id "${id}".
        ?u :wishes ?g.
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
        ?g :hasSale ?sale.
        ?sale :salePrice ?salePrice.
        ?sale :discount ?discount.
}` 
    var encoded = encodeURIComponent(prefixes + query)
    try{
        var response = await axios.get(getLink + encoded)
        var gameList = normalize(response.data)

        for (var i = 0; i < gameList.length; i++) {
            var categories = await Games.getGameCategories(gameList[i].id)
            var genres = await Games.getGameGenres(gameList[i].id)
            gameList[i].categories = categories
            gameList[i].genres = genres    
        }  
        return gameList
    }
    catch(e){
        throw(e)
    } 
}

Users.getUserLibrary = async function(id){
    var query = `select ?id ?name ?desc ?price ?rating ?rdate ?trophys ?avgPlayTime ?image ?site ?salePrice ?discount where {
        ?u a :User.
    	?u :id "${id}".
    	?u :owns ?g.
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

        for (var i = 0; i < gameList.length; i++) {
            var categories = await Games.getGameCategories(gameList[i].id)
            var genres = await Games.getGameGenres(gameList[i].id)
            gameList[i].categories = categories
            gameList[i].genres = genres    
        }  
        return gameList
    }
    catch(e){
        throw(e)
    } 
}

Users.insertWishlist = async function(id,game){
    var query = `INSERT DATA
    {
       :u_${id} :wishes <http://prc.di.uminho.pt/steamGames#${game}>.
    }` 
    var encoded = encodeURIComponent(prefixes + query)
    try{
        await axios.post(postLink + encoded)
    }
    catch(e){
        throw(e)
    } 
}

Users.removeWishlist = async function(id,game){
    var query = `DELETE WHERE
    {
       :u_${id} :wishes <http://prc.di.uminho.pt/steamGames#${game}>.
    }` 
    var encoded = encodeURIComponent(prefixes + query)
    try{
        await axios.post(postLink + encoded)
    }
    catch(e){
        throw(e)
    } 
}

Users.insertLibrary = async function(id,game){
    var query = `INSERT DATA
    {
       :u_${id} :owns <http://prc.di.uminho.pt/steamGames#${game}>.
    }` 
    var encoded = encodeURIComponent(prefixes + query)
    try{
        await axios.post(postLink + encoded)
    }
    catch(e){
        throw(e)
    } 
}

Users.removeLibrary = async function(id,game){
    var query = `DELETE WHERE
    {
       :u_${id} :owns <http://prc.di.uminho.pt/steamGames#${game}>.
    }` 
    var encoded = encodeURIComponent(prefixes + query)
    try{
        await axios.post(postLink + encoded)
    }
    catch(e){
        throw(e)
    } 
}

Users.insert = async function(user){
    var query = `INSERT DATA
    {
       :u_${user.id} rdf:type owl:NamedIndividual;
                   rdf:type :User;
                   :id "${user.id}" ;
                   :email "${user.email}" ; 
                   :password "${user.password}" ; 
                   :username "${user.username}" .
    }` 
    var encoded = encodeURIComponent(prefixes + query)
    try{
        await axios.post(postLink + encoded)
    }
    catch(e){
        throw(e)
    } 
}



