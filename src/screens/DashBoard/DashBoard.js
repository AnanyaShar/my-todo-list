import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getTodoList, createTodoList, createTodoListItem, deleteTodoListItem, deleteTodoList, updateTodoListItem, logoutUser } from '../../apis/apiCalls';
import InputBox from '../../components/InputBox/InputBox';
import EditIcon from '../../assets/svg/EditIcon';
import { DeleteIcon } from '../../assets/svg/DeleteIcon';
import Modal from '../../components/Modal';
import TodoListItemCard from '../../components/TodoListItemCard/TodoListItemCard';
import './DashBoard.scss'

const DashBoard = () => {
    const navigate = useNavigate()
    const { userId } = useParams();
    const { search } = useLocation();
    const[todoList, setTodoList] = useState([])
    const[loading, setLoading] = useState(false)
    const[todoListId, setTodoListId] = useState()
    const[showModal, setShowModal] = useState(false)
    const[showTodoListItemCard, setShowTodoListItemCard] = useState(false)
    const[title, setTitle] = useState('')
    const[editTodoListItem, setEditTodoListItem] = useState({})
    const[itemList, setItemList] = useState([])
    const username = new URLSearchParams(search).get('username');
    const token = localStorage.getItem('token');

    useEffect(() => {
        getTodoListForUser();
    }, [])

    const onChangeHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setTitle(event.target.value)
    }

    const getTodoListForUser = async() => {
        setLoading(true)
        const response = await getTodoList(token)
        if(response.status === 200) {
            setTodoList(response.data)
        }
        setLoading(false)
        console.log(response);
    }

    const onTodoListItemSaveHandler = async() => {
        const data = itemList.map(item => ({'title': item.title, 'description': item.description}));
        await createTodoListItem(todoListId, data, token)
        await getTodoListForUser()
        setShowTodoListItemCard(false);
        setItemList('');
    }

    const createTodoListForUser = async() => {
        const response = await createTodoList({'title': title}, token)
        console.log(response)
        
    }

    const onTodoListSave = async() => {
        const response = await createTodoListForUser()
        await getTodoListForUser();
        setShowModal(false)
    }

    const addItemsHandler = (event, id) => {
        setShowTodoListItemCard(true)
        setTodoListId(id)
    }

    const onClickHandler = (event) => {
        setShowModal(true);
    }

    const onDeleteIconClick = async (id) => {
        const response = await deleteTodoListItem(id, token)
        if(response.status === 204) {
            await getTodoListForUser();
        }
        console.log(response);
    }

    const deleteTodoListHandler = async(todo_list_id) => {
        const response =  await deleteTodoList(todo_list_id, token);
        if(response.status === 204) {
            await getTodoListForUser();
        }
    }

    const onEditIconClick = (id, title) => {
        setEditTodoListItem((prev) => ({...prev, 'id': id, 'title': title}))
    }

    const onInputChange = (event) => {
        setEditTodoListItem((prev) => ({...prev, 'title': event.target.value}))
    }

    const onInputBlur = async() => {
        const data = {
            'item_title': editTodoListItem.title
        }
       const response = await updateTodoListItem(editTodoListItem.id, data, token)
       if(response.status === 200) {
            setEditTodoListItem({});
            await getTodoListForUser();
       }
       console.log(response);
    }

    const logoutHandler = async () => {
        const response = await logoutUser(token)
        localStorage.removeItem('token');
        console.log(response)
        if(response.status === 200) {
            navigate('/');
        }
    }

    return (
        <div className='dashboard'>
            <div className='dashboard-header-container'>
                <div className='user-info'>
                    <h2 className='header'>Welcome {username} </h2>
                    <div className='info'>Your todo list</div>
                </div>
                <div>
                    <button className='dashboard-button' onClick={onClickHandler}>Create</button>
                    <button className='logout-button' onClick={logoutHandler}>Logout</button>
                </div>
               
            </div>
            <div>
                {
                    loading 
                    ? 
                        <div>Loading...</div> 
                    :   
                        todoList.map((todolist) => {
                            return (
                                <div key={todolist.id}>
                                    <div className='todolist-card-container'>
                                        <div className={`${todolist.todo_list_items.length === 0 && 'border-bottom-none'} todolist-card`}>
                                            <h2 className='todolist-title'>{todolist.title}</h2>
                                            <div className='dashboard-button-group'>
                                                <button 
                                                    className='dashboard-button' 
                                                    onClick={(event) => addItemsHandler(event, todolist.id)}
                                                >
                                                    Add Item
                                                </button>
                                                <button 
                                                    className='dashboard-button' 
                                                    onClick={() => deleteTodoListHandler(todolist.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                        <div className='list-items'>
                                        {todolist.todo_list_items.length > 0 &&
                                            <table className='list-table'>
                                                <tbody className='list-table-body'>
                                                    <tr className='list-table-row'>
                                                        {
                                                            todolist.todo_list_items.map((todo_list_item) => {
                                                                return (
                                                                    <td className='list-table-data' key={todo_list_item.id }>
                                                                        <div className='list-table-row-div'>
                                                                            {
                                                                                editTodoListItem.id === todo_list_item.id 
                                                                                    ? 
                                                                                        <input 
                                                                                            value={editTodoListItem.title}
                                                                                            onChange={onInputChange}
                                                                                            onBlur={onInputBlur}
                                                                                            className='list-item-input'
                                                                                        />
                                                                                    : 
                                                                                        <h2 className='list-item-title'>{todo_list_item.item_title}</h2>
                        
                                                                            }
                                                                            
                                                                            <div className="list-icons">
                                                                                <div onClick={() => onEditIconClick(todo_list_item.id, todo_list_item.item_title)}><EditIcon /></div>
                                                                                <div onClick={() => onDeleteIconClick(todo_list_item.id)}><DeleteIcon /></div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                )
                                                            })
                                                        }
                                                    </tr>
                                                </tbody>
                                            </table>
                                        }
                                    </div>
                                    </div>
                                    
                                    {/* <div className='list-items'>
                                        {todolist.todo_list_items.length > 0 &&
                                            <table className='list-table'>
                                                <tbody className='list-table-body'>
                                                    <tr className='list-table-row'>
                                                        {
                                                            todolist.todo_list_items.map((todo_list_item) => {
                                                                return (
                                                                    <td className='list-table-data' key={todo_list_item.id }>
                                                                        <div className='list-table-row-div'>
                                                                            {
                                                                                editTodoListItem.id === todo_list_item.id 
                                                                                    ? 
                                                                                        <input 
                                                                                            value={editTodoListItem.title}
                                                                                            onChange={onInputChange}
                                                                                            onBlur={onInputBlur}
                                                                                            className='list-item-input'
                                                                                        />
                                                                                    : 
                                                                                        <h2 className='list-item-title'>{todo_list_item.item_title}</h2>
                        
                                                                            }
                                                                            
                                                                            <div className="list-icons">
                                                                                <div onClick={() => onEditIconClick(todo_list_item.id, todo_list_item.item_title)}><EditIcon /></div>
                                                                                <div onClick={() => onDeleteIconClick(todo_list_item.id)}><DeleteIcon /></div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                )
                                                            })
                                                        }
                                                    </tr>
                                                </tbody>
                                            </table>
                                        }
                                    </div> */}
                                </div>

                            )
                        })
                }
            </div>
            {showModal &&
                <Modal 
                    setShowModal={setShowModal} 
                    onSave={onTodoListSave}
                >
                    <InputBox 
                        label='Title'
                        type='text'
                        placeholder='Enter Title'
                        value={title}
                        onChangeHandler={onChangeHandler}
                        className='modal-input'
                        labelClassName='modal-label'
                    />
                </Modal>
            }
            {showTodoListItemCard &&
                <Modal 
                    setShowModal={setShowTodoListItemCard}
                    onSave={onTodoListItemSaveHandler}
                >
                    <TodoListItemCard 
                        setItemList={setItemList}
                        itemList={itemList}
                    />
                </Modal>

            }
        </div>
    )
}

export default DashBoard