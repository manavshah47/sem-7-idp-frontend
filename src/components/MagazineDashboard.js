import React, {useState, useRef, useEffect} from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { toast } from 'react-toastify';

const ctx = document.getElementById('myChart');


function MagazineDashboard() {
    const [ dataa, setData ] = useState([])

    const fetchData = async () => {
      axios.defaults.withCredentials = true
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/member/magazine-manager-dashboard`, { headers: {"Content-Type":"application/json"}})
      console.log("resp: ", response.data)
      if(response.data.success) {
        setData(response.data.data)
      } else {
        toast(response.data.message)
      }
    }
  
    useEffect(() => {
      fetchData();
    }, [])
  
    const chartRef = useRef(null);
  
      // useEffect(() => {
        const data = {
          labels: ["M", "T", "W", "TH", "F", "Sat", "Sun"],
          datasets: [
            {
              label: "Total",
              data: [2, 4, 0, 1, 3, 2, 0],
              backgroundColor: '#0F3C69',
              borderColor: 'white',
              borderWidth: 2,
              pointRadius: 5,
            }
          ],
        };
        
        const options = {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: '#f8f9f5', // Set the x-axis gridlines color to white
              },
              beginAtZero: true,
              title: {
                font: {
                  weight: 'bold', // Set x-axis title font weight to bold
                  color: 'white', // Set x-axis title color to white
                },
              },
              ticks: {
                color: 'white', // Set x-axis tick label color to white
                font: {
                  weight: 'bold', // Set x-axis tick label font weight to bold
                },
              },
            },
            y: {
              grid: {
                color: '#f8f9f5', // Set the y-axis gridlines color to white
              },
              beginAtZero: true,
              title: {
                display: true,
                color: 'white', // Set y-axis title color to white
              },
              ticks: {
                color: 'white', // Set y-axis tick label color to white
                font: {
                  weight: 'bold', // Set y-axis tick label font weight to bold
                },
              },
            },
          },
        };
        
        if (chartRef.current) {
          const ctx = chartRef.current.getContext('2d');
          new Chart(ctx, {
            type: 'line',
            data: data,
            options: options,
          });
        }
        
      // })
  
    return (
      <>
      <div>
        <div class="grid" style={{marginLeft : '53.5px',background:'#f5f7f8',height:'100vh',padding:'10px 65px 59px', color:'black'}}>
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
                                                  <div class="mt-3 text-3xl font-bold leading-8">{dataa.totalMagazines || "--"}</div>
                                                      <div class="mt-1 text-base text-gray-600">Total Magazine Count</div>
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
  
                                                      <div class="mt-3 text-3xl font-bold leading-8">{dataa.previousMagazines || "--"}</div>
                                                      <div class="mt-1 text-base text-gray-600">Previous Magazine Count</div>
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
                                                  <div class="mt-3 text-3xl font-bold leading-8">{dataa.upcomingMagazines || "--"}</div>
                                                      <div class="mt-1 text-base text-gray-600">Scheduled Magazine Count</div>
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
                                                  <div class="mt-3 text-xl font-bold leading-8">MAGAZINE MANAGER</div>
                                                      <div class="mt-1 text-base text-gray-600">Type Of Employee</div>
                                                  </div>
                                              </div>
                                          </div>
                                      </a>
                                  </div>
                              </div>
                                  <canvas style={{maxWidth : '740px',maxHeight:'330px',backgroundColor : '#369bf0',marginLeft : '1px',marginTop : '40px',padding : '15px 15px 15px 15px',borderColor : '2px solid black'}} class="bg-gray-25 shadow-lg rounded-lg rounded-xl overflow-hidden text-white shadow-blue-500/40 shadow-lg" ref={chartRef} id="myChart" ></canvas>
                                  <div style={{ width: '550px', height: '329px', marginLeft: '683px', marginTop: '41.1px', backgroundColor: 'white', borderRadius: '10px', color: 'black', overflow: 'auto', position: 'relative' }} class="bg-gray-25 shadow-lg rounded-lg rounded-xl text-white shadow-white-500/40 shadow-lg">
                                  <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'black', marginTop: '15px', position: 'sticky', top: '0',  backgroundColor: 'white', borderBottom: '1px solid black',fontWeight : 'bold',color : '#0F3C69' }}>All Magazines</h2>
                                  <div style={{ overflowX: 'auto', overflowY: 'scroll', maxHeight: 'calc(100% - 70px)',color : '#0F3C69' ,marginTop:'10px'}}>
                                 <table style={{ marginLeft: '10px',marginRight : '10px', marginBottom : '15px',width: '96%', borderCollapse: 'collapse' }}>
                                    <thead>
                                      <tr>
                                        <th style={{ borderBottom: '1px solid black', borderRight: '1px solid black', textAlign: 'center', padding: '4px' }}>Sr No.</th>
                                        <th style={{ borderBottom: '1px solid black', textAlign: 'center', padding: '4px'}}>Magazine Name</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                        {dataa.magazines?.map((m, index) => {
                                          return (
                                            <tr>
                                              <td style={{ borderBottom: '1px solid black', borderRight: '1px solid black', textAlign: 'center', padding: '4px' }}>{index + 1}</td>
                                              <td style={{ borderBottom: '1px solid black', textAlign: 'center', padding: '4px' }}>{m.name}</td>
                                            </tr>
                                          )
                                        }) 
                                        }
                                    </tbody>
                                  </table>
                                </div>
                                </div>
                                  {/* <div style={{ width: '250px', height: '327.5px', marginLeft: '873px', marginTop: '41.1px', backgroundColor: 'white',borderRadius : '5px' }} class="bg-gray-25 shadow-lg rounded-lg rounded-xl text-white shadow-white-500/40 shadow-lg"></div> */}
                              </div>
                        </div>
                      </div>
                    </div>
  
      </>
    )
  
}

export default MagazineDashboard
