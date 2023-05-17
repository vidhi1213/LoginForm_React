const initialData={
    userList:[]
}

const reducer = (state=initialData,action) =>{
    switch (action.type) {
        case 'ADD':
           return{
               ...state,
               userList:[
                   ...state.userList,
                   action.user
               ]
           }
        case 'EDIT':
            const updateData = state.userList.map((item)=>{return (item.id === action.user.id ? action.user : item)})
            return{
                ...state,
                userList:updateData
            }
        case 'DELETE':
            const list = state.userList.filter(item => item.id !== action.userid)
            return {
                ...state,
                userList:list
            }
        default : return state
    }
}

export default reducer