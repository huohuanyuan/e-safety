/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-12 10:27:34 
 * @Last Modified by: chengshanshan
 * @Last Modified time: 2019-04-18 16:26:39
 */

import adminMain from '@/pages/admin/AdminMain'
import userMain from '@/pages/user/UserMain'

//不作为main组件的子页面展示的页面
export const loginRouter = {
  path: '/login',
  name: 'LOGIN',
  component: resolve => {
    require(['@/pages/Login.vue'], resolve);
  }
};
// 普通员工 选择项目页面
export const projectSelect = {
  path: '/project-select',
  name: "PROJECT_SELECT",
  component: resolve => {
    require(['@/pages/user/ProjectSelect.vue'], resolve);
  }
}
//管理员角色路由
export const adminRouter = {
  path: '/admin',
  component: adminMain,
  redirect: {
    name: "ADMIN_HOME"
  },
  children: [
    //首页
    {
      path: 'home',
      name: 'ADMIN_HOME',
      component: resolve => {
        require(['@/pages/admin/AdminHome.vue'], resolve);
      }
    },
    {
      path: 'user',
      name: "USER_MAN",
      title: '用户管理',
      component: resolve => {
        require(['@/pages/admin/user/UserIndex.vue'], resolve);
      },
      redirect: {
        name: "USER_LIST"
      },
      children: [{
        path: 'list',
        name: "USER_LIST",
        component: resolve => {
          require(['@/pages/admin/user/UserList.vue'], resolve);
        },
      },
      {
        path: 'add',
        name: 'USER_ADD',
        component: resolve => {
          require(['@/pages/admin/user/UserAdd.vue'], resolve);
        },
      }
      ]
    },
    {
      path: 'company',
      name: "COM_MAN",
      title: '公司管理',
      component: resolve => {
        require(['@/pages/admin/company/ComIndex.vue'], resolve);
      },
      redirect: {
        name: "COM_LIST"
      },
      children: [{
        path: 'list',
        name: "COM_LIST",
        component: resolve => {
          require(['@/pages/admin/company/ComList.vue'], resolve);
        },
      },
      {
        path: 'add',
        name: 'COM_ADD',
        component: resolve => {
          require(['@/pages/admin/company/ComAdd.vue'], resolve);
        },
      }
      ]
    },
    {
      path: 'project',
      name: "PRO_MAN",
      title: '项目管理',
      meta: {
        parents: 'SYS_MAN',
      },
      component: resolve => {
        require(['@/pages/admin/project/ProIndex.vue'], resolve);
      },
      redirect: {
        name: "PRO_LIST"
      },
      children: [{
        path: 'list',
        name: "PRO_LIST",
        component: resolve => {
          require(['@/pages/admin/project/ProList.vue'], resolve);
        },
      },
      {
        path: 'add',
        name: 'PRO_ADD',
        component: resolve => {
          require(['@/pages/admin/project/ProAdd.vue'], resolve);
        },
      }
      ]
    }

  ]
};
//普通用户 左侧菜单路由
export const otherUserRouter = [{ // 系统配置
  path: '/user_sys_set',
  name: 'SYS_SET',
  component: userMain,
  title: "系统配置",
  redirect: {
    name: "SYS_INDEX"
  },
  meta: {
    requireAuth: true,
  },
  children: [{ // 子路由的载体
    path: 'sys_index',
    name: "SYS_INDEX",
    component: resolve => {
      require(['@/pages/user/system/SystemIndex.vue'], resolve);
    },
    redirect: {
      name: "SYS_SET_USER"
    },
    children: [{ // 用户
      path: 'user',
      name: "SYS_SET_USER",
      title: '用户',
      component: resolve => {
        require(['@/pages/user/system/user/UserIndex.vue'], resolve);
      },
      redirect: {
        name: "SYS_SET_USER_LIST"
      },
      children: [{
        path: 'list',
        name: "SYS_SET_USER_LIST",
        component: resolve => {
          require(['@/pages/user/system/user/UserList.vue'], resolve);
        },
      },
      {
        path: 'add',
        name: "SYS_SET_USER_ADD",
        component: resolve => {
          require(['@/pages/user/system/user/UserAdd.vue'], resolve);
        },
      },
      ]
    }, { // 角色
      path: 'role',
      name: "SYS_SET_ROLE",
      component: resolve => {
        require(['@/pages/user/system/role/RoleIndex.vue'], resolve);

      }
    }, { // 角色配置
      path: 'roleSet',
      name: "SYS_SET_ROLE_SET",
      component: resolve => {
        require(['@/pages/user/system/SystemConfiguration.vue'], resolve);
      }
    },{// 案例编码
      path: 'systmCaseConding',
      name: "SYS_CASE_CONDING",
      component: resolve => {
        require(['@/pages/user/system/systemCaseCoding.vue'], resolve);
      }
    }, { // 流程
      path: 'process',
      name: "SYS_SET_PROCESS",
      title: '流程',
      component: resolve => {
        require(['@/pages/user/system/process/ProcessIndex.vue'], resolve);
      },
      redirect: {
        name: "SYS_SET_PROCESS_LIST"
      },
      children: [{
        path: 'list',
        name: "SYS_SET_PROCESS_LIST",
        component: resolve => {
          require(['@/pages/user/system/process/ProcessList.vue'], resolve);
        },
      }]
    }]
  }]
},
// 案例中心
{
  path: '/user_case_center',
  name: 'CASE_CENTER',
  component: userMain,
  title: "案例中心",
  redirect: {
    name: "CASE_LIST"
  },
  meta: {
    requireAuth: true,
  },
  children: [{
    path: 'case_index',
    name: "CASE_INDEX",
    component: resolve => {
      require(['@/pages/user/case/CaseIndex.vue'], resolve);
    },
    redirect: {
      name: "CASE_LIST"
    },
    children: [{
      path: 'case_list',
      name: "CASE_LIST",
      component: resolve => {
        require(['@/pages/user/case/CaseList.vue'], resolve);
      },
    }, {
      path: 'query_list',
      name: "QUERY_LIST",
      component: resolve => {
        require(['@/pages/user/case/QueryList.vue'], resolve);
      },
    },]
  },
  {
    path: 'case_nav',
    name: "CASE_NAV", 
    component: resolve => {
      require(['@/pages/user/case/CaseNav.vue'], resolve);
    },
    children: [{
      path: 'dm',
      name: "CASE_DM",
      component: resolve => {
        require(['@/pages/user/case/CaseDemo.vue'], resolve);
      },
    },
    {
      path: 'ae',
      name: "CASE_AE",
      component: resolve => {
        require(['@/pages/user/case/CaseAe.vue'], resolve);
      },
    },
    {
      path: 'mh',
      name: "CASE_MH",
      component: resolve => {
        require(['@/pages/user/case/CaseMedicalHistory.vue'], resolve);
      },
    },
    {
      path: 'nr',
      name: "CASE_NR",
      component: resolve => {
        require(['@/pages/user/case/CaseNarrative.vue'], resolve);
      },
    },
    {
      path: 'drug',
      name: "CASE_DRUG",
      component: resolve => {
        require(['@/pages/user/case/CaseDrug.vue'], resolve);
      },
    },
    {
      path: 'ci',
      name: "CASE_CI",
      component: resolve => {
        require(['@/pages/user/case/CaseIdentification.vue'], resolve);
      },
    },
    {
      path: 'si',
      name: "CASE_SI",
      component: resolve => {
        require(['@/pages/user/case/CaseStudy.vue'], resolve);
      },
    },
    {
      path: 'lr',
      name: "CASE_LR",
      component: resolve => {
        require(['@/pages/user/case/CaseLiterature.vue'], resolve);
      },
    },
    {
      path: 'sd',
      name: "CASE_SD",
      component: resolve => {
        require(['@/pages/user/case/CaseSender.vue'], resolve);
      },
    },
    {
      path: 'rp',
      name: "CASE_RP",
      component: resolve => {
        require(['@/pages/user/case/CasePrimarySource.vue'], resolve);
      },
    },
    {
      path: 'lb',
      name: "CASE_LB",
      component: resolve => {
        require(['@/pages/user/case/CaseLab.vue'], resolve);
      },
    },
    {
      path: 'dh',
      name: "CASE_DH",
      component: resolve => {
        require(['@/pages/user/case/CaseDrugHistory.vue'], resolve);
      },
    }

    ]
  }
  ]
},
// 案例配置
{
  path: '/user_case_set',
  name: 'CASE_INFO_MAN',
  component: userMain,
  title: "案例配置",
  redirect: {
    name: "CASE_INFO_INDEX"
  },
  meta: {
    requireAuth: true,
  },
  children: [{
    path: 'case_info',
    name: "CASE_INFO_INDEX",
    component: resolve => {
      require(['@/pages/user/case-info/CaseInfoIndex.vue'], resolve);
    },
    redirect: {
      name: "CASE_INFO_WARNING"
    },
    children: [{
      path: 'warning',
      name: "CASE_INFO_WARNING",
      title: '预警配置',
      component: resolve => {
        require(['@/pages/user/case-info/Warning.vue'], resolve);
      }
    }, {
      path: 'company_info',
      name: "CASE_INFO_COM",
      title: '企业配置',
      component: resolve => {
        require(['@/pages/user/case-info/CompanyInfo.vue'], resolve);
      }
    },
    {
      path: 'e2b',
      name: "CASE_INFO_E2B",
      title: 'E2B',
      component: resolve => {
        require(['@/pages/user/case-info/ETwoB.vue'], resolve);
      }
    },
    {
      path: 'sender',
      name: "CASE_INFO_SEN",
      title: '发件人',
      component: resolve => {
        require(['@/pages/user/case-info/Sender.vue'], resolve);
      }
    },
    {
      path: 'reporter',
      name: "CASE_INFO_REP",
      title: '报告人',
      component: resolve => {
        require(['@/pages/user/case-info/reporter/ReporterIndex.vue'], resolve);
      },
      redirect: {
        name: "CASE_INFO_REP_LIST"
      },
      children: [{
        path: 'list',
        name: "CASE_INFO_REP_LIST",
        component: resolve => {
          require(['@/pages/user/case-info/reporter/ReporterList.vue'], resolve);
        },
      },
      {
        path: 'add',
        name: 'CASE_INFO_REP_ADD',
        component: resolve => {
          require(['@/pages/user/case-info/reporter/ReporterAdd.vue'], resolve);
        },
      }
      ]
    },
    {
      path: 'product',
      name: "CASE_INFO_PRO",
      title: '产品',
      component: resolve => {
        require(['@/pages/user/case-info/product/ProductIndex.vue'], resolve);
      },
      redirect: {
        name: "CASE_INFO_PRO_LIST"
      },
      children: [{
        path: 'list',
        name: "CASE_INFO_PRO_LIST",
        component: resolve => {
          require(['@/pages/user/case-info/product/ProductList.vue'], resolve);
        },
      },
      {
        path: 'add',
        name: 'CASE_INFO_PRO_ADD',
        component: resolve => {
          require(['@/pages/user/case-info/product/ProductAdd.vue'], resolve);
        },
      }
      ]
    },
    {
      path: 'study',
      name: "CASE_INFO_STU",
      title: '研究',
      component: resolve => {
        require(['@/pages/user/case-info/study/StudyIndex.vue'], resolve);
      },
      redirect: {
        name: "CASE_INFO_STU_LIST"
      },
      children: [{
        path: 'list',
        name: "CASE_INFO_STU_LIST",
        component: resolve => {
          require(['@/pages/user/case-info/study/StudyList.vue'], resolve);
        },
      },
      {
        path: 'add',
        name: 'CASE_INFO_STU_ADD',
        component: resolve => {
          require(['@/pages/user/case-info/study/StudyAdd.vue'], resolve);
        },
      }
      ]
    },

    ]
  }]
},
];

// 普通用户 非左侧菜单
export const otherRouter = {

  path: '/user_home',
  name: 'USERMAIN',
  redirect: 'home',
  component: userMain,
  children: [{
    path: 'home',
    name: 'HOME',
    component: resolve => {
      require(['@/pages/user/home/Home.vue'], resolve);
    },
  },
  // {
  //   path: 'ownspace',
  //   title: '个人中心',
  //   name: "OWN_SPACE",
  //   meta: {
  //     requireAuth: false,
  //   },
  //   component: resolve => {
  //     require(['@/pages/own-space/own-space.vue'], resolve);
  //   }
  // },
  {
    path: 'process',
    name: 'PROCESS',
    component: resolve => {
      require(['@/pages/user/home/HomeProcess.vue'], resolve);
    }
  },
  {
    path: 'question',
    name: 'QUESTUIN',
    component: resolve => {
      require(['@/pages/user/home/HomeQuestion.vue'], resolve);
    }
  }
  ]
}
export const routers = [
  loginRouter,
  projectSelect,
  adminRouter,
  otherRouter,
  ...otherUserRouter
]
