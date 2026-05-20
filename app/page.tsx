"use client";

import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  Check,
  ChevronRight,
  CircleDot,
  Clock3,
  Command,
  Database,
  FileText,
  Gauge,
  Inbox,
  Layers3,
  Mail,
  MessageSquare,
  Network,
  PanelLeft,
  PlugZap,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Slack,
  Sparkles,
  Table2,
  Terminal,
  Workflow,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Agent = {
  name: string;
  role: string;
  status: string;
  load: string;
  icon: LucideIcon;
  accent: string;
};

type WorkflowStep = {
  title: string;
  detail: string;
  state: "done" | "active" | "pending";
};

type Integration = {
  name: string;
  icon: LucideIcon;
  tone: string;
};

const navItems = [
  { label: "Agent Library", icon: Bot },
  { label: "Task Queue", icon: Layers3 },
  { label: "Knowledge Base", icon: BookOpen },
  { label: "Integrations", icon: PlugZap },
  { label: "Settings", icon: Settings }
];

const agents: Agent[] = [
  {
    name: "Sales Agent",
    role: "Lead scoring, outreach drafts, CRM enrichment",
    status: "Live",
    load: "82%",
    icon: Gauge,
    accent: "from-cyan-400 to-blue-500"
  },
  {
    name: "Support Agent",
    role: "Ticket triage, answer suggestions, SLA routing",
    status: "Reviewing",
    load: "64%",
    icon: MessageSquare,
    accent: "from-violet-400 to-fuchsia-500"
  },
  {
    name: "Research Agent",
    role: "Market scans, source summaries, competitor watch",
    status: "Queued",
    load: "41%",
    icon: Search,
    accent: "from-sky-400 to-cyan-300"
  },
  {
    name: "Content Agent",
    role: "Briefs, post variants, brand-safe rewrites",
    status: "Drafting",
    load: "73%",
    icon: FileText,
    accent: "from-indigo-400 to-blue-500"
  },
  {
    name: "Data Analyst Agent",
    role: "CSV cleanup, anomaly detection, KPI narratives",
    status: "Analyzing",
    load: "58%",
    icon: BarChart3,
    accent: "from-emerald-300 to-cyan-400"
  }
];

const workflow: WorkflowStep[] = [
  {
    title: "Input received",
    detail: "Command parsed with intent, context, priority, and owner.",
    state: "done"
  },
  {
    title: "Agent reasoning",
    detail: "Planner evaluates policy, data sources, and execution path.",
    state: "active"
  },
  {
    title: "Tool execution",
    detail: "APIs, documents, webhooks, and knowledge retrieval run in sequence.",
    state: "pending"
  },
  {
    title: "Result generated",
    detail: "Final response includes structured output and confidence signals.",
    state: "pending"
  },
  {
    title: "Human review",
    detail: "Approver can edit, rerun, schedule, or push to downstream tools.",
    state: "pending"
  }
];

const timeline = [
  { label: "Trigger", time: "09:12", note: "New CRM lead imported" },
  { label: "Processing", time: "09:13", note: "Sales Agent enriched account data" },
  { label: "Review", time: "09:16", note: "Human approval requested" },
  { label: "Completed", time: "09:21", note: "Follow-up sequence scheduled" }
];

const integrations: Integration[] = [
  { name: "Gmail", icon: Mail, tone: "bg-red-400/15 text-red-100 ring-red-300/20" },
  { name: "Slack", icon: Slack, tone: "bg-emerald-400/15 text-emerald-100 ring-emerald-300/20" },
  { name: "Notion", icon: Database, tone: "bg-zinc-200/10 text-zinc-100 ring-white/15" },
  { name: "Google Sheets", icon: Table2, tone: "bg-lime-400/15 text-lime-100 ring-lime-300/20" },
  { name: "CRM", icon: Network, tone: "bg-blue-400/15 text-blue-100 ring-blue-300/20" },
  { name: "API", icon: Zap, tone: "bg-cyan-400/15 text-cyan-100 ring-cyan-300/20" }
];

const suggestedActions = [
  "Summarize active support tickets",
  "Generate outreach sequence",
  "Sync reviewed tasks to CRM"
];

function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-xs font-medium text-cyan-100">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.95)]" />
      {children}
    </span>
  );
}

function Panel({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-lg border border-white/10 bg-white/[0.055] shadow-panel backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden px-3 py-3 text-slate-100 sm:px-4 lg:p-6">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="rounded-lg border border-white/10 bg-slate-950/72 p-4 shadow-panel backdrop-blur-xl lg:min-h-[calc(100vh-3rem)]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-300/12 ring-1 ring-cyan-200/20">
                <Bot className="h-5 w-5 text-cyan-200" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">AgentOS</p>
                <p className="text-xs text-slate-400">Automation Console</p>
              </div>
            </div>
            <PanelLeft className="h-5 w-5 text-slate-400 lg:hidden" />
          </div>

          <nav className="mt-8 grid gap-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-white/10 ${
                    index === 0
                      ? "bg-cyan-300/12 text-cyan-50 ring-1 ring-cyan-300/15"
                      : "text-slate-300"
                  }`}
                  type="button"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
                </button>
              );
            })}
          </nav>

          <div className="mt-8 rounded-lg border border-violet-300/15 bg-violet-400/10 p-4">
            <div className="flex items-center justify-between gap-3">
              <Sparkles className="h-5 w-5 text-violet-200" />
              <StatusPill>Online</StatusPill>
            </div>
            <p className="mt-4 text-sm font-medium text-white">Workspace Health</p>
            <div className="mt-3 grid gap-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Automations</span>
                <span className="text-cyan-200">24 active</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400" />
              </div>
            </div>
          </div>
        </aside>

        <div className="grid gap-4">
          <header className="grid gap-4 rounded-lg border border-white/10 bg-slate-950/64 p-4 shadow-panel backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_360px] lg:p-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill>AI Agent Workspace</StatusPill>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-xs font-medium text-emerald-100">
                  99.8% workflow uptime
                </span>
              </div>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-normal text-white sm:text-5xl lg:text-6xl">
                AI Agent Workspace
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                A polished control center for AI automation tools, multi-agent task
                orchestration, human review loops, and SaaS-grade workflow visibility.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-glow transition hover:bg-cyan-200"
                  type="button"
                >
                  Launch Demo
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/12"
                  type="button"
                >
                  <Terminal className="h-4 w-4" />
                  View Command Log
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-cyan-300/15 bg-slate-950/70 p-4 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="flex items-center gap-2 text-cyan-100">
                  <Command className="h-4 w-4" />
                  agent.run
                </span>
                <span className="text-emerald-300">active</span>
              </div>
              <div className="mt-4 space-y-3">
                <p>
                  <span className="text-violet-300">intent</span>: qualify inbound
                  enterprise lead
                </p>
                <p>
                  <span className="text-cyan-300">tools</span>: gmail, crm, sheets,
                  slack
                </p>
                <p>
                  <span className="text-blue-300">policy</span>: request approval
                  before external send
                </p>
                <div className="rounded-md bg-black/35 p-3 text-slate-200">
                  status: reasoning complete, awaiting human review
                </div>
              </div>
            </div>
          </header>

          <section className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.8fr)]">
            <Panel className="p-4 lg:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-400">Agent Library</p>
                  <h2 className="text-xl font-semibold text-white">Specialized AI Operators</h2>
                </div>
                <button
                  className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/8 px-3 py-2 text-sm text-slate-100"
                  type="button"
                >
                  <Bot className="h-4 w-4" />
                  Add Agent
                </button>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {agents.map((agent) => {
                  const Icon = agent.icon;
                  return (
                    <article
                      key={agent.name}
                      className="rounded-lg border border-white/10 bg-slate-950/42 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/[0.075]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className={`rounded-lg bg-gradient-to-br ${agent.accent} p-2.5 text-slate-950`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-slate-300">
                          {agent.status}
                        </span>
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-white">{agent.name}</h3>
                      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{agent.role}</p>
                      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                        <span>Load</span>
                        <span className="text-cyan-200">{agent.load}</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${agent.accent}`}
                          style={{ width: agent.load }}
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            </Panel>

            <Panel className="p-4 lg:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-400">Chat / Command Panel</p>
                  <h2 className="text-xl font-semibold text-white">Prompt to Action</h2>
                </div>
                <StatusPill>Listening</StatusPill>
              </div>

              <div className="mt-5 rounded-lg border border-white/10 bg-slate-950/55 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">User prompt</p>
                <div className="mt-3 flex gap-2">
                  <input
                    aria-label="User prompt"
                    className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40"
                    defaultValue="Research this lead and draft a follow-up plan"
                  />
                  <button
                    aria-label="Send prompt"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan-300 text-slate-950 transition hover:bg-cyan-200"
                    type="button"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 rounded-lg bg-black/35 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-cyan-100">
                    <Activity className="h-4 w-4" />
                    AI response area
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    I found 3 buying signals, matched the account to a high-fit segment,
                    and prepared a review-ready outreach sequence with CRM notes.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                {suggestedActions.map((action) => (
                  <button
                    key={action}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.045] px-3 py-2.5 text-left text-sm text-slate-200 transition hover:border-cyan-300/25 hover:bg-white/10"
                    type="button"
                  >
                    <span>{action}</span>
                    <ArrowRight className="h-4 w-4 text-slate-500" />
                  </button>
                ))}
              </div>
            </Panel>
          </section>

          <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <Panel className="p-4 lg:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-400">Task Workflow</p>
                  <h2 className="text-xl font-semibold text-white">Reasoning Pipeline</h2>
                </div>
                <Workflow className="h-5 w-5 text-cyan-200" />
              </div>

              <div className="mt-5 grid gap-3">
                {workflow.map((step, index) => (
                  <div
                    key={step.title}
                    className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 rounded-lg border border-white/10 bg-slate-950/38 p-3"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          step.state === "done"
                            ? "bg-emerald-300 text-slate-950"
                            : step.state === "active"
                              ? "bg-cyan-300 text-slate-950 shadow-glow"
                              : "bg-white/10 text-slate-400"
                        }`}
                      >
                        {step.state === "done" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <CircleDot className="h-4 w-4" />
                        )}
                      </div>
                      {index < workflow.length - 1 ? (
                        <div className="mt-2 h-10 w-px bg-white/10" />
                      ) : null}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel className="p-4 lg:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-400">Automation Timeline</p>
                  <h2 className="text-xl font-semibold text-white">Execution History</h2>
                </div>
                <Clock3 className="h-5 w-5 text-blue-200" />
              </div>

              <div className="mt-5 grid gap-3">
                {timeline.map((item, index) => (
                  <article
                    key={item.label}
                    className="grid grid-cols-[72px_minmax(0,1fr)] gap-4 rounded-lg border border-white/10 bg-slate-950/38 p-3"
                  >
                    <time className="font-mono text-sm text-cyan-200">{item.time}</time>
                    <div className="relative">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            index === timeline.length - 1 ? "bg-emerald-300" : "bg-cyan-300"
                          }`}
                        />
                        <h3 className="text-sm font-semibold text-white">{item.label}</h3>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{item.note}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-5 rounded-lg border border-blue-300/15 bg-blue-300/10 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-100">
                  <ShieldCheck className="h-4 w-4" />
                  Human-in-the-loop control
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Every external action can pause for approval, collect edits, and write
                  the decision back to the automation log.
                </p>
              </div>
            </Panel>
          </section>

          <Panel className="p-4 lg:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">Integrations</p>
                <h2 className="text-xl font-semibold text-white">Connected Business Tools</h2>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-slate-300">
                <Inbox className="h-4 w-4 text-cyan-200" />
                18 tasks synced today
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {integrations.map((integration) => {
                const Icon = integration.icon;
                return (
                  <div
                    key={integration.name}
                    className={`rounded-lg p-4 ring-1 ${integration.tone}`}
                  >
                    <Icon className="h-5 w-5" />
                    <p className="mt-4 text-sm font-semibold">{integration.name}</p>
                    <p className="mt-1 text-xs opacity-75">Connected</p>
                  </div>
                );
              })}
            </div>
          </Panel>

          <footer className="flex flex-col gap-2 pb-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>Portfolio demo for AI automation, agent dashboards, and SaaS UI builds.</span>
            <span className="font-mono">Next.js / TypeScript / Tailwind CSS</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
