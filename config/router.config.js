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
    path: '/',
    component: '../layouts/BasicLayout',
    // Routes: ['src/pages/Authorized'],
    authority: ['analysis', 'workplace'],
    routes: [
      // dashboard
      {
        path: '/',
        component: './Dashboard/Index',
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
            authority: ['analysis'],
          },
          // {
          //   path: '/dashboard/monitor',
          //   name: 'monitor',
          //   component: './Dashboard/Monitor',
          // },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
            authority: ['workplace'],
          },
        ],
      },
      // 活动管理
      {
        path: '/activity',
        icon: 'table',
        name: 'activity',
        authority: ['activity-tenant', 'activity-plant'],
        routes: [
          {
            path: '/activity/basic-list',
            name: 'basiclist',
            component: './Activity/BasicList',
            authority: ['activity-plant', 'activity-tenant'],
          },
          {
            path: '/activity/signup-list/:id',
            name: 'signup-list',
            hideInMenu: true,
            component: './Activity/ActivitySignupList',
            authority: ['activity-plant', 'activity-tenant'],
          },
          {
            path: '/activity/create',
            name: 'create',
            component: './ActivityCreate/StepForm',
            hideChildrenInMenu: true,
            authority: ['activity-create'],
            routes: [
              {
                path: '/activity/create',
                redirect: '/activity/create/base',
              },
              {
                path: '/activity/create/base',
                name: 'base',
                component: './ActivityCreate/StepForm/Step1',
              },
              {
                path: '/activity/create/content',
                name: 'content',
                component: './ActivityCreate/StepForm/Step2',
              },
              {
                path: '/activity/create/form',
                name: 'form',
                component: './ActivityCreate/StepForm/Step3',
              },
            ],
          },
          // {
          //   path: '/activity/list',
          //   name: 'searchtable',
          //   component: './List/TableList',
          // },
          // {
          //   path: '/activity/card-list',
          //   name: 'cardlist',
          //   component: './List/CardList',
          // },
          // {
          //   path: '/activity/search',
          //   name: 'searchlist',
          //   component: './List/List',
          //   routes: [
          //     {
          //       path: '/activity/search',
          //       redirect: '/list/search/articles',
          //     },
          //     {
          //       path: '/activity/search/articles',
          //       name: 'articles',
          //       component: './List/Articles',
          //     },
          //     {
          //       path: '/activity/search/projects',
          //       name: 'projects',
          //       component: './List/Projects',
          //     },
          //     {
          //       path: '/activity/search/applications',
          //       name: 'applications',
          //       component: './List/Applications',
          //     },
          //   ],
          // },
        ],
      },
      // 个人中心
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        authority: ['user-center'],
        routes: [
          // {
          //   path: '/account/center',
          //   name: 'center',
          //   component: './Account/Center/Center',
          //   routes: [
          //     {
          //       path: '/account/center',
          //       redirect: '/account/center/articles',
          //     },
          //     {
          //       path: '/account/center/articles',
          //       component: './Account/Center/Articles',
          //     },
          //     {
          //       path: '/account/center/applications',
          //       component: './Account/Center/Applications',
          //     },
          //     {
          //       path: '/account/center/projects',
          //       component: './Account/Center/Projects',
          //     },
          //   ],
          // },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            authority: ['user-center'],
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
              // {
              //   path: '/account/settings/binding',
              //   component: './Account/Settings/BindingView',
              // },
              // {
              //   path: '/account/settings/notification',
              //   component: './Account/Settings/NotificationView',
              // },
            ],
          },
        ],
      },
      // 权限管理
      {
        path: '/authority',
        name: 'authority',
        icon: 'lock',
        authority: ['permission', 'worker'],
        routes: [
          {
            path: '/authority/worker',
            name: 'worker',
            component: './Authority/WorkerManage',
            authority: ['worker'],
          },
          {
            path: '/authority/role',
            name: 'role',
            component: './Authority/RoleManage',
            authority: ['permission'],
          },
        ],
      },
      // 会员管理
      {
        path: '/user-manage',
        name: 'user',
        icon: 'team',
        component: './UserManage/List',
        authority: ['users'],
      },
      // forms
      // {
      //   path: '/form',
      //   icon: 'form',
      //   name: 'form',
      //   routes: [
      //     {
      //       path: '/form/basic-form',
      //       name: 'basicform',
      //       component: './Forms/BasicForm',
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'stepform',
      //       component: './Forms/StepForm',
      //       hideChildrenInMenu: true,
      //       routes: [
      //         {
      //           path: '/form/step-form',
      //           redirect: '/form/step-form/info',
      //         },
      //         {
      //           path: '/form/step-form/info',
      //           name: 'info',
      //           component: './Forms/StepForm/Step1',
      //         },
      //         {
      //           path: '/form/step-form/confirm',
      //           name: 'confirm',
      //           component: './Forms/StepForm/Step2',
      //         },
      //         {
      //           path: '/form/step-form/result',
      //           name: 'result',
      //           component: './Forms/StepForm/Step3',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'advancedform',
      //       authority: ['admin'],
      //       component: './Forms/AdvancedForm',
      //     },
      //   ],
      // },
      // list
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   icon: 'profile',
      //   routes: [
      //     // profile
      //     {
      //       path: '/profile/basic',
      //       name: 'basic',
      //       component: './Profile/BasicProfile',
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'advanced',
      //       authority: ['admin'],
      //       component: './Profile/AdvancedProfile',
      //     },
      //   ],
      // },
      // {
      //   name: 'result',
      //   icon: 'check-circle-o',
      //   path: '/result',
      //   routes: [
      //     // result
      //     {
      //       path: '/result/success',
      //       name: 'success',
      //       component: './Result/Success',
      //     },
      //     { path: '/result/fail', name: 'fail', component: './Result/Error' },
      //   ],
      // },
      // {
      //   name: 'exception',
      //   icon: 'warning',
      //   path: '/exception',
      //   routes: [
      //     // exception
      //     {
      //       path: '/exception/403',
      //       name: 'not-permission',
      //       component: './Exception/403',
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'not-find',
      //       component: './Exception/404',
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'server-error',
      //       component: './Exception/500',
      //     },
      //     {
      //       path: '/exception/trigger',
      //       name: 'trigger',
      //       hideInMenu: true,
      //       component: './Exception/TriggerException',
      //     },
      //   ],
      // },
      {
        component: '404',
      },
    ],
  },
];
