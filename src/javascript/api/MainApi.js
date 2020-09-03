export default class MainApi {
  constructor(config) {
    this.config = config;
    this.url = config.url;
    this.headers = config.headers;
  }

  createUser(email, password, name) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }

  signIn(email, password) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }

  signOut() {
    return fetch(`${this.url}/out`, {
      method: 'POST',
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }

  getUser() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }

  createArticle(cardInfo) {
    return fetch(`${this.url}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify(cardInfo),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }

  getUsersArticles() {
    return fetch(`${this.url}/articles`, {
      method: 'GET',
      credentials: 'include',
    });
  }

  deleteArticle(id) {
    return fetch(`${this.url}/articles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      header: this.header,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      });
  }
}
