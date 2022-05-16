export class Dog{
    name: string;
    birthDate: number;
    chipNumber: string;
    color: string;
    gender: string;
    castrated: boolean;
    breed: string;
    notes: string;
    owners: string[];


    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.chipNumber = obj ? obj.chipNumber : '';
        this.color = obj ? obj.color : '';
        this.gender = obj ? obj.gender : '';
        this.castrated = obj ? obj.zipCode : '';
        this.breed = obj ? obj.breed : '';
        this.notes = obj ? obj.notes : '';
        this.owners = obj ? obj.owners : [];
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
            owners: this.owners
        }
    }

}