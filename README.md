# Angular Forms Extension
[![CircleCI](https://circleci.com/gh/sapienstech/angular-forms-extension.svg?style=svg)](https://circleci.com/gh/sapienstech/angular-forms-extension) [![Greenkeeper badge](https://badges.greenkeeper.io/sapienstech/angular-forms-extension.svg)](https://greenkeeper.io/)  
A form library extending Angular's template driven form capabilities.  

## Installation
`npm install angular-forms-extension`

When using SystemJS don't forget to:  
`map: 'angular-forms-extension': 'angular-form-extension/bundles/angular-hybrid-forms.umd.min.js'`

## Features

### Form to parent form discovery
 Adding a template driven inner form won't work with nested components using `ngModelGroup`.  
 Instead, you could simply place a `<form></form>` around your inner group, and `angular-form-extensions` will do the wiring between the two for you.  
 
 #### Usage 
 Simply wrap your inner form with `<form></form>`
```typescript
@Component({
  template: `
    <form> 
      <input [(ngModel)]='name' [name]='name' required>
      <address></address>   
    </form>
    `
})
class UserFormComponent {
  @Input name: string;
}

@Component({
  template: `
    <form> 
      <input [(ngModel)]='city' [name]='city' required>
      <input [(ngModel)]='street' [name]='street'>
      <input [(ngModel)]='zipcode' [name]='zipcode' [minLength]='5' [maxLength]='5'>   
    </form>
    `
})
class UserFormComponent {
  @Input city: string;
  @Input street: string;
  @Input zipcode: number;
}
```
 
 ### Valid Submit
 Usually, when your form is submitted, it always calls your ngSubmit bound method and you have to manually check if the form is valid, before sending the info to the server.  
 With this directive, instead, the method is called only if there are no errors.
 Moreover, the novalidate attribute is automatically added to your form.
#### Usage
Simply subscribe to the `(validSubmit)` event on your form:
```angular2html
  <form (validSubmit)="save()">
    ...
  </form>
```

### Valid Change event
While a classic form usually has some sort of submit button, there is a variant of an "autosave" form, in which fields are saved individually after changing so long as they're valid.  
That is why we've added the `(ngModelValidChange)` (to go along with Angular's `ngModelChange`).  
This event will fire only when the form field has changed, **AND** it is valid.  
Also, in order to not overwhelm the server with a save request on every type, we've added a debounce time.  
It is set to 400ms by default, but can be altered using the `[ngModelValidChangeDebounce]="...""` input.  
#### Usage 
Simply subscribe to the `(validSubmit)` event on your form:
```angular2html
  <form (validSubmit)="save()">
    <input [(ngModel)]='name' [name]='name' (ngModelValidChange)='saveName($event)' required>
  </form>
```

### Dirty/Unsaved Event
Sometimes, you'll want to alert the user when his form has unsaved date (dirty) as they navigate away from the page.  
When using Angular, you might want to consider implementing the [CanDeactivate](https://angular.io/api/router/CanActivate) interface.  
The (unsaved) event will emit `true` when the form state has changed and has content that was not saved, and `false` when it does not.   
When a form is submitted all at once using (validSubmit), it will emit `true` when a change was detected, and `false`  
When each individual form field is saved on its own (like when using the `(ngModelChangeValid)` event), it will emit `true` for a short while based on the debounce time, and back to `false` once it is saved.  
#### Usage
```typescript
@Component({template: `
<form (validSubmit) (unsaved)="unsavedChanged($event)">
  ...
</form>`})
MyFormComponent extends FormCanDeactivate {
  ...
}

export abstract class FormCanDeactivate {

    @ViewChild(UnsavedDirective) unsavedDirective;

    private unsaved: boolean;

    ngOnInit() {
        if(!this.unsavedDirective)
            throw new Error('A component implementing "FormCanDeactivate" has to have a child with (unsaved)="unsavedChanges($event)"')
    }

    canDeactivate(): boolean {
        return !this.unsaved;
    }

    unsavedChanges(value: boolean) {
        this.unsaved = value;
    }
}
```

### Adding error messages, label and styles
Wrapping your form controls with `fx-field` will add a label for you, and place proper CSS on both your label and form control, allowing you to customize it in common situations - like when it is a required field, or invalid.  
It will also apply common practice, like not highlighting invalid fields till they've changed or the form was submitted.    
Further more, it adds a human readable error message to the right of the field when it is invalid.  

#### Default error messages
required: '[Label] is required',  
minlength: '[Label] must be at least {{requiredLength}} characters long',  
maxlength: '[Label] must be no more than {{requiredLength}} characters long',  
email: '[Label] must be valid',  

#### Customizing the error messages
```typescript
export class AppModule {
  constructor(formValidationMessageService: FormValidationMessageService) {
    formValidationMessageService.setErrorMessages({myCustomValidation: '...', minlength: 'hi it`s too long!'});    
  }
}
```

#### Applied CSS Classes
`fx-field` - The entire form field, including its label and its control.  
`fx-field--required` - A modifier applied to the form field when it is required.   
`fx-field--invalid` -  A modifier applied to the form field when it is invalid. Only shown when field is dirty or submitted.  
`fx-field__label` - The label part of the form field.   
`fx-field__control` - The form control part of the form field.   
`fx-field__errors` - The errors pane of the form field.   
`fx-field__error` - A class applied to each individual error.   

#### Usage
```html
<form (validSubmit)="save()">
  <xf-field label="City">
    <input [(ngModel)]='city' [name]='city' required>
  </xf-field>
  
  <xf-field label="Street">
    <input [(ngModel)]='street' [name]='street'>  
  </xf-field>
  
  <xf-field label="Zipcode">
    <input [(ngModel)]='zipcode' [name]='zipcode' [minLength]='5' [maxLength]='5'>  
  </xf-field>
  
  <button>Submit</button>    
</form>
```

# Build

## Steps
Common tasks are present as npm scripts:

- `npm start` to run a live-reload server with the demo app
- `npm run test` to test in watch mode, or `npm run test:once` to only run once
- `npm run build` to build the library
- `npm run lint` to lint 
- `npm run clean` to clean
- `npm install ./relative/path/to/lib` after `npm run build` to test locally in another app

## Publish
Using `npm run release`
