const express=require("express");
const cors = require("cors");
require("./db/config");
const report = require("./db/Report");

const app=express();

app.use(express.json());
app.use(cors());


app.get("/reports", async (req, resp) => {
    const reports = await report.find();
    if (reports.length > 0) {
        resp.send(reports)
    } else {
        resp.send({ result: "No reports found" })
    }
});

app.post("/createReport",async (req,resp)=>{
    let Report= new report(req.body);
    let result= await Report.save();
    result = result.toObject();
    delete result.password; //do not send password to frontend
    resp.send(result);
})




app.delete("/deletReport/:id",async (req,resp)=>{
   let ID = req.params.id;
   const deletedReport = await report.findByIdAndDelete(ID);
   if(deletedReport){
    console.log("ok")
   }
   const reports = await report.find();
   resp.send(reports);

})


app.put("/update/:id", async (req, resp) => {
    let result = await report.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});


app.get("/reports/:id", async(req,resp)=>{
    let result = await report.findOne({_id:req.params.id})
    if(result){
        resp.send(result);
    } else{
        resp.send({result:"no record found "})
    }
})


app.get("/search/:key", async (req, resp) => {
    let result = await report.find({
        "$or": [
            {
                reporterName: { $regex: req.params.key }  
            },
            {
                injuryDate: { $regex: req.params.key }
            },
            {
                injuryTime: { $regex: req.params.key }
            },
            {
                // markedAreas: { $regex: req.params.key }
            },
            
        ]
    });
    resp.send(result);
})




app.get('/name-sort', async (req, res) => {
    try {
        const collation = { locale: 'en', strength: 2 };
        const sortedReports = await report.find().collation(collation).sort({reporterName: 1});
        res.json(sortedReports);
    } catch (error) {
        console.error('Error retrieving and sorting reports: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/date-sort', async (req, res) => {
    try {
        const collation = { locale: 'en', strength: 2 };
        const sortedReports = await report.find().collation(collation).sort({injuryDate: 1});
        res.json(sortedReports);
    } catch (error) {
        console.error('Error retrieving and sorting reports: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/time-sort', async (req, res) => {
    try {
        const collation = { locale: 'en', strength: 2 };
        const sortedReports = await report.find().collation(collation).sort({injuryTime: 1});
        res.json(sortedReports);
    } catch (error) {
        console.error('Error retrieving and sorting reports: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.listen(5000);

