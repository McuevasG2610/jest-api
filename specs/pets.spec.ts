import controller from '../controller/pets.controller'
import { createPetPayload } from './fixtures/pets.fixture';
import { getPedId } from '../utis/helper';



describe('API PETS', () => {
    
    let id : number;
    const statuses = ['available', 'pending', 'sold'];
    

    beforeAll(async()=>{
        id = await getPedId();
    })


    it('GET /pet/:id', async () => {
        const petId = '111';
        const res = await controller.getPet(petId);

        // 1) assertion status 200
        expect(res.status).toBe(200);

        expect(res.body).toHaveProperty('id', Number(petId));
        expect(res.body).toHaveProperty('name');
        expect(typeof res.body.name).toBe('string');
        expect(res.body).toHaveProperty('status');
        expect(['available', 'pending', 'sold']).toContain(res.body.status);
        // verifica que el arrar photosUrls se encuentre
        expect(Array.isArray(res.body.photoUrls)).toBe(true);
        console.log(res.body);

        /*let id = res.body.id
        console.log('Id pet found is :'+ id)*/
    });

    describe('GET /pet/findByStatus', () => {
        it.each(statuses)('should return pets with status %s', async (status) => {
            const res = await controller.getPetFindByStatus(status);
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            res.body.forEach((pet: any) => {
                expect(pet).toHaveProperty('status', status);
            });
        });
    });

    describe('Update an existing pet', () => {
        /*it.only('PUT/ pet',async () => {
            const res = await controller.postPet(newPet);
           console.log(res.body)
            expect(res.statusCode).toEqual(200)
        });*/

        it('creates a new pet con id dinámico', async () => {
            const payload = createPetPayload();
            const res = await controller.putPet(payload);
            expect(res.status).toBe(200);
            expect(res.body.id).toBe(payload.id);
                       // Print full JSON response for debugging:
           console.log('Update existing pet', JSON.stringify(res.body, null, 2));
        });
    });

   describe('Updates a pet in the store whit form data', () => {
    it.each(statuses)('POST /pet/{petId} and status %s', async (status) => {
    const payload = { name: 'updatedName', status };
    const res = await controller.postPet(id.toString(), payload);
      // 1) Status 200 OK
      expect(res.status).toBe(200);
      console.log(res.body)
      
    });
    
  });
});
