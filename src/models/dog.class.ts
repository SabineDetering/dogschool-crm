import { ClientDataService } from "src/services/client-data.service";
import { Client } from "./client.class";

// interface DogInterface {
//     dogID: string;
//     age: number;
//     ownerData1: any;
//     ownerData2: any;
//     name : any;
// }

export class Dog {
    name: string;
    birthDate: number;
    age: number;
    chipNumber: string;
    color: string;
    gender: string;
    castrated: boolean;
    breed: string;
    notes: string;
    ownerIds: string[];
    ownerData: Client[];
    dogID: string;


    constructor(obj?: any/*, private clientData: ClientDataService*/) {

        this.name = obj ? obj.name : '';
        this.birthDate = obj ? obj.birthDate : '';
        if (this.birthDate) {
            this.age = Math.round((Date.now() - this.birthDate) / 1000 / 60 / 60 / 24 / 365.25 * 10) / 10;
        }
        this.chipNumber = obj ? obj.chipNumber : '';
        this.color = obj ? obj.color : '';
        this.gender = obj ? obj.gender : '';
        this.castrated = obj ? obj.zipCode : '';
        this.breed = obj ? obj.breed : '';
        this.ownerIds = obj ? obj.ownerIds : '';
        // this.ownerData = this.clientData.clients;
        this.dogID = obj ? obj.dogID : '';
    }

    toJSON() {
        return {
            name: this.name,
            birthDate: this.birthDate,
            chipNumber: this.chipNumber,
            color: this.color,
            gender: this.gender,
            castrated: this.castrated,
            breed: this.breed,
            notes: this.notes,
            ownerIds: this.ownerIds
        }
    }

}