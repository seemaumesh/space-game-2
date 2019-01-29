import {Vehicle} from "../model/vehicle";
import {Planet} from "../model/planet";
import {Search} from "../model/Search";

export class Space{
    public vehicles: Vehicle[];
    public planets: Planet[];
    public search: Search;
    public time: number = 0;
    public times: number[] = [0,0,0,0];

    constructor(vehicles: Vehicle[],planets: Planet[]){
        this.vehicles = vehicles;
        this.planets = planets;
        this.search = <Search>{
            vehicle_names: ["", "", "", ""],
            planets: ["", "", "", ""]
        };
    }

    public sumTime(){
        this.time = 0;
        this.times.forEach(item=> this.time += item);
    }

    getIndex(pos: string): number{
        switch(pos){
                case 'first':
                    return 0;
                case 'sec':
                     return 1;
                case 'thir':
                     return 2;
                case 'four':
                     return 3;
            }
    }


    canUsePlanetNVehicle(index: number): boolean{
        this.calculateTime(index);
        if(this.times[index] > 0){
            return true;
        }
        return false;
    }

    private calculateTime(index: number){
        if(this.search.planets[index] && this.search.vehicle_names[index]){
            var planet = this.planets.find(planet=> planet.name === this.search.planets[index]);
            var vehicle = this.vehicles.find(vehicle=> vehicle.name === this.search.vehicle_names[index]);
            vehicle.total_no--;
            vehicle.max_distance = vehicle.max_distance - planet.distance;
            if(this.validVehicle(vehicle.total_no, vehicle.max_distance)){
              
              this.times[index] = planet.distance/vehicle.speed;
            }
        }
    }

    private validVehicle(num: number, distance: number): boolean{
        if(num>=0 && distance>=0){
            return true;
        }
        return false;
    }

}