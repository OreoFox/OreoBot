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
    console.log(`${bot.user.username} готов производить контент`);
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
      dbwork.addCookie(message.author);
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

    if(message.content === prefix + 'embed') {
        embed(message);
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