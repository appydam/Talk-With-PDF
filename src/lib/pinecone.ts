import { Pinecone, PineconeRecord, utils as PineconeUtils } from '@pinecone-database/pinecone';
import { downloadFromS3 } from './s3-server';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import {
    Document,
    RecursiveCharacterTextSplitter,
  } from "@pinecone-database/doc-splitter";
import { getEmbeddings } from './embeddings';
import md5 from 'md5';
import { convertToAscii } from './utils';

// const pinecone = new Pinecone();


export const getPineconeClient = () => {
    return new Pinecone({
        environment: process.env.PINECONE_ENVIRONMENT!,
        apiKey: process.env.PINECONE_API_KEY!,
    });
};

type PDFPage = {
    pageContent: string,
    metadata: {
        loc: {pageNumber: number}
    }
}

export async function loadS3IntoPinecone(fileKey: string) {
    // 1. Obtain the pdf --> download and read from pdf
    console.log('Downloading S3 into file system')
    const file_name = await downloadFromS3(fileKey);
    if(!file_name){
        throw new Error("could not download from S3");
    }

    console.log("loading pdf into memory" + file_name);
    // loaded the pdf using a langchain library function
    const pdfLoader = new PDFLoader(file_name);
    const pages = (await pdfLoader.load()) as PDFPage[];  // pages will be array of document. Its basically splitting and segmenting the pdf
    // console.log('pages = ', pages);
 


    // 2. Split and segment the PDF into smaller documents
    // pages = Array(20)
    const documents = await Promise.all(pages.map(prepareDocument))
    // pages = Array(100)
    // console.log('documents = ', documents);

    // now that we have all documents, we can now vectorise and embed the individual documents

    // 3. Vectorise and embed individual documents 
    const vectors = await Promise.all(documents.flat().map(embedDocument));
    console.log('vectors = ', vectors);

    // 4. upload to pinecone
    const client = await getPineconeClient();
    const pineconeIndex = await client.index("talkpdf");
    // const namespace = pineconeIndex.namespace(convertToAscii(fileKey));

    // console.log('index name = ', pineconeIndex);
    // console.log('namespace = ', namespace);

    console.log("inserting vectors into pinecone");
    await pineconeIndex.upsert(vectors);


    // console.log("inserting vectors into pinecone");
    // await namespace.upsert(vectors);
    console.log('upserted???')
    // console.log('documents = ', documents);

    return documents[0];
}

async function embedDocument(doc: Document) {
    try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
        id: hash,
        values: embeddings,
        metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
        },
    } as PineconeRecord;
    } catch (error) {
    console.log("error embedding document", error);
    throw error;
    }
}


export const truncateStringByBytes = (str: string, bytes: number) => {
    const encoder = new TextEncoder();
    return new TextDecoder("utf-8").decode(encoder.encode(str).slice(0, bytes));
}


// takes a single page, look at the page content and split it up even further into smaller docs
async function prepareDocument(page: PDFPage) {
    let {pageContent, metadata} = page;
    pageContent = pageContent.replace(/\n/g, ""); // replace new line characters with empty strings

    // split the docs
    const splitter = new RecursiveCharacterTextSplitter();
    const docs = await splitter.splitDocuments([
        new Document({
        pageContent,
        metadata: {
            pageNumber: metadata.loc.pageNumber,
            text: truncateStringByBytes(pageContent, 36000),
        },
        }),
    ]);
    return docs;
}