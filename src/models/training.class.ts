import { Client } from "./client.class";
import { Dog } from "./dog.class";

export class Training {
    clientID: string;
    dogID: string;
    date: number;
    // time: {hours:number,minutes:number};
    location: string;
    duration: number;
    subject: string;
    topics: string;
    trainingNotes: string;
    homework: string;
    clientName: string;
    clientData: Client;
    dogName: string;
    dogData: Dog;
    trainingID: string;


    constructor(obj?: any) {
        this.clientID = obj ? obj.clientID : '';
        this.dogID = obj ? obj.dogID : '';
        this.date = obj ? obj.date : '';
        // this.time = obj ? obj.time : '';
        this.location = obj ? obj.location : '';
        this.duration = obj ? obj.duration : '';
        this.subject = obj ? obj.subject : '';
        this.topics = obj ? obj.topics : '';
        this.trainingNotes = obj ? obj.trainingNotes : '';
        this.homework = obj ? obj.homework : '';
        this.trainingID = obj ? obj.trainingID : '';
    }

    toJSON() {
        return {
            clientID: this.clientID,
            dogID: this.dogID,
            date: this.date,
            // time: this.time,
            location: this.location,
            duration: this.duration,
            subject: this.subject,
            topics: this.topics,
            trainingNotes: this.trainingNotes,
            homework: this.homework
        }
    }

}
