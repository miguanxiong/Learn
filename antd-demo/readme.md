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
