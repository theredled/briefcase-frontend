import {BcDocument} from "@/types/bcDocument";

export default async function RegularDocumentDetail({document}: {document: BcDocument}) {
    return <div>
        REGULAR : {document.name}
    </div>
}