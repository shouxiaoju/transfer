import { Button , Modal , Form , Input , Upload,} from 'antd';
import { PlusOutlined,LoadingOutlined} from '@ant-design/icons'
import React,{useState,useEffect} from 'react';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };
    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };


const Modalform=(props:any)=>{
    const{isModalVisible,offvisible,upnewdata,gobackdata}=props
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
  
    const handleOk = () => {
        form.validateFields().then((value)=>{
            console.log("validateFields",value);
            let obj={
                img:imageUrl,
                title:value.title,
                link:value.link
            }
            upnewdata(obj)
            offvisible()
        })
        .catch((errorInfo)=>{
            console.log("errorInfo",errorInfo);
        })
        
    };
  useEffect(()=>{
      console.log("回填",gobackdata);
      
    form.setFieldsValue(gobackdata)
  },[gobackdata])
    const handleCancel = () => {
        offvisible()
    };
    /* 图片 */

    const normFile = (e:any) => {  
        if (Array.isArray(e)) {
        return e;
        }
        return e && e.fileList;
    };
    
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {

        if (info.file.status === 'uploading') {
        setLoading(true);
        return;
        }

        if (info.file.status === 'done') {
            console.log("图片触发");
            
            getBase64(info.file.originFileObj as RcFile, url => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <>
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} forceRender={true}>
            <Form {...layout} form={form} name="control-hooks" >
                <Form.Item 
                    label="活动图"
                    name="img"
                    valuePropName="fileList" 
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: '请上传活动图片' }]}
                    extra={
                        <div>推荐尺寸: 1035*261</div>
                    }
                >
                    <Upload
                        name="multipartFile"
                        //action="/campus/campusweb/upload/pictureUpload"
                        listType="picture-card"
                        onChange={handleChange}
                    >
                       {uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item name="title" label="运位名称" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="link" label="运营位连接" >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    </>
    )
}

export default Modalform