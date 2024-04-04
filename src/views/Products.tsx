import { Component, ReactNode } from "react";
import { Table, Button, Image, Popconfirm, message } from "antd";
import axios from "axios"
import AddProduct from "@/components/product/AddProduct";
const apiUrl: string = import.meta.env.VITE_API_URL;

class Products extends Component {

  state:any = {
    dataSource:[],
    showAddingDialog: false 
  };

  urlProduct = `${apiUrl}/api/product`
  urlProductImages = `${apiUrl}/api/productImages`

  loadData = () => {
    axios.get(this.urlProduct).then((res) => {
        
        this.setState({ dataSource: res.data });
        console.log("Products loadData");
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
            render: (record:any) => (
              <Image width={100} src={this.urlProductImages+"/getFirstImage/"+record.id}/>
              // <Image width={150} src={`data:image/png;base64,${record.imageData}`}/>
            ),
          },
          {
            title: '操作',
            // dataIndex: 'imageData',
            key: 'id',
            render: (record:any) => (
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
        </div>
      );
  }
}

export default Products;