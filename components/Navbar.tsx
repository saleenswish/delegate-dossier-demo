"use client";

import Link from "next/link";
import { useDelegation } from "@/context/DelegationContext";

export default function Navbar() {
    const { delegation } = useDelegation();

    return (
        <nav className="border-b bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <Link href="/" className="text-lg font-bold text-teal-700">
                    Delegate Dossier
                </Link>
                <Link
                    href="/delegation"
                    className="rounded-lg bg-teal-700 px-3 py-1.5 text-sm text-white hover:bg-teal-800"
                >
                    My Delegation ({delegation.length})
                </Link>
            </div>
        </nav>
    );
}
