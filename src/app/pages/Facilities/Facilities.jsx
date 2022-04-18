import React from 'react';
import {
    Input,
    Button,
    PageHeader,
    Skeleton,
    Divider,
    Drawer,
    Form,
    Spin,
    Alert
  } from 'antd';
import { useParams, useNavigate } from "react-router-dom";
import {MdKeyboardArrowLeft} from 'react-icons/md'
import { GetAll } from '../../../utils/requests/feedBackTypes';
import { NewMessage } from '../../../utils/requests/messages';
import { useFormik } from 'formik';
import { GetOne } from '../../../utils/requests/facilities';
import CardRoom from '../../components/Room/Room';
import MessageSchema from '../../validatorSchema/messageSchema';
import './Facilities.scss';

function Facilities() {
    let params = useParams();
    let navigate = useNavigate();

    const [facility, setFacility] = React.useState({});
    const [feedBackTypes, setFeedBackTypes] = React.useState([]);
    const [isSuccess, setSuccess] = React.useState(undefined);
    const initialValues = {
      lastName: "",
      firstName: "",
      email: "",
      feedBackTypeId: "",
      text: "",
    }

    const [loading, setLoading] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [form] = Form.useForm();
    
    const getFacility = async () => {
        try {
            const response = await GetOne(params.id)
            const {data} = response.data;
            setFacility(data)
        } catch (error) {
            console.error(error.response?.data?.error || error.message)
        }finally{
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
    }

    const getFeedBackTypes = async () => {
      try {
          const response = await GetAll()
          const {data} = response.data;
          setFeedBackTypes(data)
      } catch (error) {
          console.error(error.response?.data?.error || error.message)
      }finally{
          setTimeout(() => {
              setLoading(false)
          }, 500);
      }
  }

    React.useState(() => {
      getFacility()
      getFeedBackTypes()
    }, [])

    const formik = useFormik({
      initialValues,
      validationSchema: MessageSchema,
      onSubmit: async (values, { setStatus, setSubmitting, resetForm, ...args }) => {
          values.facilityId = facility.id
          setSubmitting(true)
          try {
              const response = await NewMessage(values)
              const {data} = response;
              console.log(data)
              setSuccess(true)
              setStatus("Votre message à bien été envoyé ! Nous vous recontacterons très rapidement")
              console.log(args)
              setTimeout(() => {
                resetForm()
              }, 2000)
          } catch (error) {
              console.error(error.message)
              setSuccess(false)
              setStatus(error.response?.data?.error || error.message)
          }finally{
              setSubmitting(false)
          }
      }
    });


    return (<>
        <section className="etab-content">
                <span aria-hidden type="button" className="go-back" onClick={() => navigate('/')}>
                   <MdKeyboardArrowLeft className="back-icon" /> Retour
                </span>
                <PageHeader
                    className="page-header"
                    title={
                       loading ? (<Skeleton.Input active block size="large"/>) 
                      : (
                        <h2 className="main-title">{facility.name} </h2>
                    )}
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
                    { loading ? (<Skeleton active block size="large"/>) 
                      : (
                        <>
                        <h3 className="title">Description</h3>
                        <p className="description">
                        {facility.description}
                        </p>
                        <p className="sub-infos">
                            <span className="address"><b>Adresse :</b> {facility.address}</span>
                            <span className="city"><b>Vile :</b> {facility.city}</span>
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
                        {facility.rooms.sort((a, b) => a.title.localeCompare(b.title)).map((room, k) => (
                          <CardRoom key={`suite-${k}`} loading={loading} room={room} facility={facility}/>
                        ))}
                        </>
                    )}
                    
                </div>
        </section>
        <Drawer
        title={`Contacter ${facility.name}`}
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
            <Divider />
            <div className="contact-form">
              {formik.status && (
                    <Alert
                        className="alert-box"
                        message={isSuccess === true ? "Succès" : "Erreur"}
                        description={formik.status}
                        type={isSuccess === true ? "success" : "error"}
                        showIcon
                    />
              )}
              <Form
              className="form-horizontal"
              layout={'vertical'}
              form={form}
              initialValues={{ layout: 'vertical' }}
              >
                <Form.Item label="Nom">
                    <Input placeholder="Nom" name="lastName"
                        {...formik.getFieldProps('lastName')}/>
                    {formik.touched.lastName && formik.errors.lastName ? (
                        <div className="form-error">
                            <div className="help-block">{formik.errors.lastName}</div>
                        </div>
                    ) : null}
                </Form.Item>
                <Form.Item label="Prenom(s)">
                    <Input placeholder="Prenom(s)" name="firstName"
                            {...formik.getFieldProps('firstName')}/>
                    {formik.touched.firstName && formik.errors.firstName ? (
                        <div className="form-error">
                            <div className="help-block">{formik.errors.firstName}</div>
                        </div>
                    ) : null}
                </Form.Item>
                <Form.Item label="Email">
                    <Input placeholder="moi@societe.com" name="email"
                            {...formik.getFieldProps('email')}/>
                    {formik.touched.email && formik.errors.email ? (
                        <div className="form-error">
                            <div className="help-block">{formik.errors.email}</div>
                        </div>
                    ) : null}
                </Form.Item>
                <Form.Item label="Sujet">
                    <select className="form-control" 
                      placeholder="Selectionnez un motif"
                      name="feedBackTypeId"
                      {...formik.getFieldProps('feedBackTypeId')} 
                      >
                      {feedBackTypes && feedBackTypes.map(item => (
                        <option key={`option-${item.id}`} value={item.id}>{item.title}</option>
                      ))}
                    </select>
                    {formik.touched.feedBackTypeId && formik.errors.feedBackTypeId ? (
                        <div className="form-error">
                            <div className="help-block">{formik.errors.feedBackTypeId}</div>
                        </div>
                    ) : null}
                </Form.Item>
                <Form.Item label="Message">
                    <Input.TextArea rows={4} name="text"
                            {...formik.getFieldProps('text')}/>
                    {formik.touched.text && formik.errors.text ? (
                        <div className="form-error">
                            <div className="help-block">{formik.errors.text}</div>
                        </div>
                    ) : null}
                </Form.Item>
                  <Form.Item>
                        <button 
                        type="submit" 
                        className="submit-btn"
                        onClick={formik.handleSubmit}
                        disabled={formik.isSubmitting}
                        >
                            Envoyer message
                            {formik.isSubmitting && <Spin className="loader" />}
                        </button>
                  </Form.Item>
              </Form>
            </div>
        </section>
      </Drawer>
    </>);
}

export default Facilities;