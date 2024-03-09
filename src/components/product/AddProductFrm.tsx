import { Component, ReactNode } from "react";
import { Form, Upload, Button } from "antd";
import { UploadOutlined } from '@ant-design/icons';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
    imageUpload?: string
  };

class AddProductFrm extends Component {
    
    render(): ReactNode {
        return (
            <Form>
                <Form.Item
                  label="New swiper images"
                  name="swiper"
                  rules={[{ required: true, message: 'Please input your at least one image!' }]}
                >
                  <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload> 
                </Form.Item>
            </Form>
        );
    }
}

export default AddProductFrm;