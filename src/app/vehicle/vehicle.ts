import { Assessor } from "../assessor/assessor";
import { Location } from "../location/location";

export class Vehicle {
    id: number;
    brand: string;
    series: string;
    lastPlateDigit: string;
    model: string;
    type: string;
    capacity: string;
    price: number;
    location: Location;
    assessor: Assessor;

    constructor(id: number, brand: string, series: string, lastPlateDigit: string, model: string, type: string, capacity: string, price: number, location: Location, assessor: Assessor) {
        this.id = id;
        this.brand = brand;
        this.series = series;
        this.lastPlateDigit = lastPlateDigit;
        this.model = model;
        this.type = type;
        this.capacity = capacity;
        this.price = price;
        this.location = location;
        this.assessor = assessor;
    }
}
