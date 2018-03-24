import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import * as d3 from "d3";
import { UtilService, Widget } from '../../services/util.service';
import { DeviceService } from '../../services/device.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent extends Widget implements OnInit, AfterViewInit {
  getInvolvedGateways(): string[] {
    let gatewayIds: string[] = [];
    this.widgetData.lines.forEach((line) => {
      if (line.data.gateway_id)
        gatewayIds.push(line.data.gateway_id);
    });
    return gatewayIds;
  }

  update(message = ""): void {
    d3.select(".svg-container.svg-" + this.idx + " svg").remove();
    this.drawGraph();
  }

  getInvolvedDevices(): string[] {
    let deviceIds: string[] = [];
    this.dataRequest.forEach((device) => {
      if (device.device_id)
        deviceIds.push(device.device_id);
    });
    return deviceIds;
  }

  @Output() deleteEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  @Input('data') widgetInfo: any;
  @Input('name') widgetName: string;
  @Input('index') idx: number;

  isDeleting: boolean;
  isEditing: boolean;
  widgetData: any;
  data: Array<any>;
  legends: Array<any> = [];
  dataRequest: Array<any> = [];
  model: any = {};

  constructor(
    public util: UtilService,
    private deviceService: DeviceService
  ) {
    super();
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.widgetData = this.widgetInfo.data;
    let range = this.widgetData.range;
    this.widgetData.lines.forEach(line => {
      this.legends.push({
        color: line.color,
        name: line.legend
      });
      this.dataRequest.push({
        device_id: line.data.device_id,
        fields: [line.data.field],
        color: line.color,
        range: range
      })
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.drawGraph();
    }, 500);
  }

  drawGraph() {
    let contentWidth = d3.select('.widget-content').node().offsetWidth - 40;
    let contentHeight = d3.select('.widget-content').node().offsetHeight / 2 - 40;
    this.getInitData(contentWidth, contentHeight);
  }

  getInitData(contentWidth, contentHeight) {
    this.deviceService.getDeviceData(this.dataRequest).subscribe(res => {
      this.data = res;
      this.drawLineGraph(contentWidth, contentHeight);
    }, error => {
      console.log(error);
    });
  }

  drawLineGraph(graphWidth: number, graphHeight: number) {
    let margin = { top: 20, right: 0, bottom: 20, left: 40 },
      width = graphWidth - margin.left - margin.right,
      height = graphHeight - margin.top - margin.bottom;

    let x = d3.scaleTime().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);
    let svg = d3.select(".svg-container.svg-" + this.idx)
      .attr(
      "style",
      "padding-bottom: " + Math.ceil(graphHeight * 100 / width) + "%"
      )
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 " + (graphWidth + 10) + " " + graphHeight)
      .style("position", "absolute")
      .style("height", "100%")
      .style("width", "100%")
      .style("top", "0")
      .style("left", "0")
      .append("g")
      .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

    function draw(Data) {
      let maxY = 0;

      Data.forEach(lineData => {
        let field = lineData.fields[0];
        let data = lineData.data;
        data.forEach(function (d) {
          d[field] = +d[field];
        });

        data.sort(function (a, b) {
          return a["created_at"] - b["created_at"];
        });
        let maxYLine = d3.max(data, (d) => { return d[field] });
        if (maxY < maxYLine) {
          maxY = maxYLine;
        }
      });

      x.domain(d3.extent(Data[0].data, function (d) { return d.created_at; }));
      y.domain([0, maxY]);

      Data.forEach((lineData, index) => {
        let field = lineData.fields[0];
        let data = lineData.data;

        let valueLine = d3.line()
          .x(function (d) { return x(d.created_at); })
          .y(function (d) { return y(d[field]); });

        svg.append("path")
          .data([data])
          .style("stroke", lineData.color)
          .style("fill", "none")
          .attr("d", valueLine);

      });

      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      svg.append("g")
        .call(d3.axisLeft(y));
    }
    draw(this.data);
  }

  setDelete(value: boolean) {
    this.isDeleting = value;
  }

  deleteWidget() {
    this.deleteEvent.emit();
  }

  onSubmit($event) {
    this.legends = [];
    this.widgetInfo = $event;
    this.init();
    this.update();
    this.editEvent.emit($event);
    this.isEditing = false;
  }

  setEdit(value: boolean) {
    this.isEditing = value;
  }
}
