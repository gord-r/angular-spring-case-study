import { AbstractControl } from '@angular/forms';
export function ValidateProductQtys(
  control: AbstractControl
): { invalidQty: boolean } | null {
  const qtyregexp = /^\d+$/;
  return !qtyregexp.test(control.value) ? { invalidQty: true } : null;
}
