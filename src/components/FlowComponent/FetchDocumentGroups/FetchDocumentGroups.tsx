import groups from "../../../assets/data/documentGroups.json"

export const fetchDocumentGroups = (): Promise<string[]> => {
    return Promise.resolve(groups)
}