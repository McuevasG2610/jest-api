import { from } from 'form-data';
import config from '../config/base.config';
import adminController from '../controller/admin.controller';
import controller from  '../controller/categories.controller';
import {getCategoryId,login} from '../utis/helper';


describe('Categories', () => {
    it('GET / Categories', async() =>{
        const res = await controller.getCategories();
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(1);
        expect(Object.keys(res.body[0])).toEqual(['_id','name'])
    });

    describe('Crate Categories', () => {
        let token;
        beforeAll(async()=>{
            /*const data = {"email":config.email,"password":config.password}
            const res = await adminController.postAdminLogin(data)
            //console.log(res.body);
            token = res.body.token;*/
           token= await login(config.email,config.password)
        
        })
       
       it('POST/ categories', async()=> {
             const body = {'name': 'Test Brand ' + Math.floor(Math.random() * 100000),}
             const res = await controller
                .postCategories(body)
                .set("Authorization", "Bearer " + token)
            console.log(res)
            expect(res.statusCode).toEqual(200)
            expect(res.body.name).toEqual(body.name)
            })   
    });
    
    describe('Update categories', () => {
         let token,postRes, categoriId;

        beforeAll(async()=>{
          
           token= await login(config.email,config.password)

             /*const body = {'name': 'Test categories ' + Math.floor(Math.random() * 100000),}
                postRes = await controller
                .postCategories(body)
                .set("Authorization", "Bearer " + token)*/

            categoriId = await getCategoryId(token)
               
            })  
      
        it('PUT/ categories', async()=> {
             const body = {'name': 'Test categories Updated ' + Math.floor(Math.random() * 100000),}
                 const res = await controller
                 //.putCategories(postRes.body._id,body)
                  .putCategories(categoriId,body)
                 .set("Authorization", "Bearer " + token)
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(body.name);
            console.log(res.body)
    });
 });

    describe('Delete Categories', () => {
        let token,categoryId;

        beforeAll(async()=>{
         
           token= await login(config.email,config.password)

            /* const postBody = {'name': 'Test categories ' + Math.floor(Math.random() * 100000),}
             const postRes = await controller
                .postCategories(postBody)
                .set("Authorization", "Bearer " + token)
                categoryId = postRes.body._id*/

            categoryId = await getCategoryId(token)
            })  

        it('DELETE / categories',async () => {
            const res = await controller
            .deleteCategories(categoryId)
            .set("Authorization", "Bearer " + token);

            expect(res.statusCode).toEqual(200)
        });
        
        
    });
    
});