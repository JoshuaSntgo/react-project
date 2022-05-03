import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    personalInformation: {},
    educ: {},
    civilservice: {}, 
    workexp: {}, 
    trainings: {}
}


export const userSlice = createSlice({
    name: 'userinfo', 
    initialState, 
    reducers: {
        updatePersonalInfo: (state, action) => {
            state.personalInformation = action.payload
        }, 
        updateEducs: (state, action) => {
            state.educ = action.payload
        }, 
        updateCivilService: (state, action) => {
            state.civilservice = action.payload
        },
        updateWorkXP: (state, action) => {
            state.workexp = action.payload
        }, 
        updateTrainings: (state, action) => {
            state.trainings = action.payload
        }
    },
})

export const {
    updatePersonalInfo, 
    updateEducs, 
    updateCivilService, 
    updateWorkXP, 
    updateTrainings
} = userSlice.actions

export default userSlice.reducer