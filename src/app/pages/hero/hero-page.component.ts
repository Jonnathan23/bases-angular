import { UpperCasePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, signal } from "@angular/core";

@Component({
    templateUrl: './hero-page.component.html',
    imports: [UpperCasePipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroPageComponent {
    initialName = 'Ironman'
    initialAge = 45

    name = signal(this.initialName)
    age = signal(this.initialAge)

    heroDescription = computed(() => {
        // Se puede desarrollar logica
        const description = `${this.name()} - ${this.age()}`;
        return description;
    })

    capitalizedName = computed(() => this.name().toUpperCase())

    getHeroDescription = () => `${this.name()} - ${this.age()}`

    chageAge = () => this.age.set(60)

    changeHero = () => {
        this.age.set(22)
        this.name.set('Spiderman')
    }

    resetForm = (): void => {
        this.name.set(this.initialName)
        this.age.set(this.initialAge)
    }


}