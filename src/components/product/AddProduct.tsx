import { Component, ReactNode } from "react"
import { Modal } from "antd"
import AddProductFrm from "./AddProductFrm";

interface AddProductProps {
    visible: boolean;
    close(): void;
    deleteImage(pid: any): void;
    datasource: [];
    onRefreshData(): void;
  }

class AddProduct extends Component<AddProductProps> {

    render(): ReactNode {
        return (
            <Modal 
                open={this.props.visible} 
                onCancel={() => this.props.close()}
                title="Add product" 
                cancelText="Done"
                // okText={null}
                footer={null}
                > 
                    <AddProductFrm 
                        dataSource={this.props.datasource}
                        deleteImage={this.props.deleteImage}
                        onRefreshData={this.props.onRefreshData}
                    />
            </Modal>
        );
    }
}
export default AddProduct;