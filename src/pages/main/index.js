import './index.css';

import MainApi from '../../javascript/api/MainApi';
import MAIN_API_CONFIG from '../../javascript/constants/main-api-config';
import NewsApi from '../../javascript/api/NewsApi';
import NEW_API_CONFIG from '../../javascript/constants/news-api-config';
import dates from '../../javascript/utils/format-date';
import MainPage from '../../javascript/components/MainPage';
import PAGE_CONFIG from '../../javascript/constants/page-config';
import Header from '../../javascript/components/Header';
import HEADER_CONFIG from '../../javascript/constants/header-config';
import Card from '../../javascript/components/Card';
import CARD_CONFIG from '../../javascript/constants/card-config';
import CardList from '../../javascript/components/CardList';
import CARDLIST_CONFIG from '../../javascript/constants/cardlist-config';
import Search from '../../javascript/components/Search';
import SEARCH_CONFIG from '../../javascript/constants/search-config';

import PopupSignUp from '../../javascript/components/PopupSignUp';
import POPUP_SIGN_UP_CONFIG from '../../javascript/constants/popup-sign-up-config';
import PopupSignIn from '../../javascript/components/PopupSignIn';
import POPUP_SIGN_IN_CONFIG from '../../javascript/constants/popup-sign-in-config';
import PopupSuccess from '../../javascript/components/PopupSuccess';
import POPUP_SUCCESS_CONFIG from '../../javascript/constants/popup-success-config';
import Validation from '../../javascript/components/Validation';

const validation = new Validation();
const mainApi = new MainApi(MAIN_API_CONFIG);
const header = new Header(HEADER_CONFIG, mainApi);
const popupSuccess = new PopupSuccess(POPUP_SUCCESS_CONFIG);
const popupSignUp = new PopupSignUp(POPUP_SIGN_UP_CONFIG, mainApi, validation, popupSuccess);

const newsApi = new NewsApi(NEW_API_CONFIG, dates);
const card = new Card(CARD_CONFIG, mainApi);
const cardList = new CardList(CARDLIST_CONFIG, card);
const search = new Search(SEARCH_CONFIG, newsApi, cardList, validation);
const popupSignIn = new PopupSignIn(POPUP_SIGN_IN_CONFIG, mainApi, validation, header, search);
const mainPage = new MainPage(PAGE_CONFIG, {
  header, search, popupSignUp, popupSignIn, popupSuccess, cardList,
});

mainPage.initialRender();
