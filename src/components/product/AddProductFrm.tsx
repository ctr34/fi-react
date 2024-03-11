import { Component, ReactNode } from "react";
import { Form, Upload, Button, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
const apiUrl: string = import.meta.env.VITE_API_URL;

interface AddProductFrmProps {
  dataSource: any[]
  deleteImage(pid: any): any
  onRefreshData(): void
}

interface AddProductFrmState {
  fileList: UploadFile[]
}

class AddProductFrm extends Component<AddProductFrmProps, AddProductFrmState> {

  state: AddProductFrmState = {
    fileList: []
  }

  generateUid = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };
    
  beforeUpload = (file: File) => {
    const imageName = file.name;

    // Perform your validation here
    const isExistingFile = this.props.dataSource.some((item: any) => item.name === imageName);

    if (isExistingFile) {
      message.info("The image already exists!");
      return false;
    }

    this.setState((prevState) => ({
      fileList: [
        ...prevState.fileList,
        { uid: this.generateUid(), name: file.name, status: 'done', url: URL.createObjectURL(file) },
      ],
    }))

    // Other validation logic can be added here

    return true; // Allow the upload
  };

  handleUploadError = (info: any) => {
    // const { file } = info;
    console.log("hit handleUploadError")
    this.props.onRefreshData()
  }

  handleDeletion = (info: any) => {
    const { file } = info;
    console.log(this.props.dataSource);
    
    // // Check if the file object is defined and has the expected properties
    // if (file && file.name) {
    //   console.log("Deleted file:", file);
  
    //   // Find the corresponding image in dataSource based on its name
    //   const imageToDelete = this.props.dataSource.find((item) => item.name === file.name);
  
    //   if (imageToDelete) {
    //     const imageId = imageToDelete.id; // Assuming 'id' is the property that represents the ID
    //     console.log("Deleting image with ID:", imageId);
  
    //     // Delete the image from the backend using the ID
    //     this.props.deleteImage(imageId);
    //   } else {
    //     console.warn("Image not found in dataSource:", file.name);
    //   }
  
    //   // Delete the image from the UI
    //   const updatedFileList = this.state.fileList.filter((item) => item.uid !== file.uid);
    //   this.setState({ fileList: updatedFileList });
    // } else {
    //   console.warn("Invalid file object:", file);
    // }
  };
  

  render(): ReactNode {
      return (
          <Form>
              <Form.Item
                label="New swiper images"
                name="image"
                rules={[{ required: true, message: 'Please input your at least one image!' }]}
              >
                <Upload name="image" 
                        action={`${apiUrl}/api/swiper`} 
                        listType="picture-card"
                        beforeUpload={this.beforeUpload}
                        onChange={this.handleUploadError}
                        // onRemove={this.handleDeletion}
                        fileList={this.state.fileList}
                        >
                  {/* <Button icon={<UploadOutlined />}>Click to upload</Button> */}
                  upload
                </Upload> 
              </Form.Item>
          </Form>
      );
  }
}

export default AddProductFrm;