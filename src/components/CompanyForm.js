import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import '../companyform.css'; // Import the CSS file for styling
import axios from 'axios'; // Import Axios

import { toast } from 'react-toastify'
import { connect } from 'react-redux';

const mapStateToProps = ({ session }) => ({
    session
})


const CompanyForm = ({ session }) => {
    const navigate = useNavigate();

    const [isDataUpdated, setIsDataUpdated] = useState(false)

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
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/membership/membership/${session.memberId}`)

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

            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        preLoadData()
    }, [])

    const handleChange = (e) => {
        setIsDataUpdated(true)
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let newErrors = {};
    
        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company Name is required';
        }
        else if (formData.companyName.trim().length < 5) {
            newErrors.companyName = 'companyName must be at least 5 characters long';
        }
    
        if (!formData.companyAddress.trim()) {
            newErrors.companyAddress = 'Company Address is required';
        }
        else if (formData.companyAddress.trim().length < 5) {
            newErrors.companyAddress = 'companyAddress must be at least 5 characters long';
        }
    
        
    
        if (!formData.ownerName.trim()) {
            newErrors.ownerName = 'Owner Name is required';
        }
        else if (formData.ownerName.trim().length < 5) {
            newErrors.ownerName = 'ownerName must be at least 5 characters long';
        }
    
    
        if (!formData.companyTelephone.trim()) {
            newErrors.companyTelephone = 'Company Telephone is required';
        } else if (!/^\d{10}$/.test(formData.companyTelephone)) {
            newErrors.companyTelephone = 'Company Telephone should have 10 digits';
        }
    
        if (!formData.companyPhone.trim()) {
            newErrors.companyPhone = 'Company Phone is required';
        } else if (!/^\d{10}$/.test(formData.companyPhone)) {
            newErrors.companyPhone = 'Company Phone should have 10 digits';
        }
    
        if (formData.companyEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
            newErrors.companyEmail = 'Invalid email address';
        }
    
        if (!formData.companyBranch.trim()) {
            newErrors.companyBranch = 'Company Branch is required';
        }
        else if (formData.companyBranch.trim().length < 5) {
            newErrors.companyBranch = 'companyBranch must be at least 5 characters long';
        }
    
    
        if (!formData.companyFactory.trim()) {
            newErrors.companyFactory = 'Company Factory is required';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('handleSubmit triggered');

        const isValid = validateForm();

        if(!isDataUpdated){
            console.log('Navigating to /company-info-2');
            navigate("/company-info-2")
            return;
        }
    
        if (isValid) {
            // withCredentials to send httpOnly cookie via request
            axios.defaults.withCredentials = true;

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/membership/company-info-1`, {...formData}, {headers:{"Content-Type":"application/json"}})

            if(response.data.success){
                toast(response.data.message)
                navigate('/company-info-2');
            } else {
                toast(response.data.message)
            }
        }
    };
    

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
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="companyAddress" value={formData.companyAddress} onChange={handleChange} required style={{backgroundColor:'#eee'}} />
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
                        {errors.companyTelephone && <p className="error-message">{errors.companyTelephone}</p>}
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
                        <p className='label' style={{textAlign:'start'}}>Company Branch:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="companyBranch" value={formData.companyBranch} onChange={handleChange} style={{backgroundColor:'#eee'}}/>   
                        {errors.companyBranch && <p className="error-message"style={{color: 'red', fontSize: '12px'}}>{errors.companyBranch}</p>}
                    </div>
                </div>
                <div className="form-group flex width-50">
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>Company Factory:</p>
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
    );
};

export default connect(
    mapStateToProps
)(CompanyForm);
