const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

class CelestiaClient {
    constructor() {
        this.rpcUrl = process.env.CELESTIA_RPC_URL || "http://localhost:26658";
        this.authToken = process.env.CELESTIA_AUTH_TOKEN || "";
    }

    /**
     * Generates a unique 8-byte namespace ID required by Celestia.
     * @param {string} rollupId Unique string identifier for your L2/L3 rollup.
     */
    generateNamespaceId(rollupId) {
        const hash = crypto.createHash('sha256').update(rollupId).digest();
        // Return the first 8 bytes of the hash as a hex string
        return hash.slice(0, 8).toString('hex');
    }

    /**
     * Submits a transaction data blob to a specific namespace on Celestia DA layer.
     * @param {string} namespaceId The 8-byte target hex namespace.
     * @param {string} rawBlobPayload The hex-encoded data payload to settle.
     */
    async submitBlob(namespaceId, rawBlobPayload) {
        console.log(`[Celestia DA] Preparing blob for Namespace: ${namespaceId}`);

        const requestPayload = {
            jsonrpc: "2.0",
            id: 1,
            method: "blob.Submit",
            params: [
                [
                    {
                        namespace: namespaceId,
                        data: Buffer.from(rawBlobPayload, 'hex').toString('base64'),
                        share_version: 0
                    }
                ],
                0.002 // Target gas price allocation multiplier
            ]
        };

        try {
            console.log(`[DA Connection] Dispatching payload to local light client daemon...`);
            
            // In production, this post request interacts with your authenticated Celestia Node RPC
            // const response = await axios.post(this.rpcUrl, requestPayload, {
            //     headers: { 'Authorization': `Bearer ${this.authToken}` }
            // });
            
            console.log(`[Success] Mock Blob Submission: Data packed securely inside Celestia block sequence.`);
            return { height: 124590, status: "Blob Included Successfully" };
        } catch (error) {
            console.error("[RPC Error] Failed to submit blob to DA layer:", error.message);
        }
    }
}

// Example Execution Workflow Simulation
const celestia = new CelestiaClient();
const myNamespace = celestia.generateNamespaceId("my-custom-svm-l3");
// celestia.submitBlob(myNamespace, "48656c6c6f2043656c6573746961204441"); // Hex for 'Hello Celestia DA'

module.exports = CelestiaClient;
