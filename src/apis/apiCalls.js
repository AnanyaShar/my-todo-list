import axios from "axios";
import {
    registrationURL, 
    loginUserURL, 
    createTodoListItemURL, 
    createTodoListURL, 
    updateTodoListItemURL, 
    deleteTodoListItemURL,
    getListItemsURL,
    deleteTodoListURL,
    logoutURL
    } from "./utilities";


export const getUser = async(data) => {
    const url = loginUserURL()
    console.log(url)
    try {
        const response = await axios.post(`http://localhost:8000/${url}`, data)
        return response
    }catch(error) {
        console.log(error)
        return {
            errorCode: error.response.data.error_code,
            errorMessage: error.response.data.error_message,
        }
    }
    
}

export const registerUser = async(data) => {
    const url = registrationURL()
    try {
        const response = await axios.post(`http://localhost:8000/${url}`, data)
        return response
    }catch(error) {
        console.log(error)
        return {
            errorCode: error.response.data.error_code,
            errorMessage: error.response.data.error_message,
        }
        console.log(error)
    }
    
}

export const getTodoList = async(token) => {
    const url = getListItemsURL()
    try {
        const response = await axios.get(`http://localhost:8000/${url}`, {'headers': { 'Authorization': `Token ${token}`}})
        return response
    }catch(error) {
        console.log(error)
        return {
            errorCode: error.response.data.error_code,
            errorMessage: error.response.data.error_message,
        }
        console.log(error)
    }
    
}

export const logoutUser = async(token) => {
    const url = logoutURL()
    try {
        const response = await axios.get(`http://localhost:8000/${url}`, {'headers': { 'Authorization': `Token ${token}`}})
        return response
    }catch(error) {
        console.log(error)
        return {
            errorCode: error.response.data.error_code,
            errorMessage: error.response.data.error_message,
        }
        console.log(error)
    }
    
}

export const createTodoList = async(data, token) => {
    const url = createTodoListURL()
    try {
        const response = await axios.post(`http://localhost:8000/${url}`, data, {'headers': { 'Authorization': `Token ${token}`}})
        return response
    }catch(error) {
        console.log(error)
        return {
            errorCode: error.response.data.error_code,
            errorMessage: error.response.data.error_message,
        }
        console.log(error)
    }
    
}
export const createTodoListItem = async(todo_list_id, data, token) => {
    const url = createTodoListItemURL(todo_list_id)
    try {
        const response = await axios.post(`http://localhost:8000/${url}`, data, {'headers': { 'Authorization': `Token ${token}`}})
        return response
    }catch(error) {
        console.log(error)
        return {
            errorCode: error.response.data.error_code,
            errorMessage: error.response.data.error_message,
        }
        console.log(error)
    }
    
}
export const updateTodoListItem = async(todo_list_item_id, data, token) => {
    const url = updateTodoListItemURL(todo_list_item_id)
    try {
        const response = await axios.patch(`http://localhost:8000/${url}`, data, {'headers': { 'Authorization': `Token ${token}`}})
        return response
    }catch(error) {
        console.log(error)
        return {
            errorCode: error.response.data.error_code,
            errorMessage: error.response.data.error_message,
        }
        console.log(error)
    }
    
}

export const deleteTodoListItem = async(todo_list_item_id, token) => {
    const url = deleteTodoListItemURL(todo_list_item_id)
    try {
        const response = await axios.delete(`http://localhost:8000/${url}`, {'headers': { 'Authorization': `Token ${token}`}})
        return response
    }catch(error) {
        console.log(error)
        return {
            errorCode: error.response.data.error_code,
            errorMessage: error.response.data.error_message,
        }
        console.log(error)
    }
    
}

export const deleteTodoList = async(todo_list_id, token) => {
    console.log('todo_list_id', todo_list_id)
    const url = deleteTodoListURL(todo_list_id)
    console.log('url', url)
    try {
        const response = await axios.delete(`http://localhost:8000/${url}`, {'headers': { 'Authorization': `Token ${token}`}})
        return response
    }catch(error) {
        console.log(error)
        return {
            errorCode: error.response.data.error_code,
            errorMessage: error.response.data.error_message,
        }
        console.log(error)
    }
    
}