//HTML
const lblOffline = document.querySelector('#lblOffline');
const lblOnline = document.querySelector('#lblOnline');
const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')


const socket = io()


socket.on('connect', () => {
    console.log('conectado')

    lblOffline.style.display = 'none'
    lblOnline.style.display = ''

})

socket.on('disconnect', () => {
    console.log('disconnect')
    lblOnline.style.display = 'none'
    lblOffline.style.display = ''
})

socket.on('enviar-mensaje', (payload) => {
    console.log(payload)
})

btnEnviar.addEventListener('click', () => {
    const value = txtMensaje.value;
    const payload = {
        value,
        id: '12312',
        fecha: new Date().getTime(),
    }

    socket.emit('enviar-mensaje', payload, (id) => {
        console.log(id)
    })
})