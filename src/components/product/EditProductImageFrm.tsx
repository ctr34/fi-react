import { Component, ReactNode } from "react";
import {  Upload, message, Image } from "antd";
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from "axios"

import React, {RefObject} from "react";

const apiUrl: string = import.meta.env.VITE_API_URL;
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
  productId: number
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
      fileList: []
    };
  }

  componentDidMount() {
    // Fetch images based on product ID when the component mounts
    this.fetchImages(this.props.productId);
  }

  fetchImages = async (productId: number) => {
    try {
      const response = await axios.get(`${urlProductImages}/getImagesIdByProductId/${productId}`);
      const images = response.data; // Assuming response.data is an array of image URLs
      const fileList = images.map((imageId: string) => ({
        uid: `${imageId}`,
        status: 'done',
        url: `${urlProductImages}/getImageById/${imageId}`,
      }));
      this.setState({ fileList: fileList }, () => {
        console.log("fetching Images ends ---", this.state.fileList);
      }); 
      
      
    } catch (error) {
      console.error('Error fetching images:', error);
      message.error('Failed to fetch images');
    }
  };

  normFile = (e: any) => {
    console.log("normFile: ", e);
    
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  beforeUpload = () => {

    return false; // Don't allow the upload
};

  handleDeletion = (file: UploadFile) => {
    console.log("hit handleDeletion")

    axios.delete(`${urlProductImages}?id=${file.uid}`).then(
      
    )

    this.setState((prevState: any) => {
      const newFileList = prevState.fileList.filter((oldFile:any) => oldFile.uid !== file.uid)
      return {
        fileList: [...newFileList],
      };
    });
  }

  handleChange: UploadProps['onChange'] = async ({ fileList: newFileList, file }) => {
    if (file && file.status === 'removed') {
      // Handle deletion
      this.handleDeletion(file);
      return;
    }

    console.log("handleChange-newFileList", newFileList);
    console.log("the global fileList is: ",this.state.fileList);
    console.log("handleChange-singlefile", file);
    const newFile = newFileList[newFileList.length - 1];

    if (newFile && newFile.originFileObj){
      console.log("Enter handleChange if");
      
      const formData = new FormData();
      formData.append('productId', `${this.props.productId}`)
      formData.append('image', newFile.originFileObj)
      try {
        const response = await axios.post(`${urlProductImages}/uploadImageWithProductId`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        message.success('Image added successfully!')
        const respImageId = response.data
        const newImage = {
          uid: `${respImageId}`,
          status: 'done',
          url: `${urlProductImages}/getImageById/${respImageId}`,
        }
        this.setState((prevState: any) => {
          return {
            fileList: [...prevState.fileList, newImage]
          }
        });

      } catch (error) {
        message.success('Failed to add image!')
      }
    }    

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
        <div>
          <Upload 
            ref={this.uploadRef}
            action=""
            listType="picture-card" 
            fileList={this.state.fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            beforeUpload={this.beforeUpload}>
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
          </Upload>
          {this.state.previewImage && (
            <Image
              wrapperStyle={{ display: 'none' }}
              preview={{
                visible: this.state.previewOpen,
                onVisibleChange: (visible) => this.setState({ previewOpen: visible}),
                afterOpenChange: (visible) => !visible && this.setState({ previewImage: ''})
              }}
              src={this.state.previewImage}
            />
          )}
        </div>
      );
  }
}

export default EditProductFrm