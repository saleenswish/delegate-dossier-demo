import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { DelegationProvider } from "@/context/DelegationContext";

export const metadata: Metadata = {
    title: "Delegate Dossier",
    description: "Country research tool for MUN delegates",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <DelegationProvider>
                    <Navbar />
                    {children}
                </DelegationProvider>
            </body>
        </html>
    );
}
