import dva from 'dva';
import 'moment/locale/zh-cn';
import './polyfill';
import './g2';
//import createLoading from 'dva-loading'
// import { browserHistory } from 'dva/router';
import './index.less';

// 1. Initialize
const app = dva({
  // history: browserHistory,
});

// 2. Plugins
//app.use(createLoading());

// 3. Model move to router
app.model(require('./models/global'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
