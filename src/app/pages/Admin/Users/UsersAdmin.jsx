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
  import { GetAllUser } from '../../../../utils/requests/users';
  import GetColumnSearchProps from '../../../components/ColumnSearch/ColumnSearch';
  import {BiPlusCircle, BiRefresh} from 'react-icons/bi';
import '../main.scss';
import CreateUser from './CreateUser';
import EditUser from './EditUser';
import { MdSupervisedUserCircle } from 'react-icons/md';

function UsersAdmin() {
    
    const { userStore } = React.useContext(UserContext);
    const { userInfos } = userStore;
    const [users, setUsers] = React.useState([]);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openCreate, setOpenCreate] = React.useState(false);
    const [selectedUser, setUser] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
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
    const usersColumns = [
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
          dataIndex: 'lastName',
          key: 'lastName',
          responsive: ['md','xs'],
          ...GetColumnSearchProps('lastName', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Prénom(s)',
          dataIndex: 'firstName',
          key: 'firstName',
          responsive: ['md','xs'],
          ...GetColumnSearchProps('firstName', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          responsive: ['md','xs'],
          ...GetColumnSearchProps('email', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
          responsive: ['md','xs'],
          ...GetColumnSearchProps('role', handleSearch, handleReset, state, setState),
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
          render: (text, record) => (
            <Space size="middle">
              <Button type="text" onClick={() => {
                  setUser({
                    id: record.id,
                    lastName: record.lastName,
                    firstName: record.firstName,
                    role: record.role,
                    email: record.email,
                    isDeleted: record.isDeleted.props.defaultChecked,
                })
                setOpenEdit(true)
              }}>Editer</Button>
            </Space>
          ),
        },
    ];

    // FORMAT FACILITIES DATA
    const formatUsersData = (data) => {
        let formated = [];
        data.forEach((user, key) => {
            formated.push({
                key,
                id: user.id,
                lastName: user.lastName,
                firstName: user.firstName,
                role: user.role,
                email: user.email,
                isDeleted: (
                    <Switch 
                    disabled
                    checkedChildren="Inactif" unCheckedChildren="Actif"
                    defaultChecked={user.isDeleted} 
                    />),
                updatedAt: new Date(user.updatedAt).toLocaleString(),
                createdAt: new Date(user.createdAt).toLocaleString(),
            })
        })
        return formated
    }

    // GET FACILITIES
    const getUsers = async () => {
        setLoading(true)
        try {
            const response = await GetAllUser()
            const {data} = response.data;
            setUsers(formatUsersData(data))
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
        getUsers()
    }, [userInfos])


    return (
        <section className="account-content">
                <PageHeader
                    className="page-header"
                    title={
                       loading ? (<Skeleton.Input active block size="large"/>) 
                      : (
                        <h2 className="main-title"><MdSupervisedUserCircle className="nav-icon" /> Gestion des utilisateurs </h2>
                    )}
                />
                <div className="container">
                    { loading ? (<Skeleton active block size="large"/>) 
                      : (
                        <>                        
                        <div className="title">
                            <h3> Liste des utilisateurs ({users?.length})</h3>
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
                                getUsers()
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
                            <Table dataSource={users} columns={usersColumns}/>
                        )}
                        </>
                    )}
                    {openEdit && (
                    <EditUser 
                    open={openEdit} 
                    user={selectedUser}
                    handleClose={() => {
                        setOpenEdit(false)
                        getUsers()
                    }} />)}

                    {openCreate && (
                    <CreateUser 
                    open={openCreate} 
                    handleClose={() => {
                        setOpenCreate(false)
                        getUsers()
                    }} />)}
                </div>
        </section>
    );
}

export default UsersAdmin;