const express = require("express");
const path = require("path");
const mongoose = require("mongoose");


const event = require("./models/event");

const app = express();


app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-type");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
  });

  //connecting to mongoDB
mongoose.connect("mongodb+srv://weedgrill:weedgrill@cluster0.rkppv.mongodb.net/tasks?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	}
);

//useless
app.get("/", (req,res ) => {
    res.send("Hello world");
})

//get all
app.get("/api/events", async (req,res ) => {
    try{
        const events = await event.find({});

        

        
        return res.status(200).json(events);
    }
    catch (err) {
        return res.status(500).json({error: "Server error"});
    }
})

//get one
app.get("/api/events/:id", async (req,res) => {
    try{
        const target = await event.findById(req.params.id);
        
        if (!target){
            
            throw new Error("No event found");
        }
       
        res.status(200).json(target);
    }
    catch(err){
        
        if (err.name === "CastError" || err.name === "Error") {
            return res.status(404).json({error: "No event with that id found"});
        }
        else{
            return res.status(500).json({error: "Server error"});
        }
    }
   
})


//delete
app.delete("/api/events/:id", async (req,res) => {
    try{



        const target = await event.findById(req.params.id);


        if (!target){
           throw  new Error("No event found");
           
        }
        else{
            await target.remove();

            
            
            return res.status(200).json({
                message: "Successfully removed"
            });
        }

    }
    catch (err) {
        if (err.name === "CastError" || err.name === "Error") {
            return res.status(404).json({error: "No event with that id found"});
        }
        else{
            return res.status(500).json({
                error: "Server error"
            })
        }
    }
})


//create
app.post("/api/events", async (req,res) => {
    try{
        const newEvent = req.body;
        

        const response = await event.create(newEvent);

        
        return res.status(201).json(newEvent);
    }
    catch(err) {
        if (err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map( (val => {return val.message}));
            
            return res.status(400).json({
                success: "false",
                error: messages
            });
        }
        else{
            return res.status(500).json({
                success: false,
                error: "Server error"
            });
        }
    }
});

//update
app.put( "/api/events/:id", async (req,res) => {
    try{

        const target = await event.findById(req.params.id);
       
        const newEvent = req.body;

        

        if (!target){
            throw  new Error("No event found");
        }
        else{
            const check = await event.validate(newEvent)
            
            await event.updateOne(target, newEvent);


            
            return res.status(200).json(newEvent);
        }
    }
    catch (err){
        if (err.name === "CastError" || err.name === "Error") {
            return res.status(404).json({error: "No event with that id found"});
        }
        else if (err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map( (val => {return val.message}));
            
            return res.status(400).json({
                success: "false",
                error: messages
            });
        }
        else{
            return res.status(500).json({
                success: false,
                error: "Server error"
            });
        }
    }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});