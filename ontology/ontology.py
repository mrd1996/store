import pandas as pd
import re


globalCsv = pd.read_csv("data/steam.csv")

ttl = open("test.ttl", "w")
publishers = set()
developers = set()
genres = set()
categories = set()

regex = r"[\s.'&/,()°\[\]@!®+*{}?△○□×©\"–=•|∞▲$`’%#§“”♂]"
name = r"\""
for entry in globalCsv.itertuples():

    ########################### GAME ###########################
    ttl.write("###  http://prc.di.uminho.pt/steamGames#g_" + str(entry.appid) + "\n")
    ttl.write(" :g_" + str(entry.appid) + " rdf:type owl:NamedIndividual ,\n")
    ttl.write("\t\t\t\t:Game ;\n")

    # categories
    for ctg in entry.categories.split(";"):
        categories.add(ctg)
        ttl.write("\t\t:hasCategory :ctg_" + re.sub(regex, r"", ctg) + " ;\n")

    # developers
    for dev in entry.developer.split(";"):
        developers.add(dev)
        ttl.write("\t\t:hasDeveloper :c_" + re.sub(regex, r"", dev) + " ;\n")

    # publishers
    for pub in entry.publisher.split(";"):
        publishers.add(pub)
        ttl.write("\t\t:hasPublisher :c_" + re.sub(regex, r"", pub) + " ;\n")

    # genres
    for gen in entry.genres.split(";"):
        genres.add(gen)
        ttl.write("\t\t:hasGenre :gnr_" + re.sub(regex, r"", gen) + " ;\n")

    # platforms
    for plat in entry.platforms.split(";"):
        ttl.write("\t\t:hasPlatform :plt_" + plat + " ;\n")

    # nº achievements
    ttl.write('\t\t:achievements "' + str(entry.achievements) + '"^^xsd:float ;\n')

    # playtime
    ttl.write(
        '\t\t:averagePlaytime "' + str(entry.average_playtime) + '"^^xsd:float ;\n'
    )

    # description
    if type(entry.short_description) is str:
        ttl.write(
            '\t\t:description "'
            + re.sub(r"\"", r"", entry.short_description)
            + '"^^xsd:string ;\n'
        )

    # image
    if type(entry.header_image) is str:
        ttl.write('\t\t:image "' + entry.header_image + '"^^xsd:string ;\n')

    # price
    ttl.write('\t\t:price "' + str(entry.price) + '"^^xsd:float ;\n')

    # rating
    rate = entry.positive_ratings - entry.negative_ratings
    ttl.write('\t\t:rating "' + str(rate) + '"^^xsd:float ;\n')

    # releaseDate
    ttl.write('\t\t:releaseDate "' + entry.release_date + '"^^xsd:string ;\n')

    # website
    if type(entry.website) is str:
        ttl.write('\t\t:website "' + entry.website + '"^^xsd:string ;\n')

    # name
    ttl.write('\t\t:name "' + re.sub(name, r"", entry.name) + '"^^xsd:string .\n\n')

    ############################################################


intersection = publishers.intersection(developers)

ttl.write(
    "#########################################\n### Companies (Developer + Publisher)\n#########################################\n\n"
)

for c in intersection:
    publishers.remove(c)
    developers.remove(c)
    ttl.write(f'### http://prc.di.uminho.pt/steamGames#c_{re.sub(regex,r"",c)}\n')
    ttl.write(
        f':c_{re.sub(regex,r"",c)} rdf:type owl:NamedIndividual ,\n\t\t\t:Company ,\n\t\t\t:Developer ,\n\t\t\t:Publisher;\n'
    )
    ttl.write(f'\t\t:name "{re.sub(name,r"",c)}"^^xsd:string .\n\n')

ttl.write(
    "#########################################\n### Companies (Publisher)\n#########################################\n\n"
)

for c in publishers:
    ttl.write(f'### http://prc.di.uminho.pt/steamGames#c_{re.sub(regex,r"",c)}\n')
    ttl.write(
        f':c_{re.sub(regex,r"",c)} rdf:type owl:NamedIndividual ,\n\t\t\t:Company ,\n\t\t\t:Publisher;\n'
    )
    ttl.write(f'\t\t:name "{re.sub(name,r"",c)}"^^xsd:string .\n\n')


ttl.write(
    "#########################################\n### Companies (Developer)\n#########################################\n\n"
)

for c in developers:
    ttl.write(f'### http://prc.di.uminho.pt/steamGames#c_{re.sub(regex,r"",c)}\n')
    ttl.write(
        f':c_{re.sub(regex,r"",c)} rdf:type owl:NamedIndividual ,\n\t\t\t:Company ,\n\t\t\t:Developer;\n'
    )
    ttl.write(f'\t\t:name "{re.sub(name,r"",c)}"^^xsd:string .\n\n')


ttl.write(
    "#########################################\n### Genres\n#########################################\n\n"
)

for g in genres:
    ttl.write(f'###  http://prc.di.uminho.pt/steamGames#gnr_{re.sub(regex,r"",g)}\n')
    ttl.write(
        f':gnr_{re.sub(regex,r"",g)} rdf:type owl:NamedIndividual ,\n\t\t\t:Genre ;\n'
    )
    ttl.write(f'\t\t:name "{re.sub(name,r"",g)}"^^xsd:string .\n\n')

ttl.write(
    "#########################################\n### Categories\n#########################################\n\n"
)

for cat in categories:
    ttl.write(f'###  http://prc.di.uminho.pt/steamGames#ctg_{re.sub(regex,r"",cat)}\n')
    ttl.write(
        f':ctg_{re.sub(regex,r"",cat)} rdf:type owl:NamedIndividual ,\n\t\t\t:Category ;\n'
    )
    ttl.write(f'\t\t:name "{re.sub(name,r"",cat)}"^^xsd:string .\n\n')


ttl.close()
