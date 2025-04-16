import {LineGeneral} from '@/models/line-general.model';
import {CustomDatePipe} from '@/pipes/custom-date.pipe';
import {
    Component,
    Input,
    AfterViewInit,
    ElementRef,
    ViewChild,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
    selector: 'app-line-general',
    templateUrl: './line-general.component.html',
    styleUrl: './line-general.component.scss'
})
export class LineGeneralComponent implements AfterViewInit, OnChanges {
    @Input() line: LineGeneral;
    @Input() viewMode: 'oee' | 'cycleTime' = 'oee';
    @ViewChild('chartCanvas') chartCanvas!: ElementRef;
    private chart!: Chart;

    constructor(private customDatePipe: CustomDatePipe) {}

    ngAfterViewInit(): void {
        this.initializeChart();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ((changes['line'] || changes['viewMode']) && this.chart) {
            this.updateChart();
        }
    }

    private initializeChart(): void {
        const actualData =
            this.viewMode === 'oee'
                ? this.line.oeeValues
                : this.line.actualCycleTime;
        const targetData =
            this.viewMode === 'cycleTime' ? this.line.targetCycleTime : [];

        const labelPrefix = this.viewMode === 'oee' ? 'OEE' : 'Cycle Time';

        this.line.labels = this.generateLast24HoursLabels();

        const maxValueInData = Math.max(
            ...actualData.filter((v): v is number => v !== null),
            ...targetData.filter((v): v is number => v !== null),
            100
        );
        const yMax = Math.ceil(maxValueInData * 1.2);

        this.chart = new Chart(this.chartCanvas.nativeElement, {
            data: {
                labels: this.line.labels,
                datasets: [
                    {
                        label: `Gerçekleşen ${labelPrefix}`,
                        data: actualData,
                        backgroundColor:
                            this.viewMode === 'cycleTime'
                                ? actualData.map((val, i) => {
                                      const target = targetData[i];
                                      if (val != null && target != null) {
                                          return val > target
                                              ? '#dc3545'
                                              : '#007bff';
                                      }
                                      return '#007bff'; // default renk
                                  })
                                : undefined,
                        // borderColor:
                        //     this.viewMode === 'cycleTime' ? undefined : '#fff',
                        type: this.viewMode === 'cycleTime' ? 'bar' : 'line',
                        fill: false,
                        tension: 0.3,
                        spanGaps: false,
                        order: 2
                    },
                    ...(this.viewMode === 'cycleTime'
                        ? [
                              {
                                  label: 'Hedef Cycle Time',
                                  type: 'line' as const,
                                  data: targetData,
                                  borderColor: '#fd7e14',
                                  borderDash: [5, 5],
                                  fill: false,
                                  tension: 0.3,
                                  spanGaps: false,
                                  order: 1
                              }
                          ]
                        : [])
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {display: false},
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: (context) => {
                                const label = context.dataset.label + ' : ';
                                const index = context.dataIndex;
                                const value = context.dataset.data[index];

                                if (value === 0 || value == null) {
                                    return '';
                                } else {
                                    if (this.viewMode === 'cycleTime') {
                                        return `${label}${value}sn`;
                                    } else {
                                        return `${label}${value}%`;
                                    }
                                }
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: yMax,
                        grid: {color: '#b3b3b3'}
                        // ticks: {color: '#fff'}
                    },
                    x: {
                        grid: {display: false}
                        //ticks: {color: '#fff'}
                    }
                }
            }
        });
    }

    private updateChart(): void {
        if (!this.chart) return;

        const actualData =
            this.viewMode === 'oee'
                ? this.line.oeeValues
                : this.line.actualCycleTime;

        const targetData =
            this.viewMode === 'cycleTime' ? this.line.targetCycleTime : [];

        const labelPrefix = this.viewMode === 'oee' ? 'OEE' : 'CycleTime';

        this.line.labels = this.generateLast24HoursLabels();

        const maxValueInData = Math.max(
            ...actualData.filter((v): v is number => v !== null),
            ...targetData.filter((v): v is number => v !== null),
            100
        );
        const yMax = Math.ceil(maxValueInData * 1.2);

        // Grafik tipini güncellemek için destroy edip yeniden oluştur
        this.chart.destroy();
        this.initializeChart();
    }

    // public getCardClass(): string {
    //     switch (this.line.status) {
    //         case 'Çalışıyor':
    //             return 'bg-success';
    //         case 'Durdu':
    //             return 'bg-danger';
    //         case 'Kapalı':
    //             return 'bg-secondary';
    //         default:
    //             return 'bg-secondary';
    //     }
    // }

    public getStatusIcon(): string {
        switch (this.line.status) {
            case 'Çalışıyor':
                return 'fas fa-gears';
            case 'Durdu':
                return 'fas fa-exclamation-triangle';
            case 'Kapalı':
                return 'fas fa-ban';
            default:
                return 'fas fa-question';
        }
    }

    public getStatusAlarm(): string {
        return this.line.status === 'Durdu' ? 'blinking' : '';
    }

    public getStatusClass(): string {
        switch (this.line.status) {
            case 'Çalışıyor':
                return 'badge-success';
            case 'Kapalı':
                return 'badge-secondary';
            case 'Durdu':
                return 'badge-danger';
            default:
                return 'badge-secondary';
        }
    }

    private generateLast24HoursLabels(): string[] {
        const labels: string[] = [];
        const now = new Date();

        for (let i = 23; i >= 0; i--) {
            const d = new Date(now.getTime() - i * 60 * 60 * 1000);

            const label = this.customDatePipe.transform(d); // <-- işte burada
            labels.push(label);
        }

        return labels;
    }
}
