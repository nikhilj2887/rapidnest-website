export interface Service {
  slug: string;
  icon: string;
  title: string;
  description: string;
  capabilities: string[];
  capabilityDetails: string[];
  detailedDescription: string;
  challenges: string[];
  deliverables: string[];
  implementation: string;
  integrationConsiderations: string;
  technologies: string[];
  technologyContext: string;
  useCases: string[];
  faqs: { question: string; answer: string }[];
  cta: string;
}
export const services: Service[] = [
  {
    "slug": "custom-software-development",
    "icon": "Code2",
    "title": "Custom Software Development",
    "description": "Purpose-built applications for the way your business works.",
    "capabilities": [
      "Business applications",
      "API integrations",
      "Workflow automation"
    ],
    "useCases": [
      "Internal operations portals",
      "Customer-facing platforms"
    ],
    "detailedDescription": "We design and develop business applications around the processes that standard software does not adequately support. The scope can include internal tools, customer-facing platforms, and connections between existing systems.",
    "cta": "Request a Consultation",
    "challenges": [
      "Teams re-enter the same information across disconnected tools.",
      "Spreadsheets and manual handoffs make work difficult to track.",
      "Standard applications cannot accommodate important business rules."
    ],
    "deliverables": [
      "Documented requirements, user journeys, and acceptance criteria.",
      "An application increment with agreed workflows and system integrations.",
      "Test evidence, operating documentation, and an agreed handover plan."
    ],
    "capabilityDetails": [
      "Build tools for specific user roles, business rules, and operational tasks.",
      "Connect agreed systems through documented interfaces and data mappings.",
      "Replace manual handoffs with traceable steps, permissions, and exception handling."
    ],
    "implementation": "We map the current process with its users, identify the smallest useful release, and agree how success will be assessed. Design and development proceed through reviews, followed by validation, release planning, and handover.",
    "integrationConsiderations": "Discovery covers system interfaces, data ownership, access requirements, migration needs, and support responsibilities. Dependencies on third-party systems are recorded before delivery milestones are agreed.",
    "technologies": [
      "React",
      "Next.js",
      "TypeScript"
    ],
    "technologyContext": "Our current frontend toolkit includes React, Next.js, and TypeScript. Backend and infrastructure choices are evaluated separately for each application.",
    "faqs": [
      {
        "question": "When is custom software appropriate?",
        "answer": "It is useful when important workflows or integration needs are poorly served by existing tools. Discovery should also test whether configuring an existing product would be sufficient."
      },
      {
        "question": "Can delivery be phased?",
        "answer": "The scope can be divided into releases with explicit acceptance criteria, subject to dependencies and business priorities."
      }
    ]
  },
  {
    "slug": "ai-intelligent-automation",
    "icon": "Bot",
    "title": "AI & Intelligent Automation",
    "description": "Turn repetitive processes into thoughtful, human-supervised workflows.",
    "capabilities": [
      "AI-assisted workflows",
      "Document processing",
      "Human review controls"
    ],
    "useCases": [
      "Document triage",
      "Knowledge assistants"
    ],
    "detailedDescription": "We help shape AI-assisted processes for document handling, information retrieval, and repetitive operational work. Human review, exception handling, and evaluation criteria are part of the design rather than afterthoughts.",
    "cta": "Request a Consultation",
    "challenges": [
      "Document queues require repetitive classification and data extraction.",
      "Staff spend time finding information across multiple sources.",
      "Automation proposals lack clear review points for uncertain results."
    ],
    "deliverables": [
      "A process assessment and a prioritized automation use case.",
      "A prototype or scoped workflow with human review and exception paths.",
      "An evaluation plan covering output quality, data handling, and operational limits."
    ],
    "capabilityDetails": [
      "Connect AI-assisted steps with business rules, review points, and downstream actions.",
      "Scope document classification or extraction against representative inputs and quality criteria.",
      "Route uncertain outputs and sensitive decisions to authorized reviewers."
    ],
    "implementation": "We assess the task, available data, and consequences of an incorrect result. A bounded prototype is evaluated with representative examples before deciding whether to extend it into an operational workflow.",
    "integrationConsiderations": "We review data access, provider data-handling requirements, output validation, access permissions, usage costs, and escalation paths. Automation does not remove the need for accountable business owners.",
    "technologies": [],
    "technologyContext": "",
    "faqs": [
      {
        "question": "Will AI outputs always be accurate?",
        "answer": "No. Output quality depends on the task, data, and system design. Evaluation, validation, and human review are needed where errors could affect business decisions."
      },
      {
        "question": "Can confidential information be used?",
        "answer": "Data access and provider handling must be assessed before use. The permitted data, security controls, and review responsibilities are agreed during discovery."
      }
    ]
  },
  {
    "slug": "crm-erp-solutions",
    "icon": "Blocks",
    "title": "CRM & ERP Solutions",
    "description": "Connect customer information, business processes, and operational teams.",
    "capabilities": [
      "Customer lifecycle management",
      "Operational workflows",
      "Reporting"
    ],
    "useCases": [
      "Sales pipelines",
      "Resource planning"
    ],
    "detailedDescription": "We design customer and operational systems that connect records, responsibilities, and business workflows. Scope may cover a focused CRM process or selected ERP functions rather than an organization-wide replacement.",
    "cta": "Request a Consultation",
    "challenges": [
      "Customer and operational records are split between teams.",
      "Work ownership and approval status are unclear.",
      "Reporting depends on manually reconciling information from multiple tools."
    ],
    "deliverables": [
      "A process map, role model, and agreed record structure.",
      "Configured or custom workflows, integrations, and reporting views within scope.",
      "Data migration mappings, validation checks, and user handover materials as agreed."
    ],
    "capabilityDetails": [
      "Structure customer records, sales stages, follow-up activities, and ownership.",
      "Model requests, approvals, and resource-related processes with defined responsibilities.",
      "Create operational views based on agreed definitions and source data."
    ],
    "implementation": "We work with process owners to define records, responsibilities, and approval rules. Configuration or custom development is chosen after reviewing existing tools, followed by data validation and a phased rollout plan.",
    "integrationConsiderations": "Existing CRM or finance tools, duplicate records, migration quality, role-based access, and reporting definitions are assessed before implementation. Integration scope depends on the interfaces each system exposes.",
    "technologies": [],
    "technologyContext": "",
    "faqs": [
      {
        "question": "Does this require replacing our current CRM or ERP?",
        "answer": "Not necessarily. The assessment can identify whether configuration, a focused extension, or integration is more appropriate than replacement."
      },
      {
        "question": "Can existing data be migrated?",
        "answer": "Migration depends on source access, record quality, mapping rules, and validation requirements. These are assessed before a migration scope is agreed."
      }
    ]
  },
  {
    "slug": "gdpr-data-retention",
    "icon": "ShieldCheck",
    "title": "GDPR & Data Retention Solutions",
    "description": "Structured retention policies, controlled execution, and information governance.",
    "capabilities": [
      "Data Context Catalogue",
      "Retention Policy Configuration",
      "Script Catalogue",
      "Retention Job Configuration",
      "Scheduled Job Execution",
      "Validation Jobs and Approval Workflows",
      "Role-Based Access",
      "Execution Monitoring",
      "Reporting and Audit-Support Records"
    ],
    "useCases": [
      "Retention policy operations",
      "Controlled lifecycle processing",
      "Audit-support reporting"
    ],
    "detailedDescription": "We design structured data retention and lifecycle management solutions that help organizations organize retention policies, configure controlled execution workflows, validate processing activities, and support operational reporting and audit requirements.",
    "cta": "Request a Consultation",
    "challenges": [
      "Data contexts and retention responsibilities are not consistently catalogued.",
      "Policy changes, exceptions, and legal holds are difficult to translate into controlled processing.",
      "Execution, validation, and reporting rely on manual coordination or incomplete records."
    ],
    "deliverables": [
      "An agreed data context catalogue and retention-policy configuration model.",
      "Scoped script and job catalogues, schedules, validation steps, and approval controls.",
      "Execution monitoring, reporting requirements, and audit-support records within the agreed scope."
    ],
    "capabilityDetails": [
      "Organize data contexts, owners, and lifecycle requirements.",
      "Define retention rules and review exceptions with policy owners.",
      "Catalogue processing scripts with review and versioning requirements.",
      "Connect approved policies, data contexts, and processing steps.",
      "Configure execution windows and operational dependencies.",
      "Review validation results and require approval before execution.",
      "Separate configuration, review, and execution permissions.",
      "Track processing states and surface operational exceptions.",
      "Maintain execution records to support reporting and audit review."
    ],
    "implementation": "We establish the data contexts and policy ownership first, then define configuration, validation, and authorization steps. Execution and reporting requirements are reviewed with the operational team before release planning.",
    "integrationConsiderations": "Discovery covers data-source interfaces, execution permissions, schedules, legal holds, deletion exceptions, identity controls, and reporting dependencies. Policy decisions and legal interpretations remain with the organization’s legal, privacy, and governance teams.",
    "technologies": [],
    "technologyContext": "",
    "faqs": [
      {
        "question": "Does this guarantee GDPR compliance?",
        "answer": "No. Technical controls support information governance; legal obligations, policies, operating processes, and implementation determine compliance. Your legal and privacy teams define and approve the requirements."
      },
      {
        "question": "Can execution require approval?",
        "answer": "Validation results and authorized execution can be separated through scoped role permissions and review steps."
      },
      {
        "question": "Is this an existing RapidNest product?",
        "answer": "This is a technical service capability, scoped around an organization’s retention policies, approval processes, and integration needs. It is not presented as an off-the-shelf product."
      },
      {
        "question": "How are legal holds or exceptions handled?",
        "answer": "Hold and exception requirements need to be defined by policy owners and incorporated into configuration, validation, and execution controls before processing is authorized."
      }
    ]
  },
  {
    "slug": "cloud-application-modernization",
    "icon": "Cloud",
    "title": "Cloud & Application Modernization",
    "description": "Plan practical improvements to existing applications and infrastructure.",
    "capabilities": [
      "Application assessment",
      "Migration planning",
      "Performance improvement"
    ],
    "useCases": [
      "Legacy application modernization",
      "Cloud readiness"
    ],
    "detailedDescription": "We assess existing applications and plan targeted changes to their architecture, operation, and deployment. Modernization can be incremental, with priorities based on business risk and maintainability rather than a default rewrite.",
    "cta": "Request a Consultation",
    "challenges": [
      "Legacy dependencies make routine changes difficult.",
      "Application behavior and support responsibilities are insufficiently documented.",
      "Migration proposals do not adequately account for continuity, data movement, or rollback."
    ],
    "deliverables": [
      "An application and dependency assessment with prioritized findings.",
      "A modernization roadmap covering migration sequence, risks, and acceptance criteria.",
      "Scoped application changes, deployment documentation, and rollback planning as agreed."
    ],
    "capabilityDetails": [
      "Review application structure, dependencies, operational constraints, and support risks.",
      "Define migration stages, validation checks, cutover requirements, and rollback options.",
      "Investigate performance bottlenecks and agree measurable acceptance criteria before changes."
    ],
    "implementation": "We assess the existing system, establish operational constraints, and compare incremental improvement with replacement options. Work is sequenced around dependencies, with validation and rollback planning for each material change.",
    "integrationConsiderations": "Hosting constraints, identity systems, data residency requirements, deployment access, monitoring, and continuity expectations guide planning. A particular cloud provider or migration pattern is not assumed before assessment.",
    "technologies": [],
    "technologyContext": "",
    "faqs": [
      {
        "question": "Does modernization mean a full rewrite?",
        "answer": "No. Targeted dependency updates, application changes, or a phased migration may be more appropriate. The assessment compares options against business priorities and constraints."
      },
      {
        "question": "Can migration happen without disruption?",
        "answer": "Continuity requirements, cutover windows, validation, and rollback options are planned explicitly. Zero downtime is not guaranteed."
      }
    ]
  },
  {
    "slug": "web-mobile-development",
    "icon": "Smartphone",
    "title": "Web & Mobile Application Development",
    "description": "Connected digital experiences across web and mobile.",
    "capabilities": [
      "Responsive web applications",
      "Mobile experiences",
      "Backend integration"
    ],
    "useCases": [
      "Customer self-service",
      "Business portals"
    ],
    "detailedDescription": "We design and build web and mobile application experiences for customer and business tasks. Scope is guided by users, accessibility needs, device requirements, and the systems the application must connect to.",
    "cta": "Request a Consultation",
    "challenges": [
      "Customers or staff struggle to complete important tasks on mobile devices.",
      "Web interfaces do not reflect the underlying business workflow.",
      "A new digital channel needs a defined scope and reliable connections to existing systems."
    ],
    "deliverables": [
      "User journeys, responsive interface designs, and acceptance criteria.",
      "A scoped application with agreed backend connections and device support.",
      "Accessibility and functional test evidence, release preparation, and handover documentation."
    ],
    "capabilityDetails": [
      "Build responsive interfaces for the agreed browsers, devices, and user tasks.",
      "Define mobile journeys and platform requirements before selecting an implementation approach.",
      "Connect interface actions to agreed APIs, identity systems, and business data."
    ],
    "implementation": "We define user journeys and device requirements, validate interface designs, and implement agreed workflows in reviewable increments. Testing covers the supported environments and critical user tasks before launch planning.",
    "integrationConsiderations": "API access, authentication, data permissions, browser support, app distribution requirements, and operational ownership are considered during scoping. Native-app delivery requirements are assessed separately from responsive web scope.",
    "technologies": [
      "React",
      "Next.js",
      "TypeScript"
    ],
    "technologyContext": "React, Next.js, and TypeScript support our current web frontend work. Mobile platform and backend choices follow the agreed requirements and validated delivery capability.",
    "faqs": [
      {
        "question": "Do we need a native mobile app or a responsive website?",
        "answer": "The decision depends on user tasks, device features, distribution needs, and support constraints. These are assessed before selecting an implementation approach."
      },
      {
        "question": "Is accessibility included in the scope?",
        "answer": "Accessibility requirements and the intended testing standard should be agreed during discovery, with acceptance criteria for the supported user journeys."
      }
    ]
  },
  {
    "slug": "technology-consulting-delivery",
    "icon": "Compass",
    "title": "Technology Consulting & Delivery",
    "description": "Translate business priorities into a clear, actionable technology roadmap.",
    "capabilities": [
      "Discovery and requirements",
      "Architecture planning",
      "Delivery governance"
    ],
    "useCases": [
      "Technology roadmaps",
      "Delivery planning"
    ],
    "detailedDescription": "We help business and technology stakeholders make implementation decisions with a shared understanding of requirements, dependencies, and delivery responsibilities. The work can support a new initiative or clarify an existing programme.",
    "cta": "Request a Consultation",
    "challenges": [
      "Stakeholders have different expectations of scope and priorities.",
      "Technology options are being considered without clear decision criteria.",
      "Dependencies, risks, and acceptance responsibilities are not visible to the delivery team."
    ],
    "deliverables": [
      "A requirements baseline, stakeholder map, and prioritized decision log.",
      "An options assessment or architecture roadmap appropriate to the engagement.",
      "A delivery plan with milestones, dependencies, review points, and ownership."
    ],
    "capabilityDetails": [
      "Clarify business requirements, stakeholder needs, priorities, and acceptance responsibilities.",
      "Compare solution options against integration needs, operational constraints, and maintainability.",
      "Establish milestones, risks, review points, and communication responsibilities."
    ],
    "implementation": "We interview the relevant stakeholders, review available system and delivery evidence, and document the decisions that need to be made. Recommendations are presented with assumptions, trade-offs, dependencies, and ownership.",
    "integrationConsiderations": "The engagement is aligned with existing teams, vendors, governance processes, and decision rights. Recommendations distinguish what is known, what needs validation, and what depends on third-party input.",
    "technologies": [],
    "technologyContext": "",
    "faqs": [
      {
        "question": "Can you support an existing delivery team?",
        "answer": "The engagement can focus on requirements, planning, or governance alongside an existing team. Responsibilities and decision rights are agreed at the outset."
      },
      {
        "question": "Will the engagement include development?",
        "answer": "Advisory and implementation work are scoped explicitly. Development is included only where it forms part of the agreed engagement."
      }
    ]
  }
];
