import React from 'react';
import { Card, Button } from 'antd';
import { useNavigate } from "react-router-dom";
import './Facility.scss'

const { Meta } = Card;

const CardContent = ({id, description, address, city}) => {
  let navigate = useNavigate();
  return (
    <section className="facility-details">
      <div className="infos">
        <p className="desc">{description}</p>
        <p className="sub-infos">
          <span className="address"><b>Adresse :</b> {address}</span>
          <span className="city"><b>Vile :</b> {city}</span>
        </p>
      </div>
      <Button 
      shape="round" 
      size="large"
      className="show-btn"
      onClick={() => {
        navigate(`/etablissement/${id}`)
      }}
      >Consulter</Button>
    </section>
  )
}

function CardFacility({loading, facility}) {
    return (
        <Card 
        className="facility-box" 
        style={{ marginTop: 16 }} 
        loading={loading} 
        hoverable>
          <Meta
            title={facility.name}
            description={
              <CardContent 
                id={facility.id}
                description={facility.description}
                address={facility.address}
                city={facility.city}
              />
          }
          />
        </Card>
    );
}

export default CardFacility;