import { Component, ReactNode } from "react"
import { Modal } from "antd"
import EditProductInfoFrm from "./EditProductInfoFrm";
import EditProductImageFrm from "./EditProductImageFrm"
import { ProductData } from "./ProductData"; 

interface EditProductProps {
    title: string;
    visible: boolean;
    close(): void;
    loadData: ProductData;
  }

class EditProduct extends Component<EditProductProps> {

    closeModal = () => {
        this.props.close()
    }

    renderFormComponent = () => {
        if (this.props.title === 'info') {
            return (
                <EditProductInfoFrm 
                    closeModal={this.closeModal}
                    productData={this.props.loadData}
                />
            );
        } else {
            return (
                <EditProductImageFrm 
                    closeModal={this.closeModal}
                    productId={this.props.loadData.id}
                />
            );
        }
    }

    render(): ReactNode {

        const modalTitle = `Edit product ${this.props.title}`;

        return (
            <Modal 
                open={this.props.visible} 
                onCancel={() => this.props.close()}
                title={modalTitle}
                cancelText="Done"
                footer={null}
                destroyOnClose
                > 
                {this.renderFormComponent()}
            </Modal>
        );
    }
}
export default EditProduct;