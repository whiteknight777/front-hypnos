import React from 'react';
import {
    Input,
    Button,
    PageHeader,
    Divider 
  } from 'antd';
import { useParams, useNavigate } from "react-router-dom";
import {MdKeyboardArrowLeft} from 'react-icons/md'
import './Facility.scss'
import CardRooms from '../../components/Rooms/Rooms';

function Facility() {
    let params = useParams();
    let navigate = useNavigate();
    const rooms = [1,2,3,4,5,6,7]
    const [loading, setLoading] = React.useState(true);

    React.useState(() => {
      setTimeout(() =>{
          setLoading(false)
      }, 1000)
    }, [])

    return (<>
        <section className="etab-content">
                <span aria-hidden type="button" className="go-back" onClick={() => navigate('/')}>
                   <MdKeyboardArrowLeft className="back-icon" /> Retour
                </span>
                <PageHeader
                    className="page-header"
                    // onBack={() => navigate('/')}
                    title={<h2 className="main-title">Etablissement {params.id}</h2>}
                    extra={[
                      <Button key="1">
                        Nous contacter
                      </Button>,
                    ]}
                />
                <div className="container">
                    <h3 className="title">Description</h3>
                    <p className="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
                    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    </p>
                    <p className="sub-infos">
                        <span className="address"><b>Adresse :</b> Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                        <span className="city"><b>Vile :</b> Lorem ipsum</span>
                    </p>
                    <Divider dashed />
                    
                    <h3 className="title">Nos suites</h3>
                    <p className="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    </p>
                    <div className="search-content">
                      <Input.Group compact className="group-input">
                          <Input 
                          placeholder="Rechercher"
                          defaultValue="" />
                          <Button>Valider</Button>
                      </Input.Group>
                    </div>
                    {rooms.map((room, k) => (
                    <CardRooms key={`suite-${k}`} loading={loading} room={room} />
                    ))}
                </div>
        </section>
    </>);
}

export default Facility;