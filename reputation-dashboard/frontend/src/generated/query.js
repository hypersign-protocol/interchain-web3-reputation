/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest } from "../../cosmos/base/query/v1beta1/pagination";
import { CredentialSchemaState } from "./credential_schema";
import { CredentialStatusState } from "./credential_status";
import { DidDocument, DidDocumentMetadata, DidDocumentState } from "./did";
export const protobufPackage = "hypersign.ssi.v1";
function createBaseQueryCredentialSchemaRequest() {
    return {};
}
export const QueryCredentialSchemaRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.schemaId !== undefined && message.schemaId !== "") {
            writer.uint32(10).string(message.schemaId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCredentialSchemaRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.schemaId = reader.string();
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
        return { schemaId: isSet(object.schemaId) ? globalThis.String(object.schemaId) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.schemaId !== undefined && message.schemaId !== "") {
            obj.schemaId = message.schemaId;
        }
        return obj;
    },
    create(base) {
        return QueryCredentialSchemaRequest.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryCredentialSchemaRequest();
        message.schemaId = (_a = object.schemaId) !== null && _a !== void 0 ? _a : undefined;
        return message;
    },
};
function createBaseQueryCredentialSchemaResponse() {
    return {};
}
export const QueryCredentialSchemaResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.credentialSchemas !== undefined && message.credentialSchemas.length !== 0) {
            for (const v of message.credentialSchemas) {
                CredentialSchemaState.encode(v, writer.uint32(10).fork()).ldelim();
            }
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCredentialSchemaResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    if (message.credentialSchemas === undefined) {
                        message.credentialSchemas = [];
                    }
                    message.credentialSchemas.push(CredentialSchemaState.decode(reader, reader.uint32()));
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
            credentialSchemas: globalThis.Array.isArray(object === null || object === void 0 ? void 0 : object.credentialSchemas)
                ? object.credentialSchemas.map((e) => CredentialSchemaState.fromJSON(e))
                : undefined,
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if ((_a = message.credentialSchemas) === null || _a === void 0 ? void 0 : _a.length) {
            obj.credentialSchemas = message.credentialSchemas.map((e) => CredentialSchemaState.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryCredentialSchemaResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryCredentialSchemaResponse();
        message.credentialSchemas = ((_a = object.credentialSchemas) === null || _a === void 0 ? void 0 : _a.map((e) => CredentialSchemaState.fromPartial(e))) || undefined;
        return message;
    },
};
function createBaseQueryCredentialSchemasRequest() {
    return {};
}
export const QueryCredentialSchemasRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCredentialSchemasRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.pagination = PageRequest.decode(reader, reader.uint32());
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
        return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryCredentialSchemasRequest.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        const message = createBaseQueryCredentialSchemasRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryCredentialSchemasResponse() {
    return {};
}
export const QueryCredentialSchemasResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.count !== undefined && message.count !== 0) {
            writer.uint32(8).uint64(message.count);
        }
        if (message.credentialSchemas !== undefined && message.credentialSchemas.length !== 0) {
            for (const v of message.credentialSchemas) {
                CredentialSchemaState.encode(v, writer.uint32(18).fork()).ldelim();
            }
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCredentialSchemasResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.count = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    if (message.credentialSchemas === undefined) {
                        message.credentialSchemas = [];
                    }
                    message.credentialSchemas.push(CredentialSchemaState.decode(reader, reader.uint32()));
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
            count: isSet(object.count) ? globalThis.Number(object.count) : undefined,
            credentialSchemas: globalThis.Array.isArray(object === null || object === void 0 ? void 0 : object.credentialSchemas)
                ? object.credentialSchemas.map((e) => CredentialSchemaState.fromJSON(e))
                : undefined,
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if (message.count !== undefined && message.count !== 0) {
            obj.count = Math.round(message.count);
        }
        if ((_a = message.credentialSchemas) === null || _a === void 0 ? void 0 : _a.length) {
            obj.credentialSchemas = message.credentialSchemas.map((e) => CredentialSchemaState.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryCredentialSchemasResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseQueryCredentialSchemasResponse();
        message.count = (_a = object.count) !== null && _a !== void 0 ? _a : undefined;
        message.credentialSchemas = ((_b = object.credentialSchemas) === null || _b === void 0 ? void 0 : _b.map((e) => CredentialSchemaState.fromPartial(e))) || undefined;
        return message;
    },
};
function createBaseQueryCredentialStatusRequest() {
    return {};
}
export const QueryCredentialStatusRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.credId !== undefined && message.credId !== "") {
            writer.uint32(10).string(message.credId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCredentialStatusRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.credId = reader.string();
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
        return { credId: isSet(object.credId) ? globalThis.String(object.credId) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.credId !== undefined && message.credId !== "") {
            obj.credId = message.credId;
        }
        return obj;
    },
    create(base) {
        return QueryCredentialStatusRequest.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryCredentialStatusRequest();
        message.credId = (_a = object.credId) !== null && _a !== void 0 ? _a : undefined;
        return message;
    },
};
function createBaseQueryCredentialStatusResponse() {
    return {};
}
export const QueryCredentialStatusResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.credentialStatus !== undefined) {
            CredentialStatusState.encode(message.credentialStatus, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCredentialStatusResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.credentialStatus = CredentialStatusState.decode(reader, reader.uint32());
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
            credentialStatus: isSet(object.credentialStatus)
                ? CredentialStatusState.fromJSON(object.credentialStatus)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.credentialStatus !== undefined) {
            obj.credentialStatus = CredentialStatusState.toJSON(message.credentialStatus);
        }
        return obj;
    },
    create(base) {
        return QueryCredentialStatusResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        const message = createBaseQueryCredentialStatusResponse();
        message.credentialStatus = (object.credentialStatus !== undefined && object.credentialStatus !== null)
            ? CredentialStatusState.fromPartial(object.credentialStatus)
            : undefined;
        return message;
    },
};
function createBaseQueryCredentialStatusesRequest() {
    return {};
}
export const QueryCredentialStatusesRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCredentialStatusesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.pagination = PageRequest.decode(reader, reader.uint32());
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
        return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryCredentialStatusesRequest.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        const message = createBaseQueryCredentialStatusesRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryCredentialStatusesResponse() {
    return {};
}
export const QueryCredentialStatusesResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.count !== undefined && message.count !== 0) {
            writer.uint32(8).uint64(message.count);
        }
        if (message.credentialStatuses !== undefined && message.credentialStatuses.length !== 0) {
            for (const v of message.credentialStatuses) {
                CredentialStatusState.encode(v, writer.uint32(18).fork()).ldelim();
            }
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCredentialStatusesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.count = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    if (message.credentialStatuses === undefined) {
                        message.credentialStatuses = [];
                    }
                    message.credentialStatuses.push(CredentialStatusState.decode(reader, reader.uint32()));
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
            count: isSet(object.count) ? globalThis.Number(object.count) : undefined,
            credentialStatuses: globalThis.Array.isArray(object === null || object === void 0 ? void 0 : object.credentialStatuses)
                ? object.credentialStatuses.map((e) => CredentialStatusState.fromJSON(e))
                : undefined,
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if (message.count !== undefined && message.count !== 0) {
            obj.count = Math.round(message.count);
        }
        if ((_a = message.credentialStatuses) === null || _a === void 0 ? void 0 : _a.length) {
            obj.credentialStatuses = message.credentialStatuses.map((e) => CredentialStatusState.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryCredentialStatusesResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseQueryCredentialStatusesResponse();
        message.count = (_a = object.count) !== null && _a !== void 0 ? _a : undefined;
        message.credentialStatuses = ((_b = object.credentialStatuses) === null || _b === void 0 ? void 0 : _b.map((e) => CredentialStatusState.fromPartial(e))) ||
            undefined;
        return message;
    },
};
function createBaseQueryDidDocumentRequest() {
    return {};
}
export const QueryDidDocumentRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.didId !== undefined && message.didId !== "") {
            writer.uint32(10).string(message.didId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDidDocumentRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.didId = reader.string();
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
        return { didId: isSet(object.didId) ? globalThis.String(object.didId) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.didId !== undefined && message.didId !== "") {
            obj.didId = message.didId;
        }
        return obj;
    },
    create(base) {
        return QueryDidDocumentRequest.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryDidDocumentRequest();
        message.didId = (_a = object.didId) !== null && _a !== void 0 ? _a : undefined;
        return message;
    },
};
function createBaseQueryDidDocumentResponse() {
    return {};
}
export const QueryDidDocumentResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.didDocument !== undefined) {
            DidDocument.encode(message.didDocument, writer.uint32(10).fork()).ldelim();
        }
        if (message.didDocumentMetadata !== undefined) {
            DidDocumentMetadata.encode(message.didDocumentMetadata, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDidDocumentResponse();
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
                    message.didDocumentMetadata = DidDocumentMetadata.decode(reader, reader.uint32());
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
            didDocumentMetadata: isSet(object.didDocumentMetadata)
                ? DidDocumentMetadata.fromJSON(object.didDocumentMetadata)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.didDocument !== undefined) {
            obj.didDocument = DidDocument.toJSON(message.didDocument);
        }
        if (message.didDocumentMetadata !== undefined) {
            obj.didDocumentMetadata = DidDocumentMetadata.toJSON(message.didDocumentMetadata);
        }
        return obj;
    },
    create(base) {
        return QueryDidDocumentResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        const message = createBaseQueryDidDocumentResponse();
        message.didDocument = (object.didDocument !== undefined && object.didDocument !== null)
            ? DidDocument.fromPartial(object.didDocument)
            : undefined;
        message.didDocumentMetadata = (object.didDocumentMetadata !== undefined && object.didDocumentMetadata !== null)
            ? DidDocumentMetadata.fromPartial(object.didDocumentMetadata)
            : undefined;
        return message;
    },
};
function createBaseQueryDidDocumentsRequest() {
    return {};
}
export const QueryDidDocumentsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDidDocumentsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.pagination = PageRequest.decode(reader, reader.uint32());
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
        return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryDidDocumentsRequest.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        const message = createBaseQueryDidDocumentsRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryDidDocumentsResponse() {
    return {};
}
export const QueryDidDocumentsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.count !== undefined && message.count !== 0) {
            writer.uint32(8).uint64(message.count);
        }
        if (message.didDocuments !== undefined && message.didDocuments.length !== 0) {
            for (const v of message.didDocuments) {
                DidDocumentState.encode(v, writer.uint32(18).fork()).ldelim();
            }
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDidDocumentsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.count = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    if (message.didDocuments === undefined) {
                        message.didDocuments = [];
                    }
                    message.didDocuments.push(DidDocumentState.decode(reader, reader.uint32()));
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
            count: isSet(object.count) ? globalThis.Number(object.count) : undefined,
            didDocuments: globalThis.Array.isArray(object === null || object === void 0 ? void 0 : object.didDocuments)
                ? object.didDocuments.map((e) => DidDocumentState.fromJSON(e))
                : undefined,
        };
    },
    toJSON(message) {
        var _a;
        const obj = {};
        if (message.count !== undefined && message.count !== 0) {
            obj.count = Math.round(message.count);
        }
        if ((_a = message.didDocuments) === null || _a === void 0 ? void 0 : _a.length) {
            obj.didDocuments = message.didDocuments.map((e) => DidDocumentState.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryDidDocumentsResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseQueryDidDocumentsResponse();
        message.count = (_a = object.count) !== null && _a !== void 0 ? _a : undefined;
        message.didDocuments = ((_b = object.didDocuments) === null || _b === void 0 ? void 0 : _b.map((e) => DidDocumentState.fromPartial(e))) || undefined;
        return message;
    },
};
export const QueryServiceName = "hypersign.ssi.v1.Query";
export class QueryClientImpl {
    constructor(rpc, opts) {
        this.service = (opts === null || opts === void 0 ? void 0 : opts.service) || QueryServiceName;
        this.rpc = rpc;
        this.CredentialSchemaByID = this.CredentialSchemaByID.bind(this);
        this.CredentialSchemas = this.CredentialSchemas.bind(this);
        this.DidDocumentByID = this.DidDocumentByID.bind(this);
        this.DidDocuments = this.DidDocuments.bind(this);
        this.CredentialStatusByID = this.CredentialStatusByID.bind(this);
        this.CredentialStatuses = this.CredentialStatuses.bind(this);
    }
    CredentialSchemaByID(request) {
        const data = QueryCredentialSchemaRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "CredentialSchemaByID", data);
        return promise.then((data) => QueryCredentialSchemaResponse.decode(_m0.Reader.create(data)));
    }
    CredentialSchemas(request) {
        const data = QueryCredentialSchemasRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "CredentialSchemas", data);
        return promise.then((data) => QueryCredentialSchemasResponse.decode(_m0.Reader.create(data)));
    }
    DidDocumentByID(request) {
        const data = QueryDidDocumentRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "DidDocumentByID", data);
        return promise.then((data) => QueryDidDocumentResponse.decode(_m0.Reader.create(data)));
    }
    DidDocuments(request) {
        const data = QueryDidDocumentsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "DidDocuments", data);
        return promise.then((data) => QueryDidDocumentsResponse.decode(_m0.Reader.create(data)));
    }
    CredentialStatusByID(request) {
        const data = QueryCredentialStatusRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "CredentialStatusByID", data);
        return promise.then((data) => QueryCredentialStatusResponse.decode(_m0.Reader.create(data)));
    }
    CredentialStatuses(request) {
        const data = QueryCredentialStatusesRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "CredentialStatuses", data);
        return promise.then((data) => QueryCredentialStatusesResponse.decode(_m0.Reader.create(data)));
    }
}
function longToNumber(long) {
    if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
