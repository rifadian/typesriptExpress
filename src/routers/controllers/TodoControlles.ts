import { async } from "@firebase/util";
import {Request, Response} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import IController from './ControllerInterface';
import TodoService from "../../services/TodoService";
import todo from "../../db/models/todo";




class TodoController implements IController{
    index = async (req: Request , res: Response): Promise <Response> => {
        const service: TodoService = new TodoService(req);
        const todos = await service.getAll();

        return res.send({
            data: todos,
            message: ""
        });
    }
    create = async (req: Request, res: Response):Promise <Response> => {
        const service: TodoService = new TodoService(req);
        const todos = await service.store();

        return res.send({
            data: todos,
            message: "todo created"
        });
    }
    show = async (req: Request, res: Response):Promise <Response> => {
        const service: TodoService = new TodoService(req);
        const todos = await service.getOne();

        return res.send({
            data: todos,
            message: ""
        });

    }
    update = async (req: Request, res: Response):Promise <Response> => {
        const service: TodoService = new TodoService(req);
        const todos = await service.update();

        return res.send({
            data: todos,
            message: "todo updated"
        })
    }
    delete = async (req: Request, res: Response):Promise <Response> => {
        const service: TodoService = new TodoService(req);
        const todos = await service.delete();

        return res.send({
            data: todos,
            message: "todo deleted"
        });
    }
    


}

export default new TodoController();