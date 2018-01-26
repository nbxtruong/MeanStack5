export class Device {
  id?: string;
  type?: string;
  name?: string;
  battery?: number;
  firmware?: string;
  lastupdate?:string;

  constructor(data){
    this.id=data.id;
    this.type= data.type;
    this.name= data.name;
    this.battery= data.battery;
    this.firmware= data.firmware;
    this.lastupdate= data.lastupdate;
  }
}
