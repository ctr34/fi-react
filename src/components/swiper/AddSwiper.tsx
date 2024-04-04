import { Component, ReactNode } from "react"
import { Modal } from "antd"
import AddSwiperFrm from "./AddSwiperFrm";

interface AddSwiperProps {
    visible: boolean;
    close(): void;
    deleteImage(pid: any): void;
    datasource: [];
    onRefreshData(): void;
  }

class AddSwiper extends Component<AddSwiperProps> {

    render(): ReactNode {
        return (
            <Modal 
                open={this.props.visible} 
                onCancel={() => this.props.close()}
                title="Add Swiper Images" 
                cancelText="Done"
                // okText={null}
                footer={null}
                > 
                    <AddSwiperFrm 
                        dataSource={this.props.datasource}
                        deleteImage={this.props.deleteImage}
                        onRefreshData={this.props.onRefreshData}
                    />
            </Modal>
        );
    }
}
export default AddSwiper;