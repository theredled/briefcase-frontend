import React, {Suspense} from 'react';
import DocumentsListItems from "@/components/documents-list-items";
import {callApi} from "@/lib/api-client";
import AppLayout from "@/components/app-layout";
import {Briefcase} from "@/types/briefcase";
import {fetchCurrentBriefcase} from "@/lib/model";
import {SearchBar} from "@/components/search-bar";


export default async function DocumentsPage() {
    const briefcase = await fetchCurrentBriefcase();

    return (
        <AppLayout>
            <section className="section-block page-section" id="downloads">
                <div className="section-content">
                    <ul>
                        <Suspense fallback={<div>Chargement...</div>}>
                            <DocumentsListItems list={briefcase.documents}></DocumentsListItems>
                        </Suspense>
                    </ul>
                    <p className="text-block">Pour obtenir les fichiers sons, contacter
                        <em>ftiymusic [at] gmail.com</em>
                    </p>
                </div>
            </section>
        </AppLayout>
    );
};
