import {BcDocument} from "@/types/bc-document";

export default async function RegularDocumentDetail({document}: {document: BcDocument}) {
    return <div>
        REGULAR : {document.name}
    </div>
}