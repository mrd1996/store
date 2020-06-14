var Devs = module.exports
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

Devs.getDevsList = async function(limit = 25, page = 0){
    page-=1;
    if (page == -1) page = 0;
    var query = `select ?dev where {
        ?d a :Developer.
        ?d :name ?dev.
}
  limit ${limit}
  offset ${page*limit}
`
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return normalize(response.data)
    }
    catch(e){
        throw(e)
    }
}

Devs.getDevGames = async function(idDev){

    var query = `select ?dev ?name ?desc ?price ?rating ?rdate ?trophys ?avgPlayTime ?image ?site ?salePrice ?discount where {
        ?d a :Developer.
        bind(strafter(str(?d), 'steamGames#') AS ?dev).
        FILTER(?dev = "${idDev}").
        ?d :isDeveloperOf ?g.
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
    optional{
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