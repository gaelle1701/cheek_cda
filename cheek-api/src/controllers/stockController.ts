import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Stock } from "../entities/Stock";

class StockController {
    async create(req: Request, res: Response) { 
        try {
            if(!req.body) {
                res.status(400).send({
                  message: "Content can not be empty!"
                });   
                return;
            }
            // get connection instance to db in app.ts
            const stockRepository = AppDataSource.getRepository(Stock);
            const createStock = stockRepository.create(req.body);
            const saveStock = await stockRepository.save(createStock);
            return res.send(saveStock);

        } catch (error) {
            return res.status(500).send({
                message: error.message
            });  
        };
    };

    async getStocks(req: Request, res: Response) {
        try {
            // get connection instance to db in app.ts 
            const stockRepository = AppDataSource.getRepository(Stock);
            const getStocks = await stockRepository.find();

            return res.send(getStocks);

        } catch (error) {
            return res.status(500).send({
                message: error.message
            });
        };

    };

    async getById(req: Request, res: Response) {
         try {
            const stockRepository = AppDataSource.getRepository(Stock);
            const getById = await stockRepository.findOneBy(
                {id: parseInt(req.params.id, 10)}
            );
            if(!getById){
                return res.status(400).send({
                    message: "This stock doesn't exist"
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
            const stockId =  req.params.id;

            const stockRepository = AppDataSource.getRepository(Stock);
            const updateStock = await stockRepository.update(
                stockId, req.body
            );
           
            if(updateStock.affected === 1){
                return res.status(200).send({
                message: "This stock with id= " + stockId + " has been updated"
                })
            };
            return res.send(updateStock);

        } catch(error) {
            return res.status(500).send({
                message: error.message
            });
        };
    };

    async destroy(req: Request, res: Response) {
        const stockId =  req.params.id;

        try {
            if(!stockId){
                return res.status(400).send({
                    message: "This stock doesn't exist"
                })
            };

            const stockRepository = AppDataSource.getRepository(Stock);
            const deleteStock = await stockRepository.delete(stockId);

            if(deleteStock.affected === 1){
                return res.status(200).send({
                message: "This stock with id= " + stockId + " has been deleted" 
                })
            };

            return res.send(deleteStock);
            
        } catch(error) {
            return res.status(500).send({
                message: "Could not delete stock with id= " + stockId
            });
        };
    };
   
};

export default new StockController()

