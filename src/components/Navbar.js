import React from "react";

export default function Navbar({ current, setCurrent }) {
  const items = [
    { key: "dashboard", label: "Dashboard" },
    { key: "students", label: "Alunos" },
    { key: "teachers", label: "Professores" },
    { key: "attendance", label: "Presenças" },
    { key: "grades", label: "Notas" },
    { key: "reports", label: "Relatórios" },
    { key: "parents", label: "Portal Pais" }
  ];
  return (
    <div className="sidebar">
      <h2>DistriSchool</h2>
      {items.map(i => (
        <div
          key={i.key}
          className="nav-item"
          style={{ background: current===i.key ? "rgba(255,255,255,0.06)" : "transparent" }}
          onClick={() => setCurrent(i.key)}
        >
          {i.label}
        </div>
      ))}
    </div>
  );
}