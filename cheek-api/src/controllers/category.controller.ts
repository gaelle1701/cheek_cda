import { Request, Response } from 'express';
import { categoryRepository } from '../repository/category.repository';

class CategoryController {
  async create(req: Request, res: Response) {
    try {
      if (!req.body.name) {
        return res.status(400).send({
          message: 'Content can not be empty!',
        });
      }

      const saveCategory = await categoryRepository.createCategory(req.body);
      return res.send(saveCategory);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getCategories(req: Request, res: Response) {
    try {
      const getCategories = await categoryRepository.find();
      return res.send(getCategories);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const category = await categoryRepository.findBydId(+req.params.id);
      if (!category) {
        return res.status(400).send({
          message: "This category doesn't exist",
        });
      }
      return res.send(category);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const category = await categoryRepository.findBydId(+req.params.id);
      if (!category) {
        return res.status(400).send({
          message: "This category doesn't exist",
        });
      }

      const updateCategory = await categoryRepository.save(
        Object.assign(category, req.body),
      );
      if (updateCategory.affected === 1) {
        return res.status(200).send({
          message:
            'This category with id= ' + category.id + ' has been updated',
        });
      }
      return res.send(updateCategory);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async destroy(req: Request, res: Response) {
    const category = await categoryRepository.findBydId(+req.params.id);
    try {
      if (!category) {
        return res.status(400).send({
          message: "This category doesn't exist",
        });
      }

      const deleteCategory = await categoryRepository.delete(category.id);
      if (deleteCategory.affected === 1) {
        return res.status(200).send({
          message:
            'This category with id= ' + category.id + ' has been deleted',
        });
      }
      return res.send(deleteCategory);
    } catch (error) {
      return res.status(500).send({
        message: 'Could not delete category with id= ' + category.id,
      });
    }
  }
}

export default CategoryController;
