import axios from "axios";

const API = "http://localhost:3000";

export function getGames(page = 1,limit = 25) {
    return axios.get(`${API}/games`, {params: {limit, page}})
    .then(({data}) => data);
}