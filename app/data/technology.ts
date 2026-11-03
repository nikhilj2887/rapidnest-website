export interface TechnologyApproval {
  name: string;
  verification: "verified" | "pending";
  publicationApproved: boolean;
}

// Owner confirmed actual delivery capability and public use on 3 November 2026.
// React JS is normalized to React; Next.js/TypeScript retain their earlier approval.
export const technologyInventory: readonly TechnologyApproval[] = [
  "AWS", "Azure", "C#", ".NET", "ASP.NET Core", "SQL Server", "PostgreSQL",
  "Power BI", "Power Apps", "Power Automate", "Angular", "React", "Next.js", "TypeScript",
].map(name => ({ name, verification: "verified", publicationApproved: true }));

export function getApprovedTechnologyNames(records: readonly TechnologyApproval[] = technologyInventory) {
  return records.filter(record => record.verification === "verified" && record.publicationApproved).map(record => record.name);
}

export const technologyCategories = [
  { id: "cloud", title: "Cloud & Modernization", description: "Cloud application development, deployment and modernization on AWS and Azure, with migration planned around continuity and existing systems.", technologies: ["AWS", "Azure"] },
  { id: "automation", title: "Automation & Intelligent Workflows", description: "AI-assisted workflows connect document processing and application integrations with human review, exception handling and clear decision ownership.", technologies: [] },
  { id: "dotnet", title: "Microsoft .NET Development", description: "Backend applications and enterprise APIs that connect business rules, data and operational workflows.", technologies: ["C#", ".NET", "ASP.NET Core"] },
  { id: "data", title: "Data & Analytics", description: "Databases, data integration, reporting and analytics that help teams manage information and understand their operations.", technologies: ["SQL Server", "PostgreSQL", "Power BI"] },
  { id: "power", title: "Microsoft Power Platform", description: "Low-code applications and workflow automation for approvals, operational tasks and connections between everyday tools.", technologies: ["Power Apps", "Power Automate"] },
  { id: "web", title: "Web & Application Engineering", description: "Responsive web applications and maintainable interfaces designed around users, business processes and system integrations.", technologies: ["Angular", "React", "Next.js", "TypeScript"] },
] as const;
