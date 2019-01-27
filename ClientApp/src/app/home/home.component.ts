import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
    export class HomeComponent {
    public vehicles: Vehicle[];
    public planets: Planet[];
    public show: string[];
    public search: Search= new Search();
    

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
      http.get<Vehicle[]>(baseUrl + 'api/Space/vehicles').subscribe(result => {
        this.vehicles = result;
      }, error => console.error(error));

      http.get<Planet[]>(baseUrl + 'api/Space/planets').subscribe(result => {
        this.planets = result;
      }, error => console.error(error));

        this.show = ["empty"];
    }

    onChange($event, name) {
        if(this.show.includes(name) && !$event){

            this.show = this.show.filter(function(item) { 
              return item !== name
            });
            this.search.planets = this.search.planets.filter(function(item){
                return item !== name;
            });
        }
        else{
            this.show.push(name);
            this.search.planets.push(name);
        }

    }

    onVehicleChg($event, name){
        var vehicle = $event.currentTarget.parentElement.nextElementSibling.textContent;
        this.search.vehicle_names.push(vehicle);
    }

    search_queen(){
        this.router.navigateByUrl('/counter');
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

class Search{
    vehicle_names: string[];
    planets: string[];
}