export class Training {
    clientID: string;
    dogID: string;
    date: Date;
    // time: {hours:number,minutes:number};
    location: string;
    subject: string;
    topics: string;
    trainingNotes: string;
    homework: string;


    constructor(obj?: any) {
        this.clientID = obj ? obj.clientID : '';
        this.dogID = obj ? obj.dogID : '';
        this.date = obj ? obj.date : '';
        // this.time = obj ? obj.time : '';
        this.location = obj ? obj.location : '';
        this.subject = obj ? obj.subject : '';
        this.topics = obj ? obj.topics : '';
        this.trainingNotes = obj ? obj.trainingNotes : '';
        this.homework = obj ? obj.homework : '';
    }

    toJSON() {
        return {
            clientID: this.clientID,
            dogID: this.dogID,
            date: this.date,
            // time: this.time,
            location: this.location,
            subject: this.subject,
            topics: this.topics,
            trainingNotes: this.trainingNotes,
            homework: this.homework
        }
    }

}
