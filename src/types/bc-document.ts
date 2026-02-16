import {SimpleFile} from "@/types/simple-file";

export type BcDocument = {
    id: number;
    name: string;
    lang: string;
    token: string;
    url: string;
    is_folder: boolean;
    fa_icon_name: string;
    sensible: boolean;
    is_valid: boolean;
    original_filename?: string;
    expo_icon_name: string;
    included_documents?: BcDocument[];
    included_simple_files?: SimpleFile[];
}


export function isDocument(documentOrFile: BcDocument|SimpleFile): documentOrFile is BcDocument {
    return (documentOrFile as BcDocument).id !== undefined;
}