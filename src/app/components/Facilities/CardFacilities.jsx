import React from 'react';
import { Card } from 'antd';
import './Facility.scss'

const { Meta } = Card;

function CardFacilities({loading, facility}) {
    return (
        <Card className="facility-box" style={{ marginTop: 16 }} loading={loading}>
          <Meta
            title={`Etablissement ${facility}`}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"
          />
        </Card>
    );
}

export default CardFacilities;