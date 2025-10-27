import React, { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Grades() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ studentId:"", disciplina:"", nota: "" });

  useEffect(() => {
    api.getStudents().then(setStudents);
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.studentId || !form.nota) return;
    await api.recordGrade({ studentId: Number(form.studentId), disciplina: form.disciplina || "Geral", nota: Number(form.nota), date: new Date().toISOString()});
    alert("Nota registrada (mock).");
    setForm({ studentId:"", disciplina:"", nota: "" });
  }

  return (
    <div>
      <div className="card">
        <h3>Registro de Notas</h3>
        <form onSubmit={handleAdd}>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8}}>
            <select className="input" value={form.studentId} onChange={e=>setForm({...form,studentId:e.target.value})}>
              <option value="">-- selecione aluno --</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
            </select>
            <input className="input" placeholder="Disciplina" value={form.disciplina} onChange={e=>setForm({...form,disciplina:e.target.value})}/>
            <input className="input" placeholder="Nota (ex: 8.5)" value={form.nota} onChange={e=>setForm({...form,nota:e.target.value})}/>
          </div>
          <div style={{marginTop:8}}>
            <button className="button" type="submit">Registrar nota</button>
          </div>
        </form>
      </div>
    </div>
  );
}