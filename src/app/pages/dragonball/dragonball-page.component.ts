import { Component, signal } from '@angular/core';
import { CharacterList } from "../../components/dragonball/character-list/character-list";
import { Character } from '../../interfaces/character.interface';

@Component({
    templateUrl: './dragonball-page.component.html',
    imports: [CharacterList],

})
export class DragonballPageComponent {
    name = signal('Gohan');
    power = signal(0);

    characters = signal<Character[]>([
        { id: 1, name: 'Goku', power: 9001 },
        { id: 2, name: 'Vegeta', power: 8001 },
        { id: 3, name: 'Piccolo', power: 3001 },
        { id: 4, name: 'Yamcha', power: 500 },
        { id: 5, name: 'Bulma', power: 50 },
    ]);


    addCharacter() {
        if (this.name().trim().length === 0) {
            return;
        }

        if (!this.power()) {
            return
        }
        const newCharacter: Character = { id: this.characters().length + 1, name: this.name(), power: this.power() };
        this.characters.update((characters) => [...characters, newCharacter]);
        this.resetForm();
    }

    resetForm() {
        this.name.set('');
        this.power.set(0);
    }


}