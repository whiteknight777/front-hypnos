import React from 'react';
import {
    Input,
    Button,
    PageHeader,
    Divider,
    Drawer,
    Form,
    Alert
  } from 'antd';
import { useParams, useNavigate } from "react-router-dom";
import {MdKeyboardArrowLeft} from 'react-icons/md'
import './Facilities.scss'
import CardRoom from '../../components/Room/Room';

function Facilities() {
    let params = useParams();
    let navigate = useNavigate();
    const rooms = [1,2,3,4,5,6,7]
    const [loading, setLoading] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [form] = Form.useForm();

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
                    title={<h2 className="main-title">Etablissement {params.id}</h2>}
                    extra={[
                      <Button key="1" size="large"
                      onClick={() => {
                        setOpen(true)
                      }}>
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
                          <Button size="large">Valider</Button>
                      </Input.Group>
                    </div>
                    {rooms.map((room, k) => (
                    <CardRoom key={`suite-${k}`} loading={loading} room={room} />
                    ))}
                </div>
        </section>
        <Drawer
        title={`Contacter l'établissement ${params.id}`}
        placement={"right"}
        width={700}
        onClose={() => setOpen(false)}
        visible={open}
      >
        <section className="contact-content">
            <p className="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
            </p>
            <div className="contact-form">
            <Alert
                className="alert-box"
                message="Success Tips"
                description="Detailed description and advice about successful copywriting."
                type="success"
                showIcon
            />
              <Form
              className="form-horizontal"
              layout={'vertical'}
              form={form}
              initialValues={{ layout: 'vertical' }}
              >
                <Form.Item label="Nom">
                    <Input placeholder="Nom" />
                </Form.Item>
                <Form.Item label="Prenom(s)">
                    <Input placeholder="Prenom(s)" />
                </Form.Item>
                <Form.Item label="Email">
                    <Input placeholder="moi@societe.com" />
                </Form.Item>
                <Form.Item label="Sujet">
                    <Input placeholder="selectionnez un sujet" />
                </Form.Item>
                <Form.Item label="Message">
                    <Input.TextArea rows={4} />
                </Form.Item>
                  <Form.Item>
                      <Button type="primary" size="large" shape="round" block>Envoyer message</Button>
                  </Form.Item>
              </Form>
            </div>
        </section>
      </Drawer>
    </>);
}

export default Facilities;