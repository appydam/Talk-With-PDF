import {OpenAIApi, Configuration} from 'openai-edge';

const config = new Configuration({
    apiKey: process.env.OPENAI_API_SECRET_KEY
})

const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string) {
    try {
        const response = await openai.createEmbedding({
            model: 'text-embedding-ada-002',
            input: text.replace(/\n/g, ' ')  // replace new line character with empty space here
        })
        const result = await response.json()
        console.log('result of embedding = ', result);

        return result.data[0].embedding as number[]
    } catch (error) { 
        console.log('Error calling openai embeddings api ', error);
        throw error;
        
    }
}