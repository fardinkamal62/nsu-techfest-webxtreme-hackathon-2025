import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = {};

gemini.test = async (title, description, attachments) => {
    const genAI = new GoogleGenerativeAI(process.env.gemini_key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const images = await Promise.all(attachments.map(async (attachment) => {
            const response = await fetch(attachment);
            const arrayBuffer = await response.arrayBuffer();
            const base64Image = Buffer.from(arrayBuffer).toString('base64');
            const mimeType = response.headers.get('content-type');
            return { data: base64Image, mimeType: mimeType };
        }));

        const texts = ["Title: " + title, "Description: " + description, "Is this photo relevant to the title and description? If yes, just type 'Yes'. Else, type 'No'."];
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