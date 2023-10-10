//  /api/create-chat
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { loadS3IntoPinecone } from "@/lib/pinecone";
import { getS3URL } from "@/lib/s3";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {

    const {userId} = await auth();
    if(!userId){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    try {
        // when we upload the pdf to S3, then we also send that data to 
        // backend so that we can do pinecone embedding
        // To do hitting of API, we will use React Query to do that
        const body = await req.json();
        const { file_key, file_name } = body;
        console.log(file_key, file_name);
        // const pages = await loadS3IntoPinecone(file_key);
        // return NextResponse.json({pages})

        await loadS3IntoPinecone(file_key);
        
        // now we need to create chat
        // we will use drizzle-orm to create the chat
        const chat_id = await db.insert(chats).values({
            fileKey: file_key,
            pdfName: file_name,
            pdfUrl: getS3URL(file_key),
            userId
        }).returning({
            insertedId: chats.id
        })

        return NextResponse.json(
            { chat_id: chat_id[0].insertedId }, 
            { status: 200 }
        );
        
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "internal server error" },
            { status: 500 }
        );
    }
}