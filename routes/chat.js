import express from "express";
import Thread from "../models/thread.js";


const router = express.Router();

router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "abc",
      title: "testing new thread",
    });

    const response = await thread.save(); 
    res.status(201).json(response); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to save in DB" });
  }
});


//to get all the thread
 router.get("/thread" ,async(req,res)=>{
     try{
        const threads = await Thread.find({}).sort({createdAt:-1});
        res.json(threads);
     }catch(err){
       console.error(err);
    res.status(500).json({ error: "failed to fetch thread" });
     }
     
 });

  // to get particular thread 
    router.get("thread/:threadId" , async(req,res)=>{
          const threadId = req.params;
          try{
             const thread =   await Thread.findOne({threadId});
              if(!thread){
                res.status(404).json({error: "Thread not found"})
              }

              res.json(thread);

          }catch(err){
            console.log(err)
            res.status(500).json({ error: "failed to fetch chat" });
          }
    });

    //to delete particular thread;
     router.delete("thread/:threadId" , async(req,res)=>{
          const threadId = req.params;
          try{
             const deletedthread =   await Thread.findOnebyId({threadId});
              if(!deletedthread){
                res.status(404).json({error: "Thread not found"})
              }

              res.status(200).json({success: "Thread deleted succssfully"});

          }catch(err){
            console.log(err)
            res.status(500).json({ error: "failed to delete thread" });
          }
    });

export default router;
