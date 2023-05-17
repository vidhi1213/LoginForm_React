export const AddUser = (user) => {
    return{
        type :'ADD',
        user
    }
}

export const EditUser = (user) => {
    return{
        type :'EDIT',
        user
    }
}

export const deleteUser =(userid) => {
    return {
        type :'DELETE',
        userid
    }
}