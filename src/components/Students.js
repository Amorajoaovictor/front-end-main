import React, { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ nome: "", turma: "", pai: "", contato: ""});

  useEffect(() => {
    api.getStudents().then(setStudents);
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    const novo = await api.addStudent(form);
    setStudents(prev => [...prev, novo]);
    setForm({ nome: "", turma: "", pai: "", contato: ""});
  }

  return (
    <div>
      <div className="card">
        <h3>Cadastro de Alunos</h3>
        <form onSubmit={handleAdd}>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
            <input className="input" placeholder="Nome" value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})}/>
            <input className="input" placeholder="Turma" value={form.turma} onChange={e=>setForm({...form,turma:e.target.value})}/>
            <input className="input" placeholder="Nome do responsável" value={form.pai} onChange={e=>setForm({...form,pai:e.target.value})}/>
            <input className="input" placeholder="Contato (email/telefone)" value={form.contato} onChange={e=>setForm({...form,contato:e.target.value})}/>
          </div>
          <div style={{marginTop:8}}>
            <button className="button" type="submit">Adicionar aluno</button>
          </div>
        </form>
      </div>

      <div className="card">
        <h3>Lista de Alunos</h3>
        <table className="table">
          <thead><tr><th>Nome</th><th>Turma</th><th>Responsável</th><th>Contato</th></tr></thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td>{s.nome}</td><td>{s.turma}</td><td>{s.pai}</td><td className="small-muted">{s.contato}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}