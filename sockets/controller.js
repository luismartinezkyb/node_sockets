const TicketControl = require("../models/ticket-control")

const ticketControl  = new TicketControl;

const socketController =(client)=>{
  // console.log('cliente conectado', client.id)
  // client.on('disconnect',()=>{
  //   console.log('cliente desconectado')
  // })

  client.emit('ultimo-ticket', ticketControl.ultimo)
  client.emit('count-tickets', ticketControl.tickets)
  client.emit('estado-actual', ticketControl.ultimos4);
  // client.broadcast.emit('', {
  //     fullName: 'Soy yo',
  //     message: payload.message || 'New Message',
  //   });

  client.on('siguiente-ticket', (message, callback)=>{
    const siguiente = ticketControl.siguiente()
    //EMITE A TODOS CUANDO SE CREA UNO NUEVO PARA VER LOS PENDIENTES
    client.broadcast.emit('count-tickets', ticketControl.tickets)

    callback(siguiente);

    

  })

  client.on('atender-ticket', ({escritorio}, callback)=>{
    if(!escritorio) {
      return callback({
        ok:false,
        msg: 'No escritorio'
      })
  

    }

    const ticket = ticketControl.atenderTicket(escritorio);
    //NOTIFICAR CAMBIO EN ULTIMOS 4
    client.broadcast.emit('estado-actual', ticketControl.ultimos4);
    
    //TODO: Notificar tickets pendientes;
    //SOLO LE AVISA AL QUE ESTÁ REALIZANDOLO
    client.emit('count-tickets', ticketControl.tickets)
    // Y TAMBIEN TIENE QUE EMITIRLO A LOS DEMAS ESCRITORIOS
    client.broadcast.emit('count-tickets', ticketControl.tickets)

    if(!ticket){
      callback({
        ok:false,
        msg:'Ya no hay tickets pendientes'
      })
    }else{
      callback({
        ok:true,
        ticket
      })
    }
  })
  
  
}

module.exports ={
  socketController
}