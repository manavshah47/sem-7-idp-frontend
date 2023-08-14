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

        if(!isDataUpdated){
            navigate("/company-info-3")
            return;
        }

        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/membership/company-info-2`, {...formData}, {headers:{"Content-Type":"multipart/form-data"}})
        toast(response.data.message)

        if(response.data.success){
            navigate("/company-info-3")
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
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>Registration Proof Name:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input style={{backgroundColor:'#eee'}} type="text" name="registrationProofName" value={formData.registrationProofName} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>GST Number:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} required style={{ backgroundColor: '#eee' }} />
                       </div>
                </div>
                
            </div>
            <div style={{textAlign:'start' ,marginLeft:'70px', paddingTop:10}}>
                <div className="form-group flex width-50" >
                    <div className='width-50'>
                        <p className='label'  style={{ marginRight: 20, textAlign:'start'}}>Registration Proof:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="file" name="file" onChange={handleChange} accept=".pdf" required style={{ backgroundColor: '#eee' }} />       
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
