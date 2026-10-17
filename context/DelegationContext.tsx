"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Country } from "@/types/country";

interface DelegationContextType {
    delegation: Country[];
    add: (country: Country) => void;
    remove: (code: string) => void;
    has: (code: string) => boolean;
}

const DelegationContext = createContext<DelegationContextType | null>(null);

export function DelegationProvider({ children }: { children: ReactNode }) {
    const [delegation, setDelegation] = useState<Country[]>([]);

    const add = (country: Country) => {
        setDelegation((prev) =>
            prev.some((c) => c.cca3 === country.cca3) ? prev : [...prev, country]
        );
    };

    const remove = (code: string) => {
        setDelegation((prev) => prev.filter((c) => c.cca3 !== code));
    };

    const has = (code: string) => delegation.some((c) => c.cca3 === code);

    return (
        <DelegationContext.Provider value={{ delegation, add, remove, has }}>
            {children}
        </DelegationContext.Provider>
    );
}

export function useDelegation() {
    const ctx = useContext(DelegationContext);
    if (!ctx) {
        throw new Error("useDelegation must be used inside DelegationProvider");
    }
    return ctx;
}
