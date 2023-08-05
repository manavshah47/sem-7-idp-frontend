import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import '../companyform.css'; // Import the CSS file for styling

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
        <center>
            <form className="company-form" onSubmit={handleSubmit} style={{color:'black', backgroundColor:'white'}}>
            <h1 style={{margin:10, padding:5}}>Company Form 1</h1>    
            <div className='section1' style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="form-group" style={{margin:10}}>
                    <label style={{marginInline:'1rem'}}>Company Name:</label>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required style={{backgroundColor:'#eee'}} />
                </div>
                <div className="form-group"  style={{margin:10}}>
                    <label style={{marginInline:'1.6rem'}}>Company Address:</label>
                    <input type="text" name="companyAddress" value={formData.companyAddress} onChange={handleChange} required style={{marginInlineEnd:15 , backgroundColor:'#eee'}} />
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="form-group"  style={{margin:10}}>
                    <label style={{marginInline:'1.7rem'}}>Owner Name:</label>
                    <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required style={{backgroundColor:'#eee'}}/>
                </div>
                <div className="form-group"  style={{margin:10}}>
                    <label style={{marginInline:'1rem'}}>Company Telephone:</label>
                    <input type="tel" name="companyTelephone" value={formData.companyTelephone} onChange={handleChange} style={{backgroundColor:'#eee'}}/>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="form-group"  style={{margin:10}}>
                    <label style={{marginInline:'0.85rem'}}>Company Phone:</label>
                    <input type="tel" name="companyPhone" value={formData.companyPhone} onChange={handleChange} style={{backgroundColor:'#eee'}}/>
                </div>
                <div className="form-group"  style={{margin:10}}>
                    <label style={{marginInline:'2.2rem'}}>Company Email:</label>
                    <input type="email" name="companyEmail" value={formData.companyEmail} onChange={handleChange} required style={{backgroundColor:'#eee'}}/>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="form-group"  style={{margin:10}}>
                    <label style={{marginInline:'0.7rem'}}>Company Branch:</label>
                    <input type="text" name="companyBranch" value={formData.companyBranch} onChange={handleChange} style={{backgroundColor:'#eee'}}/>
                </div>
                <div className="form-group"  style={{margin:10}}>
                    <label style={{marginInline:'1.7rem'}}>Company Factory:</label>
                    <input type="text" name="companyFactory" value={formData.companyFactory} onChange={handleChange} style={{backgroundColor:'#eee'}}/>
                </div>
            </div>
            <div style={{padding:20}}>
            <button type="submit" onClick={navigateCompanyform2} style={{borderColor:'#0f3c69', backgroundColor:'#0f3c69', color:'white' , borderRadius:20 , marginInline:5}}  className='savebtn'>Save & Next</button>
            </div>
        </form>
        </center>
    );
};

export default CompanyForm;
