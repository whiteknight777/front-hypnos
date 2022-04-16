import React from 'react';
import {
    Input,
    Button,
  } from 'antd';
import CardFacility from '../../components/Facility/Facility';
import { GetAll } from '../../../utils/requests/facilities';
import './Home.scss'

const Home = () => {
    const [loading, setLoading] = React.useState(true);
    const [facilities, setFacilities] = React.useState([]);
    
    const getFacilities = async () => {
        try {
            const response = await GetAll()
            const {data} = response.data;
            setFacilities(data)
        } catch (error) {
            console.error(error.response?.data?.error || error.message)
        }finally{
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
    }

    React.useState(() => {
        getFacilities()
    // eslint-disable-next-line
    }, [facilities])
    return (
        <>
            <section className="home-content">
                <h1 className="main-title">Nos Etablissements ({facilities?.length})</h1>
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
                {facilities?.map((facility, k) => (
                    <CardFacility 
                    key={`etablissement-${facility.id}`} 
                    loading={loading} 
                    facility={facility} />
                ))}
                </div>
            </section>
        </>
    );
}

export default Home;