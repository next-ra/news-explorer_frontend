import './index.css';

import MainApi from '../../javascript/api/MainApi';
import MAIN_API_CONFIG from '../../javascript/constants/main-api-config';
import NewsApi from '../../javascript/api/NewsApi';
import NEW_API_CONFIG from '../../javascript/constants/news-api-config';
import dates from '../../javascript/utils/format-date';
import Header from '../../javascript/components/Header';
import HEADER_CONFIG from '../../javascript/constants/header-config';
import Card from '../../javascript/components/Card';
import CARD_CONFIG from '../../javascript/constants/card-config';
import CardList from '../../javascript/components/CardList';
import CARDLIST_CONFIG from '../../javascript/constants/cardlist-config';
import Search from '../../javascript/components/Search';
import SEARCH_CONFIG from '../../javascript/constants/search-config';

const mainApi = new MainApi(MAIN_API_CONFIG);
const newsApi = new NewsApi(NEW_API_CONFIG, dates);
const header = new Header(HEADER_CONFIG);
const card = new Card(CARD_CONFIG);
const cardList = new CardList(CARDLIST_CONFIG, card);
const search = new Search(SEARCH_CONFIG, newsApi, cardList);

sessionStorage.setItem('userName', 'John');
const user = sessionStorage.getItem('userName');

header.render(user);
header.setListeners();
search.setListeners();
