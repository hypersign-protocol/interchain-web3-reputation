import { 
    MsgRegisterDID
  } from "../generated/tx";

import axios from "axios";

export async function registerDIDCreateTransaction(client, elements, address) {
    const typeUrl = "/hypersign.ssi.v1.MsgRegisterDID";
    

    const { baseDidDocument, baseProofDocument } = elements;

    const fee = {
        amount: [
            {
                denom: "uhid",
                amount: "4000",
            },
        ],
        gas: "400000",
    };

    let result = null;
    let ssiTxMessage = {
        typeUrl,
        value: MsgRegisterDID.fromPartial({
            didDocument: baseDidDocument,
            didDocumentProofs: baseProofDocument,
            txAuthor: address
        }),
    };
    
    result = await client.signAndBroadcast(address, [ssiTxMessage], fee);
    return result;
}

export async function checkIfDidExists(docApi, didId) {
    try {
        const url = `${docApi}/hypersign-protocol/hidnode/ssi/did/${didId}` 
        console.log("URL ", url )
        await axios.get(
            url
        );
    } catch {
        return false
    }

    return true
}