/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { CredentialSchemaDocument } from "./credential_schema";
import { CredentialStatusDocument } from "./credential_status";
import { DidDocument } from "./did";
import { DocumentProof } from "./proof";
export const protobufPackage = "hypersign.ssi.v1";
function createBaseMsgRegisterDID() {
    return {};
}
export const MsgRegisterDID = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.didDocument !== undefined) {
            DidDocument.encode(message.didDocument, writer.uint32(10).fork()).ldelim();
        }
        if (message.didDocumentProofs !== undefined && message.didDocumentProofs.length !== 0) {
            for (const v of message.didDocumentProofs) {
                DocumentProof.encode(v, writer.uint32(18).fork()).ldelim();
            }
        }
        if (message.txAuthor !== undefined && message.txAuthor !== "") {
            writer.uint32(26).string(message.txAuthor);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRegisterDID();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.didDocument = DidDocument.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    if (message.didDocumentProofs === undefined) {
                        message.didDocumentProofs = [];
                    }
                    message.didDocumentProofs.push(DocumentProof.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.txAuthor = reader.string();
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
            didDocument: isSet(object.didDocument) ? DidDocument.fromJSON(object.didDocument) : undefined,
            didDocumentProofs: globalThis.Array.isArray(object === null || object === void 0 ? void 0 : object.didDocumentProofs)
                ? object.didDocumentProofs.map((e) => DocumentProof.fromJSON(e))
                : undefined,
            txAuthor: isSet(object.txAuthor) ? globalThis.String(object.txAuthor) : undefined,
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if (message.didDocument !== undefined) {
            obj.didDocument = DidDocument.toJSON(message.didDocument);
        }
        if ((_a = message.didDocumentProofs) === null || _a === void 0 ? void 0 : _a.length) {
            obj.didDocumentProofs = message.didDocumentProofs.map((e) => DocumentProof.toJSON(e));
        }
        if (message.txAuthor !== undefined && message.txAuthor !== "") {
            obj.txAuthor = message.txAuthor;
        }
        return obj;
    },
    create(base) {
        return MsgRegisterDID.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMsgRegisterDID();
        message.didDocument = (object.didDocument !== undefined && object.didDocument !== null)
            ? DidDocument.fromPartial(object.didDocument)
            : undefined;
        message.didDocumentProofs = ((_a = object.didDocumentProofs) === null || _a === void 0 ? void 0 : _a.map((e) => DocumentProof.fromPartial(e))) || undefined;
        message.txAuthor = (_b = object.txAuthor) !== null && _b !== void 0 ? _b : undefined;
        return message;
    },
};
function createBaseMsgRegisterDIDResponse() {
    return {};
}
export const MsgRegisterDIDResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRegisterDIDResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgRegisterDIDResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(_) {
        const message = createBaseMsgRegisterDIDResponse();
        return message;
    },
};
function createBaseMsgUpdateDID() {
    return {};
}
export const MsgUpdateDID = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.didDocument !== undefined) {
            DidDocument.encode(message.didDocument, writer.uint32(10).fork()).ldelim();
        }
        if (message.didDocumentProofs !== undefined && message.didDocumentProofs.length !== 0) {
            for (const v of message.didDocumentProofs) {
                DocumentProof.encode(v, writer.uint32(18).fork()).ldelim();
            }
        }
        if (message.versionId !== undefined && message.versionId !== "") {
            writer.uint32(26).string(message.versionId);
        }
        if (message.txAuthor !== undefined && message.txAuthor !== "") {
            writer.uint32(34).string(message.txAuthor);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateDID();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.didDocument = DidDocument.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    if (message.didDocumentProofs === undefined) {
                        message.didDocumentProofs = [];
                    }
                    message.didDocumentProofs.push(DocumentProof.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.versionId = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.txAuthor = reader.string();
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
            didDocument: isSet(object.didDocument) ? DidDocument.fromJSON(object.didDocument) : undefined,
            didDocumentProofs: globalThis.Array.isArray(object === null || object === void 0 ? void 0 : object.didDocumentProofs)
                ? object.didDocumentProofs.map((e) => DocumentProof.fromJSON(e))
                : undefined,
            versionId: isSet(object.versionId) ? globalThis.String(object.versionId) : undefined,
            txAuthor: isSet(object.txAuthor) ? globalThis.String(object.txAuthor) : undefined,
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if (message.didDocument !== undefined) {
            obj.didDocument = DidDocument.toJSON(message.didDocument);
        }
        if ((_a = message.didDocumentProofs) === null || _a === void 0 ? void 0 : _a.length) {
            obj.didDocumentProofs = message.didDocumentProofs.map((e) => DocumentProof.toJSON(e));
        }
        if (message.versionId !== undefined && message.versionId !== "") {
            obj.versionId = message.versionId;
        }
        if (message.txAuthor !== undefined && message.txAuthor !== "") {
            obj.txAuthor = message.txAuthor;
        }
        return obj;
    },
    create(base) {
        return MsgUpdateDID.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseMsgUpdateDID();
        message.didDocument = (object.didDocument !== undefined && object.didDocument !== null)
            ? DidDocument.fromPartial(object.didDocument)
            : undefined;
        message.didDocumentProofs = ((_a = object.didDocumentProofs) === null || _a === void 0 ? void 0 : _a.map((e) => DocumentProof.fromPartial(e))) || undefined;
        message.versionId = (_b = object.versionId) !== null && _b !== void 0 ? _b : undefined;
        message.txAuthor = (_c = object.txAuthor) !== null && _c !== void 0 ? _c : undefined;
        return message;
    },
};
function createBaseMsgUpdateDIDResponse() {
    return {};
}
export const MsgUpdateDIDResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateDIDResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgUpdateDIDResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateDIDResponse();
        return message;
    },
};
function createBaseMsgDeactivateDID() {
    return {};
}
export const MsgDeactivateDID = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.didDocumentId !== undefined && message.didDocumentId !== "") {
            writer.uint32(10).string(message.didDocumentId);
        }
        if (message.didDocumentProofs !== undefined && message.didDocumentProofs.length !== 0) {
            for (const v of message.didDocumentProofs) {
                DocumentProof.encode(v, writer.uint32(18).fork()).ldelim();
            }
        }
        if (message.versionId !== undefined && message.versionId !== "") {
            writer.uint32(26).string(message.versionId);
        }
        if (message.txAuthor !== undefined && message.txAuthor !== "") {
            writer.uint32(34).string(message.txAuthor);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDeactivateDID();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.didDocumentId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    if (message.didDocumentProofs === undefined) {
                        message.didDocumentProofs = [];
                    }
                    message.didDocumentProofs.push(DocumentProof.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.versionId = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.txAuthor = reader.string();
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
            didDocumentId: isSet(object.didDocumentId) ? globalThis.String(object.didDocumentId) : undefined,
            didDocumentProofs: globalThis.Array.isArray(object === null || object === void 0 ? void 0 : object.didDocumentProofs)
                ? object.didDocumentProofs.map((e) => DocumentProof.fromJSON(e))
                : undefined,
            versionId: isSet(object.versionId) ? globalThis.String(object.versionId) : undefined,
            txAuthor: isSet(object.txAuthor) ? globalThis.String(object.txAuthor) : undefined,
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if (message.didDocumentId !== undefined && message.didDocumentId !== "") {
            obj.didDocumentId = message.didDocumentId;
        }
        if ((_a = message.didDocumentProofs) === null || _a === void 0 ? void 0 : _a.length) {
            obj.didDocumentProofs = message.didDocumentProofs.map((e) => DocumentProof.toJSON(e));
        }
        if (message.versionId !== undefined && message.versionId !== "") {
            obj.versionId = message.versionId;
        }
        if (message.txAuthor !== undefined && message.txAuthor !== "") {
            obj.txAuthor = message.txAuthor;
        }
        return obj;
    },
    create(base) {
        return MsgDeactivateDID.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseMsgDeactivateDID();
        message.didDocumentId = (_a = object.didDocumentId) !== null && _a !== void 0 ? _a : undefined;
        message.didDocumentProofs = ((_b = object.didDocumentProofs) === null || _b === void 0 ? void 0 : _b.map((e) => DocumentProof.fromPartial(e))) || undefined;
        message.versionId = (_c = object.versionId) !== null && _c !== void 0 ? _c : undefined;
        message.txAuthor = (_d = object.txAuthor) !== null && _d !== void 0 ? _d : undefined;
        return message;
    },
};
function createBaseMsgDeactivateDIDResponse() {
    return {};
}
export const MsgDeactivateDIDResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDeactivateDIDResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgDeactivateDIDResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(_) {
        const message = createBaseMsgDeactivateDIDResponse();
        return message;
    },
};
function createBaseMsgRegisterCredentialSchema() {
    return {};
}
export const MsgRegisterCredentialSchema = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.credentialSchemaDocument !== undefined) {
            CredentialSchemaDocument.encode(message.credentialSchemaDocument, writer.uint32(10).fork()).ldelim();
        }
        if (message.credentialSchemaProof !== undefined) {
            DocumentProof.encode(message.credentialSchemaProof, writer.uint32(18).fork()).ldelim();
        }
        if (message.txAuthor !== undefined && message.txAuthor !== "") {
            writer.uint32(26).string(message.txAuthor);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRegisterCredentialSchema();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.credentialSchemaDocument = CredentialSchemaDocument.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.credentialSchemaProof = DocumentProof.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.txAuthor = reader.string();
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
            credentialSchemaDocument: isSet(object.credentialSchemaDocument)
                ? CredentialSchemaDocument.fromJSON(object.credentialSchemaDocument)
                : undefined,
            credentialSchemaProof: isSet(object.credentialSchemaProof)
                ? DocumentProof.fromJSON(object.credentialSchemaProof)
                : undefined,
            txAuthor: isSet(object.txAuthor) ? globalThis.String(object.txAuthor) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.credentialSchemaDocument !== undefined) {
            obj.credentialSchemaDocument = CredentialSchemaDocument.toJSON(message.credentialSchemaDocument);
        }
        if (message.credentialSchemaProof !== undefined) {
            obj.credentialSchemaProof = DocumentProof.toJSON(message.credentialSchemaProof);
        }
        if (message.txAuthor !== undefined && message.txAuthor !== "") {
            obj.txAuthor = message.txAuthor;
        }
        return obj;
    },
    create(base) {
        return MsgRegisterCredentialSchema.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgRegisterCredentialSchema();
        message.credentialSchemaDocument =
            (object.credentialSchemaDocument !== undefined && object.credentialSchemaDocument !== null)
                ? CredentialSchemaDocument.fromPartial(object.credentialSchemaDocument)
                : undefined;
        message.credentialSchemaProof =
            (object.credentialSchemaProof !== undefined && object.credentialSchemaProof !== null)
                ? DocumentProof.fromPartial(object.credentialSchemaProof)
                : undefined;
        message.txAuthor = (_a = object.txAuthor) !== null && _a !== void 0 ? _a : undefined;
        return message;
    },
};
function createBaseMsgRegisterCredentialSchemaResponse() {
    return {};
}
export const MsgRegisterCredentialSchemaResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRegisterCredentialSchemaResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgRegisterCredentialSchemaResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(_) {
        const message = createBaseMsgRegisterCredentialSchemaResponse();
        return message;
    },
};
function createBaseMsgUpdateCredentialSchema() {
    return {};
}
export const MsgUpdateCredentialSchema = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.credentialSchemaDocument !== undefined) {
            CredentialSchemaDocument.encode(message.credentialSchemaDocument, writer.uint32(10).fork()).ldelim();
        }
        if (message.credentialSchemaProof !== undefined) {
            DocumentProof.encode(message.credentialSchemaProof, writer.uint32(18).fork()).ldelim();
        }
        if (message.txAuthor !== undefined && message.txAuthor !== "") {
            writer.uint32(26).string(message.txAuthor);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateCredentialSchema();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.credentialSchemaDocument = CredentialSchemaDocument.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.credentialSchemaProof = DocumentProof.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.txAuthor = reader.string();
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
            credentialSchemaDocument: isSet(object.credentialSchemaDocument)
                ? CredentialSchemaDocument.fromJSON(object.credentialSchemaDocument)
                : undefined,
            credentialSchemaProof: isSet(object.credentialSchemaProof)
                ? DocumentProof.fromJSON(object.credentialSchemaProof)
                : undefined,
            txAuthor: isSet(object.txAuthor) ? globalThis.String(object.txAuthor) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.credentialSchemaDocument !== undefined) {
            obj.credentialSchemaDocument = CredentialSchemaDocument.toJSON(message.credentialSchemaDocument);
        }
        if (message.credentialSchemaProof !== undefined) {
            obj.credentialSchemaProof = DocumentProof.toJSON(message.credentialSchemaProof);
        }
        if (message.txAuthor !== undefined && message.txAuthor !== "") {
            obj.txAuthor = message.txAuthor;
        }
        return obj;
    },
    create(base) {
        return MsgUpdateCredentialSchema.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgUpdateCredentialSchema();
        message.credentialSchemaDocument =
            (object.credentialSchemaDocument !== undefined && object.credentialSchemaDocument !== null)
                ? CredentialSchemaDocument.fromPartial(object.credentialSchemaDocument)
                : undefined;
        message.credentialSchemaProof =
            (object.credentialSchemaProof !== undefined && object.credentialSchemaProof !== null)
                ? DocumentProof.fromPartial(object.credentialSchemaProof)
                : undefined;
        message.txAuthor = (_a = object.txAuthor) !== null && _a !== void 0 ? _a : undefined;
        return message;
    },
};
function createBaseMsgUpdateCredentialSchemaResponse() {
    return {};
}
export const MsgUpdateCredentialSchemaResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateCredentialSchemaResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgUpdateCredentialSchemaResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateCredentialSchemaResponse();
        return message;
    },
};
function createBaseMsgRegisterCredentialStatus() {
    return {};
}
export const MsgRegisterCredentialStatus = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.credentialStatusDocument !== undefined) {
            CredentialStatusDocument.encode(message.credentialStatusDocument, writer.uint32(10).fork()).ldelim();
        }
        if (message.credentialStatusProof !== undefined) {
            DocumentProof.encode(message.credentialStatusProof, writer.uint32(18).fork()).ldelim();
        }
        if (message.txAuthor !== undefined && message.txAuthor !== "") {
            writer.uint32(26).string(message.txAuthor);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRegisterCredentialStatus();
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
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.txAuthor = reader.string();
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
            txAuthor: isSet(object.txAuthor) ? globalThis.String(object.txAuthor) : undefined,
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
        if (message.txAuthor !== undefined && message.txAuthor !== "") {
            obj.txAuthor = message.txAuthor;
        }
        return obj;
    },
    create(base) {
        return MsgRegisterCredentialStatus.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgRegisterCredentialStatus();
        message.credentialStatusDocument =
            (object.credentialStatusDocument !== undefined && object.credentialStatusDocument !== null)
                ? CredentialStatusDocument.fromPartial(object.credentialStatusDocument)
                : undefined;
        message.credentialStatusProof =
            (object.credentialStatusProof !== undefined && object.credentialStatusProof !== null)
                ? DocumentProof.fromPartial(object.credentialStatusProof)
                : undefined;
        message.txAuthor = (_a = object.txAuthor) !== null && _a !== void 0 ? _a : undefined;
        return message;
    },
};
function createBaseMsgRegisterCredentialStatusResponse() {
    return {};
}
export const MsgRegisterCredentialStatusResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRegisterCredentialStatusResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgRegisterCredentialStatusResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(_) {
        const message = createBaseMsgRegisterCredentialStatusResponse();
        return message;
    },
};
function createBaseMsgUpdateCredentialStatus() {
    return {};
}
export const MsgUpdateCredentialStatus = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.credentialStatusDocument !== undefined) {
            CredentialStatusDocument.encode(message.credentialStatusDocument, writer.uint32(10).fork()).ldelim();
        }
        if (message.credentialStatusProof !== undefined) {
            DocumentProof.encode(message.credentialStatusProof, writer.uint32(18).fork()).ldelim();
        }
        if (message.txAuthor !== undefined && message.txAuthor !== "") {
            writer.uint32(26).string(message.txAuthor);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateCredentialStatus();
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
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.txAuthor = reader.string();
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
            txAuthor: isSet(object.txAuthor) ? globalThis.String(object.txAuthor) : undefined,
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
        if (message.txAuthor !== undefined && message.txAuthor !== "") {
            obj.txAuthor = message.txAuthor;
        }
        return obj;
    },
    create(base) {
        return MsgUpdateCredentialStatus.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgUpdateCredentialStatus();
        message.credentialStatusDocument =
            (object.credentialStatusDocument !== undefined && object.credentialStatusDocument !== null)
                ? CredentialStatusDocument.fromPartial(object.credentialStatusDocument)
                : undefined;
        message.credentialStatusProof =
            (object.credentialStatusProof !== undefined && object.credentialStatusProof !== null)
                ? DocumentProof.fromPartial(object.credentialStatusProof)
                : undefined;
        message.txAuthor = (_a = object.txAuthor) !== null && _a !== void 0 ? _a : undefined;
        return message;
    },
};
function createBaseMsgUpdateCredentialStatusResponse() {
    return {};
}
export const MsgUpdateCredentialStatusResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateCredentialStatusResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgUpdateCredentialStatusResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateCredentialStatusResponse();
        return message;
    },
};
export const MsgServiceName = "hypersign.ssi.v1.Msg";
export class MsgClientImpl {
    constructor(rpc, opts) {
        this.service = (opts === null || opts === void 0 ? void 0 : opts.service) || MsgServiceName;
        this.rpc = rpc;
        this.RegisterDID = this.RegisterDID.bind(this);
        this.UpdateDID = this.UpdateDID.bind(this);
        this.DeactivateDID = this.DeactivateDID.bind(this);
        this.RegisterCredentialSchema = this.RegisterCredentialSchema.bind(this);
        this.UpdateCredentialSchema = this.UpdateCredentialSchema.bind(this);
        this.RegisterCredentialStatus = this.RegisterCredentialStatus.bind(this);
        this.UpdateCredentialStatus = this.UpdateCredentialStatus.bind(this);
    }
    RegisterDID(request) {
        const data = MsgRegisterDID.encode(request).finish();
        const promise = this.rpc.request(this.service, "RegisterDID", data);
        return promise.then((data) => MsgRegisterDIDResponse.decode(_m0.Reader.create(data)));
    }
    UpdateDID(request) {
        const data = MsgUpdateDID.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateDID", data);
        return promise.then((data) => MsgUpdateDIDResponse.decode(_m0.Reader.create(data)));
    }
    DeactivateDID(request) {
        const data = MsgDeactivateDID.encode(request).finish();
        const promise = this.rpc.request(this.service, "DeactivateDID", data);
        return promise.then((data) => MsgDeactivateDIDResponse.decode(_m0.Reader.create(data)));
    }
    RegisterCredentialSchema(request) {
        const data = MsgRegisterCredentialSchema.encode(request).finish();
        const promise = this.rpc.request(this.service, "RegisterCredentialSchema", data);
        return promise.then((data) => MsgRegisterCredentialSchemaResponse.decode(_m0.Reader.create(data)));
    }
    UpdateCredentialSchema(request) {
        const data = MsgUpdateCredentialSchema.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateCredentialSchema", data);
        return promise.then((data) => MsgUpdateCredentialSchemaResponse.decode(_m0.Reader.create(data)));
    }
    RegisterCredentialStatus(request) {
        const data = MsgRegisterCredentialStatus.encode(request).finish();
        const promise = this.rpc.request(this.service, "RegisterCredentialStatus", data);
        return promise.then((data) => MsgRegisterCredentialStatusResponse.decode(_m0.Reader.create(data)));
    }
    UpdateCredentialStatus(request) {
        const data = MsgUpdateCredentialStatus.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateCredentialStatus", data);
        return promise.then((data) => MsgUpdateCredentialStatusResponse.decode(_m0.Reader.create(data)));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
