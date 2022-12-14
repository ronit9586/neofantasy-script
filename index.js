const url = "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=inr";
const web3 = new Web3(window.ethereum);
window.ethereum.enable();
const tresuaryWallet = "0x462Ca7b60442912C11E801F842ed1a6702De015B";

const handleOnClick = async (amountWantToBuyInRupee) => {
    try {
        const resp = await fetch(url);
        const priceObject = await resp.json();
        const maticPriceInRupee = priceObject["matic-network"].inr;
        const maticNeedToTransfer = (amountWantToBuyInRupee / maticPriceInRupee).toFixed(5);
        const from = (await web3.eth.getAccounts())[0];
        const tx = await web3.eth.sendTransaction({
            from,
            to: tresuaryWallet,
            value: Web3.utils.toWei(maticNeedToTransfer)
        }); 
        console.log(tx.transactionHash)
    } catch (error) {
        console.log(error) 
    }
}