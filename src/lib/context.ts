import { Pinecone } from "@pinecone-database/pinecone";
import { convertToAscii } from "./utils";
import { getEmbeddings } from "./embeddings";

export async function getMatchesFromEmbeddings(
  embeddings: number[],
  fileKey: string
) {
  try {
    const client = new Pinecone({
      environment: process.env.PINECONE_ENVIRONMENT!,
      apiKey: process.env.PINECONE_API_KEY!,
    });
    const pineconeIndex = await client.index("talkpdf");
    const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
    // const queryResult = await pineconeIndex.namespace
    // namespace(convertToAscii(fileKey)).query({
    //   topK: 5,
    //   vector: embeddings,
    //   includeMetadata: true,
    // });

    console.log(namespace, 'namespace');

    const queryResult = await pineconeIndex.query({
        topK: 5,
        vector: embeddings,
        includeMetadata: true,
      });

      
      console.log(queryResult, 'queryResult');


    return queryResult.matches || [];
  } catch (error) {
    console.log("error querying embeddings", error);
    throw error;
  }
}

export async function getContext(query: string, fileKey: string) {
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

//    look for all matches vector and score agar 70% se jada hai toh voh qualify kar raha hai for matched seach
  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.7
  );

  type Metadata = {
    text: string;
    pageNumber: number;
  };

  //   get back the text from metadata which we got from qualifying doc
  let docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);
  // 5 vectors
  // basically we are talking 5 paragraph and joining together, then we will pass this data to openAI for more refignment and then will return the result got from there
  return docs.join("\n").substring(0, 3000);
  // incase the doc reaches 3000 characters then just cut the text ahead as it can reach token limit in openai and cost increase ho jayegi
}