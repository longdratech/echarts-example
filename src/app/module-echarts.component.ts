import {Component, Input, OnInit} from '@angular/core';
import * as lodash from 'lodash';
import {EChartsOption} from "echarts";

@Component({
  selector: 'app-module-echarts',
  templateUrl: './module-echarts.component.html',
  standalone: false
})
export class ModuleEchartsComponent implements OnInit {
  @Input() chartData: any[] = [
    {
      inputValue: "",
      activeDate: "2025-07-07T04:17:56.593Z",
      shift: 1,
      equalValue: "OK",
      type: ""
    },
    {
      inputValue: "",
      activeDate: "2025-07-07T04:17:56.593Z",
      shift: 2,
      equalValue: "OK",
      type: ""
    },
    {
      inputValue: "",
      activeDate: "2025-07-08T04:17:56.593Z",
      shift: 1,
      equalValue: "OK",
      type: ""
    },
    {
      inputValue: "",
      activeDate: "2025-07-09T04:17:56.593Z",
      shift: 1,
      equalValue: "OK",
      type: ""
    },
    {
      inputValue: "",
      activeDate: "2025-07-09T04:17:56.593Z",
      shift: 2,
      equalValue: "OK",
      type: ""
    },
    {
      inputValue: "",
      activeDate: "2025-07-09T04:17:56.593Z",
      shift: 3,
      equalValue: "OK",
      type: ""
    }
  ];
  @Input() upperLimit: number = 10;
  @Input() lowerLimit: number = 1;
  @Input() upperActionLine: number = 10;
  @Input() lowerActionLine: number = 20;

  chartOption: EChartsOption = {
    animation: false,
    textStyle: {
      fontSize: 14
    },
    xAxis: [
      // Truc hoành theo ca
      {
        type: 'category',
        data: [],
        axisTick: {show: false},
        axisLine: {show: true},
        splitLine: {
          show: true,
          lineStyle: {color: 'grey', type: "dashed"}
        },
        axisPointer: {
          label: {
            formatter: function (params: any) {
              return params.value;
            }
          }
        }
      },
      // Truc hoành theo ngày
      {
        type: 'category',
        data: [],
        axisTick: {
          show: true,
          length: 500,
          lineStyle: {
            color: 'black',
            width: 1,
            type: 'solid'
          },
          inside: true,
          interval: function (index: any, value: any) {
            console.log(index, value)
            return value !== '';
          }
        },
        axisLine: {show: false},
        splitLine: {
          show: false,
          lineStyle: {color: 'yellow'}
        },
        offset: 40,
        position: 'bottom'
      }
    ],
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name: 'Dữ liệu',
        type: 'line',
        data: [0.3, 1.4, 1.2, 1.0, 0.6, 1.2],
        xAxisIndex: 0
      }
    ],
    grid: {
      top: 30,
      left: 60,
      right: 60,
      bottom: 80
    }
  };

  constructor() {
  }

  ngOnInit(): void {
    const data = lodash.chain(this.chartData).groupBy(e => e.activeDate.split("T")[0]).value();

    Object.keys(data).forEach((key: string) => {
      data[key].forEach((val, index) => {
        if (Array.isArray(this.chartOption.xAxis)) {
          (this.chartOption.xAxis[0] as any)?.data?.push(`Ca ${val.shift}`);


          if (index === 0) {
            (this.chartOption.xAxis[1] as any)?.data?.push(`${key.split("-")[2]}`);
          }  else {
            (this.chartOption.xAxis[1] as any)?.data?.push('');
          }
        }
      });
    });
  }
}
