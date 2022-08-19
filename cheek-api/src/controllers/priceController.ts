import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Price } from "../entities/Price";


class PriceController {

    async create(req: Request, res: Response) { 
        try {
            if(!req.body) {
                res.status(400).send({
                  message: "Content can not be empty!"
                });   
                return;
            }
            // get connection instance to db in app.ts
            const priceRepository = AppDataSource.getRepository(Price);
            const createPrice = priceRepository.create(req.body);
            const savePrice = await priceRepository.save(createPrice);
            return res.send(savePrice);

        } catch (error) {
            return res.status(500).send({
                message: error.message
            });  
        };
    };

    async getPrices(req: Request, res: Response) {
        try {
            // get connection instance to db in app.ts 
            const priceRepository = AppDataSource.getRepository(Price);
            const getPrices = await priceRepository.find();
            return res.send(getPrices);

        } catch (error) {
            return res.status(500).send({
                message: error.message
            });
        };
    };

    async getById(req: Request, res: Response) {
         try {
            const priceRepository = AppDataSource.getRepository(Price);
            const getById = await priceRepository.findOneBy(
                {id: parseInt(req.params.id, 10)}
            );
            if(!getById){
                return res.status(400).send({
                    message: "This price doesn't exist"
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
            const priceId =  req.params.id;
            const priceRepository = AppDataSource.getRepository(Price);
            const updatePrice = await priceRepository.update(
                priceId, req.body
            );
           
            if(updatePrice.affected === 1){
                return res.status(200).send({
                message: "This price with id= " + priceId + " has been updated" 
                })
            };
            return res.send(updatePrice);

        } catch(error) {
            return res.status(500).send({
                message: error.message
            });
        };
    };

    async destroy(req: Request, res: Response) {
        const priceId =  req.params.id;

        try {
            if(!priceId){
                return res.status(400).send({
                    message: "This price doesn't exist"
                })
            };

            const priceRepository = AppDataSource.getRepository(Price);
            const deletePrice = await priceRepository.delete(priceId);

            if(deletePrice.affected === 1){
                return res.status(200).send({
                message: "This price with id= " + priceId + " has been deleted" 
                })
            };

            return res.send(deletePrice);
            
        } catch(error) {
            return res.status(500).send({
                message: "Could not delete price with id= " + priceId
            });
        };
    };
   
};

export default new PriceController()

