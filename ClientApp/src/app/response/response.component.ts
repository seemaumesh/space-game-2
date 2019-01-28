import { Component } from '@angular/core';

@Component({
  selector: 'app-result-component',
  templateUrl: './response.component.html'
})
    export class ResponseComponent {
    displayContent: any= {
        status: false,
        name: ""
    };
    
    constructor() {
        this.displayContent = JSON.parse(localStorage.getItem('response'));
    }
}
