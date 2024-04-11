import { Component, ReactNode } from "react";
import { Table, Button, Image, Popconfirm, message } from "antd";
import axios from "axios"
import AddProduct from "@/components/product/AddProduct";
import EditProduct from "@/components/product/EditProduct";
const apiUrl: string = import.meta.env.VITE_API_URL;

class Products extends Component {

  state:any = {
    dataSource:[],
    showAddingDialog: false,
    showEditingDialog: false,
    editingRecord: {},
    imageIds: {}
  };

  urlProduct = `${apiUrl}/api/product`
  urlProductImages = `${apiUrl}/api/productImages`

  loadData = () => {
    axios.get(this.urlProduct).then((res) => {
        
        this.setState({ dataSource: res.data });

        res.data.forEach(
          (record:any) => {
            axios.get(`${this.urlProductImages}/getImageIds/${record.id}`).then(
              (imageRes: any) => {
                this.setState((prevState: any) => ({
                  imageIds: { ...prevState.imageIds, [record.id]: imageRes.data }
                }))
              }
            )
          }
        )
      })
  }
  componentDidMount(): void {
    this.loadData()
  }
  handleDelete = (pid: any) => {
    axios.delete(this.urlProduct, { params: { id : pid }}).then((res) => {
      console.log(res);
      
      if (res.status === 200) {
        message.info("Image deleted successfully!")
        this.loadData()
      } else {
        message.error("Image deletion falied!")
      }
    })
  }

  changePage = (page:any) => {
    console.log(page);
    
  }

  handleAddIamge = () => {
    this.setState({ showAddingDialog: true })
  }
  closeAddingDialog = () => {
    this.setState({ showAddingDialog: false })
  }

  handleEdit = (data:any) => {
    this.setState({ showEditingDialog: true, editingRecord: data})
  }
  closeEditingDialog = () => {
    this.setState({ showEditingDialog: false })
  }

  render(): ReactNode {

      const columns = [
          {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '尺寸',
            dataIndex: 'size',
            key: 'size',
          },
          {
            title: '(首张)图片预览',
            // dataIndex: 'imageData',
            key: 'imageData',
            render: (record:any) => {

              //get the ids of images from backend 
              const imageIds = this.state.imageIds[record.id] || [];
              //iterately display image by url
              return (
                <div>
                  {imageIds.map((imageId: any) => (
                    <Image key={imageId} width={100} src={`${this.urlProductImages}/getImageById/${imageId}`} />
                  ))}
                </div>
              );

              <Image width={100} src={this.urlProductImages+"/getFirstImage/"+record.id}/>
              // <Image width={150} src={`data:image/png;base64,${record.imageData}`}/>
            }
          },
          {
            title: '操作',
            // dataIndex: 'imageData',
            key: 'id',
            render: (record:any) => (
              <div style={{ display: 'flex', gap: '8px'}}>
                <Button onClick={() => this.handleEdit(record)}>
                  Edit
                </Button>
                <Popconfirm
                  title="Delete the picture"
                  description="Are you sure to delete this picture?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => {
                    this.handleDelete(record.id)
                  }}
                >
                  <Button type="primary">Delete</Button>
                </Popconfirm>
              </div>
            ),
            
          },
          
        ];

      return (
        <div>
          <Button 
            type="primary"
            onClick={() => this.handleAddIamge()}
            style={{ margin: 8 }}
          >
            Add a product
          </Button>
          <Table dataSource={this.state.dataSource} columns={columns} rowKey="id" pagination={{
            pageSize: 5,
            defaultCurrent: 1
          }}/>
          <AddProduct
            visible={this.state.showAddingDialog}
            close={this.closeAddingDialog}
          />
          <EditProduct
            visible={this.state.showEditingDialog}
            close={this.closeEditingDialog}
            loadData={this.state.editingRecord}
          />
        </div>
      );
  }
}

export default Products;