const api = require('../api')

const novaForm = (req, res) => {
    res.render('categorias/nova')
}

const nova = async (req, res) => {
    await api.create('categorias', {
        categoria: req.body.categoria
    })
    console.log(`Categoria ${req.body.categoria} salva com sucesso`)
    res.redirect('/categorias')
}

const list = async (req, res) => {
    const categorias = await api.list('categorias')
    console.log(`Listando categorias ${categorias}`)
    res.render('categorias/index', { categorias })
}

const excluir =  async (req, res) => {
    await api.apagar('categorias', req.params.id)
    console.log(`Categoria ${req.params.id} excluída`)
    res.redirect('/categorias')
}

const editarForm = async (req, res) => {
    const categoria = await api.get('categorias', req.params.id)
    console.log(`Editando categoria ${req.params.id}`)
    res.render('categorias/editar', {
        categoria
    })
}

const editar = async (req, res) => {
    const content = await api.update('categorias', req.params.id, {
        categoria: req.body.categoria
    })        
    console.log(`Categoria ${req.params.id} editada com sucesso`)
    res.redirect('/categorias')
}

module.exports = {
    novaForm,
    nova,
    list,
    excluir,
    editarForm,
    editar
}