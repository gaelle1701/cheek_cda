import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities/Category";

class CategoryController {
    async create(req: Request, res: Response) { 
        try {
            if(!req.body.name) {
                res.status(400).send({
                  message: "Content can not be empty!"
                });   
                return;
            }
            // get connection instance to db in app.ts
            const categoryRepository = AppDataSource.getRepository(Category);
            const createCategory = categoryRepository.create(
                { name: req.body.name, slug: req.body.slug }
            );
            const saveCategory = await categoryRepository.save(createCategory);
            return res.send(saveCategory);

        } catch (error) {
            return res.status(500).send({
                message: error.message
            });  
        };
    };

    async getCategories(req: Request, res: Response) {
        try {
            // get connection instance to db in app.ts 
            const categoryRepository = AppDataSource.getRepository(Category);
            const getCategories = await categoryRepository.find();
             // map to categories and copy current category 
            return res.send(getCategories);

        } catch (error) {
            return res.status(500).send({
                message: error.message
            });
        };

    };

    async getById(req: Request, res: Response) {
         try {
            const categoryRepository = AppDataSource.getRepository(Category);
            const getById = await categoryRepository.findOneBy(
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
            const categoryId =  req.params.id;

            // if(!categoryId){
            //     return res.status(400).send({
            //         message: "This category doesn't exist"
            //     })
            // };

            const categoryRepository = AppDataSource.getRepository(Category);
            const updateCategory = await categoryRepository.update(
                categoryId, req.body
            );
           
            if(updateCategory.affected === 1){
                return res.status(200).send({
                message: "This category with id= " + categoryId + " has been updated" 
                })
            };
            return res.send(updateCategory);

        } catch(error) {
            return res.status(500).send({
                message: error.message
            });
        };
    };

    async destroy(req: Request, res: Response) {
        const categoryId =  req.params.id;

        try {
            if(!categoryId){
                return res.status(400).send({
                    message: "This category doesn't exist"
                })
            };

            const categoryRepository = AppDataSource.getRepository(Category);
            const deleteCategory = await categoryRepository.delete(categoryId);

            if(deleteCategory.affected === 1){
                return res.status(200).send({
                message: "This category with id= " + categoryId + " has been deleted" 
                })
            };

            return res.send(deleteCategory);
            
        } catch(error) {
            return res.status(500).send({
                message: "Could not delete category with id= " + categoryId
            });
        };
    };
   
};

export default new CategoryController()

