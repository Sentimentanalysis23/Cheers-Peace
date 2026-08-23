"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AdminLoginClient() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error("Invalid password");
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const gold = "#C1836A";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "var(--font-inter), sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "400px", borderRadius: "50%",
        background: `radial-gradient(ellipse, ${gold}12 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: "10%", right: "10%",
        width: "300px", height: "300px", borderRadius: "50%",
        background: `radial-gradient(circle, ${gold}06 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "100%", maxWidth: "440px", position: "relative", zIndex: 1 }}
      >
        {/* Logo mark */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              width: "72px", height: "72px", borderRadius: "50%",
              background: `conic-gradient(${gold} 0deg 180deg, #ffffff 180deg 360deg)`,
              margin: "0 auto 24px",
              border: `2px solid ${gold}50`,
              boxShadow: `0 0 40px ${gold}30`,
            }}
          />
          <h1 style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "36px",
            fontWeight: 400,
            color: "#ffffff",
            margin: "0 0 8px",
            letterSpacing: "-0.02em",
          }}>
            Restricted Area
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", letterSpacing: "0.25em", textTransform: "uppercase", margin: 0 }}>
            Owner Portal Access
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "28px",
          padding: "48px 40px",
          backdropFilter: "blur(20px)",
        }}>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <label style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                textAlign: "center",
              }}>
                Enter Passcode
              </label>
              <div style={{ position: "relative" }}>
                <div style={{
                  position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)",
                  color: "rgba(255,255,255,0.3)",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(0,0,0,0.5)",
                    border: `1px solid ${status === "error" ? "#ef4444" : "rgba(255,255,255,0.15)"}`,
                    borderRadius: "14px",
                    padding: "18px 20px 18px 48px",
                    color: "#ffffff",
                    fontSize: "16px",
                    letterSpacing: "0.4em",
                    outline: "none",
                    transition: "border-color 0.3s",
                    boxSizing: "border-box",
                  }}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = gold}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = status === "error" ? "#ef4444" : "rgba(255,255,255,0.15)"}
                />
              </div>
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: "#ef4444", fontSize: "12px", textAlign: "center", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}
                >
                  Access Denied — Invalid Passcode
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                width: "100%",
                background: status === "loading" ? "rgba(193,131,106,0.3)" : `linear-gradient(135deg, ${gold}, #D4AF37)`,
                border: "none",
                borderRadius: "50px",
                padding: "18px",
                color: status === "loading" ? "rgba(255,255,255,0.5)" : "#000",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                cursor: status === "loading" ? "not-allowed" : "pointer",
                transition: "all 0.3s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              {status === "loading" ? (
                <>
                  <div style={{
                    width: "16px", height: "16px", borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "rgba(255,255,255,0.8)",
                    animation: "spin 0.8s linear infinite",
                  }} />
                  Verifying...
                </>
              ) : (
                <>
                  Unlock Dashboard
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p style={{ textAlign: "center", marginTop: "32px", color: "rgba(255,255,255,0.15)", fontSize: "11px", letterSpacing: "0.2em" }}>
          CHEERS & PEACE — SECURE OWNER PORTAL
        </p>
      </motion.div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 100px #000 inset !important; -webkit-text-fill-color: #fff !important; }
      `}</style>
    </div>
  );
}
