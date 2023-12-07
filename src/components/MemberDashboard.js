import React, {useState, useRef, useEffect} from 'react';
// import Chart from 'chart.js/auto';
import Magazines from './Magazines'
import axios from 'axios';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
// const ctx = document.getElementById('myChart');


const mapStateToProps = ({ session }) => ({
  session
})


function MemberDashboard({ session }) {

  const [dataa, setData] = useState([])

  const fetchData = async () => {
    axios.defaults.withCredentials = true
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/member/dashboard`, {headers: {"Content-Type":"application/json"}})
    if(response.data.success){
      setData(response.data.data)
    } else {
      toast(response.data)
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [])

    // const chartRef = useRef(null);
    // useEffect(() => {
    //   const data = {
    //     labels: ["M", "T", "W", "TH", "F", "Sat", "Sun"],
    //     datasets: [
    //       {
    //         label: "Overall",
    //         data: [20, 40, 30, 35, 30, 20, 10],
    //         backgroundColor: '#0F3C69',
    //         borderColor: 'white',
    //         borderWidth: 2,
    //         pointRadius: 5,
    //       },
    //       {
    //         label: "Approved",
    //         data: [10, 20, 30, 40, 10, 20, 30],
    //         backgroundColor: '#F4B393',
    //         borderColor: 'white',
    //         borderWidth: 2,
    //         pointRadius: 5,
    //       },
    //     ],
    //   };
      
    //   const options = {
    //     responsive: true,
    //     plugins: {
    //       legend: {
    //         labels: {
    //           color: 'white', // Set legend label color to white
    //         },
    //       },
    //     },
    //     scales: {
    //       x: {
    //         grid: {
    //           color: '#f8f9f5', // Set the x-axis gridlines color to white
    //         },
    //         beginAtZero: true,
    //         title: {
    //           font: {
    //             weight: 'bold', // Set x-axis title font weight to bold
    //             color: 'white', // Set x-axis title color to white
    //           },
    //         },
    //         ticks: {
    //           color: 'white', // Set x-axis tick label color to white
    //           font: {
    //             weight: 'bold', // Set x-axis tick label font weight to bold
    //           },
    //         },
    //       },
    //       y: {
    //         grid: {
    //           color: '#f8f9f5', // Set the y-axis gridlines color to white
    //         },
    //         beginAtZero: true,
    //         title: {
    //           display: true,
    //           color: 'white', // Set y-axis title color to white
    //         },
    //         ticks: {
    //           color: 'white', // Set y-axis tick label color to white
    //           font: {
    //             weight: 'bold', // Set y-axis tick label font weight to bold
    //           },
    //         },
    //       },
    //     },
    //   };
      
    //   if (chartRef.current) {
    //     const ctx = chartRef.current.getContext('2d');
    //     new Chart(ctx, {
    //       type: 'line',
    //       data: data,
    //       options: options,
    //     });
    //   }
      
    // })

  return (
    <>
    <div>
      <div class="grid" style={{marginLeft : '53.5px',background:'#f5f7f8',maxHeight:'120vh',padding:'10px 65px 59px',color:'black'}}>
                    <div class="grid grid-cols-12 gap-6">
                        <div class="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                            <div class="col-span-12">
                                <div class="flex items-center h-10 intro-y">
                                <h2 class="mr-5 truncate text-[#0F3C69]" style={{fontWeight: 'bold',fontSize : '24px'}}>Dashboard</h2>
                                </div>
                                <div class="grid grid-cols-12 gap-6">
                                    <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        href="#">
                                        <div class="p-5">
                                            <div class="flex justify-between">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-400"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                                {/* <div
                                                    class="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                    <span class="flex items-center">30%</span>
                                                </div> */}
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                    <div class="mt-3 text-xl font-bold leading-8">{dataa.membership?.membershipStatus.toUpperCase()}</div>
                                                    <div class="mt-1 text-base text-gray-600">Status</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        href="#">
                                        <div class="p-5">
                                            <div class="flex justify-between">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-yellow-400"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                                {/* <div
                                                    class="bg-red-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                    <span class="flex items-center">30%</span>
                                                </div> */}
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                    <div class="mt-3 text-xl font-bold leading-8">{session.memberId}</div>
                                                    <div class="mt-1 text-base text-gray-600">Member ID</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        href="#">
                                        <div class="p-5">
                                            <div class="flex justify-between">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-pink-600"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                                </svg>
                                                {/* <div
                                                    class="bg-yellow-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                    <span class="flex items-center">30%</span>
                                                </div> */}
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                    <div class="mt-3 text-xl font-bold leading-8">{dataa.membership?.membershipId || "--"}</div>
                                                    <div class="mt-1 text-base text-gray-600">Membership ID</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        href="#">
                                        <div class="p-5">
                                            <div class="flex justify-between">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-400"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                                </svg>
                                                {/* <div
                                                    class="bg-blue-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                    <span class="flex items-center">30%</span>
                                                </div> */}
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                    <div class="mt-3 text-xl font-bold leading-8">{dataa.bookings}</div>
                                                    <div class="mt-1 text-base text-gray-600">Booking</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                      </div>
                    
                      <div className="App" style={{padding : '10px 10px 10px 10px',marginTop : '40px'}}>
                        <div class="flex items-center h-10 intro-y">
                            <h2 class="mr-5 truncate text-[#0F3C69]" style={{fontWeight: 'bold',fontSize : '24px'}}>Magazines</h2>
                        </div>
                        <Magazines />
                      </div>
                    </div>
                    
                  </div>
    </>
  )
}

export default connect(mapStateToProps
  )(MemberDashboard)
