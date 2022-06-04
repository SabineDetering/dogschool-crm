import { Client } from "./client.class";
import { Training } from "./training.class";

export class Dog {
    name: string;
    birthDate: number;
    age: number;//in years
    chipNumber: string;
    color: string;
    gender: string;
    castrated: boolean;
    breed: string;
    notes: string;
    ownerIds: string[];
    ownerData: Client[] = [];
    trainingData: Training[] = [];
    dogID: string;


    constructor(obj?: any) {

        this.name = obj ? obj.name : '';
        this.birthDate = obj ? obj.birthDate : '';
        //calculate age in years
        if (this.birthDate) {
            this.age = Math.round((Date.now() - this.birthDate) / 1000 / 60 / 60 / 24 / 365.25 * 1000) / 1000;
        }
        this.chipNumber = obj ? obj.chipNumber : '';
        this.color = obj ? obj.color : '';
        this.gender = obj ? obj.gender : '';
        this.castrated = obj ? obj.castrated : '';
        this.breed = obj ? obj.breed : '';
        this.notes = obj ? obj.notes : '';
        this.ownerIds = obj ? obj.ownerIds : [];
        // this.ownerData = obj.ownerData ? obj.ownerData : [];
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