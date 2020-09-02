import './index.css';

import MainApi from '../../javascript/api/MainApi';
import MAIN_API_CONFIG from '../../javascript/constants/main-api-config';
import NewsApi from '../../javascript/api/NewsApi';
import NEW_API_CONFIG from '../../javascript/constants/news-api-config';
import dates from '../../javascript/utils/format-date';
import Page from '../../javascript/components/Page';
import PAGE_CONFIG from '../../javascript/constants/page-config';
import Header from '../../javascript/components/Header';
import HEADER_CONFIG from '../../javascript/constants/header-config';
import Card from '../../javascript/components/Card';
import CARD_CONFIG from '../../javascript/constants/card-config';
import CardList from '../../javascript/components/CardList';
import CARDLIST_CONFIG from '../../javascript/constants/cardlist-config';
import Search from '../../javascript/components/Search';
import SEARCH_CONFIG from '../../javascript/constants/search-config';
import PopupReg from '../../javascript/components/PopupReg';
import POPUP_REGISTRATION_CONFIG from '../../javascript/constants/PopupReg-config';
import Validation from '../../javascript/components/Validation';

const mainApi = new MainApi(MAIN_API_CONFIG);
const validation = new Validation();
const popupReg = new PopupReg(POPUP_REGISTRATION_CONFIG, mainApi, validation);

const newsApi = new NewsApi(NEW_API_CONFIG, dates);
const header = new Header(HEADER_CONFIG);
const card = new Card(CARD_CONFIG);
const cardList = new CardList(CARDLIST_CONFIG, card);
const search = new Search(SEARCH_CONFIG, newsApi, cardList);
const page = new Page(PAGE_CONFIG, {
  header, search, popupReg,
});
sessionStorage.setItem('userName', 'John');

page.initialRender();
