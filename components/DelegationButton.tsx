"use client";

import { Country } from "@/types/country";
import { useDelegation } from "@/context/DelegationContext";

interface Props {
    country: Country;
}

export default function DelegationButton({ country }: Props) {
    const { add, remove, has } = useDelegation();
    const saved = has(country.cca3);

    return (
        <button
            onClick={() => (saved ? remove(country.cca3) : add(country))}
            className={`w-full rounded-lg py-2 text-sm font-medium text-white ${saved ? "bg-red-600 hover:bg-red-700" : "bg-teal-700 hover:bg-teal-800"
                }`}
        >
            {saved ? "Remove from delegation" : "Add to my delegation"}
        </button>
    );
}
