import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { pdfjs, Document, Page } from 'react-pdf';
import CircleLoader from './CircleLoader';

import { useNavigate } from 'react-router';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

const Magazines = () => {
    const navigate = useNavigate();


    const [data, setData] = useState([])

    const fetchData = async () => {
        axios.defaults.withCredentials = true
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/magazine/get-magazines`)
        if(response.data.success) {
            setData(response.data.data)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])


    const openMagazine = (magazine) => {
        navigate("/magazine", {
            state: {magazine}
        })
    }


  return (
    
    <div className='' style={{margin:"auto" }}>
    <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel" style={{maxWidth : '100%', overflow:'hidden', margin : 'auto'}}>
            <div className="carousel-inner">
                {data?.map((magazine, index) => {
                    return (
                        <div className={index == 0 ? `carousel-item active`: `carousel-item`}  style={{cursor:'pointer',borderRight:'4px solid #0f3c69'}} data-bs-interval="4000" onClick={() => openMagazine(magazine)} >
                            {/* <div style={{cursor:'pointer', width:"300px", height:"300px", padding:'10px', backgroundColor:'blue'}}> */}
                                <Document loading={<div className='flex justify-center items-center' style={{width:'100%', height:'100%'}}> <div style={{width:'300px', height:'300px', display:'flex', justifyContent:'center', alignItems:'center'}} > <CircleLoader/> </div> </div>} file={magazine.file}>
                                    <Page pageNumber={1} />
                                </Document>
                            {/* </div> */}
                            <div style={{flexDirection:"row"}}>
                            <p className='text-center' style={{color:'#0f3c69', zIndex:99, background:"white"}}><b>Magazine Name:  {magazine.name}</b></p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span style={{color:'#0f3c69'}}><b>Previous</b></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span style={{color:'#0f3c69'}}><b>Next</b></span>
            </button>
        </div>
    </div>
  )
}

export default Magazines
