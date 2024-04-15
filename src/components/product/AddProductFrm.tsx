import React, { Component, ReactNode, RefObject } from "react";
import { Form, Input, Select, Upload, Button, message, Space } from "antd";
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import axios from "axios"
const apiUrl: string = import.meta.env.VITE_API_URL;
const { TextArea } = Input;

interface AddProductFrmProps {
  closeModal: any
  reload(): any
}

class AddProductFrm extends Component<AddProductFrmProps> {
  uploadRef: RefObject<any>;
  constructor(props: any){
    super(props)
    this.uploadRef = React.createRef();
  }

  componentDidMount(): void {
    console.log("initial uploadRef: ", this.uploadRef.current);
  }

  normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  generateUid = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  beforeUpload = (file: File) => {
    console.log("Before upload, fileList:", file);
    
    // Rest of your code...

    return false; // Allow the upload
};

  handleDeletion = (file: UploadFile) => {
    console.log("hit handleDeletion")
    // const updatedFileList = this.state.fileList.filter((item) => item.uid !== file.uid);
    // this.setState({ fileList: updatedFileList });
    this.setState((state: any) => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
      };
    });
  }

  handleSubmit = async (values: any) => {
    console.log(values);
    
    const { name, size, images, description } = values;
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('size', size);
    formData.append('description', description);
  
    images.forEach((file: any) => {
      formData.append('images', file.originFileObj);
    });
  
    try {
      const response = await axios.post(`${apiUrl}/api/product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      message.success('Product added successfully!'),
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
            onFinish={this.handleSubmit}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}>

              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name="size" label="Size" rules={[{ required: true }]}>
              <Select>
                <Select.Option value="6">6 inches</Select.Option>
                <Select.Option value="7">7 inches</Select.Option>
              </Select>
              </Form.Item>

               <Form.Item 
                  name="images" 
                  label="Images" 
                  valuePropName="fileList" 
                  getValueFromEvent={this.normFile} 
                  rules={[{ required: true }]}
                >
                  <Upload 
                    ref={this.uploadRef}
                    listType="picture-card" 
                    beforeUpload={this.beforeUpload}>
                      <button style={{ border: 0, background: 'none' }} type="button">
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </button>
                  </Upload>
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

export default AddProductFrm;