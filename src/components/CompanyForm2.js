import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../companyform.css'; // Import the CSS file for styling
import axios from 'axios'; // Import Axios

import { toast } from 'react-toastify';
import { connect } from 'react-redux';

const mapStateToProps = ({ session }) => ({
    session
})

const CompanyForm = ({session}) => {
    const [isDataUpdated, setIsDataUpdated] = useState(false)

    const [formData, setFormData] = useState({
        companyType: '',
        registrationYear: '',
        registrationProof: null,
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
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/membership/membership/${session.memberId}`)

            if(response.data.success){
                let temp = response.data.data
                let date = new Date(temp.companyRegistrationYear).toISOString().split('T', 1)[0]
                
                setFormData({
                    companyType: temp.companyType,
                    registrationYear: date,
                    panNumber: temp.panNumber,
                    gstNumber: temp.gstNumber,
                    cinNumber: temp.cinNumber,
                    registrationProofName: temp.companyRegistrationProofAttachment.documentName
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        preLoadData()
    }, [])

    const validateForm = () => {
        let newErrors = {};
    
        if (!formData.companyType.trim()) {
            newErrors.companyType = 'Company Type is required';
        }
    
        if (!formData.registrationYear.trim()) {
            newErrors.registrationYear = 'Registration Date is required';
        }
    
        if (!formData.panNumber.trim()) {
            newErrors.panNumber = 'PAN Number is required';
        } 
        // else if (!/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/.test(formData.panNumber)) {
        //     newErrors.panNumber = 'Invalid PAN number format.';
        // }
    
        if (!formData.cinNumber.trim()) {
            newErrors.cinNumber = 'CIN Number is required';
        } 
        // else if (!/^([A-Z]){1}([0-9]){5}([A-Z]){2}([0-9]){4}([A-Z]){3}([0-9]){6}$/.test(formData.cinNumber)) {
        //     newErrors.cinNumber = 'Invalid CIN number format.';
        // }
    
        if (!formData.registrationProofName.trim()) {
            newErrors.registrationProofName = 'Registration Proof Name is required';
        }
    
        if (!formData.gstNumber.trim()) {
            newErrors.gstNumber = 'GST Number is required';
        } 
        // else if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/.test(formData.gstNumber)) {
        //     newErrors.gstNumber = 'Invalid GST number format.';
        // }
        
    
        if (!formData.registrationProof) {
            newErrors.registrationProof = 'Registration Proof is required';
        } 
        // else if (formData.registrationProof.type !== 'application/pdf') {
        //     newErrors.registrationProof = 'File must be in PDF format.';
        // }
        
    
        setErrors(newErrors);
        return newErrors;
    };
    
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
        console.log('handleSubmit triggered');


        if(!isDataUpdated){
            console.log('Navigating to /company-info-2');
            navigate("/company-info-3")
            return;
        }

        const isValid = validateForm();
        if (isValid) {
            // withCredentials to send httpOnly cookie via request
            axios.defaults.withCredentials = true;

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/membership/company-info-2`, {...formData}, {headers:{"Content-Type":"application/json"}})

            if(response.data.success){
                toast(response.data.message)
                navigate('/company-info-3');
            } else {
                toast(response.data.message)
            }
        }        
    };

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
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="companyType" value={formData.companyType} onChange={handleChange} required style={{ backgroundColor: '#eee' }} />   
                        {errors.companyType && <p className="error-message">{errors.companyType}</p>}
                    </div>
                </div>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>Registration Date:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'0px'}}>
                        <input type="date" name="registrationYear" value={formData.registrationYear} onChange={handleChange} required style={{ backgroundColor: '#eee' }} />
                        {errors.registrationYear && <p className="error-message">{errors.registrationYear}</p>}
                    </div>
                </div>
            </div>


            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'20px', paddingRight:'20px'}}>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>PAN Number:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} required style={{ backgroundColor: '#eee' }} />   
                        {errors.panNumber && <p className="error-message">{errors.panNumber}</p>}
                    </div>
                </div>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>CIN Number:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="cinNumber" value={formData.cinNumber} onChange={handleChange} style={{ backgroundColor: '#eee' }} />
                        {errors.cinNumber && <p className="error-message">{errors.cinNumber}</p>}
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'20px', paddingRight:'20px'}}>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>Registration Proof Name:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input style={{backgroundColor:'#eee'}} type="text" name="registrationProofName" value={formData.registrationProofName} onChange={handleChange} required />
                        {errors.registrationProofName && <p className="error-message">{errors.registrationProofName}</p>}
                    </div>
                </div>

                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>GST Number:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} required style={{ backgroundColor: '#eee' }} />
                        {errors.gstNumber && <p className="error-message">{errors.gstNumber}</p>}
                    </div>
                </div>
                
            </div>
            <div style={{textAlign:'start' ,marginLeft:'70px', paddingTop:10}}>
                <div className="form-group flex width-50" >
                    <div className='width-50'>
                        <p className='label'  style={{ marginRight: 20, textAlign:'start'}}>Registration Proof:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'0px'}}>
                        <input type="file" name="file" onChange={handleChange} accept=".pdf" required style={{ backgroundColor: '#eee' }} />       
                        {errors.registrationProof && <p className="error-message">{errors.registrationProof}</p>}
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
    );
};

export default connect(
    mapStateToProps
)(CompanyForm);
