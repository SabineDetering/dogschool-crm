import { Dog } from "./dog.class";
import { Training } from "./training.class";

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
    dogIds: string[];   // array of dog ids
    dogData: Dog[];     // array of complete dog data
    trainingData: Training[];  // array of complete training data
    ownedDogs: string=''; //list of dog names as string
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
        this.clientID = obj ? obj.clientID : '';
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
