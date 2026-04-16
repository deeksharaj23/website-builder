import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, ExternalLink, Maximize2, Minimize2, RefreshCcw, Settings } from 'lucide-react'

export default function BuilderNavbar({
  activeView,
  onActiveViewChange,
  isChatOnly = false,
  onChatOnlyChange,
  onBack,
  projectName,
  onProjectRename,
  canChangeProject = false,
  onRefresh,
  onOpenInNewTab,
  onShare,
  onPublish,
  isBusy = false,
}) {
  const [isRenaming, setIsRenaming] = useState(false)
  const [draftName, setDraftName] = useState(projectName || 'Untitled project')
  const inputRef = useRef(null)
  const [shareStatus, setShareStatus] = useState('')
  const [publishStatus, setPublishStatus] = useState('')
  const [settings, setSettings] = useState({
    showGuides: true,
    snapToGrid: false,
  })

  useEffect(() => {
    if (!isRenaming) return
    inputRef.current?.focus()
    inputRef.current?.select?.()
  }, [isRenaming])

  function beginRename() {
    setDraftName(projectName || 'Untitled project')
    setIsRenaming(true)
  }

  function cancelRename() {
    setDraftName(projectName || 'Untitled project')
    setIsRenaming(false)
  }

  function commitRename() {
    const next = (draftName || '').trim()
    if (!next) return cancelRename()
    onProjectRename?.(next)
    setIsRenaming(false)
  }

  async function handleShareClick() {
    setShareStatus('')
    const result = await onShare?.()
    if (result?.ok) {
      setShareStatus('Copied')
      window.setTimeout(() => setShareStatus(''), 1200)
    } else {
      setShareStatus('Copy failed')
      window.setTimeout(() => setShareStatus(''), 1500)
    }
  }

  async function handlePublishClick() {
    setPublishStatus('')
    const result = await onPublish?.()
    if (result?.ok) {
      setPublishStatus('Published')
      window.setTimeout(() => setPublishStatus(''), 1400)
    } else if (result?.ok === false) {
      setPublishStatus('Failed')
      window.setTimeout(() => setPublishStatus(''), 1400)
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]">
      <div className="flex h-12 items-center justify-between gap-3 px-4">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-2">
          {onBack && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onBack}
              aria-label="Orqis"
            >
              <img
                src="/logo-symbol.png"
                alt=""
                className="h-7 w-7 rounded-lg object-contain"
                aria-hidden="true"
              />
            </Button>
          )}
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-1">
              {isRenaming ? (
                <div className="min-w-[220px] max-w-[320px]">
                  <Input
                    ref={inputRef}
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') commitRename()
                      if (e.key === 'Escape') cancelRename()
                    }}
                    onBlur={commitRename}
                    className="h-8"
                    aria-label="Project name"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={beginRename}
                  className="min-w-0 truncate rounded-sm bg-[hsl(var(--accent))] px-2 py-1 text-left text-sm font-semibold text-[hsl(var(--accent-foreground))] hover:underline"
                  aria-label="Rename project"
                  title="Click to rename"
                >
                  {projectName || 'Untitled project'}
                </button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button type="button" variant="ghost" size="icon" aria-label="Project menu">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onSelect={(e) => { e.preventDefault(); beginRename() }}>
                    Rename…
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled={!canChangeProject}>
                    Change project…
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Center */}
        <div className="flex flex-1 justify-center">
          <div className="flex max-w-full items-center gap-2 overflow-x-auto">
            {!isChatOnly && (
              <>
                <Button
                  type="button"
                  variant={activeView === 'preview' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onActiveViewChange('preview')}
                >
                  Preview
                </Button>
                <Button
                  type="button"
                  variant={activeView === 'code' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onActiveViewChange('code')}
                >
                  Code
                </Button>
                <Button
                  type="button"
                  variant={activeView === 'split' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onActiveViewChange('split')}
                >
                  Split view
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 sm:flex">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onChatOnlyChange?.(!isChatOnly)}
              aria-label={isChatOnly ? 'Exit chat-only view' : 'Minimize to chat-only view'}
              title={isChatOnly ? 'Exit chat-only view' : 'Minimize to chat-only view'}
            >
              {isChatOnly ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Refresh"
              onClick={onRefresh}
              disabled={isBusy}
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
            {!isChatOnly && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Open in new tab"
                onClick={onOpenInNewTab}
                disabled={isBusy}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="ghost" size="icon" aria-label="Settings">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={settings.showGuides}
                  onCheckedChange={(checked) => setSettings((s) => ({ ...s, showGuides: Boolean(checked) }))}
                >
                  Show guides
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={settings.snapToGrid}
                  onCheckedChange={(checked) => setSettings((s) => ({ ...s, snapToGrid: Boolean(checked) }))}
                >
                  Snap to grid
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={handleShareClick} disabled={isBusy}>
              Share
            </Button>
            {!isChatOnly && (
              <Button type="button" size="sm" onClick={handlePublishClick} disabled={isBusy}>
                Publish
              </Button>
            )}
            {(shareStatus || publishStatus) && (
              <span className="hidden text-xs text-[hsl(var(--muted-foreground))] sm:inline">
                {shareStatus || publishStatus}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

