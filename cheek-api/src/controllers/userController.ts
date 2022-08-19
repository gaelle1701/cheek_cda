import bodyParser = require('body-parser');
import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { User } from '../entities/User';


class UserController {

    async create(req: Request, res: Response) { 
        try {
            if(!req.body) {
                res.status(400).send({
                  message: "Content can not be empty!"
                });   
                return;
            }
            // get connection instance to db in app.ts
            const userRepository = AppDataSource.getRepository(User);

            const createUser = userRepository.create(req.body);

            const saveUser = await userRepository.save(createUser);
            return res.send(saveUser);

        } catch (error) {
            return res.status(500).send({
                message: error.message
            });  
        };
    };

    async getUsers(req: Request, res: Response) {
        try {

            // get connection instance to db in app.ts
            const userRepository = AppDataSource.getRepository(User)
            const getUsers = await userRepository.find();
            return res.send(getUsers);

        } catch (error) {
            return res.status(500).send({
                message: error.message
            });
        };

    };

    async getById(req: Request, res: Response) {
         try {

            const userRepository = AppDataSource.getRepository(User);
            const getById = await userRepository.findOneBy(
                {id: parseInt(req.params.id, 10)}
            );
            if(!getById){
                return res.status(400).send({
                    message: "This category doesn't exist"
                })
            }
            return res.send(getById);

        } catch(error) {
            return res.status(500).send({
                message: error.message
            });
        };
    };

    async update(req: Request, res: Response) {
        try {
            const userId =  req.params.id;
            const userRepository = AppDataSource.getRepository(User);

            const updateUser = await userRepository.update(
                userId, req.body
            );

            if(updateUser.affected === 1){
                return res.status(200).send({
                message: "This user with id= " + userId + " has been updated"
                })
            };
            return res.send(updateUser);

        } catch(error) {
            return res.status(500).send({
                message: error.message
            });
        };
    };

    async destroy(req: Request, res: Response) {
        const userId =  req.params.id;
        try {
            if(!userId){
                return res.status(400).send({
                    message: "This user doesn't exist"
                })
            };

            const userRepository = AppDataSource.getRepository(User);
            const deleteUser = await userRepository.delete(userId);

            if(deleteUser.affected === 1){
                return res.status(200).send({
                message: "This user with id= " + userId + " has been deleted"
                })
            };
            
        } catch(error) {
            return res.status(500).send({
                message: "Could not delete User with id=" + userId
            });
        };
    };
    
}

export default new UserController()
