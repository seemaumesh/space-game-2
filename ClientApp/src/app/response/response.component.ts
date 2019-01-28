import { Component } from '@angular/core';

@Component({
  selector: 'app-result-component',
  templateUrl: './response.component.html'
})
export class ResponseComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
