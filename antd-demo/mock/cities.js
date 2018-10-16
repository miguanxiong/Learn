export default {
    'get /cities': function (req, res, next) {
      setTimeout(() => {
        res.json({
          result: [
            {
              id: 1,
              name: 'beijing',
              alias: '北京'
            }
          ]
        })
      }, 10)
    },
    'get /products': function (req, res, next) {
        setTimeout(() => {
          res.json({
            products: [
                { name: 'dva', id: 1,key: '1' },
                { name: 'antd', id: 2,key: '2' },
              ]})
        }, 10)
      }
  }
  