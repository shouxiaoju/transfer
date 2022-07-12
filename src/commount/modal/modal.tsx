import { Button, Modal,Form,Input,Select,Radio  } from 'antd';
import React, { useState,useEffect } from 'react';
const { TextArea } = Input;
const { Option } = Select;
const Modallist = (props:any) => {
    const {isModalVisible,handleCancele,goback,addtreedata,clicktyp,update,newaddfist}=props
    const [form] = Form.useForm();


    useEffect(()=>{
        let obj:any={}
        if(clicktyp=="新增"){
            obj={
                depart:goback.depart,
                type:goback.type
            }
        }else if(clicktyp=="修改"){
            obj["title"]=goback.title.props.children[2]
            obj["depart"]=goback.depart
            obj["type"]=goback.type
            obj["contact"]=goback.contact
            obj["site"]=goback.site
            obj["remark"]=goback.remark
        }
        form.setFieldsValue(obj)
    },[goback,clicktyp])


    const handleOk = () => {
    //setIsModalVisible(false);
        form.validateFields().then((value)=>{
            console.log(clicktyp);
            
            if(clicktyp=="新增"){
                addtreedata(value)
            }
            if(clicktyp=="修改"){
                update(value)
            }
            if(clicktyp=="新增一级"){
                newaddfist(value)
            }
           
            handleCancele()
        })
    };

    const handleCancel = () => {
        handleCancele()
    };

  
  return (
    <>
      <Modal title="新增组织" okText={"确定"} cancelText={"取消"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true} forceRender={true}>
        <Form
            name="basic"
            form={form}
            labelCol={{ span: 4 }}
        >
            <Form.Item name="title" label="架构名称" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="depart" label="上级部门" >
                <Select
                    placeholder="Select a option and change input text above"
                    allowClear
                    disabled
                >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                </Select>
            </Form.Item>
            <Form.Item name="type" label="架构类型">
                <Radio.Group>
                    <Radio value={'公司'}>公司</Radio>
                    <Radio value={'部门'}>部门</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item name="contact" label="联系方式" >
                <Input />
            </Form.Item>
            <Form.Item name="site" label="地址" >
                <Input />
            </Form.Item>
            <Form.Item name="remark" label="备注" >
                <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
            </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Modallist;