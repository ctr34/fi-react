import { Component, ReactNode } from "react";
import { Table, Button, Image, Popconfirm, message } from "antd";
import axios from "axios"
const apiUrl: string = import.meta.env.VITE_API_URL;

class SwiperImages extends Component {
    state:any = {
      dataSource:[]
    };
    urlBackend = `${apiUrl}/api/images`
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

    changePage = (page:any) => {
      console.log(page);
      
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
            <Table dataSource={this.state.dataSource} columns={columns} rowKey="id" pagination={{
              pageSize: 3,
              defaultCurrent: 1
            }}/>
        );
    }
}

export default SwiperImages;