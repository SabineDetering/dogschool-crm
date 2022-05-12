export class Dog{
    name: string;
    birthDate: number;
    gender: string;
    castrated: boolean;
    breed: string;
    shelter: boolean;
    health: string;
    owners: string[];


    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.gender = obj ? obj.gender : '';
        this.castrated = obj ? obj.zipCode : '';
        this.breed = obj ? obj.breed : '';
        this.shelter = obj ? obj.shelter : '';
        this.health = obj ? obj.health : '';
        this.owners = obj ? obj.owners : '';
    }

    toJSON() {
        return {
            name: this.name,
            birthDate: this.birthDate,
            gender: this.gender,
            castrated: this.castrated,
            breed: this.breed,
            shelter: this.shelter,
            health: this.health,
            owners: this.owners
        }
    }

}