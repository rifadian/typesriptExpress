import {Request, Response} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import IController from './ControllerInterface';
import UserService from "../../services/UserService";
import { async } from "@firebase/util";
import Authentication from "../../utils/Authentication";
import db from "../../db/models";


class UserController implements IController{
    index = async (req: Request , res: Response): Promise <Response> => {
        const service: UserService = new UserService (req);
        const users = await service.getAll();


        return res.send({
            data: users,
            message: ""
        });
    }

    create = async (req: Request, res: Response): Promise <Response> => {
        const service: UserService = new UserService(req);
        const users = await service.store();

        return res.send({
            data: users,
            message: ""
        });
    }

    // create = async(req: Request, res: Response) : Promise<Response> => {
    //     let {username, password} = req.body;
    //     const hashedPassword: string = await Authentication.passwordHash(password);

    //    await db.user.create({username, password: hashedPassword});
    //     return res.send("register sukses");
    // }

    show = async (req: Request, res: Response): Promise <Response> => {
        const service: UserService = new UserService(req);
        const users = await service.getOne();

        return res.send({
            data: users,
            message: ""
        });

    }

    update = async (req: Request, res: Response):Promise <Response> => {
        const service: UserService = new UserService(req);
        const todos = await service.update();

        return res.send({
            data: todos,
            message: "user updated"
        })
    }
    delete = async (req: Request, res: Response):Promise <Response> => {
        const service: UserService = new UserService(req);
        const todos = await service.delete();

        return res.send({
            data: todos,
            message: "user deleted"
        });
    }
    


}

export default new UserController();