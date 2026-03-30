import React, { Fragment } from 'react'

type SlateLeaf = {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

type SlateNode = {
  type?: string
  children?: SlateNode[]
  url?: string
  newTab?: boolean
  // for upload nodes
  value?: { url?: string; alt?: string }
  relationTo?: string
} & SlateLeaf

function serializeLeaf(leaf: SlateLeaf): React.ReactNode {
  let el: React.ReactNode = leaf.text

  if (leaf.bold) el = <strong>{el}</strong>
  if (leaf.italic) el = <em>{el}</em>
  if (leaf.underline) el = <u>{el}</u>
  if (leaf.strikethrough) el = <s>{el}</s>
  if (leaf.code) el = <code className="bg-surface border border-border px-1 py-0.5 rounded text-sm font-mono">{el}</code>

  return el
}

function serializeNode(node: SlateNode, index: number): React.ReactNode {
  // Text leaf node
  if (typeof node.text === 'string') {
    if (node.text === '') return null
    return <Fragment key={index}>{serializeLeaf(node as SlateLeaf)}</Fragment>
  }

  const children = node.children?.map((child, i) => serializeNode(child, i))

  switch (node.type) {
    case 'h1':
      return <h1 key={index} className="text-3xl font-bold text-text-primary mt-8 mb-4 leading-tight">{children}</h1>
    case 'h2':
      return <h2 key={index} className="text-2xl font-bold text-text-primary mt-8 mb-3 leading-tight">{children}</h2>
    case 'h3':
      return <h3 key={index} className="text-xl font-semibold text-text-primary mt-6 mb-3">{children}</h3>
    case 'h4':
      return <h4 key={index} className="text-lg font-semibold text-text-primary mt-6 mb-2">{children}</h4>
    case 'h5':
      return <h5 key={index} className="text-base font-semibold text-text-primary mt-4 mb-2">{children}</h5>
    case 'h6':
      return <h6 key={index} className="text-sm font-semibold text-text-primary mt-4 mb-2">{children}</h6>
    case 'ul':
      return <ul key={index} className="list-disc list-outside ml-6 my-4 space-y-1 text-text-secondary">{children}</ul>
    case 'ol':
      return <ol key={index} className="list-decimal list-outside ml-6 my-4 space-y-1 text-text-secondary">{children}</ol>
    case 'li':
      return <li key={index} className="leading-relaxed">{children}</li>
    case 'blockquote':
      return (
        <blockquote key={index} className="border-l-4 border-accent pl-4 my-6 italic text-text-secondary">
          {children}
        </blockquote>
      )
    case 'code':
      return (
        <pre key={index} className="bg-surface border border-border rounded-lg p-4 my-4 overflow-x-auto">
          <code className="font-mono text-sm text-text-primary whitespace-pre">{children}</code>
        </pre>
      )
    case 'link':
      return (
        <a
          key={index}
          href={node.url}
          target={node.newTab ? '_blank' : undefined}
          rel={node.newTab ? 'noopener noreferrer' : undefined}
          className="text-accent hover:underline"
        >
          {children}
        </a>
      )
    case 'upload':
      if (node.value?.url) {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={index}
            src={node.value.url}
            alt={node.value.alt ?? ''}
            className="rounded-lg my-6 w-full object-cover"
          />
        )
      }
      return null
    default:
      // paragraph / unknown — render as <p>
      return (
        <p key={index} className="text-text-secondary leading-relaxed my-4">
          {children}
        </p>
      )
  }
}

export default function RichText({ content }: { content: SlateNode[] | null | undefined }) {
  if (!content) return null
  return (
    <div className="rich-text">
      {content.map((node, i) => serializeNode(node, i))}
    </div>
  )
}
