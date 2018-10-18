
// ref: https://umijs.org/config/
//主要配置一些代理，主题，alias，插件，诸如此类。
import os from 'os';
import webpackplugin from './plugin.config';

export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'antd-demo',
      dll: false,
      //使用umi-plugin-locale
      locale: {
        enable: true, // default false
        default: 'zh-CN', // default zh-CN
        baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
      },
      routes: {
       // exclude: [],
        exclude: [/models\//]
      },

      hardSource: false,
      ignoreMomentLocale: true,
      lessLoaderOptions: {
        javascriptEnabled: true,
      },
      cssLoaderOptions: {
        modules: true,
        getLocalIdent: (context, localIdentName, localName) => {
          if (
            context.resourcePath.includes('node_modules') ||
            context.resourcePath.includes('ant.design.pro.less') ||
            context.resourcePath.includes('global.less')
          ) {
            return localName;
          }
          const match = context.resourcePath.match(/src(.*)/);
          if (match && match[1]) {
            const antdProPath = match[1].replace('.less', '');
            const arr = antdProPath
              .split('/')
              .map(a => a.replace(/([A-Z])/g, '-$1'))
              .map(a => a.toLowerCase());
            return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
          }
          return localName;
        },
      },  
      chainWebpack: webpackplugin,
      cssnano: {
        mergeRules: false,
      },
    }],
    [
      'umi-plugin-ga',
      {
        code: 'UA-72788897-6',
        judge: () => process.env.APP_TYPE === 'site',
      },
    ],
  ],
  exportStatic: {
    htmlSuffix: true,
    singular:true,
    dynamicRoot:true
  },
  // publicPath:'d:/umi/js'
  "proxy": {
    "/api": {
      "target": "http://jsonplaceholder.typicode.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
  //主题颜色定制，按钮，导航背景色等
  "theme": {
    "primary-color": "#1DA57A",
  },
}
