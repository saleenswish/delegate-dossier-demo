export interface Country {
    cca3: string;
    name: { common: string; official: string };
    flags: { png: string; alt?: string };
    region: string;
    subregion?: string;
    capital?: string[];
    population: number;
    languages?: string[];
    currencies?: string[];
    borders?: string[];
}

export type CountryRef = Pick<Country, "cca3" | "name">;
