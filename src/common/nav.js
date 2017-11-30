import BasicLayout from '../layouts/BasicLayout';
import UserLayout from '../layouts/UserLayout';

import Login from '../routes/User/Login';

import Blank from '../routes/index';
import dynamic from 'dva/dynamic';

const data = [{
  component: app => dynamic({
    app,
    models: () => [
      import('../models/user'),
      import('../models/login'),
    ],
    component: () => import('../layouts/BasicLayout'),
  }),
  layout: 'BasicLayout',
  path:'',
  name:'首页',
  children:[{
    name:'笔记',
    icon:'code',
    path:'note',
    children:[{
      name: 'javascript',
      path: 'javascript',
      component: app => dynamic({
        app,
        component: () => import('../routes/index'),
      }),
    },{
      name: 'css',
      path: 'css',
      component: app => dynamic({
        app,
        component: () => import('../routes/index'),
      }),
    }]
  },{
    name:'问题',
    icon:'edit',
    path:'issues',
    children:[{
      name: 'issues',
      path: 'edit',
      component: app => dynamic({
        app,
        component: () => import('../routes/index'),
      }),
    }]
  },{
    name:'作品',
    icon:'fork',
    path:'project',
    children:[{
      name: 'canvas',
      path: 'canvas',
      component: app => dynamic({
        app,
        component: () => import('../routes/index'),
      }),
    }]
  },{
    name:'信息',
    icon:'message',
    path:'message',
    component: app => dynamic({
        app,
        models:() => [
          import('../models/detail'),
        ],
        component: () => import('../routes/UserDetail/detail'),
      }),
  },{
    name:'用户',
    icon:'user',
    path:'people',
    component: app => dynamic({
        app,
        component: () => import('../routes/User/people'),
      }),
  }]
}, {
  component: app => dynamic({
    app,
    component: () => import('../layouts/UserLayout')
  }),
  layout: 'UserLayout',
  path: '/user',
  name:'帐户',
  children: [{
    name: '帐户',
    icon: 'user',
    path: 'user',
    children: [{
      name: '登录',
      path: 'login',
      component: app => dynamic({
        app,
        models:() => [
          import('../models/login'),
          import('../models/register'),
        ],
        component: () => import('../routes/User/Login')
      }),
    }],
  }],
}];

export function getNavData(layout = '') {
  if(!layout){
    return data;
  }
  const newData = [];
  data.map(item => {
    if(item.layout === layout){
      newData.push(item);
    }
  });
  return newData;
}

export default data;
