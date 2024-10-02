import { createWebHistory, createRouter } from "vue-router";
/* Layout */
import Layout from "@/layout";

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
    {
        path: "/redirect",
        component: Layout,
        hidden: true,
        children: [
            {
                path: "/redirect/:path(.*)",
                component: () => import("@/views/redirect/index.vue"),
            },
        ],
    },
    {
        path: "/login",
        component: () => import("@/views/login"),
        hidden: true,
    },
    {
        path: "/register",
        component: () => import("@/views/register"),
        hidden: true,
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import("@/views/error/404"),
        hidden: true,
    },
    {
        path: "/401",
        component: () => import("@/views/error/401"),
        hidden: true,
    },
    {
        path: "",
        component: Layout,
        redirect: "/index",
        children: [
            {
                path: "/index",
                component: () => import("@/views/index"),
                name: "Index",
                meta: { title: "首页", icon: "dashboard", affix: true },
            },
        ],
    },
    {
        path: "/shop",
        component: Layout,
        redirect: "noRedirect",
        hidden: false,
        alwaysShow: true,
        meta: { title: "店铺配置", icon: "system" },
        children: [
            {
                path: "violate",
                component: () => import("@/views/shop/violate/index"),
                name: "violate",
                meta: {
                    title: "违禁词过滤",
                    icon: "search",
                },
            },
            {
                path: "watermark",
                component: () => import("@/views/shop/watermark/index"),
                name: "watermark",
                meta: {
                    title: "水印管理",
                    icon: "post",
                },
            },
            {
                path: "price",
                component: () => import("@/views/shop/price/index"),
                name: "price",
                meta: {
                    title: "价格管理",
                    icon: "money",
                },
            },
        ],
    },
    {
        path: "/authorization",
        component: Layout,
        redirect: "noRedirect",
        children: [
            {
                path: "index",
                component: () => import("@/views/authorization/index"),
                name: "authorization",
                meta: { title: "发布授权", icon: "peoples", affix: true },
            },
        ],
    },
    {
        path: "/admin",
        component: Layout,
        redirect: "noRedirect",
        children: [
            {
                path: "word",
                component: () => import("@/views/admin/word"),
                name: "authorization",
                meta: { title: "管理员词库", icon: "peoples", affix: true },
            },
        ],
    },
    {
        path: "/task",
        component: Layout,
        redirect: "noRedirect",
        children: [
            {
                path: "index",
                component: () => import("@/views/task/index"),
                name: "task",
                meta: { title: "店铺任务", icon: "peoples", affix: true },
            },
        ],
    },

    {
        path: "/collect",
        component: Layout,
        redirect: "noRedirect",
        hidden: false,
        alwaysShow: true,
        meta: { title: "采集数据", icon: "lock" },
        children: [
            {
                path: "bookCollect",
                component: () => import("@/views//collect/bookCollect"),
                name: "bookCollect",
                meta: {
                    title: "图书采集",
                    icon: "education",
                },
            },
            {
                path: "collectOrder",
                component: () => import("@/views/collect/collectOrder"),
                name: "collectOrder",
                meta: {
                    title: "采集指令",
                    icon: "post",
                },
            },
            {
                path: "result",
                component: () => import("@/views/collect/result"),
                name: "result",
                meta: {
                    title: "采集结果",
                    icon: "dict",
                },
            },
            {
                path: "filterResult",
                component: () => import("@/views/collect/filterResult"),
                name: "filterResult",
                meta: {
                    title: "过滤结果",
                    icon: "date-range",
                },
            },
        ],
    },
    {
        path: "/issue",
        component: Layout,
        redirect: "noRedirect",
        hidden: false,
        alwaysShow: true,
        meta: { title: "发布数据", icon: "guide" },
        children: [
            {
                path: "bookManage",
                component: () => import("@/views/issue/bookManage"),
                name: "bookManage",
                meta: {
                    title: "图书管理",
                    icon: "monitor",
                },
            },
            {
                path: "issueLog",
                component: () => import("@/views/issue/issueLog"),
                name: "issueLog",
                meta: {
                    title: "发布日志",
                    icon: "nested",
                },
            },
            {
                path: "issueTj",
                component: () => import("@/views/issue/issueTj"),
                name: "issueTj",
                meta: {
                    title: "发布统计",
                    icon: "build",
                },
            },
            {
                path: "issueJf",
                component: () => import("@/views/issue/issueJf"),
                name: "issueJf",
                meta: {
                    title: "发布计费",
                    icon: "money",
                },
            },
        ],
    },

    {
        path: "/delete",
        component: Layout,
        redirect: "noRedirect",
        hidden: false,
        alwaysShow: true,
        meta: { title: "删除数据", icon: "build" },
        children: [
            {
                path: "product",
                component: () => import("@/views/delete/product"),
                name: "product",
                meta: {
                    title: "删除商品",
                    icon: "build",
                },
            },
            {
                path: "statistics",
                component: () => import("@/views/delete/statistics"),
                name: "statistics",
                meta: {
                    title: "删除统计",
                    icon: "build",
                },
            },
            {
                path: "dellog",
                component: () => import("@/views/delete/dellog"),
                name: "dellog",
                meta: {
                    title: "删除日志",
                    icon: "build",
                },
            },
        ],
    },
    {
        path: "/user",
        component: Layout,
        hidden: true, // 状态栏吟唱
        redirect: "noredirect",
        children: [
            {
                path: "profile",
                component: () => import("@/views/system/user/profile/index"),
                name: "Profile",
                meta: { title: "个人中心", icon: "user" },
            },
        ],
    },
];
// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
    // {
    //     path: "/system/user-auth",
    //     component: Layout,
    //     hidden: true,
    //     permissions: ["system:user:edit"],
    //     children: [
    //         {
    //             path: "role/:userId(\\d+)",
    //             component: () => import("@/views/system/user/authRole"),
    //             name: "AuthRole",
    //             meta: { title: "分配角色", activeMenu: "/system/user" },
    //         },
    //     ],
    // },
    // {
    //     path: "/system/role-auth",
    //     component: Layout,
    //     hidden: true,
    //     permissions: ["system:role:edit"],
    //     children: [
    //         {
    //             path: "user/:roleId(\\d+)",
    //             component: () => import("@/views/system/role/authUser"),
    //             name: "AuthUser",
    //             meta: { title: "分配用户", activeMenu: "/system/role" },
    //         },
    //     ],
    // },
    // {
    //     path: "/system/dict-data",
    //     component: Layout,
    //     hidden: true,
    //     permissions: ["system:dict:list"],
    //     children: [
    //         {
    //             path: "index/:dictId(\\d+)",
    //             component: () => import("@/views/system/dict/data"),
    //             name: "Data",
    //             meta: { title: "字典数据", activeMenu: "/system/dict" },
    //         },
    //     ],
    // },
    // {
    //     path: "/monitor/job-log",
    //     component: Layout,
    //     hidden: true,
    //     permissions: ["monitor:job:list"],
    //     children: [
    //         {
    //             path: "index/:jobId(\\d+)",
    //             component: () => import("@/views/monitor/job/log"),
    //             name: "JobLog",
    //             meta: { title: "调度日志", activeMenu: "/monitor/job" },
    //         },
    //     ],
    // },
    // {
    //     path: "/tool/gen-edit",
    //     component: Layout,
    //     hidden: true,
    //     permissions: ["tool:gen:edit"],
    //     children: [
    //         {
    //             path: "index/:tableId(\\d+)",
    //             component: () => import("@/views/tool/gen/editTable"),
    //             name: "GenEdit",
    //             meta: { title: "修改生成配置", activeMenu: "/tool/gen" },
    //         },
    //     ],
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});

export default router;
