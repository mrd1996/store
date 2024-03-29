import axios from "axios";

const API = "http://localhost:3000";

export function getSales(token, page = 1, limit = 25) {
  return axios
    .get(`${API}/sales`, {
      params: { limit, page },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data);
}

export function getGames(token, page = 1, limit = 25) {
  return axios
    .get(`${API}/games`, {
      params: { limit, page },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data);
}

export function getGamesV2(category, genres) {
  var qc = "category=";
  var qg = "genre=";
  if (category) {
    qc += category;
  }
  if (genres) {
    qg += genres;
  }
  return function(token, page = 1, limit = 25) {
    return axios
      .get(`${API}/games?${qc}&${qg}`, {
        params: { limit, page },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => data);
  };
}

export function getGamesFromCategory(category) {
  return function(token, page = 1, limit = 25) {
    return axios
      .get(`${API}/categorys/${category}`, {
        params: { limit, page },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => data);
  };
}

export function getGame(token, gameid) {
  return axios
    .get(`${API}/games/${gameid}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data);
}

export function getCategorys() {
  return axios.get(`${API}/categorys`).then(({ data }) => data);
}

export function getGenres() {
  return axios.get(`${API}/genres`).then(({ data }) => data);
}

export function getDevelopers(token, page = 1, limit = 25) {
  return axios
    .get(`${API}/devs`, {
      params: { limit, page },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data);
}

export function getPubs(token, page = 1, limit = 25) {
  return axios
    .get(`${API}/pubs`, {
      params: { limit, page },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data);
}

export function getDevGames(dev) {
  return function(token, page = 1, limit = 25) {
    return axios
      .get(`${API}/devs/${dev}`, {
        params: { limit, page },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => data);
  };
}

export function getPubGames(pub) {
  return function(token, page = 1, limit = 25) {
    return axios
      .get(`${API}/pubs/${pub}`, {
        params: { limit, page },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => data);
  };
}

export function register(username, email, password) {
  return axios
    .post(`${API}/users`, { username, email, password })
    .then(({ data }) => data);
}

export function login(email, password) {
  return axios
    .post(`${API}/users/login`, { email, password })
    .then(({ data }) => {
      return {
        token: data.token,
        uid: data.uid,
        username: data.username,
        email,
      };
    });
}

export function getUser(id, token) {
  console.log(token);

  return axios
    .get(`${API}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data);
}

export function wishlist(id, token) {
  return axios
    .get(`${API}/users/${id}/wishlist`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data);
}

export function library(id, token) {
  return axios
    .get(`${API}/users/${id}/library`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data);
}

export function addLib(id, token, gamesId) {
  return axios
    .post(
      `${API}/users/${id}/library`,
      { gamesId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then(({ data }) => data);
}

export function removeLib(id, token, gamesId) {
  return axios
    .delete(
      `${API}/users/${id}/library`,
      { data: { gamesId } },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then(({ data }) => data);
}

export function addWish(id, token, gamesId) {
  return axios
    .post(
      `${API}/users/${id}/wishlist`,
      { gamesId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then(({ data }) => data);
}

export function removeWish(id, token, gamesId) {
  return axios
    .delete(
      `${API}/users/${id}/wishlist`,
      { data: { gamesId } },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then(({ data }) => data);
}
