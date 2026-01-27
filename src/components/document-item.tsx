'use client'
import {BcDocument} from "@/types/bcDocument";
import {isSimpleFile} from "@/types/simple-file";
import React, {useRef} from "react";
import Link from "next/dist/client/link";

export function DocumentItem({document}: {document: BcDocument}) {
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

        /*navigator.clipboard.writeText(btn.getAttribute('data-url')).then(() => {

                        const messageEl = btn.parentNode.querySelector('.copy-url-success-message');
                        messageEl.classList.remove('hidden');
                        btn.classList.add('hidden');
                        setTimeout(() => {
                            messageEl.classList.add('hidden');
                            btn.classList.remove('hidden');
                        }, 2000);
                    });*/
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

                {document.is_valid ||
                    <p className="invalid-msg">
                        <i className="fa fa-triangle-exclamation"></i> Fichier absent
                    </p>
                }
            </Link>

            <div className="copy-url-block">
                <p ref={messageRef} className="copy-url-success-message hidden">Lien copié !</p>
                <button className="copy-url-btn" onClick={copyLinkInClipboard} ref={copyBtnRef}>
                    <i className="fa fa-copy"></i> <span>Copier le lien</span>
                </button>
            </div>
        </li>
    );
}