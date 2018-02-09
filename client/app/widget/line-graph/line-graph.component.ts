import { Component, OnInit, Input } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import * as d3 from "d3";
import { UtilService } from '../../services/util.service';
import { DeviceService } from '../../services/device.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit, AfterViewInit {

  constructor(
    public util: UtilService,
    private deviceService: DeviceService
  ) { }

  @Input('data') widgetData: any;
  @Input('name') widgetName: string;
  @Input('refreshInterval') refreshInterval: number;

  data: Array<any>;
  legends: Array<any> = [];
  dataRequest: Array<any> = [];

  ngOnInit() {
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
    this.reloadData(contentWidth, contentHeight);
  }

  getInitData(contentWidth, contentHeight) {
    this.deviceService.getDeviceData(this.dataRequest).subscribe(res => {
      this.data = res;
      this.data.forEach(element => {
        element.data.forEach(i => {
          i.created_at = (new Date(i.created_at)).getSeconds();
        });
      });
      this.drawLineGraph(contentWidth, contentHeight);
    }, error => {
      console.log(error);
    });
  }

  reloadData(contentWidth, contentHeight) {
    Observable.interval(this.refreshInterval).subscribe(x => {
      this.getInitData(contentWidth, contentHeight);
    });
  }

  drawLineGraph(graphWidth: number, graphHeight: number) {
    let margin = { top: 20, right: 0, bottom: 20, left: 40 },
      width = graphWidth - margin.left - margin.right,
      height = graphHeight - margin.top - margin.bottom;

    let parseTime = d3.timeParse("%Y");

    let x = d3.scaleTime().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);

    let svg = d3.select(".svg-container")
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
          d.created_at = parseTime(d.created_at);
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
}
