// Retained for business review. Do not publish identities until authorized.
export interface Relationship {
    name: string;
    url: string | null;
    logo: string;
    verification: "pending" | "verified";
    publicationApproved: boolean;
    kind: "client" | "partner";
}
export const relationships: Relationship[] = [
    {
        "name": "Swadeshi",
        "url": "https://swadeshi.co.za/",
        "logo": "/clients/swadeshi.png",
        "verification": "pending",
        "publicationApproved": false,
        "kind": "client"
    },
    {
        "name": "The Lyft",
        "url": "https://thelyft.in/",
        "logo": "/clients/thelyft.png",
        "verification": "pending",
        "publicationApproved": false,
        "kind": "client"
    },
    {
        "name": "Mango Mist",
        "url": "https://www.mangomist.com/",
        "logo": "/clients/mangomist.png",
        "verification": "pending",
        "publicationApproved": false,
        "kind": "client"
    },
    {
        "name": "Lamara",
        "url": "https://lamara.in/",
        "logo": "/clients/lamara.png",
        "verification": "pending",
        "publicationApproved": false,
        "kind": "client"
    },
    {
        "name": "Clarion Talent Forge",
        "url": "https://www.clariontf.com/",
        "logo": "/clients/Clarion.png",
        "verification": "pending",
        "publicationApproved": false,
        "kind": "client"
    },
    {
        "name": "Baseline Retention Solution",
        "url": null,
        "logo": "/clients/Baseline_logo_Hexcode_ADBABC.png",
        "verification": "pending",
        "publicationApproved": false,
        "kind": "client"
    },
    {
        "name": "WICCI",
        "url": "https://wicci.au/",
        "logo": "/partners/wicci.png",
        "verification": "pending",
        "publicationApproved": false,
        "kind": "partner"
    },
    {
        "name": "G100",
        "url": "https://g100.in/",
        "logo": "/partners/g100.png",
        "verification": "pending",
        "publicationApproved": false,
        "kind": "partner"
    }
];
