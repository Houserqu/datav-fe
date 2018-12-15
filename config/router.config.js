export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/app',
    name: 'app',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/app/design',  // 设计页面
        name: 'design',
        component: './App/Design',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/user-center/workplace' },
      {
        path: '/user-center',
        name: 'user-center',
        icon: 'user',
        routes: [
          {
            path: '/user-center/workplace',
            name: 'workplace',
            component: './UserCenter/Workplace/Workplace',
          },
          {
            path: '/user-center/setting',
            name: 'setting',
            component: './UserCenter/Setting',
          },
        ],
      },
      {
        path: '/user-manage',
        name: 'user-manage',
        icon: 'user',
        routes: [
          {
            path: '/user-manage/workplace',
            name: 'users',
            component: './UserManage/Users',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
