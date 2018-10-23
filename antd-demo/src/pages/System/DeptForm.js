import {
  Form,
  Input,
  Icon,
  Modal,
   TreeSelect,
} from 'antd';
const FormItem = Form.Item;
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
const DeptForm = Form.create()(props => {
    const icon = <Icon type="smile" />;
    const { modalVisible, form, handleAdd, handleModalVisible ,record} = props;
   const {orgName}=record;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleAdd(fieldsValue);
      });
    };
    let value="0-0";
    const onChangeTree = () => {
    
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
          {form.getFieldDecorator('orgName', {initialValue: orgName,
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
  export default DeptForm;