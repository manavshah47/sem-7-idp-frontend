import React,{ useState, useRef, useEffect } from 'react';
// import ReactTooltip from 'react-tooltip';
import ActivityCalendar from 'react-activity-calendar';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

const mapStateToProps = ({ session }) => ({
  session
})

function Booking({ session }) {

  const [lab, setLab] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  // states for time availiability disable
  const [disable1, setDisable1] = useState(false)
  const [disable2, setDisable2] = useState(false)
  const [disable3, setDisable3] = useState(false)

  // state for date availiability disable
  const [ disabledDates,setDisabledDates ] = useState([])

  // activity calendar data state
  const [ data, setData ] = useState([])

  // loader for react-activity-calendar
  const [loader, setLoader] = useState(false)

  const messageRef = useRef(null)

  const [counter, setCounter] = useState(0)

  const handleLabChange = (event) => {
    setLab(event.target.value);
    setCounter(1)
    setDate('')
    setTime('')
  };


  useEffect(() => {
    if(lab != "") {
      checkDateAvailiability()
    }
  }, [lab])

  const handleDateChange = (date) => {
    setDate(date);
    setCounter(2)
    setTime('')
  };

  useEffect(() => {
    if(date != ""){
      checkTimeAvailiability()
    }
  }, [date])

  const handleTimeChange = (event) => {
    setTime(event.target.value)
    setCounter(3)
  }

  const generateTooltipText = (item) => {
    let str = item.name?.map((lab,index) => 
      `Booking for Lab: ${lab} at ${item.time[index]}\n`
    )
    // `Count: ${item.count} on ${item.date}`
    return str;
  }

  const handleBookLab = async () => {
    try {
      if(counter != 3) {
        toast("Select Correct Timing for Laboratory")
        return;
      }

      if(messageRef.current.value.length < 3) {
        toast("Enter purpose of laboratory more than 3 characters")
        return;
      }

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/lab/book-lab`, {name:lab, date, time, message:messageRef.current.value}, {headers: {"Content-Type":"application/json"}})
      toast(response.data.message)
      if(response.data.success) {
        setCounter(0)
        setLab('')
        setDate('')
        setTime('')
        fetchData()
        messageRef.current.value = ""
      }
    } catch (error) {
      toast("Internal Server Error")
    }
  }

  const checkDateAvailiability = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/lab/check-date-availiability`, {name:lab, date:new Date()}, {headers: {"Content-Type":"application/json"}})
      if(response.data.success) {
        setDisabledDates(response.data.dates)
      }
    } catch (error) {
      toast("Internal Server Error")
    }
  }
  
  const checkTimeAvailiability = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/lab/check-time-availiability`, {name:lab, date}, {headers: {"Content-Type":"application/json"}})
      if(response.data.success) {
        if(response.data.bookings.filter((book) => book.time == "8-10").length > 0){ 
          setDisable1(true)
        }
        if(response.data.bookings.filter((book) => book.time == "12-14").length > 0){ 
          setDisable2(true)
        }
        if(response.data.bookings.filter((book) => book.time == "16-18").length > 0){ 
          setDisable3(true)
        }
      }
    } catch (error) {
      toast("Internal Server Error")
    }
  }

  const fetchData = async () => {
    setLoader(true)
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/lab/member-bookings`, {headers: {"Content-Type":"application/json"}})
      if(response.data.success) {
        setData(response.data.data)
      }
    } catch (error) {
      toast("Internal Server Error")
    }
    setLoader(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const explicitTheme = {
    dark: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
    light: ['rgba(15, 60, 105, 0.1)', 'rgba(15, 60, 105, 0.3)', 'rgba(15, 60, 105, 0.5)', 'rgba(15, 60, 105, 0.8)', 'rgb(15, 60, 105)'],
  };

  const calendarItems = data.map((item, index) => (
    <div
      key={index}
      data-tip={generateTooltipText(item)}
      data-for={`tooltip-${index}`}
    >
    </div>
  ));

  if(session.isApproved == false) {
    return (
      <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', color:'black' }}>
        <p> Only Approved Members can acccess Bookings</p>
      </div>
    )
  }

  return (
    <div className='flex justify-center items-center' style={{width:"80%", flexDirection:'column', margin:'auto'}}>
      <div style={{marginLeft : '15px',marginTop:"35px", marginBottom:"15px", textTransform: "uppercase", color: "#0F3C69", fontSize:"25px"}}>
        <div style={{ textAlign:"center", justifyContent:"center", width:'100%'}}>
            <p style ={{marginLeft : '5px', textAlign:"center", justifyContent:"center", width:'60vw'}}><b> Laboratory Bookings </b></p>
        </div>
      </div>
      <div style={{ marginTop : '50px', color: 'black' }}>
      <ActivityCalendar
        theme={explicitTheme}
        blockMargin={4}
        color="#0F3C69"
        data={data}
        labels={{
            legend: {
              less: "Less",
              more: "More"
            },
            months: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ],
            totalCount: "{{count}} Bookings in {{year}}",
            weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
          }}
          showWeekdayLabels="true"
          renderBlock={(block, activity) =>
            React.cloneElement(block, {
              'data-tooltip-id': 'react-tooltip',
              'data-tooltip-html': activity.name?.reduce((acc, lab, index, str) => {
                return acc + `Lab: ${lab}, Time: ${activity.time[index]} <br>`;
              }, `${activity.count} Bookings on ${activity.date}<br>`)
            })
          }
          loading={loader}
           />
          </div>
           {calendarItems}
           <ReactTooltip id="react-tooltip" />

      <div style={{marginLeft : '15px',marginTop:"35px", marginBottom:"15px", textTransform: "uppercase", color: "#0F3C69", fontSize:"25px"}}>
        <div style={{ textAlign:"center", justifyContent:"center", width:'100%'}}>
            <p style ={{marginLeft : '5px', marginTop:"40px", textAlign:"center", justifyContent:"center", width:'60vw'}}><b> Book Laboratory </b></p>
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{ marginLeft: '0px', padding: '5px 50px 0px 0px',color :'black' }}>
      <select
        name="companyType"
        value={lab}
        onChange={handleLabChange}
        required
        style={{
          backgroundColor: '#eee',
          fontSize: '100%',
          paddingTop: 10,
          paddingBottom: 10,
          paddingRight: 38,
          paddingLeft: 15,
          marginRight: 2,
          borderRadius: 3,
          marginBottom: 2,
        }}
        >
        <option value="" disabled selected>Select LAB</option>
        <option value="power electronic">Power Electronic Lab</option>
        <option value="advance materials">Advance Materials Lab</option>
        <option value="cable">Cable Lab</option>
        <option value="high voltage">High Voltage Lab</option>
        <option value="magnetic material">Magnetic Material Lab</option>
        <option value="calibration">Calibration Lab</option>
      </select>
      </div>
        
      {/* < div style={{padding : '10px 10px 0px 530px',color : 'black'}}>
        <DatePicker selected={startDate} onChange={handleDateChange} /> */}
      <div style={{ padding: '0px 50px 0px 0px',color :'black' }}>
      {counter > 0 ? (
        <DatePicker selected={date} placeholderText={'Please select a date'} monthsShown={2} excludeDates={disabledDates} minDate={moment().toDate()} maxDate={moment().add(30, 'days').toDate()} onChange={handleDateChange} />
      ) : <div style={{width:'220px'}}></div>}
      </div>
      <div style={{ padding: '5px 0px 0px 0px',color :'black' }}>
      {counter > 1 ? (<select
        name="companyType"
        value={time}
        onChange={handleTimeChange}
        required
        style={{
          backgroundColor: '#eee',
          fontSize: '100%',
          paddingTop: 10,
          paddingBottom: 10,
          paddingRight: 90,
          paddingLeft: 20,
          marginRight: 2,
          borderRadius: 3,
          marginBottom: 2,
        }}
      >
          <option value="" disabled selected>Select Time  </option>
        <option value="8-10" disabled={disable1} >8:00-10:00</option>
        <option value="12-14" disabled={disable2}>12:00-14:00</option>
        <option value="16-18" disabled={disable3}>16:00-18:00</option>
      </select>) : <div style={{width:'207px'}}></div>}
      </div>
      
      </div>
      <div style={{ display: 'flex', width:'60%' , flexDirection: 'row', padding: '50px 0px 0px 0px',color :'black' }}>
        <div className='width-30'>
          <p className='label' style={{textAlign:'start', paddingRight: "10px"}}>Purpose: </p>
        </div>
        <div className='width-70'>
          <textarea name="purposeResearch" ref={messageRef} required style={{ backgroundColor: '#eee', width: '317%', minHeight: '20px',borderRadius : 4, color:"#0f3c69" }}/>
          {/* {errors.companyERDAObjective && <span className="error"style={{color: 'red', fontSize: '12px'}}>{errors.companyERDAObjective}</span>} */}
        </div>
      </div>
      <div style={{paddingBottom:20, paddingTop:30}}>
        <button type="submit" disabled={counter < 3} onClick={handleBookLab} className='savebtn' style={{ borderColor: '#0f3c69', backgroundColor: '#0f3c69', color: 'white', borderRadius: 5, marginInline: 80 }} >Book Laboratory</button>
      </div>
  </div>
  );
}

export default connect(
  mapStateToProps
)(Booking)
