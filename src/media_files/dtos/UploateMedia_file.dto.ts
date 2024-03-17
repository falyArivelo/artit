export class UploadMedia_FileDto{

    media_id: number; 
    file: File    

    convertFileToByte() {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(this.file);
            fileReader.onload = () => {
                // Convert the ArrayBuffer to a Uint8Array
                const byteArray = new Uint8Array(fileReader.result as ArrayBuffer);
                resolve(byteArray);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }
    
}