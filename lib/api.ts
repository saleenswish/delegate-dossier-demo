// lib/api.ts
import type { Country, CountryRef } from "@/types/country";

type ApiCountry = {
    names?: {
        common?: string;
        official?: string;
    };
    codes?: {
        alpha_3?: string;
    };
    flag?: {
        url_png?: string;
        url_svg?: string;
        description?: string;
    };
    region?: string;
    subregion?: string;
    capitals?: { name?: string }[];
    population?: number;
    languages?: Record<string, string>;
    currencies?: Record<string, { name: string; symbol?: string }>;
    borders?: string[];
};

function mapCountry(item: ApiCountry): Country {
    const name = item.names?.common ?? "Unknown country";

    return {
        cca3: item.codes?.alpha_3 ?? "",
        name: {
            common: name,
            official: item.names?.official ?? name,
        },
        flags: {
            png: item.flag?.url_png ?? "",
            svg: item.flag?.url_svg ?? "",
            alt: item.flag?.description,
        },
        region: item.region ?? "Other",
        subregion: item.subregion,
        capital: item.capitals
            ?.map((capital) => capital.name)
            .filter((value): value is string => Boolean(value)),
        population: item.population ?? 0,
        languages: item.languages,
        currencies: item.currencies,
        borders: item.borders,
    };
}

async function fetchApi(path: string): Promise<unknown> {
    const response = await fetch(path);

    if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Failed to fetch countries");
    }

    return response.json();
}

export async function getAllCountries(): Promise<Country[]> {
    const data: unknown = await fetchApi("/api/countries");

    if (!Array.isArray(data)) {
        throw new Error("Unexpected country list response");
    }

    return (data as ApiCountry[])
        .filter((item) => item.names?.common && item.codes?.alpha_3)
        .map(mapCountry);
}

export async function getCountry(code: string): Promise<Country> {
    const data: unknown = await fetchApi(
        `/api/countries?code=${encodeURIComponent(code)}`
    );

    if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Country not found");
    }

    return mapCountry(data[0] as ApiCountry);
}

export async function getCountriesByCodes(
    codes: string[]
): Promise<CountryRef[]> {
    if (codes.length === 0) return [];

    const data: unknown = await fetchApi(
        `/api/countries?codes=${encodeURIComponent(codes.join(","))}`
    );

    if (!Array.isArray(data)) return [];

    return (data as ApiCountry[])
        .filter((item) => item.names?.common && item.codes?.alpha_3)
        .map((item) => ({
            cca3: item.codes!.alpha_3!,
            name: {
                common: item.names!.common!,
                official: item.names?.official ?? item.names!.common!,
            },
        }));
}
