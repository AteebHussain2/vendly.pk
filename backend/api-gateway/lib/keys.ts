/*
This file involves reading, and encryption of auth keys.

@importPrivateKey function, file private.pem gets imported
    after removing header and footer, the rest content is
    decoded to an ArrayBuffer via Base64, then it is
    imported as cryptographic key for signing JWT
    the key is finally ready to use and returned

@importPublicKey function, file public.pem is imported
    it follows the same private key method. But this
    time, the key is converted to verify signed JWT
*/

export const importPrivateKey = async (pem: string) => {
    // Remove PEM headers and footers and newlines
    const pemHeader = "-----BEGIN PRIVATE KEY-----";
    const pemFooter = "-----END PRIVATE KEY-----";
    const pemContents = pem.substring(
        pem.indexOf(pemHeader) + pemHeader.length,
        pem.indexOf(pemFooter)
    ).replace(/\s/g, "");

    // Base64 decode the string to an ArrayBuffer
    const binaryDer = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

    return await crypto.subtle.importKey(
        "pkcs8",
        binaryDer,
        {
            name: "RSASSA-PKCS1-v1_5",
            hash: "SHA-256",
        },
        true,
        ["sign"]
    );
};

export const importPublicKey = async (pem: string) => {
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";
    const pemContents = pem.substring(
        pem.indexOf(pemHeader) + pemHeader.length,
        pem.indexOf(pemFooter)
    ).replace(/\s/g, "");

    const binaryDer = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

    return await crypto.subtle.importKey(
        "spki",
        binaryDer,
        {
            name: "RSASSA-PKCS1-v1_5",
            hash: "SHA-256",
        },
        true,
        ["verify"]
    );
};