import { Game } from "./game";
import { Meta } from "./meta";

export interface ResponseGame {
    data :  Game[];
    meta: Meta;
}