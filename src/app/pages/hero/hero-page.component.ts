import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

@Component({
    templateUrl: './hero-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroPageComponent {
    initialName = 'Ironman'
    initialAge = 45

    name = signal(this.initialName)
    age = signal(this.initialAge)

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