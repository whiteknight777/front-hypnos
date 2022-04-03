import React from 'react';
import { Card, Button, Rate, Skeleton } from 'antd';
import { useNavigate } from "react-router-dom";
import './Rooms.scss'

const { Meta } = Card;

const CardContent = ({id, description, address, city}) => {
  let navigate = useNavigate();
  return (
    <section className="room-details">
      <div className="infos">
        <p className="desc">{description}</p>
        <p className="sub-infos">
            <Rate allowClear={true} defaultValue={4} />
        </p>
      </div>
      <Button 
      shape="round" 
      className="show-btn"
      onClick={() => {
        navigate(`/room/${id}`)
      }}
      >Consulter</Button>
    </section>
  )
}

function CardRooms({loading, room}) {
    return (
        <Card className="room-box" 
        style={{ marginTop: 16 }} 
        loading={loading}
        hoverable
        cover={
        loading ? ( <Skeleton.Image className="skeleton-img" />) : (<img 
            alt={`room-${room}`} 
            className="responsive-img" 
            src="https://via.placeholder.com/350x300" />)
        }
        >
          <Meta
            title={`Suite ${room}`}
            description={
              <CardContent 
                id={room}
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"
                address="Lorem ipsum dolor sit amet, consectetur adipiscing"
                city="Lorem ipsum"
              />
          }
          />
        </Card>
    );
}

export default CardRooms;