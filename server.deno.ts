import {createBot, startBot} from "https://deno.land/x/discordeno@18.0.1/mod.ts";
import { ENV } from "./env.ts";

const bot = createBot({
    token: ENV["DISCORD_TOKEN"] || "",
    intents: 2097152*2-1, //全部つかっちゃえ
    events: {
      ready() {
        console.log("Successfully connected to gateway");
      },
    },
  });
  
  // bot.events.messageCreate = function (b, message) {
  //   // Process the message here with your command handler.
  // };
  

const users: {[key:string]: bigint|undefined}={};
const times: {[key:string]: number}={};

bot.events.voiceStateUpdate=async (bot, voiceState)=>{
    const userId=voiceState.userId;
    let str:string='';
    const unixSec=Math.floor(new Date().getTime()/1000);
    //退出
    if(voiceState.channelId==undefined){
        str='退出';
    } else {
        //muteとかで反応しないように
        if(!(userId.toString() in users)||users[userId.toString()]==undefined){
            str="入室"
        }else{
            return;
        }
    }
    users[voiceState.userId.toString()]=voiceState.channelId;

    let time='';
    if(str=='退出'){
      if(!(userId.toString() in times))times[userId.toString()]=unixSec;
      time=((unixSec-times[userId.toString()])/60).toFixed(1)+'分';
    }else{
      times[userId.toString()]=unixSec;
    }



    const user=await bot.helpers.getUser(userId);
    bot.helpers.sendMessage('1260178242388623440', {
        content: user.username+"が"+str+"しました "+time
    })
}

await startBot(bot);

setInterval(()=>{
  console.log('a');
}, 60*1000)