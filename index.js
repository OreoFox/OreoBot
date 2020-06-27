const Discord = require('discord.js');
const bot = new Discord.Client();

const Dbwork = require('./dbworks');
var dbwork = new Dbwork();

const express = require('express');
const keepalive = require('express-glitch-keepalive');
const app = express();
app.use(keepalive);
app.get('/', (req, res) =>{
  res.json('Бот включен');
});
app.get('/', (request, response) =>{
  response.sendStatus(200);
});
app.listen(3000)

let config = require('./botconfig.json');
let token = config.token;
let prefix = config.prefix;

bot.on('ready', () => {
    console.log(`${bot.user.username} запущен!`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link =>{
        console.log(link);
    })

    bot.user.setActivity("OREO SPECIAL");
});

bot.on('message', async message =>{

    if(message.channel.type == 'dm') return;
  
    if(message.author.id == 725451931996258375) {
      return;
    } else {
      dbwork.addCookie(message);
    }

    if(message.author.id == 725451931996258375) {
        return;
      } else {
        dbwork.checkGuild(message.guild);
      }

    if(message.content === prefix + 'cookies') {
        let cookies = dbwork.getCookie(message.author);
        let avatar = message.author.avatarURL();

        let cookiesembed = new Discord.MessageEmbed()
        .setTitle(`Печеньки`)
        .setColor(`#dcdcdc`)
        .setDescription(`У ${message.author.username} есть ${cookies} печенек!
Отправляй сообщения 
и зарабатывай больше пченек!`)
        .setThumbnail(avatar);
        message.channel.send(cookiesembed);

        return;
    }

    if(message.author.id == 208583885666254849) {
        message.react('🦊')
    }
    
    if(message.author.id == 424524746038968321) {
        message.react('🐺')
    }

    if(message.content === prefix + 'embed') {
        embed(message);
        return;
    }

    if(message.content.startsWith(prefix + 'setcookies')) {
        if(message.author.id == 208583885666254849) {
            setcookies(message);
        } else {
            message.channel.send('Недостаточно прав');
        }
        return;
    }

    if(message.content.startsWith(prefix + 'ccfrom')) {
        ccfrom(message);
        return;
    }

    if(message.content === prefix + 'test') {
        test(message);
        return;
    }

});

async function test(message) {
  
  let title;
  let color;
  let descr;
  
  let filter = m => m.author.id === message.author.id;
  let paramc = await message.channel.awaitMessages(filter, { max: 1 });
  let titlec = await message.channel.awaitMessages(filter, { max: 1 });
  let desc = await message.channel.awaitMessages(filter, { max: 1 });
  
  if (paramc.first().content == 1) {
      color = '#dcdcdc';
  } else {
      color = paramc.first().content;
  };
  
  if (titlec.first().content == 1) {
      title = ' ';
  } else {
      title = paramc.first().content;
  };
  
  if (desc.first().content == 1) {
      descr = ' ';
  } else {
      descr = desc.first().content;
  };
  
  let embemb = new Discord.MessageEmbed()
        .setTitle(`${title}`)
        .setColor(`${color}`)
        .setDescription(`${descr}`);
  message.channel.send(embemb);
}

async function setcookies(message) {
    let content = message.content.split(' ') 

    let user = content[1];
    let value = content[2];

    if(!user) {
        message.channel.send('Введите ID')
    } else if(!value) {
        message.channel.send('Введите кол-во печенек')
    } else if(!typeof(user) == 'number') {
        message.channel.send('Введите правильный ID')
    } else if(!typeof(value) == 'number') {
        message.channel.send('Введите правильное кол-во печенек')
    } else {
        dbwork.changeCookie(user, value);
    }
}

async function ccfrom(message) {
    let content = message.content.split(' ') 

    let userid = content[1];

    if(!userid) {
        message.channel.send('Введите ID')
    } else if(!typeof(userid) == 'number') {
        message.channel.send('Введите правильный ID')
    } else {
        let usercookie = dbwork.cookiesUser(userid);
        message.channel.send(usercookie);
        //let avatar = user_g.avatarURL({format: 'png'});

        bot.users.fetch(userid).then(user => {
            let avatar = user.avatarURL({format: 'png'});
            let cookiesuserembed = new Discord.MessageEmbed()
        .setTitle(`Печеньки`)
        .setColor(`#dcdcdc`)
        .setDescription(`У ${user.username} есть ${usercookie} печенек!
Отправляй сообщения 
и зарабатывай больше пченек!`)
        .setThumbnail(avatar);
        message.channel.send(cookiesuserembed);
        });
    }
}

async function embed(message) {
    let embemb = new Discord.MessageEmbed()
        .setTitle('Создание красивого закрепленного сообщения')
        .setColor('#f08c46')
        .setDescription(`
            Введите цвет hex
            Введите заголовок
            Введите описание
        `);
    message.channel.send(embemb);

    let color;
    let title;
    let descr;
  
    let filter = m => m.author.id === message.author.id;
    let paramc = await message.channel.awaitMessages(filter, { max: 1 });
    let titlec = await message.channel.awaitMessages(filter, { max: 1 });
    let desc = await message.channel.awaitMessages(filter, { max: 1 });
  
    let createEmbed = new Discord.MessageEmbed()
    //.setImage('https://cdn.discordapp.com/attachments/725430133565030470/726397637666013234/rules.gif')
    .setColor(`${paramc.first().content}`)
    .setTitle(`${titlec.first().content}`)
    .setDescription(`${desc.first().content}`);

    message.channel.send(createEmbed);

    await message.channel.messages.fetch({ limit: 5 }).then(messages =>{
    message.channel.bulkDelete(messages)
    });
}

bot.login(token);