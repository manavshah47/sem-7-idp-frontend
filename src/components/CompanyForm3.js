import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../companyform3.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { connect } from 'react-redux'; 

import { Link } from 'react-router-dom';
import Loader from "./Loader";


const mapStateToProps = ({ session }) => ({
    session
})

let initialSubmit = false

const CompanyForm3 = ({session}) => {
    const [isDataUpdated, setIsDataUpdated] = useState(false)

    const [formData, setFormData] = useState({
        productName: '',
        productUnit: '',
        productCapacity: '',
        companyERDAObjective: '',
        companyERDARequiredServices: [],
        typeOfMembership: '',
        companyTurnOverRange: '',
        file: null,
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const navigatepreviouspage = () => {
        // 👇️ navigate to /
        navigate('/company-info-2');
    };

    const preLoadData = async () => {
        setLoader(true)
        try {
            setLoader(true)
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/membership/membership/${session.phone}`)
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
            setLoader(false)

        } catch (error) {
            toast(error.message)
        }
        setLoader(false)
    }

    useEffect(() => {
        preLoadData();
        setTimeout(() => {
            initialSubmit = true
        }, 0);
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

    const validateProductName = () => {
        let str = "";
        
        // Add validation rules here if needed
        if (!formData.productName) {
            str = "Product Name is required";
        }
        else if (formData.productName.trim().length < 5) {
            str = 'Should be 5 characters long';
        }

        if(str == ''){
            setErrors(err => {
                const { productName, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                productName:str
            }))
        }
    }

    const validateProductUnit = () => {
        let str = "";
        
        if (!formData.productUnit) {
            str = "Unit Manufactured is required";
        }
        else if (isNaN(formData.productUnit)) {
            str = "Unit Manufactured must be a number";
        }

        if(str == ''){
            setErrors(err => {
                const { productUnit, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                productUnit:str
            }))
        }
    }

    const validateProductCapacity = () => {
        let str = "";
        
        if (!formData.productCapacity) {
            str = "productCapacity is required";
        }else if (isNaN(formData.productCapacity)) {
            str = "productCapacity must be a number";
        }

        if(str == ''){
            setErrors(err => {
                const { productCapacity, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                productCapacity:str
            }))
        }
    }

    const validateCompanyERDAObjective = () => {
        let str = "";
        
        if (!formData.companyERDAObjective) {
            str = "Objective For Membership is required";
        }

        if(str == ''){
            setErrors(err => {
                const { companyERDAObjective, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                companyERDAObjective:str
            }))
        }
    }

    const validateCompanyERDARequiredServices  = () => {
        let str = "";
        
        if (formData.companyERDARequiredServices.length === 0) {
            str = "Select at least one ERDA Service";
        }

        if(str == ''){
            setErrors(err => {
                const { companyERDARequiredServices, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                companyERDARequiredServices:str
            }))
        }
    }

    const validateTypeOfMembership  = () => {
        let str = "";
        
        if (!formData.typeOfMembership) {
            str = "Select a Type of Membership";
        }

        if(str == ''){
            setErrors(err => {
                const { typeOfMembership, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                typeOfMembership:str
            }))
        }
    }

    const validateCompanyTurnOverRange  = () => {
        let str = "";
        
        if (!formData.companyTurnOverRange) {
            str = "Select a Company Turnover Range";
        }

        if(str == ''){
            setErrors(err => {
                const { companyTurnOverRange, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                companyTurnOverRange:str
            }))
        }
    }

    const validateFile  = () => {
        let str = "";
        
        if (!formData.file) {
            str = 'Turn Over Sheet is required';
        } 
        else if (!(formData.file?.type == 'application/pdf' || formData.file.includes("https://idp-sem-7.s3.us-east-1.amazonaws.com"))) {
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
    }

    useEffect(() => {
        if(initialSubmit){
            validateCompanyERDAObjective()
        }
    }, [formData.companyERDAObjective])
    
    useEffect(() => {
        if(initialSubmit){
            validateCompanyERDARequiredServices()
        }
    }, [formData.companyERDARequiredServices])
    
    useEffect(() => {
        if(initialSubmit){
            validateCompanyTurnOverRange()
        }
    }, [formData.companyTurnOverRange])
    
    useEffect(() => {
        if(initialSubmit){
            validateProductName()
        }
    }, [formData.productName])
    
    useEffect(() => {
        if(initialSubmit){
            validateProductCapacity()
        }
    }, [formData.productCapacity])
    
    useEffect(() => {
        if(initialSubmit){
            validateProductUnit()
        }
    }, [formData.productUnit])

    useEffect(() => {
        if(initialSubmit){
            validateFile()
        }
    }, [formData.file])

    useEffect(() => {
        if(initialSubmit){
            validateTypeOfMembership()
        }
    }, [formData.typeOfMembership])

    

    const [loader, setLoader] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        validateCompanyERDAObjective()
        validateCompanyERDARequiredServices()
        validateCompanyTurnOverRange()
        validateProductName()
        validateProductUnit()
        validateProductCapacity()

        let isValid = Object.keys(errors).length ===  0
    
        if (!isDataUpdated && isValid && formData.productName != "") {
            // Go to the show data page as no data is updated, and previous inserted data is correct
            navigate("/membership-status", {
                state: {phone: session.phone}
            });
            return;
        }
    
        if (isValid & formData.productName != "") {
            // Show a confirmation alert before submitting
                setLoader(true)

                let { productName, productCapacity, productUnit, companyERDARequiredServices, ...other } = formData;
                let companyProducts = JSON.stringify([
                    {
                        productName: productName,
                        productUnit: productUnit,
                        productCapacity: productCapacity,
                    },
                ]);
    
                companyERDARequiredServices = JSON.stringify(companyERDARequiredServices);
    
                axios.defaults.withCredentials = true;
    
                const response = await axios.put(
                    `${process.env.REACT_APP_BASE_URL}/membership/company-info-3`,
                    { ...other, companyProducts, companyERDARequiredServices },
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                toast(response.data.message);
                setLoader(false)

    
                if (response.data.success) {
                    navigate("/membership-status", {state: {phone:session.phone}});
                }
            
        } else {
            toast("Enter Valid Data")
        }
    };
    
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
                    <div className='width-50' style={{marginRight:'24px'}}>
                    <textarea name="companyERDAObjective" value={formData.companyERDAObjective} onChange={handleChange} required style={{ backgroundColor: '#eee', width: '112%', minHeight: '10px',borderRadius : 4, color:"#0f3c69" }}
/>
                        {errors.companyERDAObjective && <span className="error"style={{color: 'red', fontSize: '12px'}}>{errors.companyERDAObjective}</span>}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'10px', paddingRight:'10px', paddingTop:10}}>
                <div className="form-group" >
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                        <p className='label'style={{marginLeft:'50px', paddingTop:'10px'}}>ERDA Services:</p>                    
                    
                        <p className='label' style={{marginLeft:'45px', paddingTop:'5px'}}>
                            <input type="checkbox" name="companyERDARequiredServices" value="research and expert service" checked={formData.companyERDARequiredServices?.includes("research and expert service")} onChange={handleChange} style={{marginRight:'5px' }}/>R&D AND EXPERT SERVICES
                        </p>

                        <p className='label' style={{marginLeft:'45px', paddingTop:'5px'}}>
                            <input type="checkbox" name="companyERDARequiredServices" value="testing and evaluation" checked={formData.companyERDARequiredServices?.includes("testing and evaluation")} onChange={handleChange} style={{marginRight:'5px'}}/>TESTING AND EVALUATION
                        </p>

                        <p className='label'style={{marginLeft:'45px', paddingTop:'5px'}}>
                            <input type="checkbox" name="companyERDARequiredServices" value="field services" checked={formData.companyERDARequiredServices?.includes("field services")} onChange={handleChange} style={{marginRight:'5px'}}/>FEILD SERVICES
                        </p>

                        {/* <p className='label'style={{marginLeft:'45px', paddingTop:'5px'}}>
                            <input type="checkbox" name="companyERDARequiredServices" value="Option 4" checked={formData.companyERDARequiredServices?.includes("Option 4")} onChange={handleChange} style={{marginRight:'5px'}}/>
                        </p> */}
                    
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
                        {(formData != null && formData.file?.type !== 'application/pdf' && formData.file?.includes("https://idp-sem-7.s3.us-east-1.amazonaws.com")) && 
                        <Link to={`${formData.file}#toolbar=0`} target="_blank" rel="noopener noreferrer"> <button type="button" className='savebtn' style={{ borderColor: '#0f3c69', backgroundColor: '#0f3c69', color: 'white', borderRadius: 5, height:'44px', margin:'auto',marginLeft:55,marginTop:8}} >View Document</button> </Link> }
                        {errors.file && <span className="error"style={{color: 'red', fontSize: '12px'}}>{errors.file}</span>}
                    </div>
                </div>
            </div>
            <center>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ paddingLeft:20, paddingBottom:20, paddingTop:30}}>
                        <button type="submit" onClick={navigatepreviouspage} className='savebtn' style={{ borderColor: '#0f3c69', backgroundColor: '#0f3c69', color: 'white', borderRadius: 20}} >Previous Page</button>
                    </div>
                    <div style={{ paddingLeft:45, paddingBottom:20, paddingTop:30, marginInlineStart: '40em'}}>
                        <button type="submit" className='savebtn' onClick={handleSubmit} style={{ borderColor: '#0f3c69', backgroundColor: '#0f3c69', color: 'white', borderRadius: 30, marginInline: 40 }} >Submit</button>
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
)(CompanyForm3);