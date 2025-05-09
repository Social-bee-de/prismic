"use client";

import { useEffect } from "react";
import TagManager, { type TagManagerArgs } from 'react-gtm-module';
import { clarity } from 'react-microsoft-clarity';

export const GoogleScripts = ({ tagManagerArgs, clarityId }: { tagManagerArgs: TagManagerArgs, clarityId: string }) => {
	useEffect(() => {
		TagManager.initialize(tagManagerArgs);
		clarity.init(clarityId);
		if (/windows/i.test(navigator.userAgent)) {
			document.body.classList.add('win');
		}
	}, []);

  return (
    <></>
  );
}
