import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const unitmeasuredatainfo = [ { id:100,name:"centimeter (cm)"}, 
                                  { id:10,name:"decimeter (dm)"}, 
                                  { id:3.2808398950131,name:"foot (ft)"}, 
                                  { id:39.370078740157,name:"inch (in)"}, 
                                  { id:0.001,name:"kilometer (km)"},  
                                  { id:1,name:"meter (m)"}, 
                                  { id:1.0936132983377,name:"yard (yd)"} ];
    return {unitmeasuredatainfo};
  }
}
