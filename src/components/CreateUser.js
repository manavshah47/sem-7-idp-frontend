import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import '../CreateUser.css'

import {useFormik} from 'formik';
import { createEmployeeValidationSchema } from '../validation/employee.validation';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from './Loader';

const CreateUser = () => {
    const [isDataUpdated, setIsDataUpdated] = useState(false)

    const [loader, setLoader] = useState(false)

    const [emailExists , setEmailExists] = useState(false)
    const [numberExists, setNumberExists] = useState(false)

    const initialValues = {
        name: "",
        phone: "",
        email: "",
        department: "",
        typeOfUser:"",
        designation:""
    }

    const { values, touched, errors, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues,
        validationSchema:createEmployeeValidationSchema,
        onSubmit : async (values, action) => {
            setLoader(true)
            axios.defaults.withCredentials = true
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/create-user`, {...values }, {headers:{"Content-Type":"application/json"}})
            setLoader(false)
            toast(response.data.message)
            if(response.data.success){
                action.resetForm()
            }
        }
    })

    const checkEmailAvailability = async () => {
        try {
    
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/check-email/${values.email}`);
          setEmailExists(response.data.exists);
        } catch (error) {
          console.error('Error checking email:', error);
        }
      };
    
      const checkNumberAvailability = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/check-phone/${values.phone}`);
          setNumberExists(response.data.exists);
        } catch (error) {
          console.error('Error checking phone:', error);
        }
      };

      useEffect(() => {
        checkEmailAvailability()
      }, [values.email])

      useEffect(() => {
        checkNumberAvailability()
      }, [values.phone])

      if(loader){
        return (
        <div style={{width : '100%', height:'100%'}}>
            <Loader/>
        </div>
        )
      }
      else{
  return (
    <div className="flex" style={{overflow:'scroll',height : '100vh',justifyContent:'center', alignItems:'center', paddingTop:"85px"}}>
    <center>
        <form onSubmit={handleSubmit} autoComplete='off' className="company-form" style={{color:'black', backgroundColor:'white'}} >
        <h1 style={{margin:'10',marginLeft : 30, padding:20,fontSize : 22}} className='form-heading' >Create Employee</h1>
                <div className="form-group flex width-50" >
                    <div className='width-10' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>Name :</p>
                    </div>
                    <div className='width-50' style={{margin:'8px 0px 0px'}}>
                        <input type="text" id="name" name="name" onBlur={handleBlur} onChange={handleChange} value={values.name}  required style={{backgroundColor:'#eee',width: '207px'}} />
                        {(errors.name) ? <p style={{color:"red",fontSize:'12px'}}>{errors.name}</p>  : null}
                    </div>
                </div>
                <div className="form-group flex width-50" >
                    <div className='width-10' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>Phone :</p>
                    </div>
                    <div className='width-50' style={{margin:'0px 0px 0px '}}>
                        <input type="text" name="phone" value={values.phone} onChange={handleChange} required style={{backgroundColor:'#eee',width: '207px'}} />
                        {( errors.phone) ? <p style={{color:"red",fontSize:'12px'}}>{errors.phone}</p>  : <p> </p>}
                        {numberExists ? <p style={{color:"red",fontSize:'12px'}}>Phone Number is already taken</p>  : null}

                    </div>
                </div>
                <div className="form-group flex width-50" >
                    <div className='width-10' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>Email :</p>
                    </div>
                    <div className='width-50' style={{margin:'0px 0px 0px'}}>
                        <input type="text" name="email" id="email" onChange={handleChange} value={values.email}  required style={{backgroundColor:'#eee',width: '207px'}} />
                        {(errors.email) ? <p style={{color:"red",fontSize:'12px'}}>{errors.email}</p>  : null}
                        {emailExists ? <p style={{color:"red",fontSize:'12px'}}>Mail Id is already taken</p>  : null}
                    </div>
                </div>
                <div className="form-group flex width-50" style={{marginBottom : '13px',marginTop : '5px'}}>
                    <div className='width-10' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>Department :</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'0px'}}>
                    <select
                        required
                        style={{width: '207px', backgroundColor: '#eee', fontSize: '100%',paddingTop:8, paddingBottom:9, paddingRight:42, paddingLeft:18,marginRight :2,borderRadius:3,marginTop : 2,marginLeft:2}}
                        name="department"
                        id="department"
                        value={values.department}
                        onChange={handleChange}
                    >
                        <option value="" disabled selected>Select Department</option>
                        <option value="hey">hey</option>
                        <option value="by">by</option>
                    </select>
                    {(errors.department) ? <p style={{color:"red",fontSize:'11px'}}>{errors.department}</p>  : null}              
                     </div>
                </div>
                <div className="form-group flex width-50" style={{marginTop : '5px'}} >
                    <div className='width-10' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>Type :</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'0'}}>
                    <select
                        required
                        style={{width: '207px', backgroundColor: '#eee', fontSize: '100%',paddingTop:8, paddingBottom:9, paddingRight:42, paddingLeft:18,marginRight :2,borderRadius:3,marginTop : 2,marginLeft:2}}
                        name="typeOfUser"
                        id="typeOfUser"
                        value={values.typeOfUser}
                        onChange={handleChange}
                    >
                        <option value="" disabled selected>Select Type</option>
                        <option value="approver">Approver</option>
                        <option value="magazine-manager">Mangazine Manager</option>
                    </select> 
                    {(errors.typeOfUser) ? <p style={{color:"red",fontSize:'12px'}}>{errors.typeOfUser}</p>  : null}
                    </div>
                </div>
                <div className="form-group flex width-50" style={{marginTop : '13px'}}>
                    <div className='width-10' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>Designation :</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'0'}}>
                    <select
                        required
                        style={{width: '207px',backgroundColor: '#eee', fontSize: '100%',paddingTop:8, paddingBottom:9, paddingRight:42, paddingLeft:18,marginRight :2,borderRadius:3,marginTop : 2,marginLeft:2}}
                        name="designation"
                        id="designation"
                        value={values.designation}
                        onChange={handleChange}
                    >
                        <option value="" disabled selected>Select Designation</option>
                        <option value="manager">Manager</option>
                        <option value="employee">Employee</option>
                    </select>
                    {(errors.designation) ? <p style={{color:"red",fontSize:'12px'}}>{errors.designation}</p>  : null}              
                      </div>
                </div>
            <center>
            <div style={{paddingBottom:20, paddingTop:30,marginTop : 5,marginLeft : 50}}>
            <button type="submit"  style={{borderColor:'#0f3c69', backgroundColor:'#0f3c69', color:'white' , borderRadius:20 , marginInline:5}}  className='savebtn'>Create USER</button>
            <div class="spacer"></div>
            </div>
            </center>
        </form>
    </center>
    </div> 
     )
  }
}

export default CreateUser;
