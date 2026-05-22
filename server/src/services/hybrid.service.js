import winkBM25 from "wink-bm25-text-search";
import winkNLP from "wink-nlp";
import model from "wink-eng-lite-web-model";

const nlp = winkNLP(model);

const bm25 = winkBM25();

bm25.defineConfig({
  fldWeights: {
    text: 1,
  },
  bm25Params: {
    k1: 1.2,
    b: 0.75,
  },
});

bm25.definePrepTasks([
  (text) => {
    if (!text) return [];
    const doc = nlp.readDoc(text);
    return doc.tokens().out();
  },
]);

let indexed = false;

export function indexDocuments(chunks) {

  if (indexed) return;

  chunks.forEach((chunk, i) => {

    const text = chunk?.pageContent;

    if (!text || typeof text !== "string") {
      console.log(`Skipping invalid chunk ${i}`);
      return;
    }

    bm25.addDoc(
      { text },
      i
    );

  });

  bm25.consolidate();

  indexed = true;

  console.log("BM25 indexing completed");
}

export function keywordSearch(query) {

  if (!query || typeof query !== "string") {
    return [];
  }

  return bm25.search(query);
}