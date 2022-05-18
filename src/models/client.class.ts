import { Dog } from "./dog.class";

export class Client{
    clientNumber: number;
    firstName: string;
    lastName: string ;
    street: string;
    zipCode: string ;
    city: string ;
    email: string;
    landlinePhone: { areaCode: string, number: string };
    mobilePhone: { areaCode: string, number: string };
    whatsApp: boolean;
    dogIds: string[];
    dogData: Dog[];
    clientID: string;


    constructor(obj?: any) {
        this.clientNumber = obj ? obj.clientNumber : '';
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.email = obj ? obj.email : '';
        this.landlinePhone = obj ? obj.landlinePhone : { areaCode: '', number: '' };
        this.mobilePhone = obj ? obj.mobilePhone : { areaCode: '', number: '' };
        this.whatsApp = obj ? obj.whatsApp : false;
        this.dogIds = obj ? obj.dogIds : '';
    }

    toJSON() {
        return {
            clientNumber: this.clientNumber,
            firstName: this.firstName,
            lastName: this.lastName,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            email: this.email,
            landlinePhone: this.landlinePhone,
            mobilePhone: this.mobilePhone,
            whatsApp: this.whatsApp,
            dogIds: this.dogIds
        }
    }

}
