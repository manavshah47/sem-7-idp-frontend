import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import '../companyform.css'; // Import the CSS file for styling
import axios from 'axios'; // Import Axios
const CompanyForm = () => {
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
    const navigate = useNavigate();

    const navigateCompanyform2 = () => {
        // 👇️ navigate to /
        navigate('/companyform2');
      };

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
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
    
        if (!formData.companyAddress.trim()) {
          newErrors.companyAddress = 'Company Address is required';
        }
    
        if (!formData.ownerName.trim()) {
          newErrors.ownerName = 'Owner Name is required';
        }
    
        if (formData.companyEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
          newErrors.companyEmail = 'Invalid email address';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
    
        if (isValid) {
          // You can handle form submission here, e.g., send data to a server or perform other actions.
          console.log('Form data:', formData);
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
                    </div>
                </div>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>Company Address:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="companyAddress" value={formData.companyAddress} onChange={handleChange} required style={{backgroundColor:'#eee'}} />
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
                    </div>
                </div>
                <div className="form-group flex width-50">
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>Company Telephone:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="tel" name="companyTelephone" value={formData.companyTelephone} onChange={handleChange} style={{backgroundColor:'#eee'}}/>
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
                    </div>
                </div>
                <div className="form-group flex width-50">
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>Company Email:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="email" name="companyEmail" value={formData.companyEmail} onChange={handleChange} required style={{backgroundColor:'#eee'}}/>
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
                    </div>
                </div>
                <div className="form-group flex width-50">
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>Company Factory:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="companyFactory" value={formData.companyFactory} onChange={handleChange} style={{backgroundColor:'#eee'}}/>
                    </div>
                </div>
            </div>
            <div style={{paddingBottom:20, paddingTop:30, marginInlineStart: '50em' }}>
            <button type="submit" onClick={navigateCompanyform2} style={{borderColor:'#0f3c69', backgroundColor:'#0f3c69', color:'white' , borderRadius:20 , marginInline:5}}  className='savebtn'>Save & Next</button>
            </div>
        </form>
        </center>
        </div>
    );
};

export default CompanyForm;
