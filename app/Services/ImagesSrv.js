import { ref,  uploadBytes,  uploadString } from "firebase/storage";



export const SubirFoto = () => {


    const ImageRef = ref(global.storage, 'mountains.jpg');


    // Base64 formatted string

    const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
    uploadBytes(ImageRef, bytes).then((snapshot) => {
      console.log('Uploaded an array!');
    }).catch((e)=>{
console.log("ERROR=>",e)

    });
}


