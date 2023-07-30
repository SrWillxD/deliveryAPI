import fs from 'fs';

async function captureJSON(filePath){
    try{
        const jsonString = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(jsonString);
    }catch(err){
        console.error("Error reading JSON file: ", err);
        return null;
    }
}

export default captureJSON;