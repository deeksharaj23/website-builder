import { useMeta } from '@/hooks/useMeta'
import { webPageSchema, SITE_URL } from '@/seo'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import BuilderNavbar from '@/components/builder/BuilderNavbar'
import ChatPanel from '@/components/builder/ChatPanel'
import PreviewPanel from '@/components/builder/PreviewPanel'

const GENERATION_MESSAGES = [
  'Understanding your request…',
  'Creating page structure…',
  'Designing hero section…',
  'Adding content sections…',
  'Finalizing layout…',
]

const INTAKE_STEPS = [
  {
    key: 'idea',
    label: 'Idea',
    question: 'What’s the idea for the website?',
    suggestions: [
      'A landing page for a yoga studio',
      'A portfolio for a product designer',
      'A waitlist page for an upcoming app',
    ],
  },
  {
    key: 'goals',
    label: 'Goals',
    question: 'What are the main goals for this site? (e.g. get leads, sell, book calls)',
    suggestions: ['Collect leads', 'Sell products', 'Book calls / demos'],
  },
  {
    key: 'audience',
    label: 'Audience',
    question: 'Who is the target audience?',
    suggestions: ['Busy professionals', 'Small business owners', 'Students / beginners'],
  },
  {
    key: 'designTheme',
    label: 'Design theme',
    question: 'What design theme should we use? (tone, colors, vibe)',
    suggestions: ['Minimal & modern', 'Bold & playful', 'Elegant & premium'],
  },
]

export default function BuilderPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const promptFromUrl = useMemo(() => (searchParams.get('prompt') || '').trim(), [searchParams])
  const initializedRef = useRef(false)
  const generationRunRef = useRef(0)
  const basePromptRef = useRef('')
  const lastNonChatOnlyViewRef = useRef('preview')

  const [messages, setMessages] = useState([])
  const [basePrompt, setBasePrompt] = useState('')
  const [inputDraft, setInputDraft] = useState('')
  const [intake, setIntake] = useState(() => ({
    stepIndex: 0,
    values: {},
    pending: null, // { key, value }
    done: false,
    started: false,
  }))
  // When arriving without an initial prompt, the builder should be immediately usable.
  const [phase, setPhase] = useState('completed') // planning | generating | completed
  const [generationStep, setGenerationStep] = useState(0)
  const [previewHtml, setPreviewHtml] = useState('')
  const [activeView, setActiveView] = useState('preview') // preview | code | split
  // Default to the chat experience when opening the builder.
  const [isChatOnly, setIsChatOnly] = useState(true)
  const [projectName, setProjectName] = useState('Untitled project')
  const [isPublishing, setIsPublishing] = useState(false)

  const entryMode = useMemo(() => {
    if (promptFromUrl) return 'prompt'
    const source = location.state?.source
    if (source === 'signup') return 'signup'
    return 'direct'
  }, [promptFromUrl, location.state])

  useMeta({
    title:       'Builder | Orqis',
    description: 'Describe your idea, generate instantly, refine with ease, and launch, all in one seamless flow.',
    jsonLd:      webPageSchema({
      title:       'Builder | Orqis',
      description: 'Describe your idea, generate instantly, refine with ease, and launch, all in one seamless flow.',
      url:         `${SITE_URL}/builder`,
    }),
  })

  useEffect(() => {
    basePromptRef.current = basePrompt
  }, [basePrompt])

  useEffect(() => {
    if (isChatOnly) return
    lastNonChatOnlyViewRef.current = activeView
  }, [activeView, isChatOnly])

  function handleChatOnlyChange(next) {
    setIsChatOnly(Boolean(next))
    if (!next) {
      setActiveView(lastNonChatOnlyViewRef.current || 'preview')
    }
  }

  const startGeneration = useCallback(async ({ userPrompt, replaceThread, appendUserMessage = true }) => {
    const runId = ++generationRunRef.current
    const nextBasePrompt = replaceThread ? userPrompt : (basePromptRef.current || promptFromUrl || userPrompt)

    setBasePrompt(nextBasePrompt)
    setInputDraft('')
    setPhase('planning')
    setGenerationStep(0)
    setPreviewHtml(getPreviewHtmlForStep({ step: 0, basePrompt: nextBasePrompt }))

    if (appendUserMessage) {
      const now = Date.now()
      const firstUserMessage = { id: crypto.randomUUID(), role: 'user', content: userPrompt, createdAt: now }
      setMessages((prev) => (replaceThread ? [firstUserMessage] : [...prev, firstUserMessage]))
    } else if (replaceThread) {
      setMessages([])
    }

    // Small pause so it feels like it "starts working" instantly after submit.
    await sleep(250)
    if (generationRunRef.current !== runId) return

    setPhase('generating')

    for (let i = 0; i < GENERATION_MESSAGES.length; i++) {
      if (generationRunRef.current !== runId) return

      const step = i + 1
      setGenerationStep(step)
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'ai', content: GENERATION_MESSAGES[i], createdAt: Date.now() },
      ])
      setPreviewHtml(getPreviewHtmlForStep({ step, basePrompt: nextBasePrompt }))

      await sleep(650)
    }

    if (generationRunRef.current !== runId) return

    setGenerationStep(GENERATION_MESSAGES.length + 1)
    setPreviewHtml(getPreviewHtmlForStep({ step: GENERATION_MESSAGES.length + 1, basePrompt: nextBasePrompt }))
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: 'ai', content: 'Completed. What should we tweak next?', createdAt: Date.now() },
    ])
    setPhase('completed')
  }, [promptFromUrl])

  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    if (!promptFromUrl) return

    startGeneration({ userPrompt: promptFromUrl, replaceThread: true })
  }, [promptFromUrl, startGeneration])

  function pushMessage(message) {
    setMessages((prev) => [...prev, message])
  }

  function compilePrompt(values) {
    const idea = (values.idea || '').trim()
    const goals = (values.goals || '').trim()
    const audience = (values.audience || '').trim()
    const designTheme = (values.designTheme || '').trim()

    return [
      `Idea: ${idea}`,
      `Goals: ${goals}`,
      `Audience: ${audience}`,
      `Design theme: ${designTheme}`,
    ].join('\n')
  }

  async function finishIntakeAndGenerate(values) {
    setIntake((prev) => ({ ...prev, done: true, pending: null }))
    pushMessage({
      id: crypto.randomUUID(),
      role: 'ai',
      content: 'Perfect — generating your first draft now…',
      createdAt: Date.now(),
    })
    const prompt = compilePrompt(values)
    startGeneration({ userPrompt: prompt, replaceThread: false, appendUserMessage: false })
  }

  function askNextStep(nextIndex) {
    const step = INTAKE_STEPS[nextIndex]
    if (!step) return
    pushMessage({
      id: crypto.randomUUID(),
      role: 'ai',
      content: `${step.label}: ${step.question}`,
      createdAt: Date.now(),
    })
  }

  function handleSend(text) {
    const content = text.trim()
    if (!content) return

    // If intake is complete, use the normal generation flow.
    if (intake.done || promptFromUrl) {
      startGeneration({ userPrompt: content, replaceThread: false })
      return
    }

    const step = INTAKE_STEPS[intake.stepIndex]
    if (!step) {
      startGeneration({ userPrompt: content, replaceThread: false })
      return
    }

    // Always add the user's message.
    pushMessage({ id: crypto.randomUUID(), role: 'user', content, createdAt: Date.now() })

    // Accept the value immediately and move to next step.
    const nextValues = { ...intake.values, [step.key]: content }
    const nextIndex = intake.stepIndex + 1
    setIntake((prev) => ({ ...prev, started: true, values: nextValues, stepIndex: nextIndex, pending: null }))

    if (nextIndex >= INTAKE_STEPS.length) finishIntakeAndGenerate(nextValues)
    else askNextStep(nextIndex)
  }

  function handleMessageAction({ messageId, actionId, payload }) {
    if (actionId?.startsWith('reply:')) {
      const nextText = payload?.text || actionId.slice('reply:'.length)
      handleSend(nextText)
      return
    }
  }

  function handleBack() {
    if (window.history.length > 1) navigate(-1)
    else navigate('/')
  }

  function handleRefresh() {
    // Restart chat from scratch (and cancel any in-flight generation).
    generationRunRef.current += 1
    setMessages([])
    setBasePrompt('')
    setInputDraft('')
    setPhase('completed')
    setGenerationStep(0)
    setPreviewHtml(getSkeletonHtml())
    setIntake({ stepIndex: 0, values: {}, pending: null, done: false, started: false })
  }

  const intakePromptPills = useMemo(() => {
    if (promptFromUrl) return []
    if (intake.done) return []
    // Keep the initial empty-chat example prompt strip unchanged.
    if (!intake.started) return []
    const step = INTAKE_STEPS[intake.stepIndex]
    return step?.suggestions || []
  }, [intake.done, intake.started, intake.stepIndex, promptFromUrl])

  function handleOpenInNewTab() {
    const html = previewHtml || ''
    if (!html.trim()) return
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank', 'noopener,noreferrer')
    window.setTimeout(() => URL.revokeObjectURL(url), 30_000)
  }

  async function handleShare() {
    const prompt = (basePromptRef.current || promptFromUrl || '').trim()
    if (!prompt) return { ok: false }

    const url = new URL('/builder', window.location.origin)
    url.searchParams.set('prompt', prompt)
    url.searchParams.set('project', projectName || 'Untitled project')

    try {
      await navigator.clipboard.writeText(url.toString())
      return { ok: true }
    } catch {
      return { ok: false }
    }
  }

  async function handlePublish() {
    if (isPublishing) return { ok: false }
    setIsPublishing(true)
    try {
      await sleep(900)
      return { ok: true }
    } catch {
      return { ok: false }
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <BuilderNavbar
        activeView={activeView}
        onActiveViewChange={setActiveView}
        isChatOnly={isChatOnly}
        onChatOnlyChange={handleChatOnlyChange}
        onBack={handleBack}
        projectName={projectName}
        onProjectRename={setProjectName}
        canChangeProject={false}
        onRefresh={handleRefresh}
        onOpenInNewTab={handleOpenInNewTab}
        onShare={handleShare}
        onPublish={handlePublish}
        isBusy={phase !== 'completed' || isPublishing}
      />

      <div className="flex min-h-0 flex-1">
        {isChatOnly && (
          <div
            className="hidden flex-1 border-r border-[hsl(var(--border))] md:block"
            aria-hidden="true"
          />
        )}

        <div
          className={[
            isChatOnly
              ? 'w-full md:w-1/2'
              : 'w-1/4 min-w-[320px] border-r border-[hsl(var(--border))]',
          ].join(' ')}
        >
          <div className="h-full">
            <ChatPanel
              messages={messages}
              inputValue={inputDraft}
              onInputChange={setInputDraft}
              onSend={handleSend}
              promptPills={intakePromptPills}
              onPromptPillSelect={(text) => handleSend(text)}
              onMessageAction={handleMessageAction}
              phase={phase}
              entryMode={entryMode}
            />
          </div>
        </div>

        {isChatOnly && (
          <div
            className="hidden flex-1 border-l border-[hsl(var(--border))] md:block"
            aria-hidden="true"
          />
        )}
        {!isChatOnly && (
        <div className="w-3/4">
          <PreviewPanel
            html={previewHtml}
            generationStep={generationStep}
            phase={phase}
          />
        </div>
        )}
      </div>
    </div>
  )
}

function getPreviewHtmlForStep({ step, basePrompt }) {
  if (step <= 0) return getSkeletonHtml()
  if (step === 1) return getBasicLayoutHtml(basePrompt)
  if (step === 2) return getHeroHtml(basePrompt)
  if (step === 3) return getSectionsHtml(basePrompt)
  if (step === 4) return getSectionsHtml(basePrompt)
  return getMockLandingPageHtml(basePrompt)
}

function getSkeletonHtml() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Preview</title>
    <style>
      body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; background: #fff; }
      .wrap { padding: 28px; max-width: 980px; margin: 0 auto; }
      .row { display: flex; gap: 10px; }
      .sk { background: #F1F1F1; border-radius: 12px; }
      .sk.h { height: 14px; }
      .sk.b { height: 44px; border-radius: 14px; }
      .sk.c { height: 110px; border-radius: 16px; }
      .mt { margin-top: 14px; }
      .w40 { width: 40%; } .w60 { width: 60%; } .w30 { width: 30%; } .w70 { width: 70%; } .w100 { width: 100%; }
      .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
      @media (max-width: 840px) { .grid { grid-template-columns: 1fr; } }
    </style>
  </head>
  <body>
    <main class="wrap">
      <div class="sk h w30"></div>
      <div class="sk mt b w70"></div>
      <div class="sk mt h w60"></div>
      <div class="sk mt h w40"></div>
      <div class="row mt">
        <div class="sk b w40"></div>
        <div class="sk b w40"></div>
      </div>
      <div class="grid mt">
        <div class="sk c"></div>
        <div class="sk c"></div>
        <div class="sk c"></div>
      </div>
    </main>
  </body>
</html>`
}

function getBasicLayoutHtml(prompt) {
  const safePrompt = escapeHtml(prompt)
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Preview</title>
    <style>
      body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; color: #111; background: #fff; }
      header { padding: 16px 28px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
      .brand { font-weight: 700; font-size: 14px; }
      .nav { display: flex; gap: 14px; font-size: 13px; color: #666; }
      .wrap { padding: 32px 28px; max-width: 980px; margin: 0 auto; }
      .hint { font-size: 12px; color: #666; background: #fafafa; border: 1px solid #eee; border-radius: 12px; padding: 10px 12px; }
      .block { margin-top: 14px; border: 1px solid #eee; border-radius: 16px; padding: 18px; background: #fff; }
      .sk { background: #F1F1F1; border-radius: 12px; height: 14px; }
      .row { display: flex; gap: 10px; margin-top: 12px; }
      .w30 { width: 30%; } .w40 { width: 40%; } .w60 { width: 60%; } .w70 { width: 70%; } .w100 { width: 100%; }
      .btnsk { height: 42px; border-radius: 14px; background: #F1F1F1; width: 160px; }
    </style>
  </head>
  <body>
    <header>
      <div class="brand">Draft</div>
      <nav class="nav"><span>Features</span><span>Pricing</span><span>FAQ</span></nav>
    </header>
    <main class="wrap">
      <div class="hint"><strong>Prompt:</strong> ${safePrompt}</div>
      <section class="block">
        <div class="sk w40"></div>
        <div class="sk w70" style="margin-top:10px;"></div>
        <div class="sk w60" style="margin-top:10px;"></div>
        <div class="row">
          <div class="btnsk"></div>
          <div class="btnsk"></div>
        </div>
      </section>
    </main>
  </body>
</html>`
}

function getHeroHtml(prompt) {
  const safePrompt = escapeHtml(prompt)
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Preview</title>
    <style>
      body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; color: #111; background: #fff; }
      header { padding: 16px 28px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
      .brand { font-weight: 700; font-size: 14px; }
      .nav { display: flex; gap: 14px; font-size: 13px; color: #666; }
      .wrap { padding: 44px 28px; max-width: 980px; margin: 0 auto; }
      .badge { display: inline-block; font-size: 12px; padding: 6px 10px; border: 1px solid #e6e6e6; border-radius: 999px; color: #444; background: #fafafa; }
      h1 { margin: 14px 0 10px; font-size: 44px; line-height: 1.05; letter-spacing: -0.02em; }
      p { margin: 0; font-size: 16px; line-height: 1.6; color: #555; max-width: 70ch; }
      .cta { margin-top: 22px; display: flex; gap: 10px; align-items: center; }
      .btn { display: inline-flex; align-items: center; justify-content: center; padding: 10px 14px; border-radius: 10px; border: 1px solid #111; background: #111; color: #fff; font-weight: 600; font-size: 14px; }
      .ghost { background: transparent; color: #111; }
      pre { margin-top: 18px; padding: 14px; border-radius: 12px; background: #f7f7f7; border: 1px solid #eee; overflow: auto; }
      @media (max-width: 840px) { .wrap { padding: 28px; } h1 { font-size: 34px; } }
    </style>
  </head>
  <body>
    <header>
      <div class="brand">Draft</div>
      <nav class="nav"><span>Features</span><span>Pricing</span><span>FAQ</span></nav>
    </header>
    <main class="wrap">
      <span class="badge">Building hero…</span>
      <h1>Your landing page draft</h1>
      <p>We’re shaping the top section first so it feels coherent quickly.</p>
      <div class="cta">
        <a class="btn" href="#" onclick="return false;">Get started</a>
        <a class="btn ghost" href="#" onclick="return false;">See pricing</a>
      </div>
      <pre><strong>Prompt:</strong>\n${safePrompt}</pre>
    </main>
  </body>
</html>`
}

function getSectionsHtml(prompt) {
  const safePrompt = escapeHtml(prompt)
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Preview</title>
    <style>
      body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; color: #111; background: #fff; }
      header { padding: 16px 28px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: #fff; }
      .brand { font-weight: 700; font-size: 14px; }
      .nav { display: flex; gap: 14px; font-size: 13px; color: #666; }
      .wrap { padding: 44px 28px; max-width: 980px; margin: 0 auto; }
      .badge { display: inline-block; font-size: 12px; padding: 6px 10px; border: 1px solid #e6e6e6; border-radius: 999px; color: #444; background: #fafafa; }
      h1 { margin: 14px 0 10px; font-size: 44px; line-height: 1.05; letter-spacing: -0.02em; }
      p { margin: 0; font-size: 16px; line-height: 1.6; color: #555; max-width: 70ch; }
      .cta { margin-top: 22px; display: flex; gap: 10px; align-items: center; }
      .btn { display: inline-flex; align-items: center; justify-content: center; padding: 10px 14px; border-radius: 10px; border: 1px solid #111; background: #111; color: #fff; font-weight: 600; font-size: 14px; }
      .ghost { background: transparent; color: #111; }
      .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-top: 28px; }
      .card { border: 1px solid #eee; border-radius: 14px; padding: 16px; background: #fff; }
      .card h3 { margin: 0 0 6px; font-size: 14px; color: #111; }
      .card span { font-size: 13px; color: #666; }
      .section { margin-top: 26px; padding-top: 26px; border-top: 1px solid #eee; }
      pre { margin-top: 18px; padding: 14px; border-radius: 12px; background: #f7f7f7; border: 1px solid #eee; overflow: auto; }
      @media (max-width: 840px) { .wrap { padding: 28px; } .grid { grid-template-columns: 1fr; } h1 { font-size: 34px; } }
    </style>
  </head>
  <body>
    <header>
      <div class="brand">Draft</div>
      <nav class="nav"><span>Features</span><span>Pricing</span><span>FAQ</span></nav>
    </header>
    <main class="wrap">
      <span class="badge">Adding sections…</span>
      <h1>Your landing page draft</h1>
      <p>Now filling in the core sections so the page reads end-to-end.</p>
      <div class="cta">
        <a class="btn" href="#" onclick="return false;">Get started</a>
        <a class="btn ghost" href="#" onclick="return false;">See pricing</a>
      </div>

      <div class="grid">
        <div class="card"><h3>Fast to launch</h3><span>From idea → page instantly.</span></div>
        <div class="card"><h3>Built to convert</h3><span>Clear hierarchy + CTAs.</span></div>
        <div class="card"><h3>Easy to refine</h3><span>Chat-driven edits (mock).</span></div>
      </div>

      <section class="section">
        <h2 style="margin:0 0 8px; font-size: 18px;">How it works</h2>
        <p>Describe what you want, we draft a layout, then you refine by chatting.</p>
      </section>

      <section class="section">
        <h2 style="margin:0 0 8px; font-size: 18px;">What you get</h2>
        <p>A clean, conversion-first starting point that you can iterate on quickly.</p>
        <pre><strong>Prompt:</strong>\n${safePrompt}</pre>
      </section>
    </main>
  </body>
</html>`
}

function getMockLandingPageHtml(prompt) {
  const safePrompt = escapeHtml(prompt)
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Preview</title>
    <style>
      :root { color-scheme: light; }
      body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; color: #111; background: #fff; }
      .wrap { padding: 48px; max-width: 980px; margin: 0 auto; }
      .badge { display: inline-block; font-size: 12px; padding: 6px 10px; border: 1px solid #e6e6e6; border-radius: 999px; color: #444; background: #fafafa; }
      h1 { margin: 14px 0 10px; font-size: 44px; line-height: 1.05; letter-spacing: -0.02em; }
      p { margin: 0; font-size: 16px; line-height: 1.6; color: #555; max-width: 70ch; }
      .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-top: 28px; }
      .card { border: 1px solid #eee; border-radius: 14px; padding: 16px; background: #fff; }
      .card h3 { margin: 0 0 6px; font-size: 14px; color: #111; }
      .card span { font-size: 13px; color: #666; }
      .cta { margin-top: 28px; display: flex; gap: 10px; align-items: center; }
      .btn { display: inline-flex; align-items: center; justify-content: center; padding: 10px 14px; border-radius: 10px; border: 1px solid #111; background: #111; color: #fff; font-weight: 600; font-size: 14px; }
      .ghost { background: transparent; color: #111; }
      @media (max-width: 840px) { .wrap { padding: 28px; } .grid { grid-template-columns: 1fr; } h1 { font-size: 34px; } }
      pre { margin-top: 18px; padding: 14px; border-radius: 12px; background: #f7f7f7; border: 1px solid #eee; overflow: auto; }
    </style>
  </head>
  <body>
    <main class="wrap">
      <span class="badge">Mock preview</span>
      <h1>Your landing page draft</h1>
      <p>This is a placeholder preview container. It updates when you chat (mocked).</p>
      <pre><strong>Prompt:</strong>\n${safePrompt}</pre>
      <div class="cta">
        <a class="btn" href="#" onclick="return false;">Get started</a>
        <a class="btn ghost" href="#" onclick="return false;">See pricing</a>
      </div>
      <div class="grid">
        <div class="card"><h3>Fast to launch</h3><span>From idea → page instantly.</span></div>
        <div class="card"><h3>Built to convert</h3><span>Clear hierarchy + CTAs.</span></div>
        <div class="card"><h3>Easy to refine</h3><span>Chat-driven edits (mock).</span></div>
      </div>
    </main>
  </body>
</html>`
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}
