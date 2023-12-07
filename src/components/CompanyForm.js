import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import '../companyform.css'; // Import the CSS file for styling
import axios from 'axios'; // Import Axios

import { toast } from 'react-toastify'
import { connect } from 'react-redux';
import Loader from "./Loader";

const mapStateToProps = ({ session }) => ({
    session
})

let initialSubmit = false

const CompanyForm = ({ session }) => {
    const navigate = useNavigate();

    const [isDataUpdated, setIsDataUpdated] = useState(false)
    
    const [loader, setLoader] = useState(false)

    const [formData, setFormData] = useState({
        companyName: '',
        companyAddress: '',
        ownerName: '',
        companyTelephone: '',
        companyPhone: '',
        companyEmail: '',
        companyBranch: '',
        companyFactory: '',
    });

    const [errors, setErrors] = useState({});
    
    const preLoadData = async () => {
        try {
            setLoader(true)
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/membership/membership/${session.phone}`)
            if(response.data.success){
                let temp = response.data.data
                setFormData({
                    companyName: temp.companyName,
                    companyAddress: temp.companyAddress,
                    ownerName: temp.ownerName,
                    companyTelephone: temp.companyTelephone,
                    companyPhone: temp.companyPhone,
                    companyEmail: temp.companyEmail,
                    companyBranch: temp.companyBranch,
                    companyFactory: temp.companyFactory
                })
            } else {
                setIsDataUpdated(true)
            }
            setLoader(false)
        } catch (error) {
            toast(error.message)
        }
    }

    useEffect(() => {
        preLoadData()
        setTimeout(() => {
            initialSubmit = true
        }, 0);
    }, [])

    const handleChange = (e) => {
        setIsDataUpdated(true)
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateCompanyName = () => {
        let str = "";
        if (!formData.companyName.trim()) {
            str = 'Company Name is required';
        }
        else if (formData.companyName.trim().length < 2) {
            str = 'companyName must be at least 2 characters long';
        }

        if(str == ''){
            setErrors(err => {
                const { companyName, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                companyName:str
            }))
        }
    }

    const validateCompanyAddress = () => {
        let str = '';
    
        if (!formData.companyAddress.trim()) {
            str = 'Company Address is required';
        }
        else if (formData.companyAddress.trim().length < 5) {
            str = 'companyAddress must be at least 5 characters long';
        }

        if(str == ''){
            setErrors(err => {
                const { companyAddress, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                companyAddress:str
            }))
        }
    }

    const validateOwnerName = () => {
        let str = ""
    
        if (!formData.ownerName.trim()) {
            str = 'Owner Name is required';
        }
        else if (formData.ownerName.trim().length < 2) {
            str = 'ownerName must be at least 2 characters long';
        }


        if(str == ''){
            setErrors(err => {
                const { ownerName, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                ownerName:str
            }))
        }
    }

    const validateCompanyTelephone = () => {
        let str = "";
    
        if (!formData.companyTelephone.trim()) {
            str = 'Company Telephone is required';
        } else if (!/^\d{10}$/.test(formData.companyTelephone)) {
            str = 'Telephone must have 10 digits';
        }

        if(str == ''){
            setErrors(err => {
                const { companyTelephone, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                companyTelephone:str
            }))
        }
    }

    const validateCompanyPhone = () => {
        let str = ""

        if (!formData.companyPhone.trim()) {
            str = 'Company Phone is required';
        } else if (!/^\d{10}$/.test(formData.companyPhone)) {
            str = 'Phone must have 10 digits';
        }

        if(str == ''){
            setErrors(err => {
                const { companyPhone, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                companyPhone:str
            }))
        }
    }

    const validateCompanyEmail = () => {
        let str = '';
        if (!formData.companyEmail.trim()) {
            str = 'Company Email is required';
        }else if (formData.companyEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
            str = 'Invalid email address';
        }

        if(str == ''){
            setErrors(err => {
                const { companyEmail, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                companyEmail:str
            }))
        }
    }

    useEffect(() => {
        if(initialSubmit){
            validateCompanyName()
        }
    }, [formData.companyName])

    useEffect(() => {
        if(initialSubmit){
            validateCompanyAddress()
        }
    }, [formData.companyAddress])
    
    useEffect(() => {
        if(initialSubmit){
            validateOwnerName()
        }
    }, [formData.ownerName])

    useEffect(() => {
        if(initialSubmit){
            validateCompanyPhone()
        }
    }, [formData.companyPhone])

    useEffect(() => {
        if(initialSubmit){
            validateCompanyTelephone()
        }
    }, [formData.companyTelephone])

    useEffect(() => {
        if(initialSubmit){
            validateCompanyEmail()
        }
    }, [formData.companyEmail])

    const handleSubmit = async (e) => {
        e.preventDefault();

        validateCompanyName()
        validateCompanyAddress()
        validateOwnerName()
        validateCompanyTelephone()
        validateCompanyPhone()
        validateCompanyEmail()

        if(!isDataUpdated){
            navigate("/company-info-2")
            return;
        }
    
        if (Object.keys(errors).length === 0 && formData.companyAddress != "") {
            setLoader(true)

            // withCredentials to send httpOnly cookie via request
            axios.defaults.withCredentials = true;

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/membership/company-info-1`, {...formData}, {headers:{"Content-Type":"application/json"}})
            setLoader(false)
          
            if(response.data.success){
                toast(response.data.message)
                navigate('/company-info-2');
            } else {
                toast(response.data.message)
            }

        } else {
            toast("Enter Correct Input Data")
        }
    };
    
    if(loader){
        return (
        <div style={{width : '100%', height:'100%'}}>
            <Loader/>
        </div>
        )
      }
      else{

      
    return (
        <div className="flex" style={{justifyContent:'center', alignItems:'center', paddingTop:"100px"}}>
        <center>
            <form className="company-form" onSubmit={handleSubmit} style={{color:'black', backgroundColor:'white'}}>
            <h1 style={{margin:10, padding:30}} className='form-heading' >A. Company Details</h1>    
            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'10px', paddingRight:'50px'}}>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>Company Name:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required style={{backgroundColor:'#eee'}} />
                        {errors.companyName && <p className="error-message" style={{color: 'red', fontSize: '12px'}}>{errors.companyName}</p>}   
                    </div>
                </div>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>Company Address:</p>
                    </div>
                    <div className='width-50' style={{marginRight:'24px'}}>
                    <textarea name="companyAddress" value={formData.companyAddress} onChange={handleChange} required style={{ backgroundColor: '#eee', width: '112%', minHeight: '0px',borderRadius : 4, color:"#0f3c69" }}
/>
                        {errors.companyAddress && <p className="error-message"style={{color: 'red', fontSize: '12px'}}>{errors.companyAddress}</p>}
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'10px', paddingRight:'50px'}}>
                <div className="form-group flex width-50">
                    <div className='width-50' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>Owner Name:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required style={{backgroundColor:'#eee'}}/>  
                        {errors.ownerName && <p className="error-message"style={{color: 'red', fontSize: '12px'}}>{errors.ownerName}</p>} 
                    </div>
                </div>
                <div className="form-group flex width-50">
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>Company Telephone:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="tel" name="companyTelephone" value={formData.companyTelephone} onChange={handleChange} style={{backgroundColor:'#eee'}}/>
                        {errors.companyTelephone && <p className="error-message"style={{color: 'red', fontSize: '12px'}}>{errors.companyTelephone}</p>}
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'10px', paddingRight:'50px'}}>
            <div className="form-group flex width-50">
                    <div className='width-50' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>Company Phone:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="tel" name="companyPhone" value={formData.companyPhone} onChange={handleChange} style={{backgroundColor:'#eee'}}/>
                        {errors.companyPhone && <p className="error-message"style={{color: 'red', fontSize: '12px'}}>{errors.companyPhone}</p>}   
                    </div>
                </div>
                <div className="form-group flex width-50">
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>Company Email:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="email" name="companyEmail" value={formData.companyEmail} onChange={handleChange} required style={{backgroundColor:'#eee'}}/>
                        {errors.companyEmail && <p className="error-message" style={{color: 'red', fontSize: '12px'}} >{errors.companyEmail}</p>}
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'10px', paddingRight:'50px'}}>
                <div className="form-group flex width-50">
                    <div className='width-50' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>Company Branch: <span style={{color : 'black'}}>(optional) </span> </p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="companyBranch" value={formData.companyBranch} onChange={handleChange} style={{backgroundColor:'#eee'}}/>   
                        {errors.companyBranch && <p className="error-message"style={{color: 'red', fontSize: '12px'}}>{errors.companyBranch}</p>}
                    </div>
                </div>
                <div className="form-group flex width-50">
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>Company Factory:<span style={{color : 'black'}}>(optional) </span></p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="companyFactory" value={formData.companyFactory} onChange={handleChange} style={{backgroundColor:'#eee'}}/>
                        {errors.companyFactory && <p className="error-message" style={{color: 'red', fontSize: '12px'}}>{errors.companyFactory}</p>}
                    </div>
                </div>
            </div>
            <div style={{paddingBottom:20, paddingTop:30, marginInlineStart: '50em' }}>
            <button type="submit" onClick={handleSubmit} style={{borderColor:'#0f3c69', backgroundColor:'#0f3c69', color:'white' , borderRadius:20 , marginInline:5}}  className='savebtn'>Save & Next</button>
            </div>
        </form>
        </center>
        </div>
    )};
};

export default connect(
    mapStateToProps
)(CompanyForm);
