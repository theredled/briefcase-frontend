import {BcDocument} from "@/types/bc-document";

export type Briefcase = {
    id: number;
    name: string;
    token: string;
    documents: BcDocument[];
}
