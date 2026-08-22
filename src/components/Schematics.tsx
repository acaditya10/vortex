import type { ReactNode } from 'react';

const MONO = "'JetBrains Mono', ui-monospace, monospace";
const STROKE_BOX = 'rgba(255,255,255,0.12)';
const STROKE_WIRE = 'rgba(255,255,255,0.16)';
const STROKE_DASH = 'rgba(200,182,162,0.35)';
const TXT = '#8A8580';
const TXT_DIM = '#4A4744';
const ACCENT = '#C8B6A2';

function Node({
  x,
  y,
  w = 180,
  h = 52,
  label,
  sub,
  dashed = false,
  accent = false,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  sub?: string;
  dashed?: boolean;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill="rgba(255,255,255,0.02)"
        stroke={accent ? 'rgba(200,182,162,0.45)' : dashed ? STROKE_DASH : STROKE_BOX}
        strokeDasharray={dashed ? '5 5' : undefined}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 6 : y + h / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={MONO}
        fontSize={11}
        letterSpacing={2}
        fill={accent ? ACCENT : TXT}
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 12}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily={MONO}
          fontSize={8.5}
          letterSpacing={1.5}
          fill={TXT_DIM}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Wire({ d, dashed = false }: { d: string; dashed?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={dashed ? STROKE_DASH : STROKE_WIRE}
      strokeWidth={1}
      strokeDasharray={dashed ? '4 5' : undefined}
    />
  );
}

function Joint({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r={2.5} fill="rgba(200,182,162,0.55)" />;
}

function GroupLabel({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <text x={x} y={y} fontFamily={MONO} fontSize={9} letterSpacing={2.5} fill={TXT_DIM}>
      {children}
    </text>
  );
}

function Chip({
  x,
  y,
  anchor = 'start',
  accent = false,
  children,
}: {
  x: number;
  y: number;
  anchor?: 'start' | 'end' | 'middle';
  accent?: boolean;
  children: ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={MONO}
      fontSize={10}
      letterSpacing={1.5}
      fill={accent ? ACCENT : TXT_DIM}
    >
      {children}
    </text>
  );
}

function CornerTick({ x, y }: { x: number; y: number }) {
  return (
    <g stroke="rgba(200,182,162,0.35)" strokeWidth={1}>
      <line x1={x - 10} y1={y} x2={x + 10} y2={y} />
      <line x1={x} y1={y - 10} x2={x} y2={y + 10} />
    </g>
  );
}

function Blueprint({
  id,
  code,
  title,
  children,
}: {
  id: string;
  code: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 1200 950"
      role="img"
      aria-label={`${title} — architecture schematic`}
      className="block h-auto w-full"
    >
      <defs>
        <pattern id={`${id}-grid`} width={40} height={40} patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth={1} />
        </pattern>
      </defs>

      <rect width={1200} height={950} fill={`url(#${id}-grid)`} />
      <rect x={20} y={20} width={1160} height={910} fill="none" stroke="rgba(255,255,255,0.07)" />

      <CornerTick x={20} y={20} />
      <CornerTick x={1180} y={20} />
      <CornerTick x={20} y={930} />
      <CornerTick x={1180} y={930} />

      {children}

      <line x1={40} y1={886} x2={1160} y2={886} stroke="rgba(255,255,255,0.08)" />
      <text x={40} y={910} fontFamily={MONO} fontSize={9.5} letterSpacing={2} fill={TXT_DIM}>
        DWG NO. {code} — {title}
      </text>
      <text
        x={1160}
        y={910}
        textAnchor="end"
        fontFamily={MONO}
        fontSize={9.5}
        letterSpacing={2}
        fill={TXT_DIM}
      >
        SCALE 1:1 · REV C · SHEET 01/01
      </text>
    </svg>
  );
}

export function HeadlessSchematic() {
  return (
    <Blueprint id="wm" code="WM-01" title="HEADLESS PLATFORM TOPOLOGY">
      {/* Client layer */}
      <Node x={210} y={64} label="WEB APP" sub="NEXT.JS" />
      <Node x={510} y={64} label="MOBILE" sub="REACT NATIVE" />
      <Node x={810} y={64} label="PARTNER API" sub="REST / GRAPHQL" />

      <Wire d="M300 116V204" />
      <Wire d="M600 116V204" />
      <Wire d="M900 116V204" />
      <Joint x={300} y={116} />
      <Joint x={600} y={116} />
      <Joint x={900} y={116} />
      <Joint x={300} y={204} />
      <Joint x={600} y={204} />
      <Joint x={900} y={204} />

      {/* Edge */}
      <Node x={210} y={204} w={780} h={48} label="GLOBAL EDGE NETWORK — CDN / ISR CACHE" />
      <Chip x={974} y={228} anchor="end">
        HIT RATE 96%
      </Chip>
      <Wire d="M206 228H182" />
      <Chip x={176} y={232} anchor="end">
        TTFB &lt;120MS
      </Chip>

      <Wire d="M320 252V330" />
      <Wire d="M600 252V330" />
      <Wire d="M880 252V330" />
      <Joint x={320} y={252} />
      <Joint x={600} y={252} />
      <Joint x={880} y={252} />
      <Joint x={320} y={330} />
      <Joint x={600} y={330} />
      <Joint x={880} y={330} />

      {/* App cluster */}
      <rect
        x={170}
        y={330}
        width={860}
        height={136}
        fill="none"
        stroke="rgba(200,182,162,0.25)"
        strokeDasharray="6 6"
      />
      <GroupLabel x={186} y={354}>NEXT.JS CLUSTER — APP ROUTER / RSC</GroupLabel>
      <Node x={195} y={372} w={250} h={62} label="NODE 01" sub="RSC / SSR" />
      <Node x={475} y={372} w={250} h={62} label="NODE 02" sub="ISR / SSG" />
      <Node x={755} y={372} w={250} h={62} label="NODE 03" sub="EDGE RUNTIME" />

      <Wire d="M600 466V546" />
      <Joint x={600} y={466} />
      <Joint x={600} y={546} />

      {/* Gateway */}
      <Node x={380} y={546} w={440} h={46} label="API GATEWAY" />
      <Wire d="M824 569H846" />
      <Chip x={852} y={573} accent>
        P99 42MS
      </Chip>

      {/* Fan-out to services */}
      <Wire d="M420 592V632" />
      <Wire d="M600 592V632" />
      <Wire d="M780 592V632" />
      <Wire d="M300 632H900" />
      <Wire d="M300 632V672" />
      <Wire d="M600 632V672" />
      <Wire d="M900 632V672" />
      <Joint x={420} y={592} />
      <Joint x={600} y={592} />
      <Joint x={780} y={592} />
      <Joint x={420} y={632} />
      <Joint x={600} y={632} />
      <Joint x={780} y={632} />
      <Joint x={300} y={632} />
      <Joint x={900} y={632} />
      <Joint x={300} y={672} />
      <Joint x={600} y={672} />
      <Joint x={900} y={672} />

      {/* Services */}
      <Node x={185} y={672} w={230} h={54} label="AUTH" sub="OAUTH / RBAC" />
      <Node x={485} y={672} w={230} h={54} label="MEDIA PIPELINE" sub="TRANSCODE / DELIVERY" />
      <Node x={785} y={672} w={230} h={54} label="SEARCH INDEX" sub="POSTGRES FTS" />
      <Wire d="M181 699H158" />
      <Chip x={152} y={703} anchor="end" accent>
        LATENCY −40%
      </Chip>

      {/* Data bus */}
      <Wire d="M300 726V766" />
      <Wire d="M600 726V766" />
      <Wire d="M900 726V766" />
      <Wire d="M300 766H900" />
      <Wire d="M300 766V796" />
      <Wire d="M600 766V796" />
      <Wire d="M900 766V796" />
      <Joint x={300} y={726} />
      <Joint x={600} y={726} />
      <Joint x={900} y={726} />
      <Joint x={300} y={766} />
      <Joint x={600} y={766} />
      <Joint x={900} y={766} />
      <Joint x={300} y={796} />
      <Joint x={600} y={796} />
      <Joint x={900} y={796} />

      {/* Data layer */}
      <Node x={180} y={796} w={240} h={58} label="POSTGRESQL PRIMARY" sub="WRITE PATH" accent />
      <Node x={480} y={796} w={240} h={58} label="READ REPLICA" sub="READ PATH" dashed />
      <Node x={780} y={796} w={240} h={58} label="REDIS" sub="HOT CACHE" />
      <Wire d="M420 825H480" dashed />
      <Joint x={420} y={825} />
      <Joint x={480} y={825} />
      <Chip x={450} y={815} anchor="middle">
        SYNC
      </Chip>
    </Blueprint>
  );
}

export function CommerceSchematic() {
  return (
    <Blueprint id="pa" code="PA-02" title="COMMERCE SYSTEM TOPOLOGY">
      {/* Client layer */}
      <Node x={90} y={64} label="ADMIN CONSOLE" sub="OPS TEAM" />
      <Node x={430} y={56} w={340} h={68} label="HEADLESS STOREFRONT" sub="NEXT.JS + SANITY CMS" accent />
      <Node x={930} y={64} label="OPS DASHBOARD" sub="FULFILLMENT" />

      <Wire d="M180 116V232" />
      <Wire d="M560 124V232" />
      <Wire d="M1020 116V232" />
      <Joint x={180} y={116} />
      <Joint x={560} y={124} />
      <Joint x={1020} y={116} />
      <Joint x={180} y={232} />
      <Joint x={560} y={232} />
      <Joint x={1020} y={232} />

      <Wire d="M640 124V152" />
      <Chip x={640} y={172} anchor="middle" accent>
        CONVERSION +28%
      </Chip>

      {/* Event bus */}
      <Node x={90} y={232} w={1020} h={44} label="EVENT BUS — ORDERS / INVENTORY / WEBHOOKS" />
      <Chip x={1094} y={256} anchor="end">
        DURABLE QUEUE
      </Chip>

      <Wire d="M270 276V372" />
      <Wire d="M600 276V372" />
      <Wire d="M930 276V372" />
      <Joint x={270} y={276} />
      <Joint x={600} y={276} />
      <Joint x={930} y={276} />
      <Joint x={270} y={372} />
      <Joint x={600} y={372} />
      <Joint x={930} y={372} />

      {/* Core services */}
      <Node x={130} y={372} w={280} h={64} label="CATALOG & PRICING" sub="SANITY / CDN" />
      <Node x={460} y={372} w={280} h={64} label="CART & CHECKOUT" sub="SERVER ACTIONS" />
      <Node x={790} y={372} w={280} h={64} label="PAYMENTS" sub="STRIPE VAULT" />
      <Wire d="M740 404H790" />
      <Joint x={740} y={404} />
      <Joint x={790} y={404} />
      <Chip x={765} y={394} anchor="middle">
        TOKEN
      </Chip>

      <Wire d="M270 436V600" />
      <Wire d="M600 436V600" />
      <Wire d="M930 436V600" />
      <Joint x={270} y={436} />
      <Joint x={600} y={436} />
      <Joint x={930} y={436} />
      <Joint x={270} y={600} />
      <Joint x={600} y={600} />
      <Joint x={930} y={600} />

      <Wire d="M170 436V468" />
      <Chip x={170} y={488} anchor="middle">
        ERP SYNC &lt;60S
      </Chip>
      <Wire d="M1040 436V468" />
      <Chip x={1040} y={488} anchor="middle" accent>
        CAPTURE &lt;900MS
      </Chip>

      {/* Integrations */}
      <Node x={130} y={600} w={280} h={54} label="FULFILLMENT · 3PL" sub="SHIPSTATION" />
      <Node x={460} y={600} w={280} h={54} label="ERP / INVENTORY" sub="NETSUITE SYNC" />
      <Node x={790} y={600} w={280} h={54} label="CRM" sub="SEGMENT / KLAVIYO" />

      <Wire d="M270 654V740" />
      <Wire d="M600 654V740" />
      <Wire d="M930 654V740" />
      <Joint x={270} y={654} />
      <Joint x={600} y={654} />
      <Joint x={930} y={654} />
      <Joint x={270} y={740} />
      <Joint x={600} y={740} />
      <Joint x={930} y={740} />

      {/* Data layer */}
      <Node x={150} y={740} w={240} h={58} label="POSTGRES" sub="ORDERS / LEDGER" />
      <Node x={480} y={740} w={240} h={58} label="OBJECT STORE" sub="MEDIA / ASSETS" />
      <Node x={810} y={740} w={240} h={58} label="ANALYTICS LAKE" sub="EVENT SINK" dashed />
    </Blueprint>
  );
}

export function UpsideSchematic() {
  return (
    <Blueprint id="um" code="UM-03" title="EDGE-NATIVE MEDIA TOPOLOGY">
      {/* Client layer */}
      <Node x={210} y={64} w={250} h={62} label="NEXT.JS APP" sub="ZERO-DEPLOY" accent />
      <Node x={570} y={64} w={250} h={62} label="CMS DASHBOARD" sub="CONTENT EDITORS" />
      <Node x={930} y={64} w={180} h={62} label="ADMIN PANEL" sub="INTERNAL OPS" />

      <Wire d="M335 126V204" />
      <Wire d="M695 126V204" />
      <Wire d="M1020 126V204" />
      <Joint x={335} y={126} />
      <Joint x={695} y={126} />
      <Joint x={1020} y={126} />
      <Joint x={335} y={204} />
      <Joint x={695} y={204} />
      <Joint x={1020} y={204} />

      {/* Edge layer */}
      <Node x={150} y={204} w={900} h={46} label="EDGE LAYER — CDN / ISR / MIDDLEWARE ROUTING" />
      <Chip x={1034} y={228} anchor="end">
        TTFB &lt;80MS
      </Chip>

      <Wire d="M600 250V330" />
      <Joint x={600} y={250} />
      <Joint x={600} y={330} />

      {/* API routes cluster */}
      <rect
        x={170}
        y={330}
        width={860}
        height={130}
        fill="none"
        stroke="rgba(200,182,162,0.25)"
        strokeDasharray="6 6"
      />
      <GroupLabel x={186} y={354}>API ROUTES — PRESIGNED UPLOAD PIPELINE</GroupLabel>
      <Node x={195} y={372} w={250} h={58} label="UPLOAD GATEWAY" sub="PRESIGNED URLs" accent />
      <Node x={475} y={372} w={250} h={58} label="CONTENT API" sub="CMS FETCH" />
      <Node x={755} y={372} w={250} h={58} label="MEDIA RESIZE" sub="SHARP / EDGE" />

      <Wire d="M195 401H158" />
      <Chip x={152} y={405} anchor="end" accent>
        ZERO DEPLOY
      </Chip>

      <Wire d="M600 460V540" />
      <Joint x={600} y={460} />
      <Joint x={600} y={540} />

      {/* Database cluster */}
      <rect
        x={170}
        y={540}
        width={860}
        height={130}
        fill="none"
        stroke="rgba(200,182,162,0.25)"
        strokeDasharray="6 6"
      />
      <GroupLabel x={186} y={564}>DUAL-SDK DISTRIBUTED DATABASE</GroupLabel>
      <Node x={195} y={582} w={250} h={58} label="D1 PRIMARY" sub="WRITE PATH" accent />
      <Node x={475} y={582} w={250} h={58} label="D1 REPLICA" sub="READ PATH" dashed />
      <Node x={755} y={582} w={250} h={58} label="KV EDGE CACHE" sub="HOT DATA" />

      <Wire d="M445 611H475" dashed />
      <Joint x={445} y={611} />
      <Joint x={475} y={611} />
      <Chip x={460} y={601} anchor="middle">
        SYNC
      </Chip>

      <Wire d="M300 670V740" />
      <Wire d="M600 670V740" />
      <Wire d="M900 670V740" />
      <Joint x={300} y={670} />
      <Joint x={600} y={670} />
      <Joint x={900} y={670} />
      <Joint x={300} y={740} />
      <Joint x={600} y={740} />
      <Joint x={900} y={740} />

      {/* Storage layer */}
      <Node x={180} y={740} w={240} h={58} label="AWS R2 BUCKET" sub="MEDIA STORAGE" accent />
      <Node x={480} y={740} w={240} h={58} label="CMS CONTENT store" sub="HEADLESS CMS" />
      <Node x={780} y={740} w={240} h={58} label="ANALYTICS" sub="EVENT STREAM" dashed />

      <Wire d="M420 769H480" dashed />
      <Joint x={420} y={769} />
      <Joint x={480} y={769} />

      {/* Direct upload flow - accent wire from upload gateway to R2 */}
      <Wire d="M320 430V740" />
      <Joint x={320} y={430} />
      <Chip x={332} y={500} anchor="start" accent>
        DIRECT EDGE UPLOAD
      </Chip>
    </Blueprint>
  );
}
