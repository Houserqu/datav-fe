export default [
  // 登录注册
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
  // 用户
  {
    path: '/app/design',
    component: '../layouts/DesignLayout',
    routes: [{ path: '/app/design/:id', component: './Design' }],
  },
  {
    path: '/app',
    component: '../layouts/AppLayout',
    routes: [
      { path: '/app/', redirect: '/app/dashboard' },
      { path: '/app/dashboard', component: './UserDashboard/Index' },
      { path: '/app/user/info', component: './Dashboard/Index' },
      {
        path: '/app/application',
        name: 'application',
        icon: 'dashboard',
        routes: [
          {
            path: '/app/application',
            name: '',
            // authority: ['analysis'],
          },
          {
            path: '/app/application/detail/:id',
            name: 'detail',
            component: './AppDetail',
            // authority: ['workplace'],
          },
          {
            path: '/app/application/create',
            name: 'workplace',
            component: './AppCreate',
            // authority: ['workplace'],
          },
          {
            path: '/app/application/edit/:id',
            name: 'workplace',
            component: './AppEdit',
            // authority: ['workplace'],
          },
        ],
      },
      {
        path: '/app/data',
        name: 'data',
        icon: 'dashboard',
        routes: [
          {
            path: '/app/data/detail/:id',
            name: 'detail',
            component: './Data/Detail',
            // authority: ['workplace'],
          },
          {
            path: '/app/data/create',
            name: 'create',
            component: './Data/Create',
            // authority: ['workplace'],
          },
          {
            path: '/app/data/edit/:id',
            name: 'edit',
            component: './Data/Edit',
            // authority: ['workplace'],
          },
        ],
      },
    ],
  },
  // 管理员
  {
    path: '/admin',
    component: '../layouts/BasicLayout',
    // Routes: ['src/pages/Authorized'],
    // authority: ['analysis', 'workplace'],
    routes: [
      // dashboard
      {
        path: '/admin',
        redirect: '/admin/dashboard',
      },
      {
        path: '/admin/monitor', // 大数据监控
        name: 'monitor',
        icon: 'dashboard',
        component: './Dashboard/Index',
      },
      {
        path: '/admin/dashboard', // 管理员控制台
        name: 'dashboard',
        icon: 'dashboard',
        component: './Dashboard/Index',
      },
      {
        path: '/admin/auth', // 权限管理
        icon: 'table',
        name: 'auth',
        // authority: ['activity-tenant', 'activity-plant'],
        routes: [
          {
            path: '/admin/auth/role',
            name: 'role',
            component: './Dashboard/Index',
            // authority: ['activity-plant', 'activity-tenant'],
          },
          {
            path: '/admin/auth/permission',
            name: 'permission',
            component: './Dashboard/Index',
            // authority: ['activity-plant', 'activity-tenant'],
          },
          {
            path: '/admin/auth/user',
            name: 'user',
            component: './Dashboard/Index',
            // authority: ['activity-plant', 'activity-tenant'],
          },
        ],
      },
      // 个人信息
      {
        path: '/admin/account',
        name: 'settings',
        component: './Account/Settings/Info',
        // authority: ['user-center'],
        routes: [
          {
            path: '/account/settings',
            redirect: '/account/settings/base',
          },
          {
            path: '/account/settings/base',
            component: './Account/Settings/BaseView',
          },
          {
            path: '/account/settings/security',
            component: './Account/Settings/SecurityView',
          },
          {
            path: '/account/settings/binding',
            component: './Account/Settings/BindingView',
          },
          {
            path: '/account/settings/notification',
            component: './Account/Settings/NotificationView',
          },
        ],
      },
      // 会员管理
      {
        path: '/admin/member',
        name: 'member',
        icon: 'team',
        component: './UserManage/List',
        // authority: ['users'],
      },
      {
        component: '404',
      },
    ],
  },
];
