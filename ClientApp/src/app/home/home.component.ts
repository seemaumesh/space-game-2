import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { Token } from '../../../node_modules/@angular/compiler';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
    export class HomeComponent {
    public show: string[];
    public space: Space;
    

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
        let vehicles, planets;
        http.get<Vehicle[]>(baseUrl + 'api/Space/vehicles').subscribe(result => {
        this.space.vehicles = result;
      }, error => console.error(error));

      http.get<Planet[]>(baseUrl + 'api/Space/planets').subscribe(result => {
      this.space.planets = result;
      }, error => console.error(error));
        this.space = new Space(vehicles, planets);
        this.show = ["empty"];

        //clear local storage
        localStorage.clear();

    }

    onChange($event, name) {
        var index = this.space.getIndex(name);
        if(this.show.includes(name) && !$event){

            this.show = this.show.filter(function(item) { 
              return item !== name
            });
            this.space.search.planets[index] = "";
            this.space.search.vehicle_names[index] = "";
        }
        else{
            this.show.push(name);

            this.space.search.planets[index] = $event.name;
            if(this.space.canUsePlanetNVehicle(index)){
              this.space.sumTime();
            }
           
        }

    }

    onVehicleChg($event, name){
        var vehicle = $event.currentTarget.parentElement.nextElementSibling.textContent;
        var index = this.space.getIndex(name);
        this.space.search.vehicle_names[index] = vehicle;
        if(this.space.canUsePlanetNVehicle(index)){
            this.space.sumTime();
        }
    }

    search_queen(){
        let token: string="";
        this.http.get<TokenResponse>(this.baseUrl + 'api/Space/token').subscribe(result => {
            this.space.search.token = result.token.trim();
            let modifiedSearch = {
                Vehicle_names: this.space.search.vehicle_names,
                Planet_names: this.space.search.planets,
                token: this.space.search.token
            };
            this.http.post<Result>(this.baseUrl+ 'api/Space', modifiedSearch).subscribe(result=>{

                localStorage.setItem('response', JSON.stringify(result));
                this.router.navigateByUrl('/response');
            });
        }, error => console.error(error));

    }

   
    enable_result(): boolean{
        return this.space.search.planets.includes("") || this.space.search.vehicle_names.includes("");
    }

   
}

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

interface Vehicle{
    name: string;
    total_no: number;
    max_distance: number;
    speed: number;
}

interface Planet{
    name: string;
    distance: number;

}

interface TokenResponse{
    token: string;
}

export class Search{
    vehicle_names: string[];
    planets: string[];
    token: string;
}

interface Result{
    name: string;
    status: boolean;
}