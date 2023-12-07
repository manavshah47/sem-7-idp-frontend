import React, { useState, useEffect } from 'react';

import axios from 'axios'; // Import Axios

import { toast } from 'react-toastify';

import CircleLoader from './CircleLoader';
function LabTable() {
 // actual data of deligences are stored in data state (array)
 const [data, setData] = useState([])

  
 // total number of pages state
 const [totalPages, setTotalPages] = useState(0);
 
 // current page state
 const [currentPage, setCurrentPage] = useState(1);

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
 }, [currentPage]);


 const [loader, setLoader] = useState(false)

 const fetchData = async () => {
     try {
         setLoader(true)
         axios.defaults.withCredentials = true

         const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/lab/lab-bookings?page=${currentPage}&limit=${limit}`)
         console.log("res: ", response.data)
         if(response.data.success){
             setData(response.data.data.lab)
             setTotalPages(response.data.data.totalPages)
         } else {
             toast(response.data.message)
         }
         setLoader(false)

     } catch (error){
         toast("Internal Server Error while fetching data")
     }
 }

 
 useEffect(() => {
     fetchData();
 }, [])
 

 return (
     <>
     <div className="pt-4 flex items-center flex-col">
     <h2 className='py-4 font-bold text-3xl my-4' style={{color:"#0f3c69"}}>Lab Bookings</h2>
     <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
         <table className="w-full text-sm text-left text-black" style={{margin:'0 0'}}>
             <thead className="text-xs uppercase" style={{backgroundColor: '#0f3c69', color:"white"}}>
                 <tr>
                   <th className='px-6 py-3'>SR No</th>
                   <th className='px-6 py-3'>Lab Name</th>
                   <th className='px-6 py-3'>Date</th>
                   {/* <th className='px-6 py-3'>User Email</th> */}
                   <th className='px-6 py-3'>Time</th>
                   <th className='px-6 py-3'>Member Phone</th>
                   {/* <th className='px-6 py-3'>Actions</th> */}
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
                   data?.map((booking, index) => (
                   <tr key={booking._id} className='font-semibold bg-[#e5e5e5] hover:bg-[#A9A9A9]'>
                     <td className='px-6 py-3'>{(currentPage-1)*5 + (index + 1)}</td>
                     <td className='px-6 py-3'>{booking.name}</td>
                     <td className='px-6 py-3'>{booking.date}</td>
                     {/* <td className='px-6 py-3'>{user.email}</td> */}
                     <td className='px-6 py-3'>{booking.time}</td>
                     <td className='px-6 py-3 text-center'>{booking.memberPhone}</td>
                     {/* <td className='px-6 py-3'>
                       <button className='text-white bg-[#0F3C69] font-medium rounded-lg text-sm text-center px-5 py-2.5 mr-2 mb-2' type="button" onClick={() => deleteUser(user.phone)}><b>Delete</b></button>
                     </td> */}
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

export default LabTable
