import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import {
  Zap, Users, MessageSquare, Star, ArrowRight, 
  Code2, Rocket, Brain, Heart, X, Check, ChevronDown,
  Globe, Shield, Sparkles, Terminal, GitMerge,
  Flame, Mouse, Radio
} from "lucide-react";
import loginWithGoogle from "../../services/landing/landing-pages-services";


/* ─── DESIGN TOKENS ─────────────────────────────────────────────────────────── */
const T = {
  bg:    "#07070f",
  surf:  "#0f0f1a",
  card:  "#13131f",
  bdr:   "rgba(255,255,255,0.07)",
  t1:    "#f0f0ff",   // primary text — light lavender white
  t2:    "#8888aa",   // secondary
  t3:    "#4a4a6a",   // muted
  v:     "#7c6aff",   // violet
  b:     "#38bdf8",   // blue
  p:     "#f471b5",   // pink
  g:     "#34d399",   // green
  o:     "#fb923c",   // orange
};

/* ─── DATA ──────────────────────────────────────────────────────────────────── */
const SWIPE_CARDS = [
  { type:"project", emoji:"🔥", title:"AI Resume Roaster", tagline:"Brutally honest feedback, instantly.", stack:["Next.js","OpenAI","Supabase"], roles:["Frontend","Prompt Eng."], glow:T.o, bdr:"rgba(251,146,60,0.25)", grad:"rgba(251,146,60,0.08),rgba(239,68,68,0.08)" },
  { type:"dev",     emoji:"⚡", name:"Priya S.", title:"Full-Stack Builder", tagline:"6 shipped projects. Seeking design co-founder.", stack:["React","Node.js","PostgreSQL"], roles:["Open to co-found"], glow:T.v, bdr:"rgba(124,106,255,0.25)", grad:"rgba(124,106,255,0.08),rgba(56,189,248,0.08)" },
  { type:"project", emoji:"🚀", title:"DevLink", tagline:"LinkedIn killer. Built by devs, for devs.", stack:["SvelteKit","Supabase","Vercel"], roles:["Backend","UI Designer"], glow:T.b, bdr:"rgba(56,189,248,0.25)", grad:"rgba(56,189,248,0.08),rgba(52,211,153,0.08)" },
];

const STEPS = [
  { n:"01", icon:<Heart size={22}/>, label:"Swipe", desc:"Browse project ideas and developer profiles at the speed of thought. Like swiping Reels — except everything you find actually matters.", color:T.p },
  { n:"02", icon:<Zap size={22}/>,   label:"Match", desc:"When interest is mutual, you're instantly connected. No cold DMs. No waiting. Just a straight line to your next collaborator.", color:T.v },
  { n:"03", icon:<Rocket size={22}/>,label:"Build", desc:"Jump into a shared workspace, set milestones, and ship. AlgoCrush keeps both of you accountable.", color:T.b },
];

const BENTO = [
  { id:"swipe",     size:"wide",  icon:<Mouse size={18}/>,        title:"Tinder-Style Discovery",    body:"Swipe through projects and devs at the speed of thought. No endless scrolling.",            color:T.v  },
  { id:"ai",        size:"tall",  icon:<Brain size={18}/>,        title:"AI Smart Matching",         body:"Our engine reads your GitHub, stack, and goals — then surfaces the 1% worth your time.",    color:T.b  },
  { id:"chat",      size:"small", icon:<MessageSquare size={18}/>,title:"Instant DMs",               body:"No gatekeeping. Match → chat in seconds.",                                                  color:T.p  },
  { id:"project",   size:"small", icon:<Code2 size={18}/>,        title:"Project-First Profiles",    body:"Lead with what you build, not your job title.",                                             color:T.g  },
  { id:"hackathon", size:"wide",  icon:<Flame size={18}/>,        title:"Hackathon Mode 🔥",         body:"Drop a hackathon → auto-matched with complementary devs. Full team in < 10 minutes.",       color:T.o  },
  { id:"verified",  size:"small", icon:<Shield size={18}/>,       title:"Verified Builders Only",    body:"GitHub-linked. No ghost profiles, ever.",                                                   color:"#fbbf24" },
];

const TESTI = [
  { text:"Found my co-founder in 3 swipes. We launched in 6 weeks and got 2,000 users.", name:"Marcus T.",  role:"Indie Hacker",       av:"MT", color:T.v },
  { text:"Finally, a place where people actually want to ship. Not just talk about it.",  name:"Aisha K.",   role:"CS Student @ MIT",   av:"AK", color:T.b },
  { text:"Matched with a designer Sunday night. Had a live app by Wednesday.",            name:"Dev R.",     role:"Solo Builder",       av:"DR", color:T.p },
  { text:"It's like Tinder but every match is excited to push commits at 2am.",           name:"Yuki N.",    role:"Hackathon Veteran",  av:"YN", color:T.g },
];

const SHOWCASE = [
  { emoji:"🧬", title:"BioTrack AI",  desc:"Voice-log workouts. AI builds your weekly program automatically.", stack:["Flutter","FastAPI","Claude"], roles:["ML Eng","Mobile Dev"], glow:T.g },
  { emoji:"💸", title:"SplitMate",   desc:"Settle group expenses without the awkward Venmo requests.",         stack:["React Native","Stripe","Firebase"], roles:["Backend","iOS"], glow:T.o },
  { emoji:"🎮", title:"CodeQuest",   desc:"Learn DSA through an RPG. Grind XP, not Leetcode.",                stack:["Next.js","Phaser.js","Supabase"], roles:["Game Dev","Full-Stack"], glow:T.v },
];

const MARQUEE = ["Next.js","Rust","TypeScript","Supabase","React Native","Postgres","Redis","FastAPI","Flutter","Go","Vercel","Tailwind","SvelteKit","Deno","Bun","OpenAI","Claude API","Docker","Stripe","GraphQL"];

/* ─── TYPEWRITER ─────────────────────────────────────────────────────────────── */
function Typewriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);
  const word = words[idx];
  useEffect(() => {
    const t = setTimeout(() => {
      if (!del) {
        if (sub < word.length) setSub(s=>s+1);
        else setTimeout(()=>setDel(true), 1200);
      } else {
        if (sub > 0) setSub(s=>s-1);
        else { setDel(false); setIdx(i=>(i+1)%words.length); }
      }
    }, del ? 42 : 85);
    return ()=>clearTimeout(t);
  }, [sub, del, word]);
  return (
    <span style={{ color:T.v }}>
      {word.slice(0,sub)}
      <motion.span
        animate={{ opacity:[1,0] }}
        transition={{ repeat:Infinity, duration:0.55 }}
        style={{ borderRight:`2.5px solid ${T.v}`, marginLeft:2 }}
      />
    </span>
  );
}

/* ─── GOOGLE BUTTON ──────────────────────────────────────────────────────────── */
function GoogleBtn({ onClick, label="Continue with Google", big=false }) {
  return (
    <motion.button
      whileHover={{ scale:1.025, boxShadow:"0 0 44px rgba(124,106,255,0.4)" }}
      whileTap={{ scale:0.97 }}
      style={{
        display:"flex", alignItems:"center", justifyContent:"center", gap:12,
        background:"#ffffff", color:"#111111",
        fontFamily:"inherit", fontWeight:700,
        fontSize:big?15:14, padding:big?"15px 28px":"11px 22px",
        borderRadius:14, border:"none", cursor:"pointer",
        boxShadow:"0 4px 24px rgba(0,0,0,0.3)", flexShrink:0,
      }}
      onClick={loginWithGoogle}
    >
      <svg viewBox="0 0 24 24" style={{ width:big?22:18, height:big?22:18, flexShrink:0 }}>
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      {label}
    </motion.button>
  );
}

/* ─── SWIPE CARD STACK ───────────────────────────────────────────────────────── */
function SwipeStack() {
  const [cards, setCards] = useState(SWIPE_CARDS);
  const [exitDir, setExitDir] = useState(null);
  const [dragging, setDragging] = useState(false);

  const dismiss = dir => {
    setExitDir(dir);
    setTimeout(()=>{
      setCards(prev => { const [h,...t]=prev; return [...t,h]; });
      setExitDir(null);
    }, 380);
  };

  const top = cards[0];

  return (
    <div style={{ position:"relative", width:290, height:390, margin:"0 auto" }}>
      {[{ s:0.87, y:32 },{ s:0.93, y:16 }].map((b,i)=>(
        <div key={i} style={{
          position:"absolute", inset:0, borderRadius:22,
          background:T.card, border:`1px solid ${T.bdr}`,
          transform:`scale(${b.s}) translateY(${b.y}px)`,
          zIndex:i+1,
        }}/>
      ))}

      <AnimatePresence mode="popLayout">
        <motion.div
          key={top.title||top.name}
          drag="x" dragConstraints={{ left:0, right:0 }}
          onDragStart={()=>setDragging(true)}
          onDragEnd={(e,info)=>{
            setDragging(false);
            if(info.offset.x>80) dismiss("right");
            else if(info.offset.x<-80) dismiss("left");
          }}
          animate={
            exitDir==="right" ? { x:430, rotate:18, opacity:0 } :
            exitDir==="left"  ? { x:-430, rotate:-18, opacity:0 } :
            { x:0, rotate:0, opacity:1 }
          }
          transition={{ duration:0.38, ease:[0.4,0,0.2,1] }}
          style={{
            position:"absolute", inset:0, zIndex:10,
            borderRadius:22, cursor:"grab",
            background:`linear-gradient(135deg,${top.grad})`,
            border:`1px solid ${top.bdr}`,
            boxShadow:`0 0 60px ${top.glow}1a, 0 24px 64px rgba(0,0,0,0.6)`,
            padding:24, display:"flex", flexDirection:"column",
          }}
        >
          <motion.div animate={{ opacity:dragging?1:0 }} style={{ position:"absolute", top:12, left:12, background:"#22c55e", color:"#000", fontWeight:800, fontSize:10, padding:"3px 10px", borderRadius:999, letterSpacing:"0.06em" }}>✓ BUILD</motion.div>
          <motion.div animate={{ opacity:dragging?1:0 }} style={{ position:"absolute", top:12, right:12, background:"#ef4444", color:"#fff", fontWeight:800, fontSize:10, padding:"3px 10px", borderRadius:999, letterSpacing:"0.06em" }}>✕ SKIP</motion.div>

          <div style={{ fontSize:32, marginBottom:10 }}>{top.emoji}</div>
          <div style={{ fontSize:9, letterSpacing:"0.22em", color:T.t3, textTransform:"uppercase", marginBottom:6 }}>
            {top.type==="project"?"💡 Project Idea":"👤 Developer"}
          </div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, color:T.t1, marginBottom:6, lineHeight:1.2 }}>
            {top.title||top.name}
          </div>
          <div style={{ fontSize:12, color:T.t2, marginBottom:16, lineHeight:1.65 }}>{top.tagline}</div>

          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:9, color:T.t3, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:7 }}>Stack</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
              {top.stack.map(s=>(
                <span key={s} style={{ fontSize:10, padding:"2px 9px", borderRadius:999, background:"rgba(255,255,255,0.07)", color:T.t2, border:`1px solid rgba(255,255,255,0.09)` }}>{s}</span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize:9, color:T.t3, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:7 }}>Roles Needed</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
              {top.roles.map(r=>(
                <span key={r} style={{ fontSize:10, padding:"2px 9px", borderRadius:999, border:`1px solid ${top.glow}55`, color:top.glow }}>{r}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Buttons */}
      <div style={{ position:"absolute", bottom:-60, left:0, right:0, display:"flex", justifyContent:"center", gap:18, zIndex:20 }}>
        <motion.button whileHover={{ scale:1.12 }} whileTap={{ scale:0.92 }} onClick={()=>dismiss("left")}
          style={{ width:48, height:48, borderRadius:"50%", background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.35)", color:"#f87171", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <X size={18}/>
        </motion.button>
        <motion.button whileHover={{ scale:1.12 }} whileTap={{ scale:0.92 }} onClick={()=>dismiss("right")}
          style={{ width:48, height:48, borderRadius:"50%", background:"rgba(34,197,94,0.15)", border:"1px solid rgba(34,197,94,0.35)", color:"#4ade80", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Check size={18}/>
        </motion.button>
      </div>
    </div>
  );
}

/* ─── BENTO CARD ─────────────────────────────────────────────────────────────── */
function BentoCard({ f, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-50px" });
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:24, scale:0.97 }}
      animate={inView?{ opacity:1,y:0,scale:1 }:{}}
      transition={{ delay, duration:0.55, ease:[0.22,1,0.36,1] }}
      onHoverStart={()=>setHovered(true)}
      onHoverEnd={()=>setHovered(false)}
      style={{
        background:T.card,
        border:`1px solid ${hovered ? f.color+"35" : T.bdr}`,
        borderRadius:20, padding:28,
        display:"flex", flexDirection:"column",
        position:"relative", overflow:"hidden",
        cursor:"default",
        boxShadow: hovered ? `0 0 60px ${f.color}15, 0 24px 56px rgba(0,0,0,0.45)` : "0 16px 48px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition:"transform 0.35s ease, border-color 0.3s, box-shadow 0.35s",
      }}
    >
      <div style={{ position:"absolute", top:-50, right:-50, width:140, height:140, borderRadius:"50%", background:f.color, opacity:0.05, filter:"blur(44px)", pointerEvents:"none" }}/>
      <div style={{ width:42, height:42, borderRadius:13, marginBottom:18, background:`${f.color}18`, border:`1px solid ${f.color}30`, color:f.color, display:"flex", alignItems:"center", justifyContent:"center" }}>{f.icon}</div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, color:T.t1, marginBottom:10 }}>{f.title}</div>
      <div style={{ fontSize:13.5, color:T.t2, lineHeight:1.7 }}>{f.body}</div>
    </motion.div>
  );
}

/* ─── STAT COUNTER ───────────────────────────────────────────────────────────── */
function StatCount({ to, suf="" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true });
  const [v, setV] = useState(0);
  useEffect(()=>{
    if(!inView) return;
    let s=0; const dur=1800; const step=16;
    const t = setInterval(()=>{
      s+=step; setV(Math.min(Math.round((s/dur)*to),to));
      if(s>=dur) clearInterval(t);
    },step);
    return()=>clearInterval(t);
  },[inView,to]);
  return <span ref={ref}>{v.toLocaleString()}{suf}</span>;
}

/* ─── MARQUEE STRIP ──────────────────────────────────────────────────────────── */
function MarqueeStrip() {
  const all = [...MARQUEE,...MARQUEE];
  return (
    <div style={{ overflow:"hidden", maskImage:"linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)" }}>
      <motion.div
        animate={{ x:["0%","-50%"] }}
        transition={{ duration:30, repeat:Infinity, ease:"linear" }}
        style={{ display:"flex", gap:10, width:"max-content" }}
      >
        {all.map((t,i)=>(
          <div key={i} style={{ padding:"6px 18px", borderRadius:999, background:T.card, border:`1px solid ${T.bdr}`, color:T.t3, fontSize:12.5, whiteSpace:"nowrap", flexShrink:0 }}>{t}</div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── CURSOR GLOW ────────────────────────────────────────────────────────────── */
function CursorGlow() {
  const [pos, setPos] = useState({ x:-500,y:-500 });
  useEffect(()=>{
    const h=e=>setPos({x:e.clientX,y:e.clientY});
    window.addEventListener("mousemove",h);
    return()=>window.removeEventListener("mousemove",h);
  },[]);
  return (
    <div style={{
      position:"fixed",inset:0,pointerEvents:"none",zIndex:0,
      background:`radial-gradient(650px circle at ${pos.x}px ${pos.y}px, rgba(124,106,255,0.055), transparent 55%)`,
    }}/>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════════ */
export default function AlgoCrush() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ background:T.bg, color:T.t1, minHeight:"100vh", overflowX:"hidden", fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{background:#07070f;}
        ::selection{background:#7c6aff44;color:#f0f0ff;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:#07070f;}
        ::-webkit-scrollbar-thumb{background:#7c6aff55;border-radius:2px;}
        a{text-decoration:none;}

        .grad-text{
          background:linear-gradient(120deg,#7c6aff,#38bdf8,#f471b5,#7c6aff);
          background-size:280%;
          animation:gshift 5s ease infinite;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }
        @keyframes gshift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-13px)}}
        .float{animation:float 4.8s ease-in-out infinite;}

        @keyframes pring{0%,100%{box-shadow:0 0 0 0 rgba(124,106,255,0.45)}60%{box-shadow:0 0 0 12px transparent}}
        .pring{animation:pring 2.6s ease-in-out infinite;}

        .noise{
          position:fixed;inset:0;pointer-events:none;z-index:1;opacity:0.022;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* ─── RESPONSIVE ─── */
        .hero-wrap{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;}
        .steps-wrap{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;}
        .bento-wrap{display:grid;grid-template-columns:1fr 1fr 1fr;grid-auto-rows:minmax(170px,auto);gap:14px;}
        .bento-wide{grid-column:span 2;}
        .bento-tall{grid-row:span 2;}
        .testi-wrap{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
        .showcase-wrap{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;}
        .stats-wrap{display:flex;justify-content:center;gap:52px;flex-wrap:wrap;}
        .nav-mid{display:flex;gap:28px;}
        .nav-right{display:flex;gap:12px;align-items:center;}
        .ham{display:none!important;}

        @media(max-width:900px){
          .hero-wrap{grid-template-columns:1fr;gap:56px;}
          .bento-wrap{grid-template-columns:1fr 1fr;}
          .bento-wide{grid-column:span 2;}
          .showcase-wrap{grid-template-columns:1fr 1fr;}
          .steps-wrap{grid-template-columns:1fr;}
        }
        @media(max-width:640px){
          .bento-wrap{grid-template-columns:1fr;}
          .bento-wide{grid-column:auto;}
          .bento-tall{grid-row:auto;}
          .testi-wrap{grid-template-columns:1fr;}
          .showcase-wrap{grid-template-columns:1fr;}
          .steps-wrap{grid-template-columns:1fr;}
          .stats-wrap{flex-direction:column;gap:28px;align-items:center;}
          .nav-mid{display:none!important;}
          .nav-right{display:none!important;}
          .ham{display:block!important;}
        }
      `}</style>

      <div className="noise"/>
      <CursorGlow/>

      {/* mesh bg */}
      <div style={{
        position:"fixed",inset:0,zIndex:0,pointerEvents:"none",
        background:`
          radial-gradient(ellipse 65% 40% at 10% 0%,  rgba(124,106,255,0.12) 0%,transparent 65%),
          radial-gradient(ellipse 50% 35% at 88% 18%, rgba(56,189,248,0.08)  0%,transparent 65%),
          radial-gradient(ellipse 55% 40% at 55% 92%, rgba(244,113,181,0.07) 0%,transparent 65%)
        `,
      }}/>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity:0,y:-8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-8 }}
            style={{ position:"fixed",top:62,left:0,right:0,zIndex:199,background:"rgba(10,10,22,0.97)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${T.bdr}`,padding:24,display:"flex",flexDirection:"column",gap:16 }}>
            {["How it works","Features","Projects"].map(l=>(
              <a key={l} href="#" style={{ color:T.t2,fontSize:15,padding:"10px 0",borderBottom:`1px solid ${T.bdr}` }}>{l}</a>
            ))}
            <GoogleBtn onClick={loginWithGoogle} label="Get started — free" big={true}/>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════ HERO ════ */}
      <section style={{ position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:80,zIndex:2 }}>
        {/* grid */}
        <div style={{ position:"absolute",inset:0,opacity:0.022,backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",backgroundSize:"58px 58px",pointerEvents:"none" }}/>

        <div style={{ maxWidth:1160,margin:"0 auto",padding:"60px 24px",width:"100%",position:"relative",zIndex:2 }}>
          <div className="hero-wrap">

            {/* LEFT */}
            <motion.div initial={{ opacity:0,y:36 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.7,ease:[0.22,1,0.36,1] }}>
              {/* Badge */}
              <motion.div initial={{ opacity:0,scale:0.9 }} animate={{ opacity:1,scale:1 }} transition={{ delay:0.1 }}
                style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"6px 14px",borderRadius:999,border:`1px solid rgba(124,106,255,0.38)`,background:"rgba(124,106,255,0.1)",marginBottom:28 }}>
                <Radio size={11} style={{ color:T.v }}/>
                <span style={{ fontSize:12,color:T.v,fontWeight:600,letterSpacing:"0.02em" }}>10,000+ devs already building</span>
              </motion.div>

              {/* Headline */}
              <h1 style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(32px, 8vw, 66px)",lineHeight:1.06,marginBottom:22,color:T.t1 }}>
                Find&nbsp;<Typewriter words={["Builders","Co-Founders","Makers"]}/><br/>
                Ship&nbsp;<span className="grad-text">Faster.</span>
              </h1>

              <p style={{ fontSize:"clamp(15px,1.5vw,17.5px)",color:T.t2,lineHeight:1.78,marginBottom:36,maxWidth:490 }}>
                Swipe through projects, connect with devs who actually ship, and build your next big thing — without wasting hours in DMs that go nowhere.
              </p>

              {/* CTAs */}
              <div style={{ display:"flex",flexWrap:"wrap",gap:12,marginBottom:36,alignItems:"center" }}>
                <GoogleBtn onClick={loginWithGoogle} label="Continue with Google" big={true}/>
                <motion.a href="#" whileHover={{ scale:1.03,background:"rgba(255,255,255,0.05)" }} whileTap={{ scale:0.97 }}
                  style={{ display:"flex",alignItems:"center",gap:8,padding:"14px 22px",borderRadius:14,border:`1px solid ${T.bdr}`,color:T.t2,fontSize:14,fontWeight:500,background:"transparent",transition:"all 0.25s" }}>
                  Explore Projects <ArrowRight size={15}/>
                </motion.a>
              </div>

              {/* Social proof */}
              <div style={{ display:"flex",alignItems:"center",gap:12,flexWrap:"wrap" }}>
                <div style={{ display:"flex" }}>
                  {[T.v,T.b,T.p,T.g,T.o].map((c,i)=>(
                    <div key={i} style={{ width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg,${c},${c}88)`,border:`2px solid ${T.bg}`,marginLeft:i?-9:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"#fff" }}>
                      {"MARKYD"[i]}
                    </div>
                  ))}
                </div>
                <span style={{ fontSize:13,color:T.t3 }}>
                  <span style={{ color:T.t2,fontWeight:600 }}>+247</span> joined this week
                </span>
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity:0,scale:0.88,y:28 }}
              animate={{ opacity:1,scale:1,y:0 }}
              transition={{ duration:0.75,delay:0.18,ease:[0.22,1,0.36,1] }}
              className="float"
              style={{ display:"flex",flexDirection:"column",alignItems:"center" }}
            >
              <SwipeStack/>
              <p style={{ marginTop:76,fontSize:11,color:T.t3,letterSpacing:"0.14em",textTransform:"uppercase" }}>← drag to skip · drag to build →</p>
            </motion.div>
          </div>
        </div>

        <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity,duration:2 }}
          style={{ position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",color:T.t3,zIndex:2 }}>
          <ChevronDown size={20}/>
        </motion.div>
      </section>

      {/* ════ MARQUEE ════ */}
      <div style={{ borderTop:`1px solid ${T.bdr}`,borderBottom:`1px solid ${T.bdr}`,padding:"36px 0",position:"relative",zIndex:2,background:T.surf }}>
        <MarqueeStrip/>
      </div>

      {/* ════ HOW IT WORKS ════ */}
      <section style={{ padding:"96px 24px",maxWidth:1100,margin:"0 auto",position:"relative",zIndex:2 }}>
        <motion.div initial={{ opacity:0,y:22 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
          style={{ textAlign:"center",marginBottom:60 }}>
          <p style={{ fontSize:10,letterSpacing:"0.3em",color:T.v,textTransform:"uppercase",fontWeight:700,marginBottom:14 }}>Simple as swiping</p>
          <h2 style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(28px,4vw,50px)",color:T.t1,lineHeight:1.1 }}>
            From idea to team<br/>in 3 steps.
          </h2>
        </motion.div>

        <div className="steps-wrap" style={{ position:"relative" }}>
          {/* connector */}
          <div style={{ position:"absolute",top:46,left:"22%",right:"22%",height:1,background:`linear-gradient(90deg,${T.p}55,${T.v}55,${T.b}55)`,zIndex:0,display:"none" }}/>

          {STEPS.map((s,i)=>(
            <motion.div key={i}
              initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:i*0.13 }}
              whileHover={{ y:-7,boxShadow:`0 0 50px ${s.color}18,0 24px 60px rgba(0,0,0,0.45)` }}
              style={{ background:T.card,border:`1px solid ${T.bdr}`,borderRadius:20,padding:32,position:"relative",zIndex:1,boxShadow:"0 16px 48px rgba(0,0,0,0.35)",transition:"all 0.35s ease" }}
            >
              <div style={{ width:50,height:50,borderRadius:15,marginBottom:20,background:`${s.color}18`,border:`1px solid ${s.color}30`,color:s.color,display:"flex",alignItems:"center",justifyContent:"center" }}>{s.icon}</div>
              <div style={{ fontSize:11,color:T.t3,fontFamily:"monospace",marginBottom:8,letterSpacing:"0.05em" }}>{s.n}</div>
              <div style={{ fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:T.t1,marginBottom:12 }}>{s.label}</div>
              <div style={{ fontSize:14,color:T.t2,lineHeight:1.75 }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════ BENTO FEATURES ════ */}
      <section style={{ padding:"70px 24px 96px",background:T.surf,borderTop:`1px solid ${T.bdr}`,borderBottom:`1px solid ${T.bdr}`,position:"relative",zIndex:2 }}>
        <div style={{ maxWidth:1040,margin:"0 auto" }}>
          <motion.div initial={{ opacity:0,y:22 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
            style={{ textAlign:"center",marginBottom:52 }}>
            <p style={{ fontSize:10,letterSpacing:"0.3em",color:T.b,textTransform:"uppercase",fontWeight:700,marginBottom:14 }}>Why AlgoCrush</p>
            <h2 style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(28px,4vw,50px)",color:T.t1,lineHeight:1.1 }}>
              Built for builders,<br/>not browsers.
            </h2>
          </motion.div>

          <div className="bento-wrap">
            {BENTO.map((f,i)=>(
              <div key={f.id}
                className={`${f.size==="wide"?"bento-wide":""} ${f.size==="tall"?"bento-tall":""}`}
              >
                <BentoCard f={f} delay={i*0.07}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ SOCIAL PROOF ════ */}
      <section style={{ padding:"96px 24px",maxWidth:1040,margin:"0 auto",position:"relative",zIndex:2 }}>
        <motion.div initial={{ opacity:0,y:22 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
          style={{ textAlign:"center",marginBottom:52 }}>
          <h2 style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(28px,4vw,50px)",color:T.t1,marginBottom:8 }}>
            Join <span className="grad-text">10,000+</span> developers
          </h2>
          <p style={{ color:T.t2,fontSize:17 }}>building cool stuff together.</p>
        </motion.div>

        {/* Stats */}
        <div className="stats-wrap" style={{ marginBottom:68 }}>
          {[
            { n:10000,suf:"+",label:"Builders"       },
            { n:3200, suf:"", label:"Projects Posted" },
            { n:840,  suf:"+",label:"Teams Formed"   },
            { n:48,   suf:"h",label:"Avg. First Match"},
          ].map((s,i)=>(
            <motion.div key={i}
              initial={{ opacity:0,scale:0.85 }} whileInView={{ opacity:1,scale:1 }} viewport={{ once:true }} transition={{ delay:i*0.09 }}
              style={{ textAlign:"center" }}>
              <div className="grad-text" style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(30px,4vw,46px)" }}>
                <StatCount to={s.n} suf={s.suf}/>
              </div>
              <div style={{ color:T.t3,fontSize:13,marginTop:5 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="testi-wrap">
          {TESTI.map((t,i)=>(
            <motion.div key={i}
              initial={{ opacity:0,y:22 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:i*0.09 }}
              whileHover={{ y:-5,borderColor:`${t.color}35` }}
              style={{ padding:28,borderRadius:20,background:T.card,border:`1px solid ${T.bdr}`,boxShadow:"0 16px 48px rgba(0,0,0,0.32)",transition:"all 0.3s" }}
            >
              <div style={{ display:"flex",gap:3,marginBottom:16 }}>
                {[...Array(5)].map((_,j)=><Star key={j} size={13} style={{ color:"#fbbf24",fill:"#fbbf24" }}/>)}
              </div>
              <p style={{ fontSize:14,color:T.t2,lineHeight:1.75,marginBottom:20 }}>"{t.text}"</p>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <div style={{ width:34,height:34,borderRadius:"50%",background:`linear-gradient(135deg,${t.color},${t.color}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"#fff",flexShrink:0 }}>{t.av}</div>
                <div>
                  <div style={{ fontSize:14,fontWeight:600,color:T.t1 }}>{t.name}</div>
                  <div style={{ fontSize:12,color:T.t3 }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════ SHOWCASE ════ */}
      <section style={{ padding:"56px 24px 96px",background:T.surf,borderTop:`1px solid ${T.bdr}`,position:"relative",zIndex:2 }}>
        <div style={{ maxWidth:1040,margin:"0 auto" }}>
          <motion.div initial={{ opacity:0,y:22 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
            style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:44,flexWrap:"wrap",gap:16 }}>
            <div>
              <p style={{ fontSize:10,letterSpacing:"0.3em",color:T.p,textTransform:"uppercase",fontWeight:700,marginBottom:12 }}>Live on the platform</p>
              <h2 style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(24px,3.5vw,44px)",color:T.t1,lineHeight:1.1 }}>
                Projects waiting<br/>for someone like you.
              </h2>
            </div>
            <motion.a href="#" whileHover={{ scale:1.04 }} style={{ display:"flex",alignItems:"center",gap:7,color:T.v,fontSize:14,fontWeight:600 }}>
              See all projects <ArrowRight size={15}/>
            </motion.a>
          </motion.div>

          <div className="showcase-wrap">
            {SHOWCASE.map((c,i)=>(
              <motion.div key={i}
                initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                whileHover={{ y:-8,boxShadow:`0 0 60px ${c.glow}18,0 28px 64px rgba(0,0,0,0.5)` }}
                style={{ background:T.card,borderRadius:20,padding:28,border:`1px solid ${T.bdr}`,boxShadow:"0 16px 48px rgba(0,0,0,0.32)",cursor:"pointer",position:"relative",overflow:"hidden",transition:"all 0.35s ease" }}
              >
                <div style={{ position:"absolute",top:-32,right:-32,width:110,height:110,borderRadius:"50%",background:c.glow,opacity:0.07,filter:"blur(32px)",pointerEvents:"none" }}/>
                <div style={{ fontSize:34,marginBottom:14 }}>{c.emoji}</div>
                <div style={{ fontFamily:"'Syne',sans-serif",fontSize:19,fontWeight:800,color:T.t1,marginBottom:8 }}>{c.title}</div>
                <div style={{ fontSize:13.5,color:T.t2,lineHeight:1.72,marginBottom:18 }}>{c.desc}</div>
                <div style={{ marginBottom:12 }}>
                  <div style={{ fontSize:9,color:T.t3,letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:7 }}>Stack</div>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
                    {c.stack.map(s=><span key={s} style={{ fontSize:10,padding:"2px 9px",borderRadius:999,background:"rgba(255,255,255,0.05)",color:T.t2,border:`1px solid ${T.bdr}` }}>{s}</span>)}
                  </div>
                </div>
                <div style={{ marginBottom:18 }}>
                  <div style={{ fontSize:9,color:T.t3,letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:7 }}>Roles Needed</div>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
                    {c.roles.map(r=><span key={r} style={{ fontSize:10,padding:"2px 9px",borderRadius:999,border:`1px solid ${c.glow}45`,color:c.glow }}>{r}</span>)}
                  </div>
                </div>
                <motion.button whileHover={{ background:"rgba(255,255,255,0.06)" }} whileTap={{ scale:0.97 }}
                  style={{ width:"100%",padding:"10px",borderRadius:11,border:`1px solid ${T.bdr}`,background:"transparent",color:T.t2,fontSize:13,fontWeight:500,cursor:"pointer",transition:"background 0.2s" }}>
                  I want to build this →
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ FINAL CTA ════ */}
      <section style={{ padding:"120px 24px",position:"relative",zIndex:2,overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none" }}>
          <div style={{ width:800,height:800,borderRadius:"50%",background:"radial-gradient(circle,rgba(124,106,255,0.11),rgba(56,189,248,0.06) 50%,transparent 70%)" }}/>
        </div>
        <motion.div initial={{ opacity:0,y:36 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
          style={{ maxWidth:660,margin:"0 auto",textAlign:"center",position:"relative",zIndex:2 }}>
          <h2 style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(32px, 6vw, 74px)",color:T.t1,lineHeight:1.06,marginBottom:20 }}>
            Stop scrolling.<br/><span className="grad-text">Start&nbsp;building.</span>
          </h2>
          <p style={{ fontSize:17,color:T.t2,marginBottom:40,lineHeight:1.75 }}>
            Your next co-founder is a swipe away.<br/>Your next shipped project starts today.
          </p>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:12 }}>
            <GoogleBtn onClick={loginWithGoogle} label="Join AlgoCrush — it's free" big={true}/>
            <span style={{ fontSize:12,color:T.t3 }}>No credit card · No resume · Just build</span>
          </div>
          <div style={{ marginTop:56,paddingTop:40,borderTop:`1px solid ${T.bdr}` }}>
            <div style={{ fontSize:11,color:T.t3,marginBottom:18,letterSpacing:"0.12em",textTransform:"uppercase" }}>Builders from</div>
            <div style={{ display:"flex",justifyContent:"center",flexWrap:"wrap",gap:24 }}>
              {["MIT","Stanford","Y Combinator","Google","Stripe","Vercel"].map(org=>(
                <span key={org} style={{ fontSize:13,color:T.t3,fontWeight:700 }}>{org}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer style={{ borderTop:`1px solid ${T.bdr}`,padding:"32px 24px",position:"relative",zIndex:2 }}>
        <div style={{ maxWidth:1040,margin:"0 auto",display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"center",gap:20 }}>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <div style={{ width:26,height:26,borderRadius:8,background:"linear-gradient(135deg,#7c6aff,#f471b5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"#fff" }}>A</div>
            <span style={{ fontFamily:"'Syne',sans-serif",fontWeight:700,color:T.t2,fontSize:14 }}>AlgoCrush</span>
            <span style={{ color:T.t3,fontSize:12 }}>© 2025</span>
          </div>
          <div style={{ display:"flex",gap:24,flexWrap:"wrap" }}>
            {["About","Privacy","Terms","Contact","Blog"].map(l=>(
              <a key={l} href="#" style={{ fontSize:13,color:T.t3,transition:"color 0.2s" }}
                 onMouseOver={e=>e.target.style.color=T.t2}
                 onMouseOut={e=>e.target.style.color=T.t3}>{l}</a>
            ))}
          </div>
          <div style={{ display:"flex",gap:8 }}>
            {[Globe,Terminal].map((Icon,i)=>(
              <motion.a key={i} href="#" whileHover={{ scale:1.15,borderColor:`${T.v}55` }}
                style={{ width:32,height:32,borderRadius:9,border:`1px solid ${T.bdr}`,display:"flex",alignItems:"center",justifyContent:"center",color:T.t3 }}>
                <Icon size={14}/>
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
