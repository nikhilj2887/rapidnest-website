import type { MetadataRoute } from "next";
import { services } from "./data/services";
import { getApprovedCaseStudies } from "./data/case-studies";
export default function sitemap(): MetadataRoute.Sitemap { return ["/", "/work", ...services.map(s => `/services/${s.slug}`), ...getApprovedCaseStudies().map(s => `/work/${s.slug}`)].map(path => ({ url: `https://www.therapidnest.com${path}` })); }
