import { async } from "@firebase/util";
import {Request} from "express";
const db = require("../db/models");

class UserService {
    credential: {
        id: number,
        username: string
    };
    body: Request ['body'];
    params: Request ['params'];

    constructor (req: Request){
        this.credential = req.app.locals.credential;
        this.body = req.body;
        this.params = req.params;  
    }
    
    getAll = async () => {
        const users = await db.user.findAll({
       
        attributes: ['username', 'password']
    }); 

    return users;
    }

    store = async () => {
        const {username, password} = this.body;

        const user = await db.user.create({
            username, password
        });

        return user;
    }

    getOne = async () => {
        const { id } = this.params;

        const user = await db.user.findOne({
            where: {
                id
            }
        });

        return user;
    }

    update = async () => {
        const { id } = this.params;
        const {username, password} = this.body;

        const user =  await db.user.update({
            username, password
        },{
            where: {
                id
            }
        });

        return user;
    }

    delete = async () => {
        const { id } = this.params;

        const user = await db.user.destroy({
            where: {
                id
            }
        });

        return user;
    }

}

export default UserService;