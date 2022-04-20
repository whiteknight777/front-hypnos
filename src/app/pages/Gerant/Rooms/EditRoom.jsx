import React from 'react';
import {
    Tabs,
    Drawer
} from 'antd';
import '../main.scss';
import EditRoomInfos from './EditRoomInfos';
import RoomServices from './RoomServices';
import RoomMedias from './RoomMedias';

const EditRoom = ({room, facility, open, handleClose}) => {
    const { TabPane } = Tabs;
    const isMounted = React.useRef(true)
    React.useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false
        }
    }, [open, room])

    return (
        <>
            <Drawer
            id="edit"
            title={`Edition ${room?.title}`}
            placement={"right"}
            width={900}
            onClose={() => {
                handleClose()
            }}
            visible={open}
            >
                <section className="edit-content">
                <Tabs defaultActiveKey="1">
                    <TabPane
                    tab={<span>Détails</span>}
                    key="1"
                    >
                        <EditRoomInfos room={room} facility={facility}/>
                    </TabPane>
                    <TabPane
                    tab={<span>Services </span>}
                    key="2"
                    >
                        <RoomServices room={room} facility={facility} handleClose={handleClose}/>
                    </TabPane>
                    <TabPane
                    tab={<span>Images </span>}
                    key="3"
                    >
                       <RoomMedias room={room} facility={facility} handleClose={handleClose}/>
                    </TabPane>
                </Tabs>
                </section>
            </Drawer>
        </>
    )

}

export default EditRoom;