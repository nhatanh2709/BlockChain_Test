const hash = require('crypto-js/sha256');
class Block {
    constructor(preHash,data){
        this.preHash=preHash;
        this.data=data;
        this.timeStamp = new Date();
        this.hash=this.calculateHash();
        this.mineVar=0;
    }
    calculateHash(){
        return hash(this.preHash+JSON.stringify(this.data)+this.timeStamp).toString();
    }
    mine(difficulty) {
        while(!this.hash.startsWith('0'.repeat(difficulty))){
            this.mineVar++;
            this.hash=this.calculateHash();
        }
    }

}
class Blockchain {
    constructor(difficulty){
        const genesisBlock = new Block ('0000',{
            isGenesis:true
        })
        this.difficulty=difficulty
        this.chain = [genesisBlock];
    }
    getLastBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(data){
        const lastBlock=this.getLastBlock();
        const newBlock=new Block(lastBlock.hash,data);
        console.log('start')
        console.time('mine')
        newBlock.mine(this.difficulty);
        console.timeEnd('mine')
        console.log('end')
        this.chain.push(newBlock);
    }
    isValid(){
        for(let i = 1 ; i<this.chain.length;i++){
            const currentBlock =this.chain[i];
            const preBlock = this.chain[i-1];
            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.preHash !=preBlock.hash){
                return false;
            }
        }
        return true;
    }
        
}
const anhChain = new Blockchain(100);
console.log(anhChain);
anhChain.addBlock({
    from: 'anh',
    to: 'nguyen',
    amount: 100
})
anhChain.addBlock({
    from: 'anh',
    to: 'tran',
    amount: 400
})
anhChain.addBlock({
    film:'github.cc'
})

console.log(anhChain.chain)
console.log('chain valid: ',anhChain.isValid())
