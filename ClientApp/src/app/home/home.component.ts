import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { Token } from '../../../node_modules/@angular/compiler';
import {Space} from "../service/SpaceService";
import {Vehicle} from "../model/vehicle";
import {Planet} from "../model/planet";
import {Search} from "../model/Search";
import {TokenResponse} from "../model/tokenResponse";
import {Result} from "../model/Result";

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
