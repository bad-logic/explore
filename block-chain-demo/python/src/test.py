from hashlib import sha256
from blockchain import Blockchain
x = 5
y = 0  # We don't know what y should be yet...
while sha256(f'{x*y}'.encode()).hexdigest()[-1] != "0":
    y += 1
print(f'The solution is y = {y}')

block_chain = Blockchain()

# block_chain.new_transaction('rsh', 'hsr', 3400)


print('mining...........')
last_block = block_chain.last_block
print(last_block)

last_proof = last_block['proof']
proof = block_chain.proof_of_work(last_proof)
print(last_block, last_proof, proof)

# reward the miner with a coin
# the sender is '0' to signify that this node has mined a new coin
block_chain.new_transaction(
    sender='0', recipient='node_identifier', amount=1)
# add the new block to the chain
prev_hash = block_chain.hash(last_block)
new_block = block_chain.new_block(proof, prev_hash)
