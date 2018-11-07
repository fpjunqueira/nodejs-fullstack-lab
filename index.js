const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const categorias = require('./routes/categorias')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded())

const port = process.env.PORT || 3000

app.get('/', async (req, res) => {   
    console.log(`Home renderizada`)
    res.render('index')
})

app.use('/categorias', categorias)

app.listen(port, (err) => {
    if (err) {
        console.log('error')
    } else {
        console.log('Como-Fazer Server is running on port:', port)
    }
})
