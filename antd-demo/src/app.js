
import zhCN from 'antd/lib/locale-provider/zh_CN';
export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
    initialState: {
      products: [
        { name: 'dva', id: 1,key: '1' },
        { name: 'antd', id: 2,key: '2' },
      ],
    },
  },
};
