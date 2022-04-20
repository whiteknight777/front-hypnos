import React from 'react';
import { List, Divider, Alert, Spin, Form, Button } from 'antd';
import { GetActiveServices } from '../../../../utils/requests/services';
import { AddRoomServices, DeleteRoomServices } from '../../../../utils/requests/rooms';

const RoomServices = ({room, facility, handleClose}) => {
    const { rooms } = facility;
    const [dataList, setData] = React.useState([]);
    const [services, setServices] = React.useState([]);
    const [selectedServices, setSelectedServices] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const isMounted = React.useRef(true)
    const [form] = Form.useForm();
    const [message, setMessage] = React.useState({
        type: "",
        content: ""
    });

    const getServices = async () => {
        setLoading(true)
        try {
            const response = await GetActiveServices()
            const {data} = response.data;
            setServices(data)
        } catch (error) {
            setMessage({
                type: "error",
                show: true,
                content: error.response?.data?.error || error.message
            })
            console.error(error.response?.data?.error || error.message)
        }finally{
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
    }

    const handleDeleteServices = async (id) => {
        setLoading(true)
        // prepare data
        let dataToSend = {
            roomId: room.id,
            serviceId: id
        };
        try {
            await DeleteRoomServices(dataToSend)
            setMessage({
                type: "success",
                show: true,
                content: "Mise à jours effectuée !"
            })
            setTimeout(() => {
                handleClose()
            }, 2000)
        } catch (error) {
            setMessage({
                type: "error",
                show: true,
                content: error.response?.data?.error || error.message
            })
            console.error(error.response?.data?.error || error.message)
        }finally{
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        // prepare data
        let dataToSend = {
            services: []
        };
        selectedServices.forEach(item => {
            dataToSend.services.push({
                roomId: room.id,
                serviceId: item
            })
        })
        try {
            await AddRoomServices(dataToSend)
            setMessage({
                type: "success",
                show: true,
                content: "Mise à jours effectuée !"
            })
            setTimeout(() => {
                handleClose()
            }, 2000)
        } catch (error) {
            setMessage({
                type: "error",
                show: true,
                content: error.response?.data?.error || error.message
            })
            console.error(error.response?.data?.error || error.message)
        }finally{
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
    }
    
    React.useEffect(() => {
        isMounted.current = true;
        const updateRoomServices = () => {
            const array = []
            const roomServices = (rooms.find(e => e.id === room.id));
            roomServices.services.forEach(item => array.push(item.service))
            setData(array)
        }
        getServices()
        updateRoomServices()
        return () => {
            isMounted.current = false;
        }
    //eslint-disable-next-line
    }, [])

    return (
        <>
         {message.show && (
            <Alert
                className="alert-box"
                message={message.type}
                description={message.content}
                type={message.type}
                closable
                onClose={() => {
                    setMessage({
                        type: "",
                        content: ""
                    })
                }}
                showIcon
            />
        )}
        <Divider orientation="left"/>
        {isMounted.current && <List
            size="small"
            header={<div>Services sélectionnés</div>}
            bordered
            dataSource={dataList}
            renderItem={item => 
            <List.Item className="selected-services">
                {item.title} 
                <Button 
                color="danger" 
                type="text" 
                onClick={() => handleDeleteServices(item.id)}>
                    Supprimer
                </Button>
            </List.Item>}
        />}
        <div>
        </div>
                <Divider orientation="left"/>
            <div className="form">
            <Form
                className="form-horizontal"
                layout={'vertical'}
                form={form}
                initialValues={{ layout: 'vertical' }}
                >
                <Form.Item label="Services">
                    <select multiple className="ant-input" name="services[]" onChange={(e) => {
                        const options = e.target?.options;
                        const arraySelected = []
                        for (var i=0, iLen=options.length; i<iLen; i++) {
                            let item = options[i];
                            if(item.selected) arraySelected.push(item.value || item.text)
                        }
                        console.log(arraySelected)
                        setSelectedServices(arraySelected)
                    }}>
                    {services && services.map(item => (
                        <option key={`service-${item.id}`} value={item.id}>{item.title}</option>
                    ))}
                    </select>
                </Form.Item>
                <Form.Item>
                    <button 
                    type="submit" 
                    className="submit-btn"
                    onClick={() => {
                        handleSubmit()
                    }}
                    disabled={loading}
                    >
                        Enregistrer
                        {loading && <Spin className="loader" />}
                    </button>
                </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default RoomServices;