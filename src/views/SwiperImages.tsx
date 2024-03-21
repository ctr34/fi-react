import { Component, ReactNode } from "react";
import { Table, Button, Image, Popconfirm, message } from "antd";
import axios from "axios"
import AddProduct from "@/components/product/AddProduct";
const apiUrl: string = import.meta.env.VITE_API_URL;

class SwiperImages extends Component {

    state:any = {
      dataSource:[],
      showAddingDialog: false 
    };

    urlBackend = `${apiUrl}/api/swiper`
    loadData = () => {
      axios.get(this.urlBackend).then((res) => {
          
          this.setState({ dataSource: res.data });
        })
    }
    componentDidMount(): void {
      this.loadData()
      
    }
    handleDelete = (pid: any) => {
      axios.delete(this.urlBackend, { params: { id : pid }}).then((res) => {
        console.log(res);
        
        if (res.status === 200) {
          message.info("Image deleted successfully!")
          this.loadData()
        } else {
          message.error("Image deletion falied!")
        }
      })
    }

    handleSwapOrder = (entryId: any, moveDir: number) => {
      const record = this.state.dataSource.find((item: any) => item.id === entryId);
      if (!record) {
        // If the record doesn't exist, show an error message
        message.error("Image not found.");
        return;
      }
  
      if ((record.displayOrder === 1 && moveDir === -1) || (record.displayOrder === this.state.dataSource.length && moveDir === 1)) {
        // If the image is already at the top and trying to move up, or already at the bottom and trying to move down, show a message
        message.warning(moveDir === -1 ? "Image is already at the top." : "Image is already at the bottom.");
        return;
      }

      
      axios
        .post(`${this.urlBackend}/swapOrder/${entryId}/${moveDir}`)
        .then(() => {
          message.success("Image order swapped successfully!");
          this.loadData();
        })
        .catch((error) => {
          console.error("Error swapping image order:", error);
          message.error("Failed to swap image order.");
        });
    }

    handleAddIamge = () => {
      this.setState({ showAddingDialog: true })
    }

    closeAddingDialog = () => {
      this.setState({ showAddingDialog: false })
    }
    handleRefreshData = () => {
      console.log("Refreshing data...");
      this.loadData()
    }


    render(): ReactNode {

        const columns = [
            {
              title: '展示顺序',
              dataIndex: 'displayOrder',
              key: 'displayOrder',
            },
            {
              title: '名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '类型',
              dataIndex: 'type',
              key: 'type',
            },
            {
              title: '图片预览',
              // dataIndex: 'imageData',
              key: 'imageData',
              render: (record:any) => (
                <Image width={100} src={this.urlBackend+"/"+record.name}/>
                // <Image width={150} src={`data:image/png;base64,${record.imageData}`}/>
              ),
            },
            {
              title: '操作',
              // dataIndex: 'imageData',
              key: 'id',
              render: (record:any) => (
                <>
                  <Popconfirm
                    title="Delete the picture"
                    description="Are you sure to delete this picture?"
                    
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => {
                      this.handleDelete(record.id)
                    }}
                  >
                   <Button type="primary" style={{ marginRight: 8 }}>Delete</Button>
                  </Popconfirm>

                  <Button
                    type="default"
                    onClick={() => this.handleSwapOrder(record.id, -1)}
                    style={{ marginRight: 8 }}
                  >
                    Up
                  </Button>

                  <Button
                    type="default"
                    onClick={() => this.handleSwapOrder(record.id, 1)}
                    style={{ marginRight: 8 }}
                  >
                    Down
                  </Button>
                </>
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
              Add swiper image
            </Button>
            <Table dataSource={this.state.dataSource} columns={columns} rowKey="id" pagination={{
              pageSize: 3,
              defaultCurrent: 1
            }}/>
            <AddProduct 
              visible={this.state.showAddingDialog}
              close={this.closeAddingDialog}
              datasource={this.state.dataSource}
              deleteImage={this.handleDelete}
              onRefreshData={this.handleRefreshData}
              />
          </div>
        );
    }
}

export default SwiperImages;