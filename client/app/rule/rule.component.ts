import { Component, OnInit } from '@angular/core';
import { Device } from '../shared/models/device.model';
import { DeviceService } from '../services/device.service';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { RuleService } from '../services/rule.service';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})

export class RuleComponent implements OnInit {
  deviceList: Device[];
  ruleInput: Rule;
  searchRule: String;
  ruleProperties: RuleProperties;
  ruleList = [];
  editting;
  sqlSelect = "SELECT";
  sqlFrom = "FROM";
  sqlWhere = "WHERE";
  sqlDeviceId = "device_id";
  sqlAnd = "AND";
  sqlSpaceBar =" ";
  sqlSingleQuotationMark="'";
  topic = "smart_sprinkler/#";

  constructor(
    private deviceService: DeviceService,
    private ruleService: RuleService,
  ) {
  }
  ngOnInit() {
    this.resetCreateRuleBindings();
    this.ruleProperties = new RuleProperties();
    this.editting = -1; 
    this.getDevices();
    this.getRules();

  }
  generateQuery(inputRule) {
    var query = "";
    if (inputRule.device_id != null) {
      query += this.sqlSelect + this.sqlSpaceBar
        + this.sqlSingleQuotationMark+inputRule.attribute +this.sqlSingleQuotationMark+ this.sqlSpaceBar
        + this.sqlFrom + this.sqlSpaceBar
        + this.sqlSingleQuotationMark+ this.topic+this.sqlSingleQuotationMark + this.sqlSpaceBar
        + this.sqlWhere + this.sqlSpaceBar
        + this.sqlDeviceId + this.sqlSpaceBar+ "="+this.sqlSpaceBar+this.sqlSingleQuotationMark + inputRule.device_id + this.sqlSingleQuotationMark + this.sqlSpaceBar + this.sqlAnd + this.sqlSpaceBar
        + inputRule.attribute + this.sqlSpaceBar + inputRule.operator + this.sqlSpaceBar + inputRule.value;
      return query;
    }
    return null;

  }
  getDevices() {
    let vm = this;
    this.deviceService.getListDevices().subscribe(
      res => {
        vm.deviceList = res;
        vm.deviceList.forEach(function (device) {
          for(let i=0;i<vm.ruleProperties.deviceTypes.length;i++)
          {
            if(device.type===vm.ruleProperties.deviceTypes[i])
            {
              vm.ruleProperties.deviceList.push(device.name);
              break;
            }
          }
        });
      },
      error => {
        // Not implemented yet
      }
    );
  }
  getRules() {
    let vm = this;
    this.ruleService.getRules().subscribe(
      res => {
        let allRules = res;
        allRules.forEach(rule => {
          let alreadyKnownRule = 0;
          this.ruleList.forEach(knownRule=>{
            if(knownRule.id===rule.id)
            {
              alreadyKnownRule=1;
            }
          });
          if(alreadyKnownRule===0)
          {
            let _rule = this.getRuleFromJson(rule);      
            this.ruleList.push(_rule);
          }
        });

      }
    );
  }
  getRuleFromJson(rule)
  {
      let _rule = new Rule();
      _rule.name = rule.name;
      _rule.id= rule.id;
      _rule.device_id=rule.device_id;
      _rule.sql=rule.sql;
      if(typeof rule.actions.email!='undefined' || rule.actions.email != null)
      {
        _rule.contact=rule.actions.email.email_address;
        _rule.action="email";
        _rule.subject=rule.actions.email.subject;
        _rule.content=rule.actions.email.content;
      }
      else if( rule.actions.sms !='undefined' || rule.actions.sms!=null)
      {
        _rule.action="sms";
        _rule.contact=rule.actions.sms.phone_number;
        _rule.content=rule.actions.sms.message;
      }
      if(typeof rule.attributes != 'undefined' || rule.attrbutes != null)
      {
          
          _rule.attribute=rule.attributes[0].name;
          _rule.operator =rule.attributes[0].operator;
          _rule.value = rule.attributes[0].value;
      }
      return _rule;
  }
  getRuleFromInput(_ruleInput:Rule)
  {
    var rule;
    rule.device_id = _ruleInput.device_id;
    rule.name=_ruleInput.name;
    rule.actions.action=_ruleInput.action;
    if(_ruleInput.action==="email")
    {
      rule.actions.email.email_address=_ruleInput.contact;
      rule.actions.email.subject=_ruleInput.subject;
      rule.actions.email.content=_ruleInput.contact;
    }
    else
    {
      rule.actions.sms.phone_number=_ruleInput.contact;
      rule.actions.sms.message=_ruleInput.content;
    }
    var attr;
    attr.attribute = _ruleInput.attribute;
    attr.operator = _ruleInput.operator;
    attr.value = _ruleInput.value;
    attr.link_operator="";
    rule.attributes.push(attr);
    return rule;
  }
  sendCreateRuleRequest(_jsonRequest) {
    let vm = this;
    this.ruleService.createRule(_jsonRequest).subscribe(
      res => {
        let _rule = this.getRuleFromJson(res);
        this.ruleList.push(_rule);
        //Notify user (Not implemented)
      },
      error=>{
        //Notify user (Not implemented)
      }
    );
  }
  validateInputs() {
    return this.isAllFilled();
  }
  isAllFilled() {
    if (this.ruleInput.operator=="Operator"||this.ruleInput.device_id == "Device" || this.ruleInput.action == "Notify User By"||this.ruleInput.value == "" || this.ruleInput.name == "") {
      return false;
    }
    if (this.ruleInput.action != "Notify User By") {
      if (this.ruleInput.contact == "" || this.ruleInput.subject == "" && this.ruleInput.action!="sms" || this.ruleInput.content == "") {
        return false;
      }
    }
    return true;
  }
  createRule() {
    if (!this.validateInputs()) {
      // Not implemented yet
      return;
    }
    let jsonRequest = this.generateJsonRequest(this.ruleInput);
    this.sendCreateRuleRequest(jsonRequest);
    this.resetCreateRuleBindings();
  }
  generateJsonRequest(_rule:Rule) {
    let vm = this;
    let sqlQuery = this.generateQuery(_rule);
    let actions;
    if(_rule.action=="email")
    {
      actions={
        "email":{
          "email_address": _rule.contact,
          "subject": _rule.subject,
          "content": _rule.content  
        }
      }
    }
    else
    {
      actions={
        "sms":{
          "phone_number": _rule.contact,
          "message": _rule.content  
        }
      }
    }
    let json = {
      "name": _rule.name,
      "sql": sqlQuery,
      "device_id":_rule.device_id,
      "actions": actions,
      "attributes":[
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
    console.log(this.ruleInput);
    let jsonContent = this.generateJsonRequest(this.ruleInput);
    let ruleID = this.ruleList[this.editting].id;
    this.ruleService.updateRule(ruleID,jsonContent).subscribe(
      res=>{
        this.ruleList[this.editting]=this.ruleInput.clone();
        this.resetCreateRuleBindings();
      },
      error=>{
        //Notify user (Not implemented)
      }
    );
  }
  editRule(index) {
    this.editting = index;
    this.ruleInput = clone(<Rule>this.ruleList[index]);
  }
  deleteRule(index) {
    this.ruleService.deleteRule(this.ruleList[index].id).subscribe(res=>{
      this.ruleList.splice(index, 1);
    });
  }
  resetCreateRuleBindings() {
    this.ruleInput = new Rule();
    this.editting = -1;
  }  
}
function clone(target){
  return Object.create(target);
}
export class RuleProperties {
  deviceList = [];
  deviceTypes = [];
  attributeList = [];
  operatorList = [];
  actionInfo = [];
  constructor()
  {
    this.attributeList = ["temperature", "humidity", "pH"];
    this.deviceTypes= ["Sensor","Sprinkler"];
    this.deviceList = [];
    this.operatorList = [">", "<", "=", ">=", "<="];
    let _actionInfo = [];
    _actionInfo.push("email");
    _actionInfo.push("sms");
    this.actionInfo = Object.create(_actionInfo);
  };
}
export class Rule{
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
  constructor(){
    this.name="";
    this.device_id="Device";
    this.attribute="Attribute";
    this.operator="Operator";
    this.value="";
    this.action="Notify User By";
    this.contact="";
    this.subject="";
    this.content="";
    this.sql="";
  }
  clone()
  {
    return Object.create(this);
  }
}