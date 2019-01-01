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
  // app design
  {
    path: '/app',
    name: 'app',
    hideChildrenInMenu: true,
    component: '../layouts/DesignLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/app/design',  // 设计页面
        authority: ['design'],
        name: 'design',
        component: './App/Design',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
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
        Routes: ['src/pages/Authorized'],
        authority: ['center', 'admin'],
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
