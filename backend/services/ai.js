import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from 'node-fetch';
import exifParser from 'exif-parser';

const gemini = {};

gemini.test = async (title, description, attachments) => {
    const genAI = new GoogleGenerativeAI(process.env.gemini_key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let metadata = [];

    try {
        const images = await Promise.all(attachments.map(async (attachment) => {
            const response = await fetch(attachment);
            const arrayBuffer = await response.arrayBuffer();
            const base64Image = Buffer.from(arrayBuffer).toString('base64');
            const mimeType = response.headers.get('content-type');

            const parser = exifParser.create(arrayBuffer);
            const result = parser.parse();
            metadata.push(result.tags);

            return { data: base64Image, mimeType: mimeType };
        }));

        const texts = [
            "Title: " + title,
            "Description: " + description,
            "Metadata: " + JSON.stringify(metadata),
            "Are these photos relevant to the title and description? Check the metadata as well. If yes, just type 'Yes'. Else, type 'No'."
        ];
        const requestPayload = [
            ...images.map(image => ({ inlineData: image })),
            ...texts.map(text => text)
        ];

        const result = await model.generateContent(requestPayload);
        return result.response.text();
    } catch (error) {
        console.error(error);
    }
}

export default gemini;