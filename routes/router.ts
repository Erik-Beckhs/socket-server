import { Router, Request, Response } from "express";

const router = Router()

router.get('/mensajes',(req:Request, res:Response)=>{
    res.json({
        ok:true,
        mensaje:'todo esta bien'
    });
    
}) ;

router.post('/mensajes/:id',(req:Request, res:Response)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const id = req.params.id

    res.json({
        ok:true,
        nombre,
        edad,
        id
    });
    
}) ;

export default router;