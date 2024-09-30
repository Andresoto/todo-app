import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function uniqueNamesValidator(): ValidatorFn {
  return (formArray: AbstractControl): ValidationErrors | null => {
    const names = formArray.value.map((group: any) => group.name.toLowerCase().trim());
    const namesSet = new Set(names);

    return names.length !== namesSet.size ? { notUnique: true } : null;
  };
}
