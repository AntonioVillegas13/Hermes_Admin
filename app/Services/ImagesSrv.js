import { ref,  uploadBytes,  uploadString,put} from "firebase/storage";



export const SubirFoto =async (uri,id) => {
  console.log("______________________________ID:",id)
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
    const ImageRef = ref(global.storage, 'image'+id+'.jpg');


    
    
    uploadBytes(ImageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!',snapshot.metadata.downloadTokens);
    });
    // We're done with the blob, close and release it
    blob.close();
}


