import { Component, ReactNode } from "react";
import { Form, Upload, Button, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import axios from "axios"
const apiUrl: string = import.meta.env.VITE_API_URL;

interface AddProductFrmProps {
  dataSource: any[]
  deleteImage(pid: any): any
  onRefreshData(): void
}

class AddProductFrm extends Component<AddProductFrmProps> {

  state = {
    fileList: []
  }

  generateUid = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };
    
  beforeUpload = (file: File) => {
    console.log(file);
    
    const imageName = file.name;

    // Perform your validation here
    const isExistingFile = this.props.dataSource.some((item: any) => item.name === imageName);

    if (isExistingFile) {
      message.info("The image already exists!");
      return false;
    }

    // const newFile = {
    //   uid: this.generateUid(),
    //   name: file.name,
    //   status: 'done',
    //   url: URL.createObjectURL(file),
    //   originFileObj: {
    //     ...file,
    //     // lastModifiedDate: new Date(), // Replace with the appropriate value
    //     // uid: this.generateUid(), // Ensure uid is unique
    //   }
    // }

    this.setState((prevState: any) => ({
      fileList: [
        ...prevState.fileList,
        file,
      ],
    }), () => {
      // This callback will be executed after the state is updated
      console.log(this.state.fileList);
    })

    

    return true; // Allow the upload
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

  handleSubmit = () => {
    const { fileList } = this.state

    if (fileList.length === 0) {
      message.error("Please upload at least one image!");
      return;
    }

    const formData = new FormData
    fileList.forEach((file) => {
      formData.append('image', file)
    })

    axios.post(`${apiUrl}/api/swiper`, formData).then(() => {
      this.setState({
        fileList: []
      })
      
      message.success("Upload successful!");
    })
    .catch((error) => {
      console.error('Error:', error);
      message.error("Upload failed. Please try again later.");
    });
  }
  

  render(): ReactNode {
      return (
          <Form onFinish={this.handleSubmit}>
              <Form.Item
                label="New swiper images"
                name="image"
                rules={[{ required: true, message: 'Please input your at least one image!' }]}
              >
                <Upload name="image" 
                        listType="picture"
                        beforeUpload={this.beforeUpload}
                        onRemove={this.handleDeletion}
                        fileList={this.state.fileList}
                        >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload> 
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
          </Form>
      );
  }
}

export default AddProductFrm;