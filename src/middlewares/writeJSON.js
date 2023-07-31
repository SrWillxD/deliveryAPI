import fs from 'fs';

async function writeJSON(filePath, data) {
    try {
        await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    }catch (err) {
        console.error("Error writing JSON file: ", err);
    }
}

export default writeJSON;