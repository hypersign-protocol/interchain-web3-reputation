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
    "hid1d8m875429a9ap2w3yx4z9lrghzv67t5vpunvx9p38hxyzfmsqtmqaagwvl",
    "hid1usz2nl5cl4eednc3y5m7rwms2um9yzsqljfxp7r9r325gnr62tdqa77h0m"
]

export const stargazeNftOwnershipContracts = [
    "hid1dl75838620ns00tf90ckwx428qxtvh4cv6wg9qakf3syrys2v3cqvayqhk",
    "hid17de08x8pe43kmzdea08u3q7dv5t3pfpujnnkz2vw7n5hldnwt5sshhqx9f"
]

export const omniflixNftOwnershipContracts = [
    "hid1w83j83pycn6er55qsvp7v2uzq2rpd38yuq508apfvnnxd0lcddxsnfs6yx"
] 

export function checkIfContractExistsInList(contractList, contractToSearch) {
    for (let i=0; i < contractList.length; i++) {
        if (contractToSearch == contractList[i]) {
            return true
        }
    }

    return false
}

