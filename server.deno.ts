import "https://deno.land/std@0.224.0/dotenv/load.ts";
import {createBot, Intents, startBot} from "https://deno.land/x/discordeno@18.0.1/mod.ts";


const bot = createBot({
    token: Deno.env.get("DISCORD_TOKEN") || "",
    intents: 2097152*2-1, //全部つかっちゃえ
    events: {
      ready() {
        console.log("Successfully connected to gateway");
        
      },
    },
  });
  
  // Another way to do events
  bot.events.messageCreate = function (b, message) {
    // Process the message here with your command handler.
  };
  

const users: {[key:string]: bigint|undefined}={};

bot.events.voiceStateUpdate=async (bot, voiceState)=>{
    const userId=voiceState.userId;
    let str:string='';
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
    
    const user=await bot.helpers.getUser(userId);
    bot.helpers.sendMessage('1260178242388623440', {
        content: user.username+"が"+str+"しました"
    })
}

await startBot(bot);