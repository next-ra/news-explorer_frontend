import './articles.css';
import MainApi from '../../javascript/api/MainApi';
import MAIN_API_CONFIG from '../../javascript/constants/main-api-config';
import Header from '../../javascript/components/Header';
import HEADER_CONFIG from '../../javascript/constants/header-config';
import CardList from '../../javascript/components/CardList';
import CARDLIST_CONFIG from '../../javascript/constants/cardlist-config';
import Card from '../../javascript/components/Card';
import CARD_CONFIG from '../../javascript/constants/card-config';
import Welcome from '../../javascript/components/Welcome';
import WELCOME_CONFIG from '../../javascript/constants/welcome-config';
import ArticlesPage from '../../javascript/components/ArticlesPage';
import ARTICLES_PAGE_CONFIG from '../../javascript/constants/articles-page-config';

const mainApi = new MainApi(MAIN_API_CONFIG);
const welcome = new Welcome(WELCOME_CONFIG, mainApi);
const header = new Header(HEADER_CONFIG, mainApi);
const card = new Card(CARD_CONFIG, mainApi, welcome);
const cardList = new CardList(CARDLIST_CONFIG, card);

const artilcesPage = new ArticlesPage(ARTICLES_PAGE_CONFIG, {
  header, cardList, welcome, mainApi,
});

artilcesPage.initialRender();
