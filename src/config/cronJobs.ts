const schedule =require('node-schedule')
import { findAncestor } from "typescript";
import { MobileUser } from "../models/modileUserModel";
import { News } from "../models/newsModel";

//time 300
export const sendNewsNotifications = async() => {
    schedule.scheduleJob('*/10 * * * * *', async()=>{
    const promises =await Promise.all([MobileUser.find({phoneOtp:"####"},{_id:0 , fcmToken:1}),
    News.find({isNotified:false,isDeleted:false},{title:1 , _id:0})])
    console.log(promises , " promises")
    // const users = 
    // const news = 
    // for(let i=0 ; i<users.length ; i++){
      
    // }
    // console.log(news)
  console.log('The answer to life, the universe, and everything!');
})
}