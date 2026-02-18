"use client"
import {BcDocument, isDocument} from "@/types/bc-document";
import {SimpleFile, isSimpleFile} from "@/types/simple-file";
import React from "react";
import DocumentItem from "@/components/document-item";
import {useSearch} from "@/search-context";


export  default function DocumentsListItems(
    {list, size = 'medium'}:
    {list: (BcDocument|SimpleFile)[],  size?: string}
) {
    const { query } = useSearch();

    const filteredList = query
        ? list.filter((item) =>
            item.name && item.name.toLowerCase().includes(query.toLowerCase())
        )
        : list;

    /*if (list === undefined) {
        if (!apiEndpoint)
            throw new Error('list OR apiEndpoint is required');
        list = (await callApi(apiEndpoint)) || [];
    }*/

    return (
        <>
            {filteredList?.map((documentOrFile: BcDocument|SimpleFile, i: number) => <>
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