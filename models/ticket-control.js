const path = require('path')
const fs = require('fs')


class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor(params) {
    this.ultimo = 0;
    this.hoy = new Date().getDate()
    this.tickets = [];
    this.ultimo4 = [];
    this.init()
  }

  get toJson() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimo4: this.ultimo4,
    }
  }

  init() {
    const { hoy, tickets, ultimo, ultimo4 } = require('../db/data.json');
    if (hoy === this.hoy) {
      this.tickets = tickets;
      this.ultimo = ultimo;
      this.ultimo4 = ultimo4;
    } else {
      this.guardarDb()
    }
  }

  guardarDb() {
    const dbPath = path.join(__dirname, '../db/data.json')
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
    const { hoy, tickets, ultimo, ultimo4 } = require('../db/data.json');

  }

  siguiente() {
    this.ultimo += 1;
    const ticket = new Ticket(this.ultimo, null)
    this.tickets.push(ticket)

    this.guardarDb()
    return 'Ticket '+ ticket.numero;
  }

  atenderTicket (escritorio){
    if(this.tickets.length===0) return null
    //Sacamos el primero
    const ticket = this.tickets.shift();
    ticket.escritorio = escritorio
    //Metemos a la cola
    this.ultimo4.unshift(ticket)
    if(this.ultimo4>4){
      this.ultimo4.splice(-1, 1);
    }
    //Guardamos en la bd
    this.guardarDb()
    return ticket;
  }
}

module.exports = TicketControl