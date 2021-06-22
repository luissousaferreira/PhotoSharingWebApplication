import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavphotosComponent } from './favphotos.component';

describe('FavphotosComponent', () => {
  let component: FavphotosComponent;
  let fixture: ComponentFixture<FavphotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavphotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavphotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
