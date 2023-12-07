import React, {useState, useRef, useEffect} from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios'
import {toast} from 'react-toastify'

const ctx = document.getElementById('myChart');
const ctx1 = document.getElementById('myChart1');
const ctx2 = document.getElementById('myChart2');

const Dashboard = () => {
  const chartRef = useRef(null);
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  const [dataa, setData] = useState([])

  const fetchData = async () => {
    try {

      axios.defaults.withCredentials = true
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/dashboard`, {headers: {"Content-Type":"application/json"}})
      if(response.data.success) {
        setData(response.data.data)
      } else {
        toast(response.data.message)
      }
    } catch (error) {
      toast(error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  const cardStyle = {
    width: '20%',
    color : 'black',
    marginTop : '20px',
    borderRadius : '10px',
    marginLeft : '50px',
    height : '180px',
    padding : '10px 10px 10px 20px'
  };


  // useEffect(() => {
      const data = {
        labels: ["Associate", "Oridinary"],
      color: 'white',
      datasets: [{
        label: " ",
        data: dataa.typeOfMembershipData,
        color: 'white',
        backgroundColor: ['white', 'white'],
        borderColor: ['#0F3C69', '#0F3C69'],
        borderRadius : '20%',
        borderWidth: 1,
        barThickness: 10 ,
        maxBarThickness: 100,
        minBarLength: 3,
        borderSkipped: 'top'
      }], 
    };
    
    const data2 = {
      labels: ["Private", "Public","Co-operative","others"],
      datasets: [{
        label: [""],
        data: dataa.companyTypeData,
        color: 'white',
        backgroundColor: ['white','white' ,'white','white'],
        borderColor: ['#0F3C69', '#0F3C69', '#0F3C69', '#0F3C69'],
        borderRadius : '20%',
        borderWidth: 1,
        barThickness: 10 ,
        maxBarThickness: 100,
        minBarLength: 3,
        borderSkipped: 'top',
      }], 
    };
    
    const data1 = {
      labels: ["power electronic", "advance material", "cable", "high voltage", "magnetic material", "calibration"],
      color: 'white',
      datasets: [{
        data: dataa.labData,
        backgroundColor: ['yellow', 'aqua', 'pink', 'blue', 'green', 'purple'],
        hoverOffset: 5,
        borderWidth: 3,
        label: {
          color: 'white',
        },
      }],
    };


const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        color: '#f8f9f5', // Set the x-axis gridlines color to white
      },
      beginAtZero: true,
      title: {
        font: {
          weight: 'bold', // Set x-axis title font weight to bold
        },
      },
      ticks: {
        color: '#0f3c69',
        font: {
          weight: 'bold', // Set x-axis tick label font weight to bold
        },
      },
    },
    y: {
      grid: {
        color: '#f8f9f5', // Set the x-axis gridlines color to white
      },
      beginAtZero: true,
      title: {
        display: true,
      },
      ticks: {
        color: 'white',
        font: {
          weight: 'bold', // Set y-axis tick label font weight to bold
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem) {
          return tooltipItem.yLabel;
        }
      }
    },
    title: {
      display: false, // Hide the legend box
    },
    datalabels: {
      display: false, // Hide the legend box
      anchor: 'end',
      align: 'top',
      color: 'white',
      font: {
        weight: 'bold', // Set datalabels font weight to bold
      },
      formatter: function (value, context) {
        return value;
      },
    },
  },
};

const options2 = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        color: 'white', // Set the x-axis gridlines color to white
      },
      title: {
        color: 'white',
        font: {
          weight: 'bold', // Set x-axis title font weight to bold
        },
      },
      ticks: {
        color: '#0f3c69',
        font: {
          weight: 'bold', // Set x-axis tick label font weight to bold
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'white', // Set the x-axis gridlines color to white
      },
      title: {
        color: 'white',
        font: {
          weight: 'bold', // Set y-axis title font weight to bold
        },
      },
      ticks: {
        color: 'white',
        font: {
          weight: 'bold', // Set y-axis tick label font weight to bold
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false
    },
    datalabels: {
      anchor: 'end',
      align: 'top',
      color: 'white',
      font: {
        weight: 'bold', // Set datalabels font weight to bold
      },
      formatter: function (value, context) {
        return value;
      },
    },
  },
};


const options1 = {
  plugins: {
    legend: {
      labels: {
        color: 'white', // Set legend label color to white
      }
    },
    title: {
      font: {
        weight: 'bold', // Set title font weight to bold
      },
    },
    outlabels: {
  
    },
  },
};


if (chartRef.current) {
  const ctx = chartRef.current.getContext('2d');
  new Chart(ctx, {
    type: 'bar', 
    data: data,
    options: options,
  });
} 

if (chartRef1.current) {
  const ctx1 = chartRef1.current.getContext('2d');
  ctx1.font = 'bold 30px sans-serif';
  new Chart(ctx1, {
    type: 'doughnut', 
    data: data1,
    options: options1,
  });

 
} 

if (chartRef2.current) {
  const ctx2 = chartRef2.current.getContext('2d');
  new Chart(ctx2, {
    type: 'bar', 
    data: data2,
    options: options2,
  });

 
} 

// }, []);




  return (
    <>

    {/* <div style={{ display: 'flex', flexWrap: 'wrap',marginLeft : '100px' }}>
        <article className="card" style={{ ...cardStyle, backgroundColor: '#fff7cc' }}>
        <div style={{ display: 'flex', justifyContent: 'center',fontSize : '22px',alignItems: 'center',fontWeight :'bold',marginRight:'5px' }}>Total Membership</div>
        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginTop: '10px',fontSize : '62px',color :'#0F3C69'}}>
          5
        </p>
        <span className="top"></span>
        <span className="right"></span>
        <span className="bottom"></span>
        <span className="left"></span>
      </article>
      <article className="card" style={{ ...cardStyle, backgroundColor: '#ffe7d9' }}>
        <div style={{ display: 'flex', justifyContent: 'center',fontSize : '22px',alignItems: 'center',fontWeight :'bold',marginRight:'5px' }}>Total Membership</div>
        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginTop: '10px',fontSize : '62px',color :'#0F3C69'}}>
          5
        </p>
        <span className="top"></span>
        <span className="right"></span>
        <span className="bottom"></span>
        <span className="left"></span>
      </article>
      <article className="card" style={{ ...cardStyle, backgroundColor: '#d0f2fe' }}>
      <div style={{ display: 'flex', justifyContent: 'center',fontSize : '22px',alignItems: 'center',fontWeight :'bold',marginRight:'5px' }}>Total Membership</div>
        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginTop: '10px',fontSize : '62px',color :'#0F3C69'}}>
          5
        </p>
        <span className="top"></span>
        <span className="right"></span>
        <span className="bottom"></span>
        <span className="left"></span>
      </article>
      <article className="card" style={{ ...cardStyle, backgroundColor: '#d1e9fc' }}>
      <div style={{ display: 'flex', justifyContent: 'center',fontSize : '22px',alignItems: 'center',fontWeight :'bold',marginRight:'5px' }}>Total Membership</div>
        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginTop: '10px',fontSize : '62px',color :'#0F3C69'}}>
          5
        </p>
        <span className="top"></span>
        <span className="right"></span>
        <span className="bottom"></span>
        <span className="left"></span>
      </article>

    
    </div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
  <div style={{ marginLeft: '135px', width: '18%', paddingTop: '50px' }}>
    <canvas ref={chartRef} id="myChart" width={50} height={310}></canvas>
  </div>
  <div style={{ marginLeft: '105px', width: '18%', paddingTop: '45px' }}>
    <canvas ref={chartRef1} id="myChart1" width={50} height={310}></canvas>
  </div>
</div> */}

                
                <div class="grid" style={{marginLeft : '53.5px',background:'#f5f7f8',maxHeight:'100vh',padding:'10px 65px 59px',color :'black'}}>
                    <div class="grid grid-cols-12 gap-6">
                        <div class="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                            <div class="col-span-12 mt-8">
                                <div class="flex items-center h-9 intro-y">
                                <h2 class="mr-5 truncate text-[#0F3C69]" style={{fontWeight: 'bold',fontSize : '24px'}}>Dashboard</h2>
                                </div>
                                <div class="grid grid-cols-12 gap-6 mt-3 h-45">
                                    <a class="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-6 sm:col-span-6 xl:col-span-3 intro-y bg-white"
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
                                                    <div class="mt-3 text-3xl font-bold leading-9">{dataa?.totalMembershipsCount || 0}</div>

                                                    <div class="mt-1 text-base text-gray-600">Total Membership</div>
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
                                                    <div class="mt-3 text-3xl font-bold leading-8">{dataa?.pendingMembershipsCount || 0}</div>

                                                    <div class="mt-1 text-base text-gray-600">Pending Membership</div>
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
                                                    <div class="mt-3 text-3xl font-bold leading-8">{dataa?.approvedMembershipsCount || 0}</div>
                                                    <div class="mt-1 text-base text-gray-600">Approved Membership</div>
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
                                                    <div class="mt-3 text-3xl font-bold leading-8">{dataa?.employeeCount || 0}</div>

                                                    <div class="mt-1 text-base text-gray-600">Employee Count</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="w-96 h-80 transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg bg-white" style={{marginTop : '50px',marginLeft : '20px'}}>
                                <canvas style={{maxWidth : '500px',maxHeight:'260px',backgroundColor : '#369bf0',marginLeft : '20px',marginBottom:'100px'}} class="bg-gray-25 shadow-lg p-4 rounded-lg relative bg-clip-border mx-4 rounded-xl overflow-hidden text-white shadow-blue-500/40 shadow-lg -mt-6" ref={chartRef} id="myChart" ></canvas>
                            </div>
                            <div class="w-96 h-80 transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg bg-white" style={{marginLeft : '350px',marginTop : '50px'}}>
                                <canvas style={{maxWidth : '500px',maxHeight:'250px',backgroundColor : '#e43170',marginLeft : '20px',marginBottom:'100px'}} class ="bg-gray-25 shadow-lg p-4 rounded-lg relative bg-clip-border mx-4 rounded-xl overflow-hidden text-white shadow-blue-500/40 shadow-lg -mt-6" ref={chartRef1} id="myChart1" ></canvas>
                            </div>
                            <div class="w-96 h-80 transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg bg-white" style={{marginLeft : '680px',marginTop : '50px'}}>
                            <canvas style={{maxWidth : '500px',maxHeight:'260px',backgroundColor : '#5eb462',marginLeft : '20px',marginBottom:'100px'}} class="bg-gray-25 shadow-lg p-4 rounded-lg relative bg-clip-border mx-4 rounded-xl overflow-hidden text-white shadow-blue-500/40 shadow-lg -mt-6" ref={chartRef2} id="myChart2" ></canvas>

                            </div>


                            </div>
                            </div>
                            </div>
                            
        </>
  );
  }
export default Dashboard;
