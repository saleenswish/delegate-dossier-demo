import { Country } from "@/types/country";
import DelegationButton from "./DelegationButton";

interface Props {
    country: Country;
}

export default function CountryCard({ country }: Props) {
    return (
        <div className="overflow-hidden rounded-xl bg-white shadow-xl">
            <img
                src={country.flags.png}
                alt={country.flags.alt ?? `Flag of ${country.name.common}`}
                width={320}
                height={200}
                className="h-40 w-full object-cover"
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold">{country.name.common}</h2>
                <p className="text-sm text-gray-600">
                    Capital: {country.capital?.[0] ?? "N/A"}
                </p>
                <p className="text-sm text-gray-600">Region: {country.region}</p>
                <p className="mb-3 text-sm text-gray-600">
                    Population: {country.population.toLocaleString()}
                </p>
                <DelegationButton country={country} />
            </div>
        </div>
    );
}
