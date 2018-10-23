import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
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
  TreeSelect,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './dept.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['注销', '正常', '已上线', '异常'];
const treeData = [{
  title: 'Node1',
  value: '0-0',
  key: '0-0',
  children: [{
    title: 'Child Node1',
    value: '0-0-1',
    key: '0-0-1',
  }, {
    title: 'Child Node2',
    value: '0-0-2',
    key: '0-0-2',
  }],
}];
const CreateForm = Form.create()(props => {
  const icon = <Icon type="smile" />;
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  let value="0-0";
  const onChangeTree = () => {
    value
  };
  return (
    <Modal
      destroyOnClose
      title="新建机构"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
    {/*
 orgName: `行政划区 ${i}`,//行政划区
        orgNum: `A0 ${i}`,//行政编码
        address: '102.33,12.345',//地址

  */}
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="上级行政区划">
        {form.getFieldDecorator('parentId', {initialValue: value,
          rules: [{ required: true, message: '选择上级行政区划'}],
        })(<TreeSelect
          style={{ width: 300 }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={treeData}
          placeholder="Please select"
          treeDefaultExpandAll
          suffixIcon={icon}
         onChange={onChangeTree}
         showSearch={true}
         treeNodeFilterProp={"title"}
        />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="行政区划">
        {form.getFieldDecorator('orgName', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="地址">
        {form.getFieldDecorator('address', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});



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
          <a onClick={() => this.handleRemove(true, record)}>删除</a>
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

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleRemove = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    dispatch({
      type: 'rule/remove',
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
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
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
      type: 'rule/update',
      payload: {
        name: fields.name,
        desc: fields.desc,
        key: fields.key,
      },
    });

    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

  render() {
    const {
      dept: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
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
            {/* {this.renderForm()} */}
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
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
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
        <CreateForm {...parentMethods} modalVisible={modalVisible}  updateModalVisible={updateModalVisible}/>
        {/* {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null} */}
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
