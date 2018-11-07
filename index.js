const express = require('express')
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000

app
    .set('view engine', 'ejs')
    .use(bodyParser.urlencoded())
    .get('/', async (request, response) => {   
        const content = await axios.get('https://como-fazer-devpleno-felipe.firebaseio.com/teste.json')                     

        console.log(`Home renderizada com mensagem ${content.data}`)
        response.render('index', {i: content.data})
    })
    .get('/categorias/nova', (req, res) => {
        res.render('categorias/nova')
    })
    .post('/categorias/nova', async (req, res) => {
        await axios.post('https://como-fazer-devpleno-felipe.firebaseio.com/categorias.json', {
            categoria: req.body.categoria
        })
        console.log(`Categoria ${req.body.categoria} salva com sucesso`)
        res.redirect('/categorias')
    })
    app.get('/categorias', async (req, res) => {
        const content = await axios.get('https://como-fazer-devpleno-felipe.firebaseio.com/categorias.json')                     
        
        if (content.data) {
            const categorias = Object
                                    .keys(content.data)
                                    .map(key => {
                                        return {
                                            id: key,
                                            ...content.data[key]
                                        }
                                    })
            console.log(`Categorias retornadas`)
            res.render('categorias/index', { categorias: categorias })
        } else {
            res.render('categorias/index', { categorias: [] })

        }
    })
    .get('/categorias/excluir/:id', async (req, res) => {
        await axios.delete(`https://como-fazer-devpleno-felipe.firebaseio.com/categorias/${req.params.id}.json`)
        console.log(`Categoria ${req.params.id} excluída`)
        res.redirect('/categorias')
    })
    .get('/categorias/editar/:id', async (req, res) => {
        const content = await axios.get(`https://como-fazer-devpleno-felipe.firebaseio.com/categorias/${req.params.id}.json`)
        console.log(`Editando categoria ${req.params.id}`)
        res.render('categorias/editar', {
            categoria: {
                id: req.params.id,
                ...content.data
            }
        })
    })
    .post('/categorias/editar/:id', async (req, res) => {
        const content = await axios.put(`https://como-fazer-devpleno-felipe.firebaseio.com/categorias/${req.params.id}.json`, {
            categoria: req.body.categoria
        })
        console.log(`Categoria ${req.params.id} editada com sucesso`)
        res.redirect('/categorias')
    })
    .listen(port, (err) => {
        if (err) {
            console.log('error')
        } else {
            console.log('Como-Fazer Server is running on port:', port)
        }
})