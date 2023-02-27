import { useEffect, useState } from "react"
import {Button, ButtonGroup, FloatingLabel, Form, Table} from "react-bootstrap"

const kond = ["bagus", "rusak"]
export default function App() {
  const [data, setData ] = useState([])
  const [input ,setInput] = useState({
    nama_barang : "",
    kondisi : "bagus",
    deskripsi : "",
    harga : 0
  })
  const [selected, setSelected] = useState(-1)
  const getData = async() => {
    try {
      const res =await fetch("/api/cari-data")
      if(!res.ok) return 
      setData(await res.json())
    }catch(err) {
      console.log(err)
    }
  }
  async function handleSubmit(ev) {
    ev.preventDefault()
    try {
      const isEdit = selected >= 0
        const res = await fetch(isEdit ? "/api/update-barang"+selected: "/api/menambahkan", {
          method: isEdit ?"PUT" :  "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        })

        if(!res.ok) return 
       getData()
        setInput({
          nama_barang : "",
          kondisi : "bagus",
          deskripsi : "",
          harga : 0
        })
    }catch(err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  async function hapusData(id) {
    try {
      const res = await fetch("/api/hapus/"+id, {
        method: "DELETE",
      })
      if(!res.ok) return 
      getData()
    }catch(err) {
      console.log(err)
    }
  }

  return(
    <>
    
    <div className="header">
      <h1> JUAL BARANG BEKAS</h1>
    </div>
    <div style={{margin:"0 6rem"}}>

    <form onSubmit={handleSubmit}>
      <h2>BARANG YANG INGIN DIJUAL</h2>
      <FloatingLabel controlId="nama_barang" label="Nama Barang">
        <Form.Control type="text" placeholder="Masukkan nama barang" value={input.nama_barang} onChange={e => setInput({...input, nama_barang: e.target.value})} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Kondisi">
      <Form.Select value={input.kondisi} onChange={e => setInput({...input, kondisi: e.target.value})} aria-label="Floating label select example">
        <option value="Bagus">Bagus</option>
        <option value="Rusak">Rusak</option>
      </Form.Select>
    </FloatingLabel>
    <FloatingLabel controlId="deskripsi" label="Deskripsi">
        
        <Form.Control  value={input.deskripsi} onChange={e => setInput({...input, deskripsi: e.target.value})} type="text" placeholder="Deskripsi"   />

      </FloatingLabel>
     
    <FloatingLabel controlId="harga" label="Harga">

        <Form.Control  value={input.harga} onChange={e => setInput({...input, harga: parseInt(e.target.value)})} type="number" placeholder="Harga"   />

      </FloatingLabel>
      <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
        
        <Button  type="submit" style={{margin:"2rem 0"}} > {selected >= 0 ? "Edit" : "Submit"} </Button>
      </div>
    </form>
    <Table striped bordered hover>
      <thead>
        <th>NO</th>
        <th>Nama Barang</th>
        <th>Kondisi</th>
        <th>Deskripsi</th>
        <th>Harga</th>
        <th>Aksi</th>
      </thead>
      <tbody>
        {
          data.map((el, index) => (
             <tr key={el.id}>
              <td>{index + 1}</td>
              <td>{el.nama_barang}</td>
              <td>{el.kondisi}</td>
              <td>{el.deskripsi}</td>
              <td>{el.harga.toLocaleString("id-ID", {
                style :"currency", currency : "IDR"
              })}</td>
              <td>
                <ButtonGroup>
                  <Button variant="danger" onClick={() => {
                    hapusData(el.id)
                  }}>Hapus</Button>
                  <Button variant="primary" onClick={() => {
                    setSelected(el.id)
                    setInput(el)
                  }}>Edit</Button>
                </ButtonGroup>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
    </div>

    </>
  )
}