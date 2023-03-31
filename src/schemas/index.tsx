import * as Yup from "yup"

export const superAdminForm = Yup.object({
    username:Yup.string().min(2).max(25).required("please enter value"),
    password:Yup.string().min(2).max(25).required("please enter value"),
})