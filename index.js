const Discord = require('discord.js');
const bot = new Discord.Client();
const Database = require('better-sqlite3');
const db = new Database('./users.db');

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
const e = require('express');
let token = config.token;
let prefix = config.prefix;
let botwork = true;

bot.on('ready', () => {
    console.log(`${bot.user.username} запущен!`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link => {
        console.log(link);
    })

    bot.user.setActivity("PB WILYFOX");
});

bot.on('message', async message =>{
    if(botwork) {
        if(message.author.id == 208583885666254849) {
            if(message.content.startsWith(prefix + 'bot')) {
                let content = message.content.split(' ');
                if(content[1] == 'off') {
                    botwork = false;
                    let workemb = new Discord.MessageEmbed()
                        .setTitle(`OREO`)
                        .setColor(`#dcdcdc`)
                        .setDescription(`Бот был выключен!`);
                    message.channel.send(workemb);
                }
            }
        }


    if(message.channel.type == 'dm') return;
  
    if(message.content.startsWith(prefix + 'roll')) {
        rollSetup(message);
        return;
    }

    if(message.content === prefix + 'box') {
        box(message);
        return;
    }

    if(message.author.id == 725451931996258375) {
        return;
    } else {
        dbwork.checkGuild(message.guild);
    }

    if(message.author.id == 725451931996258375) {
      return;
    } else {
        dbwork.addMessage(message);
      let messages = dbwork.checkMessages(message).messages;
      if(messages >= 25) {
          dbwork.addBox(message);
          dbwork.anulMessgaes(message);
          message.channel.send(`<@${message.author.id}>, вы получили коробку!`);
      }
    }

    if(message.content === prefix + 'top') {
        top(message);
        return;
    }

    if(message.content === prefix + 'work') {
        work(message);
        return;
    }

    if(message.content.startsWith(prefix + 'cookies')) {

        messageb = message.content;
        let content = messageb.split(' ');

        if(!content[1]) {
            let cookies = dbwork.getCookie(message.author);
            let boxes = dbwork.checkBox(message);
            let avatar = message.author.avatarURL({format: 'png'});

            let cookiesembed = new Discord.MessageEmbed()
            .setTitle(`${message.author.username}`)
            .setColor(`#dcdcdc`)
            .setDescription(`У тебя есть ${cookies} :cookie: и ${boxes} :gift:!`)
            .setThumbnail(avatar);
            message.channel.send(cookiesembed);
        } else {
            ccfrom(message);
        }
    return;
    }

    if(message.content.startsWith(prefix + '$')) {

        messageb = message.content;
        let content = messageb.split(' ');

        if(!content[1]) {
            let cookies = dbwork.getCookie(message.author);
            let boxes = dbwork.checkBox(message);
            let avatar = message.author.avatarURL({format: 'png'});

            let cookiesembed = new Discord.MessageEmbed()
            .setTitle(`${message.author.username}`)
            .setColor(`#dcdcdc`)
            .setDescription(`У тебя есть ${cookies} :cookie: и ${boxes} :gift:!`)
            .setThumbnail(avatar);
            message.channel.send(cookiesembed);
        } else {
            ccfrom(message);
        }
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

    if(message.content.startsWith(prefix + 'give')) {
        give(message);
        return;
    }

    if(message.content.startsWith(prefix + 'boxgive')) {
        givebox(message);
        return;
    }

    if(message.content === prefix + 'test') {
        console.log((await message.guild.members.fetch(message.author.id)).roles);
        return;
    }

    if(message.content.startsWith(prefix + 'tttoy')) {
        TTToy(message);
        return;
    }

    if(message.content.startsWith(prefix + 'check')) {
        check(message);
        return;
    }


} else {
    if(message.author.id == 208583885666254849) {
        if(message.content.startsWith(prefix + 'bot')) {
            let content = message.content.split(' ');
            if(content[1] == 'on') {
                botwork = true;
                let workemb = new Discord.MessageEmbed()
                    .setTitle(`OREO`)
                    .setColor(`#dcdcdc`)
                    .setDescription(`Бот был включен!`);
                message.channel.send(workemb);
            }
        }
    }
}

});

async function check(ping) {
    id = ping.replace('<@!', '').replace('>', '');
    return id;
}

async function work(message) {
    let date = new Date().getTime();
    let interval = 1800000;
    try {
        let sql = db.prepare('SELECT workLastTime FROM _' + message.guild.id + '_oreo WHERE user_id = ?');
        var res = sql.get(message.author.id).workLastTime;
    } catch(e) {
    }

    if(date - res >= interval) {
        let val = Math.floor(Math.random() * (50 - 25) + 25);

        if(message.author.id == 208583885666254849) {
            val = val*100;
        }

        dbwork.workCookies(message, val);
        try {
            let sql = db.prepare('UPDATE _' + message.guild.id + '_oreo SET workLastTime = ? WHERE user_id = ?');
            let cookiechange = sql.run(date, message.author.id);
        } catch(e) {
            console.log(e);
        }

        let embemb = new Discord.MessageEmbed()
            .setTitle(`${message.author.username}`)
            .setColor(`#dcdcdc`)
            .setDescription(`Ты получил ${val} :cookie:!`);
        message.channel.send(embemb);
    } else {
        if(((date - res - interval)/-60000) < 1) {
            let seconds = Math.ceil((date - res - interval)/-1000);
            let embemb = new Discord.MessageEmbed()
                .setColor(`#cc1d1d`)
                .setDescription(`${message.author.tag}, ты уже заработал свои печеньки. Приходи через ${seconds}s`);
            message.channel.send(embemb);
        } else {
            let minutes = Math.ceil((date - res - interval)/-60000);
            let embemb = new Discord.MessageEmbed()
                .setColor(`#cc1d1d`)
                .setDescription(`${message.author.tag}, ты уже заработал свои печеньки. Приходи через ${minutes}m`);
            message.channel.send(embemb);
        }
    }
}

async function box(message) {
    let boxes = dbwork.checkBox(message);
    console.log(boxes);

    if(boxes >= 1) {
        let percent = (Math.random() * (10 - 1) + 1);
        if(percent >= 8) {
            let val = Math.floor(Math.random() * (50 - 30) + 30);
            if(message.author.id == 208583885666254849) {
                val = 50;
            }
            if(val == 49 || val == 50) {
                dbwork.addBoxes(message, 2);
                message.channel.send(`<@${message.author.id}>, хорошая попытка, ты получаешь :gift:`);
            }
            dbwork.boxCookies(message, val);
            dbwork.removeBox(message);
            if(val >= 50) {
                let embemb = new Discord.MessageEmbed()
                    .setTitle(`${message.author.username}`)
                    .setColor(`#cc1d1d`)
                    .setDescription(`Вау, ты получил ${val} :cookie:! Молодец :fox:!`);
                message.channel.send(embemb);
            } else {
                message.channel.send(`${message.author.username}, вы получили **${val}** :cookie:!`);
            }
        } else {
            let val = Math.floor(Math.random() * (30 - 1) + 1);
            if(message.author.id == 208583885666254849) {
                val = 50;
            }
            if(val == 49 || val == 50) {
                dbwork.addBoxes(message, 2);
                message.channel.send(`<@${message.author.id}>, хорошая попытка, ты получаешь :gift:`);
            }
            if(val == 1) {
                dbwork.addBoxes(message, 2);
                message.channel.send(`<@${message.author.id}>, хорошая попытка, ты получаешь :gift:`);
            }
            dbwork.boxCookies(message, val);
            dbwork.removeBox(message);
            if(val >= 50) {
                let embemb = new Discord.MessageEmbed()
                    .setTitle(`${message.author.username}`)
                    .setColor(`#cc1d1d`)
                    .setDescription(`Вау, ты получил ${val} :cookie:! Молодец :fox:!`);
                message.channel.send(embemb);
            } else {
                message.channel.send(`${message.author.username}, вы получили **${val}** :cookie:!`);
            }
        }
    } else {
        message.channel.send(`${message.author.username}, у вас нет :gift:!`);
    }
}

async function TTToy(message) {
    let content = message.content.split(' ');
    let playerid;
    let column;
    let sym = ' X ';
    let turn = 1;
    let count = 0;
    let win = content[2];
    let isWin = false;
    win = Math.abs(Math.floor(win));

    await check(content[1]).then(user => {
        playerid = user;
    });

    if(!playerid) {
        message.channel.send('Выберите игрока');
        return;
    } else if(!win) {
        message.channel.send('Введите ставку');
        return;
    } else if(!Number.isInteger(Number(playerid))) {
        message.channel.send('Выберите правильного игрока');
        return;
    } else if(!Number.isInteger(Number(win))) {
        message.channel.send('Выберите правильную ставку');
        return;
    }

    let aCookie = await dbwork.checkCookie(message.author.id);
    let bCookie = await dbwork.checkCookie(playerid);

    if(aCookie < win || bCookie < win) {
        message.channel.send('У одного из игроков не хватает печенек для игры :face_with_raised_eyebrow:');
        return;
    }

    message.channel.send(`<@${playerid}>, чтобы принять игру напишите Y`);

    filter = m => m.author.id === playerid;
    let choose = await message.channel.awaitMessages(filter, { max: 1, time: 30000 });
    if(choose.first()){
        if (choose.first().content == 'Y') {


            let board = [
                ['*', '  A  ', ' B  ', ' C '],
                ['1 ', ' -- ', ' -- ', ' -- '],
                ['2 ', ' -- ', ' -- ', ' -- '],
                ['3 ', ' -- ', ' -- ', ' -- ']
            ];
            let boardst = '';

            for(let i = 0; i < 4; i++) {
                for(let j = 0; j < 4; j++) {
                    boardst = boardst + board[i][j];
                }
                message.channel.send(boardst);
                boardst = '';   
            }

            while(true) {
                let filter;
                if(turn == 1) {
                    filter = m => m.author.id === message.author.id;
                } else if(turn == -1) {
                    filter = m => m.author.id === playerid;
                }
                let lita = await message.channel.awaitMessages(filter, { max: 1 });
                let cont = lita.first().content.split(' ');
                let lit = cont[0];
                let num = cont[1];

                if(num == 1 || num == 2 || num == 3) {

                    if(lit == 'A') {
                        column = 1;
                    } else if(lit == 'B') {
                        column = 2;
                    } else {
                        column = 3;
                    }

                    if(board[num][column] == ' -- ') {
                        board[num][column] = sym;

                        if(sym == ' 0 ') {
                            sym = ' X ';
                        } else if(sym == ' X ') {
                            sym = ' 0 ';
                        } else {
                            sym = 'error suka';
                        }

                        count += 1;

                        for(let i = 0; i < 4; i++) {
                            for(let j = 0; j < 4; j++) {
                                boardst = boardst + board[i][j];
                            }
                            message.channel.send(boardst);
                            boardst = '';   
                        }

                        if((board[1][1] == board[2][2] && board[1][1] == board[3][3]) && (board[1][1] !== ' -- ' || board[2][2] !== ' -- ' || board[3][3] !== ' -- ')) {
                            isWin = true;
                        } else
                        if((board[1][3] == board[2][2] && board[1][3] == board[3][1]) && (board[1][3] !== ' -- ' || board[2][2] !== ' -- ' || board[3][1] !== ' -- ')) {
                            isWin = true;
                        } else
                        if((board[1][1] == board[1][2] && board[1][1] == board[1][3]) && (board[1][1] !== ' -- ' || board[1][2] !== ' -- ' || board[1][3] !== ' -- ')) {
                            isWin = true;
                        } else
                        if((board[2][1] == board[2][2] && board[2][1] == board[2][3]) && (board[2][1] !== ' -- ' || board[2][2] !== ' -- ' || board[2][3] !== ' -- ')) {
                            isWin = true;
                        } else
                        if((board[3][1] == board[3][2] && board[3][1] == board[3][3]) && (board[3][1] !== ' -- ' || board[3][2] !== ' -- ' || board[3][3] !== ' -- ')) {
                            isWin = true;
                        } else
                        if((board[1][1] == board[2][1] && board[1][1] == board[3][1])  && (board[1][1] !== ' -- ' || board[2][1] !== ' -- ' || board[3][1] !== ' -- ')) {
                            isWin = true;
                        } else
                        if((board[1][2] == board[2][2] && board[1][2] == board[3][2]) && (board[1][2] !== ' -- ' || board[2][2] !== ' -- ' || board[3][2] !== ' -- ')) {
                            isWin = true;
                        } else
                        if((board[1][3] == board[2][3] && board[1][3] == board[3][3]) && (board[1][3] !== ' -- ' || board[2][3] !== ' -- ' || board[3][3] !== ' -- ')) {
                            isWin = true;
                        } else if(count == 9) {
                            message.channel.send('Ничья :flag_white:!');
                            return;
                        }
                        if(isWin) {
                            if(turn == 1) {
                                dbwork.tCookie(message.author.id, win, playerid);
                                let embemb = new Discord.MessageEmbed()
                                    .setTitle(`Победа`)
                                    .setColor(`#dcdcdc`)
                                    .setDescription(`<@${message.author.id}>, ты получил ${win} :cookie:!`);
                                message.channel.send(embemb);
                                return;
                            } else {
                                dbwork.tCookie(playerid, win, message.author.id);
                                let embemb = new Discord.MessageEmbed()
                                    .setTitle(`Победа`)
                                    .setColor(`#dcdcdc`)
                                    .setDescription(`<@${playerid}>, ты получил ${win} :cookie:!`);
                                message.channel.send(embemb);
                                return;
                            }
                        }
                        turn = turn * (-1);
                    } else {
                        message.channel.send('Ячейка занята!');
                    }
                } else {
                    message.channel.send('Неправильный ход!');
                }
            }
        } else {
            message.channel.send(`<@${playerid}> отказался от игры`);
            return;
        }
    } else {
        message.channel.send(`<@${playerid}> не принял игру`);
        return;
    }
}

async function rollSetup(message) {
    let content = message.content.split(' ');
    let user = `${content[1]}`;
    let mon = Math.abs(Math.floor(Number(content[2])));
    let channel;

    await check(content[1]).then(userid => {
        user = userid;
    });

    if(!user) {
        message.channel.send('Выберите игрока');
        return;
    } else if(!mon) {
        message.channel.send('Введите ставку');
        return;
    } else if(!Number.isInteger(Number(user))) {
        message.channel.send('Выберите правильного игрока');
        return;
    } else if(!Number.isInteger(Number(mon))) {
        message.channel.send('Выберите правильную ставку');
        return;
    }

    let aCookie = await dbwork.checkRoll(message);
    let bCookie = await dbwork.checkCookie(user);

    if(aCookie < mon || bCookie < mon) {
        message.channel.send('У одного из игроков не хватает печенек для игры :face_with_raised_eyebrow:');
        return;
    }
    
    message.channel.send(`<@${user}>, чтобы принять игру напишите Y, иначе через 30 секунд игра будет отменена.`);
    filter = m => m.author.id == user;
    let choose = await message.channel.awaitMessages(filter, { max: 1, time: 15000 });
    if(choose.first()){
        if(choose.first().content == 'Y') {
            await message.guild.channels.create('Rolls', { type: 'text', permissionOverwrites:[
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                },
                {
                    id: user,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                },
                {
                    id: bot.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ADMINISTRATOR'],
                }
            ]}).then(channel1 => {
                channel = channel1;
            });

            channel.send(`Игра, в которой побеждает рандом!`)

            let p1d = Math.floor(Math.random() * 100);
            await channel.send(`<@${message.author.id}> выпало ${p1d}`);
            let p2d = Math.floor(Math.random() * 100);
            await channel.send(`<@${user}> выпало ${p2d}`);

            if(p1d > p2d) {
                dbwork.tCookie(message.author.id, mon, user);
                channel.send(`Победил <@${message.author.id}>`);
                setTimeout(() => channel.delete(), 30000);
                return;
            } else if(p1d < p2d) {
                dbwork.tCookie(user, mon, message.author.id);
                channel.send(`Победил <@${user}>`);
                setTimeout(() => channel.delete(), 30000);
                return;
            } else {
                channel.send(`Ничья`);
                setTimeout(() => channel.delete(), 30000);
                return;
            }

            }
        } else {
            message.channel.send(`<@${user}> отказался`);
        }
        message.channel.send(`<@${user}> не принял игру`);

}

async function top(message) {
    dbwork.getAllCookies(message);
}

async function give(message) {
    dbwork.giveCookies(message);
}

async function givebox(message) {
    dbwork.giveBox(message);
}

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
    let content = message.content.split(' ');

    var userid;
    await check(content[1]).then(user => {
        userid = user;
    });
    let value = content[2];

    if(!userid) {
        message.channel.send('Введите ID')
    } else if(!value) {
        message.channel.send('Введите кол-во печенек')
    } else if(!typeof(userid) == 'number') {
        message.channel.send('Введите правильный ID')
    } else if(!typeof(value) == 'number') {
        message.channel.send('Введите правильное кол-во печенек')
    } else {
        dbwork.changeCookie(userid, value);
        let usercookie = dbwork.cookiesUser(userid);

        bot.users.fetch(userid).then(user => {
            let avatar = user.avatarURL({format: 'png'});
            let cookiesuserembed = new Discord.MessageEmbed()
                .setTitle(`Печеньки`)
                .setColor(`#dcdcdc`)
                .setDescription(`Вы изменили кол-во печенек ${user.username} на ${usercookie} :cookie:!`)
                .setThumbnail(avatar);
            message.channel.send(cookiesuserembed);
    });
    }
}

async function ccfrom(message) {
    let content = message.content.split(' ');

    var userid;
    await check(content[1]).then(user => {
        userid = user;
    });
    if(!userid) {
        message.channel.send('Введите ID')
    } else if(!typeof(userid) == 'number') {
        message.channel.send('Введите правильный ID')
    } else {
        let ifuser = dbwork.checkUserArg(userid);

        if(ifuser) {
            let usercookie = dbwork.cookiesUser(userid);
            let boxes = dbwork.whoBox(userid);

            bot.users.fetch(userid).then(user => {
                let avatar = user.avatarURL({format: 'png'});
                let cookiesuserembed = new Discord.MessageEmbed()
            .setTitle(`Печеньки`)
            .setColor(`#dcdcdc`)
            .setDescription(`У ${user.username} есть ${usercookie} :cookie: и ${boxes} :gift:!`)
            .setThumbnail(avatar);
            message.channel.send(cookiesuserembed);
        });
        } else {
            let cookiesuserembed = new Discord.MessageEmbed()
                .setTitle(`Печеньки`)
                .setColor(`#dcdcdc`)
                .setDescription(`Пользователь не найден :thinking:`);
            message.channel.send(cookiesuserembed);
        }
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