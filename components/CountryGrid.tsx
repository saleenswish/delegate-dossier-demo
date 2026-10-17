import { Country } from "@/types/country";
import CountryCard from "./CountryCard";

interface Props {
    countries: Country[];
}

export default function CountryGrid({ countries }: Props) {
    if (countries.length === 0) {
        return <p className="py-10 text-center text-gray-500">No countries found.</p>;
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {countries.map((country) => (
                <CountryCard key={country.cca3} country={country} />
            ))}
        </div>
    );
}
