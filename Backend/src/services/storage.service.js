import imagekit from "@imagekit/nodejs";

async function uploadMusicFile(musicFile){
    const client = new imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY});

    const response = await client.files.upload({
    file: musicFile,
    fileName: 'music_'+Date.now(),
    folder: '/music',
    });

    return response;
}

export { uploadMusicFile };