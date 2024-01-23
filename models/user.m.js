const DBProvider = require('../utils/dbUser');


class User {
    constructor(id, username, password, email, fullname, address, avatar, phonenumber) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.fullname = fullname;
        this.address = address;
        this.avatar = avatar;
        this.phonenumber = phonenumber;
    }

    static clone(obj) {
        if(!obj || !obj.id || !obj.username) {
            return null;
        }

        return new User(obj.id, obj.username, obj.password, obj.email, obj.fullname, obj.address, obj.avatar, obj.phonenumber);
    }

    static async getAllUsers() {
        try {
            let data = await DBProvider.getAllUsers();
            if(!data) {
                return data;
            }

            data = data.map(ele => {
                return User.clone(ele);
            });
    
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async addNewUser(newUser) {
        try {
            let data = await DBProvider.addNewUser(newUser);
            if(!data) {
                return data;
            }
            
            data = User.clone(data);
    
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async getUserByID(userID) {
        let data = await DBProvider.getUserById(userID);
        if(!data) {
            return data;
        }
        
        data = User.clone(data);
        return data;
    }

    static async getUserByLogin(username, password) {
        let data = await DBProvider.getUserByLogin(username, password);
        if(!data) {
            return data;
        }
        
        data = User.clone(data);
        return data;
    }

    static async getUserByUsername(username) {
        let data = await DBProvider.getUserByUsername(username);
        if(!data) {
            return data;
        }
        
        data = User.clone(data);
        return data;
    }

    static async updateGeneralProfile(username, fullname, email, phonenumber, address) {
        let data = await DBProvider.updateGeneralProfile(username, fullname, email, phonenumber, address);
        if(!data) {
            return data;
        }
        
        data = User.clone(data);
        return data;
    }

    static async updatePasswordProfile(userID, curPassword, newPassword) {
        let data = await DBProvider.updateGeneralProfile(userID, curPassword, newPassword);
        if(!data) {
            return data;
        }
        
        data = User.clone(data);
        return data;
    }
}

module.exports = User;