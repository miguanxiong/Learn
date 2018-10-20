### 1. 新建路由
 `yarn global add npx`
### 2. 创建路由
`npx umi g page products` 或者 `umi page products`

### 3. 工程目录
    assets用于存放静态资源，如项目中所需要的图片或Icon等
    components公共组件目录
    config配置文件目录
    global.css全局样式表
    pages项目路由，各页面入口
    services定义后端的接口调用
    models定义各model
    utils定义各类工具函数
### 4.创建model
    namespace 表示在全局 state 上的 key

    state 是初始值，在这里是空数组

    reducers 等同于 redux 里的 reducer，接收 action，同步更新 state
    umi 里约定 src/models 下的 model 会被自动注入，你无需手动注入。
    dva 提供了 connect 方法。如果你熟悉 redux，这个 connect 来自 react-redux
`umi g dva:model filename`
### 5. 添加antd less样式
 `yarn add antd-pro-merge-less`,`yarn add antd-pro-theme-webpack-plugin`，`yarn add umi-plugin-ga`
### 6. 关于数据请求依赖
`yarn add config`
### 7.DVA数据流
    - 1.model里定义state数据
    - 2.model负责处理分发数据
    - 3.namespace model命名空间，全局stata的model名，发送action到到reducer(还原剂，减径管)时，用namespace指向对应model
    - 4. Reducer 处理同步操作，唯一修改state的地方。由action触发，为一个纯函数.
    - 5.Effect 用于处理异步操作和业务逻辑，不直接修改state,而是获取数据，发起一个action给reducer
        put 触发action paload:''
        call 调用异步逻辑，支持promise ,
        select 从state里获取数据 select(state=>state.todos)
     Subscription 订阅，订阅一个数据源，监听dispatch的action,在启动时执行
      RouteComponent 路由组件匹配根据路由匹配组件，绑定model数据

      首先我们根据 url 访问相关的 Route-Component，在组件中我们通过 dispatch 发送 action 到 model 里面的 effect 或者直接 Reducer
### 8...三点运算符，序列化数组
当我们将action发送给Effect，基本上是取服务器上面请求数据的，服务器返回数据之后，effect 会发送相应的 action 给 reducer，由唯一能改变 state 的 reducer 改变 state ，然后通过connect重新渲染组件。

当我们将action发送给reducer，那直接由 reducer 改变 state，然后通过 connect 重新渲染组件。

作者：darrell
链接：https://www.jianshu.com/p/e184cd6d253c
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。

        


http://111.12.15.86:84/hezhangtong/
账号：
账号：admin 密码：Pass@2018

 http://61.133.238.74:9000/   /   
ID:dlh_admin, pw: 123456