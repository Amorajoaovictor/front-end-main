import React, { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Reports() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    api.getReports().then(setReport);
  }, []);

  if (!report) return <div className="card">Gerando relatórios...</div>;

  return (
    <div>
      <div className="card">
        <h3>Relatórios e Análises</h3>
        <p>Total de alunos: <strong>{report.totalAlunos}</strong></p>
        <p>Total de professores: <strong>{report.totalProfessores}</strong></p>
        <h4>Médias por disciplina</h4>
        <table className="table">
          <thead><tr><th>Disciplina</th><th>Média</th></tr></thead>
          <tbody>
            {report.medias.length ? report.medias.map(m => (
              <tr key={m.disciplina}><td>{m.disciplina}</td><td>{m.media.toFixed(2)}</td></tr>
            )) : <tr><td colSpan={2}>Sem dados</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}