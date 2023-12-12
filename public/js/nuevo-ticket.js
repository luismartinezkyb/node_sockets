

const lblNuevoTicket = document.querySelector('#lblNuevoTicket')
const btnCrear = document.querySelector('button')
console.log('Nuevo Ticket HTML');



const socket = io()


socket.on('connect', () => {
    console.log('conectado')
    
    btnCrear.disabled= false;
    

})

socket.on('disconnect', () => {
    console.log('disconnect')
    btnCrear.disabled= true;
})


socket.on('ultimo-ticket', (data)=>{
  lblNuevoTicket.innerText = 'Ticket '+data;
})


btnCrear.addEventListener('click', () => {
    socket.emit('siguiente-ticket', null, (ticket) => {
        lblNuevoTicket.innerText= ticket;
    })
})