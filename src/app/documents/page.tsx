import React from 'react';
import {callApi} from "@/lib/api-client";
import {BcDocument} from "@/types/bcDocument";
import Link from "next/dist/client/link";
import DocumentsListItems from "@/components/documents-list-items";

export default async function DocumentsPage() {

    const documents: BcDocument[] = await callApi('documents')

    return (
        <section className="section-block page-section" id="downloads">
            <div className="section-content">
                <ul>
                    <DocumentsListItems list={documents}></DocumentsListItems>
                </ul>
                <p className="text-block">Pour obtenir les fichiers sons, contacter
                    <em>ftiymusic [at] gmail.com</em>
                </p>
            </div>
        </section>
    );
};
