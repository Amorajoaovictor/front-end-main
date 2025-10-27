import React, { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let mounted = true;
    api.getDashboardStats().then(s => { if (mounted) setStats(s); });
    return () => { mounted = false; };
  }, []);

  if (!stats) return <div className="card">Carregando dashboard...</div>;

  return (
    <div>
      <div className="card">
        <h3>Visão Geral</h3>
        <div className="row">
          <div className="col card">
            <h4>Alunos</h4>
            <p style={{fontSize:24}}>{stats.alunos}</p>
          </div>
          <div className="col card">
            <h4>Professores</h4>
            <p style={{fontSize:24}}>{stats.professores}</p>
          </div>
          <div className="col card">
            <h4>Presenças hoje</h4>
            <p style={{fontSize:24}}>{stats.presencasHoje}</p>
          </div>
        </div>
      </div>
      <div className="card">
        <h3>Notificações</h3>
        <div className="notification">Você tem {stats.notificacoes} notificações pendentes.</div>
      </div>
    </div>
  );
}