import app from '../app-test';
import * as request from 'supertest';
import { AppDataSource } from '../config/data-source';


describe('product-controller', () => {
    let idNewProduct;
    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    describe('create', () => {
        it('it should create a new product after the post request with 201 status', async ()=> {
            const res = await request(app).post('/api/products').send({
                name: "Test product 1",
                description: "Test create a new product 1",
                category: 1,
                message: "This product has been succefully created"
            });
            idNewProduct = res.body.savedProduct.id;
            expect(res.statusCode).toBe(201)
        });
    });

    describe('getAll', () => {
        it('it should get all products after the get request with 200 status', async ()=> {
            const res = await request(app).get('/api/products')
            expect(res.statusCode).toBe(200)         
        });
    })

    describe('getById', () => {
        it('it should get product by id after the get request with 200 status', async ()=> {
            const res = await request(app).get(`/api/products/${idNewProduct}`)
            const product = { 
                name: "Test product 1",
                description: "Test create a new product 1",
                slug: "test-product-1",
                category: {
                    id: 1,
                    name: "Test category",
                    slug: "test-category"
                }
            }
            expect(res.statusCode).toBe(200) 
            expect(res.body).toMatchObject(product)       
        });
    })

    describe('delete', () => {
        it('should delete product after request with 200 status', async () => {
            const res = await request(app).delete(`/api/products/${idNewProduct}`)
            expect(res.statusCode).toBe(200)
            expect(res.body.message).toEqual(`The product with id=${idNewProduct} has been deleted successfully !`)
        })
    })

    describe('getById', () => {
        it("should retrun a 404 status if id doesn't exist", async ()=> {
            const res = await request(app).get('/api/products/2')
            expect(res.statusCode).toBe(404)
            expect(res.body.message).toEqual("This product doesn't exist")
        });
    })
    
    describe('getById', () => {
        it("return 404 status if id doesn't exist", async ()=> {
            const res = await request(app).get('/api/products/67')         
            expect(res.statusCode).toBe(404) 
            expect(res.body.message).toEqual("This product doesn't exist")   
        });
    })

    describe('delete', () => {
        it("should return 404 status if id doesn't exist", async () => {
            const res = await request(app).delete('/api/products/67')
            expect(res.statusCode).toBe(404)
            expect(res.body.message).toEqual("This product doesn't exist")
        })
    })



  

})