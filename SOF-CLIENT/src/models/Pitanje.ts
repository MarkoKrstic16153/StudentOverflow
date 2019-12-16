import { Odgovor } from './Odgovor';

export interface Pitanje{
    Naslov:string;
    TekstPitanje:string;
    KoJePitao:string;
    Tagovi:string[];
    Upvotes:number;
    Odgovori:Odgovor[];
}