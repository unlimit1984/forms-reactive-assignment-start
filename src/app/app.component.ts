import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

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
      // 'projectName': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
      'projectName': new FormControl(null, Validators.required, this.forbiddenNamesAsync),
      'mail': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('critical')
    });
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return {'forbiddenName': true};
    } else {
      return null;
    }
  }

  forbiddenNamesAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({'forbiddenName': true});
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
