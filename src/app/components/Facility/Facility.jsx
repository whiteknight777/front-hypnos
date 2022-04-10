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
            title={`Etablissement ${facility}`}
            description={
              <CardContent 
                id={facility}
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"
                address="Lorem ipsum dolor sit amet, consectetur adipiscing"
                city="Lorem ipsum"
              />
          }
          />
        </Card>
    );
}

export default CardFacility;