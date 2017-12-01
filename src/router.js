import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import styles from './index.less';

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const BasicLayout = dynamic({
    app,
    models:() => [
      import('./models/user'),
      import('./models/login'),
    ],
    component: () => import('./layouts/BasicLayout'),
  });
  const UserLayout = dynamic({
    app,
    component: () => import('./layouts/UserLayout'),
  });

  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route path="/user" render={props => <UserLayout {...props} app={app} />} />
          <Route path="/" render={props => <BasicLayout {...props} app={app} />} />
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default RouterConfig;
