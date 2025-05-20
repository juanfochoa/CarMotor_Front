export class Location {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    schedule: string;

    constructor(id: number, name: string, address: string, phoneNumber: string, schedule: string) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.schedule = schedule;
    }
}
