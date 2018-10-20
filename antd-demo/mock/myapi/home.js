import menuData from './json/menuData';


function getMenuData(req, res) {
  return res.json(menuData);
}

// function getCity(req, res) {
//   return res.json(city[req.params.province]);
// }

export default {
  'GET /api/home/menuData': getMenuData,
  
};
