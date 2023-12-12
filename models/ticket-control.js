const path = require('path')
const fs = require('fs')
class TicketControl{
  constructor(params) {
    this.ultimo = 0;
    this.hoy = new Date().getDate()
    this.tickets = [];
    this.ultimo4=[];
    this.init()
  }

  get toJson(){
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimo4: this.ultimo4,
    }
  }

  init(){
    const {hoy, tickets, ultimo, ultimo4} = require('../db/data.json');
    if (hoy ===this.hoy){
      this.tickets = tickets;
      this.ultimo = ultimo;
      this.ultimo4=ultimo4;
    }else{
      this.guardarDb()
    }
  }

  guardarDb(){
    const dbPath = path.join(__dirname, '../db/data.json')
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
    const {hoy, tickets, ultimo, ultimo4} = require('../db/data.json');

  }
}

module.exports= TicketControl