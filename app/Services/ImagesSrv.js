import { ref, uploadBytes, uploadString, put, getMetadata, getDownloadURL } from "firebase/storage";



export const SubirFoto = async (uri, id, fnsetUrl) => {
  console.log("______________________________ID:", id)
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
  const ImageRef = ref(global.storage, 'image' + id + '.jpeg');
  await uploadBytes(ImageRef, blob).then((snapshot) => {
    console.log('----------------------------', snapshot.metadata.fullPath);
    console.log('Uploaded a blob or file!', snapshot.metadata.downloadTokens);

  });


  await getDownloadURL(ImageRef)
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
      console.log("UROLSSSSS_", url)
      fnsetUrl(url)
    })
    .catch((error) => {
      // Handle any errors
    });

  // We're done with the blob, close and release it
  blob.close();



}


