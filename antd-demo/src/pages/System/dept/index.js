import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Input,
  Select,
  Card,
  Form,
  Icon,
  Button,
  Dropdown,
  // Option,
  Menu,
  message,
  Badge,
  Divider,
  Popconfirm,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';
import DeptForm from './modal';

const FormItem = Form.Item;
const Option = Select.Option;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['注销', '正常', '已上线', '异常'];
/* eslint react/no-multi-comp:0 */
@connect(({ dept, loading }) => ({
  dept,
  loading: loading.models.dept,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    record: {},
  };
  columns = [
    {
      title: '行政区划',
      dataIndex: 'orgName',
      key: 'orgName',
    },
    {
      title: '行政区划编码',
      dataIndex: 'orgNum',
      key: 'orgNum',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
        {
          text: status[2],
          value: 2,
        },
        {
          text: status[3],
          value: 3,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
        {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
          <Divider type="vertical" />
          {/* <Popconfirm title="确认删除?" onConfirm={this.handleRemove.bind(true, record)}>
         
            <a href="">删除</a>
          </Popconfirm> */}
          <Divider type="vertical" />
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>查看成员</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>角色设置</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    //react挂载完请求list查询
    const { dispatch } = this.props;
    dispatch({
      type: 'dept/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'dept/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'dept/fetch',
      payload: {},
    });
  };

  // toggleForm = () => {
  //   const { expandForm } = this.state;
  //   this.setState({
  //     expandForm: !expandForm,
  //   });
  // };

  handleRemove = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    dispatch({
      type: 'dept/remove',
      payload: {
        key: selectedRows.map(row => row.key),
      },
      callback: () => {
        this.setState({
          selectedRows: [],
        });
      },
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'dept/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
      record:{},
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    // this.setState({
    //   updateModalVisible: !!flag,
    //   stepFormValues: record || {},
    // });
    console.info(record);
    this.setState({
      modalVisible: !!flag,
      record: record || {},
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dept/add',
      payload: {
        orgName: fields.orgName,
        address: fields.address,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };
  //导出
  handleExport = fields => {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'rule/add',
    //   payload: {
    //     desc: fields.desc,
    //   },
    // });

    message.success('导出');
   // this.handleModalVisible();
  };
  handleDownload = fields => {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'rule/add',
    //   payload: {
    //     desc: fields.desc,
    //   },
    // });

    message.success('handleDownload');
   // this.handleModalVisible();
  };
  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dept/update',
      payload: {
        orgName: fields.orgName,
        address: fields.address,
        key: fields.key,
      },
    });

    message.success('修改成功');
    this.handleModalVisible();
    // this.handleUpdateModalVisible();
  };
  renderSearchForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="行政区划">
              {getFieldDecorator('orgName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">注销</Option>
                  <Option value="1">正常</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
             
            </span>
          </Col>
        </Row>
      </Form>
    );
  }
  render() {
    const {
      dept: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible,updateModalVisible, stepFormValues,record } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        {/* <Menu.Item key="approval">批量审批</Menu.Item> */}
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
   
    };
    // const updateMethods = {
    //   handleUpdateModalVisible: this.handleUpdateModalVisible,
    //   handleUpdate: this.handleUpdate,
    // };
    return (
      <PageHeaderWrapper title="">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
            { this.renderSearchForm()} 
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              <Button icon="download" type="primary" onClick={() => this.handleDownload()}>
                导入
              </Button>
              <Button icon="export" type="primary" onClick={() => this.handleExport()}>
                模板下载
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button icon="delete" type="primary" onClick={() => this.handleRemove()}>
                  删除</Button>
                  {/* <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown> */}
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
             onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <DeptForm {...parentMethods} modalVisible={modalVisible} record={record} />
 
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
