
import {BcDocument, isDocument} from "@/types/bcDocument";
import {SimpleFile, isSimpleFile} from "@/types/simple-file";
import Link from "next/dist/client/link";
import React from "react";
import DocumentItem from "@/components/document-item";
import {callApi} from "@/lib/api-client";


export  default async function DocumentsListItems(
    {list, apiEndpoint, size = 'medium'}:
    {list?: (BcDocument|SimpleFile)[], apiEndpoint?: string, size?: string}
) {
    if (list === undefined) {
        if (!apiEndpoint)
            throw new Error('list/apiEntrypoint is required');
        list = (await callApi(apiEndpoint)) || [];
    }

    return (
        <>
            {list?.map((documentOrFile: BcDocument|SimpleFile, i: number) => <>
                {isDocument(documentOrFile) &&
                    <DocumentItem document={documentOrFile} />
                }
                {isSimpleFile(documentOrFile) &&
                    <li className={"file-item"} key={'file-' + i}>
                        <div>
                        <i className={'far icon fa-' + documentOrFile.fa_icon_name}></i>
                        <span className="title">{documentOrFile.name}</span>

                        </div>
                        {!documentOrFile.is_valid &&
                            <p className="invalid-msg">
                                <i className="fa fa-triangle-exclamation"></i> Fichier absent
                            </p>
                        }
                    </li>
                }

            </>)}
        </>
    );
}