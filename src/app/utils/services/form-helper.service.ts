import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {

  public checkFormErrors(
    form: FormGroup,
    controlName: string
  ): boolean | undefined {
    const control = form.get(controlName);
    return control?.touched && control.invalid;
  }

  public getFormErrors(
    form: FormGroup,
    controlName: string
  ): string {
    const errors: ValidationErrors | null | undefined = form.get(controlName)?.errors;
    return this._errorsDicc(errors);
  }

  public checkControlErrors(
    control: AbstractControl
  ): boolean {
    return control.invalid && control.touched;
  }

  public getControlErrors(
    control: AbstractControl
  ): string {
    const errors: ValidationErrors | null | undefined = control.errors;
    return this._errorsDicc(errors);
  }

  private _errorsDicc(errors: ValidationErrors | null | undefined): string {
    if (errors?.['required']) {
      return 'Este campo es requerido'
    }

    if (errors?.['minlength']) {
      const { requiredLength, actualLength } = errors['minlength'];
      return `Longitud mínima permitida ${requiredLength}, longitud actual ${actualLength}`;
    }

    if (errors?.['min']) {
      const { actual, min } = errors['min']
      return `La edad mínima permitida es ${min}, valor actual ${actual}`
    }

    if (errors?.['arrayMinLength']) {
      const { actual, min } = errors['arrayMinLength'];
      return `La cantidad de opciones mínima permitida es ${min}, valor actual ${actual}`
    }

    if (errors?.['notUnique']) {
      return `Los nombres deben ser únicos`
    }

    return '';
  }
}
