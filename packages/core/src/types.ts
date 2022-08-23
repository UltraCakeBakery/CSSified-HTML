export interface Map {
    imports: [string] | never[], 
    fonts: { [key: string]: { weights: string[], styles: string[] } },
    medias: { [key: string]: { [key: string]: string[] } },
    propertyCounts: { [key: string]: number }
}