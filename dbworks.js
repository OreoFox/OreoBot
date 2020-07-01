const Database = require('better-sqlite3');
const Discord = require('discord.js');
const bot = new Discord.Client();
const db = new Database('./users.db');
let config = require('./botconfig.json');
let token = config.token;

class Dbwork {
  constructor() {
    
  }

  check(ping) {
    return ping.replace('<@!', '').replace('>', '');
  }

  getAllCookies(message) {
    this.user = message.author.id;
    this.guild = message.guild.id;

    if(!this.checkUser()) {
      this.addUser();
  } else {
  
      try {
          let sql = db.prepare('SELECT * FROM _' + this.guild +'_oreo ORDER BY cookies DESC LIMIT 5');
          let allUser = sql.all();

          let description = '';

          for(let i = 0; i <= 4; i++) {
            description = description + `${i + 1}. У <@${allUser[i].user_id}> есть ${allUser[i].cookies} :cookie:\r\n`;
          }

          let topembed = new Discord.MessageEmbed()
            .setTitle(`Топ по печенькам:`)
            .setColor(`#dcdcdc`)
            .setDescription(`${description}`);
          message.channel.send(topembed);

      } catch(e) {
          console.log(e);
      }
  }
  }

  workCookies(message, val) {
    this.val = val;
    this.author = message.author.id;

    let sql = db.prepare('UPDATE _' + this.guild + '_oreo SET cookies = cookies + ? WHERE user_id = ?');
    sql.run(this.val, this.author);
  }

  boxCookies(message, val) {
    let user = message.author.id;
    let guild = message.guild.id;

    let sql = db.prepare('UPDATE _' + guild + '_oreo SET cookies = cookies + ? WHERE user_id = ?');
    sql.run(val, user);
  }

  giveCookies(message) {
    let content = message.content.split(' ');

    let who = this.check(content[1]);
    let fro = message.author.id;
    let amo = Math.floor(Math.abs(Number(content[2])));

    this.user = message.author.id;
    this.guild = message.guild.id;

    let sqlcc = db.prepare('SELECT cookies FROM _' + this.guild + '_oreo WHERE user_id = ?');
    let sqlcv = sqlcc.get(this.user);

    if(!this.checkUser()) {

      this.addUser();

    }else if(!amo) {

      message.channel.send('Введите количество');
      return;

    }else if(Number(sqlcv.cookies) < amo) {

      message.channel.send('Недостаточно средств');
      return;

    } else {
    
        try {

            let sql = db.prepare('UPDATE _' + this.guild + '_oreo SET cookies = cookies - ? WHERE user_id = ?');
            let runMinus = sql.run(amo, fro);

            let sql2 = db.prepare('UPDATE _' + this.guild + '_oreo SET cookies = cookies + ? WHERE user_id = ?');
            let runPlus = sql2.run(amo, who);

            let embemb = new Discord.MessageEmbed()
              .setTitle('Перевод печенек')
              .setColor('#dcdcdc')
              .setDescription(`Вы передали <@${who}> ${amo} печенек!`);
            message.channel.send(embemb);

        } catch(e) {
            console.log(e);
        }
  }
  }

  giveBox(message) {
    let content = message.content.split(' ');

    let who = this.check(content[1]);
    let fro = message.author.id;
    let amo = Math.floor(Math.abs(Number(content[2])));

    this.user = message.author.id;
    this.guild = message.guild.id;

    let sqlcc = db.prepare('SELECT box FROM _' + this.guild + '_oreo WHERE user_id = ?');
    let sqlcv = sqlcc.get(this.user);

    if(!this.checkUser()) {
      this.addUser();
    }else if(!amo) {
      message.channel.send('Введите количество');
      return;
    }else if(Number(sqlcv.cookies) < amo) {
      message.channel.send('Недостаточно коробок с печеньем');
      return;
    } else {
    
        try {

            let sql = db.prepare('UPDATE _' + this.guild + '_oreo SET box = box - ? WHERE user_id = ?');
            let runMinus = sql.run(amo, fro);

            let sql2 = db.prepare('UPDATE _' + this.guild + '_oreo SET box = box + ? WHERE user_id = ?');
            let runPlus = sql2.run(amo, who);

            let embemb = new Discord.MessageEmbed()
              .setTitle('Перевод коробок с печеньем')
              .setColor('#dcdcdc')
              .setDescription(`Вы передали <@${who}> ${amo} :gift:!`);
            message.channel.send(embemb);

        } catch(e) {
            console.log(e);
        }
  }
  }

  anulMessgaes(message) {
    this.user = message.author.id;

    if(!this.checkUser()) {
      this.addUser();
    } else {
    
        try {
            let sql = db.prepare('UPDATE _' + this.guild + '_oreo SET messages = 0 WHERE user_id = ?');
            let messages = sql.run(this.user);
        } catch(e) {
            console.log(e);
        }
    }
  }

  checkMessages(message) {
    this.user = message.author.id;

    if(!this.checkUser()) {
      this.addUser();
    } else {
    
        try {
            let sql = db.prepare('SELECT messages FROM _' + this.guild + '_oreo WHERE user_id = ?');
            let messages = sql.get(this.user);
            return messages;
        } catch(e) {
            console.log(e);
        }
    }
  }

  tCookie(user, win, player) {
    this.user = user;

    if(!this.checkUser()) {
      this.addUser();
  } else {
  
      try {
          let sql = db.prepare('UPDATE _' + this.guild + '_oreo SET cookies = cookies + ? WHERE user_id = ?');
          sql.run(win, this.user);

          let sql2 = db.prepare('UPDATE _' + this.guild + '_oreo SET cookies = cookies - ? WHERE user_id = ?');
          sql2.run(win, player);
      } catch(e) {
          console.log(e);
      }
  }
  }

  addCookie(message) {
    this.user = message.author.id;
    this.guild = message.guild.id;

    if(!this.checkUser()) {
        this.addUser();
    } else {
    
        try {
            let sql = db.prepare('UPDATE _' + this.guild + '_oreo SET cookies = cookies + 1 WHERE user_id = ?');
            let cookiechange = sql.run(this.user);

            let sqlm = db.prepare('UPDATE _' + this.guild + '_oreo SET messages = messages + 1 WHERE user_id = ?');
            let messagechange = sqlm.run(this.user);
        } catch(e) {
            console.log(e);
        }
    }
  }

  addMessage(message) {
    this.user = message.author.id;
    this.guild = message.guild.id;

    if(!this.checkUser()) {
        this.addUser();
    } else {
    
        try {
            let sqlm = db.prepare('UPDATE _' + this.guild + '_oreo SET messages = messages + 1 WHERE user_id = ?');
            let messagechange = sqlm.run(this.user);
        } catch(e) {
            console.log(e);
        }
    }
  }

  addBox(message) {
    this.user = message.author.id;
    this.guild = message.guild.id;

    if(!this.checkUser()) {
        this.addUser();
    } else {
        try {
            let sql = db.prepare('UPDATE _' + this.guild + '_oreo SET box = box + 1 WHERE user_id = ?');
            sql.run(this.user);
        } catch(e) {
            console.log(e);
        }
    }
  }

  addBoxes(message, val) {
    this.user = message.author.id;
    this.guild = message.guild.id;
    this.val = val;

    if(!this.checkUser()) {
        this.addUser();
    } else {
        try {
            let sql = db.prepare('UPDATE _' + this.guild + '_oreo SET box = box + ? WHERE user_id = ?');
            sql.run(this.val, this.user);
        } catch(e) {
            console.log(e);
        }
    }
  }

  removeBox(message) {
    this.user = message.author.id;
    this.guild = message.guild.id;

    if(!this.checkUser()) {
        this.addUser();
    } else {
        try {
            let sql = db.prepare('UPDATE _' + this.guild + '_oreo SET box = box - 1 WHERE user_id = ?');
            sql.run(this.user);
        } catch(e) {
            console.log(e);
        }
    }
  }
  
  checkGuild(guild) {
    this.guild = guild.id;

    try {

      let sql = db.prepare('CREATE TABLE if not exists _' + this.guild + '_oreo (user_id VARCHAR (20), cookies INT (6), messages VARCHAR (5))')
      var res = sql.run();

    } catch(e) {
      console.log(e)
    }
  }

  checkUser() {    
    try {
      
      let sql = db.prepare('SELECT * FROM _' + this.guild + '_oreo WHERE user_id = ?');
      var res = sql.get(this.user);
      
    } catch(e) {
      console.log(e)
    }

    if(res) {
        return true;
    } else {
        return false;
    }
  }

  checkUserArg(usid) {   
    this.usid = usid;

    try {
      
      let sql = db.prepare('SELECT * FROM _' + this.guild + '_oreo WHERE user_id = ?');
      var res = sql.get(this.usid);
      
    } catch(e) {
      console.log(e)
    }

    if(res) {
        return true;
    } else {
        return false;
    }
  }

  checkMessage() {    
    try {
      
      let sql = db.prepare('SELECT messages FROM _' + this.guild + '_oreo WHERE user_id = ?');
      var resm = sql.get(this.user);
      
    } catch(e) {
      console.log(e)
    }

  }

  checkBox(message) {
    let user = message.author.id;
    let guild = message.guild.id;
    
    try {
      
      let sql = db.prepare('SELECT box FROM _' + guild + '_oreo WHERE user_id = ?');
      var resm = sql.get(user);
      return resm.box;
      
    } catch(e) {
      console.log(e)
    }

  }

  whoBox(userid) {
    this.userid = userid;
    
    try {
      
      let sql = db.prepare('SELECT box FROM _' + this.guild + '_oreo WHERE user_id = ?');
      var resm = sql.get(this.userid);
      return resm.box;
      
    } catch(e) {
      console.log(e)
    }

  }

  addUser() {
    try {
      
      let sql = db.prepare('INSERT INTO _' + this.guild + '_oreo VALUES (?, 1, 1, 0, 0)');
      var res = sql.run(this.user);
      
    } catch(e) {
      console.log(e)
    }
  }

  checkRoll(message) {
    this.user = message.author.id;
    this.guild = message.guild.id;

    if(!this.checkUser) {
      this.addUser;
    } else {

      try {

          let sql = db.prepare('SELECT cookies FROM _' + this.guild + '_oreo WHERE user_id = ?');
          var res = sql.get(this.user);
          return res.cookies;

      } catch(e) {
          console.log(e);
      }

    }
  }

  checkCookie(id) {
    if(!this.checkUser) {
        this.addUser;
    } else {

        try {

            let sql = db.prepare('SELECT cookies FROM _' + this.guild + '_oreo WHERE user_id = ?');
            var res = sql.get(id);
            return res.cookies;

        } catch(e) {
            console.log(e);
        }

    }
  }

  getCookie(author) {
    this.user = author.id;

    if(!this.checkUser) {
        this.addUser;
    } else {

        try {

            let sql = db.prepare('SELECT cookies FROM _' + this.guild + '_oreo WHERE user_id = ?');
            var res = sql.get(this.user);
            return res.cookies;

        } catch(e) {
            console.log(e);
        }

    }
  }

  changeCookie(user, val) {
    this.user = user;
    this.val = val;

    if(!this.checkUser) {
        this.addUser;
    } else {

        try {

            let sql = db.prepare('UPDATE _' + this.guild + '_oreo SET cookies = ? WHERE user_id = ?');
            let cookiechange = sql.run(this.val, this.user);

        } catch(e) {
            console.log(e);
        }

    }
  }

  cookiesUser(user) {
    this.user = user;

    if(!this.checkUser) {
        this.addUser;
    } else {

        try {

            let sql = db.prepare('SELECT cookies FROM _' + this.guild + '_oreo WHERE user_id = ?');
            var usercookies = sql.get(this.user);
            return usercookies.cookies;

        } catch(e) {
            console.log(e);
        }

    }
  }
}

module.exports = Dbwork;

bot.login(token);