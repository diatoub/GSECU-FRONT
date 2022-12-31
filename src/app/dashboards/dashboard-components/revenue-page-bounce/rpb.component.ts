import { Component, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexTooltip,
  ApexTheme,
  ApexFill,
  ApexNonAxisChartSeries,
  ApexDataLabels,
  ApexStroke,
  ApexLegend,
  ApexPlotOptions
} from 'ng-apexcharts';

export type RevenueChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: any;
  fill: ApexFill;
  theme: ApexTheme;
  tooltip: ApexTooltip;
  colors: string[];
  markers: any;
};
export type PageviewChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: any;
  fill: ApexFill;
  theme: ApexTheme;
  tooltip: ApexTooltip;
  colors: string[];
  markers: any;
};
export type BounceChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: any;
  fill: ApexFill;
  theme: ApexTheme;
  tooltip: ApexTooltip;
  colors: string[];
  markers: any;
};
export type DeviceSalesChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  legends: ApexLegend;
  labels: any;
  name: any;
  tooltip: ApexTooltip;
  colors: string[];
  plotOptions: ApexPlotOptions
};

@Component({
  selector: "app-rpb",
  templateUrl: "./rpb.component.html",
  styleUrls: ["./rpb.component.css"],
})
export class RpbComponent {

  @ViewChild("revenuechart") chart: ChartComponent = Object.create(null);
  public RevenueChartOptions: Partial<RevenueChartOptions>;

  @ViewChild("pageviewchart") chart2: ChartComponent = Object.create(null);
  public PageviewChartOptions: Partial<PageviewChartOptions>;

  @ViewChild("bouncechart") chart3: ChartComponent = Object.create(null);
  public BounceChartOptions: Partial<BounceChartOptions>;

  @ViewChild('chart') chart4: ChartComponent = Object.create(null);
  public DeviceSalesChartOptions: Partial<DeviceSalesChartOptions>;

  constructor() {

    /***********************/
    /* Revenue chart */
    /************************/
    this.RevenueChartOptions = {
      series: [
        {
          name: '',
          data: [20, 55, 44, 30, 61, 48, 20]
        },
      ],
      chart: {
        type: 'bar',
        fontFamily: 'Nunito Sans,sans-serif',
        height: 80,
        sparkline: {
          enabled: true
        }
      },
      fill: {
        colors: ['#fff'],
        opacity: 0.7,

      },
      stroke: {
        show: true,
        width: 7,
        colors: ["transparent"],
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
        marker: {
          show: false,
        },
        x: {
          show: false
        },
      }
    }

    /***********************/
    /* pageview chart */
    /************************/
    this.PageviewChartOptions = {
      series: [
        {
          name: 'Page views',
          data: [28, 40, 36, 52, 38, 60, 55]
        },
      ],
      chart: {
        type: "area",
        fontFamily: 'Nunito Sans,sans-serif',
        height: "90",
        toolbar: {
          show: false,
        },
        sparkline: { enabled: true },
      },
      fill: {
        type: "solid",
        colors: ['#fff'],
        opacity: 0.4
      },
      colors: ['#fff'],
      stroke: {
        curve: "straight",
        width: 0,
      },
      tooltip: {
        theme: "dark",
      },
    }

    /***********************/
    /* Bounce chart */
    /************************/

    this.BounceChartOptions = {
      series: [
        {
          name: 'Bounce rate',
          data: [55, 60, 38, 52, 36, 40, 28]
        },
      ],
      chart: {
        type: "line",
        fontFamily: 'Nunito Sans,sans-serif',
        height: "90",
        toolbar: {
          show: false,
        },
        sparkline: { enabled: true },
      },

      colors: ['#fff'],
      stroke: {
        curve: "smooth",
        width: 2,
      },
      tooltip: {
        theme: "dark",
      },
    }

    /***********************/
    /* Device chart */
    /************************/

    this.DeviceSalesChartOptions = {
      series: [40, 12, 28, 60],
      chart: {
        fontFamily: 'Nunito Sans,sans-serif',
        type: 'donut',
        height: 250
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75px',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '18px',
                color: undefined,
                offsetY: 10
              },
              value: {
                show: false,
                color: '#99abb4',
              },
              total: {
                show: true,
                label: 'Variations',
                color: '#99abb4',
              }
            }
          }
        }
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0
      },
      legends: {
        show: false,
      },
      labels: ['Desktop', 'Mobile', 'Tablets', 'Others'],
      colors: ['#40c4ff', '#2961ff', '#ff821c', '#e9edf2'],
    };
  }
}
