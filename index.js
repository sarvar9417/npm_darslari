const express = require('express')
const app = express()
const config = require('config')
const PORT = config.get('port') || 5000
const logger = require('./middleware/logger')
const authorisation = require('./middleware/authorisation')
const morgan = require('morgan')
const laptops = require('./routes/laptops')

// Middleware function -> request lar ishlovchi funksiyalar.
// Ular app.use(middleware) shaklida yoziladi.

// express.json() -> request ni bodysini json formatiga o'girish middleware funksiyasi
app.use(express.json())

// xpress.urlencoded()->
// urlencoded(formani to'ldirib serverga yuborgandagi format (key1=value1&key2value2)) -
// formatidagi ma'lumotni json qilib beradi
app.use(express.urlencoded({extended: true}))

app.use(logger)
app.use(authorisation)
app.use('/api/laptops', laptops)

if(app.get('env')){
    app.use(morgan('tiny'))
    // Dasturning ishlash muhitini aniqlash - developer turadi
    console.log(app.get('env'))
    // set NODE_ENV=production -> muhitni developerdan productionga o'zgartirish
}

console.log(config.get('name'))

// PUG paketi(npm i pug) -> serverdan HTML kod qaytarish uchun ishlatiladi
app.set('view engine', 'pug')

// GET so'roviga javob yuborish
app.get('/', (req, res)=>{
    res.render('index', {title: 'my-express-app', greeting: 'Pug orqali html qaytdi'})
})


app.listen(PORT, ()=>console.log(`App has been started on port ${PORT}`))

