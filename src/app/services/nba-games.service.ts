import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry } from 'rxjs';
import { ResponseGame } from '../shared/models/response-game';
import { HeaderData } from '../config/header-data';
import { Game } from '../shared/models/game';
import { LocalStoreService } from './local-store.service';
import { KeyLocalStore } from '../shared/constants/keys-local-store';

@Injectable({
  providedIn: 'root',
})
export class NbaGamesService {
  private readonly base_url = 'https://free-nba.p.rapidapi.com';

  constructor(
    private http: HttpClient,
    private localStoreService: LocalStoreService
  ) {}

  getGames(): Observable<ResponseGame> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': HeaderData.RapidApiKey,
      'X-RapidAPI-Host': HeaderData.RapidApiHost,
    });

    const endpoint = `${this.base_url}/games`;
    return this.http
      .get<ResponseGame>(endpoint, { headers })
      .pipe(
        map((response: any) => this.mappingResponseApi(response)),
        retry(3));
  }

  mappingResponseApi(response: any): ResponseGame {
    return {
      data: response.data.map((item: any) => ({
        id: item.id,
        date: item.date,
        homeTeam: {
          id: item.home_team.id,
          abbreviation: item.home_team.abbreviation,
          city: item.home_team.city,
          conference: item.home_team.conference,
          division: item.home_team.division,
          fullName: item.home_team.full_name,
          name: item.home_team.name,
        },
        homeTeamScore: item.home_team_score,
        period: item.period,
        postseason: item.postseason,
        season: item.season,
        status: item.status,
        time: item.time,
        visitorTeam: {
          id: item.visitor_team.id,
          abbreviation: item.visitor_team.abbreviation,
          city: item.visitor_team.city,
          conference: item.visitor_team.conference,
          division: item.visitor_team.division,
          fullName: item.visitor_team.full_name,
          name: item.visitor_team.name,
        },
        visitorTeamScore: item.visitor_team_score,
      })),
      meta: {
        currentPage: response.meta.current_page,
        nextPage: response.meta.next_page,
        perPage: response.meta.per_page,
      },
    };
  }

  saveGame(game: Game) {
    const currentList: Game[] = this.localStoreService.getItem(
      KeyLocalStore.listGame
    );
    currentList.push(this.createObjectGame(game));
    this.localStoreService.setItem(KeyLocalStore.listGame, currentList);
  }

  updateGame(game: Game) {
    const currentList: Game[] = this.localStoreService.getItem(
      KeyLocalStore.listGame
    );
    const indexElement = currentList.findIndex(
      (element) => element.id === game.id
    );
    if (indexElement !== -1) {
      currentList[indexElement] = this.createObjectGame(game);
    } else {
      throw new Error('No se encontró el elemento con el id proporcionado.');
    }

    this.localStoreService.setItem(KeyLocalStore.listGame, currentList);
  }

  createObjectGame(game: Game): Game {
    return {
      id: Math.floor(Math.random() * 100) + 1,
      date: new Date().toString(),
      homeTeam: {
        id: Math.floor(Math.random() * 100) + 1,
        abbreviation: 'BAR',
        city: 'California',
        conference: '2',
        division: '4',
        fullName: 'Prueba',
        name: 'TEST',
      },
      homeTeamScore: 33,
      period: 66,
      postseason: false,
      season: game.season,
      status: game.status,
      time: '',
      visitorTeam: {
        id: Math.floor(Math.random() * 100) + 1,
        abbreviation: 'JK',
        city: 'Los Angeles',
        conference: '23',
        division: '64',
        fullName: 'Prueba V',
        name: 'TEST V',
      },
      visitorTeamScore: 10,
    };
  }
}
