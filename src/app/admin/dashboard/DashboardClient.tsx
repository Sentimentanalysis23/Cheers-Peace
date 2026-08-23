"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  date: string;
  read: boolean;
  location?: string;
  ip?: string;
}

export default function DashboardClient() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, read: !currentStatus } : inq));
    try {
      await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: !currentStatus }),
      });
    } catch {
      fetchInquiries();
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };

  const unreadCount = inquiries.filter(i => !i.read).length;
  const totalCount = inquiries.length;
  const readPercentage = totalCount === 0 ? 0 : Math.round(((totalCount - unreadCount) / totalCount) * 100);

  const gold = "#C1836A";
  const darkGold = "#D4AF37";

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #111111 100%)",
      fontFamily: "var(--font-inter), sans-serif",
      color: "#ffffff",
    }}>

      {/* Decorative ambient lights */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: "none", zIndex: 0, overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-20%", right: "-10%",
          width: "600px", height: "600px", borderRadius: "50%",
          background: `radial-gradient(circle, ${gold}15 0%, transparent 70%)`,
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "-10%",
          width: "400px", height: "400px", borderRadius: "50%",
          background: `radial-gradient(circle, ${darkGold}08 0%, transparent 70%)`,
        }} />
      </div>

      {/* Admin Navbar */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(0,0,0,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${gold}30`,
        padding: "0 48px",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Yin-Yang style logo mark */}
          <div style={{
            width: "44px", height: "44px", borderRadius: "50%",
            background: `linear-gradient(135deg, ${gold} 0%, #000 50%, #fff 100%)`,
            border: `2px solid ${gold}50`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", fontWeight: "bold",
            fontFamily: "var(--font-playfair), serif",
          }}>
            <span style={{ color: "#000" }}>C</span>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, letterSpacing: "0.2em", fontSize: "13px" }}>CHEERS & PEACE</div>
            <div style={{ color: `${gold}`, fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", marginTop: "2px" }}>Owner Portal</div>
          </div>
        </div>

        <button onClick={handleLogout} style={{
          display: "flex", alignItems: "center", gap: "8px",
          color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50px",
          padding: "10px 20px", cursor: "pointer",
          fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
          fontWeight: "700", transition: "all 0.3s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${gold}20`; (e.currentTarget as HTMLButtonElement).style.borderColor = gold; (e.currentTarget as HTMLButtonElement).style.color = gold; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)"; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Sign Out
        </button>
      </nav>

      <main style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", padding: "60px 48px 120px" }}>

        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "60px" }}>
          <div style={{ color: gold, fontSize: "11px", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "12px" }}>
            Owner Portal
          </div>
          <h1 style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 400,
            lineHeight: 1.1,
            color: "#ffffff",
            margin: 0,
          }}>
            Inquiry{" "}
            <span style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>Dashboard</span>
          </h1>
          <div style={{ marginTop: "24px", width: "60px", height: "1px", background: `linear-gradient(to right, ${gold}, transparent)` }} />
        </motion.div>

        {/* KPI Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          marginBottom: "48px",
        }}>
          {[
            { label: "Total Inquiries", value: totalCount, icon: "👥", accent: gold, delay: 0.1 },
            { label: "Action Required", value: unreadCount, icon: "🔔", accent: "#ef4444", delay: 0.2, pulse: unreadCount > 0 },
            { label: "Response Rate", value: `${readPercentage}%`, icon: "📊", accent: "#22c55e", delay: 0.3 },
          ].map((card) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: card.delay }}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid rgba(255,255,255,0.1)`,
                borderRadius: "24px",
                padding: "36px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: "120px", height: "120px", borderRadius: "50%",
                background: `radial-gradient(circle, ${card.accent}10 0%, transparent 70%)`,
                transform: "translate(30%, -30%)",
              }} />
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "32px" }}>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "50%",
                  background: `${card.accent}15`,
                  border: `1px solid ${card.accent}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "20px",
                }}>
                  {card.icon}
                </div>
                {card.pulse && (
                  <div style={{ position: "relative", width: "12px", height: "12px" }}>
                    <div style={{
                      position: "absolute", inset: 0, borderRadius: "50%",
                      background: "#ef4444", animation: "ping 1.5s ease-out infinite",
                    }} />
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444", position: "relative" }} />
                  </div>
                )}
              </div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "8px" }}>
                {card.label}
              </div>
              <div style={{ fontSize: "52px", fontWeight: 300, color: "#ffffff", fontFamily: "var(--font-playfair), serif", lineHeight: 1 }}>
                {card.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inquiry Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        >
          {/* Table Header */}
          <div style={{
            padding: "28px 36px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: gold }} />
              <span style={{ color: "#fff", fontWeight: 700, letterSpacing: "0.2em", fontSize: "11px", textTransform: "uppercase" }}>Recent Submissions</span>
            </div>
            {totalCount > 0 && (
              <span style={{
                background: `${gold}20`, border: `1px solid ${gold}40`,
                color: gold, fontSize: "11px", fontWeight: 700,
                padding: "4px 12px", borderRadius: "50px", letterSpacing: "0.1em",
              }}>
                {totalCount} Total
              </span>
            )}
          </div>

          {/* Content */}
          {loading ? (
            <div style={{ padding: "120px 36px", textAlign: "center" }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "50%",
                border: `2px solid ${gold}30`, borderTopColor: gold,
                animation: "spin 1s linear infinite",
                margin: "0 auto 24px",
              }} />
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                Loading Inquiries...
              </div>
            </div>
          ) : inquiries.length === 0 ? (
            <div style={{ padding: "120px 36px", textAlign: "center" }}>
              <div style={{
                width: "80px", height: "80px", borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px", fontSize: "32px",
              }}>
                📭
              </div>
              <h3 style={{ color: "#fff", fontFamily: "var(--font-playfair), serif", fontSize: "24px", fontWeight: 400, marginBottom: "12px" }}>
                No Inquiries Yet
              </h3>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "14px", lineHeight: 1.6, maxWidth: "340px", margin: "0 auto" }}>
                When customers submit the contact form, their details will securely appear here.
              </p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {["", "Client", "Contact", "Location", "Message", "Date"].map((h) => (
                      <th key={h} style={{
                        padding: "16px 20px",
                        textAlign: "left",
                        color: "rgba(255,255,255,0.3)",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {inquiries.map((inq) => (
                      <motion.tr
                        key={inq.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                          background: inq.read ? "transparent" : `${gold}08`,
                          transition: "background 0.3s",
                        }}
                        onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = "rgba(255,255,255,0.03)"}
                        onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = inq.read ? "transparent" : `${gold}08`}
                      >
                        {/* Status */}
                        <td style={{ padding: "20px", verticalAlign: "top", width: "60px" }}>
                          <button
                            onClick={() => toggleReadStatus(inq.id, inq.read)}
                            title={inq.read ? "Mark as unread" : "Mark as read"}
                            style={{
                              width: "28px", height: "28px", borderRadius: "50%",
                              border: `2px solid ${inq.read ? "rgba(255,255,255,0.2)" : gold}`,
                              background: inq.read ? "transparent" : `${gold}20`,
                              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                              transition: "all 0.2s", color: gold,
                            }}
                          >
                            {inq.read ? (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2.5" opacity="0.5"><polyline points="20 6 9 17 4 12"/></svg>
                            ) : (
                              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: gold }} />
                            )}
                          </button>
                        </td>

                        {/* Client */}
                        <td style={{ padding: "20px", verticalAlign: "top" }}>
                          <div style={{ fontWeight: 700, color: inq.read ? "rgba(255,255,255,0.5)" : "#fff", fontSize: "14px", marginBottom: "4px" }}>
                            {inq.name}
                          </div>
                          {inq.company && inq.company !== "N/A" && (
                            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                              {inq.company}
                            </div>
                          )}
                        </td>

                        {/* Contact */}
                        <td style={{ padding: "20px", verticalAlign: "top" }}>
                          <a href={`mailto:${inq.email}`} style={{
                            color: inq.read ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.7)",
                            fontSize: "13px", textDecoration: "none",
                            display: "flex", alignItems: "center", gap: "8px",
                          }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            {inq.email}
                          </a>
                        </td>

                        {/* Location */}
                        <td style={{ padding: "20px", verticalAlign: "top", whiteSpace: "nowrap" }}>
                          {inq.location && inq.location !== 'Unknown' && inq.location !== 'N/A' ? (
                            <div style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                              <span style={{ fontSize: "12px", marginTop: "1px" }}>📍</span>
                              <div>
                                <div style={{ color: inq.read ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.7)", fontSize: "12px", lineHeight: 1.5 }}>
                                  {inq.location}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px" }}>—</span>
                          )}
                        </td>

                        {/* Message */}
                        <td style={{ padding: "20px", verticalAlign: "top", maxWidth: "400px" }}>
                          <p style={{
                            color: inq.read ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.8)",
                            fontSize: "13px", lineHeight: 1.7, margin: 0,
                          }}>
                            {inq.message}
                          </p>
                        </td>

                        {/* Date */}
                        <td style={{ padding: "20px", verticalAlign: "top", whiteSpace: "nowrap" }}>
                          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "0.1em", fontFamily: "monospace" }}>
                            {new Date(inq.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                          </div>
                          <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "10px", marginTop: "2px" }}>
                            {new Date(inq.date).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </main>

      <style>{`
        @keyframes ping { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.8); opacity: 0; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
