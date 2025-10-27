import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { connect } from "../services/websocket";

export default function ParentsPortal() {
  const [studentId, setStudentId] = useState("");
  const [info, setInfo] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = connect((msg) => {
      if (msg.type === "NOTIFICATION") {
        setNotifications(prev => [msg.payload, ...prev].slice(0,5));
      }
    });
    return () => socket.close();
  }, []);

  async function load() {
    if (!studentId) return;
    const data = await api.getParentInfo(studentId);
    setInfo(data);
  }

  return (
    <div>
      <div className="card">
        <h3>Portal para Pais</h3>
        <div style={{display:"flex", gap:8}}>
          <input className="input" placeholder="ID do aluno" value={studentId} onChange={e=>setStudentId(e.target.value)}/>
          <button className="button" onClick={load}>Buscar</button>
        </div>
        {info && (
          <div style={{marginTop:12}}>
            <h4>{info.aluno.nome} - {info.aluno.turma}</h4>
            <p>Responsável: {info.aluno.pai} ({info.aluno.contato})</p>
            <h5>Comunicações</h5>
            <ul>
              {info.comunicacoes.map(c => <li key={c.id}>{c.texto} <span className="small-muted">({c.date})</span></li>)}
            </ul>
          </div>
        )}
      </div>

      <div className="card">
        <h3>Notificações em tempo real (mock)</h3>
        {notifications.length === 0 ? <div className="small-muted">Nenhuma notificação recente.</div> : notifications.map((n,i)=>(
          <div key={i} className="notification">{n.text} <div className="small-muted">{n.time}</div></div>
        ))}
      </div>
    </div>
  );
}