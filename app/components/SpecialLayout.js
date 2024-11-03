"use client";

import SpecialNav from "./SpecialNav";

export default function SpecialLayout({ children }) {
    return (
        <>
            <SpecialNav />
            <main>{children}</main>
        </>
    );
}
