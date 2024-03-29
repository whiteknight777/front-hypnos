import React from 'react';
import {
    Button,
    PageHeader,
    Skeleton,
    Divider,
    Switch,
    Alert,
    Space,
    Tooltip,
    Table
  } from 'antd';
  import { UserContext } from '../../../../contexts/userProvider';
  import { GetAllFacilities } from '../../../../utils/requests/facilities';
  import { GetGerants } from '../../../../utils/requests/users';
  import GetColumnSearchProps from '../../../components/ColumnSearch/ColumnSearch';
  import {BiPlusCircle, BiRefresh} from 'react-icons/bi';
import EditFacility from './EditFacility';
import '../main.scss';
import CreateFacility from './CreateFacility';
import { RiLayout2Line } from 'react-icons/ri';

function DashboardAdmin() {
    
    const { userStore } = React.useContext(UserContext);
    const { userInfos } = userStore;
    const [facilities, setFacilities] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openCreate, setOpenCreate] = React.useState(false);
    const [selectedFacility, setFacility] = React.useState({
        name: "",
        city: "",
        address: "",
        description: "",
        gerantId: "",
        isDeleted: false
    });
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
    const facilitiesColumns = [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
          ellipsis: true,
          ...GetColumnSearchProps('id', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Nom',
          dataIndex: 'name',
          key: 'name',
          ...GetColumnSearchProps('name', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Ville',
          dataIndex: 'city',
          key: 'city',
          ...GetColumnSearchProps('city', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Gérant',
          dataIndex: 'gerant',
          key: 'gerant',
          ...GetColumnSearchProps('gerant', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Adresse',
          dataIndex: 'address',
          key: 'address',
          ...GetColumnSearchProps('address', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          ellipsis: true,
          ...GetColumnSearchProps('description', handleSearch, handleReset, state, setState),
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
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <Button type="text" onClick={() => {
                  setFacility({
                    id: record.id,
                    name: record.name,
                    city: record.city,
                    address: record.address,
                    description: record.description,
                    isDeleted: record.isDeleted.props.defaultChecked,
                    gerantId: record.gerantId,
                })
                setOpenEdit(true)
              }}>Editer</Button>
            </Space>
          ),
        },
    ];

    // FORMAT FACILITIES DATA
    const formatFacilitiesData = (data) => {
        let formated = [];
        data.forEach((facility, key) => {
            formated.push({
                key,
                id: facility.id,
                name: facility.name,
                city: facility.city,
                address: facility.address,
                description: facility.description,
                gerantId: facility.gerant?.id || '',
                gerant: facility.gerant?.email || '',
                isDeleted: (
                    <Switch 
                    disabled
                    checkedChildren="Inactif" unCheckedChildren="Actif"
                    defaultChecked={facility.isDeleted} 
                    />),
                updatedAt: new Date(facility.updatedAt).toLocaleString(),
                createdAt: new Date(facility.createdAt).toLocaleString(),
            })
        })
        return formated
    }

    // GET FACILITIES
    const getFacilities = async () => {
        setLoading(true)
        try {
            const response = await GetAllFacilities()
            const {data} = response.data;
            setFacilities(formatFacilitiesData(data))
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
    const getUsersGerants = async () => {
        setLoading(true)
        try {
            const response = await GetGerants()
            const {data} = response.data;
            setUsers(data)
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

    const handleCloseDrawer = () => {
        setOpenEdit(false)
        setOpenCreate(false)
        getFacilities()
    }

    React.useState(() => {
        getFacilities()
        getUsersGerants()
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
                        <p className="sub-infos">
                            <span className="lastname"><b>Nom :</b> {userInfos?.lastName}</span>
                            <span className="firstname"><b>Prénom(s) :</b> {userInfos?.firstName}</span>
                            <span className="email"><b>Email :</b> {userInfos?.email}</span>
                            <span className="email"><b>role :</b> Administrateur</span>
                            <span className="date-creation"><b>Date de création :</b> {new Date(userInfos.createdAt).toLocaleString()}</span>
                        </p>
                        <Divider dashed />
                        
                        <div className="title">
                            <h3>Liste des établissements ({facilities?.length})</h3>
                            <div className="actions-group">
                            <Tooltip title="Nouveau">
                                <Button type="default" size="large" shape="shape" icon={<BiPlusCircle />} onClick={() => {
                                 setOpenCreate(true)
                                }}>
                                    Ajouter
                                </Button>    
                            </Tooltip>
                            <Tooltip title="Rafraichir">
                                <Button type="default" size="large" shape="shape" icon={<BiRefresh />} onClick={() => {
                                getFacilities()
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
                            <Table dataSource={facilities} columns={facilitiesColumns}/>
                        )}
                        </>
                    )}
                    {openEdit && (
                    <EditFacility 
                    open={openEdit} 
                    facility={selectedFacility}
                    users={users}
                    handleClose={() => {
                        handleCloseDrawer()
                    }} />)}

                    {openCreate && (
                    <CreateFacility 
                    open={openCreate} 
                    users={users}
                    handleClose={() => {
                        handleCloseDrawer()
                    }} />)}
                </div>
        </section>
    );
}

export default DashboardAdmin;