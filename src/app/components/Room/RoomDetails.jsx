import React from 'react';
import { Drawer, Rate, Divider, Form, Input, Button, Alert, DatePicker, Space} from 'antd';
import moment from 'moment';
import './Room.scss'
import Slider from '../Slider/Slider';

function RoomDetails({id, onClose, visible}) {
    const roomPictures = [
      {src: "https://via.placeholder.com/800x400", alt: "pic1"},
      {src: "https://via.placeholder.com/800x400", alt: "pic2"},
      {src: "https://via.placeholder.com/800x400", alt: "pic3"},
      {src: "https://via.placeholder.com/800x400", alt: "pic4"},
    ]
    const options = {autoplay: true, position: 'bottom'}
    const [form] = Form.useForm();


    const onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    return ( 
        <Drawer
        title={`Suite ${id}`}
        placement={"right"}
        width={800}
        onClose={onClose}
        visible={visible}
      >
        
      <section className="drawer-content">
        <Slider
          data={roomPictures}
          options={options}
        />
        <div className="container">
            <h3 className="title">Description</h3>
            <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            </p>
            <div className="sub-infos">
                <span className="price"><b>Prix/nuit :</b> <strong>79€</strong></span>
                <Rate allowClear={true} defaultValue={4} />
            </div>

            <Divider dashed/>

            <h3 className="title">Services</h3>
            <ul className="services-list">
                <li className="item-service">officia deserunt mollit anim id est laborum.</li>
                <li className="item-service">officia deserunt mollit anim id est laborum.</li>
                <li className="item-service">officia deserunt mollit anim id est laborum.</li>
                <li className="item-service">officia deserunt mollit anim id est laborum.</li>
                <li className="item-service">officia deserunt mollit anim id est laborum.</li>
                <li className="item-service">officia deserunt mollit anim id est laborum.</li>
            </ul>

            <Divider dashed/>
            
            <h3 className="title">Faire une réservation</h3>
            <Alert
                className="alert-box"
                message="Success Tips"
                description="Detailed description and advice about successful copywriting."
                type="success"
                showIcon
            />
            <div className="form-container">
                <Form
                className="form-horizontal"
                layout={'vertical'}
                form={form}
                initialValues={{ layout: 'vertical' }}
                >
                    <Form.Item label="Etablissement">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item label="Suite">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item label="Date de début">
                        <Space direction="vertical">
                            <DatePicker />
                        </Space>
                    </Form.Item>
                    <Form.Item label="Date de fin">
                        <Space direction="vertical">
                            <DatePicker  />
                        </Space>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" size="large" shape="round" block>Réserver</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
      </section> 
      </Drawer>
     );
}

export default RoomDetails;