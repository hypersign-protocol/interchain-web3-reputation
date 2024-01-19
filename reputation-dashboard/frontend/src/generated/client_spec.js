/* eslint-disable */
export const protobufPackage = "hypersign.ssi.v1";
export var ClientSpecType;
(function (ClientSpecType) {
    ClientSpecType[ClientSpecType["CLIENT_SPEC_TYPE_NONE"] = 0] = "CLIENT_SPEC_TYPE_NONE";
    ClientSpecType[ClientSpecType["CLIENT_SPEC_TYPE_COSMOS_ADR036"] = 1] = "CLIENT_SPEC_TYPE_COSMOS_ADR036";
    ClientSpecType[ClientSpecType["CLIENT_SPEC_TYPE_ETH_PERSONAL_SIGN"] = 2] = "CLIENT_SPEC_TYPE_ETH_PERSONAL_SIGN";
})(ClientSpecType || (ClientSpecType = {}));
export function clientSpecTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "CLIENT_SPEC_TYPE_NONE":
            return ClientSpecType.CLIENT_SPEC_TYPE_NONE;
        case 1:
        case "CLIENT_SPEC_TYPE_COSMOS_ADR036":
            return ClientSpecType.CLIENT_SPEC_TYPE_COSMOS_ADR036;
        case 2:
        case "CLIENT_SPEC_TYPE_ETH_PERSONAL_SIGN":
            return ClientSpecType.CLIENT_SPEC_TYPE_ETH_PERSONAL_SIGN;
        default:
            throw new globalThis.Error("Unrecognized enum value " + object + " for enum ClientSpecType");
    }
}
export function clientSpecTypeToJSON(object) {
    switch (object) {
        case ClientSpecType.CLIENT_SPEC_TYPE_NONE:
            return "CLIENT_SPEC_TYPE_NONE";
        case ClientSpecType.CLIENT_SPEC_TYPE_COSMOS_ADR036:
            return "CLIENT_SPEC_TYPE_COSMOS_ADR036";
        case ClientSpecType.CLIENT_SPEC_TYPE_ETH_PERSONAL_SIGN:
            return "CLIENT_SPEC_TYPE_ETH_PERSONAL_SIGN";
        default:
            throw new globalThis.Error("Unrecognized enum value " + object + " for enum ClientSpecType");
    }
}
