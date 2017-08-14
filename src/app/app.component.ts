import { Component, OnInit }  from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { validNumber } from './number-validator';
import { UnitDataStructure } from './unit-data-structure';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]

})
export class AppComponent implements OnInit {
  
constructor(private dataService: DataService) { }
  unitMeasure: UnitDataStructure[] = [];
  convertedValue="";
  unitFormData = {fromUnit: '',selectFromUnit:'',selectToUnit:'' };
  unitConversionForm: FormGroup;
  ngOnInit(): void {
    this.dataService.getData().then((unitMeasure) => this.unitMeasure = unitMeasure);
    this.unitConversionForm = new FormGroup({
      'fromUnit': new FormControl(this.unitFormData.fromUnit, [
        Validators.required,validNumber
      ]),
       'selectFromUnit': new FormControl(this.unitFormData.selectFromUnit, [
        Validators.required
      ]),
       'selectToUnit': new FormControl(this.unitFormData.selectToUnit, [
        Validators.required
      ])
    });
  }
 convert(){   
   this.convertedValue=""+this.dataService.getConverttedResult(this.unitConversionForm.value);
 }
  get fromUnit() { return this.unitConversionForm.get('fromUnit'); }
  get selectFromUnit() { return this.unitConversionForm.get('selectFromUnit'); }
  get selectToUnit() { return this.unitConversionForm.get('selectToUnit'); }

}
