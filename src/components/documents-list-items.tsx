import {BcDocument, isDocument} from "@/types/bcDocument";
import {SimpleFile, isSimpleFile} from "@/types/simple-file";
import Link from "next/dist/client/link";
import React from "react";
import {DocumentItem} from "@/components/document-item";


export default function DocumentsListItems({list, size = 'medium'}: {list: (BcDocument|SimpleFile)[], size?: string}) {
    return (
        <>
            {list.map((documentOrFile: BcDocument|SimpleFile, i: number) => <>
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