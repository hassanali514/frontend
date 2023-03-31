import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
// import { candidateData } from "../../types/candidate.d"
// import axios from "axios"

export interface SuperAdmin {
    _id: string
    username: string,
    password: String,
    role: String
}

type LoginResponse = {
    success: boolean,
    sadmin:SuperAdmin,
    token:String
}


type InitialState = {
    loading: boolean,
    user: SuperAdmin | {},
    error: String
}


const initialState: InitialState = {
    loading:false,
    user:{},
    error:''
}

// Generate pending, fulfilled and rejected action types
export const loginSuperAdmin = createAsyncThunk('superadmin/login', async ({username,password}) => {
    // return axios.get('http://localhost:4000/api/v1/candidates')
    //     .then(response => response.data)
    // let res : any = await fetch("http://localhost:4000/api/v1/candidates");
    // res = await res.json();

    

    let res : any = await fetch("http://localhost:4000/api/v1/login/admin",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });
    res = await res.json();
    return res
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(loginSuperAdmin.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(
            loginSuperAdmin.fulfilled,
            (state, action: PayloadAction<LoginResponse>) => {
                state.loading = false;
                state.user = action.payload;
                state.error = '';
            }
        )
        builder.addCase(loginSuperAdmin.rejected, (state, action) => {
            state.loading = false;
            state.user = {};
            state.error = action.error.message || 'something went wrong';
        })

    }
})

export default userSlice.reducer
