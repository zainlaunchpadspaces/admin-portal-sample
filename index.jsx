import { useState } from "react";

const Y = "#FFE000";
const BK = "#0a0a0a";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Barlow',sans-serif;background:#0a0a0a;color:#fff}
  :root{--y:#FFE000;--bk:#0a0a0a;--dk:#111111;--bd:#1e1e1e;--mu:#666}
  .app{min-height:100vh;background:var(--bk)}
  .layout{display:flex;min-height:100vh}
  .sidebar{width:230px;background:var(--dk);border-right:1px solid var(--bd);display:flex;flex-direction:column;position:fixed;top:0;left:0;height:100vh;z-index:100}
  .logo-brand{font-family:'Barlow Condensed',sans-serif;font-size:48px;font-weight:900;color:#FFE000;line-height:1;letter-spacing:-1px;font-style:italic;text-transform:uppercase}
  .logo-tag{font-size:10px;font-weight:700;letter-spacing:5px;color:#555;text-transform:uppercase;margin-top:3px}
  .sb-logo{padding:18px 18px 14px;border-bottom:1px solid var(--bd)}
  .sb-nav{flex:1;padding:14px 0;overflow-y:auto}
  .nav-sec{padding:0 10px;margin-bottom:2px}
  .nav-lbl{font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#333;padding:6px 8px 3px}
  .nav-item{display:flex;align-items:center;gap:9px;padding:9px 8px;border-radius:3px;cursor:pointer;font-size:13px;font-weight:600;color:#555;transition:all .15s;margin-bottom:1px}
  .nav-item:hover{background:#1a1a1a;color:#fff}
  .nav-item.on{background:rgba(255,224,0,.08);color:var(--y)}
  .alert-dot{width:6px;height:6px;background:#ff4444;border-radius:50%;margin-left:auto}
  .sb-user{padding:14px 18px;border-top:1px solid var(--bd);display:flex;align-items:center;gap:10px}
  .avatar{width:32px;height:32px;border-radius:50%;background:var(--y);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:900;color:var(--bk);flex-shrink:0;overflow:hidden}
  .avatar img{width:100%;height:100%;object-fit:cover}
  .u-name{font-size:13px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .u-role{font-size:10px;color:#444}
  .main{margin-left:230px;flex:1}
  .topbar{background:var(--dk);border-bottom:1px solid var(--bd);padding:14px 28px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50}
  .pg-title{font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:800;letter-spacing:.5px}
  .content{padding:28px}
  .card{background:var(--dk);border:1px solid var(--bd);border-radius:4px;padding:22px;margin-bottom:18px}
  .ct{font-family:'Barlow Condensed',sans-serif;font-size:17px;font-weight:800;margin-bottom:14px;letter-spacing:.5px}
  .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;margin-bottom:20px}
  .sc{background:var(--dk);border:1px solid var(--bd);border-radius:4px;padding:18px;position:relative;overflow:hidden}
  .sc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--y)}
  .sl{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#444;margin-bottom:6px}
  .sv{font-family:'Barlow Condensed',sans-serif;font-size:32px;font-weight:900;color:var(--y);line-height:1}
  .ss{font-size:11px;color:#444;margin-top:3px}
  .badge{display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:2px;font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase}
  .b-online{background:rgba(0,230,118,.12);color:#00e676}
  .b-offline{background:rgba(255,60,60,.12);color:#ff4444}
  .b-paid{background:rgba(0,230,118,.12);color:#00e676}
  .b-unpaid{background:rgba(255,224,0,.12);color:var(--y)}
  .b-open{background:rgba(255,224,0,.12);color:var(--y)}
  .b-closed{background:rgba(80,80,80,.2);color:#555}
  .b-active{background:rgba(0,230,118,.12);color:#00e676}
  .b-inactive{background:rgba(80,80,80,.2);color:#555}
  .b-high{background:rgba(255,60,60,.12);color:#ff6b6b}
  .b-medium{background:rgba(255,224,0,.12);color:var(--y)}
  .b-low{background:rgba(80,80,80,.2);color:#555}
  .tw{overflow-x:auto}
  table{width:100%;border-collapse:collapse;font-size:13px}
  th{text-align:left;padding:9px 13px;font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#444;border-bottom:1px solid var(--bd)}
  td{padding:12px 13px;border-bottom:1px solid #0f0f0f;color:#aaa}
  tr:hover td{background:#0d0d0d}
  tr:last-child td{border-bottom:none}
  .rg{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
  .rc{background:#0e0e0e;border:1px solid var(--bd);border-radius:4px;padding:16px}
  .rc.online{border-left:3px solid #00e676}
  .rc.offline{border-left:3px solid #ff4444;background:rgba(255,60,60,.02)}
  .rn{font-family:'Barlow Condensed',sans-serif;font-size:15px;font-weight:800;margin-bottom:2px}
  .rip{font-size:11px;color:#444;font-family:monospace;margin-bottom:8px}
  .rmeta{display:flex;gap:12px;font-size:11px;color:#555;flex-wrap:wrap}
  .pulse{width:7px;height:7px;border-radius:50%;background:#00e676;display:inline-block;margin-right:5px;animation:p 2s infinite}
  .pulse.off{background:#ff4444;animation:none}
  @keyframes p{0%{box-shadow:0 0 0 0 rgba(0,230,118,.4)}70%{box-shadow:0 0 0 7px rgba(0,230,118,0)}100%{box-shadow:0 0 0 0 rgba(0,230,118,0)}}
  .mo{position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px}
  .md{background:var(--dk);border:1px solid #252525;border-radius:4px;padding:28px;width:100%;max-width:480px;max-height:90vh;overflow-y:auto}
  .md-title{font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:800;margin-bottom:18px}
  .ma{display:flex;gap:8px;margin-top:20px;justify-content:flex-end}
  .fg{margin-bottom:14px}
  .fl{display:block;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#555;margin-bottom:5px}
  .fi{width:100%;background:#0d0d0d;border:1px solid #1e1e1e;border-radius:3px;padding:11px 13px;color:#fff;font-size:14px;font-family:'Barlow',sans-serif;transition:border-color .2s}
  .fi:focus{outline:none;border-color:var(--y)}
  .fi::placeholder{color:#333}
  .fi option{background:#111}
  .btn-y{width:100%;background:var(--y);color:var(--bk);border:none;padding:13px;font-family:'Barlow Condensed',sans-serif;font-size:15px;font-weight:900;letter-spacing:1px;text-transform:uppercase;cursor:pointer;border-radius:3px;transition:opacity .2s}
  .btn-y:hover{opacity:.88}
  .btn-out{background:transparent;color:var(--y);border:1px solid var(--y);padding:9px 18px;font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;cursor:pointer;border-radius:3px;transition:all .2s}
  .btn-out:hover{background:var(--y);color:var(--bk)}
  .btn-ghost{background:transparent;color:#666;border:1px solid #2a2a2a;padding:9px 18px;font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;cursor:pointer;border-radius:3px;transition:all .2s}
  .btn-ghost:hover{border-color:#555;color:#fff}
  .btn-danger{background:transparent;color:#ff4444;border:1px solid #ff4444;padding:9px 18px;font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;cursor:pointer;border-radius:3px;transition:all .2s}
  .btn-danger:hover{background:#ff4444;color:#fff}
  .err{background:rgba(255,60,60,.08);border:1px solid rgba(255,60,60,.25);border-radius:3px;padding:9px 13px;font-size:13px;color:#ff6b6b;margin-bottom:14px}
  .ok{background:rgba(0,230,118,.08);border:1px solid rgba(0,230,118,.25);border-radius:3px;padding:9px 13px;font-size:13px;color:#00e676;margin-bottom:14px}
  .sg{display:grid;grid-template-columns:180px 1fr;gap:20px}
  .sn{display:flex;flex-direction:column;gap:2px}
  .sni{padding:9px 12px;border-radius:3px;cursor:pointer;font-size:13px;font-weight:600;color:#555;transition:all .15s}
  .sni:hover{background:#1a1a1a;color:#fff}
  .sni.on{background:rgba(255,224,0,.08);color:var(--y)}
  .av-up{display:flex;align-items:center;gap:18px;margin-bottom:22px}
  .av-lg{width:72px;height:72px;border-radius:50%;background:var(--y);display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:900;color:var(--bk);overflow:hidden;flex-shrink:0}
  .av-lg img{width:100%;height:100%;object-fit:cover}
  .toggle{width:42px;height:22px;border-radius:11px;cursor:pointer;position:relative;transition:background .2s;flex-shrink:0}
  .toggle-dot{width:16px;height:16px;border-radius:50%;position:absolute;top:3px;transition:left .2s}
  .alert-banner{background:rgba(255,60,60,.06);border:1px solid rgba(255,60,60,.2);border-radius:4px;padding:14px 18px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between}
  .ticket-msg{padding:11px 14px;border-radius:3px;margin-bottom:8px;font-size:13px;line-height:1.65}
  .ticket-msg.client{background:rgba(255,224,0,.05);border-left:3px solid var(--y)}
  .ticket-msg.admin{background:#0e0e0e;border-left:3px solid #2a2a2a}
  .tmeta{font-size:10px;color:#444;margin-bottom:3px;font-weight:700}
`;

const mockAdmin = { id:1, name:"Admin User", email:"admin@zune.io", phone:"+1 555-9000", title:"Network Administrator", profile_picture:null };
const mockClients = [
  { id:1, company_name:"TechCorp Ltd", contact_name:"Alex Johnson", email:"alex@techcorp.com", phone:"+1 555-0100", status:"active", plan_name:"100 Mbps", price:79.99, renewal_date:"2026-04-01" },
  { id:2, company_name:"Media House", contact_name:"Sara Williams", email:"sara@mediahouse.com", phone:"+1 555-0200", status:"active", plan_name:"500 Mbps", price:119.99, renewal_date:"2026-04-01" },
  { id:3, company_name:"StartupXYZ", contact_name:"Mike Chen", email:"mike@startupxyz.com", phone:"+1 555-0300", status:"inactive", plan_name:"50 Mbps", price:59.99, renewal_date:"2026-03-01" },
];
const mockRouters = [
  { id:1, name:"TechCorp Main", ip_address:"192.168.1.1", type:"Mikrotik", location:"Downtown", status:"online", latency:12, uptime:"14d 6h", company_name:"TechCorp Ltd" },
  { id:2, name:"TechCorp Branch", ip_address:"10.0.0.1", type:"Ubiquiti", location:"North Side", status:"offline", latency:null, uptime:null, company_name:"TechCorp Ltd" },
  { id:3, name:"Media House HQ", ip_address:"172.16.0.1", type:"Cisco", location:"City Center", status:"online", latency:8, uptime:"30d 2h", company_name:"Media House" },
  { id:4, name:"Startup Office", ip_address:"10.10.0.1", type:"Mikrotik", location:"Tech Park", status:"online", latency:22, uptime:"5d 14h", company_name:"StartupXYZ" },
];
const mockInvoices = [
  { id:1, invoice_number:"INV-0012", company_name:"TechCorp Ltd", amount:79.99, status:"unpaid", due_date:"2026-03-15", description:"Monthly service — 100 Mbps" },
  { id:2, invoice_number:"INV-0011", company_name:"Media House", amount:119.99, status:"paid", due_date:"2026-03-15", description:"Monthly service — 500 Mbps" },
  { id:3, invoice_number:"INV-0010", company_name:"StartupXYZ", amount:59.99, status:"unpaid", due_date:"2026-03-10", description:"Monthly service — 50 Mbps" },
];
const mockTickets = [
  { id:1, company_name:"TechCorp Ltd", subject:"Connection dropping intermittently", status:"open", priority:"high", created_at:"2026-03-01" },
  { id:2, company_name:"Media House", subject:"Need static IP address", status:"open", priority:"medium", created_at:"2026-02-28" },
  { id:3, company_name:"StartupXYZ", subject:"Speed upgrade request", status:"closed", priority:"low", created_at:"2026-02-20" },
];
const mockMsgs = [
  { id:1, sender_type:"client", message:"My connection keeps dropping every few hours.", created_at:"2026-03-01 09:00" },
  { id:2, sender_type:"admin", message:"We have identified the issue and are working on a fix. Please restart your router in the meantime.", created_at:"2026-03-01 10:30" },
];
const mockAlerts = [
  { id:1, router_name:"TechCorp Branch", ip_address:"10.0.0.1", company_name:"TechCorp Ltd", created_at:"2026-03-04 08:12" },
];

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState(mockAdmin);

  const navItems = [
    { id:"dashboard", label:"Dashboard" },
    { id:"clients",   label:"Clients" },
    { id:"routers",   label:"Network Monitor", alert:mockAlerts.length > 0 },
    { id:"invoices",  label:"Invoices" },
    { id:"tickets",   label:"Support", alert:mockTickets.filter(t=>t.status==="open").length > 0 },
    { id:"settings",  label:"Settings" },
  ];

  return (
    <div className="app"><style>{css}</style>
      <div className="layout">
        <div className="sidebar">
          <div className="sb-logo">
            <div className="logo-brand" style={{fontSize:32}}>ZUNE</div>
            <div className="logo-tag">Fast Internet</div>
          </div>
          <div className="sb-nav">
            <div className="nav-sec">
              <div className="nav-lbl">Management</div>
              {navItems.map(n => (
                <div key={n.id} className={`nav-item${page===n.id?" on":""}`} onClick={()=>setPage(n.id)}>
                  {n.label}
                  {n.alert && <span className="alert-dot"/>}
                </div>
              ))}
            </div>
          </div>
          <div className="sb-user">
            <div className="avatar">{user?.profile_picture ? <img src={user.profile_picture} alt=""/> : user?.name?.[0]}</div>
            <div style={{flex:1,minWidth:0}}>
              <div className="u-name">{user?.name}</div>
              <div className="u-role">{user?.title || "Administrator"}</div>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="topbar">
            <div className="pg-title">{navItems.find(n=>n.id===page)?.label}</div>
            <div style={{fontSize:12,color:"#444"}}>Zune Fast Internet — Admin</div>
          </div>
          <div className="content">
            {page==="dashboard" && <PageDashboard setPage={setPage}/>}
            {page==="clients"   && <PageClients/>}
            {page==="routers"   && <PageRouters/>}
            {page==="invoices"  && <PageInvoices/>}
            {page==="tickets"   && <PageTickets/>}
            {page==="settings"  && <PageSettings user={user} setUser={setUser}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

function PageDashboard({setPage}) {
  const online = mockRouters.filter(r=>r.status==="online").length;
  const offline = mockRouters.filter(r=>r.status==="offline").length;
  const unpaidInvoices = mockInvoices.filter(i=>i.status==="unpaid");
  const openTickets = mockTickets.filter(t=>t.status==="open");
  const totalRevenue = mockInvoices.filter(i=>i.status==="paid").reduce((s,i)=>s+i.amount,0);
  return (
    <div>
      {mockAlerts.length>0 && (
        <div className="alert-banner">
          <div>
            <div style={{fontSize:14,fontWeight:700,color:"#ff4444",marginBottom:2}}>OFFLINE: {mockAlerts[0].router_name} — {mockAlerts[0].company_name}</div>
            <div style={{fontSize:12,color:"#666"}}>{mockAlerts[0].ip_address} · Detected {mockAlerts[0].created_at} · Email alert sent</div>
          </div>
          <button className="btn-danger" style={{padding:"5px 14px",fontSize:12}} onClick={()=>setPage("routers")}>View</button>
        </div>
      )}
      <div className="stats">
        <div className="sc"><div className="sl">Total Clients</div><div className="sv">{mockClients.length}</div><div className="ss">{mockClients.filter(c=>c.status==="active").length} active</div></div>
        <div className="sc"><div className="sl">Routers Online</div><div className="sv" style={{color:"#00e676"}}>{online}</div><div className="ss">{offline} offline</div></div>
        <div className="sc"><div className="sl">Open Tickets</div><div className="sv">{openTickets.length}</div><div className="ss">Needs attention</div></div>
        <div className="sc"><div className="sl">Unpaid Invoices</div><div className="sv">{unpaidInvoices.length}</div><div className="ss">${unpaidInvoices.reduce((s,i)=>s+i.amount,0).toFixed(2)} outstanding</div></div>
        <div className="sc"><div className="sl">Revenue (MTD)</div><div className="sv" style={{fontSize:22}}>${totalRevenue.toFixed(2)}</div><div className="ss">This month</div></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div className="card">
          <div className="ct">Clients</div>
          {mockClients.map(c=>(
            <div key={c.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid #0f0f0f"}}>
              <div><div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{c.company_name}</div><div style={{fontSize:11,color:"#444"}}>{c.plan_name} · ${c.price}/mo</div></div>
              <span className={`badge b-${c.status}`}>{c.status}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="ct">Network Status</div>
          {mockRouters.map(r=>(
            <div key={r.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #0f0f0f"}}>
              <div><div style={{fontSize:13,fontWeight:600,color:"#fff"}}>{r.name}</div><div style={{fontSize:11,color:"#444"}}>{r.company_name}</div></div>
              <span className={`badge b-${r.status}`}><span className={`pulse${r.status==="offline"?" off":""}`}/>{r.status}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginTop:16}}>
        <div className="card">
          <div className="ct">Recent Invoices</div>
          {mockInvoices.map(inv=>(
            <div key={inv.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid #0f0f0f"}}>
              <div><div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{inv.invoice_number} — {inv.company_name}</div><div style={{fontSize:11,color:"#444"}}>{inv.due_date}</div></div>
              <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontWeight:700,fontSize:13}}>${inv.amount}</span><span className={`badge b-${inv.status}`}>{inv.status}</span></div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="ct">Support Tickets</div>
          {mockTickets.map(t=>(
            <div key={t.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid #0f0f0f"}}>
              <div><div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{t.company_name}</div><div style={{fontSize:11,color:"#444",maxWidth:180,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.subject}</div></div>
              <div style={{display:"flex",gap:5}}><span className={`badge b-${t.priority}`}>{t.priority}</span><span className={`badge b-${t.status}`}>{t.status}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageClients() {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({company_name:"",contact_name:"",email:"",phone:"",plan_id:"3",password:""});
  const [ok, setOk] = useState(""); const [err, setErr] = useState("");
  const set = (k,v) => setForm(p=>({...p,[k]:v}));
  const save = () => {
    if(!form.company_name||!form.email){setErr("Company name and email are required");return;}
    setOk(modal==="add"?"Client added!":"Client updated!"); setTimeout(()=>{setModal(null);setOk("");setErr("");},1200);
  };
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div style={{fontSize:13,color:"#444"}}>{mockClients.length} total clients</div>
        <button className="btn-out" onClick={()=>{setForm({company_name:"",contact_name:"",email:"",phone:"",plan_id:"3",password:""});setModal("add");}}>+ Add Client</button>
      </div>
      <div className="card">
        <div className="tw">
          <table>
            <thead><tr><th>Company</th><th>Contact</th><th>Email</th><th>Plan</th><th>Renewal</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {mockClients.map(c=>(
                <tr key={c.id}>
                  <td style={{fontWeight:700,color:"#fff"}}>{c.company_name}</td>
                  <td>{c.contact_name}</td>
                  <td style={{color:"#666"}}>{c.email}</td>
                  <td>{c.plan_name} <span style={{color:"#FFE000",fontWeight:700}}>${c.price}/mo</span></td>
                  <td>{c.renewal_date}</td>
                  <td><span className={`badge b-${c.status}`}>{c.status}</span></td>
                  <td><div style={{display:"flex",gap:6}}>
                    <button className="btn-ghost" style={{padding:"4px 10px",fontSize:11}} onClick={()=>{setForm({...c,password:""});setModal("edit");}}>Edit</button>
                    <button className="btn-danger" style={{padding:"4px 10px",fontSize:11}}>Delete</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal && (
        <div className="mo" onClick={()=>setModal(null)}>
          <div className="md" onClick={e=>e.stopPropagation()}>
            <div className="md-title">{modal==="add"?"Add New Client":"Edit Client"}</div>
            {ok&&<div className="ok">{ok}</div>}{err&&<div className="err">{err}</div>}
            <div className="fg"><label className="fl">Company Name</label><input className="fi" value={form.company_name} onChange={e=>set("company_name",e.target.value)} placeholder="TechCorp Ltd"/></div>
            <div className="fg"><label className="fl">Contact Name</label><input className="fi" value={form.contact_name} onChange={e=>set("contact_name",e.target.value)} placeholder="John Smith"/></div>
            <div className="fg"><label className="fl">Email</label><input className="fi" type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="john@company.com"/></div>
            <div className="fg"><label className="fl">Phone</label><input className="fi" value={form.phone} onChange={e=>set("phone",e.target.value)} placeholder="+1 555-0100"/></div>
            <div className="fg"><label className="fl">Plan</label>
              <select className="fi" value={form.plan_id} onChange={e=>set("plan_id",e.target.value)}>
                <option value="1">10 Mbps — $39.99/mo</option>
                <option value="2">50 Mbps — $59.99/mo</option>
                <option value="3">100 Mbps — $79.99/mo</option>
                <option value="4">500 Mbps — $119.99/mo</option>
                <option value="5">1 Gbps — $159.99/mo</option>
              </select>
            </div>
            {modal==="add"&&<div className="fg"><label className="fl">Temp Password</label><input className="fi" type="password" value={form.password} onChange={e=>set("password",e.target.value)} placeholder="••••••••"/></div>}
            <div className="ma">
              <button className="btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
              <button className="btn-y" style={{width:"auto",padding:"9px 22px"}} onClick={save}>{modal==="add"?"Add Client":"Save Changes"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PageRouters() {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({client_id:"1",name:"",ip_address:"",type:"Mikrotik",location:"",snmp_community:"public"});
  const set = (k,v) => setForm(p=>({...p,[k]:v}));
  const online = mockRouters.filter(r=>r.status==="online").length;
  const offline = mockRouters.filter(r=>r.status==="offline").length;
  return (
    <div>
      {mockAlerts.map(a=>(
        <div key={a.id} className="alert-banner">
          <div>
            <div style={{fontSize:14,fontWeight:700,color:"#ff4444",marginBottom:2}}>OFFLINE: {a.router_name}</div>
            <div style={{fontSize:12,color:"#666"}}>{a.company_name} · {a.ip_address} · Since {a.created_at}</div>
          </div>
          <button className="btn-danger" style={{padding:"5px 14px",fontSize:12}}>Resolve</button>
        </div>
      ))}
      <div className="stats">
        <div className="sc"><div className="sl">Total Routers</div><div className="sv">{mockRouters.length}</div></div>
        <div className="sc"><div className="sl">Online</div><div className="sv" style={{color:"#00e676"}}>{online}</div></div>
        <div className="sc"><div className="sl">Offline</div><div className="sv" style={{color:offline>0?"#ff4444":"#FFE000"}}>{offline}</div></div>
        <div className="sc"><div className="sl">Uptime Rate</div><div className="sv">{Math.round(online/mockRouters.length*100)}%</div></div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{fontSize:13,color:"#444"}}>SNMP monitoring every 2 minutes</div>
        <button className="btn-out" onClick={()=>setModal(true)}>+ Add Router</button>
      </div>
      <div className="rg">
        {mockRouters.map(r=>(
          <div key={r.id} className={`rc ${r.status}`}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div><div className="rn">{r.name}</div><div className="rip">{r.ip_address}</div></div>
              <span className={`badge b-${r.status}`}><span className={`pulse${r.status==="offline"?" off":""}`}/>{r.status}</span>
            </div>
            <div className="rmeta"><span>{r.company_name}</span></div>
            <div className="rmeta" style={{marginTop:4}}><span>{r.location}</span><span>{r.type}</span></div>
            {r.status==="online"&&<div className="rmeta" style={{marginTop:4}}><span>{r.latency}ms</span><span>Up {r.uptime}</span></div>}
            {r.status==="offline"&&<div style={{marginTop:6,fontSize:11,color:"#ff4444"}}>Unreachable · Alert sent</div>}
            <div style={{marginTop:10,display:"flex",gap:6}}>
              <button className="btn-ghost" style={{padding:"4px 10px",fontSize:11}}>Edit</button>
              <button className="btn-danger" style={{padding:"4px 10px",fontSize:11}}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      {modal&&(
        <div className="mo" onClick={()=>setModal(false)}>
          <div className="md" onClick={e=>e.stopPropagation()}>
            <div className="md-title">Add Router</div>
            <div className="fg"><label className="fl">Client</label>
              <select className="fi" value={form.client_id} onChange={e=>set("client_id",e.target.value)}>
                {mockClients.map(c=><option key={c.id} value={c.id}>{c.company_name}</option>)}
              </select>
            </div>
            <div className="fg"><label className="fl">Router Name</label><input className="fi" value={form.name} onChange={e=>set("name",e.target.value)} placeholder="Main Office Router"/></div>
            <div className="fg"><label className="fl">IP Address</label><input className="fi" value={form.ip_address} onChange={e=>set("ip_address",e.target.value)} placeholder="192.168.1.1"/></div>
            <div className="fg"><label className="fl">Type</label>
              <select className="fi" value={form.type} onChange={e=>set("type",e.target.value)}>
                <option>Mikrotik</option><option>Cisco</option><option>Ubiquiti</option><option>Other</option>
              </select>
            </div>
            <div className="fg"><label className="fl">Location</label><input className="fi" value={form.location} onChange={e=>set("location",e.target.value)} placeholder="Downtown Office"/></div>
            <div className="fg"><label className="fl">SNMP Community</label><input className="fi" value={form.snmp_community} onChange={e=>set("snmp_community",e.target.value)} placeholder="public"/></div>
            <div className="ma">
              <button className="btn-ghost" onClick={()=>setModal(false)}>Cancel</button>
              <button className="btn-y" style={{width:"auto",padding:"9px 22px"}} onClick={()=>setModal(false)}>Add Router</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PageInvoices() {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({client_id:"1",amount:"",due_date:"",description:""});
  const set = (k,v) => setForm(p=>({...p,[k]:v}));
  const total = mockInvoices.reduce((s,i)=>s+i.amount,0);
  const paid = mockInvoices.filter(i=>i.status==="paid").reduce((s,i)=>s+i.amount,0);
  return (
    <div>
      <div className="stats">
        <div className="sc"><div className="sl">Total Billed</div><div className="sv" style={{fontSize:22}}>${total.toFixed(2)}</div></div>
        <div className="sc"><div className="sl">Collected</div><div className="sv" style={{fontSize:22,color:"#00e676"}}>${paid.toFixed(2)}</div></div>
        <div className="sc"><div className="sl">Outstanding</div><div className="sv" style={{fontSize:22,color:"#FFE000"}}>${(total-paid).toFixed(2)}</div></div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{fontSize:13,color:"#444"}}>Auto-generates on 1st of each month</div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn-ghost" style={{padding:"7px 14px",fontSize:12}}>Generate Monthly</button>
          <button className="btn-out" onClick={()=>setModal(true)}>+ New Invoice</button>
        </div>
      </div>
      <div className="card">
        <div className="tw">
          <table>
            <thead><tr><th>Invoice</th><th>Client</th><th>Description</th><th>Amount</th><th>Due Date</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {mockInvoices.map(inv=>(
                <tr key={inv.id}>
                  <td style={{fontWeight:700,color:"#fff"}}>{inv.invoice_number}</td>
                  <td>{inv.company_name}</td>
                  <td style={{color:"#666"}}>{inv.description}</td>
                  <td style={{fontWeight:700,color:"#fff"}}>${inv.amount}</td>
                  <td>{inv.due_date}</td>
                  <td><span className={`badge b-${inv.status}`}>{inv.status}</span></td>
                  <td><div style={{display:"flex",gap:6}}>
                    {inv.status==="unpaid"&&<button className="btn-out" style={{padding:"4px 10px",fontSize:11}}>Mark Paid</button>}
                    <button className="btn-danger" style={{padding:"4px 10px",fontSize:11}}>Delete</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal&&(
        <div className="mo" onClick={()=>setModal(false)}>
          <div className="md" onClick={e=>e.stopPropagation()}>
            <div className="md-title">Create Invoice</div>
            <div className="fg"><label className="fl">Client</label>
              <select className="fi" value={form.client_id} onChange={e=>set("client_id",e.target.value)}>
                {mockClients.map(c=><option key={c.id} value={c.id}>{c.company_name}</option>)}
              </select>
            </div>
            <div className="fg"><label className="fl">Amount ($)</label><input className="fi" type="number" value={form.amount} onChange={e=>set("amount",e.target.value)} placeholder="79.99"/></div>
            <div className="fg"><label className="fl">Due Date</label><input className="fi" type="date" value={form.due_date} onChange={e=>set("due_date",e.target.value)}/></div>
            <div className="fg"><label className="fl">Description</label><input className="fi" value={form.description} onChange={e=>set("description",e.target.value)} placeholder="Monthly service — 100 Mbps"/></div>
            <div className="ma">
              <button className="btn-ghost" onClick={()=>setModal(false)}>Cancel</button>
              <button className="btn-y" style={{width:"auto",padding:"9px 22px"}} onClick={()=>setModal(false)}>Create Invoice</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PageTickets() {
  const [view, setView] = useState("list");
  const [sel, setSel] = useState(null);
  const [reply, setReply] = useState("");
  const open = mockTickets.filter(t=>t.status==="open").length;
  if (view==="detail"&&sel) return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:22}}>
        <button className="btn-ghost" onClick={()=>setView("list")}>← Back</button>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:800}}>{sel.subject}</div>
        <span className={`badge b-${sel.status}`}>{sel.status}</span>
        <span className={`badge b-${sel.priority}`}>{sel.priority}</span>
      </div>
      <div style={{fontSize:13,color:"#444",marginBottom:14}}>Client: <strong style={{color:"#fff"}}>{sel.company_name}</strong> · Opened: {sel.created_at}</div>
      <div className="card">
        {mockMsgs.map(m=>(
          <div key={m.id} className={`ticket-msg ${m.sender_type}`}>
            <div className="tmeta">{m.sender_type==="client"?sel.company_name:"Zune Support"} · {m.created_at}</div>
            {m.message}
          </div>
        ))}
        {sel.status==="open"&&(
          <div style={{marginTop:14}}>
            <textarea className="fi" rows={3} placeholder="Type your reply..." value={reply} onChange={e=>setReply(e.target.value)} style={{resize:"vertical",width:"100%"}}/>
            <div style={{marginTop:8,display:"flex",gap:8,justifyContent:"flex-end"}}>
              <button className="btn-ghost">Close Ticket</button>
              <button className="btn-y" style={{width:"auto",padding:"9px 22px"}} onClick={()=>setReply("")}>Send Reply</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  return (
    <div>
      <div className="stats">
        <div className="sc"><div className="sl">Open</div><div className="sv" style={{color:open>0?"#ff6b6b":"#FFE000"}}>{open}</div></div>
        <div className="sc"><div className="sl">Closed</div><div className="sv">{mockTickets.filter(t=>t.status==="closed").length}</div></div>
        <div className="sc"><div className="sl">Total</div><div className="sv">{mockTickets.length}</div></div>
      </div>
      <div className="card">
        <div className="tw">
          <table>
            <thead><tr><th>Client</th><th>Subject</th><th>Priority</th><th>Status</th><th>Created</th><th></th></tr></thead>
            <tbody>
              {mockTickets.map(t=>(
                <tr key={t.id}>
                  <td style={{fontWeight:700,color:"#fff"}}>{t.company_name}</td>
                  <td>{t.subject}</td>
                  <td><span className={`badge b-${t.priority}`}>{t.priority}</span></td>
                  <td><span className={`badge b-${t.status}`}>{t.status}</span></td>
                  <td>{t.created_at}</td>
                  <td><button className="btn-ghost" style={{padding:"4px 10px",fontSize:11}} onClick={()=>{setSel(t);setView("detail");}}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PageSettings({user, setUser}) {
  const [tab, setTab] = useState("profile");
  const [name, setName] = useState(user?.name||"");
  const [email, setEmail] = useState(user?.email||"");
  const [phone, setPhone] = useState(user?.phone||"");
  const [title, setTitle] = useState(user?.title||"");
  const [cpw,setCpw]=useState(""); const [npw,setNpw]=useState(""); const [cpw2,setCpw2]=useState("");
  const [ok,setOk]=useState(""); const [err,setErr]=useState("");
  const [avatar,setAvatar]=useState(user?.profile_picture||null);
  const [toggles,setToggles]=useState([true,true,true,false]);
  const show=(msg,isErr=false)=>{isErr?setErr(msg):setOk(msg);setTimeout(()=>{setOk("");setErr("");},3000);};
  const saveProfile=()=>{setUser(u=>({...u,name,email,phone,title}));show("Profile updated successfully");};
  const changePw=()=>{
    if(!cpw||!npw||!cpw2){show("Fill in all fields",true);return;}
    if(npw!==cpw2){show("Passwords do not match",true);return;}
    if(npw.length<8){show("Min 8 characters",true);return;}
    show("Password changed");setCpw("");setNpw("");setCpw2("");
  };
  const handleAvatar=(e)=>{const f=e.target.files[0];if(f){const r=new FileReader();r.onload=()=>{setAvatar(r.result);setUser(u=>({...u,profile_picture:r.result}));};r.readAsDataURL(f);}};
  const tabs=[{id:"profile",label:"Profile"},{id:"password",label:"Password"},{id:"system",label:"System"}];
  const systemSettings=["Email alerts for offline routers","Auto-generate monthly invoices","SNMP monitoring (every 2 min)","Client invoice email notifications"];
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"180px 1fr",gap:20}}>
        <div style={{display:"flex",flexDirection:"column",gap:2}}>
          {tabs.map(t=><div key={t.id} className={`sni${tab===t.id?" on":""}`} onClick={()=>{setTab(t.id);setOk("");setErr("");}}>{t.label}</div>)}
        </div>
        <div>
          {ok&&<div className="ok">{ok}</div>}{err&&<div className="err">{err}</div>}
          {tab==="profile"&&(
            <div className="card">
              <div className="ct">Admin Profile</div>
              <div style={{display:"flex",alignItems:"center",gap:18,marginBottom:22}}>
                <div className="av-lg">{avatar?<img src={avatar} alt=""/>:name?.[0]}</div>
                <div>
                  <label className="btn-out" style={{display:"inline-block",cursor:"pointer",padding:"7px 14px",fontSize:12}}>Upload Photo<input type="file" accept="image/*" style={{display:"none"}} onChange={handleAvatar}/></label>
                  <div style={{fontSize:11,color:"#444",marginTop:5}}>JPG, PNG up to 5MB</div>
                </div>
              </div>
              <div className="fg"><label className="fl">Full Name</label><input className="fi" value={name} onChange={e=>setName(e.target.value)}/></div>
              <div className="fg"><label className="fl">Email</label><input className="fi" type="email" value={email} onChange={e=>setEmail(e.target.value)}/></div>
              <div className="fg"><label className="fl">Phone</label><input className="fi" value={phone} onChange={e=>setPhone(e.target.value)}/></div>
              <div className="fg"><label className="fl">Title</label><input className="fi" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Network Administrator"/></div>
              <button className="btn-y" onClick={saveProfile} style={{maxWidth:180}}>Save Changes</button>
            </div>
          )}
          {tab==="password"&&(
            <div className="card">
              <div className="ct">Change Password</div>
              <div className="fg"><label className="fl">Current Password</label><input className="fi" type="password" value={cpw} onChange={e=>setCpw(e.target.value)}/></div>
              <div className="fg"><label className="fl">New Password</label><input className="fi" type="password" value={npw} onChange={e=>setNpw(e.target.value)}/></div>
              <div className="fg"><label className="fl">Confirm New Password</label><input className="fi" type="password" value={cpw2} onChange={e=>setCpw2(e.target.value)}/></div>
              <button className="btn-y" onClick={changePw} style={{maxWidth:180}}>Update Password</button>
            </div>
          )}
          {tab==="system"&&(
            <div className="card">
              <div className="ct">System Settings</div>
              {systemSettings.map((s,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid #0f0f0f"}}>
                  <div style={{fontWeight:600,fontSize:14}}>{s}</div>
                  <div style={{width:42,height:22,borderRadius:11,cursor:"pointer",position:"relative",background:toggles[i]?"#FFE000":"#2a2a2a",transition:"background .2s",flexShrink:0}} onClick={()=>setToggles(p=>{const a=[...p];a[i]=!a[i];return a;})}>
                    <div style={{width:16,height:16,borderRadius:"50%",position:"absolute",top:3,left:toggles[i]?23:3,background:toggles[i]?BK:"#555",transition:"left .2s"}}/>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
