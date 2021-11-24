import express from 'express';
import { SERVER_PORT } from '../global/environment';
import * as socket from '../sockets/socket';
import socketIO from 'socket.io';
//socketIO = require('socket.io')

import http from 'http';

export default class Server {
    private static _instance:Server;

    public app:express.Application;
    public port:number;

    public io : socketIO.Server;


    private httpServer : http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = require('socket.io')(this.httpServer, {
            cors: {
                origin: "http://localhost:4200"
        }}); //reemplaza a lo siguiente
        //this.io = socketIO(this.httpServer);
        this.escucharSockets()
    }

    public static get instance(){
        return this._instance || (this._instance = new this())
    }

    private escucharSockets(){
        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {
            console.log('Cliente conectado');

            socket.mensaje(cliente);
            //desconectar
            //const desconectar:(cliente:socketIO.socket) ==> void
            socket.desconectar(cliente)
        });
    }

    start (callback:any){
        this.httpServer.listen(this.port, callback);
    }

}