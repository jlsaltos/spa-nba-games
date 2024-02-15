import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGameComponent } from './form-game.component';
import { NbaGamesService } from '../../../services/nba-games.service';
import nbaGamesServiceMock from '../../../../mocks/nba-games-service.mock';
import { MaterialModule } from '../../../shared/material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FormGameComponent', () => {
  let component: FormGameComponent;
  let fixture: ComponentFixture<FormGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule 
      ],
      declarations: [FormGameComponent],
      providers: [
        {
          provide: NbaGamesService,
          useValue: nbaGamesServiceMock
        },
        FormBuilder
      ],
      
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
