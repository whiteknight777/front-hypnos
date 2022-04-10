import React from 'react';
import { Card, Button, Rate, Skeleton, Image } from 'antd';
import './Room.scss'
import RoomDetails from './RoomDetails';

const { Meta } = Card;

const CardContent = ({id, description, price}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
    <section className="room-details">
      <div className="infos">
        <p className="desc">{description}</p>
        <div className="sub-infos">
          <span className="price"><b>Prix/nuit :</b> <strong>{price}</strong></span>
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
    id={id}
    onClose={() => setOpen(false)}
    visible={open}
    /> 
    </>
  )
}

function CardRoom({loading, room}) {
    return (
        <Card className="room-box" 
        style={{ marginTop: 16 }} 
        loading={loading}
        hoverable
        cover={
        loading ? ( <Skeleton.Image className="skeleton-img" />) : (
            <Image
              alt={`room-${room}`}
              className="responsive-img" 
              src="https://via.placeholder.com/350x300"
            />)
        }
        >
          <Meta
            title={`Suite ${room}`}
            description={
              <CardContent 
                id={room}
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"
                price="79€"
              />
            }
          />
        </Card>
    );
}

export default CardRoom;