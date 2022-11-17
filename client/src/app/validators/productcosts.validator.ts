import { AbstractControl } from '@angular/forms';
export function ValidateProductCosts(
  control: AbstractControl
): { invalidCost: boolean } | null {
  return control.value <= 0 ? { invalidCost: true } : null;
}
