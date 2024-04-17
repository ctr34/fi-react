import { Component, ReactNode } from "react";
import { Form, Input, Select, Button, message, Space } from "antd";
import { ProductData } from "./ProductData"; 
import axios from "axios"

import React, {RefObject} from "react";

const apiUrl: string = import.meta.env.VITE_API_URL;
const { TextArea } = Input;

interface EditProductFrmProps {
  closeModal: any
  productData: ProductData
  reload(): any
}

class EditProductFrm extends Component<EditProductFrmProps> {
  uploadRef: RefObject<any>;
  constructor(props: EditProductFrmProps) {
    super(props);
    this.uploadRef = React.createRef();
  }

  productData = this.props.productData

  handleSubmit = async (values: any) => {
    console.log("handleSubmit ref upload", this.uploadRef.current);
    console.log("handleSubmit", values);
    
    const { id, name, size, description } = values;
  
    const payload = {
      id, name, size, description
    }
  
    try {
      const response = await axios.post(`${apiUrl}/api/product/updateProduct`, payload);
  
      console.log('Response:', response.data);
      message.success('Product added successfully!');
      this.props.closeModal()
      this.props.reload()
    } catch (error) {
      console.error('Error:', error);
      message.error('Failed to add product. Please try again later.');
    }
  }

  tailLayout = {
    wrapperCol: { offset: 0, span: 16 },
  }

  render(): ReactNode {
      return (
          <Form 
            initialValues={this.productData}
            onFinish={this.handleSubmit}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}>

              <Form.Item name="id" label="id" rules={[{ required: true, message: "请输入商品id" }]}>
                <Input disabled/>
              </Form.Item>
              
              <Form.Item name="name" label="Name" rules={[{ required: true, message: "请输入商品名称" }]}>
                <Input />
              </Form.Item>

              <Form.Item name="size" label="Size" rules={[{ required: true, message: "请输入商品尺寸" }]}>
                <Select>
                  <Select.Option value="6">6 inches</Select.Option>
                  <Select.Option value="7">7 inches</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="description" label="Description">
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item {...this.tailLayout}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  {/* <Button htmlType="button" onClick={this.handleReset}>
                    Reset
                  </Button> */}
                </Space>
              </Form.Item>
          </Form>
      );
  }
}

export default EditProductFrm