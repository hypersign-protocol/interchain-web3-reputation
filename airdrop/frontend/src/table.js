export async function buildTable(htmElement, walletAddresses, airdropAmount) {
    htmElement.innerHTML = null
    for (var i = 0; i < walletAddresses.length; i++) {
        htmElement.innerHTML += `
            <tr>
                <td>${walletAddresses[i]}</td>
                <td>${airdropAmount}</td>
            </tr>
        `
    }
}