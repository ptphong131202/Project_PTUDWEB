const { ObjectId } = require("mongodb");

class OrderService {
    constructor(client) {
        this.Order = client.db().collection("orders");
        this.Product = client.db().collection("products");
    }

    extractOrderData(payload) {
        payload.customer_id = new ObjectId(payload.customer_id);
        const order = {
            customer_id: payload.customer_id,
            products: payload.products,
            total: payload.total,
            status: 0
        };

        Object.keys(order).forEach(
            (key) => order[key] === undefined && delete order[key]
        );
        return order;
    }

    async addToOrder(payload) {
        const order = this.extractOrderData(payload);
        order.created_at = new Date().toLocaleString();
        order.updated_at = new Date().toLocaleString();
        return await this.Order.insertOne(order);
    }

    async findUserOrders(customer_id) {
        const filter = {
            customer_id: new ObjectId(customer_id)
        };
        const cursor = await this.Order.find(filter);
        //Array
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Order.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async find(filter) {
        const cursor = await this.Order.aggregate([
            {
                $lookup: {
                    from: "customers",
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customer",
                },
            },
            {
                $unwind: "$customer",
            },
            {
                $project: {
                    _id: 1,
                    "customer.name": 1, // Lấy tên của category
                    products: 1,
                    total: 1,
                    status: 1,
                    created_at: 1,
                    updated_at: 1,
                },
            },
            {
                $match: filter,
            },
        ]);
        return await cursor.toArray();
    }

    async updateOrderStatus(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const update = {
            status: payload.status,
            updated_at: new Date().toISOString(),
        };

        const result = await this.Order.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );

        if (payload.status === 1) {
            for (const product of result.value.products) {
                const productFilter = {
                    _id: ObjectId.isValid(product.product_id) ? new ObjectId(product.product_id) : null, // Tìm kiếm sản phẩm theo id
                };
                const p = await this.Product.findOne(productFilter);
                const productUpdate = {
                    $inc: {
                        quantity_sale: +product.quantity_sale, // Thay đổi số lượng đã bán của sản phẩm
                        quantity_remain: -product.quantity_sale // Giảm số lượng còn lại của sản phẩm
                    },
                };
                console.log(productUpdate);
                await this.Product.findOneAndUpdate(
                    productFilter,
                    productUpdate,
                    { returnDocument: "after" }
                );
            }
            return result;
        }
        else if (payload.status === 2) {
            return result.value;
        }

    }

    async updateCancelOrderStatus(id) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = {
            status: 2,
            updated_at: new Date().toISOString(),
        };
        const result = await this.Order.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

}

module.exports = OrderService;