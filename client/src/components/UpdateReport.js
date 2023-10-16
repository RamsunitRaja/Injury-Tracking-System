import React, { useEffect,useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import BodyMap from '../BodyMap';

const UpdateReport = () => {
    const [reporterName, setReporterName] = useState('');
    const [injuryDate, setInjuryDate] = useState('');
    const [injuryTime, setInjuryTime] = useState('');
    const [markedAreas, setMarkedAreas] = useState([]);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/reports/${params.id}`);
        result = await result.json();
        setReporterName(result.reporterName);
        setInjuryDate(result.injuryDate);
        setInjuryTime(result.injuryTime);
    }

    const updateProduct = async () => {
        let result = await fetch(`http://localhost:5000/update/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ reporterName,injuryDate,injuryTime,markedAreas}),
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        result = await result.json();
        if (result) {
            navigate('/')
        }

    }

    return (
        <div className='report'>
            <h1>Update Report</h1>
            <label style={{marginLeft: "100px"}}>Name of Reporter: </label>
            <input
              type="text"
              value={reporterName}
              onChange={(e) => setReporterName(e.target.value)}
            />
            <br/>
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
            /> <br/>
            <BodyMap markedAreas={markedAreas} setMarkedAreas={setMarkedAreas} /> <br/>
            <button style={{marginLeft: "100px"}} onClick={updateProduct} className='appButton'>Update Product</button>
        </div>
    )
}

export default UpdateReport;