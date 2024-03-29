/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { DocumentProof } from "./proof";
export const protobufPackage = "hypersign.ssi.v1";
function createBaseCredentialStatusDocument() {
    return {};
}
export const CredentialStatusDocument = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== undefined && message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.revoked === true) {
            writer.uint32(16).bool(message.revoked);
        }
        if (message.suspended === true) {
            writer.uint32(24).bool(message.suspended);
        }
        if (message.remarks !== undefined && message.remarks !== "") {
            writer.uint32(34).string(message.remarks);
        }
        if (message.issuer !== undefined && message.issuer !== "") {
            writer.uint32(42).string(message.issuer);
        }
        if (message.issuanceDate !== undefined && message.issuanceDate !== "") {
            writer.uint32(50).string(message.issuanceDate);
        }
        if (message.merkleRootHash !== undefined && message.merkleRootHash !== "") {
            writer.uint32(58).string(message.merkleRootHash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCredentialStatusDocument();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.id = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.revoked = reader.bool();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.suspended = reader.bool();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.remarks = reader.string();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.issuer = reader.string();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.issuanceDate = reader.string();
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.merkleRootHash = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            id: isSet(object.id) ? globalThis.String(object.id) : undefined,
            revoked: isSet(object.revoked) ? globalThis.Boolean(object.revoked) : undefined,
            suspended: isSet(object.suspended) ? globalThis.Boolean(object.suspended) : undefined,
            remarks: isSet(object.remarks) ? globalThis.String(object.remarks) : undefined,
            issuer: isSet(object.issuer) ? globalThis.String(object.issuer) : undefined,
            issuanceDate: isSet(object.issuanceDate) ? globalThis.String(object.issuanceDate) : undefined,
            merkleRootHash: isSet(object.merkleRootHash) ? globalThis.String(object.merkleRootHash) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== undefined && message.id !== "") {
            obj.id = message.id;
        }
        if (message.revoked === true) {
            obj.revoked = message.revoked;
        }
        if (message.suspended === true) {
            obj.suspended = message.suspended;
        }
        if (message.remarks !== undefined && message.remarks !== "") {
            obj.remarks = message.remarks;
        }
        if (message.issuer !== undefined && message.issuer !== "") {
            obj.issuer = message.issuer;
        }
        if (message.issuanceDate !== undefined && message.issuanceDate !== "") {
            obj.issuanceDate = message.issuanceDate;
        }
        if (message.merkleRootHash !== undefined && message.merkleRootHash !== "") {
            obj.merkleRootHash = message.merkleRootHash;
        }
        return obj;
    },
    create(base) {
        return CredentialStatusDocument.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g;
        const message = createBaseCredentialStatusDocument();
        message.id = (_a = object.id) !== null && _a !== void 0 ? _a : undefined;
        message.revoked = (_b = object.revoked) !== null && _b !== void 0 ? _b : undefined;
        message.suspended = (_c = object.suspended) !== null && _c !== void 0 ? _c : undefined;
        message.remarks = (_d = object.remarks) !== null && _d !== void 0 ? _d : undefined;
        message.issuer = (_e = object.issuer) !== null && _e !== void 0 ? _e : undefined;
        message.issuanceDate = (_f = object.issuanceDate) !== null && _f !== void 0 ? _f : undefined;
        message.merkleRootHash = (_g = object.merkleRootHash) !== null && _g !== void 0 ? _g : undefined;
        return message;
    },
};
function createBaseCredentialStatusState() {
    return {};
}
export const CredentialStatusState = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.credentialStatusDocument !== undefined) {
            CredentialStatusDocument.encode(message.credentialStatusDocument, writer.uint32(10).fork()).ldelim();
        }
        if (message.credentialStatusProof !== undefined) {
            DocumentProof.encode(message.credentialStatusProof, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCredentialStatusState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.credentialStatusDocument = CredentialStatusDocument.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.credentialStatusProof = DocumentProof.decode(reader, reader.uint32());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            credentialStatusDocument: isSet(object.credentialStatusDocument)
                ? CredentialStatusDocument.fromJSON(object.credentialStatusDocument)
                : undefined,
            credentialStatusProof: isSet(object.credentialStatusProof)
                ? DocumentProof.fromJSON(object.credentialStatusProof)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.credentialStatusDocument !== undefined) {
            obj.credentialStatusDocument = CredentialStatusDocument.toJSON(message.credentialStatusDocument);
        }
        if (message.credentialStatusProof !== undefined) {
            obj.credentialStatusProof = DocumentProof.toJSON(message.credentialStatusProof);
        }
        return obj;
    },
    create(base) {
        return CredentialStatusState.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        const message = createBaseCredentialStatusState();
        message.credentialStatusDocument =
            (object.credentialStatusDocument !== undefined && object.credentialStatusDocument !== null)
                ? CredentialStatusDocument.fromPartial(object.credentialStatusDocument)
                : undefined;
        message.credentialStatusProof =
            (object.credentialStatusProof !== undefined && object.credentialStatusProof !== null)
                ? DocumentProof.fromPartial(object.credentialStatusProof)
                : undefined;
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
