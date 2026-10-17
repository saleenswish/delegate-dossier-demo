// app/api/countries/route.ts
import { NextRequest, NextResponse } from "next/server";

const BASE = "https://api.restcountries.com/countries/v5";

const FIELDS = [
    "names.common",
    "names.official",
    "codes.alpha_3",
    "flag.url_png",
    "flag.url_svg",
    "flag.description",
    "region",
    "subregion",
    "capitals",
    "population",
    "languages",
    "currencies",
    "borders",
].join(",");

type ApiResponse = {
    data?: {
        objects?: unknown[];
        meta?: { more?: boolean };
    };
    errors?: { message?: string }[];
};

async function requestApi(url: string): Promise<ApiResponse> {
    const key = process.env.COUNTRIES_API_KEY;

    if (!key) {
        throw new Error("Missing COUNTRIES_API_KEY in .env.local");
    }

    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${key}` },
        cache: "no-store",
    });

    const result = (await response.json()) as ApiResponse;

    if (!response.ok) {
        throw new Error(
            result.errors?.[0]?.message ?? `Country API error: ${response.status}`
        );
    }

    return result;
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get("code")?.trim().toUpperCase();
        const codes = searchParams.get("codes");

        if (code) {
            const result = await requestApi(
                `${BASE}/codes.alpha_3/${encodeURIComponent(code)}?response_fields=${encodeURIComponent(FIELDS)}`
            );

            return NextResponse.json(result.data?.objects ?? []);
        }

        if (codes) {
            const codeList = [...new Set(codes.split(",").map((item) => item.trim().toUpperCase()))]
                .filter(Boolean);

            const results = await Promise.all(
                codeList.map(async (item) => {
                    const result = await requestApi(
                        `${BASE}/codes.alpha_3/${encodeURIComponent(item)}?response_fields=${encodeURIComponent(FIELDS)}`
                    );

                    return result.data?.objects ?? [];
                })
            );

            return NextResponse.json(results.flat());
        }

        // Fetch every page (the free plan allows up to 100 records per page).
        const allCountries: unknown[] = [];
        let offset = 0;

        while (true) {
            const url =
                `${BASE}?limit=100&offset=${offset}` +
                `&response_fields=${encodeURIComponent(FIELDS)}`;

            const result = await requestApi(url);
            const page = result.data?.objects ?? [];

            allCountries.push(...page);

            if (page.length === 0 || !result.data?.meta?.more) {
                break;
            }

            offset += page.length;
        }

        return NextResponse.json(allCountries);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Could not load countries";

        console.error("Countries API:", message);

        return NextResponse.json({ error: message }, { status: 502 });
    }
}
