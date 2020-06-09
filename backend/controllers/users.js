var Users = module.exports
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

var postLink = "http://localhost:7200/repositories/test/statements" + "?update=" 

Users.getUser = async function(email){
    var query = `select ?username ?password where {
        ?u a :User.
        ?u :email "${email}".
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

Users.getUserByName = async function(username){
    var query = `select ?email ?password where {
        ?u a :User.
        ?u :username "${username}".
        ?u :email ?email.
        ?u :password ?password.
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

Users.insert = async function(user){
    var query = `INSERT DATA
    {
       :${user.username} rdf:type owl:NamedIndividual;
                   rdf:type :User;
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



