import { Component, ReactNode } from "react"
import { Modal } from "antd"
import AddProductFrm from "./AddProductFrm";

interface AddProductProps {
    visible: boolean;
    close(): void;
  }

class AddProduct extends Component<AddProductProps> {

    render(): ReactNode {
        return (
            <Modal 
                open={this.props.visible} 
                onCancel={() => this.props.close()}
                title="Add product" 
                okText="add" 
                cancelText="cancel"
                > 
                    <AddProductFrm></AddProductFrm>
            </Modal>
        );
    }
}
export default AddProduct;