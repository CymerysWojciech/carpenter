

module.exports = class orderRecord{
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.date = obj.date;
        this.investorName = obj.investorName;
    }

    static async showOne(id){
           const [orders] = await pool.execute('SELECT * FROM `orders` WHERE   `id`= :id',{id});

           return new orderRecord(orders[0])
    }

    static async showAll(){
        const [orders] = await pool.execute('SELECT * FROM `orders`');

        return (orders)
    }

    async insert(){
        this.id = this.id ?? uuid4();
            await pool.execute("INSERT INTO `orders` (`id`, `name`, `date`, `investorName`) VALUES (:id, :name, :date, :investorName)",{
                id: this.id,
                name: this.name,
                date: this.date,
                investorName: this.investorName
            })
        return this.id;
    }
    async update(){
        await pool.execute("UPDATE `orders` SET `name`= :name, `date`= :date, `investorName`= :investorName WHERE `id`= :id",{
            name: this.name,
            date: this.date,
            investorName: this.investorName,
            id: this.id
        })
        return this.id
    }

    async delete(){
        await pool.execute("DELETE FROM `orders` WHERE `id` = :id", { id: this.id});
        return this.id;
    }
}