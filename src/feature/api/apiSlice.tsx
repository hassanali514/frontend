import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface SuperAdmin {
    _id: string
    username: string,
    password:String,
    role:String
}

type LoginResponse = {
    success: boolean,
    sadmin:SuperAdmin,
    token:String
}

type superAdminProfile = {
    success:boolean,
    sadmin:SuperAdmin,
}

type data = {
    username:String,
    password:String
}


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/v1/' }),
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        loginSuperAdmin: builder.mutation<LoginResponse,data>({
            query: (body) => ({
                url: "/login/admin",    
                method: 'POST',
                body
            }),
        }),
        superAdminProfile: builder.query<superAdminProfile,void>({
            query: () => '/admin/me'
        })

    }),
})

export const {
    
    useLoginSuperAdminMutation,
    useSuperAdminProfileQuery
} = apiSlice