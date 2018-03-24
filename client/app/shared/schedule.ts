export abstract class Schedule {
  id: string;
  name: string;
  type: string;
  is_disabled: boolean;
  abstract getTypeName();
  abstract isDisabled();
  abstract getWhenText();
  abstract getContent(): any;
  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.type = model.type;
    this.is_disabled = model.is_disabled;
  }

  static FIXED_DAILY: string = "Fixed Daily";
  static FIXED_INTERVAL: string = "Fixed Interval";
  static FLEXIBLE_DAILY: string = "Flexible Daily";
  static EDIT_URL: string = "/edit-schedule";
  static ADD_URL: string = "/add-schedule";
  static SCHEDULE_URL: string = "/schedule";
}

export class FixedSchedule extends Schedule {
  isDisabled() {
    return this.is_disabled;
  }
  getContent() {
    return this.content;
  }
  getWhenText() {
    return "Day and Time";
  }
  content: {
    days: string,
    time: {
      hours: number,
      minutes: number
    },
    duration: number
    sprinkler_id: string;
    sprinkler_attributes: Array<string>
    //is_disabled: boolean;
  }
  constructor(model) {
    super(model);
    this.content = <any>model.content;
  }

  getTypeName() {
    return "Fixed Daily";
  }
}

export class IntervalSchedule extends Schedule {
  isDisabled() {
    return this.is_disabled;
  }
  getContent() {
    return this.content;
  }
  getWhenText() {
    return "Time";
  }
  content: {
    sprinkler_id: string,
    sprinkler_attributes: Array<string>,
    interval: {
      value: number,
      type: string
    }
  }
  constructor(model) {
    super(model);
    this.content = <any>model.content;
  }

  getTypeName() {
    return "Fixed Interval";
  }
}

export class FlexibleSchedule extends Schedule {

  isDisabled() {
    return this.is_disabled;
  }
  getContent() {
    return this.content;
  }
  getWhenText() {
    let condition = this.content.conditions[0];
    return condition.device_id + ": " + condition.device_attribute;
  }
  content: {
    sprinkler_id: string,
    sprinkler_attributes: Array<string>,
    is_check_weather_forecast: boolean,
    conditions: Array<{
      device_id: string,
      device_attribute: string,
      operator: string,
      value: number
    }>
  }
  constructor(model) {
    super(model);
    this.content = <any>model.content;
  }

  getTypeName() {
    return "Flexible Daily";
  }
}

export class ScheduleFactory {
  static makeSchedule(model: any): Schedule {
    switch (model.type) {
      case Schedule.FIXED_DAILY:
        return new FixedSchedule(model);
      case Schedule.FIXED_INTERVAL:
        return new IntervalSchedule(model);
      case Schedule.FLEXIBLE_DAILY:
        return new FlexibleSchedule(model);
      default:
        return null;
    }
  }
}
