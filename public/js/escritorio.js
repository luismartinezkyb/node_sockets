//REFS html

const lblEscritorio = document.querySelector('h1');
const btnNuevo = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');


const searchParams = new URLSearchParams(window.location.search)
if(!searchParams.has('escritorio')){
  window.location='index.html'
  throw new Error('escritorio Obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;
divAlerta.style.display = 'none'
const socket = io()

socket.on('connect', () => {
  console.log('conectado')
  
  btnNuevo.disabled= false;
})

socket.on('disconnect', () => {
  console.log('disconnect')
  btnNuevo.disabled= true;
})

socket.on('count-tickets', (data)=>{
  if(data.length===0){
    lblPendientes.style.display = 'none'
  }else{
    lblPendientes.style.display = ''
    divAlerta.style.display = 'none'
    lblPendientes.innerText = data.length;

  }
})


btnNuevo.addEventListener('click', () => {
  // socket.emit('siguiente-ticket', null, (ticket) => {
  //     lblNuevoTicket.innerText= ticket;
  // })
  const payload = {
    escritorio
  }
  socket.emit('atender-ticket', payload, ({ok, ticket, msg})=>{
    if(!ok){
      lblTicket.innerText = `Nadie`
      return divAlerta.style.display = ''
    }
    lblTicket.innerText = `Ticket ${ticket.numero}`
    console.log(ticket)
  })
})