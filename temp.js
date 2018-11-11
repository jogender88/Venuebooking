BookSchema.find({venue:req.body.venue, eventDate:req.body.date, eventStartTime:{$lte:req.body.eventStartTime}, eventEndTime:{$gte:req.body.eventEndTime}}, async function(err,data)
 {
     if(err)
     {
         console.log("error while communicating with mongo");
         bFlag = 0;
         return res.json({err:2,msg:'error while communicating with mongo'});
     }
     console.log(">>",data)
     if(data.length>0){
       bFlag = 0;
       console.log("TIME SLOT NOT AVAILABLE");
       return  res.send({err:1, msg:"TIME SLOT NOT AVAILABLE"})
     }
})
BookSchema.find({venue:req.body.venue,eventDate:req.body.date,eventStartTime:{$gte:req.body.eventStartTime}, eventEndTime:{$gte:req.body.eventEndTime}}, async function(err,data)
{
    if(err)
    {
        console.log("error while communicating with mongo");
        bFlag = 0;
        return res.json({err:2,msg:'error while communicating with mongo'});
    }
    console.log(">>",data)
    if(data.length>0){
      bFlag = 0;
      console.log("TIME SLOT NOT AVAILABLE");
      return  res.send({err:1, msg:"TIME SLOT NOT AVAILABLE"})
    }
})
BookSchema.find({venue:req.body.venue,eventDate:req.body.date,eventStartTime:{$lte:req.body.eventStartTime}, eventEndTime:{$lte:req.body.eventEndTime}}, async function(err,data)
{
   if(err)
   {
       console.log("error while communicating with mongo");
       bFlag = 0;
       return res.json({err:2,msg:'error while communicating with mongo'});
   }
   console.log(">>",data)
   if(data.length>0){
     bFlag = 0;
     console.log("TIME SLOT NOT AVAILABLE");
     return  res.send({err:1, msg:"TIME SLOT NOT AVAILABLE"})
   }
})
BookSchema.find({venue:req.body.venue,eventDate:req.body.date,eventStartTime:{$gte:req.body.eventStartTime}, eventEndTime:{$lte:req.body.eventEndTime}}, async function(err,data)
{
   if(err)
   {
       console.log("error while communicating with mongo");
       bFlag = 0;
       return res.json({err:2,msg:'error while communicating with mongo'});
   }
   console.log(">>",data)
   if(data.length>0){
     bFlag = 0;
     console.log("TIME SLOT NOT AVAILABLE");
     return  res.send({err:1, msg:"TIME SLOT NOT AVAILABLE"})
   }
})
if(bFlag == 1)
{
  const status  =  book.save(); //const status  = await book.save();
  console.log("Venue Booked Successfully");
  return res.send({err:0,msg:"Venue Booked Successfully",status: status});
}

//  console.log("find ended");
// if(bFlag == 1)
//  {
//    book.save(function(err,BookingData)
//  {
//    console.log("in book.save");
//      if(err)
//      {
//         console.log("in book.save - error");
//          res.json({err:1,msg:'can not book the venue'})
//          console.log(err);
//      }
//      if(!err){
//          console.log("in book.save - success ");
//          res.json({err:0,msg:'Booked Successfully'})
//          console.log("Success");
//      }
//  })
// }
// if(bFlag == 0)
// {
//   res.json({err:1,msg:'Room not available'})
//   console.log("Room not available");
// }
