import {SimpleFile} from "@/types/simple-file";
import Link from "next/dist/client/link";
import React from "react";

export default function SimpleFilesList({list, parentDocument}: {list: SimpleFile[], parentDocument?: Document}) {
    return (
        <ul>
            {list.map((file: SimpleFile, i: number) => (
                <li className={"file-item"} key={'file-' + i}>
                    <div>
                    <i className={'far icon fa-' + file.fa_icon_name}></i>
                    <span className="title">{file.name}</span>

                    </div>
                    {!file.is_valid &&
                        <p className="invalid-msg">
                            <i className="fa fa-triangle-exclamation"></i> Fichier absent
                        </p>
                    }
                </li>
            ))}
        </ul>
    );
}