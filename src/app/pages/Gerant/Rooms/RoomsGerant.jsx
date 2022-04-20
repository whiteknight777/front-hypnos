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
  import { GetGerantFacility } from '../../../../utils/requests/facilities';
  import { GetFacilityRooms } from '../../../../utils/requests/rooms';
  import GetColumnSearchProps from '../../../components/ColumnSearch/ColumnSearch';
  import {BiPlusCircle, BiRefresh} from 'react-icons/bi';
import '../main.scss';
import EditRoom from './EditRoom';
import { MdBedroomParent } from 'react-icons/md';
import CreateRoom from './CreateRoom';

function RoomsGerant() {
    
    const { userStore } = React.useContext(UserContext);
    const { userInfos } = userStore;
    const [facility, setFacility] = React.useState({});
    const [rooms, setRooms] = React.useState([]);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openCreate, setOpenCreate] = React.useState(false);
    const [selectedRoom, setRoom] = React.useState({
        id: "",
        title: "",
        description: "",
        price: "",
        services: "",
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
    const roomsColumns = [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
          ellipsis: true,
          responsive: ['md','xs'],
          ...GetColumnSearchProps('id', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Nom',
          dataIndex: 'title',
          key: 'title',
          responsive: ['md','xs'],
          ellipsis: true,
          ...GetColumnSearchProps('title', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Prix/nuit €',
          dataIndex: 'price',
          key: 'price',
          responsive: ['md','xs'],
          ...GetColumnSearchProps('price', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Nb Services',
          dataIndex: 'services',
          key: 'services',
          responsive: ['md','xs'],
          ...GetColumnSearchProps('services', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          responsive: ['md','xs'],
          ellipsis: true,
          ...GetColumnSearchProps('description', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Statut',
          dataIndex: 'isDeleted',
          key: 'isDeleted',
          responsive: ['md','xs'],
        },
        {
          title: 'Dernière MAJ',
          dataIndex: 'updatedAt',
          key: 'updatedAt',
          responsive: ['md','xs'],
          ...GetColumnSearchProps('updatedAt', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Date de création',
          dataIndex: 'createdAt',
          key: 'createdAt',
          responsive: ['md','xs'],
          ...GetColumnSearchProps('createdAt', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Action',
          key: 'action',
          responsive: ['md','lg'],
          render: (text, record) => (
            <Space size="middle">
              <Button type="text" onClick={() => {
                  setRoom(rooms.find(e => e.id === record.id))
                  setOpenEdit(true)
              }}>Editer</Button>
            </Space>
          ),
        },
    ];

    // FORMAT ROOMS DATA
    const formatRoomsData = (data) => {
        let formated = [];
        data.forEach((rooms, key) => {
            formated.push({
                key,
                id: rooms.id,
                title: rooms.title,
                description: rooms.description,
                price: rooms.price,
                services: rooms.services.length,
                isDeleted: (
                    <Switch 
                    disabled
                    checkedChildren="Inactif" unCheckedChildren="Actif"
                    defaultChecked={rooms.isDeleted} 
                    />),
                updatedAt: new Date(rooms.updatedAt).toLocaleString(),
                createdAt: new Date(rooms.createdAt).toLocaleString(),
            })
        })
        return formated
    }

    
    // GET FACILITIES
    const getFacilityInfo = async () => {
      setLoading(true)
      try {
          const response = await GetGerantFacility(userInfos.id)
          const {data} = response.data;
          setFacility(data)
          getRooms(data.id)
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

    // GET ROOMS
    const getRooms = async (facilityId) => {
        setLoading(true)
        try {
            const response = await GetFacilityRooms(facilityId)
            const {data} = response.data;
            setRooms(formatRoomsData(data))
            setRoom({})
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
      getRooms(facility.id)
    }

    React.useEffect(() => {
      getFacilityInfo()
      
    //eslint-disable-next-line
    }, [userInfos])


    return (
        <section className="account-content">
                <PageHeader
                    className="page-header"
                    title={
                       loading ? (<Skeleton.Input active block size="large"/>) 
                      : (
                        <h2 className="main-title"><MdBedroomParent className="nav-icon" /> Liste des suites </h2>
                    )}
                />
                <div className="container">
                    { loading ? (<Skeleton active block size="large"/>) 
                      : (
                        <>                        
                        <div className="title">
                            <h3> Liste des suites ({rooms?.length})</h3>
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
                                getRooms(facility.id)
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
                            <Table dataSource={rooms} columns={roomsColumns}/>
                        )}
                        </>
                    )}
                    {openEdit && (
                    <EditRoom 
                    open={openEdit} 
                    room={selectedRoom}
                    facility={facility}
                    handleClose={() => {
                      handleCloseDrawer()
                    }} />)}

                    {openCreate && (
                    <CreateRoom
                    open={openCreate} 
                    room={selectedRoom}
                    facility={facility}
                    handleClose={() => {
                      handleCloseDrawer()
                    }} />)}
                </div>
        </section>
    );
}

export default RoomsGerant;