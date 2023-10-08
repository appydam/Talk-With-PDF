import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone();


export const getPineconeClient = () => {
    return new Pinecone({
        environment: process.env.PINECONE_ENVIRONMENT!,
        apiKey: process.env.PINECONE_API_KEY!,
    });
};

export async function loadS3IntoPinecone(fileKey: string) {
    
}