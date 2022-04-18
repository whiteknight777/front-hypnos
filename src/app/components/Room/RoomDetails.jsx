import React from 'react';
import { Drawer, Rate, Divider, Form, Input, Button, Alert, DatePicker, Space, Modal} from 'antd';
import { useNavigate } from "react-router-dom";
import {TiInputChecked} from 'react-icons/ti';
import { UserContext } from '../../../contexts/userProvider';
import './Room.scss';
import Slider from '../Slider/Slider';

function RoomDetails({room, onClose, visible, facility}) {
    const { userStore } = React.useContext(UserContext);
    const { isAuthorized } = userStore;
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Vous devez vous connecter pour pouvoir faire une réservation');

    const nav = useNavigate()
    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setModalText('Vous allez être redirigé dans quelques instant...');
        setLoading(true);
        setTimeout(() => {
          nav('/connexion', { replace: true })
          setOpen(false);
          setLoading(false);
          setModalText('Vous devez vous connecter pour pouvoir faire une réservation ?');
        }, 1500);
    };

    const handleCancel = () => {
        setOpen(false);
    };

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

    const checkSubmition = () => {
        if(isAuthorized){
            // TODO 
            console.log('submit form')
        }else{
            showModal()
        }
    }

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
                        <Input placeholder="input placeholder" defaultValue={facility.name} disabled />
                    </Form.Item>
                    <Form.Item label="Suite">
                        <Input placeholder="input placeholder" defaultValue={room.title} disabled/>
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
                        <Button onClick={checkSubmition} type="primary" size="large" shape="round" block>Réserver</Button>
                    </Form.Item>
                </Form>
                <Modal
                    title="Réservations"
                    visible={open}
                    onOk={()=> {
                        handleOk()
                    }}
                    okText="Se connecter"
                    cancelText="Annuler"
                    confirmLoading={loading}
                    onCancel={handleCancel}
                >
                    <p>{modalText}</p>
                </Modal>
            </div>
        </div>
      </section> 
      </Drawer>
     );
}

export default RoomDetails;