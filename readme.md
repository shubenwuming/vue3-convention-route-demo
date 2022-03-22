# 约定式路由
## 一、约定式路由是什么

  也称文件路由。

  不需要手写配置，根据目录、文件、命名自动生成路由配置文件。

  目前有许多开源框架都支持约定式路由，比如[UmiJS](https://umijs.org/zh-CN/docs/convention-routing)、[nuxt.js](https://nuxtjs.org/docs/features/file-system-routing/#basic-routes)、[vue-auto-routing](https://www.npmjs.com/package/vue-auto-routing)等



## 二、与使用router配置文件的区别

router配置文件，需要自己去**手动**去写一些路由的配置。这个过程是否可以__自动化__?约定式路由为此而生。

约定式路由呢，是根据约定（一些文件或者目录命名的约定）去**自动**生成router配置文件。



## 三、项目中如何配置（使用说明）

**说明1：所有路由相关的组件应放置在pages目录下，该目录与main.js位于同级目录**

**说明2： index.vue对应的path 为  /**

###  1.普通路由

例子1： path: /about   =>  对应文件系统应该是pages目录下建一个about.vue文件



### 2.动态路径参数（动态路由）

例子1： path:  /:id => 对应文件系统是pages目录下建test文件夹，test文件下再新建[id].vue文件

### 3嵌套路由

例子1： path:   /test/haha => 对应文件系统 是  pages 目录下 $test.vue文件 +  test文件夹

说明：`$` 代表当前路由有嵌套路由



## 四、一些约定的思考

我的想法是，约定越简单、越少越好。

1. 是否可以缩小查找范围，将路由组件单独放到一个文件夹中（pages）
1. 动态路由，动态路劲参数采用 `[]`
2. 如何表明当前路由有嵌套路由，`$`

