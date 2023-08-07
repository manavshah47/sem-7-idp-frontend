import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../companyform.css'; // Import the CSS file for styling
import axios from 'axios'; // Import Axios

const CompanyForm = () => {
    const [formData, setFormData] = useState({
        companyType: '',
        registrationYear: '',
        registrationProof: null,
        panNumber: '',
        cinNumber: '',
        gstNumber: '',
        companyResearchArea: '',
    });

    const navigate = useNavigate();

    const navigatepreviouspage = () => {
        // 👇️ navigate to /
        navigate('/companyform');
    };

    const handleChange = (e) => {
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

    const handleSubmit = (e) => {

          // 👇️ navigate to /
          navigate('/companyform3');

        e.preventDefault();
        // You can handle form submission here, e.g., send data to a server or perform other actions.
        console.log('Form data:', formData);

        const formDataToSend = new FormData();
        formDataToSend.append('companyType', formData.companyType);
        formDataToSend.append('registrationYear', formData.registrationYear);
        formDataToSend.append('registrationProof', formData.registrationProof);
        formDataToSend.append('panNumber', formData.panNumber);
        formDataToSend.append('cinNumber', formData.cinNumber);
        formDataToSend.append('gstNumber', formData.gstNumber);
        formDataToSend.append('companyResearchArea', formData.companyResearchArea);

        // Make the API call using Axios
        axios.post('http://localhost:3001/api/membership/company-info-2', formDataToSend)
            .then((response) => {
                // Handle success response here if needed
                console.log('API response:', response.data);
            })
            .catch((error) => {
                // Handle error response here if needed
                console.error('API error:', error);
            });
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
                    </div>
                </div>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>Registration Date:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="date" name="registrationYear" value={formData.registrationYear} onChange={handleChange} required style={{ backgroundColor: '#eee' }} />
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
                    </div>
                </div>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>CIN Number:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="cinNumber" value={formData.cinNumber} onChange={handleChange} style={{ backgroundColor: '#eee' }} />
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'20px', paddingRight:'20px'}}>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>CIN Number:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="cinNumber" value={formData.cinNumber} onChange={handleChange} required style={{ backgroundColor: '#eee' }} />
                       </div>
                </div>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>Research Area:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                    <input style={{backgroundColor:'#eee'}} type="text" name="companyResearchArea" value={formData.companyResearchArea} onChange={handleChange} required />
                       </div>
                </div>
            </div>
            <div style={{textAlign:'start' ,marginLeft:'70px', paddingTop:10}}>
                <div className="form-group flex width-50" >
                    <div className='width-50'>
                        <p className='label'  style={{ marginRight: 20, textAlign:'start'}}>Registration Proof:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="file" name="registrationProof" onChange={handleChange} accept=".pdf" required style={{ backgroundColor: '#eee' }} />       
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

export default CompanyForm;
