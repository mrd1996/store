import axios from "axios";

const API = "http://localhost:3000";

export function getGames(page = 1,limit = 25) {
    return axios.get(`${API}/games`, {params: {limit, page}})
    .then(({data}) => data);
}

export function register(username, email, password) {
    return axios.post(`${API}/users`, {username, email, password})
    .then(({data}) => data);
}

export function login(email, password) {
    return axios.post(`${API}/users/login`, {email, password})
    .then(({data}) => {console.log(data); return {token: data.token, uid: data.uid}});
}

export function getUser(id, token) {
    console.log(token);

    return axios.get(`${API}/users/${id}`, {headers: { Authorization: `Bearer ${token}` }})
    .then(({data}) => data);
}


export function wishlist(id, token) {
    console.log(token);

    return axios.get(`${API}/users/${id}/wishlist`, {headers: { Authorization: `Bearer ${token}` }})
    .then(({data}) => data);
}
