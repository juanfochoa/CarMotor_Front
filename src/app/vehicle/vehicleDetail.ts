import { Assessor } from "../assessor/assessor";
import { Location } from "../location/location";
import { TestDrive } from "../location/testDrive";
import { Vehicle } from "../vehicle/vehicle";
import { InsurancePolicy } from "./insurancePolicy";
import { MaintenanceHistory } from "./maintenanceHistory";

export class VehicleDetail extends Vehicle {
    maintenances: MaintenanceHistory[] = [];
    insurancePolicies: InsurancePolicy[] = [];
    testDrives: TestDrive[] = [];


    constructor(id: number, brand: string, series: string, lastPlateDigit: string, model: string, type: string, capacity: string, price: number, location: Location, assessor: Assessor) {
        super(id, brand, series, lastPlateDigit, model, type, capacity, price, location, assessor);
    }

}
