export interface Country {
    cca3: string;
    name: { common: string; official: string };
    flags: { png: string; svg: string; alt?: string };
    region: string;
    subregion?: string;
    capital?: string[];
    population: number;
    languages?: Record<string, string>;
    currencies?: Record<string, { name: string; symbol?: string }>;
    borders?: string[];
}

export type CountryRef = Pick<Country, "cca3" | "name">;
