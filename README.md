# Celestia Data Availability Light Node

In the modular blockchain landscape of 2026, offloading state storage to specialized Data Availability (DA) layers is standard protocol for Layer 2 and Layer 3 scaling architectures. This repository provides a professional-grade Node.js client implementation designed to interface seamlessly with a **Celestia Light Node**.

By parsing custom namespaces and handling dynamic gas pricing models, this utility allows modular rollup engines or decentralized sequencers to post raw execution data blobs directly onto Celestia's consensus network.

## Core Features
- **Namespace Encoding:** Formats arbitrary data strings into standardized cryptographic bytes required by the Celestia namespace specifications.
- **Blob Submission Pipeline:** Implements connection wrappers to communicate with local Celestia node JSON-RPC daemons.
- **Data Availability Sampling (DAS):** Programmatic verification hooks ensuring data blocks can be sampled efficiently by light clients without downloading entire blocks.
- **Flat Architecture:** Single-file execution paths for rapid plug-and-play inclusion in modular rollups.

## Getting Started
1. Ensure you have a running Celestia light node client locally (`celestia light start ...`).
2. Install client dependencies: `npm install`
3. Configure your node authorization token and RPC port inside `.env`.
4. Run the submission service: `node submitBlob.js`
