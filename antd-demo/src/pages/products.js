import styles from './products.less';
import {connect} from 'dva'
import ProductList from '../components/ProductList';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
} from 'antd';
const  Products = ({ dispatch, products}) => {
  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  return (
    <div className={styles.tableList}>
         <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" className={styles.button} >
                新建
              </Button>
             
            </div>
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  );
};

export default connect(({ products }) => ({
  products,
}))(Products);


