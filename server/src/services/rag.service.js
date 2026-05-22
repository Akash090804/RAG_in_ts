import { searchYoutubeVideo } from "./youtube.service.js";
import { askGroq } from "../utils/groq.js";
import { buildRagPrompt } from "../prompts/rag.prompt.js";
import { keywordSearch } from "./hybrid.service.js";

export async function askQuestion(query) {

    // VECTOR SEARCH
    const vectorResults = await searchYoutubeVideo(query);

    // KEYWORD SEARCH
    const keywordResults = await keywordSearch(query);

    // SAFETY
    const vectorPoints = Array.isArray(vectorResults)
        ? vectorResults
        : vectorResults.points || [];

    // HYBRID MERGE
    const combinedResults = [
        ...vectorPoints,
        ...keywordResults
    ];

    // REMOVE DUPLICATES
    const uniqueResults = combinedResults.filter(
        (item, index, self) =>
            index === self.findIndex(
                (t) => t.payload.text === item.payload.text
            )
    );

    // TAKE TOP RESULTS
    const finalResults = uniqueResults.slice(0, 5);

    // CONTEXT BUILD
    const context = finalResults
        .map((r) => r.payload.text)
        .join("\n\n");

    // SOURCES
    const sources = finalResults.map(
        (r) => r.payload.source
    );

    // PROMPT
    const prompt = buildRagPrompt(context, query);

    // LLM
    const answer = await askGroq(prompt);

    return {
        answer,
        sources: [...new Set(sources)],
    };
}