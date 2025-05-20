import { Location } from "../location/location";

export class Assessor {
    id: number;
    name: string;
    uriPhoto: string;
    contactInfo: string;
    location: Location;

    constructor(id: number, name: string, uriPhoto: string, contactInfo: string, location: Location) {
        this.id = id;
        this.name = name;
        this.uriPhoto = uriPhoto;
        this.contactInfo = contactInfo;
        this.location = location;
    }
}
