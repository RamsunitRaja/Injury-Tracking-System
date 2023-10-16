import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ReportList = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        getReportLists(); 
    }, []);

    const getReportLists = async () => {
        let result = await fetch('http://localhost:5000/reports',{  
        });
        result = await result.json();
        setReports(result);
    }

    const deleteReport = async (id) => {
        let result = await fetch(`http://localhost:5000/deletReport/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            getReportLists();
        }
    }

    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json()
            if(result){
                setReports(result)
            }
        }else{
            getReportLists();
        }
        
    }
    const handleNameSort = async(e)=>{
        let result = await fetch(`http://localhost:5000/name-sort`);
        if(result){
            result = await result.json();
            setReports(result)
        }
        else{
            console.error("could not fetch")
        }
    }
    const handleDateSort = async(e)=>{
        let result = await fetch(`http://localhost:5000/date-sort`);
        if(result){
            result = await result.json();
            setReports(result)
        }
        else{
            console.error("could not fetch")
        }
    }
    const handleTimeSort = async(e)=>{
        let result = await fetch(`http://localhost:5000/time-sort`);
        if(result){
            result = await result.json();
            setReports(result)
        }
        else{
            console.erro("could not fetch")
        }
    }
    document.addEventListener("DOMContentLoaded", function() {
        const nameList = document.getElementById('nameId'); 
        nameList.addEventListener('click', handleNameSort);
    });

    return (
        
        <div className="report-list">
            <h3>Report List</h3>
            <input type="" className='search-report-box' placeholder='Search Report'
            onChange={searchHandle}
             />
            <ul id='listing' style={{marginBottom: "50px" , marginTop: "20px"}}>
                <li style={{position: "absolute", left: "111px", top: "230px",borderWidth: "3px", color: "white"}}>S. No.</li>
                <li title='click to sort' id='nameId' style={{position: "absolute", left: "325px", top: "230px",borderWidth: "3px",color: "white"}} onClick={handleNameSort}>Name</li>
                <li title='click to sort' id='date' style={{position: "absolute", left: "540px", top: "230px",borderWidth: "3px",color: "white"}} onClick={handleDateSort}>Date</li>
                <li title='click to sort' id='time' style={{position: "absolute", left: "750px", top: "230px",borderWidth: "3px",color: "white"}} onClick={handleTimeSort}>Time</li>
                <li title='click to sort' id='injured-area' style={{position: "absolute", left: "961px", top: "230px",borderWidth: "3px",color: "white"}} >Injured areas</li>
            </ul>
            {
                reports.length>0 ? reports.map((item, index) =>
                    <ul key={item._id} style={{marginBottom: "10px"}}>
                        <li style={{marginLeft: "50px" ,borderWidth: "3px",color: "white"}}>{index + 1}</li>
                        <li style={{marginLeft: "50px",color: "white"}}>{item.reporterName}</li>
                        <li style={{marginLeft: "50px",color: "white"}}>{item.injuryDate}</li>
                        <li style={{marginLeft: "50px",color: "white"}}>{item.injuryTime}</li>
                        <li style={{marginLeft: "50px",color: "white"}}>{item.markedAreas.map((area, i) => area.name + (i !== item.markedAreas.length - 1 ? ', ' : ''))}</li>
                        <li style={{marginLeft: "50px",color: "white"}}>
                            <button onClick={() => deleteReport(item._id)}>Delete</button>
                            <Link to={"/update/"+item._id}> Update </Link>
                            </li>

                    </ul>
                )
                :<h1>No Result Found</h1>
            }
        </div>
    )
}

export default ReportList;