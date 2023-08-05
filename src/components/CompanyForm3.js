import React, { useState } from 'react';
import axios from 'axios';
import '../companyform3.css'
import { useNavigate } from 'react-router-dom';
const CompanyForm3 = () => {
    const [formData, setFormData] = useState({
        companyResearchArea: '',
        productName: '',
        productUnit: '',
        productCapacity: '',
        companyERDAObjective: '',
        companyERDARequiredServices: '',
        typeOfMembership: '',
        companyTurnOverRange: '',
        companyTurnOver: '',
        turnoverBalanceSheet: null,
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const navigatepreviouspage = () => {
        // 👇️ navigate to /
        navigate('/companyform2');
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

    const validateForm = () => {
        let newErrors = {};

        // Add validation rules here if needed

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();

        if (isValid) {
            // Create a FormData object to send the file to the server
            const formDataToSend = new FormData();
            formDataToSend.append('companyResearchArea', formData.companyResearchArea);
            formDataToSend.append('productName', formData.productName);
            formDataToSend.append('productUnit', formData.productUnit);
            formDataToSend.append('productCapacity', formData.productCapacity);
            formDataToSend.append('companyERDAObjective', formData.companyERDAObjective);
            formDataToSend.append('companyERDARequiredServices', formData.companyERDARequiredServices);
            formDataToSend.append('typeOfMembership', formData.typeOfMembership);
            formDataToSend.append('companyTurnOverRange', formData.companyTurnOverRange);
            formDataToSend.append('companyTurnOver', formData.companyTurnOver);
            formDataToSend.append('turnoverBalanceSheet', formData.turnoverBalanceSheet);

            // Make the API call using Axios
            axios.post('YOUR_API_ENDPOINT_URL', formDataToSend)
                .then((response) => {
                    // Handle success response here if needed
                    console.log('API response:', response.data);
                })
                .catch((error) => {
                    // Handle error response here if needed
                    console.error('API error:', error);
                });
        }
    };

    return (
        <center style={{marginTop:'20px'}}>

            <form className='form3' style={{marginTop:'9rem'}}>
                <h1 style={{ margin: 10, padding: 5 }}>Company Form 3</h1>

            <div style={{display:'flex' , flexDirection:'row'}}>
            <div style={{margin:10}}>
                    <label  style={{marginInline:'1rem', marginInlineEnd:'1.8rem'}}>Company Research Area:</label>
                    <input style={{backgroundColor:'#eee'}} type="text" name="companyResearchArea" value={formData.companyResearchArea} onChange={handleChange} required />
                    {errors.companyResearchArea && <span className="error">{errors.companyResearchArea}</span>}
                </div>
                <div style={{margin:10}}>
                    <label style={{marginInline:'1rem', marginInlineEnd:'3rem'}}>Product Name:</label>
                    <input type="text" name="productName" style={{backgroundColor:'#eee'}} value={formData.productName} onChange={handleChange} required />
                    {errors.productName && <span className="error">{errors.productName}</span>}
                </div>
            </div>


                <div style={{display:'flex' , flexDirection:'row'}}>
                <div style={{margin:10}}>
                    <label style={{marginInline:'1rem', marginInlineEnd:'7.6rem'}}>Product Unit:</label>
                    <input type="text" name="productUnit" style={{backgroundColor:'#eee'}} value={formData.productUnit} onChange={handleChange} required />
                    {errors.productUnit && <span className="error">{errors.productUnit}</span>}
                </div>
                <div style={{margin:10}}>
                    <label style={{marginInline:'1rem' , marginInlineEnd:'1.8rem'}}>Product Capacity:</label>
                    <input type="text" name="productCapacity" style={{backgroundColor:'#eee'}} value={formData.productCapacity} onChange={handleChange} required />
                    {errors.productCapacity && <span className="error">{errors.productCapacity}</span>}
                </div>
                </div>


                <div style={{display:'flex' , flexDirection:'row'}}>
                    <div style={{margin:10}}>
                        <label style={{marginInline:'1rem'}}>Company ERDA Objective:</label>
                        <input type="text" name="companyERDAObjective" style={{backgroundColor:'#eee'}} value={formData.companyERDAObjective} onChange={handleChange} required />
                        {errors.companyERDAObjective && <span className="error">{errors.companyERDAObjective}</span>}
                    </div>
                    <div style={{margin:10}}>
                        <label style={{marginInline:'1rem', marginInlineEnd:'3rem'}}> ERDA Services:</label>
                        <input type="text" name="companyERDARequiredServices" style={{backgroundColor:'#eee'}} value={formData.companyERDARequiredServices} onChange={handleChange} required />
                        {errors.companyERDARequiredServices && <span className="error">{errors.companyERDARequiredServices}</span>}
                    </div>
                </div >


                <div style={{margin:10}}>
                    <label style={{marginInline:'1rem', marginInlineStart:'-26rem',marginInlineEnd:'4rem'}}>Type of Membership:</label>
                    <input type="text" name="typeOfMembership" value={formData.typeOfMembership} style={{backgroundColor:'#eee'}} onChange={handleChange} required />
                    {errors.typeOfMembership && <span className="error">{errors.typeOfMembership}</span>}
                </div>


                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{margin:10}}>
                        <label style={{marginInline:'1rem'}}>Company Turnover Range:</label>
                        <input type="text" name="companyTurnOverRange" value={formData.companyTurnOverRange} style={{backgroundColor:'#eee'}} onChange={handleChange} required />
                        {errors.companyTurnOverRange && <span className="error">{errors.companyTurnOverRange}</span>}
                    </div>
                    <div style={{margin:10}}>
                        <label style={{marginInline:'1rem'}}>Company Turnover:</label>
                        <input type="text" name="companyTurnOver" style={{backgroundColor:'#eee'}} value={formData.companyTurnOver} onChange={handleChange} required />
                        {errors.companyTurnOver && <span className="error">{errors.companyTurnOver}</span>}
                    </div>
                </div>
                <div style={{margin:10}}>
                    <label style={{marginInline:'1rem',marginInlineStart:'-15rem'}}>Turnover Balance Sheet (PDF):</label>
                    <input type="file" name="turnoverBalanceSheet" onChange={handleChange} style={{backgroundColor:'#eee'}} accept=".pdf" required />
                    {errors.turnoverBalanceSheet && <span className="error">{errors.turnoverBalanceSheet}</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ padding: 20, marginInlineStart: '19em' }}>
                        <button type="submit" onClick={navigatepreviouspage} className='savebtn' style={{ borderColor: '#0f3c69', backgroundColor: '#0f3c69', color: 'white', borderRadius: 20, marginInline: 5 }} >Previous Page</button>
                    </div>
                    <div style={{ padding: 20 }}>
                        <button type="submit" className='savebtn' onClick={handleSubmit} style={{ borderColor: '#0f3c69', backgroundColor: '#0f3c69', color: 'white', borderRadius: 20, marginInline: 5 }} >Save & Next</button>
                    </div>
                </div>
            </form>
        </center>
    );
};

export default CompanyForm3;
