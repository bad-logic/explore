from textwrap import dedent
from uuid import uuid4
from blockchain import Blockchain
import logging
import json
import os

from flask import Flask, jsonify, request

# Generate a globally unique address for this node
# address that receives the coin after mining
node_identifier = str(uuid4()).replace('-', '')

# globally initiate blockchain at server startup
block_chain = Blockchain()

app = Flask(__name__)

#  workaround throwing error
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False


@app.route('/mine', methods=['GET'])
def mine():
    # calculate POW
    # run pow algorithm to get the next proof
    last_block = block_chain.last_block

    last_proof = last_block['proof']
    proof = block_chain.proof_of_work(last_proof)

    # reward the miner with a coin
    # the sender is '0' to signify that this node has mined a new coin
    block_chain.new_transaction(
        sender='0', recipient=node_identifier, amount=1)
    # add the new block to the chain
    prev_hash = block_chain.hash(last_block)
    new_block = block_chain.new_block(proof, prev_hash)

    response = {
        'message': 'new block added',
        'index': new_block['index'],
        'transactions': new_block['transactions'],
        'proof': new_block['proof'],
        'previous_hash': new_block['previous_hash']
    }
    return jsonify(response), 200


@app.route('/transactions/new', methods=['POST'])
def new_transaction():
    values = request.get_json()
    app.logger.info(values)
    required = ['sender', 'recipient', 'amount']
    if not all(k in values for k in required):
        return 'Missing values', 400

    # create a new transaction
    index = block_chain.new_transaction(
        values['sender'], values['recipient'], values['amount'])
    response = {
        'message': f'Transaction added to block {index}'
    }
    return jsonify(response), 201


@app.route('/chain', methods=['GET'])
def full_chain():
    response = {
        'chain': block_chain.chain,
        'length': len(block_chain.chain)
    }
    return jsonify(response), 200


@app.route('/nodes/register', methods=['POST'])
def register_nodes():
    values = request.get_json()
    nodes = values.get('nodes')
    if nodes is None:
        return "Error: Please supply a valid list of nodes", 400

    for node in nodes:
        block_chain.register_node(node)

    response = {
        'message': 'New nodes have been added',
        'total_nodes': list(block_chain.nodes),
    }
    return jsonify(response), 201


@app.route('/nodes/resolve', methods=['GET'])
def resolve_nodes():
    replaced = block_chain.resolve_conflicts()

    if replaced:
        response = {
            'message': 'chain is tampered with',
            'new chain': block_chain.chain
        }
    else:
        response = {
            'message': 'chain is authoritatice',
            'new chain': block_chain.chain
        }
    return jsonify(response), 200


if __name__ == '__main__':
    PORT = os.environ.get('PORT')
    if PORT == None:
        raise Exception('environment variable PORT not found')
    app.run(debug=True, host='0.0.0.0', port=PORT)
