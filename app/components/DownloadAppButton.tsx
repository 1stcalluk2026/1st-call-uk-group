'use client'

import { useEffect, useId, useRef, useState } from 'react'

export type AppDownloadSource = 'immigration' | 'financial' | 'web' | 'group'

const HOST: Record<AppDownloadSource, string> = {
  immigration: '1stcalluk.com',
  financial: '1stcalluk.financial',
  web: '1stcalluk.website',
  group: '1stcalluk.co.uk',
}

function portalOrigin() {
  return (
    process.env.NEXT_PUBLIC_PORTAL_URL?.trim().replace(/\/$/, '') ||
    'https://1st-calluk-portal.vercel.app'
  )
}

export function downloadPageHref(source: AppDownloadSource, medium: 'website' | 'qr' = 'website') {
  const url = new URL('/download', portalOrigin())
  url.searchParams.set('source', source)
  url.searchParams.set('utm_source', HOST[source])
  url.searchParams.set('utm_medium', medium)
  url.searchParams.set('utm_campaign', 'app_download')
  return url.toString()
}

function qrSrc(source: AppDownloadSource) {
  return `${portalOrigin()}/api/download/qr?source=${source}`
}

type Placement = 'header' | 'footer' | 'nav'
type Variant = 'navy' | 'gold'

export default function DownloadAppButton({
  source,
  placement = 'header',
  variant = 'navy',
}: {
  source: AppDownloadSource
  placement?: Placement
  variant?: Variant
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const labelId = useId()
  const href = downloadPageHref(source)
  const qr = qrSrc(source)
  const gold = variant === 'gold'

  useEffect(() => {
    if (!open) return
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const panel = (
    <div
      role="dialog"
      aria-labelledby={labelId}
      className={
        gold
          ? 'w-[220px] rounded-2xl border border-brand-gold/40 bg-[#102f35] p-4 text-center shadow-2xl'
          : 'w-[220px] rounded-2xl border border-white/20 bg-white p-4 text-center text-slate-900 shadow-2xl'
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={qr}
        alt="QR code to download the 1st Call UK app"
        width={180}
        height={180}
        className="mx-auto h-[180px] w-[180px] rounded-xl bg-white p-2"
      />
      <p id={labelId} className={`mt-3 text-sm font-semibold ${gold ? 'text-white' : 'text-slate-900'}`}>
        Scan to download
      </p>
      <p className={`mt-1 text-[11px] leading-relaxed ${gold ? 'text-white/70' : 'text-slate-500'}`}>
        Use your phone camera. Same login as the client portal.
      </p>
      <a
        href={href}
        className={
          gold
            ? 'mt-3 inline-flex w-full items-center justify-center rounded-xl bg-brand-gold px-3 py-2 text-xs font-semibold text-[#102f35]'
            : 'mt-3 inline-flex w-full items-center justify-center rounded-xl bg-[#2d459c] px-3 py-2 text-xs font-semibold text-white'
        }
      >
        Open download page
      </a>
    </div>
  )

  if (placement === 'footer') {
    return (
      <div className={gold ? 'rounded-2xl border border-brand-gold/30 bg-white/5 p-4' : 'rounded-xl bg-white/10 p-4'}>
        <p className="text-sm font-semibold">Download our app</p>
        <p className={`mt-1 text-xs leading-relaxed ${gold ? 'text-gray-400' : 'text-white/75'}`}>
          Scan the code on your phone, or open the install page.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qr}
          alt="QR code to download the 1st Call UK app"
          width={132}
          height={132}
          className="mx-auto mt-3 h-[132px] w-[132px] rounded-xl bg-white p-2 md:mx-0"
        />
        <a
          href={href}
          className={
            gold
              ? 'mt-3 inline-flex w-full items-center justify-center rounded-xl bg-brand-gold px-3 py-2 text-xs font-semibold text-[#102f35]'
              : 'mt-3 inline-flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-xs font-semibold text-[#2d459c] hover:bg-white/90'
          }
        >
          Download our app
        </a>
      </div>
    )
  }

  if (placement === 'nav') {
    return (
      <a
        href={href}
        className={
          gold
            ? 'btn-primary py-3 text-center text-sm font-semibold'
            : 'rounded-lg bg-yellow-300 px-4 py-2 text-center text-sm font-semibold text-[#2d459c]'
        }
      >
        Download our app
      </a>
    )
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((value) => !value)}
        className={
          gold
            ? 'inline-flex items-center rounded-full border border-brand-gold/50 px-4 py-1.5 text-xs font-medium text-brand-gold-soft hover:bg-white/5'
            : 'inline-flex items-center rounded-full border border-white/30 bg-yellow-300 px-4 py-1.5 text-xs font-semibold text-[#233a86] shadow-sm hover:bg-yellow-200'
        }
      >
        Download our app
      </button>
      {open ? (
        <div className="absolute right-0 z-50 mt-2">{panel}</div>
      ) : null}
    </div>
  )
}
