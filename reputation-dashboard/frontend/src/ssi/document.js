import { clientSpecTypeFromJSON } from "../generated/client_spec";
import jsonld from 'jsonld';
import CryptoJS from 'crypto-js';

export function generateDid(pubKey, address, namespace) {
   let id = "did:hid:" + namespace + ":" + pubKey
   let baseDid = {
      "@context": [
         "https://www.w3.org/ns/did/v1",
         "https://ns.did.ai/suites/secp256k1-2019/v1"
      ],
      "id": id,
      "controller": [id],
      "verificationMethod": [{
         "id": id + "#k1",
         "type": "EcdsaSecp256k1VerificationKey2019",
         "controller": id,
         "publicKeyMultibase": pubKey,
         "blockchainAccountId":"cosmos:prajna:" + address
      }]
   }

   return baseDid
}

function stringToBuffer(s) {
   var binaryString = atob(s);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

export async function generateAndSignDidDocument(pubKey, address, namespace, chainId) {
   let didDoc = generateDid(pubKey, address, namespace)
   
   // Normalise Did Doc
   const normalisedDidDoc = await jsonld.normalize(
      didDoc, 
      {
          format: 'application/n-quads', 
          algorithm: 'URDNA2015'
      }
    );
    const normalisedDidDocHash = stringToBuffer(CryptoJS.SHA256(normalisedDidDoc).toString(CryptoJS.enc.Base64))
    
    // Construct Proof
   let proofDoc = {
      type: "EcdsaSecp256k1Signature2019",
      created: "2019-09-12T05:34:00Z",
      verificationMethod: didDoc["verificationMethod"][0]["id"],
      proofPurpose: "assertionMethod",
   }
   proofDoc["@context"] = didDoc["@context"]

   const normalisedDocProof = await jsonld.normalize(
      proofDoc, 
      {
         format: 'application/n-quads', 
         algorithm: 'URDNA2015'
      }
   );
   delete proofDoc["@context"]
   const normalisedDocProofHash = stringToBuffer(CryptoJS.SHA256(normalisedDocProof).toString(CryptoJS.enc.Base64))

   const finalNormalisedHash = concatArrays(normalisedDocProofHash, normalisedDidDocHash)
   console.log(finalNormalisedHash)
   const signResponseObj = await window.keplr.requestMethod("signArbitrary", [
      chainId,
      address,
      finalNormalisedHash,
    ]);
   
   proofDoc["proofValue"] = signResponseObj["signature"]
   proofDoc["clientSpecType"] = clientSpecTypeFromJSON(1)

   const proofDocs = [proofDoc]

   return {
      baseDidDocument: didDoc,
      baseProofDocument: proofDocs,
   };
}

function concatArrays(arr1, arr2) {
   let concatenatedArray = new Uint8Array(arr1.length + arr2.length);
 
   concatenatedArray.set(arr1, 0); // Copy elements from array1 to the beginning of the result
   concatenatedArray.set(arr2, arr1.length); // Copy elements from array2 after array1 in the result
 
   return concatenatedArray;
 }

export function setDidDocument(element, pubKey, address, namespace) {
    let didDoc = generateDid(pubKey, address, namespace)

    element.innerHTML = JSON.stringify(didDoc, null, 2)
} 