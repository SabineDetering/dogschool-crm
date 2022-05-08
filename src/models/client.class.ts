export class Client{
    firstName: string;
    lastName: string ;
    street: string;
    zipCode: string ;
    city: string ;
    email: string;
    landlinePhone: { areaCode: string, number: string };
    mobilePhone: { areaCode: string, number: string };
    whatsApp: boolean;
    dogs: Dog[];


    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.email = obj ? obj.email : '';
        this.landlinePhone = obj ? obj.landlinePhone : '';
        this.mobilePhone = obj ? obj.mobilePhone : '';
        this.whatsApp = obj ? obj.whatsApp : '';
        this.dogs = obj ? obj.dogs : '';
    }

    toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            email: this.email,
            landlinePhone: this.landlinePhone,
            mobilePhone: this.mobilePhone,
            whatsApp: this.whatsApp,
            dogs: this.dogs
        }
    }

}
