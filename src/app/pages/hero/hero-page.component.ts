import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './hero-page.component.html',
  imports: [UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroPageComponent {
  public initialName = 'Ironman';
  public initialAge = 45;

  public name = signal(this.initialName);
  public age = signal(this.initialAge);

  public heroDescription = computed(() => {
    // Se puede desarrollar logica
    const description = `${this.name()} - ${this.age()}`;
    return description;
  });

  public capitalizedName = computed(() => this.name().toUpperCase());

  public getHeroDescription = (): string => `${this.name()} - ${this.age()}`;

  public chageAge = (): void => this.age.set(60);

  public changeHero = (): void => {
    this.age.set(22);
    this.name.set('Spiderman');
  };

  public resetForm = (): void => {
    this.name.set(this.initialName);
    this.age.set(this.initialAge);
  };
}
