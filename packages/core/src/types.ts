export interface Map {
    imports?: [string] | never[], 
    animations?: { [key: string]: { [key: string]: string[] } },
    fonts?: { [key: string]: { [key: string]: Set<string> | string } },
    medias?: { [key: string]: { [key: string]: string[] } },
    propertyCounts?: { [key: string]: number }
}

export interface ValidatedElement {
    tag: string,
    attributes: ValidatedAttribute[]
}

export interface ValidatedAttribute {
    name: string,
    value: string,
    property: string,
    suffix: string | null,
    prefixes: string[]
}