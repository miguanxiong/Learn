// function getDeptList(req, res) {
//     return res.json(deptData);
//   }
// export default {
//     'GET /api/System/dept/list': getDeptList,
    
//   };
  import { parse } from 'url';
const deptList=[
{"key":13,"parentId":0,"name":"测试部","orderNum":5,"delFlag":1,
"children":[
  {"key":14,"parentId":13,"name":"测试一部","orderNum":1,"delFlag":1},
  {"key":15,"parentId":13,"name":"测试二部","orderNum":2,"delFlag":1},
]
},

{"key":12,"parentId":11,"name":"产品一部","orderNum":1,"delFlag":1},
{"key":11,"parentId":0,"name":"产品部","orderNum":3,"delFlag":1},
{"key":10,"parentId":9,"name":"销售一部","orderNum":1,"delFlag":1},
{"key":9,"parentId":0,"name":"销售部","orderNum":2,"delFlag":1},
{"key":8,"parentId":6,"name":"研发二部","orderNum":2,"delFlag":1},
{"key":7,"parentId":6,"name":"研發一部","orderNum":1,"delFlag":1},
{"key":6,"parentId":0,"name":"研发部","orderNum":1,"delFlag":1}];
const deptData={"list":deptList,
        "pagination":{"total": 46, "pageSize": 10, "current": 1}
  }

  // mock tableListDataSource
  let tableListDataSource = [];
 
  let tableListChildren = [];
  for (let i = 0; i < 14; i += 1) {
   let j=i+20;
    tableListChildren.push({
      key: j,
     disabled: j % 6 === 0,
    
      orgName: `行政划区 ${j}`,//行政划区
      orgNum: `A0 ${j}`,//行政编码
      address: '102.33,12.345',//地址
      status: Math.floor(Math.random() * 10) % 2,//行政状态
      updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
      createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    
    });
    let temp = tableListChildren;
    if(i==0){
      tableListDataSource.push({
        key: i,//主键
        disabled: j % 6 === 0,
        orgName: `行政划区 ${i}`,//行政划区
        orgNum: `A0 ${i}`,//行政编码
        address: '102.33,12.345',//地址
        status: Math.floor(Math.random() * 10) % 2,//行政状态
        updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
        createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
        children:temp,
      });
    }else{
      tableListDataSource.push({
        key: i,
      
        orgName: `行政划区 ${i}`,//行政划区
        orgNum: `A0 ${i}`,//行政编码
        address: '102.33,12.345',//地址
        status: Math.floor(Math.random() * 10) % 4,//行政状态
        updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
        createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
       
      });
    }
   
   
  
  }
  
  function getDept(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }
  
    const params = parse(url, true).query;
  
   let dataSource = tableListDataSource;
  //  let dataSource = deptList;
    if (params.sorter) {
      const s = params.sorter.split('_');
      dataSource = dataSource.sort((prev, next) => {
        if (s[1] === 'descend') {
          return next[s[0]] - prev[s[0]];
        }
        return prev[s[0]] - next[s[0]];
      });
    }
  
    if (params.status) {
      const status = params.status.split(',');
      let filterDataSource = [];
      status.forEach(s => {
        filterDataSource = filterDataSource.concat(
          dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
        );
      });
      dataSource = filterDataSource;
    }
  
    if (params.name) {
      dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
    }
  
    let pageSize = 10;
    if (params.pageSize) {
      pageSize = params.pageSize * 1;
    }
  
    const result = {
      list: dataSource,
      pagination: {
        total: dataSource.length,
        pageSize,
        current: parseInt(params.currentPage, 10) || 1,
      },
    };
  
    return res.json(result);
  }
  
  function postDept(req, res, u, b) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }
  
    const body = (b && b.body) || req.body;
    const { method, orgName, orgNum,address, key } = body;
  
    switch (method) {
      /* eslint no-case-declarations:0 */
      case 'delete':
        tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
        break;
      case 'post':
        const i = Math.ceil(Math.random() * 10000);
        tableListDataSource.unshift({
          key: i,
          orgName: orgName,//行政划区
          orgNum: `A0 ${i}`,//行政编码
          address: '102.33,12.345',//地址
          status: Math.floor(Math.random() * 10) % 4,//行政状态
          updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
          createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
        });
        break;
      case 'update':
        tableListDataSource = tableListDataSource.map(item => {
          if (item.key === key) {
         //   Object.assign(item, { desc, name });
            return item;
          }
          return item;
        });
        break;
      default:
        break;
    }
  
    const result = {
      list: tableListDataSource,
      pagination: {
        total: tableListDataSource.length,
      },
    };
  
    return res.json(result);
  }
  
  export default {
    'GET /api/System/dept': getDept,
    'POST /api/System/dept': postDept,
  };
  