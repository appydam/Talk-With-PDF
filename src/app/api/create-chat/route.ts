//  /api/create-chat
import { loadS3IntoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    try {
        // when we upload the pdf to S3, then we also send that data to 
        // backend so that we can do pinecone embedding
        // To do hitting of API, we will use React Query to do that
        const body = await req.json();
        const { file_key, file_name } = body;
        console.log(file_key, file_name);
        await loadS3IntoPinecone(file_key);
        return NextResponse.json({message: 'success'})
        
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "internal server error" },
            { status: 500 }
        );
    }
}