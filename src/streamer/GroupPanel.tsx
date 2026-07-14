import { useState } from "react";
import {
  EXISTING_GROUPS, ALL_KOLS, ALL_STORES,
  UNGROUPED_KOLS, UNGROUPED_STORES,
  type GroupDef,
} from "./data";

type PanelTab = "groups" | "new" | "unclaimed";

interface Props {
  onClose: () => void;
}

function Tag({ text, onRemove }: { text: string; onRemove?: () => void }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "2px 8px", borderRadius: 3,
      background: "#1e1e1e", border: "1px solid #2a2a2a",
      fontSize: 11, color: "#888",
    }}>
      {text}
      {onRemove && (
        <button onClick={onRemove} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: 12, lineHeight: 1, padding: 0 }}>×</button>
      )}
    </span>
  );
}

function CheckRow({
  label, checked, onChange, sub,
}: { label: string; checked: boolean; onChange: () => void; sub?: string }) {
  return (
    <label style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "8px 0",
      borderBottom: "1px solid #1a1a1a",
      cursor: "pointer",
    }}>
      <div style={{
        width: 15, height: 15, borderRadius: 3, flexShrink: 0,
        border: `1.5px solid ${checked ? "#f0f0f0" : "#2e2e2e"}`,
        background: checked ? "#f0f0f0" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.12s",
      }}>
        {checked && <span style={{ color: "#0c0c0c", fontSize: 10, fontWeight: 700, lineHeight: 1 }}>✓</span>}
      </div>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ display: "none" }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, color: "#ccc", fontFamily: "monospace" }}>{label}</div>
        {sub && <div style={{ fontSize: 10, color: "#444", marginTop: 2 }}>{sub}</div>}
      </div>
    </label>
  );
}

export default function GroupPanel({ onClose }: Props) {
  const [tab, setTab] = useState<PanelTab>("groups");
  const [groups, setGroups] = useState<GroupDef[]>(EXISTING_GROUPS);
  const [newName, setNewName] = useState("");
  const [selKols, setSelKols] = useState<Set<string>>(new Set());
  const [selStores, setSelStores] = useState<Set<string>>(new Set());
  const [kolSearch, setKolSearch] = useState("");
  const [saving, setSaving] = useState(false);

  const filteredKols = ALL_KOLS.filter((k) => k.includes(kolSearch));

  const toggleKol = (k: string) =>
    setSelKols((prev) => { const n = new Set(prev); n.has(k) ? n.delete(k) : n.add(k); return n; });
  const toggleStore = (s: string) =>
    setSelStores((prev) => { const n = new Set(prev); n.has(s) ? n.delete(s) : n.add(s); return n; });

  const handleSave = () => {
    if (!newName.trim()) return;
    setSaving(true);
    setTimeout(() => {
      setGroups((prev) => [...prev, {
        id: "g-" + Date.now(),
        name: newName.trim(),
        ruleCount: selKols.size + selStores.size,
        kols: Array.from(selKols),
        stores: Array.from(selStores),
      }]);
      setNewName(""); setSelKols(new Set()); setSelStores(new Set());
      setSaving(false);
      setTab("groups");
    }, 600);
  };

  const handleDelete = (id: string) =>
    setGroups((prev) => prev.filter((g) => g.id !== id));

  const TabBtn = ({ t, label }: { t: PanelTab; label: string }) => (
    <button
      onClick={() => setTab(t)}
      style={{
        flex: 1, padding: "8px 0",
        background: "none", border: "none", cursor: "pointer",
        fontSize: 12, fontWeight: tab === t ? 600 : 400,
        color: tab === t ? "#f0f0f0" : "#444",
        borderBottom: `2px solid ${tab === t ? "#f0f0f0" : "transparent"}`,
        transition: "all 0.12s",
      }}
    >{label}</button>
  );

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, zIndex: 55, background: "rgba(0,0,0,0.6)" }}
      />

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: "min(420px, 100vw)",
        background: "#111", borderLeft: "1px solid #1e1e1e",
        zIndex: 60, display: "flex", flexDirection: "column",
        animation: "slideInRight 0.22s ease-out",
      }}>
        {/* Header */}
        <div style={{
          padding: "0 20px", height: 52, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: "1px solid #1e1e1e",
        }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#f0f0f0", letterSpacing: "0.04em" }}>管理分组</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#444", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #1e1e1e", flexShrink: 0, padding: "0 20px" }}>
          <TabBtn t="groups" label="已有分组" />
          <TabBtn t="new" label="新建分组" />
          <TabBtn t="unclaimed" label={`待认领 (${UNGROUPED_KOLS.length + UNGROUPED_STORES.length})`} />
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>

          {/* ── TAB: existing groups ── */}
          {tab === "groups" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {groups.map((g) => (
                <div key={g.id} style={{
                  padding: "12px 14px",
                  background: "#141414", border: "1px solid #1e1e1e", borderRadius: 6,
                  marginBottom: 6,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#e0e0e0" }}>{g.name}</div>
                      <div style={{ fontSize: 11, color: "#444", marginTop: 3 }}>
                        {g.kols.length} 个达人号 · {g.stores.length} 家店铺
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button style={{
                        padding: "3px 10px", borderRadius: 3, fontSize: 11,
                        background: "none", border: "1px solid #2a2a2a",
                        color: "#666", cursor: "pointer",
                      }}>编辑</button>
                      <button
                        onClick={() => handleDelete(g.id)}
                        style={{
                          padding: "3px 10px", borderRadius: 3, fontSize: 11,
                          background: "none", border: "1px solid #2a2a2a",
                          color: "#555", cursor: "pointer",
                        }}
                      >删除</button>
                    </div>
                  </div>
                  <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {g.kols.slice(0, 4).map((k) => <Tag key={k} text={k} />)}
                    {g.kols.length > 4 && (
                      <span style={{ fontSize: 10, color: "#333", alignSelf: "center" }}>+{g.kols.length - 4} 个</span>
                    )}
                  </div>
                </div>
              ))}
              {groups.length === 0 && (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#333", fontSize: 12 }}>暂无分组，点击「新建分组」创建</div>
              )}
            </div>
          )}

          {/* ── TAB: new group ── */}
          {tab === "new" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Name input */}
              <div>
                <label style={{ fontSize: 11, color: "#555", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>分组名称 *</label>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="如：苏苏工作室"
                  style={{
                    width: "100%", padding: "9px 12px",
                    background: "#141414", border: "1px solid #2a2a2a", borderRadius: 6,
                    color: "#f0f0f0", fontSize: 13,
                    outline: "none", fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* KOL picker */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <label style={{ fontSize: 11, color: "#555", letterSpacing: "0.06em" }}>归属达人号 <span style={{ color: "#333" }}>({selKols.size} 已选)</span></label>
                </div>
                <input
                  value={kolSearch}
                  onChange={(e) => setKolSearch(e.target.value)}
                  placeholder="搜索达人号…"
                  style={{
                    width: "100%", padding: "7px 10px", marginBottom: 8,
                    background: "#141414", border: "1px solid #1e1e1e", borderRadius: 5,
                    color: "#888", fontSize: 12, outline: "none", fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                />
                <div style={{
                  background: "#0e0e0e", border: "1px solid #1e1e1e", borderRadius: 6,
                  maxHeight: 200, overflowY: "auto", padding: "0 12px",
                }}>
                  {filteredKols.map((k) => (
                    <CheckRow
                      key={k} label={k}
                      checked={selKols.has(k)}
                      onChange={() => toggleKol(k)}
                    />
                  ))}
                  {filteredKols.length === 0 && (
                    <div style={{ padding: "12px 0", fontSize: 11, color: "#333", textAlign: "center" }}>无匹配结果</div>
                  )}
                </div>
                {/* Selected tags */}
                {selKols.size > 0 && (
                  <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {Array.from(selKols).map((k) => (
                      <Tag key={k} text={k} onRemove={() => toggleKol(k)} />
                    ))}
                  </div>
                )}
              </div>

              {/* Store picker */}
              <div>
                <label style={{ fontSize: 11, color: "#555", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>归属店铺 <span style={{ color: "#333" }}>({selStores.size} 已选)</span></label>
                <div style={{
                  background: "#0e0e0e", border: "1px solid #1e1e1e", borderRadius: 6,
                  padding: "0 12px",
                }}>
                  {ALL_STORES.map((s) => (
                    <CheckRow
                      key={s} label={s}
                      checked={selStores.has(s)}
                      onChange={() => toggleStore(s)}
                    />
                  ))}
                </div>
                {selStores.size > 0 && (
                  <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {Array.from(selStores).map((s) => (
                      <Tag key={s} text={s} onRemove={() => toggleStore(s)} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── TAB: unclaimed ── */}
          {tab === "unclaimed" && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#444", textTransform: "uppercase", marginBottom: 10 }}>
                  未分组达人号 ({UNGROUPED_KOLS.length})
                </div>
                {UNGROUPED_KOLS.map((k) => (
                  <div key={k.kolId} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 0", borderBottom: "1px solid #1a1a1a",
                  }}>
                    <div>
                      <div style={{ fontSize: 12, color: "#aaa", fontFamily: "monospace" }}>{k.kolId}</div>
                      <div style={{ fontSize: 10, color: "#3a3a3a", marginTop: 2 }}>
                        {k.platform} · 最近出现 {k.lastSeen} · ¥{k.sales.toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={() => setTab("new")}
                      style={{
                        padding: "4px 10px", borderRadius: 3, fontSize: 11,
                        background: "none", border: "1px solid #2a2a2a",
                        color: "#666", cursor: "pointer", whiteSpace: "nowrap",
                      }}
                    >认领 →</button>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#444", textTransform: "uppercase", marginBottom: 10 }}>
                  未分组店铺 ({UNGROUPED_STORES.length})
                </div>
                {UNGROUPED_STORES.map((s) => (
                  <div key={s.storeId} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 0", borderBottom: "1px solid #1a1a1a",
                  }}>
                    <div>
                      <div style={{ fontSize: 12, color: "#aaa" }}>{s.storeName}</div>
                      <div style={{ fontSize: 10, color: "#3a3a3a", marginTop: 2 }}>
                        {s.platform} · ¥{s.sales.toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={() => setTab("new")}
                      style={{
                        padding: "4px 10px", borderRadius: 3, fontSize: 11,
                        background: "none", border: "1px solid #2a2a2a",
                        color: "#666", cursor: "pointer", whiteSpace: "nowrap",
                      }}
                    >认领 →</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer action */}
        {tab === "new" && (
          <div style={{
            padding: "14px 20px", borderTop: "1px solid #1e1e1e", flexShrink: 0,
            display: "flex", gap: 10,
          }}>
            <button
              onClick={() => { setNewName(""); setSelKols(new Set()); setSelStores(new Set()); setTab("groups"); }}
              style={{
                flex: 1, padding: "10px", borderRadius: 6,
                background: "none", border: "1px solid #2a2a2a",
                color: "#555", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}
            >取消</button>
            <button
              onClick={handleSave}
              disabled={!newName.trim() || saving}
              style={{
                flex: 2, padding: "10px", borderRadius: 6,
                background: newName.trim() ? "#f0f0f0" : "#1e1e1e",
                border: "none",
                color: newName.trim() ? "#0c0c0c" : "#333",
                fontSize: 13, fontWeight: 700, cursor: newName.trim() ? "pointer" : "not-allowed",
                transition: "all 0.15s",
              }}
            >{saving ? "保存中…" : "保存分组"}</button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
