import { Table, Popconfirm, Button } from 'antd';

const ProductList = ({ onDelete, products }) => {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
 {
    title: 'Actions',
    key: 'actions',
    render: (text, record) => {
      return (
        <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
    <Button>Delete</Button>
      </Popconfirm>
    );
    },
   
  }
];
  return (
    <Table
      dataSource={products}
      columns={columns}
    />
  );
};

export default ProductList;