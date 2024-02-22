import { createSlice } from "@reduxjs/toolkit";


const todoSlice = createSlice({
    name:"todo",
    initialState:{
        data:[

        ]
    },
    reducers:{
        showData:(state,action)=>{
                state.data = action.payload
        },
        add:(state,action)=>{
            state.data.push(action.payload)
        },
        update:(state,action)=>{
            let {id,...updateData} = action.payload
        },
        remove:(state,action)=>{
            const id = action.payload
            const index = state.data.findIndex(todo =>{ todo.id == id})
            state.data.splice(index,1)
        }
    }
})

export const todoReducer = todoSlice.reducer
export const todoAction = todoSlice.actions