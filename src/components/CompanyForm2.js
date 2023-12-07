import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../companyform.css'; // Import the CSS file for styling
import axios from 'axios'; // Import Axios

import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import Loader from "./Loader";

import moment from 'moment';


const mapStateToProps = ({ session }) => ({
    session
})

let initialSubmit = false

const CompanyForm = ({session}) => {
    const [isDataUpdated, setIsDataUpdated] = useState(false)

    const [formData, setFormData] = useState({
        companyType: '',
        registrationYear: '',
        file: null,
        panNumber: '',
        cinNumber: '',
        gstNumber: '',
        registrationProofName: '',
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});


    const navigatepreviouspage = () => {
        navigate('/membership-form');
    };

    const preLoadData = async () => {
        setLoader(true)
        try {
            setLoader(true)
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/membership/membership/${session.phone}`)
            if(response.data.success){
                let temp = response.data.data
                let date = new Date(temp.companyRegistrationYear).toISOString().split('T', 1)[0]
                setFormData({
                    companyType: temp.companyType,
                    registrationYear: date,
                    panNumber: temp.panNumber,
                    gstNumber: temp.gstNumber,
                    cinNumber: temp.cinNumber,
                    registrationProofName: temp.companyRegistrationProofAttachment.documentName,
                    file: temp.companyRegistrationProofAttachment.file
                })
            }
            
            setLoader(false)
        } catch (error) {
            toast(error.message)
        }
        setLoader(false)
    }

    useEffect(() => {
        preLoadData()
        setTimeout(() => {
            initialSubmit = true
        }, 0);
    }, [])

    const validateCompanyType = () => {
        let str = "";
        if (!formData.companyType.trim()) {
            str = 'companyType is required';
        }
        else if (formData.companyType.trim().length < 5) {
            str = 'companyType must be at least 5 characters long';
        }

        if(str == ''){
            setErrors(err => {
                const { companyType, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                companyType:str
            }))
        }
    }

    const validateRegistrationYear = () => {
        let str = "";
        if (!formData.registrationYear.trim()) {
            str = 'Registration Date is required';
        } else if (formData.registrationYear > moment().format("YYYY-MM-DD")) {
            str = "Registration Date cannot be from future"
        }
        
        if(str == ''){
            setErrors(err => {
                const { registrationYear, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                registrationYear:str
            }))
        }
    }

    const validatePanNumber = () => {
        let str = "";
        if (!formData.panNumber.trim()) {
            str = 'PAN Number is required';
        } 
        else if (!/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/.test(formData.panNumber)) {
            str = 'Invalid PAN number format.';
        }

        if(str == ''){
            setErrors(err => {
                const { panNumber, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                panNumber:str
            }))
        }
    }
    
    const validateCinNumber = () => {
        let str = "";
        if (!formData.cinNumber.trim()) {
            str = 'CIN Number is required';
        } 
        else if (!/^([A-Z]){1}([0-9]){5}([A-Z]){2}([0-9]){4}([A-Z]){3}([0-9]){6}$/.test(formData.cinNumber)) {
            str = 'Invalid CIN number format.';
        }

        if(str == ''){
            setErrors(err => {
                const { cinNumber, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                cinNumber:str
            }))
        }
    }

    const validateRegistrationProofName = () => {
        let str = "";
        if (!formData.registrationProofName.trim()) {
            str = 'Registration Proof Name is required';
        }

        if(str == ''){
            setErrors(err => {
                const { registrationProofName, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                registrationProofName:str
            }))
        }
    }
    
    const validateGstNumber = () => {
        let str = "";
        if (!formData.gstNumber.trim()) {
            str = 'GST Number is required';
        } 
        else if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/.test(formData.gstNumber)) {
            str = 'Invalid GST number format.';
        }

        if(str == ''){
            setErrors(err => {
                const { gstNumber, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                gstNumber:str
            }))
        }
    }


    const validateFile = () => {
        let str = "";

        if (!formData.file) {
            str = 'Registration Proof is required';
        } 
        else if (!(formData.file?.type === 'application/pdf' || formData.file.includes("https://idp-sem-7.s3.us-east-1.amazonaws.com"))) {
            str = 'File must be in PDF format.';
        }

        if(str == ''){
            setErrors(err => {
                const { file, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                file:str
            }))
        }
    };

    useEffect(() => {
        if(initialSubmit){
            validateGstNumber()
        }
    }, [formData.gstNumber])
    
    useEffect(() => {
        if(initialSubmit){
            validateCinNumber()
        }
    }, [formData.cinNumber])
   
    useEffect(() => {
        if(initialSubmit){
            validatePanNumber()
        }
    }, [formData.panNumber])
    
    useEffect(() => {
        if(initialSubmit){
            validateCompanyType()
        }
    }, [formData.companyType])
    
    useEffect(() => {
        if(initialSubmit){
            validateRegistrationProofName()
        }
    }, [formData.registrationProofName])

    
    useEffect(() => {
        if(initialSubmit){
            validateFile()
        }
    }, [formData.file])
    
    useEffect(() => {
        if(initialSubmit){
            validateRegistrationYear()
        }
    }, [formData.registrationYear])

    
    const handleChange = (e) => {
        setIsDataUpdated(true)
        const { name, value, type } = e.target;

        // Handle file inputs (for PDF upload)
        if (type === 'file') {
            const file = e.target.files[0];
            setFormData((prevData) => ({
                ...prevData,
                [name]: file,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        validateCinNumber()
        validateGstNumber()
        validatePanNumber()
        validateCompanyType()
        validateFile()
        validateRegistrationProofName()
        validateRegistrationYear()

        let isValid = Object.keys(errors).length === 0

        if(!isDataUpdated && isValid && formData.cinNumber != ""){
            // 'Navigating to /company-info-3 as data is not updated';
            navigate("/company-info-3")
            return;
        }

        if (isValid) {
            // withCredentials to send httpOnly cookie via request
            setLoader(true)
            axios.defaults.withCredentials = true;

            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/membership/company-info-2`, {...formData}, {headers:{"Content-Type":"multipart/form-data"}})
            setLoader(false)

            if(response.data.success){
                toast(response.data.message)
                navigate('/company-info-3');
            } else {
                toast(response.data.message)
            }
        }
    };
    const [loader, setLoader] = useState(false)

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
            <h1 style={{margin:10, padding:30}} className='form-heading' >B. Company Details</h1>
            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'20px', paddingRight:'20px'}}>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>Company Type:</p>
                    </div>
                    <div className='width-60' style={{ marginLeft: '0px' }}>
                    <select
                        name="companyType"
                        value={formData.companyType}
                        onChange={handleChange}
                        required
                        style={{ backgroundColor: '#eee', fontSize: '100%',paddingTop:10, paddingBottom:10, paddingRight:38, paddingLeft:15,marginRight :2,borderRadius:3,marginBottom:2}}
                    >
                        <option value="">Select Company Type</option>
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                        <option value="cooperative">co operative</option>
                        <option value="others">Others</option>
                    </select>
                    {errors.companyType && (
                        <p className="error-message" style={{ color: 'red', fontSize: '12px' }}>
                            {errors.companyType}
                        </p>
                    )}
                </div>

                </div>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>Registration Date:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'0px'}}>
                        <input type="date" name="registrationYear" value={formData.registrationYear} max={moment().format("YYYY-MM-DD")} onChange={handleChange} required style={{ backgroundColor: '#eee',paddingLeft:33,paddingRight:35,marginLeft:5 }} />
                        {errors.registrationYear && <p className="error-message"style={{color: 'red', fontSize: '12px'}}>{errors.registrationYear}</p>}
                    </div>
                </div>
            </div>


            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'20px', paddingRight:'20px'}}>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>PAN Number:</p>
                    </div>
                    <div className='width-50' style={{marginInline : 7}}>
                        <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} required style={{ backgroundColor: '#eee' }} />   
                        {errors.panNumber && <p className="error-message" style={{color: 'red', fontSize: '12px'}}>{errors.panNumber}</p>}
                    </div>
                </div>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>CIN Number:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="cinNumber" value={formData.cinNumber} onChange={handleChange} style={{ backgroundColor: '#eee' }} />
                        {errors.cinNumber && <p className="error-message" style={{color: 'red', fontSize: '12px'}}>{errors.cinNumber}</p>}
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'20px', paddingRight:'20px'}}>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>Registration Proof Name:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'11px'}}>
                    <select
                        name="registrationProofName"
                        value={formData.registrationProofName}
                        onChange={handleChange}
                        required
                        style={{ backgroundColor: '#eee', fontSize: '100%',paddingTop:10, paddingBottom:10, paddingRight:55, paddingLeft:18,marginRight :2,borderRadius:3,marginTop : 2,marginLeft:5}}
                    >
                        <option value="">Select Proof Name</option>
                        <option value="Pan">Pan</option>
                        <option value="Electricity">Electricity Bill</option>
                        <option value="Gst">GST Proof</option>
                        <option value="others">Others</option>
                    </select>
                    {errors.registrationProofName && <p className="error-message" style={{color: 'red', fontSize: '12px'}}>{errors.registrationProofName}</p>}
                    </div>
                </div>

                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>GST Number:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} required style={{ backgroundColor: '#eee' }} />
                        {errors.gstNumber && <p className="error-message" style={{color: 'red', fontSize: '12px'}}>{errors.gstNumber}</p>}
                    </div>
                </div>
                
            </div>
            <div style={{textAlign:'start' ,marginLeft:'70px', paddingTop:10}}>
                <div className="form-group flex" style={{alignItems:'center'}}>
                    <div className=''>
                        <p className='label'  style={{ marginRight: 20, textAlign:'start'}}>Registration Proof:</p>
                    </div>
                    <div className='flex' style={{marginLeft:'0px'}}>
                        <input type="file" name="file" id='file-input' title={formData.file} onChange={handleChange} accept=".pdf" required style={{ backgroundColor: '#eee' }} />
                        {(formData != null && formData.file?.type !== 'application/pdf' && formData.file?.includes("https://idp-sem-7.s3.us-east-1.amazonaws.com")) && 
                        <Link to={`${formData.file}#toolbar=0`}  target="_blank" rel="noopener noreferrer"> <button type="button" className='savebtn' style={{ borderColor: '#0f3c69', backgroundColor: '#0f3c69', color: 'white', borderRadius: 5, height:'44px', margin:'auto',marginLeft:55,marginTop:8}} >View Document</button> </Link> }
                        {errors.file && <p className="error-message" style={{color: 'red', fontSize: '12px'}}>{errors.file}</p>}
                    </div>
                </div>
            </div>
            <center>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ paddingLeft:30, paddingBottom:20, paddingTop:30}}>
                        <button type="submit" onClick={navigatepreviouspage} className='savebtn' style={{ borderColor: '#0f3c69', backgroundColor: '#0f3c69', color: 'white', borderRadius: 20, marginInline: 5 }} >Previous Page</button>
                    </div>
                    <div style={{ paddingLeft:20, paddingBottom:20, paddingTop:30, marginInlineStart: '40em'}}>
                        <button type="submit" className='savebtn' onClick={handleSubmit} style={{ borderColor: '#0f3c69', backgroundColor: '#0f3c69', color: 'white', borderRadius: 20, marginInline: 5 }} >Save & Next</button>
                    </div>
                </div>
            </center>
        </form>
        </center>
        </div>
    )};
};

export default connect(
    mapStateToProps
)(CompanyForm);
