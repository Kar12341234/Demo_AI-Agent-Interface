"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Bot,
  BrainCircuit,
  Check,
  Circle,
  ClipboardList,
  CloudLightning,
  Code2,
  Database,
  FileClock,
  Filter,
  GitBranch,
  Globe2,
  KeyRound,
  LayoutDashboard,
  ListChecks,
  MessageSquare,
  MousePointer2,
  Network,
  Play,
  Plus,
  RefreshCcw,
  Rocket,
  RotateCcw,
  Save,
  Search,
  Settings2,
  ShieldCheck,
  Shuffle,
  SlidersHorizontal,
  Sparkles,
  Terminal,
  Unplug,
  Webhook,
  Workflow,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";

type PageKey = "dashboard" | "workflow" | "logs" | "integrations";
type Locale = "hant" | "hans" | "en";
type Status = "live" | "review" | "paused" | "queued";

type Agent = {
  id: string;
  name: string;
  mission: string;
  status: Status;
  score: number;
  icon: LucideIcon;
};

type NodeItem = {
  id: string;
  title: string;
  type: string;
  x: number;
  y: number;
  state: "ready" | "running" | "done";
};

type LogItem = {
  id: string;
  source: string;
  message: string;
  status: "success" | "running" | "warning";
  time: string;
};

type Integration = {
  id: string;
  name: string;
  description: string;
  connected: boolean;
  icon: LucideIcon;
};

const copy = {
  hant: {
    nav: {
      dashboard: "Dashboard",
      workflow: "Workflow Builder",
      logs: "Logs",
      integrations: "Integrations"
    },
    brand: "AgentForge",
    subtitle: "AI 自動化控制台",
    command: "任務指令",
    runCheck: "系統檢查",
    createAgent: "建立 Agent",
    dashboardTitle: "AI Agents 指揮中心",
    dashboardDesc: "監控智能體、工作流狀態、任務吞吐和自動化成效。",
    workflowTitle: "Automation Workflow Builder",
    workflowDesc: "設計 trigger flow、automation nodes、工具調用與人工審批路徑。",
    logsTitle: "Execution Logs",
    logsDesc: "追蹤 execution history、API activity、automation status 和錯誤重試。",
    integrationsTitle: "Integrations Hub",
    integrationsDesc: "管理 OpenAI、Airtable、Slack、Notion 的連接、測試與同步。",
    activeAgents: "運行 Agents",
    completedRuns: "完成流程",
    apiCalls: "API 調用",
    savings: "節省工時",
    agentOps: "Agent Operations",
    analytics: "Analytics",
    workflowStatus: "Workflow Status",
    live: "運行中",
    review: "待審批",
    paused: "已暫停",
    queued: "排隊中",
    deploy: "部署",
    pause: "暫停",
    approve: "批准",
    optimize: "優化",
    today: "今日",
    week: "本週",
    month: "本月",
    conversion: "轉化",
    latency: "延遲",
    accuracy: "準確率",
    trigger: "觸發器",
    addNode: "新增節點",
    autoArrange: "自動排列",
    runSimulation: "模擬執行",
    saveDraft: "儲存草稿",
    selectedNode: "選中節點",
    move: "移動",
    duplicate: "複製",
    remove: "移除",
    apiActivity: "API Activity",
    searchLogs: "搜尋 logs",
    replay: "重放",
    resolve: "標記處理",
    export: "匯出",
    clearFilters: "清除篩選",
    connect: "連接",
    disconnect: "斷開",
    test: "測試",
    sync: "同步",
    rotate: "輪換 Key",
    status: "狀態",
    toastPrefix: "已執行"
  },
  hans: {
    nav: {
      dashboard: "Dashboard",
      workflow: "Workflow Builder",
      logs: "Logs",
      integrations: "Integrations"
    },
    brand: "AgentForge",
    subtitle: "AI 自动化控制台",
    command: "任务指令",
    runCheck: "系统检查",
    createAgent: "建立 Agent",
    dashboardTitle: "AI Agents 指挥中心",
    dashboardDesc: "监控智能体、工作流状态、任务吞吐和自动化成效。",
    workflowTitle: "Automation Workflow Builder",
    workflowDesc: "设计 trigger flow、automation nodes、工具调用与人工审批路径。",
    logsTitle: "Execution Logs",
    logsDesc: "追踪 execution history、API activity、automation status 和错误重试。",
    integrationsTitle: "Integrations Hub",
    integrationsDesc: "管理 OpenAI、Airtable、Slack、Notion 的连接、测试与同步。",
    activeAgents: "运行 Agents",
    completedRuns: "完成流程",
    apiCalls: "API 调用",
    savings: "节省工时",
    agentOps: "Agent Operations",
    analytics: "Analytics",
    workflowStatus: "Workflow Status",
    live: "运行中",
    review: "待审批",
    paused: "已暂停",
    queued: "排队中",
    deploy: "部署",
    pause: "暂停",
    approve: "批准",
    optimize: "优化",
    today: "今日",
    week: "本周",
    month: "本月",
    conversion: "转化",
    latency: "延迟",
    accuracy: "准确率",
    trigger: "触发器",
    addNode: "新增节点",
    autoArrange: "自动排列",
    runSimulation: "模拟执行",
    saveDraft: "储存草稿",
    selectedNode: "选中节点",
    move: "移动",
    duplicate: "复制",
    remove: "移除",
    apiActivity: "API Activity",
    searchLogs: "搜寻 logs",
    replay: "重放",
    resolve: "标记处理",
    export: "导出",
    clearFilters: "清除筛选",
    connect: "连接",
    disconnect: "断开",
    test: "测试",
    sync: "同步",
    rotate: "轮换 Key",
    status: "状态",
    toastPrefix: "已执行"
  },
  en: {
    nav: {
      dashboard: "Dashboard",
      workflow: "Workflow Builder",
      logs: "Logs",
      integrations: "Integrations"
    },
    brand: "AgentForge",
    subtitle: "AI automation control plane",
    command: "Command",
    runCheck: "Run health check",
    createAgent: "Create agent",
    dashboardTitle: "AI Agents Command Center",
    dashboardDesc: "Monitor agents, workflow status, task throughput, and automation impact.",
    workflowTitle: "Automation Workflow Builder",
    workflowDesc: "Design trigger flows, automation nodes, tool calls, and human approval paths.",
    logsTitle: "Execution Logs",
    logsDesc: "Track execution history, API activity, automation status, and retry outcomes.",
    integrationsTitle: "Integrations Hub",
    integrationsDesc: "Manage OpenAI, Airtable, Slack, and Notion connections, tests, and syncs.",
    activeAgents: "Active Agents",
    completedRuns: "Completed Runs",
    apiCalls: "API Calls",
    savings: "Hours Saved",
    agentOps: "Agent Operations",
    analytics: "Analytics",
    workflowStatus: "Workflow Status",
    live: "Live",
    review: "Review",
    paused: "Paused",
    queued: "Queued",
    deploy: "Deploy",
    pause: "Pause",
    approve: "Approve",
    optimize: "Optimize",
    today: "Today",
    week: "Week",
    month: "Month",
    conversion: "Conversion",
    latency: "Latency",
    accuracy: "Accuracy",
    trigger: "Trigger",
    addNode: "Add node",
    autoArrange: "Auto arrange",
    runSimulation: "Run simulation",
    saveDraft: "Save draft",
    selectedNode: "Selected node",
    move: "Move",
    duplicate: "Duplicate",
    remove: "Remove",
    apiActivity: "API Activity",
    searchLogs: "Search logs",
    replay: "Replay",
    resolve: "Resolve",
    export: "Export",
    clearFilters: "Clear filters",
    connect: "Connect",
    disconnect: "Disconnect",
    test: "Test",
    sync: "Sync",
    rotate: "Rotate key",
    status: "Status",
    toastPrefix: "Ran"
  }
} as const;

const nav = [
  { page: "dashboard", href: "/", icon: LayoutDashboard },
  { page: "workflow", href: "/workflow", icon: Workflow },
  { page: "logs", href: "/logs", icon: FileClock },
  { page: "integrations", href: "/integrations", icon: Network }
] as const;

const baseAgents: Agent[] = [
  {
    id: "sales",
    name: "Revenue Agent",
    mission: "Lead scoring, account research, proposal generation",
    status: "live",
    score: 94,
    icon: Rocket
  },
  {
    id: "support",
    name: "Support Copilot",
    mission: "Ticket triage, SLA routing, answer drafting",
    status: "review",
    score: 88,
    icon: MessageSquare
  },
  {
    id: "research",
    name: "Research Analyst",
    mission: "Market scans, citation summaries, signal detection",
    status: "queued",
    score: 91,
    icon: BrainCircuit
  },
  {
    id: "ops",
    name: "Ops Automator",
    mission: "Back-office workflows, approvals, data sync",
    status: "paused",
    score: 79,
    icon: Settings2
  }
];

const initialNodes: NodeItem[] = [
  { id: "trigger", title: "Webhook Trigger", type: "Inbound", x: 4, y: 1, state: "done" },
  { id: "classify", title: "Intent Classifier", type: "AI", x: 32, y: 12, state: "done" },
  { id: "tools", title: "Tool Router", type: "API", x: 60, y: 3, state: "running" },
  { id: "review", title: "Human Review", type: "Approval", x: 78, y: 44, state: "ready" }
];

const initialLogs: LogItem[] = [
  {
    id: "run_4821",
    source: "OpenAI Responses API",
    message: "Generated enrichment summary for enterprise lead",
    status: "success",
    time: "18:42:11"
  },
  {
    id: "run_4820",
    source: "Slack Bot",
    message: "Posted approval request to #sales-ops",
    status: "running",
    time: "18:39:08"
  },
  {
    id: "run_4819",
    source: "Airtable",
    message: "Retry scheduled after rate limit warning",
    status: "warning",
    time: "18:35:44"
  },
  {
    id: "run_4818",
    source: "Notion",
    message: "Created research brief and linked sources",
    status: "success",
    time: "18:32:19"
  }
];

const initialIntegrations: Integration[] = [
  {
    id: "openai",
    name: "OpenAI",
    description: "Responses API, agent reasoning, function tools",
    connected: true,
    icon: Sparkles
  },
  {
    id: "airtable",
    name: "Airtable",
    description: "CRM records, task tables, approval queues",
    connected: true,
    icon: Database
  },
  {
    id: "slack",
    name: "Slack",
    description: "Alerts, approval messages, team commands",
    connected: false,
    icon: MessageSquare
  },
  {
    id: "notion",
    name: "Notion",
    description: "Knowledge base, SOP pages, research docs",
    connected: true,
    icon: ClipboardList
  }
];

const statusTone: Record<Status, string> = {
  live: "bg-lime-300/14 text-lime-100 ring-lime-300/25",
  review: "bg-amber-300/14 text-amber-100 ring-amber-300/25",
  paused: "bg-zinc-400/12 text-zinc-200 ring-zinc-300/20",
  queued: "bg-rose-300/14 text-rose-100 ring-rose-300/25"
};

function Shell({
  page,
  children,
  locale,
  setLocale,
  toast,
  action
}: {
  page: PageKey;
  children: React.ReactNode;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toast: string;
  action: (label: string) => void;
}) {
  const t = copy[locale];
  return (
    <main className="min-h-screen bg-[#0b0b09] text-stone-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(190,242,100,0.13),transparent_30rem),radial-gradient(circle_at_88%_18%,rgba(251,191,36,0.10),transparent_24rem),linear-gradient(145deg,#0b0b09_0%,#15130e_48%,#10110d_100%)]" />
      <div className="mx-auto grid max-w-7xl gap-4 px-3 py-3 lg:grid-cols-[252px_minmax(0,1fr)] lg:p-5">
        <aside className="rounded-lg border border-stone-700/60 bg-[#11100d]/88 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime-300 text-black">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">{t.brand}</p>
              <p className="text-xs text-stone-400">{t.subtitle}</p>
            </div>
          </div>

          <nav className="mt-8 grid gap-2">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = item.page === page;
              return (
                <Link
                  key={item.page}
                  href={item.href}
                  className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition ${
                    active
                      ? "bg-lime-300 text-black"
                      : "text-stone-300 hover:bg-stone-800/70 hover:text-white"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{t.nav[item.page]}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              );
            })}
          </nav>

          <div className="mt-7 rounded-lg border border-amber-300/20 bg-amber-300/8 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-amber-200/80">
              Language
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                ["hant", "繁"],
                ["hans", "简"],
                ["en", "EN"]
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setLocale(value as Locale);
                    action(label);
                  }}
                  className={`rounded-md px-2 py-2 text-xs font-semibold transition ${
                    locale === value
                      ? "bg-amber-300 text-black"
                      : "bg-black/25 text-stone-300 ring-1 ring-stone-700 hover:bg-stone-800"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="grid gap-4">
          <header className="rounded-lg border border-stone-700/60 bg-[#11100d]/82 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-lime-300/10 px-3 py-1 text-xs text-lime-100">
                  <Activity className="h-3.5 w-3.5" />
                  AI Agent Control Plane
                </div>
                <h1 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
                  {page === "dashboard" && t.dashboardTitle}
                  {page === "workflow" && t.workflowTitle}
                  {page === "logs" && t.logsTitle}
                  {page === "integrations" && t.integrationsTitle}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-400 sm:text-base">
                  {page === "dashboard" && t.dashboardDesc}
                  {page === "workflow" && t.workflowDesc}
                  {page === "logs" && t.logsDesc}
                  {page === "integrations" && t.integrationsDesc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => action(t.runCheck)}
                  className="inline-flex items-center gap-2 rounded-lg border border-stone-700 bg-stone-900 px-3 py-2 text-sm text-stone-100 hover:border-lime-300/45"
                >
                  <ShieldCheck className="h-4 w-4 text-lime-200" />
                  {t.runCheck}
                </button>
                <button
                  type="button"
                  onClick={() => action(t.createAgent)}
                  className="inline-flex items-center gap-2 rounded-lg bg-lime-300 px-3 py-2 text-sm font-semibold text-black hover:bg-lime-200"
                >
                  <Plus className="h-4 w-4" />
                  {t.createAgent}
                </button>
              </div>
            </div>
          </header>

          {children}

          <div className="min-h-9">
            {toast ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-lime-300/10 px-3 py-2 text-sm text-lime-100">
                <Check className="h-4 w-4" />
                {toast}
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
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
      className={`rounded-lg border border-stone-700/60 bg-[#14130f]/84 shadow-[0_20px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}

function StatusBadge({ status, locale }: { status: Status; locale: Locale }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${statusTone[status]}`}>
      {copy[locale][status]}
    </span>
  );
}

export function AgentWorkspace({ page }: { page: PageKey }) {
  const [locale, setLocale] = useState<Locale>("hant");
  const [toast, setToast] = useState("");
  const [agents, setAgents] = useState(baseAgents);
  const [period, setPeriod] = useState<"today" | "week" | "month">("week");
  const [nodes, setNodes] = useState(initialNodes);
  const [selectedNode, setSelectedNode] = useState("tools");
  const [trigger, setTrigger] = useState("Webhook");
  const [logs, setLogs] = useState(initialLogs);
  const [query, setQuery] = useState("");
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const t = copy[locale];

  function action(label: string) {
    setToast(`${t.toastPrefix}: ${label}`);
    window.setTimeout(() => setToast(""), 1800);
  }

  const filteredLogs = useMemo(
    () =>
      logs.filter((log) =>
        `${log.source} ${log.message} ${log.status}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [logs, query]
  );

  return (
    <Shell
      page={page}
      locale={locale}
      setLocale={setLocale}
      toast={toast}
      action={action}
    >
      {page === "dashboard" ? (
        <Dashboard
          agents={agents}
          setAgents={setAgents}
          locale={locale}
          period={period}
          setPeriod={setPeriod}
          action={action}
        />
      ) : null}

      {page === "workflow" ? (
        <WorkflowBuilder
          nodes={nodes}
          setNodes={setNodes}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
          trigger={trigger}
          setTrigger={setTrigger}
          locale={locale}
          action={action}
        />
      ) : null}

      {page === "logs" ? (
        <LogsPage
          logs={filteredLogs}
          rawLogs={logs}
          setLogs={setLogs}
          query={query}
          setQuery={setQuery}
          locale={locale}
          action={action}
        />
      ) : null}

      {page === "integrations" ? (
        <IntegrationsPage
          integrations={integrations}
          setIntegrations={setIntegrations}
          locale={locale}
          action={action}
        />
      ) : null}
    </Shell>
  );
}

function Dashboard({
  agents,
  setAgents,
  locale,
  period,
  setPeriod,
  action
}: {
  agents: Agent[];
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>;
  locale: Locale;
  period: "today" | "week" | "month";
  setPeriod: (period: "today" | "week" | "month") => void;
  action: (label: string) => void;
}) {
  const t = copy[locale];
  const metrics = [
    { label: t.activeAgents, value: agents.filter((agent) => agent.status === "live").length, icon: Bot },
    { label: t.completedRuns, value: period === "today" ? 128 : period === "week" ? 842 : 3168, icon: ListChecks },
    { label: t.apiCalls, value: period === "today" ? "9.4K" : period === "week" ? "68K" : "241K", icon: Code2 },
    { label: t.savings, value: period === "today" ? "34h" : period === "week" ? "188h" : "721h", icon: Zap }
  ];

  return (
    <>
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Panel key={metric.label} className="p-4">
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-lime-200" />
                <span className="rounded-full bg-amber-300/10 px-2 py-1 text-xs text-amber-100">
                  +12.8%
                </span>
              </div>
              <p className="mt-5 text-sm text-stone-400">{metric.label}</p>
              <p className="mt-1 text-3xl font-semibold text-white">{metric.value}</p>
            </Panel>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-stone-400">{t.agentOps}</p>
              <h2 className="text-xl font-semibold text-white">Autonomous Workforce</h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setAgents((items) => [
                  ...items,
                  {
                    id: `agent-${items.length + 1}`,
                    name: `Custom Agent ${items.length + 1}`,
                    mission: "New automation specialist with approval guardrails",
                    status: "queued",
                    score: 76,
                    icon: CloudLightning
                  }
                ]);
                action(t.createAgent);
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-lime-300 px-3 py-2 text-sm font-semibold text-black"
            >
              <Plus className="h-4 w-4" />
              {t.createAgent}
            </button>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {agents.map((agent) => {
              const Icon = agent.icon;
              return (
                <article key={agent.id} className="rounded-lg border border-stone-700/65 bg-black/18 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-stone-900 p-2 text-lime-200 ring-1 ring-lime-300/20">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{agent.name}</h3>
                        <StatusBadge status={agent.status} locale={locale} />
                      </div>
                    </div>
                    <span className="font-mono text-sm text-lime-200">{agent.score}%</span>
                  </div>
                  <p className="mt-4 min-h-12 text-sm leading-6 text-stone-400">{agent.mission}</p>
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setAgents((items) =>
                          items.map((item) =>
                            item.id === agent.id ? { ...item, status: "live", score: Math.min(99, item.score + 3) } : item
                          )
                        );
                        action(`${t.deploy} ${agent.name}`);
                      }}
                      className="flex flex-1 items-center justify-center gap-2 rounded-md bg-lime-300 px-3 py-2 text-xs font-semibold text-black"
                    >
                      <Play className="h-3.5 w-3.5" />
                      {t.deploy}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAgents((items) =>
                          items.map((item) =>
                            item.id === agent.id ? { ...item, status: "paused" } : item
                          )
                        );
                        action(`${t.pause} ${agent.name}`);
                      }}
                      className="flex flex-1 items-center justify-center gap-2 rounded-md border border-stone-700 px-3 py-2 text-xs text-stone-200"
                    >
                      <Circle className="h-3.5 w-3.5" />
                      {t.pause}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </Panel>

        <Panel className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-stone-400">{t.analytics}</p>
              <h2 className="text-xl font-semibold text-white">{t.workflowStatus}</h2>
            </div>
            <div className="flex rounded-lg border border-stone-700 bg-black/20 p-1">
              {(["today", "week", "month"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setPeriod(item);
                    action(t[item]);
                  }}
                  className={`rounded-md px-3 py-1.5 text-xs ${
                    period === item ? "bg-amber-300 text-black" : "text-stone-300"
                  }`}
                >
                  {t[item]}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 space-y-5">
            {[
              [t.conversion, 86],
              [t.latency, 42],
              [t.accuracy, 94]
            ].map(([label, value]) => (
              <div key={label}>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-300">{label}</span>
                  <span className="text-lime-200">{value}%</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-stone-900">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-lime-300 via-amber-300 to-rose-300"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => action(t.optimize)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-lime-300/35 bg-lime-300/10 px-4 py-3 text-sm font-semibold text-lime-100"
          >
            <Shuffle className="h-4 w-4" />
            {t.optimize}
          </button>
        </Panel>
      </section>
    </>
  );
}

function WorkflowBuilder({
  nodes,
  setNodes,
  selectedNode,
  setSelectedNode,
  trigger,
  setTrigger,
  locale,
  action
}: {
  nodes: NodeItem[];
  setNodes: React.Dispatch<React.SetStateAction<NodeItem[]>>;
  selectedNode: string;
  setSelectedNode: (id: string) => void;
  trigger: string;
  setTrigger: (trigger: string) => void;
  locale: Locale;
  action: (label: string) => void;
}) {
  const t = copy[locale];
  const selected = nodes.find((node) => node.id === selectedNode) ?? nodes[0];
  const triggers = ["Webhook", "Schedule", "Manual"];

  function moveNode(deltaX: number, deltaY: number) {
    setNodes((items) =>
      items.map((node) =>
        node.id === selectedNode
          ? {
              ...node,
              x: Math.max(0, Math.min(84, node.x + deltaX)),
              y: Math.max(0, Math.min(62, node.y + deltaY))
            }
          : node
      )
    );
    action(t.move);
  }

  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
      <Panel className="min-h-[620px] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-stone-400">{t.trigger}: {trigger}</p>
            <h2 className="text-xl font-semibold text-white">Lead Enrichment Automation</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                const next = {
                  id: `node-${nodes.length + 1}`,
                  title: `Agent Step ${nodes.length + 1}`,
                  type: "Action",
                  x: 18 + nodes.length * 9,
                  y: 52,
                  state: "ready" as const
                };
                setNodes((items) => [...items, next]);
                setSelectedNode(next.id);
                action(t.addNode);
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-lime-300 px-3 py-2 text-sm font-semibold text-black"
            >
              <Plus className="h-4 w-4" />
              {t.addNode}
            </button>
            <button
              type="button"
              onClick={() => {
                setNodes((items) =>
                  items.map((node, index) => ({ ...node, x: 4 + index * 23, y: index % 2 ? 34 : 8 }))
                );
                action(t.autoArrange);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-stone-700 px-3 py-2 text-sm text-stone-200"
            >
              <Shuffle className="h-4 w-4" />
              {t.autoArrange}
            </button>
          </div>
        </div>

        <div className="relative mt-5 h-[500px] overflow-hidden rounded-lg border border-stone-700 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:32px_32px]">
          <div className="absolute left-[9%] right-[12%] top-[33%] h-1 rounded-full bg-gradient-to-r from-lime-300 via-amber-300 to-rose-300" />
          {nodes.map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={() => {
                setSelectedNode(node.id);
                action(node.title);
              }}
              className={`absolute w-44 rounded-lg border p-3 text-left transition ${
                selectedNode === node.id
                  ? "border-lime-300 bg-lime-300 text-black shadow-[0_0_35px_rgba(190,242,100,0.22)]"
                  : "border-stone-700 bg-[#15130f] text-stone-100 hover:border-amber-300/50"
              }`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <span className="flex items-center gap-2 text-xs font-semibold">
                {node.type === "Inbound" ? <Webhook className="h-4 w-4" /> : null}
                {node.type === "AI" ? <BrainCircuit className="h-4 w-4" /> : null}
                {node.type === "API" ? <Code2 className="h-4 w-4" /> : null}
                {node.type === "Approval" ? <ShieldCheck className="h-4 w-4" /> : null}
                {node.type === "Action" ? <MousePointer2 className="h-4 w-4" /> : null}
                {node.type}
              </span>
              <span className="mt-2 block text-sm font-semibold">{node.title}</span>
              <span className="mt-2 block text-xs opacity-70">{node.state}</span>
            </button>
          ))}
        </div>
      </Panel>

      <Panel className="p-4">
        <h2 className="text-lg font-semibold text-white">{t.selectedNode}</h2>
        <div className="mt-4 rounded-lg border border-stone-700 bg-black/20 p-3">
          <p className="text-sm font-semibold text-lime-100">{selected.title}</p>
          <p className="mt-1 text-xs text-stone-400">{selected.type} / {selected.state}</p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {triggers.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setTrigger(item);
                action(item);
              }}
              className={`rounded-md px-2 py-2 text-xs ${
                trigger === item ? "bg-amber-300 text-black" : "bg-stone-900 text-stone-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" onClick={() => moveNode(-5, 0)} className="rounded-md border border-stone-700 py-2 text-sm">
            ←
          </button>
          <button type="button" onClick={() => moveNode(5, 0)} className="rounded-md border border-stone-700 py-2 text-sm">
            →
          </button>
          <button type="button" onClick={() => moveNode(0, -5)} className="rounded-md border border-stone-700 py-2 text-sm">
            ↑
          </button>
          <button type="button" onClick={() => moveNode(0, 5)} className="rounded-md border border-stone-700 py-2 text-sm">
            ↓
          </button>
        </div>
        <div className="mt-4 grid gap-2">
          <button
            type="button"
            onClick={() => {
              setNodes((items) =>
                items.map((node) => ({
                  ...node,
                  state: node.id === selectedNode ? "done" : node.state
                }))
              );
              action(t.runSimulation);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-lime-300 px-3 py-2 text-sm font-semibold text-black"
          >
            <Play className="h-4 w-4" />
            {t.runSimulation}
          </button>
          <button
            type="button"
            onClick={() => action(t.saveDraft)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-700 px-3 py-2 text-sm text-stone-200"
          >
            <Save className="h-4 w-4" />
            {t.saveDraft}
          </button>
          <button
            type="button"
            onClick={() => {
              const clone = { ...selected, id: `${selected.id}-copy-${nodes.length}`, title: `${selected.title} Copy`, x: selected.x + 7, y: selected.y + 7 };
              setNodes((items) => [...items, clone]);
              setSelectedNode(clone.id);
              action(t.duplicate);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-700 px-3 py-2 text-sm text-stone-200"
          >
            <GitBranch className="h-4 w-4" />
            {t.duplicate}
          </button>
        </div>
      </Panel>
    </section>
  );
}

function LogsPage({
  logs,
  rawLogs,
  setLogs,
  query,
  setQuery,
  locale,
  action
}: {
  logs: LogItem[];
  rawLogs: LogItem[];
  setLogs: React.Dispatch<React.SetStateAction<LogItem[]>>;
  query: string;
  setQuery: (query: string) => void;
  locale: Locale;
  action: (label: string) => void;
}) {
  const t = copy[locale];
  return (
    <Panel className="p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-stone-400">{t.apiActivity}</p>
          <h2 className="text-xl font-semibold text-white">Live Automation Stream</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <label className="flex min-w-[240px] items-center gap-2 rounded-lg border border-stone-700 bg-black/20 px-3 py-2 text-sm text-stone-300">
            <Search className="h-4 w-4" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.searchLogs}
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-stone-500"
            />
          </label>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              action(t.clearFilters);
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-stone-700 px-3 py-2 text-sm"
          >
            <Filter className="h-4 w-4" />
            {t.clearFilters}
          </button>
          <button
            type="button"
            onClick={() => action(t.export)}
            className="inline-flex items-center gap-2 rounded-lg bg-amber-300 px-3 py-2 text-sm font-semibold text-black"
          >
            <Terminal className="h-4 w-4" />
            {t.export}
          </button>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-stone-700">
        {logs.map((log) => (
          <div
            key={log.id}
            className="grid gap-3 border-b border-stone-800 bg-black/14 p-4 last:border-b-0 lg:grid-cols-[120px_180px_minmax(0,1fr)_220px]"
          >
            <span className="font-mono text-xs text-stone-400">{log.time}</span>
            <span className="text-sm font-semibold text-white">{log.source}</span>
            <span className="text-sm text-stone-300">{log.message}</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setLogs((items) => [
                    {
                      ...log,
                      id: `${log.id}_replay_${items.length}`,
                      time: "now",
                      status: "running"
                    },
                    ...items
                  ]);
                  action(`${t.replay} ${log.id}`);
                }}
                className="rounded-md bg-lime-300 px-3 py-1.5 text-xs font-semibold text-black"
              >
                {t.replay}
              </button>
              <button
                type="button"
                onClick={() => {
                  setLogs((items) =>
                    items.map((item) =>
                      item.id === log.id ? { ...item, status: "success" } : item
                    )
                  );
                  action(`${t.resolve} ${log.id}`);
                }}
                className="rounded-md border border-stone-700 px-3 py-1.5 text-xs text-stone-200"
              >
                {t.resolve}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {[
          ["Success", rawLogs.filter((log) => log.status === "success").length],
          ["Running", rawLogs.filter((log) => log.status === "running").length],
          ["Warnings", rawLogs.filter((log) => log.status === "warning").length]
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-stone-700 bg-black/18 p-4">
            <p className="text-sm text-stone-400">{label}</p>
            <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function IntegrationsPage({
  integrations,
  setIntegrations,
  locale,
  action
}: {
  integrations: Integration[];
  setIntegrations: React.Dispatch<React.SetStateAction<Integration[]>>;
  locale: Locale;
  action: (label: string) => void;
}) {
  const t = copy[locale];
  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
      <Panel className="p-4">
        <div className="grid gap-3 md:grid-cols-2">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <article key={integration.id} className="rounded-lg border border-stone-700 bg-black/16 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-lime-300/12 p-2 text-lime-200 ring-1 ring-lime-300/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-white">{integration.name}</h2>
                      <p className="text-xs text-stone-400">
                        {integration.connected ? "Connected" : "Disconnected"}
                      </p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs ${integration.connected ? "bg-lime-300/12 text-lime-100" : "bg-stone-800 text-stone-300"}`}>
                    {integration.connected ? "Live" : "Off"}
                  </span>
                </div>
                <p className="mt-4 min-h-12 text-sm leading-6 text-stone-400">{integration.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIntegrations((items) =>
                        items.map((item) =>
                          item.id === integration.id
                            ? { ...item, connected: !item.connected }
                            : item
                        )
                      );
                      action(`${integration.connected ? t.disconnect : t.connect} ${integration.name}`);
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-lime-300 px-3 py-2 text-xs font-semibold text-black"
                  >
                    {integration.connected ? <Unplug className="h-3.5 w-3.5" /> : <Globe2 className="h-3.5 w-3.5" />}
                    {integration.connected ? t.disconnect : t.connect}
                  </button>
                  <button
                    type="button"
                    onClick={() => action(`${t.test} ${integration.name}`)}
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-stone-700 px-3 py-2 text-xs text-stone-200"
                  >
                    <RefreshCcw className="h-3.5 w-3.5" />
                    {t.test}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </Panel>

      <Panel className="p-4">
        <h2 className="text-lg font-semibold text-white">Integration Controls</h2>
        <div className="mt-4 grid gap-2">
          <button
            type="button"
            onClick={() => action(t.sync)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-300 px-3 py-2 text-sm font-semibold text-black"
          >
            <RotateCcw className="h-4 w-4" />
            {t.sync}
          </button>
          <button
            type="button"
            onClick={() => action(t.rotate)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-700 px-3 py-2 text-sm text-stone-200"
          >
            <KeyRound className="h-4 w-4" />
            {t.rotate}
          </button>
          <button
            type="button"
            onClick={() => action(t.status)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-700 px-3 py-2 text-sm text-stone-200"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {t.status}
          </button>
        </div>
        <div className="mt-5 rounded-lg border border-stone-700 bg-black/20 p-4">
          <p className="font-mono text-xs leading-6 text-lime-100">
            OPENAI_STATUS=connected<br />
            AIRTABLE_SYNC=ready<br />
            SLACK_EVENTS=standby<br />
            NOTION_INDEX=fresh
          </p>
        </div>
      </Panel>
    </section>
  );
}
