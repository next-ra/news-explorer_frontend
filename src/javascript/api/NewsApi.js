export default class ApiNews {
  constructor(config, dates) {
    this.config = config;
    this.url = config.url;
    this.endpoint = config.endpoint;
    this.pageSize = config.pageSize;
    this.apiKey = config.apiKey;
    this.dates = dates;
  }

  getArticles(keyWord) {
    sessionStorage.removeItem('articles');

    return fetch(
      `${this.url}${this.endpoint}?q=${keyWord}&from=${this.dates.from}&to=${this.dates.to}&pageSize=${this.pageSize}&apiKey=${this.apiKey}`,
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      });
  }
}
