const schedule =require('node-schedule')
import { findAncestor } from "typescript";
import { MobileUser } from "../models/modileUserModel";
import { News } from "../models/newsModel";
import { db } from "./db";
import { sendNotificationMultipleDevices } from "./notification";

//time 300
export const sendNewsNotifications = async() => {
  if(db.readyState === 1){
    schedule.scheduleJob('*/10 * * * * *', async()=>{
      const promises =await Promise.all([MobileUser.find({phoneOtp:"####"},{_id:0 , fcmToken:1}),
      News.find({isNotified:false,isDeleted:false},{title:1 , _id:0})])
      const users = promises[0]
      const news = promises[1]
      let fcmTokens = []
      for(let i=0 ; i<users.length ; i++){
        fcmTokens.push(users[i].fcmToken)
      }
      for(let j=0 ; j<news.length ; j++){
        await sendNotificationMultipleDevices(fcmTokens , news[j].title)
      }
      // console.log(news)
    console.log('The answer to life, the universe, and everything!');
  })
  }
  else return

}