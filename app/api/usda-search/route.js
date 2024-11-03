import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    console.log("Query parameter:", query);
    const USDA_API_KEY = process.env.USDA_API_KEY; // eslint-disable-line no-process-env


    if (!query) {
        return NextResponse.json({ error: "No query provided" }, { status: 400 });
    }

    try {
        const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${USDA_API_KEY}&query=${query}&pageSize=10`);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
