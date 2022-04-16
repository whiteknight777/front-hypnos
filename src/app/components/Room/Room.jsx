import React from 'react';
import { Card, Button, Rate, Skeleton, Image } from 'antd';
import './Room.scss'
import RoomDetails from './RoomDetails';

const { Meta } = Card;

const CardContent = ({id, description, room}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
    <section className="room-details">
      <div className="infos">
        <p className="desc">{room.description}</p>
        <div className="sub-infos">
          <span className="price"><b>Prix/nuit :</b> <strong>{`${room.price} €`}</strong></span>
            <Rate allowClear={true} defaultValue={4} />
        </div>
      </div>
      <Button 
      shape="round" 
      size="large"
      className="show-btn"
      onClick={() => {
        setOpen(true)
      }}
      >Consulter</Button>
    </section>
    <RoomDetails
    room={room}
    onClose={() => setOpen(false)}
    visible={open}
    /> 
    </>
  )
}

function CardRoom({loading, room}) {
    // get the main pic if exist
    const {medias} = room;
    let src = "https://via.placeholder.com/300x225"
    if(medias.length > 0){
      let mainPic = medias.find(e => e.isMain)
      console.log(mainPic)
      if(mainPic === undefined) {
        mainPic = medias[0]
        src = mainPic.url
      }
    }
    return (
        <Card className="room-box" 
        style={{ marginTop: 16 }} 
        loading={loading}
        hoverable
        cover={
        loading ? ( <Skeleton.Image className="skeleton-img" />) : (
            <Image
              alt={`room-${room.id}`}
              className="responsive-img" 
              src={src}
            />)
        }
        >
          <Meta
            title={room.title}
            description={
              <CardContent 
                room={room}
              />
            }
          />
        </Card>
    );
}

export default CardRoom;