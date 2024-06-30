// controllers/notificationsController.js

const admin=require('../configure/firebaseAdmin');
const User=require('../models/user.Model')

exports.sendPushNotification = async (req, res) => {
  const { token, message,name } = req.body;

  const payload = {
    token:token,
    notification: {
      title: name,
      body: message,
    },
  };

  try {
    await admin.messaging().send(payload);
    
    res.status(200).json({ message: 'Notification sent' });
  } catch (error) {
   console.log(error)
  }
};





exports.sendnot=async(req,res)=>{
  const {username,message}=req.body
  try{const user=await User.findOne({username:username})
  user.deviceToken.forEach(async (dtoken)=>{
    await this.sendPushNotification({body:{token:dtoken,message:message,username:username}})
  })
  res.status(200).send({success:true})}
  catch(error){
    console.log(error)
  }
}