
export class UserDetail {
  first_name: string;
    last_name : string;
    userid: string;
    password:string;
    email:string;
    phone:string;
    gender:string;
    owener?:boolean;
    isRejected?:boolean;
    car_owner:boolean; //true
    CO_detail?: {
      licence_number:string;
      licence_date : any;
    }


}

