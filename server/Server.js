import express from "express"
import {PrismaClient} from "@prisma/client"
const app = express()

const prisma = new PrismaClient()

app.use(express.json())

app.get("/cari-data", async (req,res) => {
    try {
        const data = await prisma.barang_bekas.findMany()
        return res.status(200).json(data)
    }catch(err) {
        console.log(err)
        return res.status(500).send("Server Error")
    }
})


app.post("/menambahkan", async (req, res) => { 
try {
    const data = await prisma.barang_bekas.create({
        data : req.body
    })
    return res.status(200).json(data)
}   catch(err) {
    console.log(err)
    return res.status(500).send("Server Error")
}
})

app.delete("/hapus/:id", async (req, res) => {
 try {
    const data = await prisma.barang_bekas.delete({
        where : {
            id : parseInt(req.params.id)
        }
    })
    return res.status(200).json(data)
 }  catch(err) {
    console.log(err)
    return res.status(500).send("Server Error")
 } 
})

app.put("/update-barang/:id", async (req,res) => {
    try {
        const data = await prisma.barang_bekas.update({
            where : {
                id : parseInt(req.params.id)
            }, 
            data : req.body
        })
        return res.status(200).json(data)
    }catch(err) {
        console.log(err)
        return res.status(500).send("Server Error")
    }
})

app.listen(3000, () => {
    console.log("Server is running in " + 3000)
})