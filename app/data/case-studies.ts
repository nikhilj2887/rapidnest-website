export interface CaseStudy {
 slug:string; projectTitle:string; industry:string; clientDisplayName:string; challenge:string; solution:string; technology:string[]; deliveryStatus:"in-progress"|"completed"; verifiedOutcomes:string[]; publicationApproval:"pending"|"approved"|"declined";
}
// Add only substantiated content with explicit publication approval.
export const caseStudies: CaseStudy[] = [];
export function getApprovedCaseStudies(studies: readonly CaseStudy[] = caseStudies) {return studies.filter(s=>s.publicationApproval==="approved");}
