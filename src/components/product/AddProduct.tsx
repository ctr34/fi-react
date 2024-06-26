import { Component, ReactNode } from "react"
import { Modal } from "antd"
import AddProductFrm from "./AddProductFrm";

interface AddProductProps {
    visible: boolean;
    close(): void;
    reload(): void
  }

class AddProduct extends Component<AddProductProps> {

    closeModal = () => {
        this.props.close()
    }

    reload = () => {
        this.props.reload()
    }

    render(): ReactNode {
        return (
            <Modal 
                open={this.props.visible} 
                onCancel={() => this.props.close()}
                title="Add product" 
                cancelText="Done"
                footer={null}
                destroyOnClose
                > 
                <AddProductFrm 
                    closeModal={this.closeModal}
                    reload={this.reload}
                />
            </Modal>
        );
    }
}
export default AddProduct;