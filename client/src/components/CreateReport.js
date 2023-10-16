import React,{useState} from 'react'
import BodyMap from '../BodyMap';
import '../App.css';
const Report = () => {
    const [reports, setReports] = useState([]);
    const [reporterName, setReporterName] = useState('');
    const [injuryDate, setInjuryDate] = useState('');
    const [injuryTime, setInjuryTime] = useState('');
    const [markedAreas, setMarkedAreas] = useState([]);

    const addReport = async () => {
      const newReport = {
        reporterName,
        injuryDate,
        injuryTime,
        markedAreas,
      };
      // const userId = JSON.parse(localStorage.getItem('user'))._id;
      JSON.stringify(injuryTime)
      if(reporterName && injuryDate && injuryTime && markedAreas){
         setReports([...reports, newReport]);
      let result = await fetch("http://localhost:5000/createReport", {
          method: "post",
          body: JSON.stringify({reporterName,injuryDate,injuryTime,markedAreas}),
          headers: {
              "Content-type": "application/json"
          }
      });
      // result = await result.json();
      setReports('');
      setReporterName('');
      setInjuryDate('');
      setInjuryTime('');
      setMarkedAreas([]);
      alert("your report has been submitted successfully")
    }
    else{
      alert("please fill all the fields")
    }
    };
  
    return (
      <div className='report'>
        <h1 style={{marginLeft: "100px"}}>Injury Reports</h1>
        <div>
          <label style={{marginLeft: "100px"}}>Name of Reporter: </label>
          <input
            type="text"
            value={reporterName}
            onChange={(e) => setReporterName(e.target.value)}
          />
        </div>
        <div>
          <label style={{marginLeft: "100px"}}>Date of Injury: </label>
          <input style={{marginLeft:"30px"}}
            type="date"
            id="datePicker" 
            placeholder='enter date'
            value={injuryDate}
            onChange={(e) => setInjuryDate(e.target.value)}
          />
          <br/>
          <label style={{marginLeft: "100px"}}>Time of Injury: </label>
          <input style={{marginLeft:"30px"}}
            type="time"
            id="time" 
            placeholder='enter time'
            value={injuryTime}
            onChange={(e) => setInjuryTime(e.target.value)}
          />
        </div>

        <BodyMap markedAreas={markedAreas} setMarkedAreas={setMarkedAreas} />


        <button style={{marginLeft: "100px"}} onClick={addReport}>Add Injury Report</button>

      </div>
    );
}

export default Report



       
