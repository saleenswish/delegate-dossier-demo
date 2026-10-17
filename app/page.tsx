"use client";

import { useEffect, useState } from "react";
import { Country } from "@/types/country";
import { getAllCountries } from "@/lib/api";
import SearchBar from "@/components/SearchBar";
import RegionFilter from "@/components/RegionFilter";
import CountryGrid from "@/components/CountryGrid";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";

export default function Home() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>("");
    const [region, setRegion] = useState<string>("All");

    // Fetch all countries once, when the page loads
    useEffect(() => {
        getAllCountries()
            .then((data) => setCountries(data))
            .catch((e: Error) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    // Computed from state, so it is not stored in its own state
    const filtered = countries
        .filter(
            (c) =>
                c.name.common.toLowerCase().includes(search.toLowerCase()) &&
                (region === "All" || c.region === region)
        )
        .sort((a, b) => a.name.common.localeCompare(b.name.common));

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <main className="mx-auto max-w-6xl px-4 py-6">
            <h1 className="mb-1 text-2xl font-bold">Research a country</h1>
            <p className="mb-5 text-sm text-gray-600">
                Showing {filtered.length} of {countries.length} countries
            </p>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                <SearchBar value={search} onChange={setSearch} />
                <RegionFilter value={region} onChange={setRegion} />
            </div>
            <CountryGrid countries={filtered} />
        </main>
    );
}
