const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')

const categorias = require('./routes/categorias')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded())

const port = process.env.PORT || 3000

app.get('/', async (request, response) => {   
    const content = await axios.get('https://como-fazer-devpleno-felipe.firebaseio.com/teste.json')                     

    console.log(`Home renderizada com mensagem ${content.data}`)
    response.render('index', {i: content.data})
})

app.use('/categorias', categorias)

app.listen(port, (err) => {
    if (err) {
        console.log('error')
    } else {
        console.log('Como-Fazer Server is running on port:', port)
    }
})
