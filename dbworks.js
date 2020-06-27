const Database = require('better-sqlite3');
const db = new Database('./users.db');

class Dbwork {
  constructor() {
    
  }

  addCookie(author) {
    this.user = author.id 

    if(!this.checkUser()) {
        this.addUser();
    } else {
    
        try {
            let sql = db.prepare(`UPDATE Oreo SET cookies = cookies + 1 WHERE user_id = ?`);
            let cookiechange = sql.run(this.user);
        } catch(e) {
            console.log(e);
        }
    }
    }
  
  checkUser() {    
    try {
      
      let sql = db.prepare(`SELECT * FROM Oreo WHERE user_id = ?`);
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
      
      let sql = db.prepare(`INSERT INTO Oreo VALUES (?, 1)`);
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

            let sql = db.prepare(`SELECT cookies FROM Oreo WHERE user_id = ?`);
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

            let sql = db.prepare(`UPDATE Oreo SET cookies = ? WHERE user_id = ?`);
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

            let sql = db.prepare(`SELECT cookies FROM Oreo WHERE user_id = ?`);
            var usercookies = sql.get(this.user);
            return usercookies.cookies;

        } catch(e) {
            console.log(e);
        }

    }
  }
}

module.exports = Dbwork;