# Angular & TypeScript Quality Criteria

## 🅰️ 1. Base Architecture & Core

- **B1. Stability**: There are no unhandled errors while code executing; the app does not break during data loading.
- **B2. Environments**: The code is cross-browser (latest Chrome, Firefox, Safari) and does not cause errors on different operating systems (Windows, Linux, MacOS).
- **B3. No Magic Values**: The code does not use "magic values", each of them has a separate variable named as a constant. Constants and enums are not redefined anywhere in the code.
- **B4. Explicit Member Access**: All class properties and methods are marked with member access (`private`, `public`, or `protected`). This is mandatory in Angular components and services.

```ts
// Good
export class UserProfileComponent {
  private readonly initialAge = 25;

  public userAge = signal(this.initialAge);

  public resetAge(): void {
    this.userAge.set(this.initialAge);
  }
}
```

## 2. Naming Conventions

- **B5. Variables**: Names of variables, parameters, properties, and methods begin with a lowercase letter and are written in camelCase notation. Variable names do not use the data type (e.g., `filters` instead of `filtersArray`).
```ts
// Bad
const filtersArray = [];
// Good
const filters = [];
```

- **B6. Booleans**: Boolean variables start with a prefix that can be answered with "yes" (e.g., `isLogin`, `hasFriends`).
```ts
// Bad
let active = true;
let friend = false;
// Good
let isActive = true;
let hasFriends = false;
```

- **B7. Collections**: Arrays are named as plural nouns.
```ts
// Good
const selectedProducts = [];
const activeUsers = [];
```

- **B8. Classes & Enums**: Classes are named with English nouns and start with a capital letter. Enums are named by English nouns, begin with an uppercase letter, and keys are declared in constant format (`UPPER_CASE`).
```ts
// Good
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  REGULAR_USER = 'REGULAR_USER',
}

export class UserApiService {}
```

- **B9. File Naming (Angular Style)**: `kebab-case` is used to name files and folders. In Angular, append the architectural role to the file name (e.g., `user-profile.component.ts`, `auth.service.ts`, `user.repository.ts`).

## 3. Templates (Markup) & Styles

- **B10. HTML Semantics**: The minimum possible number of HTML elements has been used (no extra wrappers). Content images have the `alt` attribute filled.
```html
<!-- Bad -->
<div>
  <div>
    <img src="logo.png">
  </div>
</div>

<!-- Good -->
<img src="logo.png" alt="Company Logo">
```

- **B11. Styles & Encapsulation**: The layout of the blocks is made by flex and/or grid. The `!important` keyword is forbidden except for library overrides.

- **B12. Nesting**: Nesting of CSS selectors is no more than two levels.
```css
/* Bad */
.card .card-body .item-list .item {
  color: red;
}

/* Good */
.card-item {
  color: red;
}
```

- **A1. Interactive Elements**: All interactive elements have a description (e.g., using `.visually-hidden` classes or `aria-label`).
```html
<!-- Good -->
<button aria-label="Close dialog">X</button>
```

## 4. Code Structuring & Modularity

- **B13. Curly Braces**: Curly braces are required everywhere, even if the statement consists of one line. Single-line arrow functions are the only exception.
```ts
// Bad
if (isInvalid) return;

// Good
if (isInvalid) {
  return;
}

// Allowed
const double = (x: number) => x * 2;
```

- **B14. Module Clarity**: Modules do not export mutable variables. If the same code is repeated in several modules, the repeated part is moved to a separate module.

- **B15. No Index Barrels**: No index files are used, except as the absolute entry point of the application. Use your TypeScript path aliases instead.
```ts
// Bad
import { UserService } from '../../shared/services';

// Good
import { UserService } from '@shared/services/user.service';
```

- **B16. Dependency Management**: The versions of dependencies used are fixed in `package.json` (no `^` or `~` allowed for strict lock). There are no unused dependencies.

## 5. Angular-Specific Adaptations (Advanced)

- **A2. Event Binding (Overriding React standards)**: Contrary to React where callbacks are named with an `on` prefix and component functions with a `handle` prefix, Angular binds events directly in the template. Name your methods as direct verbs.
```html
<!-- Bad -->
<button (click)="handleSaveClick()">Save</button>

<!-- Good -->
<button (click)="saveUser()">Save</button>
```

- **A3. Type Safety**: `unknown` is preferred over `any`. `any` is prohibited.
```ts
// Bad
function parseData(data: any): void {}

// Good
function parseData(data: unknown): void {}
```

- **A4. Modern Iteration**: Use the `for...of` to iterate over arrays and data structures that can be iterated over. Use iterators (`forEach`, `map`, `filter`) to work with JS collections.
```ts
// Good
for (const user of users) {
  console.log(user);
}

const activeUserIds = users
  .filter(user => user.isActive)
  .map(user => user.id);
```

- **A5. Simplification**: Where possible, the ternary operator is used in the assignment of a value instead of `if`. Conditions are simplified (do not use `if...else` returning boolean when you can return the condition directly).
```ts
// Bad
let status;
if (isActive) {
  status = 'Online';
} else {
  status = 'Offline';
}

// Good
const status = isActive ? 'Online' : 'Offline';

// Bad
if (age >= 18) {
  return true;
} else {
  return false;
}

// Good
return age >= 18;
```
