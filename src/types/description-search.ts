import {Database} from 'sqlite3';

interface RowData {
  manga_id: string;
  title: string;
  sfw: string;
  genres: string;
  themes: string;
  demographics: string;
  authors: string;
  synopsis: string;
  background: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string;
}

// Đọc dữ liệu từ database
function fetchData(): Promise<RowData[]> {
  // Open the SQLite database
  const db = new Database('../src/data/manga.db');
  return new Promise((resolve, reject) => {
    const query = `SELECT manga_id, title, sfw, genres, themes, demographics, authors, synopsis, background, title_english, title_japanese, title_synonyms FROM manga_table`; // replace manga_table with your table name

    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        // Map rows to the RowData interface
        const data: RowData[] = rows.map((row: any) => ({
          manga_id: row.manga_id,
          title: row.title,
          sfw: row.sfw,
          genres: row.genres,
          themes: row.themes,
          demographics: row.demographics,
          authors: row.authors,
          synopsis: row.synopsis,
          background: row.background,
          title_english: row.title_english,
          title_japanese: row.title_japanese,
          title_synonyms: row.title_synonyms,
        }));
        resolve(data);
      }
    });
  });
}


// Hàm tính term frequency (TF)
function computeTF(description: string[]): Map<string, number> {
  const tfMap = new Map<string, number>();
  description.forEach(word => {
    tfMap.set(word, (tfMap.get(word) || 0) + 1);
  });
  const descriptionSize = description.length;
  for (const [word, count] of tfMap) {
    tfMap.set(word, count / descriptionSize);
  }
  return tfMap;
}

// Hàm tính inverse descriptionument frequency (IDF)
function computeIDF(descriptions: string[][]): Map<string, number> {
  const idfMap = new Map<string, number>();
  const descriptionCount = descriptions.length;

  descriptions.forEach(description => {
    const uniqueWords = new Set(description);
    uniqueWords.forEach(word => {
      idfMap.set(word, (idfMap.get(word) || 0) + 1);
    });
  });

  for (const [word, count] of idfMap) {
    idfMap.set(word, Math.log(descriptionCount / (1 + count)));
  }
  return idfMap;
}

// Hàm tính TF-IDF của mô tả (description)
function computeTFIDF(description: string[], idfMap: Map<string, number>): Map<string, number> {
  const tfMap = computeTF(description);
  const tfidfMap = new Map<string, number>();

  for (const [word, tf] of tfMap) {
    const idf = idfMap.get(word) || 0;
    tfidfMap.set(word, tf * idf);
  }
  return tfidfMap;
}

// Hàm tính cosine similarity giữa 2 vector TF-IDF
function cosineSimilarity(tfidfA: Map<string, number>, tfidfB: Map<string, number>): number {
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  tfidfA.forEach((value, key) => {
    dotProduct += value * (tfidfB.get(key) || 0);
    magnitudeA += value ** 2;
  });

  tfidfB.forEach(value => {
    magnitudeB += value ** 2;
  });

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
}

// Hàm đọc dữ liệu từ CSV, tính TF-IDF và tìm đầu truyện tương ứng mô tả
export async function descriptionSearch(description: string) {
  try {
    const data = await fetchData();
    const titles = data.map(row => row.title);
    const synopses = data.map(row => row.synopsis);

    // Tokenize the descriptionuments
    const descriptions = synopses.map(synopsis => synopsis.toLowerCase().split(/\W+/));
    const queryTokens = description.toLowerCase().split(/\W+/);

    // Compute IDF values across all descriptionuments
    const idfMap = computeIDF(descriptions);

    // Compute TF-IDF for each descriptionument
    const tfidfdescriptions = descriptions.map(description => computeTFIDF(description, idfMap));

    // Compute TF-IDF for the query description
    const queryTfidf = computeTFIDF(queryTokens, idfMap);

    // Calculate cosine similarity between the query and each descriptionument
    const similarities = tfidfdescriptions.map((tfidfdescription, index) => ({
      title: titles[index],
      similarity: cosineSimilarity(queryTfidf, tfidfdescription),
    }));

    // Find the descriptionument with the highest similarity
    const topResult = similarities.reduce((best, current) =>
      current.similarity > best.similarity ? current : best
    );

    return topResult.title;
    // Output the top result
    console.log("Most similar title:");
    console.log(`${topResult.title} (Similarity: ${topResult.similarity.toFixed(2)})`);
  } catch (error) {
    console.error("Error:", error);
    return '';
  }
}



// test function
// const description = "Naruto";
// descriptionSearch(description);
