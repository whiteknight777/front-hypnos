import React from 'react';
import { Drawer, Rate, Divider, Form, Input, Button, Alert, DatePicker, Space} from 'antd';
// import moment from 'moment';
import './Room.scss';
import {TiInputChecked} from 'react-icons/ti';
import Slider from '../Slider/Slider';

function RoomDetails({room, onClose, visible}) {
    let roomPictures = []
    // prepare room pictures
    const {medias} = room;
    if(medias.length > 0){
        medias.forEach(media => {
            roomPictures.push({
                src: media.url,
                alt: media.name
            })
        })
    }else{
        roomPictures = [
            {src: "https://via.placeholder.com/800x480", alt: "pic1"},
            {src: "https://via.placeholder.com/800x480", alt: "pic2"},
        ]
    }
    const options = {autoplay: true, position: 'bottom'}
    const [form] = Form.useForm();

    return ( 
        <Drawer
        title={`${room.title}`}
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
            {room.description}
            </p>
            <div className="sub-infos">
                <span className="price"><b>Prix/nuit :</b> <strong>{`${room.price} €`}</strong></span>
                <Rate allowClear={true} defaultValue={4} />
            </div>

            <Divider dashed/>

            <h3 className="title">Services</h3>
            <ul className="services-list">
                {room.services.length > 0 ? (
                    room.services.map(el => (
                        <li key={`service-${el.createdAt}`} className="item-service">
                            <TiInputChecked className="icon" /> {el.service.title}
                        </li>
                    ))
                ): (
                    <span>Aucun service disponible...</span>
                )}
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