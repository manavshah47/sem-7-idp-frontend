import React, { useEffect, useState } from 'react'

// axios for api calls
import axios from "axios";

// used for custom toast messages
import { toast } from 'react-toastify';

// used for navigation
import { useNavigate } from "react-router-dom";

import CircleLoader from './CircleLoader';

const MembershipTable = ({ type }) => {
  // actual data of deligences are stored in data state (array)
  const [data, setData] = useState([])

  // state to determine whether showcase loader or not
  const [loader, setLoader] = useState(false);

  // total number of pages state
  const [totalPages, setTotalPages] = useState(0);
  
  // current page state
  const [currentPage, setCurrentPage] = useState(1);

  // navigation initialization
  const navigate = useNavigate();

  // limit number of documents 
  const limit = 5;

  // set page onclick
  const selectPageHandler = (index) => {
    setCurrentPage(index);
  };

  // previous page functionality
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // next page functionality
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // fetch documents from backend
  useEffect(() => {
    fetchData();
  }, [currentPage, type]);

  // function to fetch data from backend
  const fetchData = async () => {
    // start showcase loader
    setLoader(true)

    // withCredentials for sending httpOnly cookie with request
    axios.defaults.withCredentials = true;
    // we will call diffrent api depending on type of user and user
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/membership/get-memberships?page=${currentPage}&limit=${limit}&type=${type}`);

    // successful api call response
    if(response.data.success){
      setData(response.data.data.memberships)
      setTotalPages(response.data.data.totalPages)
    } else {
      toast(response.data.message)
      setData([])
      setTotalPages(0)
    }

    // stop showcasing loader
    setLoader(false)
  }

  // function for navigation for perticular membershio and send phone number of member of membership via request
  const openMembership = (phone) => {
    navigate("/membership-status", {
      state: {phone}
    })
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [type])
  
  return (
    <>
      <div className="pt-4 flex items-center flex-col">
      <h2 className='py-4 font-bold text-3xl my-4' style={{color:"#0f3c69"}}>{type.charAt(0).toUpperCase() + type.slice(1)} Memberships</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-black" style={{margin:'0 0'}}>
              <thead className="text-xs uppercase" style={{backgroundColor: '#0f3c69', color:"white"}}>
                  <tr>
                    <th className='px-6 py-3'>SR No</th>
                    <th className='px-6 py-3'>Company Name</th>
                    <th className='px-6 py-3'>Company Type</th>
                    <th className='px-6 py-3'>Membership Type</th>
                    <th className='px-6 py-3'>Customer Id</th>
                    <th className='px-6 py-3'>Status</th>
                    <th className='px-6 py-3'>More Details</th>
                  </tr>
              </thead>
              <tbody>
                  {/* showcase loader while calling api else showcase response of api */}
                  {loader ?
                      <tr>
                        <td className='px-6 py-3' colSpan={7}>
                          <CircleLoader/>
                        </td>
                      </tr> :
                    data.map((item, index) => (
                    <tr key={item._id} className='font-semibold bg-[#e5e5e5] hover:bg-[#A9A9A9]'>
                      <td className='px-6 py-3'>{(currentPage-1)*5 + (index + 1)}</td>
                      <td className='px-6 py-3'>{item.companyName}</td>
                      <td className='px-6 py-3'>{item.companyType}</td>
                      <td className='px-6 py-3'>{item.typeOfMembership}</td>
                      <td className='px-6 py-3'>{item.member.memberId}</td>
                      <td className='px-6 py-3'>{item.membershipStatus}</td>
                      <td className='px-6 py-3'>
                        <button className='text-white bg-[#0F3C69] font-medium rounded-lg text-sm text-center px-5 py-2.5 mr-2 mb-2' type="button" onClick={() => openMembership(item.member.phone)}><b>Open</b></button>
                      </td>
                    </tr>
                  ))
                  }
              </tbody>
          </table>
      </div>
    </div>

    {/* pagination */}
    <div className="pagination-div">
        <div className='rounded py-2 bg-[#eee] text-black'>
        {currentPage !== 1 && (
          <span className="page cursor-pointer" onClick={() => prevPage()}>
            {" "}
            ◀{" "}
          </span>
        )}
        {[...Array(totalPages)].map((_, index) => {
          return (
            <span
              className={
                currentPage === index + 1 ? "page rounded cursor-pointer bg-[#0F3C69] text-white font-medium" : "page cursor-pointer"
              }
              onClick={() => selectPageHandler(index + 1)}
              key={index}
            >
              {index + 1}
            </span>
          );
        })}
        {currentPage !== totalPages && (
          <span className="page cursor-pointer" onClick={() => nextPage()}>
            {" "}
            ▶{" "}
          </span>
        )}
        </div>
      </div>
    </>    
  )
}

export default MembershipTable