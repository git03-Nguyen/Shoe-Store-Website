const dbCart = require('../utils/dbCart');

// id int GENERATED ALWAYS AS IDENTITY,
// userId int not null,
// productId int not null,
// quantity int,
// color varchar(100),
// size real,
// postingDate timestamp,

module.exports = class CartList {
    constructor(cartList) {
        this.id = cartList.id;
        this.userId = cartList.userid;
        this.productId = cartList.productid;
        this.quantity = cartList.quantity;
        this.color = cartList.color;
        this.size = cartList.size;
        this.postingDate = cartList.postingdate;
    }

    static async getCartListById(id) {
        let data = await dbCart.getCartListById(id);
        return data !== null ? new CartList(data) : null;
    }

    static async getCartListsByUserId(userId) {
        let list = [];
        let data = await dbCart.getCartListsByUserId(userId);
        data.forEach((value, index, array) => { list.push(new CartList(value)); });
        return list;
    }

    static async getCartListByUserIdAndProductId(userId, productId) {
        let data = await dbCart.getCartListByUserIdAndProductId(userId, productId);

        return data !== null ? new CartList(data) : null;
    }

    static async addCartList(cartList) {
        return await dbCart.addCartList(cartList);
    }

    static async updateCartList(cartList) {
        return await dbCart.updateCartList(cartList);
    }

    static async removeCartListById(id) {
        return await dbCart.removeCartListById(id);
    }
}
