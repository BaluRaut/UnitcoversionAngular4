import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UnitDataStructure } from './unit-data-structure';
@Injectable()
export class DataService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private dataUrl = 'api/unitmeasuredatainfo';  // URL to web api

  constructor(private http: Http) { }

  getData(): Promise<UnitDataStructure[]> {
    return this.http.get(this.dataUrl)
               .toPromise()
               .then(response => response.json().data as UnitDataStructure[])
               .catch(this.handleError);
  }

  getConverttedResult(jsonData) {
   console.log(jsonData);
    let fromUnit =jsonData.selectFromUnit;
    let toUnit = jsonData.selectToUnit;
    let result = toUnit/fromUnit;
   return this.fixNumberValue(jsonData.fromUnit * result);   
  }

fixNumberValue(convertedValue) {
    if (!isFinite(convertedValue))
       return "";
    if (convertedValue == 0) 
        return "0";
   var stringValue = "" + convertedValue;
  let ePosition = stringValue.indexOf('E');
    if (ePosition == -1) 
      ePosition = stringValue.indexOf('e');
   var mathDigit = Math.log(Math.abs(convertedValue)) / Math.LN10;
   var mathDigitFloor = Math.floor(mathDigit);
    if (ePosition == -1) {
     let adjustNumer = Math.pow(10, mathDigitFloor - 12);
       var adjustRoundNumber = Math.round(convertedValue / adjustNumer);
        if (mathDigitFloor < 12) {
         let adjustPowNumber = Math.pow(10, 12 - mathDigitFloor);
            return (adjustRoundNumber / adjustPowNumber);
        } else return (adjustRoundNumber * adjustNumer);
    } else {
     let mathPowRound = convertedValue * Math.pow(10, 12 - mathDigitFloor);
     let mathPowRoundString = String(Math.round(mathPowRound));
     let insertNumber = -1;
        if (mathPowRoundString.charAt(0) == '-') insertNumber = 2;
        else insertNumber = 1;
     let restString = mathPowRoundString.substring(insertNumber, mathPowRoundString.length);
     let findSubString = restString.length - 1;
        while (findSubString>= 0 && restString.charAt(findSubString) == '0') findSubString--;
        restString = restString.substring(0, findSubString + 1);
     let mathPowSubstring= mathPowRoundString.substring(0, insertNumber);
     let epositionNumber:any;
        if (restString.length > 0) mathPowSubstring += "." + restString;
        if (mathDigitFloor < 0) epositionNumber = mathPowSubstring + "E";
        else
      epositionNumber = mathPowSubstring + "E+";
      let mathSum = epositionNumber + mathDigitFloor;
      let mathAbsNumber = Math.abs(parseFloat(mathSum));
      let mathConvertedAbsValue = Math.abs(convertedValue);
        if (mathDigitFloor >= 0) {
            if (mathAbsNumber > 5 * mathConvertedAbsValue) mathSum = epositionNumber + String(mathDigitFloor - 1);
            else if (mathAbsNumber < mathConvertedAbsValue / 5) mathSum = epositionNumber + String(mathDigitFloor + 1);
        } else if (mathDigitFloor >= 0) {
            if (mathAbsNumber > 5 * mathConvertedAbsValue) mathSum = epositionNumber + String(mathDigitFloor + 1);
            else if (mathAbsNumber < mathConvertedAbsValue / 5) mathSum = epositionNumber + String(mathDigitFloor - 1);
        }
        mathAbsNumber = parseFloat(mathSum);
        if (mathAbsNumber > 1.1 * convertedValue || mathAbsNumber < 0.9 * convertedValue) return convertedValue;
        else return mathAbsNumber;
    }
}
  getUnitMeasure(id: number): Promise<UnitDataStructure> {
    const url = `${this.dataUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as UnitDataStructure)
      .catch(this.handleError);
  }

  deleteUnitMeasure(id: number): Promise<void> {
    const url = `${this.dataUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  createUnitMeasure(name: string,id: number): Promise<UnitDataStructure> {
    return this.http
      .post(this.dataUrl, JSON.stringify({name: name,id:id}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as UnitDataStructure)
      .catch(this.handleError);
  }

  updateUnitMeasure(unitdatainfo: UnitDataStructure): Promise<UnitDataStructure> {
    const url = `${this.dataUrl}/${unitdatainfo.id}`;
    return this.http
      .put(url, JSON.stringify(unitdatainfo), {headers: this.headers})
      .toPromise()
      .then(() => unitdatainfo)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}

