import React from 'react';
import { Drawer, Rate, Divider, Form, Input, Spin, Alert, DatePicker, Space, Modal} from 'antd';
import { useNavigate } from "react-router-dom";
import {TiInputChecked} from 'react-icons/ti';
import { useFormik } from 'formik';
import { UserContext } from '../../../contexts/userProvider';
import { NewBooking } from '../../../utils/requests/bookings';
import BookingSchema from '../../validatorSchema/bookingSchema';
import Slider from '../Slider/Slider';
import './Room.scss';

function RoomDetails({room, onClose, visible, facility}) {
    const { userStore } = React.useContext(UserContext);
    const { isAuthorized, userInfos } = userStore;
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Vous devez vous connecter pour pouvoir faire une réservation');

    
    const [isSuccess, setSuccess] = React.useState(undefined);
    const initialValues = {
      startDate: "",
      endDate: "",
    }

    const formik = useFormik({
        initialValues,
        validationSchema: BookingSchema,
        onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
            values.userId = userInfos.id
            values.roomId = room.id
            values.isDeleted = false
            setSubmitting(true)
            try {
                const response = await NewBooking(values)
                const {data} = response;
                console.log(data)
                setSuccess(true)
                setStatus("Votre réservation à bien été enregistrée !")
                setTimeout(() => {
                  resetForm()
                }, 4000)
            } catch (error) {
                console.error(error.message)
                setSuccess(false)
                setStatus(error.response?.data?.message || error.message)
            }finally{
                setSubmitting(false)
            }
        }
    });
    
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
            formik.handleSubmit()
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
            {formik.status && (
                <Alert
                    className="alert-box"
                    message={isSuccess === true ? "Succès" : "Erreur"}
                    description={formik.status}
                    type={isSuccess === true ? "success" : "error"}
                    showIcon
                />
              )}
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
                        <Input placeholder="DD/MM/YYYY" name="startDate"
                            {...formik.getFieldProps('startDate')}/>
                            {formik.touched.startDate && formik.errors.startDate ? (
                                <div className="form-error">
                                    <div className="help-block">{formik.errors.startDate}</div>
                                </div>
                            ) : null}
                    </Form.Item>
                    <Form.Item label="Date de fin">
                        <Input placeholder="DD/MM/YYYY" name="endDate"
                            {...formik.getFieldProps('endDate')}/>
                            {formik.touched.endDate && formik.errors.endDate ? (
                                <div className="form-error">
                                    <div className="help-block">{formik.errors.endDate}</div>
                                </div>
                            ) : null}
                    </Form.Item>
                    <Form.Item>
                        {/* <Button onClick={checkSubmition} type="primary" size="large" shape="round" block>Réserver</Button> */}
                        <button 
                        type="submit" 
                        className="submit-btn"
                        onClick={checkSubmition}
                        disabled={formik.isSubmitting}
                        >
                            Réserver
                            {formik.isSubmitting && <Spin className="loader" />}
                        </button>
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