const dbCategory = require('../utils/dbCategory');

module.exports = class Category{
    constructor(category){
        this.id = category.id;
        this.categoryName = category.categoryname;
        this.categoryDescription = category.categorydescription;
        this.creationDate = category.creationdate;
        this.updateDate = category.updatedate;
    }

    static async getAllCategories(){
        let data = await dbCategory.getAllCategories();
        let list = [];
        for(let i = 0; i < data.length; i++){
            list.push(new Category(data[i]));
        }

        return list;
    } 

    static async editCategory(id, name, description){
        let data = await dbCategory.editCategory(id, name, description);
        return data;
    }

    static async addNewCategory(category){
        let data = await dbCategory.addNewCategory(category);
        return data;
    }
    static async deleteCategory(id){
        let data = await dbCategory.deleteCategory(id);
        return data;
    }
}