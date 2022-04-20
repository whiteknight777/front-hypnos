import React from 'react';
import {
    Button,
    PageHeader,
    Skeleton,
    Divider,
    Alert,
    Tooltip,
    Table
  } from 'antd';
  import { UserContext } from '../../../../contexts/userProvider';
  import { GetAllMessags } from '../../../../utils/requests/messages';
  import GetColumnSearchProps from '../../../components/ColumnSearch/ColumnSearch';
  import {BiRefresh} from 'react-icons/bi';
import '../main.scss';
import { BsChatTextFill } from 'react-icons/bs';

function MessagesAdmin() {
    
    const { userStore } = React.useContext(UserContext);
    const { userInfos } = userStore;
    const [messages, setData] = React.useState([]);
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
    const messagesColumns = [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
          ellipsis: true,
          responsive: ['md','xs'],
          ...GetColumnSearchProps('id', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Nom Prénom(s)',
          dataIndex: 'lastName',
          key: 'lastName',
          responsive: ['md','xs'],
          ...GetColumnSearchProps('lastName', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          responsive: ['md','xs'],
          ...GetColumnSearchProps('email', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Etablissement',
          dataIndex: 'facility',
          key: 'facility',
          responsive: ['md','xs'],
          ...GetColumnSearchProps('facility', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Motif',
          dataIndex: 'feedBackType',
          key: 'feedBackType',
          responsive: ['md','xs'],
          ellipsis: true,
          ...GetColumnSearchProps('feedBackType', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Description',
          dataIndex: 'text',
          key: 'text',
          responsive: ['md','xs'],
          ellipsis: true,
          ...GetColumnSearchProps('text', handleSearch, handleReset, state, setState),
        },
        {
          title: 'Date de création',
          dataIndex: 'createdAt',
          key: 'createdAt',
          responsive: ['md','xs'],
          ...GetColumnSearchProps('createdAt', handleSearch, handleReset, state, setState),
        }
    ];

    // FORMAT FACILITIES DATA
    const formatMessageData = (data) => {
        let formated = [];
        data.forEach((message, key) => {
            formated.push({
                key,
                id: message.id,
                lastName: `${message.lastName} ${message.firstName}`,
                email: message.email,
                facility: message.facility.name,
                feedBackType: message.feedBackType.title,
                text: message.text,
                createdAt: new Date(message.createdAt).toLocaleString(),
            })
        })
        return formated
    }

    // GET FACILITIES
    const getMessages = async () => {
        setLoading(true)
        try {
            const response = await GetAllMessags()
            const {data} = response.data;
            setData(formatMessageData(data))
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
        getMessages()
    }, [userInfos])


    return (
        <section className="account-content">
                <PageHeader
                    className="page-header"
                    title={
                       loading ? (<Skeleton.Input active block size="large"/>) 
                      : (
                        <h2 className="main-title"><BsChatTextFill className="nav-icon" /> Historique des messages </h2>
                    )}
                />
                <div className="container">
                    { loading ? (<Skeleton active block size="large"/>) 
                      : (
                        <>                        
                        <div className="title">
                            <h3> Liste des Messages ({messages?.length})</h3>
                            <div className="actions-group">
                            <Tooltip title="Rafraichir">
                                <Button type="default" size="large" shape="shape" icon={<BiRefresh />} onClick={() => {
                                getMessages()
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
                            <Table dataSource={messages} columns={messagesColumns}/>
                        )}
                        </>
                    )}
                </div>
        </section>
    );
}

export default MessagesAdmin;