export class Device {
  id?: string;
  type?: string;
  name?: string;
  battery?: number;
  firmware?: string;
  last_updated?: string;
  model?: string;
  description?: string;

  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.name = data.name;
    this.battery = data.battery;
    this.firmware = data.firmware;
    this.last_updated = data.last_updated;
    this.model = data.model;
    this.description = data.description;
  }
}
