import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
// 2nd approach
export class CustomValidators {
  // sync
  static invalidProjectName(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return {'invalidProjectName': true};
    } else {
      return null;
    }
  }
  // async
  static asyncInvalidProjectName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'TestAsync') {
          resolve({'invalidProjectName': true});
        } else {
          return resolve(null);
        }
      }, 2000);
    });
    return promise;
  }

}
