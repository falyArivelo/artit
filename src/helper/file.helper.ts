import { Media_file } from "src/entities/Media_file.entity";
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { imageDirectory } from "src/constante";
// base64 to byteas
export function Uint8ArrayFromBase64(base64: string) {
    return Uint8Array.from(window.atob(base64), (v) => v.charCodeAt(0));
}

// convert file to bytea
export function fileToUint8Array(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const arrayBuffer = event.target.result;
            const uint8Array = new Uint8Array(arrayBuffer as ArrayBuffer);
            resolve(uint8Array);
        };
        reader.onerror = function(error) {
            reject(error);
        };
        reader.readAsArrayBuffer(file);
    });
}

export async function getMediaFiles(files: any[]) {
    var medias: Media_file[] = [];
    console.log(files);
    for (let img of files) {
        console.log("image ",img)
        //const base64String = fs.readFileSync(img.pa)
        //file.media_file_data = img.buffer;
        //medias.push(file);
    }
    return medias;
}



/*function convertFileToByte(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onloadend = (evt) => {
            if (evt.target.readyState === FileReader.DONE) {
                let arrayBuffer = evt.target.result;
                let byteArray = new Uint8Array(arrayBuffer as ArrayBuffer);
                resolve(byteArray);
            } else {
                reject(new Error("Failed to read file"));
            }
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsArrayBuffer(file);
    });
}*/

function convertFileToByte(file: File) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onloadend = (evt) => {
            if (evt.target.readyState === FileReader.DONE) {
                let arrayBuffer = evt.target.result;
                let byteArray = new Uint8Array(arrayBuffer as ArrayBuffer);
                resolve(byteArray);
            } else {
                reject(new Error("Failed to read file"));
            }
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsArrayBuffer(file);
    });
}

export const storage_config = diskStorage({
    destination: imageDirectory,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
  });