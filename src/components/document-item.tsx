'use client'
import {BcDocument} from "@/types/bc-document";
import React, {Fragment, useRef} from "react";
import Link from "next/dist/client/link";

export default function DocumentItem({document}: {document: BcDocument}) {
    const itemRef = useRef<HTMLLIElement>(null);
    const messageRef = useRef<HTMLParagraphElement>(null);
    const copyBtnRef = useRef<HTMLButtonElement>(null);

    const copyLinkInClipboard =  async () => {
        await navigator.clipboard.writeText(itemRef.current!.getAttribute('data-url') ?? '');
        messageRef.current!.classList.remove('hidden');
        copyBtnRef.current!.classList.add('hidden');

        setTimeout(() => {
            copyBtnRef.current!.classList.remove('hidden');
            messageRef.current!.classList.add('hidden');
        }, 2000);
    }

    return (
        <li className={"file-item" + (!document.is_valid ? ' invalid-item' : '')}
            key={'doc-' + document.id}
            data-url={document.url}
            data-token={document.token}
            ref={itemRef}
        >
            <Link href={document.is_folder ? '/document/' + document.id : document.url}>
                <i className={'far icon fa-' + document.fa_icon_name}></i>
                <span className="title">{document.name}</span>
                {document.lang &&
                    <span className="lang">({document.lang.toUpperCase()})</span>
                }
            </Link>

            {document.is_valid ||
                <p className="invalid-msg">
                    <i className="fa fa-triangle-exclamation"></i>
                    <span> Fichier absent : </span>
                    <span>{document.original_filename || "Unknown name"}</span>
                </p>
            }
            <div className="copy-url-block">
                {document.is_valid && <>
                    <p ref={messageRef} className="copy-url-success-message hidden">Lien copié !</p>
                    <button className="copy-url-btn" onClick={copyLinkInClipboard} ref={copyBtnRef}>
                        <i className="fa fa-copy"></i> <span>Copier le lien</span>
                    </button>
                </>}
            </div>
        </li>
    );
}