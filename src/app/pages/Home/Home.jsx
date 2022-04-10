import React from 'react';
import {
    Input,
    Button,
  } from 'antd';
import CardFacility from '../../components/Facility/Facility';
import './Home.scss'

function Home() {

    const facilities = [1,2,3,4,5,6,7]
    const [loading, setLoading] = React.useState(true);

    React.useState(() => {
        setTimeout(() =>{
            setLoading(false)
        }, 1000)
    }, [])
    return (
        <>
            <section className="home-content">
                <h1 className="main-title">Nos Etablissements</h1>
                <p className="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
                </p>
                <div className="search-content">
                <Input.Group compact className="group-input">
                    <Input 
                    placeholder="Rechercher"
                    defaultValue="" />
                    <Button size="large">Valider</Button>
                </Input.Group>
                </div>
                <div className="facilities-list">
                {facilities.map((facility, k) => (
                    <CardFacility key={`etablissement-${k}`} loading={loading} facility={facility} />
                ))}
                </div>
            </section>
        </>
    );
}

export default Home;