import React from 'react';
import { List, Divider,Button, Upload, message } from 'antd';
import { SendMedias } from '../../../../utils/requests/medias';

const RoomMedias = ({room, facility, handleClose}) => {
    const [dataList, setData] = React.useState([]);
    const isMounted = React.useRef(true)
    const array = []
    const { rooms } = facility;
    const roomMedias = (rooms.find(e => e.id === room.id));
    roomMedias.medias.forEach(item => array.push(item.media))

    const [fileList, setFile] = React.useState([]);
    const [uploading, setUpload] = React.useState(false);

    const props = {
    onRemove: file => {
        
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFile(newFileList)
        
    },
    beforeUpload: file => {
        console.log(file)
        setFile([...fileList, file])
        return false;
    },
    fileList,
    };

    const handleUpload = async() => {
        // const dataToSend = new FormData();
        // dataToSend.append('files', fileList)
        const dataToSend = {
            files: fileList
        }
        setUpload(true);
        
        try{
            await SendMedias(room.id, dataToSend)
            message.success('upload successfully.');
            setFile([])
        } catch (error) {
        message.error('upload failed.');
        }
        finally{
            setUpload(false);
        };
    };
    
    React.useEffect(() => {
        setData(array)
        
    //eslint-disable-next-line
    }, [])

    console.log(array)
    return (
        <>
        <Divider orientation="left"/>
        {isMounted && <List
            size="small"
            header={<div>images sélectionnés</div>}
            bordered
            dataSource={dataList}
            renderItem={item => 
            <List.Item className="selected-services">
                {item.name} 
                <Button 
                color="danger" 
                type="text" 
                // onClick={() => handleDeleteServices(item.id)}
                >
                    Supprimer
                </Button>
            </List.Item>}
        />}
            <Divider orientation="left"/>
            <div className="form">

            <Upload {...props}>
                <Button >Choisir fichier(s)</Button>
            </Upload>
            <Button
            type="primary"
            onClick={() => {
                handleUpload()
            }}
            disabled={fileList?.length === 0}
            loading={uploading}
            style={{ marginTop: 16 }}
            >
            {uploading ? 'Chargement' : 'Télécharger'}
            </Button>

            </div>
        </>
    )
}

export default RoomMedias;