import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import axios from 'axios'
import Loader from "./Loader";
import { useNavigate } from 'react-router-dom';

// used for get id of the deligence
import { useLocation } from 'react-router-dom';

import { useFormik } from 'formik'
import { membershipApprovalValidationSchema } from '../validation/employee.validation';
import { Helmet } from 'react-helmet';

import '../MembershipStatus.css'; // Import your CSS file for component-specific styles

const mapStateToProps = ({ session }) => ({
    session
})

const initialValues = {
    message: "",
    membershipStatus: ""
}



const MembershipStatus = ({ session }) => {

    // fetch membership phone number from the request
    const location = useLocation();
    
    // membership phone number
    const membershipPhoneNumber = location.state?.phone;
    
    const navigate = useNavigate();

    const [data, setData] = useState({})
    const [isChecked, setIsChecked] = useState(false);
    const [loader, setLoader] = useState(false)

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };
    
    const onsubmit = async () =>{
        if (!isChecked) {
            alert("Please check the checkbox before submitting.");
            return;
        }

        axios.defaults.withCredentials = true
        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/membership/apply-for-membership`, {}, {headers:{"Content-Type":"application/json"}})
        if(response.data.success) {
            fetchData()
        }
        toast(response.data.message)
    }

    const fetchData = async () => {
        try {
            setLoader(true)
            axios.defaults.withCredentials = true
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/membership/membership/${membershipPhoneNumber}`)
            setLoader(false)
            if(response.data.success){
                setData(response.data.data)
            } else {
                toast(response.data.message)
            }
        } catch (error){
            toast("Internal Server Error while fetching data")
        }
    }

    const { values, touched, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema:membershipApprovalValidationSchema,

        onSubmit: async (values, action) => {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/employee/approve-membership`, {...values, memberPhone: membershipPhoneNumber}, {headers: {"Content-Type":"application/json"}})
            toast(response.data.message)
            if(response.data.success){
                action.resetForm()
            }
            fetchData()
        }
    })
    
    useEffect(() => {
        setTimeout(() => {
            if (document.querySelector('script[data-payment_button_id="pl_MtBAHj7kGFAneK"]')) {
                return; // The script already exists, no need to add it again
            }
            if(data.paymentStatus == false && data.membershipStatus == "approved" && data?.member?.phone == session.phone) {
                const script = document.createElement('script');
                script.src = "https://checkout.razorpay.com/v1/payment-button.js";
                script.async = true;
                script.dataset.payment_button_id = "pl_MtBAHj7kGFAneK";
                
                // Create a form element
                const form = document.createElement('form');
                form.appendChild(script);
                
                const pmtTarget = document.getElementById("payment")
                // Append the form element to the document body
                if(pmtTarget){
                    pmtTarget.appendChild(form);
                }
            }
        }, 1500);
    }, [data]);
      

    useEffect(() => {
        fetchData();
    }, [])
    
    if(loader){
        return (
        <div style={{width : '100%', height:'100%'}}>
            <Loader/>
        </div>
        )
      }
      else{
    return (

        // {(data?.membershipStatus == "approved" && data?.member?.phone == session.phone) ? <h1 style={{backgroundColor:"#0f3c69" , padding:"10px 20px", fontWeight:"bold", width:"70%", margin:"50px auto", textAlign:'center'}}>Your membership application is Approved</h1> : }
        (data?.membershipStatus == "approved" && data?.member?.phone == session.phone) ? <h1 style={{backgroundColor:"#0f3c69" , padding:"10px 20px", fontWeight:"bold", width:"70%", margin:"50px auto", textAlign:'center'}}>Your membership application is already Approved</h1>:
        <div className='' style={{paddingLeft:"100px", height:'100vh', overflow:'scroll'}}>
            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'10px', paddingRight:'10px'}}>
                <div className="form-group width-50" >
                <div className='section2' style={{marginLeft : '15px'}}>
                    <p className='text-black bold'>Form 1</p>
                    <div style={{display : 'flex', flexDirection : 'row'}}>
                        <p className='text-black b'>Company Name :  </p>
                        <p className='text-black' style ={{marginLeft : '5px',paddingLeft : '4rem' }}> {data.companyName}</p>
                    </div>

                    <div style={{display : 'flex', flexDirection : 'row'}}>
                         <p className='text-black b'>Company Address:  </p>
                        <p className='text-black'style ={{marginLeft : '5px',paddingLeft : '3rem'}}> {data.companyAddress}</p>
                    </div>

                    <div style={{display : 'flex', flexDirection : 'row'}}>
                        <p className='text-black b'>Owner Name:  </p>
                        <p className='text-black'style ={{marginLeft : '5px',paddingLeft : '5.7rem'}}> {data.ownerName}</p>
                    </div>

            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>Company Telephone:  </p>
            <p className='text-black'style ={{marginLeft : '5px',paddingLeft : '1.7rem'}}> {data.companyTelephone}</p>
            </div>

            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>Company Phone: </p>
            <p className='text-black'style ={{marginLeft : '5px',paddingLeft : '3.9rem'}}> {data.companyPhone}</p>
            </div>


            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>Company Email: </p>
            <p className='text-black'style ={{marginLeft : '5px',paddingLeft : '4.45rem'}}> {data.companyEmail}</p>
            </div>
            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>Company Factory: </p>
            <p className='text-black'style ={{marginLeft : '5px',paddingLeft : '3.4rem'}}> {data.companyBranch}</p>
            </div>
            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>Company Branch: </p>
            <p className='text-black'style ={{marginLeft : '5px',paddingLeft : '3.6rem'}}> {data.companyFactory}</p>
            </div>

            </div>
            </div>

            <div className="form-group width-50" >
            <div className='section' style={{marginLeft : '15px'}}>
            <p className='text-black bold'>Form 2</p>

            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>Company Type : </p>
            <p className='text-black'style ={{marginLeft : '5px',paddingLeft : '11rem'}}> {data.companyType}</p>
            </div>

            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>Company Registration Year : </p>
            <p className='text-black'style ={{marginLeft : '5px',paddingLeft : '4.35rem'}}> {data.companyRegistrationYear}</p>
            </div>

            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>PAN Number : </p>
            <p className='text-black'style ={{marginLeft : '5px',paddingLeft : '11.9rem'}}> {data.panNumber}</p>
            </div>
            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>GST Number : </p>
            <p className='text-black'style ={{marginLeft : '5px',paddingLeft : '12.1rem'}}> {data.gstNumber}</p>
            </div>
            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>CIN Number : </p>
            <p className='text-black'style ={{marginLeft : '5px',paddingLeft : '12.3rem'}}> {data.cinNumber}</p>
            </div>
            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>Company Registration Type : </p>
            <p className='text-black'style ={{marginLeft : '5px',paddingLeft : '4rem'}}>{data?.companyRegistrationProofAttachment?.documentName}</p>
            </div>
            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>Company Registration Document:</p>
            <p className='text-black'>
            <div style={{paddingLeft:20, paddingBottom:28.3}}>
            <Link to={`${data.companyRegistrationProofAttachment?.file}#toolbar=0`} target="_blank" rel="noopener noreferrer"> <button type="button" className='view' style={{ borderColor: '#0f3c69', backgroundColor: '#0f3c69', color: 'white'}} >View PDf</button> </Link>
                </div>
            </p>
            </div>
            </div>
            </div>
            </div>

            <div className='section1'> 
            <p className='text-black bold'>Form 3</p>

            {
                    data.companyProducts?.map((product, index) => {
                        return (
                            <div key={index}>
                                {/* <p className='text-black' >No: {index + 1}</p> */}
                                <div style={{display : 'flex', flexDirection : 'row'}}>
                                <p className='text-black b'>Product Name : </p>
                                <p className='text-black'style ={{marginLeft : '5px',paddingLeft : '12.25rem'}}> {product.productName}</p>
                                </div>
                                <div style={{display : 'flex', flexDirection : 'row'}}>
                                <p className='text-black b'>Manufacturing Capacity : </p>
                                <p className='text-black'style ={{marginLeft : '5px',paddingLeft : '7.1rem'}}> {product.productCapacity}</p>
                                </div>
                                <div style={{display : 'flex', flexDirection : 'row'}}>
                                <p className='text-black b'>Units Manufacturing : </p>
                                <p className='text-black'style ={{marginLeft : '5px',paddingLeft : '9.0rem'}}>  {product.productUnit}</p>
                                </div>
                            </div>
                        )
                    })
                }


            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>Objective for Membership : </p>
            <p className='text-black' style ={{marginLeft : '5px',paddingLeft : '6.1rem'}}> {data.companyERDAObjective}</p>
            </div>

            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>Company Required ERDA Services :</p>
            <p className='text-black 'style ={{marginLeft : '5px',paddingLeft : '1.69rem'}}> {
                data.companyERDARequiredServices?.map((val, index) => <span key={index}>{val}</span>)
            }</p>
            </div>

            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>Type Of Membership : </p>
            <p className='text-black' style ={{marginLeft : '5px',paddingLeft : '9rem'}}> {data.typeOfMembership}</p>
            </div>

            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>Company Turnover range : </p>
            <p className='text-black'style ={{marginLeft : '5px',paddingLeft : '6.49rem'}}> {data.companyTurnOverRange}</p>
            </div>

           
               
            

            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>Turnover Sheet : </p>
            <div style={{paddingBottom:4,marginTop : 3,paddingLeft : '12.05rem'}}>
            <Link to={`${data?.turnOverBalanceSheet}#toolbar=0`} target="_blank" rel="noopener noreferrer"> <button type="button" className='view' style={{ borderColor: '#0f3c69', backgroundColor: '#0f3c69', color: 'white'}} >View PDf</button> </Link>
            </div>
            </div>

            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>Membership status : </p>
            <p className='text-black'style ={{marginLeft : '5px',paddingLeft : '9.68rem'}}>{data.membershipStatus}</p>
            </div>
            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>Membership ID : </p>
            <p className='text-black'style ={{marginLeft : '5px',paddingLeft : '11.7rem'}}>{data?.membershipId}</p>
            </div>
            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>Member ID : </p>
            <p className='text-black'style ={{marginLeft : '5px',paddingLeft : '14rem'}}>{data?.member?.memberId}</p>
            </div>

            <div id="payment" style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b' style={{marginRight:"180px"}}>Payment Status : </p>
            {data.paymentStatus === true ? <p className='text-black'  style ={{marginLeft : '5px',paddingLeft : '11.5rem'}}> Successful </p> : null }
            </div>

            </div>
            
            {/* if current user is a member of the membership application, then showcase message accordingly */}
            {
                ((data?.member?.phone == session.phone) && data.membershipStatus == "pending") && <h1 style={{backgroundColor:"#0f3c69" , padding:"10px 20px", fontWeight:"bold", width:"70%", margin:"50px auto", textAlign:'center'}}>{data?.membershipStatus == "pending" ? "Your membership application is currently in the processing stage at ERDA." : data?.approver?.message}</h1>
            }

            {
                (data?.member?.phone == session.phone && data.membershipStatus == "approved") && <h1 style={{backgroundColor:"#0f3c69" , padding:"10px 20px", fontWeight:"bold", width:"70%", margin:"50px auto", textAlign:'center'}}>Your membership application at ERDA approved Successfully.</h1>
            }

            {/* show reason for approved, rejected & reverted membership for all type of user */}
            {
                ((data?.member?.phone != session.phone) && data?.membershipStatus != "pending") ? <h1 style={{backgroundColor:"#0f3c69" , padding:"10px 20px", fontWeight:"bold", width:"70%", margin:"50px auto", textAlign:'center'}}>{data?.approver?.message}</h1> : null
            }

            {/* show this when application is under draft stage or reverted stage && member with their membership logged in */}
            {/* by submitting this from by a member, membership application will go under pending stage */}
            {((data?.membershipStatus == "draft" || data?.membershipStatus == "reverted") && data?.member?.phone == session.phone ) ? 
                <div style = {{width : '70%', margin:'20px auto', display:'flex', flexDirection:'column'}}>
                    <div style={{margin:"20px 0px", display:'flex'}}>
                        <input type="checkbox" id="Yes" name="Yes" value="Yes" checked={isChecked} onChange={handleCheckboxChange}/>
                        <label htmlFor="yes" style={{color: '#1300B3',marginLeft : 10}}>By submitting this application, I agree to abide by the terms and conditions set forth by the company and understand that my submission constitutes a legally binding affirmation of the statements made herein.</label><br/>
                    </div>
                    <div style={{margin:"auto"}}>
                        <button type="submit" className='savebtn'  style={{ borderColor: '#0f3c69', backgroundColor: '#0f3c69', color: 'white', borderRadius: 30, marginInline: 40, padding:"10px 30px" }} onClick={onsubmit} >Submit</button>
                    </div>
                </div> 
                : null
            }

            


            {/* form for approver */}
            {/* approver can only approve, reject or revert the form when form is in pending stage */}
            {/* membership status will change from pending to approved, reverted or rejected accordingly */}
            {(session.phone == data?.approver?.phone && data?.membershipStatus == "pending") ? 
            <div>
                <div style={{ display:'flex', flexDirection:"column", width:'70%', margin:"auto", color:'black' }}>
                <div style={{margin:"10px 0px"}}>
                    <label style={{ display: 'inline-block', marginRight: '10px' }}>
                        Select the Action for Membership form :
                    </label>
                    <label style={{ display: 'inline-block', marginRight: '10px' }}>
                        <input
                        type="radio"
                        name="membershipStatus"
                        id="membershipStatus"
                        value="approved"
                        onChange={handleChange}
                        checked={values.membershipStatus === "approved"}
                        style={{margin:"0 5px"}}
                        />
                        Approve
                    </label>

                    <label style={{ display: 'inline-block', marginRight: '10px' }}>
                        <input
                        type="radio"
                        name="membershipStatus"
                        id="membershipStatus"
                        value="reverted"
                        onChange={handleChange}
                        checked={values.membershipStatus === "reverted"}
                        style={{margin:"0 5px"}}
                        />
                        Revert
                    </label>

                    <label style={{ display: 'inline-block', marginRight: '10px' }}>
                        <input
                        type="radio"
                        name="membershipStatus"
                        id="membershipStatus"
                        value="rejected"
                        onChange={handleChange}
                        checked={values.membershipStatus === "rejected"}
                        style={{margin:"0 5px"}}
                        />
                        Reject
                    </label>
                </div>

                <div  style={{margin:"10px 0px"}}>
                    <label style={{ marginRight: '10px' }}>
                        Remarks <span style={{ color: 'red' }}>*</span>
                    </label>
                    <textarea name="message" id="message" value={values.message} onChange={handleChange} required  style={{ backgroundColor: '#eee', width: '25%', minHeight: '0px', borderRadius: 4 }}></textarea>
                </div>
                <div style={{margin:"auto"}}>
                <button type="submit" className='savebtn'  style={{ borderColor: '#0f3c69', backgroundColor: '#0f3c69', color: 'white', borderRadius: 30, marginInline: 40, padding:"10px 30px" }} onClick={handleSubmit} >Submit</button>
                </div>
                </div>
            </div> 
            : null
            }
        </div>
    )}
}


export default connect(
    mapStateToProps
)(MembershipStatus)
