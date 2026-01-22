import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import initialCommands from "@/data/commands.json";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.toLowerCase();

    if (!query) {
        return NextResponse.json({ results: initialCommands });
    }

    // 1. Check local data first
    const localResults = initialCommands.filter((c) =>
        c.cmd.toLowerCase().includes(query)
    );

    // 2. If it looks like a single command and we want more info, search the web
    try {
        const searchUrl = `https://wiki.ubuntu-tr.net/index.php?search=${encodeURIComponent(query)}&title=%C3%96zel%3AAra&fulltext=1`;
        const response = await fetch(searchUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
        });
        const html = await response.text();
        const $ = cheerio.load(html);

        const webResults: any[] = [];

        $(".mw-search-result-heading").each((i, el) => {
            const title = $(el).text().trim().toLowerCase();
            const cmdName = title.split(" ")[0].replace(/[^a-z0-9]/gi, "");

            // Only include if the command name contains the query
            if (cmdName.includes(query)) {
                const desc = $(el).next(".mw-search-result-data").next(".searchresult").text().trim() ||
                    $(el).nextAll(".searchresult").first().text().trim();

                if (cmdName && desc && webResults.length < 6) {
                    webResults.push({
                        cmd: cmdName,
                        desc: desc.length > 200 ? desc.substring(0, 200) + "..." : desc,
                        usage: `${cmdName} [seçenekler]`,
                        category: "Web",
                        reverse: null
                    });
                }
            }
        });

        // Merge and deduplicate
        const combined = [...localResults];
        webResults.forEach(wr => {
            if (!combined.find(c => c.cmd === wr.cmd)) {
                combined.push(wr);
            }
        });

        return NextResponse.json({ results: combined });
    } catch (error) {
        console.error("Web search failed:", error);
        return NextResponse.json({ results: localResults });
    }
}
