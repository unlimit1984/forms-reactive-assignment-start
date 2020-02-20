import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;

  // projectStatuses = ['Stable', 'Critical', 'Finished'];

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      // 1st approach sync
      // 'projectName': new FormControl(null, [Validators.required, this.invalidProjectName.bind(this)]),
      // 1st approach async
      // 'projectName': new FormControl(null, Validators.required, this.asyncInvalidProjectName),
      // 2nd approach sync
      // 'projectName': new FormControl(null, [Validators.required, CustomValidators.invalidProjectName.bind(this)]),
      // 2nd approach async
      // 'projectName': new FormControl(null, Validators.required, CustomValidators.asyncInvalidProjectName),
      'projectName': new FormControl(null, [Validators.required, CustomValidators.invalidProjectName.bind(this)], CustomValidators.asyncInvalidProjectName),
      'mail': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('critical')
    });
  }

  // 1st approach sync
  invalidProjectName(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return {'invalidProjectName': true};
    } else {
      return null;
    }
  }

  // 1st approach async
  asyncInvalidProjectName(control: FormControl): Promise<any> | Observable<any> {
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

  onSubmit() {
    console.log(this.projectForm);
    // this.myForm.reset();
  }
}
