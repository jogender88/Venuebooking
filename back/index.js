var express=require('express');
var cors=require('cors');
var mongoose=require('mongoose');
var sha1=require('sha1');
var userSchema=require('./schema/regis');
var BookSchema = require('./schema/bookingSchema');
var bodyParser=require('body-parser');
//var exValidator = require('express-validator');
//var session = require('express-session');
var connect = require('connect');
//var MongoStore = require('connect-mongostore')(connect);
var app =express();
app.use(cors());
/*app.use(session({
  /* store: new MongoStore({
            dbPromise: connectionProvider(serverSettings.serverUrl, serverSettings.database),
            ttl:(1*60*60)  //If not logged out, session remain open in browser for 1 Hr
        }),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { path: '/', httpOnly: true, secure: false, maxAge: 300000 }
})) */
app.use(bodyParser.json());
//app.use(exValidator());

mongoose.Promise = global.Promise;
var connection = mongoose.connect('mongodb://localhost/roombooking', { useMongoClient: true });

/*app.set('trust proxy', 1) // trust first proxy

var sess;
app.get('/',function(req,res){
    sess=req.session;

    * Here we have assign the 'session' to 'sess'.
    * Now we can create any number of session variable we want.
    * in PHP we do as $_SESSION['var name'].
    * Here we do like this.

    sess.email; // equivalent to $_SESSION['email'] in PHP.
    sess.username; // equivalent to $_SESSION['username'] in PHP.
});*/
app.post("/regis",function(req,res)
{
    var data={fname:req.body.fnn,lname:req.body.lnn,email:req.body.emaill,password:sha1(req.body.passs),society:req.body.society,fcoordinator:req.body.fcoordinator};
    var regis=new userSchema(data);
    regis.save(function(err,data)
    {
        if(err)
        {
            res.json({err:1,msg:'Registration Error'})
        }
        if(!err){
          res.json({err:0,msg:'Registered Succusfully'})
          console.log("Success");
        }
    })
})
app.post("/bookings",function(req,res)
{
  var dt = new Date();
  appDate = dt.getDate();
  appMonth = dt.getMonth() ;
  appYear = dt.getYear() + 1900;
  //console.log("Date:"+appDate+"Month "+appMonth+"Year "+appYear);
  appHr = dt.getHours();
  appMin = dt.getMinutes();
  appSec = dt.getSeconds();

  applicationDate = new Date(appYear, appMonth, appDate);
  appTimeStamp = Date(String(applicationDate)+String(appHr+":"+appMin+":"+appSec));
  //console.log("application time:"  + appTimeStamp);
  //var booking = {email:$scope.myBooking.email,venue:$scope.myBooking.venue,society:$scope.myBooking.society,duration:$scope.myBooking.duration,purpose:$scope.myBooking.purpose,date:startTimeStamp[0],beginHour:hours,beginMinute:minutes,endHour:hours+parseInt($scope.myBooking.duration)}
  var BookingData={email:req.body.email,venue: req.body.venue, society: req.body.society, eventEndTime:req.body.eventEndTime,eventStartTime:req.body.eventStartTime, purpose:req.body.purpose,status:"pending", applicationTimeStamp: appTimeStamp, eventDate:req.body.date}
  console.log("BookingData: ",BookingData);
  var book = new BookSchema(BookingData);
  var bFlag = 1;
  console.log(req.body.venue,"        " ,BookingData.eventDate.toString())
  BookSchema.find({venue:BookingData.venue, date: BookingData.eventDate}, function(err, results){
    results.map((result) => {
      console.log(result)
    })
    let flag = 0;
    if ( err )
        return {err, msg: "ERROR OCCURED"};
    else if (results.length == 0)
    {
      console.log("lenght 0");
      return book.save();

    }
    else
      {
        console.log("else");
        flag = 0;
        results.map((result, i)=>{
          if (result.eventStartTime <= req.body.eventStartTime && result.eventEndTime >= req.body.eventStartTime || result.eventStartTime <= req.body.eventEndTime && result.eventEndTime >= req.body.eventEndTime || result.eventStartTime >= req.body.eventStartTime && result.eventEndTime <= req.body.eventEndTime ){
            flag = -1;
            console.log("in map: if");
          }
          else {
            console.log("in map: else");
          }
        });
        if (flag == 0){
          return book.save();
        }
        else {
          return res.json({"msg":"not saved"});
        }
        // console.log(results);
        //
        //
        // BookSchema.find({venue:req.body.venue, eventDate:req.body.date, eventStartTime:{$lte:req.body.eventStartTime}, eventEndTime:{$gte:req.body.eventEndTime}}, async function(err,data)
        //  {
        //      if(err)
        //      {
        //          console.log("error while communicating with mongo");
        //          bFlag = 0;
        //          return res.json({err:2,msg:'error while communicating with mongo'});
        //      }
        //      console.log("lte gte",data)
        //      if(data.length>0)
        //        bFlag = 0;
        // })
        // BookSchema.find({venue:req.body.venue,eventDate:req.body.date,eventStartTime:{$gte:req.body.eventStartTime, $lte:req.body.eventEndTime}}, async function(err,data)
        // {
        //     if(err)
        //     {
        //         console.log("error while communicating with mongo");
        //         bFlag = 0;
        //         return res.json({err:2,msg:'error while communicating with mongo'});
        //     }
        //     console.log("gte gte",data)
        //     if(data.length>0)
        //       bFlag = 0;
        // })
        // BookSchema.find({venue:req.body.venue,eventDate:req.body.date, eventEndTime:{$lte:req.body.eventEndTime, $gte:req.body.eventStartTime}}, async function(err,data)
        // {
        //    if(err)
        //    {
        //        console.log("error while communicating with mongo");
        //        bFlag = 0;
        //        return res.json({err:2,msg:'error while communicating with mongo'});
        //    }
        //    console.log(">>",data)
        //    if(data.length>0)
        //      bFlag = 0;
        // })
        // BookSchema.find({venue:req.body.venue,eventDate:req.body.date,eventStartTime:{$gte:req.body.eventStartTime}, eventEndTime:{$lte:req.body.eventEndTime}}, async function(err,data)
        // {
        //    if(err)
        //    {
        //        console.log("error while communicating with mongo");
        //        bFlag = 0;
        //        return res.json({err:2,msg:'error while communicating with mongo'});
        //    }
        //    console.log(">>",data)
        //    if(data.length>0)
        //      bFlag = 0;
        // })
        // if(bFlag == 1)
        // {
        //   const status  =  book.save(); //const status  = await book.save();
        //   console.log("Venue Booked Successfully");
        //   return res.send({err:0,msg:"Venue Booked Successfully",status: status});
        // }
        // if(bFlag == 0)
        // {
        //   console.log("TIME SLOT NOT AVAILABLE");
        //   return  res.send({err:1, msg:"TIME SLOT NOT AVAILABLE"})
        // }

      }
  })
})

app.post("/login",function(req,res)
{
   em=req.body.email;
   pass=sha1(req.body.pass);
   userSchema.find({email:em,password:pass},function(err,data)
   {
       if(err)
       {
          console.log("email or pass is not correct");
           return res.json({err:1,msg:'email or pass is not correct'});
       }
       if (data.length === 0)
        {
            console.log("User not found");
            return res.json({ err: 1, msg: 'email or pass is not correct' });
        }
         console.log("hhh");
   return res.json({err:0,msg:em,rol:data[0].role});

   })
})

app.post("/CheckAvailability",function(req,res)
{
  console.log("in check availability post");
  console.log("Date to be checked: "+req.body.Date);
  BookSchema.find({venue:req.body.Venue,eventDate:req.body.Date},function(err,data)
   {
       if(err)
       {
           console.log("error while communicating with mongo");
           return res.json({err:1,msg:'error while communicating with mongo'});
       }
       if (data.length === 0)
        {
            //var data={venue: req.body.venue, society: req.body.society, purpose:req.body.purpose, society:req.body.society, applicationDate: Date.now, eventDate:Date(req.body.date),eventTime:time(req.body.date)}
            console.log("All Slots available");
            return res.json({ err: 0, data:{} });
        }
          console.log("data: ", data);
   return res.json({err:0,data:data});
 })
})

app.listen(8084,function() //8086 was occupied by foodpanda
{
    console.log("my Server running on 8084")
})
