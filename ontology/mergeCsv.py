import pandas as pd

finalCsv = pd.read_csv("data/steam.csv")


# IMAGE
imgCsv = pd.read_csv("data/steam_media_data.csv")[
    ["steam_appid", "header_image"]
].rename(columns={"steam_appid": "appid"})

finalCsv = pd.merge(finalCsv, imgCsv, on="appid", how="outer")

# DESCRIPTION
descCsv = pd.read_csv("data/steam_description_data.csv")[
    ["steam_appid", "short_description"]
].rename(columns={"steam_appid": "appid"})

finalCsv = pd.merge(finalCsv, descCsv, on="appid", how="outer")

# WEBSITE
siteCsv = pd.read_csv("data/steam_support_info.csv")[["steam_appid", "website"]].rename(
    columns={"steam_appid": "appid"}
)

finalCsv = pd.merge(finalCsv, siteCsv, on="appid", how="outer")

for c in finalCsv:
    print(c)

# REMOVER ENTRADAS SEM NOME
finalCsv = finalCsv[finalCsv["name"].notna()]

# ESCREVER PARA FICHEIRO
finalCsv.to_csv("data/steam.csv", index=False)
