import {callApi} from "@/lib/api-client";
import {Briefcase} from "@/types/briefcase";
import {cache} from "react";

export const fetchCurrentBriefcase = cache(async function () {
    const id = getCurrentBriefcaseId();
    const bcData = await callApi(`briefcases/${id}`);
    return bcData as Briefcase;
});

export function getCurrentBriefcaseId() {
    return process.env.BRIEFCASE_ID;
}