import { Component } from "@angular/core";

@Component({
   templateUrl: './counter-page.component.html',
})
export class CounterPageComponent {
    originalValue = 10;
    counter = this.originalValue;

    increaseBy(value: number) {
        this.counter += value;
    }   

    decreseBy(value: number) {
        this.counter -= value;
    }   

    reset() {
        this.counter = this.originalValue;
    }

}