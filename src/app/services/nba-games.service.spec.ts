import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NbaGamesService } from './nba-games.service';

describe('NbaGamesService', () => {
  let service: NbaGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(NbaGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
