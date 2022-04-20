import React from 'react';
import {
    Button,
    PageHeader,
    Skeleton,
    Divider,
    Switch,
    Alert,
    Tooltip,
    Table
  } from 'antd';
  import { UserContext } from '../../../../contexts/userProvider';
  import { GetGerantFacility } from '../../../../utils/requests/facilities';
  import { GetFacilityBookings } from '../../../../utils/requests/bookings';
  import GetColumnSearchProps from '../../../components/ColumnSearch/ColumnSearch';
  import {BiRefresh} from 'react-icons/bi';
import { RiLayout2Line } from 'react-icons/ri';
import '../main.scss';

function DashboardGerant() {
    
    const { userStore } = React.useContext(UserContext);
    const { userInfos } = userStore;
    const [facility, setFacility] = React.useState({});
    const [bookings, setBookings] = React.useState([]);

    const [loading, setLoading] = React.useState(true);
    const [message, setMessage] = React.useState({
        type: "",
        content: ""
    });
    const [state, setState] = React.useState({
        searchText: '',
        searchedColumn: '',
    });

    
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setState(prev =>({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        }));
      };
    
      const handleReset = clearFilters => {
        clearFilters();
        setState(prev =>({ 
            ...prev,
            searchText: ''
        }));
      };

    // TABLE COLUMNS
    const bookingColumns = [
        {
          title: 'Etablissement',
          dataIndex: 'facility',
          key: 'facility',
          ...GetColumnSearchProps('facility', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Suite',
          dataIndex: 'room',
          key: 'room',
          ...GetColumnSearchProps('room', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Date de départ',
          dataIndex: 'startDate',
          key: 'startDate',
          ...GetColumnSearchProps('startDate', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Date de fin',
          dataIndex: 'endDate',
          key: 'endDate',
          ...GetColumnSearchProps('endDate', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Nb jour(s)',
          dataIndex: 'days',
          key: 'days',
          sorter: (a, b) => a.days - b.days,
          ...GetColumnSearchProps('days', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Statut',
          dataIndex: 'isDeleted',
          key: 'isDeleted',
        },
        {
          title: 'Dernière MAJ',
          dataIndex: 'updatedAt',
          key: 'updatedAt',
          ...GetColumnSearchProps('updatedAt', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Date de création',
          dataIndex: 'createdAt',
          key: 'createdAt',
          ...GetColumnSearchProps('createdAt', handleSearch, handleReset, state, setState),
        },
    ];

    // FORMAT BOOKING DATA
    const formatBookingData = (data) => {
        let formated = [];
        data.forEach((booking, key) => {
            formated.push({
                key,
                facility: booking.room.facility.name,
                room: booking.room.title,
                startDate: new Date(booking.startDate).toLocaleString(),
                endDate: new Date(booking.endDate).toLocaleString(),
                days: booking.days,
                isDeleted: (
                    <Switch 
                    checkedChildren="Annulé" unCheckedChildren="En cours"
                    disabled
                    defaultChecked={booking.isDeleted} 
                    />),
                updatedAt: new Date(booking.updatedAt).toLocaleString(),
                createdAt: new Date(booking.createdAt).toLocaleString(),
            })
        })
        return formated
    }

    // GET FACILITIES
    const getFacilityBookings = async (facilityId) => {
        setLoading(true)
        try {
            const response = await GetFacilityBookings(facilityId)
            const {data} = response.data;
            setBookings(formatBookingData(data))
        } catch (error) {
            setMessage({
                type: "error",
                show: true,
                content: error.response?.data?.error || error.message
            })
            console.error(error.response?.data?.error || error.message)
        }finally{
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
    }

    // GET FACILITIES
    const getFacilityInfo = async () => {
        setLoading(true)
        try {
            const response = await GetGerantFacility(userInfos.id)
            const {data} = response.data;
            setFacility(data)
            getFacilityBookings(data.id)
        } catch (error) {
            setMessage({
                type: "error",
                show: true,
                content: error.response?.data?.error || error.message
            })
            console.error(error.response?.data?.error || error.message)
        }finally{
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
    }

    React.useState(() => {
        getFacilityInfo()
    }, [userInfos])


    return (
        <section className="account-content">
                <PageHeader
                    className="page-header"
                    title={
                       loading ? (<Skeleton.Input active block size="large"/>) 
                      : (
                        <h2 className="main-title"><RiLayout2Line className="nav-icon" /> Tableau de bord </h2>
                    )}
                    extra={[
                      <Button key="1" size="large"
                      onClick={() => {
                        console.log('fired in')
                      }}>
                        Mes informations
                      </Button>,
                    ]}
                />
                <div className="container">
                    { loading ? (<Skeleton active block size="large"/>) 
                      : (
                        <>
                        <div className="informations">
                            <p className="sub-infos">
                                <span className="lastname"><b>Nom :</b> {userInfos?.lastName}</span>
                                <span className="firstname"><b>Prénom(s) :</b> {userInfos?.firstName}</span>
                                <span className="email"><b>Email :</b> {userInfos?.email}</span>
                                <span className="role"><b>role :</b> Gérant</span>
                                <span className="date-creation"><b>Date de création :</b> {new Date(userInfos.createdAt).toLocaleString()}</span>
                            </p>
                            
                            <p className="sub-infos-facility">
                                <span className="facility"><b>Etablissement </b> {facility?.name} :</span>
                                <span className="rooms"><b>Nombre de chambres </b> {facility?.rooms.length} :</span>
                            </p>
                        </div>
                        <Divider dashed />
                        
                        <div className="title">
                            <h3>Liste des Réservations ({bookings?.length})</h3>
                            <div className="actions-group">
                            <Tooltip title="Rafraichir">
                                <Button type="default" size="large" shape="shape" icon={<BiRefresh />} onClick={() => {
                                getFacilityBookings(facility.id)
                                }}>
                                Rafraichir
                            </Button>   
                            </Tooltip>
                            </div>
                        </div>
                        {message?.show && (
                            <>
                            <Alert
                                className="alert-box"
                                message={message?.type}
                                description={message?.content}
                                type={message?.type}
                                closable
                                onClose={() => {
                                    setMessage({
                                        type: "",
                                        show: false,
                                        content: ""
                                    })
                                }}
                                showIcon
                            />
                            <Divider dashed />
                            </>
                        )}
                        {loading ? (
                            <Skeleton active block size="large"/>
                        ) : 
                        (
                            <Table dataSource={bookings} columns={bookingColumns}/>
                        )}
                        </>
                    )}
                </div>
        </section>
    );
}

export default DashboardGerant;