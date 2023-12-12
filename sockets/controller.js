const TicketControl = require("../models/ticket-control")

const ticketControl  = new TicketControl;

const socketController =(client)=>{
  console.log('cliente conectado', client.id)
  client.on('disconnect',()=>{
    console.log('cliente desconectado')
  })


  client.on('enviar-mensaje', (message, callback)=>{
    //ESTO ENVIA A SOLO EL EL MENSAJE
    // client.emit('enviar-mensaje', message);
    //ESTO EMITE A TODOS MENOS A EL
    client.broadcast.emit('enviar-mensaje', message);

    // ESTO EMITE A TODOS INCLUYENDOLO
    // this.io.emit('enviar-mensaje', message);
    const id =23123;
    callback(id)
    
  })
  
}

module.exports ={
  socketController
}