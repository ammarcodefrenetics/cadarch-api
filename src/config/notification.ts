const admin = require('firebase-admin')
import {firebaseCreds} from './firebaseCreds'
admin.initializeApp({
    credential: admin.credential.cert(firebaseCreds)
  })
  

export const sendNotificationSingleDevice = async(regToken:string)=>{
const message = {
  data: {
    score: '850',
    time: '2:45'
  },
  token: `${regToken}`
};

// Send a message to the device corresponding to the provided
// registration token
admin.messaging().send(message, {
  // Required for background/quit data-only messages on Android
  priority: 'high'
})
  .then((response:any) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error:any) => {
    console.log('Error sending message:', error);
  });
}

export const sendNotificationMultipleDevices=async(regTokens:string[],data:string)=>{
    const message = {
        data: {data : JSON.stringify(data)},
        tokens: regTokens,
      };
      
      admin.messaging().sendMulticast(message)
        .then((response:any) => {
          if (response.failureCount > 0) {
            const failedTokens: string[] = [];
            response.responses.forEach((resp:any, idx:number) => {
              if (!resp.success) {
                failedTokens.push(regTokens[idx]);
              }
            });
            console.log('List of tokens that caused failures: ' + failedTokens);
          }
          else{
            console.log('notifications sent')
          }
        });
}