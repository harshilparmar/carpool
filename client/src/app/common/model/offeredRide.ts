export class OfferRide{

  departing_from: string;
    arriving_at: string;
    departing_date: Date;
    departure_time: Date;
    arrival_time: string; // calculated route time
    waypoints: [string];
    // meeting_location: string,
    roundtrip: Boolean;
    returndate?: Date;
    returntime?: string;
    number_sits: Number;
    vehicle_type: string;
    vehicle_number: string;
    preferences: {
        chattiness:  Boolean;
        Smoking:  Boolean;
        pets : Boolean;
        music :  Boolean;
      };

    }


