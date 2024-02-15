import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardGameComponent } from './card-game.component';
import { MaterialModule } from '../../../../shared/material.module';

describe('CardGameComponent', () => {
  let component: CardGameComponent;
  let fixture: ComponentFixture<CardGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [CardGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
