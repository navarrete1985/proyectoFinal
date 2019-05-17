class Common {

    reset(fields) {
        if (fields !== undefined && fields !== null && Array.isArray(fields)) {
            fields.forEach(value => {
                this['value'] = null;
            })
        }else {
            Object.keys(this).forEach(key => {
                this[key] = null;
            });
        }
    }

}

class User extends Common{

    constructor() {
        super();
        this.name = '';
        this.lastName = '';
        this.email = '';
        this.address = '';
        this.connect = null;
        this.establishment_id = '';
        this.favorites = [];
        this.gender = null;
        this.password = '';
        this.phone_number = null,
        this.photo_url = '';
        this.table_id = '';
    }

}

class Stablishment extends Common{
    constructor() {
        super();
        this.description = '';
        this.image_logo = 'default.png';
        // this.location={
        //     lat:null,
        //     long:null
        // };
        this.name = '';
        this.ocupation = null;
        this.photo_url = [];
        this.uuid = '';
        
    }
}

module.exports = {User,Stablishment};
