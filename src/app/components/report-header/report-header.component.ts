import { LineState } from '@/models/line-state.model';
import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-report-header',
  templateUrl: './report-header.component.html',
  styleUrl: './report-header.component.scss'
})
export class ReportHeaderComponent {
  @Input() title: string = '';
  @Input() lineStates: LineState[] = [];

  // İkonları ve sayısal değerleri yönetmek için ek alanlar
  iconMap: Map<string, IconDefinition> = new Map();
  
  ngOnInit(): void {
    this.lineStates.forEach(state => {
      this.iconMap.set(state.variant, state.iconDef);
    });
  }
}
