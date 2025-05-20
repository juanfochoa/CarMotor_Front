import { Assessor } from "./assessor";
import { Vehicle } from "../vehicle/vehicle";
import { TestDrive } from "../location/testDrive";
import { Location } from "../location/location";

export class AssessorDetail extends Assessor {
  vehicles: Vehicle[] = [];
  testDrives: TestDrive[] = [];

  constructor(id: number, name: string, uriPhoto: string, contactInfo: string, location: Location) {
    super(id, name, uriPhoto, contactInfo, location);
  }
}
