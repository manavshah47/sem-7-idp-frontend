import React, { useState } from 'react';
import axios from 'axios';
import '../companyform3.css'
import { useNavigate } from 'react-router-dom';
const CompanyForm3 = () => {
    const [formData, setFormData] = useState({
        productName: '',
        productUnit: '',
        productCapacity: '',
        companyERDAObjective: '',
        companyERDARequiredServices: 'Option 2',
        typeOfMembership: 'Associate',
        companyTurnOverRange: '',
        companyTurnOver: '',
        turnoverBalanceSheet: null,
    });

    const handleCheckboxChange = () => {

    }

    const handleRadio = () => {

    }

    const handleCheckedTurnover = () => {


    }

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
        <div className="flex" style={{justifyContent:'center', alignItems:'center', paddingTop:"100px"}}>
        <center>
            <form className="company-form" onSubmit={handleSubmit} style={{color:'black', backgroundColor:'white'}}>
            <h1 style={{margin:10, paddingTop:30, paddingBottom:10}} className='form-heading' >C. Company Details</h1>    
            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'10px', paddingRight:'50px'}}>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>Product Name:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="productName" style={{backgroundColor:'#eee'}} value={formData.productName} onChange={handleChange} required />   
                        {errors.productName && <span className="error">{errors.productName}</span>}
                    </div>
                </div>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>Unit Manufactured:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="number" name="productUnit" style={{backgroundColor:'#eee'}} value={formData.productUnit} onChange={handleChange} required />
                        {errors.productUnit && <span className="error">{errors.productUnit}</span>}
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'10px', paddingRight:'50px'}}>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>Manufacturing Capacity:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="number" name="productCapacity" style={{backgroundColor:'#eee'}} value={formData.productCapacity} onChange={handleChange} required />
                        {errors.productCapacity && <span className="error">{errors.productCapacity}</span>}
                    </div>
                </div>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>Objective For Membership:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="companyERDAObjective" style={{backgroundColor:'#eee'}} value={formData.companyERDAObjective} onChange={handleChange} required />
                        {errors.companyERDAObjective && <span className="error">{errors.companyERDAObjective}</span>}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'10px', paddingRight:'10px', paddingTop:10}}>
                <div className="form-group" >
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                        <p className='label'style={{marginLeft:'50px', paddingTop:'10px'}}>ERDA Services:</p>                    
                    
                        <p className='label' style={{marginLeft:'45px', paddingTop:'5px'}}>
                            <input type="checkbox" name="companyERDARequiredServices" value="Option 1" checked={formData.companyERDARequiredServices.includes("Option 1")} onChange={handleCheckboxChange} style={{marginRight:'5px' }}/>Option 1
                        </p>

                        <p className='label' style={{marginLeft:'45px', paddingTop:'5px'}}>
                            <input type="checkbox" name="companyERDARequiredServices" value="Option 2" checked={formData.companyERDARequiredServices.includes("Option 2")} onChange={handleCheckboxChange} style={{marginRight:'5px'}}/>Option 2
                        </p>

                        <p className='label'style={{marginLeft:'45px', paddingTop:'5px'}}>
                            <input type="checkbox" name="companyERDARequiredServices" value="Option 3" checked={formData.companyERDARequiredServices.includes("Option 3")} onChange={handleCheckboxChange} style={{marginRight:'5px'}}/>Option 3
                        </p>

                        <p className='label'style={{marginLeft:'45px', paddingTop:'5px'}}>
                            <input type="checkbox" name="companyERDARequiredServices" value="Option 4" checked={formData.companyERDARequiredServices.includes("Option 4")} onChange={handleCheckboxChange} style={{marginRight:'5px'}}/>Option 4
                        </p>
                    
                    </div>
                        {errors.companyERDARequiredServices && <span className="error">{errors.companyERDARequiredServices}</span>}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'10px', paddingRight:'10px', paddingTop:10}}>
                <div className="form-group" >
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                        <p className='label'style={{marginLeft:'50px', paddingTop:'10px'}}>Type Of Membership:</p>                    
                    
                        <label className='label' style={{marginLeft:'45px', paddingTop:'5px'}}>
                            <input type="radio" className='radio-button' name="typeOfMembership" value="Ordinary" checked={formData.typeOfMembership === "Ordinary"} onChange={handleRadio} />Ordinary
                        </label>

                        <p className='label' style={{marginLeft:'45px', paddingTop:'5px'}}>
                            <input type="radio" className='radio-button' name="typeOfMembership" value="Associate" checked={formData.typeOfMembership === "Associate"} onChange={handleRadio}/>Associate
                        </p>
                    </div>
                        {errors.typeOfMembership && <span className="error">{errors.typeOfMembership}</span>}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'10px', paddingRight:'10px', paddingTop:10}}>
                <div className="form-group" >
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                        <p className='label'style={{marginLeft:'50px', paddingTop:'15px'}}>Company Turnover Range:</p>                    
                    
                        <p className='label' style={{marginLeft:'45px', paddingTop:'10px'}}>
                            <input type="radio" className='radio-button' name="companyTurnOverRange" value="Option A" checked={formData.companyTurnOverRange.includes("Option A")} onChange={handleCheckedTurnover} style={{marginRight:'5px' }}/>Upto 5 Cr.
                        </p>

                        <p className='label' style={{marginLeft:'45px', paddingTop:'10px'}}>
                            <input type="radio" className='radio-button' name="companyTurnOverRange" value="Option B" checked={formData.companyTurnOverRange.includes("Option B")} onChange={handleCheckedTurnover} style={{marginRight:'5px'}}/>Above 5 to 50 Cr.
                        </p>

                        <p className='label'style={{marginLeft:'45px', paddingTop:'10px'}}>
                            <input type="radio" className='radio-button' name="companyTurnOverRange" value="Option C" checked={formData.companyTurnOverRange.includes("Option C")} onChange={handleCheckedTurnover} style={{marginRight:'5px'}}/>Above 50 Cr.
                        </p>
                    
                    </div>
                        {errors.companyTurnOverRange && <span className="error">{errors.companyTurnOverRange}</span>}
                </div>
            </div>

            <div style={{textAlign:'start' ,marginLeft:'60px', paddingTop:10}}>
                <div className="form-group flex width-50" >
                    <div className='width-50'>
                        <p className='label'  style={{ marginRight: 20, textAlign:'start'}}>Turnover Sheet:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="file" name="turnoverBalanceSheet" onChange={handleChange} accept=".pdf" required style={{ backgroundColor: '#eee' }} />       
                        {errors.turnoverBalanceSheet && <span className="error">{errors.turnoverBalanceSheet}</span>}                    
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

export default CompanyForm3;


                {/* <div style={{display:'flex' , flexDirection:'row'}}>
                    <div style={{margin:10}}>
                        <label style={{marginInline:'1rem', marginInlineEnd:'3rem'}}> ERDA Services:</label>
                        <input type="text" name="companyERDARequiredServices" style={{backgroundColor:'#eee'}} value={formData.companyERDARequiredServices} onChange={handleChange} required />
                        {errors.companyERDARequiredServices && <span className="error">{errors.companyERDARequiredServices}</span>}
                    </div>
                </div > */}


                {/* <div style={{margin:10}}>
                    <label style={{marginInline:'1rem', marginInlineStart:'-26rem',marginInlineEnd:'4rem'}}>Type of Membership:</label>
                    <input type="text" name="typeOfMembership" value={formData.typeOfMembership} style={{backgroundColor:'#eee'}} onChange={handleChange} required />
                    {errors.typeOfMembership && <span className="error">{errors.typeOfMembership}</span>}
                </div> */}


                {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                </div> */}
                {/* <div style={{margin:10}}>
                    <label style={{marginInline:'1rem',marginInlineStart:'-15rem'}}>Turnover Balance Sheet (PDF):</label>
                    <input type="file" name="turnoverBalanceSheet" onChange={handleChange} style={{backgroundColor:'#eee'}} accept=".pdf" required />
                    {errors.turnoverBalanceSheet && <span className="error">{errors.turnoverBalanceSheet}</span>}
                </div> */}
                
