import adminController from "../controller/admin.controller";
import categoriesController from "../controller/categories.controller";
import petcontroller from "../controller/pets.controller";

export const login = async (email: string, password: string)=>{
    const body = {"email":email,"password":password}
    const res = await adminController.postAdminLogin(body)
    return  res.body.token;
}


export const getCategoryId = async (token: string)=> {
    const body = { name: 'Test categories ' + Math.floor(Math.random() * 100000) };
    const res = await categoriesController
        .postCategories(body)
        .set("Authorization", "Bearer " + token);
    return res.body._id;
};

// helper for API pets
export const getPedId = async()=>{
    const petId = '111';
     const res = await petcontroller.getPet(petId);
    return res.body.id
}