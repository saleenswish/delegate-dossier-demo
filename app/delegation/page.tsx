"use client";

import Link from "next/link";
import { useDelegation } from "@/context/DelegationContext";
import CountryGrid from "@/components/CountryGrid";

export default function DelegationPage() {
    const { delegation } = useDelegation();

    return (
        <main className="mx-auto max-w-6xl px-4 py-6">
            <h1 className="mb-1 text-2xl font-bold">My Delegation</h1>
            <p className="mb-5 text-sm text-gray-600">
                {delegation.length} saved {delegation.length === 1 ? "country" : "countries"}
            </p>

            {delegation.length === 0 ? (
                <div className="py-10 text-center">
                    <p className="mb-3 text-gray-500">You have not added any countries yet.</p>
                    <Link href="/" className="text-teal-700 hover:underline">
                        Browse countries
                    </Link>
                </div>
            ) : (
                <CountryGrid countries={delegation} />
            )}
        </main>
    );
}
