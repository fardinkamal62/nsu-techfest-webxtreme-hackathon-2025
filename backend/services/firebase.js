import admin from 'firebase-admin';
import fs from 'fs';

admin.initializeApp({
    credential: admin.credential.cert({
        project_id: process.env.project_id,
        private_key: process.env.private_key.replace(/\\n/g, '\n'),
        client_email: process.env.client_email
    }),
    storageBucket: 'personal-website-fd387.appspot.com'
});

const bucket = admin.storage().bucket();

export async function upload_image(ref, filename, filepath) {
    try {
        const upload_loc = `${ref}/${filename}`;
        const file = bucket.file(upload_loc);

        await bucket.upload(filepath, {
            destination: file,
            metadata: {
                contentType: 'auto'
            }
        });

        const [url] = await file.getSignedUrl({
            action: 'read',
            expires: '03-01-2500'
        });

        return url;
    } catch (error) {
        console.error("FirebaseManager, upload_image(): " + error);
        throw error;
    }
}