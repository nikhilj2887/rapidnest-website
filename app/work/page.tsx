import type { Metadata } from "next";
import CaseStudies from "../components/CaseStudies";
export const metadata: Metadata={title:"Our Work & Solution Capabilities | RapidNest",description:"Explore RapidNest solution capabilities and approved case studies.",alternates:{canonical:"/work"},openGraph:{title:"Our Work & Solution Capabilities",description:"Explore RapidNest solution capabilities and approved case studies.",url:"/work"}};
export default function Work(){return <><div className="detail-hero"><div className="container"><p className="eyebrow">OUR WORK</p><h1>Business problems.<br/>Purposeful engineering.</h1><p className="lead">Explore the kinds of solutions we can help shape. Client stories are published only with approval and verified details.</p></div></div><CaseStudies/></>}
