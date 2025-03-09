import express, { Application, Request, Response } from "express";
import cors from 'cors'
import routeEstudiante from '../routes/estudiante'
import routeEscuelaPadres from '../routes/escuelapadres'
import db from '../db/connection'
class Server {

    private app: express.Application;
    private port: string;
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001'
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('por ' + this.port)
        })
    }


    routes() {
        this.app.get("/", (req: Request, res: Response) => {
            res.json({
                msg: 'Api Routee'
            })
        })

        this.app.use('/api/estudiantes', routeEstudiante)
        this.app.use('/api/reunionpadres', routeEscuelaPadres)



    }


    midlewares() {
        this.app.use(express.json())

        this.app.use(cors());


    }


    async dbConnect() {

        try {
            await db.authenticate();
            console.log('base conectada')
        }
        catch (error) {
            console.log(error);
        }

    }


}
export default Server;