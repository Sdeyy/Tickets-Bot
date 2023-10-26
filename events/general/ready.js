const client = require('../../index.js')
const chalk = require("chalk")

client.on("ready", () => {

    console.log(chalk.green.bold(` ╔━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╗
 ┃    Bot conectado correctamente!    ┃
 ╚━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╝`));
 
    const A= [
    {name: "github.com/sdeyy", type: "WATCHING"},
    {name: "EvilMC", type: "PLAYING"},
    {name: "evilmc.us", type: "COMPETING"},
    {name: "Young Miko", type: "LISTENING"},
    {name: "twitch", type: "STREAMING", URL: "https://twitch.tv/ImSdeyy"},
    ];
    
    setInterval(() => {
    let activ=A[Math.floor(Math.random() * A.length)]
   
    function presence(){
    client.user.setPresence( {
    activities:[activ],
    status: "DND"
    })}
    
    presence()
    
    
    }, 5000);

    
   }
    
    )