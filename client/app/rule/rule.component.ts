import { Component, OnInit, ViewChildren, HostListener } from '@angular/core';
import { Device } from '../shared/models/device.model';
import { DeviceService } from '../services/device.service';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { RuleService } from '../services/rule.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { UtilService, Widget } from '../services/util.service';
import { interval } from 'rxjs/observable/interval';
import { Validators, FormControlName } from '@angular/forms';


@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})

export class RuleComponent implements OnInit {
  ruleInput: Rule;
  searchRule: String;
  ruleProperties: RuleProperties;
  currentRuleList = [];
  editting;
  topic = "smart_sprinkler/#";
  windowWidth = 800;
  loadingMessage;
  allowCreateRule;
  ruleInputInterval;
  devices = [];
  ruleList=[];
  constructor(

    public util: UtilService,
    private deviceService: DeviceService,
    private ruleService: RuleService,
    public toast: ToastComponent,
  ) {
  }
  ngOnInit() {
    this.resetCreateRuleBindings();
    this.ruleProperties = new RuleProperties();
    this.editting = -1;
    this.getRules();
    this.getAttributes();
    this.windowWidth = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = window.innerWidth;
  }
  @HostListener('window:load', ['$event'])
  onLoad(event) {
    this.windowWidth = window.innerWidth;
  }
  getRules() {
    let vm = this;
    this.util.isLoading = true;
    this.loadingMessage = "Loading rules...";
    this.ruleService.getRules().subscribe(
      res => {
        this.util.isLoading = false;
        let allRules = res;
        allRules.forEach(rule => {
          let alreadyKnownRule = 0;
          this.ruleList.forEach(knownRule => {
            if (knownRule.id === rule.id) {
              alreadyKnownRule = 1;
            }
          });
          if (alreadyKnownRule === 0) {
            let _rule = this.getRuleFromJson(rule);
            this.ruleList.push(_rule);
          }
        });
        this.currentRuleList=this.ruleList;

      }
    );
  }
  getAttributes() {
    let vm = this;
    vm.ruleService.getAttributes().subscribe(res => {
      vm.devices = res;
      let deviceList = [];
      vm.devices.forEach(device => {
        deviceList.push(device.name);
      });
      vm.ruleProperties.deviceList = Object.create(deviceList);
    });
  }
  getRuleFromJson(rule) {
    let _rule = new Rule();
    _rule.name = rule.name;
    _rule.id = rule.id;
    _rule.device_id = rule.device_id;
    _rule.sql = rule.sql;
    if (typeof rule.actions.email != 'undefined' || rule.actions.email != null) {
      _rule.contact = rule.actions.email.email_address;
      _rule.action = "email";
      _rule.subject = rule.actions.email.subject;
      _rule.content = rule.actions.email.content;
    }
    else if (rule.actions.sms != 'undefined' || rule.actions.sms != null) {
      _rule.action = "sms";
      _rule.contact = rule.actions.sms.phone_number;
      _rule.content = rule.actions.sms.message;
    }
    if (typeof rule.attributes != 'undefined' || rule.attrbutes != null) {

      _rule.attribute = rule.attributes[0].name;
      _rule.operator = rule.attributes[0].operator;
      _rule.value = rule.attributes[0].value;
    }
    return _rule;
  }
  getRuleFromInput(_ruleInput: Rule) {
    var rule;
    rule.device_id = _ruleInput.device_id;
    rule.name = _ruleInput.name;
    rule.actions.action = _ruleInput.action;
    if (_ruleInput.action === "email") {
      rule.actions.email.email_address = _ruleInput.contact;
      rule.actions.email.subject = _ruleInput.subject;
      rule.actions.email.content = _ruleInput.contact;
    }
    else {
      rule.actions.sms.phone_number = _ruleInput.contact;
      rule.actions.sms.message = _ruleInput.content;
    }
    var attr;
    attr.attribute = _ruleInput.attribute;
    attr.operator = _ruleInput.operator;
    attr.value = _ruleInput.value;
    attr.link_operator = "";
    rule.attributes.push(attr);
    return rule;
  }
  sendCreateRuleRequest(_jsonRequest) {
    let vm = this;
    vm.loadingMessage = "Creating rule...";
    vm.util.isLoading = true;
    vm.ruleService.createRule(_jsonRequest).subscribe(
      res => {
        vm.util.isLoading = false;
        let _rule = vm.getRuleFromJson(res);
        vm.currentRuleList.push(_rule);
        vm.toast.setMessage('Rule added successfully!', 'success');
      },
      error => {
        vm.toast.setMessage('Failed to add rule!', 'danger');
      }
    );
  }
  validateInputs() {
    let isEmailValid = this.isEmailValid();
    let isFilled = this.isAllFilled();
    if (!isFilled) {
      this.allowCreateRule = -1;
    }
    else {
      if (!isEmailValid) {
        this.allowCreateRule = -1;
      }
      else
      {
        this.allowCreateRule = 1;
      }
    }
    return isEmailValid && isFilled;
  }
  isAllFilled() {
    if (this.ruleInput.operator == "Operator" || this.ruleInput.device_id == "Device" || this.ruleInput.action == "Notify User By" || this.ruleInput.value == "" || this.ruleInput.value == null || this.ruleInput.name == "") {
      return false;
    }
    if(this.ruleInput.action=="email")
    {      
      if (this.ruleInput.contact == "" || this.ruleInput.contact == null || this.ruleInput.subject == "" || this.ruleInput.subject == null || this.ruleInput.content == "" ) {
        return false;
      }
      return true;
    }
    else if(this.ruleInput.action=="sms")
    {
      if (this.ruleInput.contact == "" || this.ruleInput.contact == null || this.ruleInput.content == "" ) {
        return false;
      }
      return true;
    }
    else
    {
      return false;
    }
  }
  isEmailValid() {
    if (this.ruleInput.action == 'email') {
      return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.ruleInput.contact));
    }
    else
    {
      return true;
    }
  }
  changeAttributes()
  {
    if (this.ruleInput.device_id != "Device") {
      let attributes = [];
      attributes = Object.create(this.devices.find(x => x.name === this.ruleInput.device_id).attributes);
      this.ruleProperties.attributeList = [];
      attributes.forEach(attribute => {
        this.ruleProperties.attributeList.push(attribute.name);
      });
    }
    this.validateInputs();
  }
  createRule() {
    if (!this.validateInputs()) {
      this.allowCreateRule = -1;
      return;
    }
    else {
      this.allowCreateRule = 1;
      let jsonRequest = this.generateJsonRequest(this.ruleInput);
      this.sendCreateRuleRequest(jsonRequest);
      this.resetCreateRuleBindings();
    }
  }


  generateJsonRequest(_rule: Rule) {
    let vm = this;
    let actions;
    if (_rule.action == "email") {
      actions = {
        "email": {
          "email_address": _rule.contact,
          "subject": _rule.subject,
          "content": _rule.content
        }
      }
    }
    else {
      actions = {
        "sms": {
          "phone_number": _rule.contact,
          "message": _rule.content
        }
      }
    }
    let json = {
      "name": _rule.name,
      "device_id": _rule.device_id,
      "actions": actions,
      "attributes": [
        {
          "name": _rule.attribute,
          "operator": _rule.operator,
          "value": _rule.value
        }
      ]
    };
    return json;
  }
  updateRule() {
    let jsonContent = this.generateJsonRequest(this.ruleInput);
    let ruleID = this.currentRuleList[this.editting].id;
    this.loadingMessage = "Updating rule...";
    this.util.isLoading = true;
    this.ruleService.updateRule(ruleID, jsonContent).subscribe(
      res => {
        this.util.isLoading = false;
        this.currentRuleList[this.editting] = this.ruleInput.clone();
        this.toast.setMessage('Rule updated successfully!', 'success');
        this.resetCreateRuleBindings();
      },
      error => {
        this.util.isLoading = false;
        this.toast.setMessage('Failed to update rule!', 'danger');
      }
    );
  }
  editRule(index) {
    this.editting = index;
    this.ruleInput = clone(<Rule>this.currentRuleList[index]);
  }
  deleteRule(index) {
    this.loadingMessage = "Deleting rules...";
    this.util.isLoading = true;
    this.ruleService.deleteRule(this.currentRuleList[index].id).subscribe(
      res => {
        this.util.isLoading = false;
        this.toast.setMessage('Rule deleted successfully!', 'success');
        this.currentRuleList.splice(index, 1);
      },
      error => {
        this.util.isLoading = false;
        this.toast.setMessage('Failed to delete rule!', 'danger');
      }
    );
  }
  resetCreateRuleBindings() {
    this.ruleInput = new Rule();
    this.editting = -1;
  }
  searchRules()
  {
    if(this.searchRule.length>0)
    {
      let searchRuleList=[];
      this.currentRuleList.forEach(rule=>{
        let ruleName = <string> rule.name;
        let rs=ruleName.includes(this.searchRule.toString());
        if(rs)
        {
          searchRuleList.push(rule);
        }
      });
      this.currentRuleList=searchRuleList;
    }
    else
    {
      this.currentRuleList=this.ruleList;
    }
  }
}
function clone(target) {
  return Object.create(target);
}
export class RuleProperties {
  deviceList = [];
  deviceTypes = [];
  attributeList = [];
  operatorList = [];
  actionInfo = [];
  constructor() {
    this.attributeList = [];
    this.deviceTypes = ["Sensor", "Sprinkler"];
    this.deviceList = [];
    this.operatorList = [">", "<", "=", ">=", "<="];
    let _actionInfo = [];
    _actionInfo.push("email");
    _actionInfo.push("sms");
    this.actionInfo = Object.create(_actionInfo);
  };
}
export class Rule {
  id;
  name;
  device_id;
  attribute;
  operator;
  value;
  action;
  contact;
  subject;
  content;
  sql;
  constructor() {
    this.name = "";
    this.device_id = "Device";
    this.attribute = "Attribute";
    this.operator = "Operator";
    this.value = "";
    this.action = "Notify User By";
    this.contact = "";
    this.subject = "";
    this.content = "";
    this.sql = "";
  }
  clone() {
    return Object.create(this);
  }
}