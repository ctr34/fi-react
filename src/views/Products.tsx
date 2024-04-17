import { Component, ReactNode } from "react";
import { Table, Button, Image, Popconfirm, message, Badge } from "antd";
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
    typeOfEditProduct: "",
    numImages: 0
  };

  urlProduct = `${apiUrl}/api/product`
  urlProductImages = `${apiUrl}/api/productImages`

  loadData = () => {
    axios.get(this.urlProduct).then((res) => {
      const products = res.data
      const promises = products.map((product: any) => {
        return axios.get(`${this.urlProductImages}/getNumImagesByProductId?product_id=${product.id}`)
        .then((ress) => ({...product, numImages:ress.data}))
        .catch(() => ({ ...product, numImages: 0 }));
      })
      Promise.all(promises)
      .then((updatedProducts) => {
        this.setState({ dataSource: updatedProducts });
      })
      .catch((error) => {
        console.error("Error loading product images:", error);
      });
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

  handleInfoEdit = (data:any) => {
    this.setState({ showEditingDialog: true, editingRecord: data, typeOfEditProduct: "info" })
  }

  handleImageEdit = (data:any) => {
    this.setState({ showEditingDialog: true, editingRecord: data, typeOfEditProduct: "image" })
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
            key: 'imageData',
            render: (record:any) => {
              return (
                <div style={{ position: 'relative' }}>
                  <Image width={100} src={this.urlProductImages+"/getFirstImage/"+record.id}/>
                  {record.numImages > 1 && (
                    <Badge 
                      count={record.numImages} 
                      style={{ position: 'absolute', top: 5, right: 5 }} 
                    >
                    </Badge>
                  )}
                </div>
              );
            }
          },
          {
            title: '操作',
            key: 'id',
            render: (record:any) => (
              <div style={{ display: 'flex', gap: '8px'}}>
                <Button onClick={() => this.handleInfoEdit(record)}>
                  Edit info
                </Button>
                <Button onClick={() => this.handleImageEdit(record)}>
                  Edit image
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
            reload={this.loadData}
          />
          <EditProduct
            title={this.state.typeOfEditProduct}
            visible={this.state.showEditingDialog}
            close={this.closeEditingDialog}
            loadData={this.state.editingRecord}
            reload={this.loadData}
          />
        </div>
      );
  }
}

export default Products;