// import React, { useEffect, useState, useRef} from 'react'

import { useLocation } from 'react-router';
import CircleLoader from './CircleLoader';

import { pdfjs, Document, Page } from 'react-pdf';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import axios from 'axios';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

const mapStateToProps = ({ session }) => ({
    session
})

const Magazine = ({ session }) => {

    const location = useLocation();
    const magazine = location.state?.magazine;

    const sendMagazine = async () => {
        axios.defaults.withCredentials = true
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/magazine/send-magazine`, {magazine}, { headers: {"Content-Type":"application/json"}})
        toast(response.data.message)
    }

    return (
        <>
        <div className='w-4/5' style={{margin:"auto"}}>
            <div style={{marginLeft : '15px',paddingTop:"25px", marginBottom:"15px", textTransform: "uppercase", color: "#0F3C69", fontSize:"25px"}}>
                    <div style={{ textAlign:"center", justifyContent:"center"}}>
                        <p style ={{marginLeft : '5px', textAlign:"center", justifyContent:"center", background:"lightgray"}}><b> "{magazine.name}" by {magazine.author}</b></p>
                    </div>
            </div>
            
            {/* <div className='PdfDiv' style={{width : '200px' , height : '2000px'}}> */}
            {/* <Document loading={<div className='flex justify-center items-center' style={{width:'100%', height:'2500px'}}> <CircleLoader/> </div>} file={magazine.file}> 
                <Page pageNumber={currentPage}/>
            </Document> */}
            {/* </div> */}
            {/* <div className='flex justify-center items-center'>
                {currentPage < magazine.page ? <div>
                    <button className='savebtn' onClick={() => {setCurrentPage(currentPage + 1)}}> + </button>
                    </div> : null}
                    {currentPage > 1 ? <div>
                        <button className='savebtn' onClick={() => {setCurrentPage(currentPage - 1)}}> - </button>
                        </div>: null}
                    </div> */}
            <div style={{marginLeft:"20px"}}>
                <iframe id='mmm' style={{width:"100%" , height:"70vh", justifyContent:"center", display:'block'}} src={`${magazine.file}#toolbar=0`} />
            </div>
        </div>

        <div>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <div className='section2' style={{boxShadow:"none"}}>
                    <div style={{display : 'flex', flexDirection : 'row', alignItems:'center'}}>
                         <p className='b' style={{marginLeft : '150px',color: "#0F3C69"}}>Magazine Description:  </p>
                        <p className='b'style ={{marginLeft : '5px', marginRight:"440px", color: "#0F3C69"}}> <b>{magazine.description}</b></p>

                        <div style={{display : 'flex', flexDirection : 'row'}}>
                            <p className='b' style={{color: "#0F3C69"}}>Magazine Price:  </p>
                            <p className='b' style ={{marginLeft : '5px',marginRight:"80px", color: "#0F3C69"}}><b>{magazine.price}</b></p>
                        </div>
                        <div style={{display : 'flex', flexDirection : 'row'}}>
                            <p className='b' style={{color: "#0F3C69"}}>No. of Pages: </p>
                            <p className='b' style ={{marginLeft : '5px', color: "#0F3C69"}}> <b>{magazine.page}</b></p>
                        </div>
                        {session.isApproved && <div className='mx-4'>
                            <button className="savebtn" onClick={sendMagazine}> GET MAGAZINE </button>
                        </div>}
                    </div>
            </div>
            </div>
            
        </div>
    </>
    )
}

export default connect(mapStateToProps)(
    Magazine
)
