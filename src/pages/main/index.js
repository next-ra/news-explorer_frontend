import './index.css';

import MainApi from '../../javascript/api/MainApi';
import MAIN_API_CONFIG from '../../javascript/constants/main-api-config';
import NewsApi from '../../javascript/api/NewsApi';
import NEW_API_CONFIG from '../../javascript/constants/news-api-config';
import Header from '../../javascript/components/Header';
import HEADER_CONFIG from '../../javascript/constants/header-config';

const mainApi = new MainApi(MAIN_API_CONFIG);
const newsApi = new NewsApi(NEW_API_CONFIG);
const header = new Header(HEADER_CONFIG);

const userName = 'John';

header.render(userName);
header.setListeners();
