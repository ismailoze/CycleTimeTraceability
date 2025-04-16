import {
    Directive,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';

@Directive({
    selector: '[appCounter]'
})
export class CounterDirective implements OnChanges {
    @Input('appCounter') endValue: number = 0;
    @Input() duration: number = 1000;

    private el: HTMLElement;

    constructor(private elementRef: ElementRef) {
        this.el = this.elementRef.nativeElement;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['endValue']) {
            this.animate();
        }
    }

    private animate() {
        const start = 0;
        const startTime = performance.now();

        const step = (currentTime: number) => {
            const progress = Math.min(
                (currentTime - startTime) / this.duration,
                1
            );
            const current = Math.floor(progress * this.endValue);
            this.el.textContent = current.toString();

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }
}
