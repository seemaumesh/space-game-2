import { Component } from '@angular/core';

@Component({
  selector: 'app-result-component',
  templateUrl: './result.component.html'
})
export class ResultComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
