import { useRef, useState } from 'react'

type TextStyle = 'Normal text' | 'Heading 1' | 'Heading 2' | 'Heading 3'
type Alignment = 'left' | 'center' | 'right' | 'justify'

function wrapSelectionWith(tag: string) {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return
  const range = selection.getRangeAt(0)
  const el = document.createElement(tag)
  try {
    range.surroundContents(el)
  } catch {
    // selection spans multiple nodes — extract and wrap
    const fragment = range.extractContents()
    el.appendChild(fragment)
    range.insertNode(el)
  }
  selection.removeAllRanges()
}

function toggleInlineStyle(tag: string, editorRef: React.RefObject<HTMLDivElement | null>) {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return

  const range = selection.getRangeAt(0)
  const ancestor = range.commonAncestorContainer

  // Check if already wrapped in this tag
  const parentTag = (ancestor.nodeType === Node.TEXT_NODE ? ancestor.parentElement : ancestor as Element)
  const existing = parentTag?.closest(tag)

  if (existing) {
    // Unwrap: replace the element with its children
    const parent = existing.parentNode
    if (!parent) return
    while (existing.firstChild) parent.insertBefore(existing.firstChild, existing)
    parent.removeChild(existing)
  } else {
    wrapSelectionWith(tag)
  }

  editorRef.current?.focus()
}

function applyBlockFormat(tag: string, editorRef: React.RefObject<HTMLDivElement | null>) {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return
  const range = selection.getRangeAt(0)

  // Find the block-level ancestor inside the editor
  let node: Node | null = range.startContainer
  while (node && node !== editorRef.current) {
    if (node.nodeType === Node.ELEMENT_NODE && isBlock(node as Element)) break
    node = node.parentNode
  }

  if (!node || node === editorRef.current) {
    // No block found — wrap selected content
    wrapSelectionWith(tag)
    return
  }

  const block = node as Element
  const newBlock = document.createElement(tag)
  while (block.firstChild) newBlock.appendChild(block.firstChild)
  block.parentNode?.replaceChild(newBlock, block)

  // Restore cursor
  const newRange = document.createRange()
  newRange.selectNodeContents(newBlock)
  newRange.collapse(false)
  selection.removeAllRanges()
  selection.addRange(newRange)
}

function isBlock(el: Element) {
  return ['P', 'H1', 'H2', 'H3', 'H4', 'DIV'].includes(el.tagName)
}

function applyAlignment(align: Alignment, editorRef: React.RefObject<HTMLDivElement | null>) {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return
  const range = selection.getRangeAt(0)

  let node: Node | null = range.startContainer
  while (node && node !== editorRef.current) {
    if (node.nodeType === Node.ELEMENT_NODE && isBlock(node as Element)) break
    node = node.parentNode
  }

  const block = (node && node !== editorRef.current ? node : editorRef.current) as HTMLElement
  block.style.textAlign = align
}

// --- Icons ---
function UndoIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a5 5 0 010 10H9M3 10l4-4M3 10l4 4" />
    </svg>
  )
}
function RedoIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 10H11a5 5 0 000 10h4M21 10l-4-4M21 10l-4 4" />
    </svg>
  )
}
function ChevronIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}
function AlignIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M4 6h16M4 12h10M4 18h16" />
    </svg>
  )
}

// --- History stack ---
export default function RichTextEditor() {
  const editorRef = useRef<HTMLDivElement>(null)
  const historyRef = useRef<string[]>([''])
  const historyIndexRef = useRef(0)

  const [textStyle, setTextStyle] = useState<TextStyle>('Normal text')
  const [styleOpen, setStyleOpen] = useState(false)
  const [alignOpen, setAlignOpen] = useState(false)

  const saveHistory = () => {
    const html = editorRef.current?.innerHTML ?? ''
    const stack = historyRef.current
    const idx = historyIndexRef.current
    // Drop any redo history ahead
    historyRef.current = [...stack.slice(0, idx + 1), html]
    historyIndexRef.current = historyRef.current.length - 1
  }

  const undo = () => {
    if (historyIndexRef.current <= 0) return
    historyIndexRef.current -= 1
    if (editorRef.current)
      editorRef.current.innerHTML = historyRef.current[historyIndexRef.current]
  }

  const redo = () => {
    if (historyIndexRef.current >= historyRef.current.length - 1) return
    historyIndexRef.current += 1
    if (editorRef.current)
      editorRef.current.innerHTML = historyRef.current[historyIndexRef.current]
  }

  const styleTagMap: Record<TextStyle, string> = {
    'Normal text': 'p',
    'Heading 1': 'h1',
    'Heading 2': 'h2',
    'Heading 3': 'h3',
  }

  const applyStyle = (style: TextStyle) => {
    setTextStyle(style)
    setStyleOpen(false)
    saveHistory()
    applyBlockFormat(styleTagMap[style], editorRef)
    editorRef.current?.focus()
  }

  const handleAlignment = (align: Alignment) => {
    setAlignOpen(false)
    saveHistory()
    applyAlignment(align, editorRef)
    editorRef.current?.focus()
  }

  const handleInline = (tag: string) => {
    saveHistory()
    toggleInlineStyle(tag, editorRef)
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-visible">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-200 bg-white flex-wrap rounded-t-xl">
        <button type="button" onClick={undo} className="p-1.5 rounded hover:bg-gray-100 text-gray-500 transition" title="Undo">
          <UndoIcon />
        </button>
        <button type="button" onClick={redo} className="p-1.5 rounded hover:bg-gray-100 text-gray-500 transition" title="Redo">
          <RedoIcon />
        </button>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        {/* Text Style */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setStyleOpen(o => !o); setAlignOpen(false) }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-gray-100 text-sm text-gray-700 transition"
          >
            {textStyle} <ChevronIcon />
          </button>
          {styleOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-36 py-1">
              {(Object.keys(styleTagMap) as TextStyle[]).map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => applyStyle(s)}
                  className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        {/* Alignment */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setAlignOpen(o => !o); setStyleOpen(false) }}
            className="flex items-center gap-1 p-1.5 rounded hover:bg-gray-100 text-gray-500 transition"
            title="Alignment"
          >
            <AlignIcon /> <ChevronIcon />
          </button>
          {alignOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-36 py-1">
              {(['left', 'center', 'right', 'justify'] as Alignment[]).map(a => (
                <button
                  key={a}
                  type="button"
                  onClick={() => handleAlignment(a)}
                  className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition capitalize"
                >
                  {a === 'justify' ? 'Justify' : `Align ${a.charAt(0).toUpperCase() + a.slice(1)}`}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        <button type="button" onClick={() => handleInline('strong')} className="p-1.5 rounded hover:bg-gray-100 font-bold text-gray-700 text-sm transition" title="Bold">B</button>
        <button type="button" onClick={() => handleInline('em')} className="p-1.5 rounded hover:bg-gray-100 italic text-gray-700 text-sm transition" title="Italic">I</button>
        <button type="button" onClick={() => handleInline('u')} className="p-1.5 rounded hover:bg-gray-100 underline text-gray-700 text-sm transition" title="Underline">U</button>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={saveHistory}
        data-placeholder="Type questions here.."
        className="min-h-44 px-4 py-3 text-sm text-gray-700 outline-none bg-white rounded-b-xl
          [&>h1]:text-2xl [&>h1]:font-bold [&>h2]:text-xl [&>h2]:font-bold [&>h3]:text-lg [&>h3]:font-semibold
          empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
      />
    </div>
  )
}