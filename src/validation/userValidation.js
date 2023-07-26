// yup input validation for input data
import * as Yup from "yup";

// yup email validation
const emailValidation = Yup.string().email().required("Enter valid email Id")

// yup password validation
const passwordValidation = Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password must be 6-16 characters long and include 1 alphabet, 1 number, 1 special character").required("password is required")

// login form validation schema
export const loginSchema = Yup.object({
    id:emailValidation,
    password:passwordValidation
})

// create user form validation schema
export const createUserSchema = Yup.object({
    id:emailValidation,
    password:passwordValidation,
    username:Yup.string().min(3).max(30).required("Username cannot be empty"),
    typeOfUser:Yup.string().oneOf(["creator","finance","legal"])
})

export const updateUserValidationSchema = Yup.object({
    name: Yup.string().min(3).max(30).required("Username cannot be empty"),
    password: passwordValidation
})