// Retained for business review. Do not publish identities until authorized.
export interface Relationship {
    name: string;
    url: string | null;
    logo: string;
    verification: "pending" | "verified";
    publicationApproved: boolean;
    kind: "client" | "partner";
    publicationEvidence: string;
}
export const relationships: Relationship[] = [
    {
        "name": "Swadeshi",
        "url": "https://swadeshi.co.za/",
        "logo": "/clients/swadeshi.png",
        "verification": "verified",
        "publicationApproved": true,
        "publicationEvidence": "Owner confirmed the eight named logos for publication during the content audit; no project, outcome, or credential claims authorized.",
        "kind": "client"
    },
    {
        "name": "The Lyft",
        "url": "https://thelyft.in/",
        "logo": "/clients/thelyft.png",
        "verification": "verified",
        "publicationApproved": true,
        "publicationEvidence": "Owner confirmed the eight named logos for publication during the content audit; no project, outcome, or credential claims authorized.",
        "kind": "client"
    },
    {
        "name": "Mango Mist",
        "url": "https://www.mangomist.com/",
        "logo": "/clients/mangomist.png",
        "verification": "verified",
        "publicationApproved": true,
        "publicationEvidence": "Owner confirmed the eight named logos for publication during the content audit; no project, outcome, or credential claims authorized.",
        "kind": "client"
    },
    {
        "name": "Lamara",
        "url": "https://lamara.in/",
        "logo": "/clients/lamara.png",
        "verification": "verified",
        "publicationApproved": true,
        "publicationEvidence": "Owner confirmed the eight named logos for publication during the content audit; no project, outcome, or credential claims authorized.",
        "kind": "client"
    },
    {
        "name": "Clarion Talent Forge",
        "url": "https://www.clariontf.com/",
        "logo": "/clients/Clarion.png",
        "verification": "verified",
        "publicationApproved": true,
        "publicationEvidence": "Owner confirmed the eight named logos for publication during the content audit; no project, outcome, or credential claims authorized.",
        "kind": "client"
    },
    {
        "name": "Baseline Retention Solution",
        "url": null,
        "logo": "/clients/Baseline_logo_Hexcode_ADBABC.png",
        "verification": "verified",
        "publicationApproved": true,
        "publicationEvidence": "Owner confirmed the eight named logos for publication during the content audit; no project, outcome, or credential claims authorized.",
        "kind": "client"
    },
    {
        "name": "WICCI",
        "url": "https://wicci.au/",
        "logo": "/partners/wicci.png",
        "verification": "verified",
        "publicationApproved": true,
        "publicationEvidence": "Owner confirmed the eight named logos for publication during the content audit; exact connection designation remains unconfirmed and is not displayed.",
        "kind": "partner"
    },
    {
        "name": "G100",
        "url": "https://g100.in/",
        "logo": "/partners/g100.png",
        "verification": "verified",
        "publicationApproved": true,
        "publicationEvidence": "Owner confirmed the eight named logos for publication during the content audit; exact connection designation remains unconfirmed and is not displayed.",
        "kind": "partner"
    }
];

export function getApprovedRelationships(kind: Relationship["kind"], records: readonly Relationship[] = relationships) {
    return records.filter(record => record.kind === kind && record.verification === "verified" && record.publicationApproved);
}
