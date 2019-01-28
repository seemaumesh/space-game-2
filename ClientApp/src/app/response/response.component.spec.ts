import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseComponent } from './response.component';

describe('ResultComponent', () => {
  let component: ResponseComponent;
  let fixture: ComponentFixture<ResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseComponent ]
    })
    .compileComponents();
  }));

    beforeEach(() => {
        localStorage.setItem('response', JSON.stringify({status: true, name: "Earth"}));
    fixture = TestBed.createComponent(ResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    it('should display a title', async(() => {

    const titleText = fixture.nativeElement.querySelector('h1').textContent;
    expect(titleText).toEqual('Response');
    }));

     it('should display name', async(() => {

    const titleText = fixture.nativeElement.querySelector('#name').textContent.trim();
    expect(titleText).toEqual('The queen was located on Earth');
  }));

});