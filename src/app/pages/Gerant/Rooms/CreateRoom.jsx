import React from 'react';
import {
    Tabs,
    Drawer
} from 'antd';
import '../main.scss';
import CreateRoomInfos from './CreateRoomInfos';

const CreateRoom = ({room, facility, open, handleClose}) => {
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
            id="create"
            title={`Create ${room?.title}`}
            placement={"right"}
            width={900}
            onClose={() => {
                handleClose()
            }}
            visible={open}
            >
                <section className="create-content">
                <Tabs defaultActiveKey="1">
                    <TabPane
                    tab={<span>Détails</span>}
                    key="1"
                    >
                        <CreateRoomInfos room={room} facility={facility}/>
                    </TabPane>
                </Tabs>
                </section>
            </Drawer>
        </>
    )

}

export default CreateRoom;