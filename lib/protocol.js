export const schema = require('./protocol.schema.json')

export function fileKindFromNumber(kind) {
    switch(kind) {
        case 0: return "Data"
        case 1: return "Avatar"
        default: return null
    }
}
