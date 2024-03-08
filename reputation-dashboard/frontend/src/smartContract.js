export async function smartContractCodeInstantiateRPC(
    client,
    coinDenom,
    userAddress,
    codeId,
    instantiateMsg,
    smartContractlabel,
) {
    // Set the inital fee
    const fee = {
        amount: [
          {
            denom: coinDenom,
            amount: "4000",
          },
        ],
        gas: "20000000",
    };

    // Instantitate the smart contract code
    try {
        const txResult = await client.instantiate(
            userAddress, 
            parseInt(codeId), 
            instantiateMsg,
            smartContractlabel,
            fee
        )
        console.log("Transaction hash: ", txResult["transactionHash"]);
        alert("Transaction Successful: " + txResult["transactionHash"]);
        const contractAddress = txResult["contractAddress"]
        return contractAddress
    } catch (err) {
        console.log(err)
        alert("Transaction has failed, Error Log below \n\n " + err.message)
        return null
    }
}

export async function smartContractExecuteRPC(
    client,
    userAddress,
    contractAddress,
    executeMsg,
) { 
    if (userAddress === "") {
        alert("tx author address is empty")
        throw new Error()
    }
    // Set the inital fee
    const fee = {
        amount: [
          {
            denom: "uhid",
            amount: "4000",
          },
        ],
        gas: "20000000",
    };

    // Exectute the contract message
    try {
        const txResult = await client.execute(
            userAddress, 
            contractAddress, 
            executeMsg, 
            fee
        )
        console.log("Transaction hash: ", txResult["transactionHash"]);
        alert("Transaction Successful: " + txResult["transactionHash"]);
    } catch (err) {
        throw new Error(err)
    }
}

export async function smartContractQueryRPC(
    client,
    contractAddress,
    queryMsg,
) { 
    // Exectute the contract message
    try {
        const queryResult = await client.queryContractSmart( 
            contractAddress, 
            queryMsg,
        );
        return queryResult;
        
    } catch (err) {
        console.log(err.message)
        alert("Querying has failed, Error Log below \n\n " + err.message)
    }
}


export const hypersignBalanceActivityContracts = [
    "hid1efnsf3ruvvq5gtywy02nc05w0ecz8la2m0dzgyd4xemrawmk756qmg9sft"
]

export const osmosisLiquidityUserPositionContracts = [
    "hid17fjaprxxgg8m9mzdktg0lmky6q9kk2wsruer2vs9atsphxn5u2wssd5676"
]

export const stargazeNftOwnershipContracts = [
    "hid1fxqvh05m4mg03ujdhsl9muelke6puvmwx69t3k3d9qrghr6dqf8sy98tfy"
]

export const omniflixNftOwnershipContracts = [
    "hid13yrfm7u3qwqa2z4y379ap2mcrn8j89fzvk3uuju09zw2ejypcz4s06g9zx"
] 

export function checkIfContractExistsInList(contractList, contractToSearch) {
    for (let i=0; i < contractList.length; i++) {
        if (contractToSearch == contractList[i]) {
            return true
        }
    }

    return false
}

