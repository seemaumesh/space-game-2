import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent, Space } from './home.component';
import {Search} from './home.component';
import { Component } from '../../../node_modules/@angular/core';
import { NgSelectModule } from '../../../node_modules/@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    
  }));

  beforeEach(() => {
    
  });

    it('check time', async(() => {
        let planets = [{name: "Donlon", distance: 100}, 
        {name: "Enchai", distance: 200}, 
        {name: "Jebing", distance: 300},
        {name: "Sapir", distance: 400},
        {name: "Lerbin", distance: 500},
        {name: "Pingasor", distance: 600}];
       let vehicles = [{name: "Space pod", total_no: 2, max_distance: 200, speed: 2},
        {name: "Space rocket", total_no: 1, max_distance: 300, speed: 4},
        {name: "Space shuttle", total_no: 1, max_distance: 400, speed: 5},
        {name: "Space ship", total_no: 2, max_distance: 600, speed: 10}];
        let space = new Space( vehicles, planets);
      space.search = <Search>{
            planets: ["Donlon", "Enchai", "Jebing", "Pingasor"],
            vehicle_names: ["Space ship", "Space ship", "Space rocket", "Space rocket"]
            };

        space.times = [0, 0, 0, 0]; 
        space.canUsePlanetNVehicle(0);
        space.sumTime();
        expect(space.times[0]).toEqual(10);
    }));
    it('check total', async(() => {
        let planets = [{name: "Donlon", distance: 100}, 
        {name: "Enchai", distance: 200}, 
        {name: "Jebing", distance: 300},
        {name: "Sapir", distance: 400},
        {name: "Lerbin", distance: 500},
        {name: "Pingasor", distance: 600}];
       let vehicles = [{name: "Space pod", total_no: 2, max_distance: 200, speed: 2},
        {name: "Space rocket", total_no: 1, max_distance: 300, speed: 4},
        {name: "Space shuttle", total_no: 1, max_distance: 400, speed: 5},
        {name: "Space ship", total_no: 2, max_distance: 600, speed: 10}];
        let space = new Space( vehicles, planets);
      space.search = <Search>{
            planets: ["Donlon", "Enchai", "Jebing", "Pingasor"],
            vehicle_names: ["Space ship", "Space ship", "Space rocket", "Space rocket"]
            };

        space.times = [0, 0, 0, 0]; 
        space.canUsePlanetNVehicle(0);
        space.sumTime();
        space.canUsePlanetNVehicle(1);
        space.sumTime();
        space.canUsePlanetNVehicle(2);
        space.sumTime();
        space.canUsePlanetNVehicle(3);
        space.sumTime();
        expect(space.time).toEqual(105);
  }));

});