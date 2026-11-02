import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {getApprovedCaseStudies} from "../../data/case-studies";
type Props={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return getApprovedCaseStudies().map(({slug})=>({slug}));}
async function approvedStudy(params:Props["params"]){const {slug}=await params; const study=getApprovedCaseStudies().find(s=>s.slug===slug); if(!study)notFound();return study;}
export async function generateMetadata({params}:Props):Promise<Metadata>{const s=await approvedStudy(params);return {title:`${s.projectTitle} | RapidNest`,description:s.challenge,alternates:{canonical:`/work/${s.slug}`}};}
export default async function Study({params}:Props){const s=await approvedStudy(params); return <article className="section"><div className="container narrow"><p className="eyebrow">{s.industry} / {s.deliveryStatus}</p><h1>{s.projectTitle}</h1><p>{s.clientDisplayName}</p><h2>The challenge</h2><p>{s.challenge}</p><h2>The solution</h2><p>{s.solution}</p><h2>Technology</h2><p>{s.technology.join(" · ")}</p><h2>Verified outcomes</h2><ul>{s.verifiedOutcomes.map(x=><li key={x}>{x}</li>)}</ul><Link className="button primary" href="/#contact">Discuss Your Project</Link></div></article>}
