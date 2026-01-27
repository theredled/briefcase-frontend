import {callApi} from "@/lib/api-client";
import FolderDocumentDetail from "@/components/folder-document-detail";
import RegularDocumentDetail from "@/components/regular-document-detail";
import {BcDocument} from "@/types/bcDocument";
import Link from "next/dist/client/link";

export default async function DocumentPage({params}: { params: Promise<{ id: number }> }) {
    const {id} = await params;
    const document: BcDocument = await callApi(`documents/${id}`);

    const documentDetail = document.is_folder
        ? <FolderDocumentDetail document={document}></FolderDocumentDetail>
        : <RegularDocumentDetail document={document}></RegularDocumentDetail>;
    return (
        <section className="section-block page-section">
            <h2 className="section-h2">
                <Link href="/documents">Téléchargements</Link> &gt;&nbsp;
                {document.name}
            </h2>

            <div className="section-content">
                {documentDetail}
            </div>
        </section>
    );
}