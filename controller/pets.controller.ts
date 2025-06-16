import * as supertest from 'supertest';
import config from '../config/base.config';
const request = supertest(config.baseUrlPets);


class PetsController {

    postUploadImage(petId:string ,filepath:string){
        return request
        .post('/pet/'+ petId + '/uploadImage')
        .attach('file',filepath);
    }

    putPet(playload:any){
        return request
        .put('/pet')
        .send(playload)
    }

    postPet(petId : string, data: {name?:string; status?:string} ){
        return request
        .post('/pet/' + petId)
        .type('form')
        .send(data)
        
    }
    
    getPetFindByStatus(status:string){
        return request
        .get('/pet/findByStatus')
        .query({status}); // se usa para los query params
    }

    getPet(pedId:string){
        return request
        .get('/pet/'+ pedId)

    }

}

export default new PetsController();