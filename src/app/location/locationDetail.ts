import { Assessor } from "../assessor/assessor";
import { Vehicle } from "../vehicle/vehicle";
import { Location } from "./location";
import { TestDrive } from "./testDrive";

export class LocationDetail extends Location {
    testDrives: TestDrive[] = [];
    vehicles: Vehicle[] = [];
    assessors: Assessor[] = [];

    constructor(id: number, name: string, address: string, phoneNumber: string, schedule: string) {
        super(id, name, address, phoneNumber, schedule);
    }

}
