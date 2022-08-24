export interface Map {
    imports?: [string] | never[], 
    fonts?: { [key: string]: { [key: string]: Set<string> } },
    medias?: { [key: string]: { [key: string]: string[] } },
    propertyCounts?: { [key: string]: number }
}