const Database = require('better-sqlite3');
const Discord = require('discord.js');
const bot = new Discord.Client();
const db = new Database('./users.db');
let config = require('./botconfig.json');
let token = config.token;

class Dbwork {
  constructor() {
    
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

          let topembed = new Discord.MessageEmbed()
            .setTitle(`Топ`)
            .setColor(`#dcdcdc`)
            .setDescription(`1.<@${allUser[0].user_id}> есть ${allUser[0].cookies} :cookie:
2.<@${allUser[1].user_id}> есть ${allUser[1].cookies} :cookie:          
3.<@${allUser[2].user_id}> есть ${allUser[2].cookies} :cookie:          
4.<@${allUser[3].user_id}> есть ${allUser[3].cookies} :cookie:
5.<@${allUser[4].user_id}> есть ${allUser[4].cookies} :cookie:`);
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
    let runMinus = sql.run(this.val, this.author);
  }

  giveCookies(message) {
    let content = message.content.split(' ');

    let who = content[1];
    let fro = message.author.id;
    let amo = Math.abs(Number(content[2]));

    this.user = message.author.id;
    this.guild = message.guild.id;

    let sqlcc = db.prepare('SELECT cookies FROM _' + this.guild + '_oreo WHERE user_id = ?');
    let sqlcv = sqlcc.all(this.user);

    console.log(sqlcv[0].cookies);
    console.log(amo)

    if(!this.checkUser()) {

      this.addUser();

    }else if(Number(sqlcv[0].cookies) < amo) {

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

  addCookie(message) {
    this.user = message.author.id;
    this.guild = message.guild.id;

    if(!this.checkUser()) {
        this.addUser();
    } else {
    
        try {
            let sql = db.prepare('UPDATE _' + this.guild + '_oreo SET cookies = cookies + 1 WHERE user_id = ?');
            let cookiechange = sql.run(this.user);
        } catch(e) {
            console.log(e);
        }
    }
    }
  
  checkGuild(guild) {
    this.guild = guild.id;

    try {

      let sql = db.prepare('CREATE TABLE if not exists _' + this.guild + '_oreo (user_id VARCHAR (20), cookies INT (6))')
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

  addUser() {
    try {
      
      let sql = db.prepare('INSERT INTO _' + this.guild + '_oreo VALUES (?, 1)');
      var res = sql.run(this.user);
      
    } catch(e) {
      console.log(e)
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