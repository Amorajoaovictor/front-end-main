import React, { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Attendance() {
  const [students, setStudents] = useState([]);
  const [registro, setRegistro] = useState({ studentId: "", present: true });

  useEffect(() => {
    api.getStudents().then(setStudents);
  }, []);

  async function handleRecord(e) {
    e.preventDefault();
    if (!registro.studentId) return;
    await api.recordAttendance({ studentId: Number(registro.studentId), present: registro.present, date: new Date().toISOString().slice(0,10) });
    alert("Presença registrada (mock).");
    setRegistro({ studentId: "", present: true });
  }

  return (
    <div>
      <div className="card">
        <h3>Registro de Presenças</h3>
        <form onSubmit={handleRecord}>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
            <select className="input" value={registro.studentId} onChange={e=>setRegistro({...registro, studentId:e.target.value})}>
              <option value="">-- selecione um aluno --</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.nome} ({s.turma})</option>)}
            </select>
            <select className="input" value={String(registro.present)} onChange={e=>setRegistro({...registro, present: e.target.value === "true"})}>
              <option value="true">Presente</option>
              <option value="false">Ausente</option>
            </select>
          </div>
          <div style={{marginTop:8}}>
            <button className="button" type="submit">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}