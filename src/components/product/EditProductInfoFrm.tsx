import { Component, ReactNode } from "react";
import { Form, Input, Select, Upload, Button, message, Space, Image } from "antd";
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { ProductData } from "./ProductData"; 
import axios from "axios"
import ImageUpload from "@/components/ImageUpload"

import React, {RefObject} from "react";

const apiUrl: string = import.meta.env.VITE_API_URL;
const { TextArea } = Input;
const urlProductImages = `${apiUrl}/api/productImages`

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });


interface EditProductFrmProps {
  closeModal: any
  productData: ProductData
}

interface EditProductFrmState {
  previewOpen: boolean,
  previewImage: string,
  fileList: UploadFile[];
}

class EditProductFrm extends Component<EditProductFrmProps, EditProductFrmState> {
  uploadRef: RefObject<any>;
  constructor(props: EditProductFrmProps) {
    super(props);
    this.uploadRef = React.createRef();
    this.state = {
      previewOpen: false,
      previewImage: '',
      fileList: [{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
    };
  }

  productData = this.props.productData

  fromData: ProductData = {
    id: this.productData.id,
    name: this.productData.name,
    size: this.productData.size,
    description: this.productData.description,
  };

  normFile = (e: any) => {
    console.log("normFile: ", e);
    
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  beforeUpload = (file: File) => {
    console.log("Before upload, file:", file);
    console.log("Before upload, fileList:", this.state.fileList);
    
    // Rest of your code...

    return false; // Don's allow the upload
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
        fileList: [...newFileList],
      };
    });
  }

  handleSubmit = async (values: any) => {
    console.log("handleSubmit ref upload", this.uploadRef.current);
    console.log("handleSubmit", values);
    
    // const { name, size, images, description } = values;
  
    // const formData = new FormData();
    // formData.append('name', name);
    // formData.append('size', size);
    // formData.append('description', description);
  
    // images.forEach((file: any) => {
    //   formData.append('images', file.originFileObj);
    // });
  
    // try {
    //   const response = await axios.post(`${apiUrl}/api/product`, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   });
  
    //   console.log('Response:', response.data);
    //   message.success('Product added successfully!');
    //   this.props.closeModal()
    // } catch (error) {
    //   console.error('Error:', error);
    //   message.error('Failed to add product. Please try again later.');
    // }
  }

  tailLayout = {
    wrapperCol: { offset: 0, span: 16 },
  }

  // handleChange=(value:any) => {
  //   console.log("handleChange", value)
  //   this.setState((prevState) => {
  //     fileList: [...prevState.fileList, value]
  //   }) 
  //   return false;
  // }
  handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    console.log("handleChange", newFileList);
    
    this.setState({ fileList: newFileList});
  }
    

  handlePreview = async (file: UploadFile) => {
    console.log("handlePreview: ", file);
    
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    this.setState({
      previewImage: file.url || file.preview!,
      previewOpen: true,
    });

    console.log("handlePreview ends");
  };

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
                <Input />
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