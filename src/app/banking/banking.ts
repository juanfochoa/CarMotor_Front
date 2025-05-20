export class Banking {
  id: number;
  name: string;
  uriLogo: string;
  assessorPhone: string;

  constructor(id: number, name: string, uriLogo: string, assessorPhone: string) {
    this.id = id;
    this.name = name;
    this.uriLogo = uriLogo;
    this.assessorPhone = assessorPhone;
  }
}
