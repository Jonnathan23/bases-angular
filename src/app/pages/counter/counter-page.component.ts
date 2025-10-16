import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { consumerPollProducersForChange } from "@angular/core/primitives/signals";

@Component({
    templateUrl: './counter-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterPageComponent {
    originalValue = 0;
    counter = 10;
    counterSignal = signal(10)

    constructor() {
        setInterval(() => {
            this.counter += 1; //Solo se actualiza la vista si ZoneJS detecta una actualización --> es más pesado
            this.counterSignal.update((current) => current + 1); // se actualiza debido a que en ChangeDetectionStrategy.OnPush --> más ligero
            console.log('TICK');
        }, 2000)

    }

    increaseBy(value: number) {
        this.counter += value;
        this.counterSignal.update((current) => current + value);
    }

    decreseBy(value: number) {
        this.counter -= value;
        this.counterSignal.update((current) => current - value);
    }

    reset() {
        this.counter = this.originalValue;
        this.counterSignal.set(this.originalValue);
    }

}