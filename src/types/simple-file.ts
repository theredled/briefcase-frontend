import {BcDocument} from "@/types/bc-document";

export type SimpleFile = {
    name: string;
    extension: string;
    size: number;
    mime_type: string;
    fa_icon_name: string;
    is_valid: boolean;
}


export function isSimpleFile(documentOrFile: BcDocument|SimpleFile): documentOrFile is SimpleFile {
    return (documentOrFile as BcDocument).id === undefined;
}