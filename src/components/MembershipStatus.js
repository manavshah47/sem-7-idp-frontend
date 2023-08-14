import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { connect } from 'react-redux'

import axios from 'axios'

const mapStateToProps = ({ session }) => ({
    session
})


const MembershipStatus = ({ session }) => {
    const [data, setData] = useState({})

    const fetchData = async () => {
        try {
            axios.defaults.withCredentials = true

            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/membership/membership/${session.memberId}`)

            if(response.data.success){
                setData(response.data.data)
            } else {
                toast(response.data.message)
            }


        } catch (error){
            console.log(error)
            toast("Internal Server Error while fetching data")
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='' style={{paddingLeft:"100px"}}>
            <p className='text-black'>Form 1</p>
            <p className='text-black'>Company Name: {data.companyName}</p>
            <p className='text-black'>Company Address: {data.companyAddress}</p>
            <p className='text-black'>owner Name: {data.ownerName}</p>
            <p className='text-black'>Company Telephone: {data.companyTelephone}</p>
            <p className='text-black'>Company Phone: {data.companyPhone}</p>
            <p className='text-black'>Company Email: {data.companyEmail}</p>
            <p className='text-black'>Company Factory: {data.companyBranch}</p>
            <p className='text-black'>Company Branch: {data.companyFactory}</p>
            <p>.</p>
            <p className='text-black'>Membership form Status: {data.membershipFormStatus}</p>
            <p className='text-black'>Payment Status: {data.paymentStatus ? "TRUE" : "FALSE"}</p>
            <p>.</p>
            <p className='text-black'>Form 2</p>
            <p className='text-black'>Payment Status: {data.companyType}</p>
            <p className='text-black'>Payment Status: {data.companyRegistrationYear}</p>
            <p className='text-black'>Payment Status: {data.panNumber}</p>
            <p className='text-black'>Payment Status: {data.gstNumber}</p>
            <p className='text-black'>Payment Status: {data.cinNumber}</p>
            <p className='text-black'>Payment Status: {data?.companyRegistrationProofAttachment?.documentName}</p>
            {data.companyRegistrationProofAttachment && <embed src={data.companyRegistrationProofAttachment.file} width="100%" height="100%" />}
            <p>.</p>
            <p className='text-black'>Form 3</p>
            <p className='text-black'>Payment Status: {data.companyType}</p>
            <p className='text-black'>Payment Status: {data.typeOfMembership}</p>
            <p className='text-black'>Payment Status: {data.companyTurnOverRange}</p>

            <p className='text-black'>Company Required ERDA Services: {
                data.companyERDARequiredServices?.map((val, index) => <span key={index}>{val}</span>)
            }</p>
            
            <p className='text-black'>Company Products: 
                {
                    data.companyProducts?.map((product, index) => {
                        return (
                            <div key={index}>
                                <p className='text-black'>No: {index + 1}</p>
                                <p className='text-black'>Name: {product.productName}</p>
                                <p className='text-black'>Capacity: {product.produtCapacity}</p>
                                <p className='text-black'>Unit: {product.productUnit}</p>
                            </div>
                        )
                    })
                }
            </p>

            <p className='text-black'>Payment Status: {data.cinNumber}</p>
            {data.turnOverBalanceSheet && <embed src={data.turnOverBalanceSheet} width="100%" height="100%" />}
        </div>
    )
}

export default connect(
    mapStateToProps
)(MembershipStatus)
