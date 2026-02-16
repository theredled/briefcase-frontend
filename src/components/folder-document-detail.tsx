import {BcDocument} from "@/types/bc-document";
import DocumentsListItems from "@/components/documents-list-items";
import SimpleFilesList from "@/components/simple-files-list";
import Link from "next/dist/client/link";

export default async function FolderDocumentDetail({document}: { document: BcDocument }) {
    //const {document} = await params;
    return <div>
        <div className="big-buttons-menu">
        <Link href={document.url} className="big-button">
            <i className={'fa icon fa-download'}></i>
            Tout télécharger<br />(fichier ZIP)
        </Link>
        </div>
        <ul className="size-small document-list">
            {document.included_documents &&
                <DocumentsListItems list={document.included_documents} size="small"/>
            }
            {document.included_simple_files &&
                <DocumentsListItems list={document.included_simple_files} size="small"/>
            }
        </ul>
    </div>
}