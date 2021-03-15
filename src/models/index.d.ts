import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Airport {
  readonly id: string;
  readonly iata_id: string;
  readonly name: string;
  readonly cityname: string;
  constructor(init: ModelInit<Airport>);
  static copyOf(source: Airport, mutator: (draft: MutableModel<Airport>) => MutableModel<Airport> | void): Airport;
}