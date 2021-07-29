const express = require('express')
const Joi = require('joi')
const router = express.Router()
// GET so'roviga javob yuborish
router.get('/', (req, res)=>{
    res.send(laptops)
})

// GET so'rovi parametrlar  bilan kelganda, parametrlarni ilib olib javob yuborish
//router.get('/api/maqolalar/:years/:month', (req, res)=>{
//    const reqParams = req.params
//    res.send(reqParams.year)
// })
//
// // GET so'rovi QUERY PARAMS lar bilan kelganda ilib olib javob yuborish
// router.get('/api/querys', (req, res)=>{
//     const reqQuery = req.query
//     res.send(reqQuery)
// })

// ID parametri kelganda ma'lumotni qaytarish
const laptops = [
    {
        id: 1,
        name: 'MacBoook Air'
    },
    {
        id: 2,
        name: 'MacBoook Pro'
    },
    {
        id: 3,
        name: 'Acer'
    },
    {
        id: 4,
        name: 'Lenovo'
    }]
router.get('/:id', (req, res)=>{
    const laptop = laptops.find(l=>l.id === parseInt(req.params.id))
    if (!laptop){
        return res.status(404).json({message: 'Bunday ID li laptop topilmadi'})
    } else {
        return res.send(laptop.name)
    }
})

// POST metodidan foydalanib yangi ma'lumot qo'shish
router.post('/', (req, res)=>{
    const { error } = validateLaptop(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }

    const laptop = {
        id: laptops.length + 1,
        name: req.body.name
    }
    laptops.push(laptop)
    res.status(201). send(laptop)
})

// PUT metodi bilan ishlash
router.put('/:id', (req, res)=>{
    // 1. Kitobni bazadon qidirib topish kk
    const laptop = laptops.find(l=>l.id === parseInt(req.params.id))

    // 2. Agarda laptop bazada bo'lmasa 404 xato qaytarish kk
    if (!laptop){
        return res.status(404).send('Ushbu ID li kitob bazada mavjud emas')
    }

    // 3. Agar kitob topilsa so'rovni validatsoya qilish
    const { error } = validateLaptop(req.body)

    // 4. Agar so'rov valodatsiyadan o'tmasa, 400 xato qaytarish kk
    if (error){
        return res.status(400).send(error.details[0].message)
    }
    // 5. kitobni yangilash
    laptop.name = req.body.name
    // 6. yangilangan kitobni qaytarish
    res.send(laptop)
})

// DELETE methodi bilan ishlash
router.delete('/:id', (req, res)=>{
    // 1. Kitobni ID si bo'yicha izlab topamiz
    const laptop = laptops.find(l=>l.id === parseInt(req.params.id))
    // 2. Agar bunday kitob topilmasa 404 qaytaramiz
    if (!laptop){
        return res.status(404).send('Bunday ID li laptop topilmadi')
    }
    // 3. Topilsa uni o'chirib tashlaymiz
    const index = laptops.indexOf(laptop)
    laptops.splice(index,1)
    // 4. Topilgan kitobni qaytarib beramiz
    res.send(laptop)
})

function validateLaptop(laptop) {
    const laptopSchema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return laptopSchema.validate(laptop)
}

module.exports = router
