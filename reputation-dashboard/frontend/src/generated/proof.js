/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { clientSpecTypeFromJSON, clientSpecTypeToJSON } from "./client_spec";
export const protobufPackage = "hypersign.ssi.v1";
function createBaseDocumentProof() {
    return {};
}
export const DocumentProof = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.type !== undefined && message.type !== "") {
            writer.uint32(10).string(message.type);
        }
        if (message.created !== undefined && message.created !== "") {
            writer.uint32(18).string(message.created);
        }
        if (message.verificationMethod !== undefined && message.verificationMethod !== "") {
            writer.uint32(26).string(message.verificationMethod);
        }
        if (message.proofPurpose !== undefined && message.proofPurpose !== "") {
            writer.uint32(34).string(message.proofPurpose);
        }
        if (message.proofValue !== undefined && message.proofValue !== "") {
            writer.uint32(42).string(message.proofValue);
        }
        if (message.clientSpecType !== undefined && message.clientSpecType !== 0) {
            writer.uint32(48).int32(message.clientSpecType);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDocumentProof();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.type = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.created = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.verificationMethod = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.proofPurpose = reader.string();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.proofValue = reader.string();
                    continue;
                case 6:
                    if (tag !== 48) {
                        break;
                    }
                    message.clientSpecType = reader.int32();
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
            type: isSet(object.type) ? globalThis.String(object.type) : undefined,
            created: isSet(object.created) ? globalThis.String(object.created) : undefined,
            verificationMethod: isSet(object.verificationMethod) ? globalThis.String(object.verificationMethod) : undefined,
            proofPurpose: isSet(object.proofPurpose) ? globalThis.String(object.proofPurpose) : undefined,
            proofValue: isSet(object.proofValue) ? globalThis.String(object.proofValue) : undefined,
            clientSpecType: isSet(object.clientSpecType) ? clientSpecTypeFromJSON(object.clientSpecType) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.type !== undefined && message.type !== "") {
            obj.type = message.type;
        }
        if (message.created !== undefined && message.created !== "") {
            obj.created = message.created;
        }
        if (message.verificationMethod !== undefined && message.verificationMethod !== "") {
            obj.verificationMethod = message.verificationMethod;
        }
        if (message.proofPurpose !== undefined && message.proofPurpose !== "") {
            obj.proofPurpose = message.proofPurpose;
        }
        if (message.proofValue !== undefined && message.proofValue !== "") {
            obj.proofValue = message.proofValue;
        }
        if (message.clientSpecType !== undefined && message.clientSpecType !== 0) {
            obj.clientSpecType = clientSpecTypeToJSON(message.clientSpecType);
        }
        return obj;
    },
    create(base) {
        return DocumentProof.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f;
        const message = createBaseDocumentProof();
        message.type = (_a = object.type) !== null && _a !== void 0 ? _a : undefined;
        message.created = (_b = object.created) !== null && _b !== void 0 ? _b : undefined;
        message.verificationMethod = (_c = object.verificationMethod) !== null && _c !== void 0 ? _c : undefined;
        message.proofPurpose = (_d = object.proofPurpose) !== null && _d !== void 0 ? _d : undefined;
        message.proofValue = (_e = object.proofValue) !== null && _e !== void 0 ? _e : undefined;
        message.clientSpecType = (_f = object.clientSpecType) !== null && _f !== void 0 ? _f : undefined;
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
