import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../companyform3.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { connect } from 'react-redux'; 

import { Link } from 'react-router-dom';

const mapStateToProps = ({ session }) => ({
    session
})

const CompanyForm3 = ({session}) => {
    const [isDataUpdated, setIsDataUpdated] = useState(false)

    const [formData, setFormData] = useState({
        productName: '',
        productUnit: '',
        productCapacity: '',
        companyERDAObjective: '',
        companyERDARequiredServices: [],
        typeOfMembership: 'Ordinary',
        companyTurnOverRange: 'upto 5 cr',
        file: null,
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const navigatepreviouspage = () => {
        // 👇️ navigate to /
        navigate('/company-info-2');
    };

    const preLoadData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/membership/membership/${session.memberId}`)

            console.log(response.data)

            if(response.data.success){
                let temp = response.data.data
                setFormData({
                    productName: temp?.companyProducts[0]?.productName,
                    productUnit: temp?.companyProducts[0]?.productUnit,
                    productCapacity: temp?.companyProducts[0]?.productCapacity,
                    companyERDAObjective: temp.companyERDAObjective,
                    companyERDARequiredServices: temp?.companyERDARequiredServices,
                    typeOfMembership: temp.typeOfMembership,
                    companyTurnOverRange: temp.companyTurnOverRange,
                    file: temp.turnOverBalanceSheet
                })

            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        preLoadData();
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
        } else if (type === "checkbox") {
            let arr = formData.companyERDARequiredServices
            if(arr.includes(value)){
                arr = arr.filter(data => data !== value)
            } else {
                arr = [...arr, value]
            }
            setFormData((prevData) => ({
                ...prevData,
                [name]: arr,
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
        if (!formData.productName) {
            newErrors.productName = "Product Name is required";
        }
        else if (formData.productName.trim().length < 5) {
            newErrors.productName = 'Should be 5 characters long';
        }
    
        if (!formData.productUnit) {
            newErrors.productUnit = "Unit Manufactured is required";
        }
        else if (isNaN(formData.productUnit)) {
            newErrors.productUnit = "Unit Manufactured must be a number";
        }
    
        if (!formData.productCapacity) {
            newErrors.productCapacity = "productCapacity is required";
        }else if (isNaN(formData.productCapacity)) {
            newErrors.productCapacity = "productCapacity must be a number";
        }
    
        if (!formData.companyERDAObjective) {
            newErrors.companyERDAObjective = "Objective For Membership is required";
        }
    
        if (formData.companyERDARequiredServices.length === 0) {
            newErrors.companyERDARequiredServices = "Select at least one ERDA Service";
        }
    
        if (!formData.typeOfMembership) {
            newErrors.typeOfMembership = "Select a Type of Membership";
        }
    
        if (!formData.companyTurnOverRange) {
            newErrors.companyTurnOverRange = "Select a Company Turnover Range";
        }

        if (!formData.file) {
            newErrors.file = 'Turn Over Sheet is required';
        } 
        else if (!(formData.file?.type == 'application/pdf' || formData.file.includes("https://idp-sem-7.s3.us-east-1.amazonaws.com"))) {
            newErrors.file = 'File must be in PDF format.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        console.log(errors)
    }, [errors])
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const isValid = validateForm();

        if(!isDataUpdated && isValid){
            // go to show data page as no data is updated and previous inserted data is correct
            // no updation condition
            navigate("/membership-status")
            return;
        }
        
        
        let { productName, productCapacity, productUnit, companyERDARequiredServices, ...other } = formData
        
        let companyProducts = JSON.stringify([{
            productName:productName,
            productUnit:productUnit,
            productCapacity:productCapacity
        }])

        companyERDARequiredServices = JSON.stringify(companyERDARequiredServices)

        if (isValid) {

            axios.defaults.withCredentials = true
            
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/membership/company-info-3`, { ...other, companyProducts, companyERDARequiredServices }, {headers:{"Content-Type":"multipart/form-data"}})
            toast(response.data.message)

            if(response.data.success){
                navigate("/membership-status")
            }
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
                        {errors.productName && <span className="error" style={{color: 'red', fontSize: '12px'}}>{errors.productName}</span>}
                    </div>
                </div>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>Unit Manufactured:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="number" name="productUnit" style={{backgroundColor:'#eee'}} value={formData.productUnit} onChange={handleChange} required />
                        {errors.productUnit && <span className="error"style={{color: 'red', fontSize: '12px'}}>{errors.productUnit}</span>}
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
                        {errors.productCapacity && <span className="error"style={{color: 'red', fontSize: '12px'}}>{errors.productCapacity}</span>}
                    </div>
                </div>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>Objective For Membership:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="companyERDAObjective" style={{backgroundColor:'#eee'}} value={formData.companyERDAObjective} onChange={handleChange} required />
                        {errors.companyERDAObjective && <span className="error"style={{color: 'red', fontSize: '12px'}}>{errors.companyERDAObjective}</span>}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'10px', paddingRight:'10px', paddingTop:10}}>
                <div className="form-group" >
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                        <p className='label'style={{marginLeft:'50px', paddingTop:'10px'}}>ERDA Services:</p>                    
                    
                        <p className='label' style={{marginLeft:'45px', paddingTop:'5px'}}>
                            <input type="checkbox" name="companyERDARequiredServices" value="Option 1" checked={formData.companyERDARequiredServices?.includes("Option 1")} onChange={handleChange} style={{marginRight:'5px' }}/>Option 1
                        </p>

                        <p className='label' style={{marginLeft:'45px', paddingTop:'5px'}}>
                            <input type="checkbox" name="companyERDARequiredServices" value="Option 2" checked={formData.companyERDARequiredServices?.includes("Option 2")} onChange={handleChange} style={{marginRight:'5px'}}/>Option 2
                        </p>

                        <p className='label'style={{marginLeft:'45px', paddingTop:'5px'}}>
                            <input type="checkbox" name="companyERDARequiredServices" value="Option 3" checked={formData.companyERDARequiredServices?.includes("Option 3")} onChange={handleChange} style={{marginRight:'5px'}}/>Option 3
                        </p>

                        <p className='label'style={{marginLeft:'45px', paddingTop:'5px'}}>
                            <input type="checkbox" name="companyERDARequiredServices" value="Option 4" checked={formData.companyERDARequiredServices?.includes("Option 4")} onChange={handleChange} style={{marginRight:'5px'}}/>Option 4
                        </p>
                    
                    </div>
                        {errors.companyERDARequiredServices && <span className="error"style={{color: 'red', fontSize: '12px'}}>{errors.companyERDARequiredServices}</span>}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'10px', paddingRight:'10px', paddingTop:10}}>
                <div className="form-group" >
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                        <p className='label'style={{marginLeft:'50px', paddingTop:'10px'}}>Type Of Membership:</p>                    
                    
                        <label className='label' style={{marginLeft:'45px', paddingTop:'5px'}}>
                            <input type="radio" className='radio-button' name="typeOfMembership" value="Ordinary" checked={formData.typeOfMembership === "Ordinary"} onChange={handleChange} />Ordinary
                        </label>

                        <p className='label' style={{marginLeft:'45px', paddingTop:'5px'}}>
                            <input type="radio" className='radio-button' name="typeOfMembership" value="Associate" checked={formData.typeOfMembership === "Associate"} onChange={handleChange}/>Associate
                        </p>
                    </div>
                        {errors.typeOfMembership && <span className="error"style={{color: 'red', fontSize: '12px'}}>{errors.typeOfMembership}</span>}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'10px', paddingRight:'10px', paddingTop:10}}>
                <div className="form-group" >
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                        <p className='label'style={{marginLeft:'50px', paddingTop:'15px'}}>Company Turnover Range:</p>
                    
                        <p className='label' style={{marginLeft:'45px', paddingTop:'10px'}}>
                            <input type="radio" className='radio-button' name="companyTurnOverRange" value="upto 5 cr" checked={formData.companyTurnOverRange?.includes("upto 5 cr")} onChange={handleChange} style={{marginRight:'5px' }}/>Upto 5 Cr.
                        </p>

                        <p className='label' style={{marginLeft:'45px', paddingTop:'10px'}}>
                            <input type="radio" className='radio-button' name="companyTurnOverRange" value="above 5 to 50 cr" checked={formData.companyTurnOverRange?.includes("above 5 to 50 cr")} onChange={handleChange} style={{marginRight:'5px'}}/>Above 5 to 50 Cr.
                        </p>

                        <p className='label'style={{marginLeft:'45px', paddingTop:'10px'}}>
                            <input type="radio" className='radio-button' name="companyTurnOverRange" value="above 50 cr" checked={formData.companyTurnOverRange?.includes("above 50 cr")} onChange={handleChange} style={{marginRight:'5px'}}/>Above 50 Cr.
                        </p>
                    
                    </div>
                        {errors.companyTurnOverRange && <span className="error"style={{color: 'red', fontSize: '12px'}}>{errors.companyTurnOverRange}</span>}
                </div>
            </div>

            <div style={{textAlign:'start' ,marginLeft:'60px', paddingTop:10}}>
                <div className="form-group flex" style={{alignItems:'center'}}>
                    <div className=''>
                        <p className='label'  style={{ marginRight: 20, textAlign:'start'}}>Turnover Sheet:</p>
                    </div>
                    <div className='' style={{marginLeft:'10px'}}>
                        <input type="file" name="file" onChange={handleChange} accept=".pdf" required style={{ backgroundColor: '#eee' }} />
                        {formData.file?.includes("https://idp-sem-7.s3.us-east-1.amazonaws.com") && <Link to={formData.file} style={{margin:"auto"}} target="_blank" rel="noopener noreferrer"> <button type="button" className='savebtn' style={{ borderColor: '#0f3c69', backgroundColor: '#0f3c69', color: 'white', borderRadius: 5, height:'45px', margin:'auto'}} >View Document</button> </Link> }
                        {errors.file && <span className="error"style={{color: 'red', fontSize: '12px'}}>{errors.file}</span>}
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
)(CompanyForm3);