
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
      routes: {
        exclude: [],
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
  ],
}
