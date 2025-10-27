'use client';

import React, { useEffect, useState } from "react";
import { api } from "../lib/api";
import Pagination from "./ui/Pagination";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ nome: "", turma: "", pai: "", contato: ""});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    loadStudents(currentPage);
  }, [currentPage]);

  async function loadStudents(page) {
    const response = await api.getStudents(page, itemsPerPage);
    setStudents(response.data);
    setTotalPages(response.totalPages);
    setTotal(response.total);
  }

  async function handleAdd(e) {
    e.preventDefault();
    const novo = await api.addStudent(form);
    // Reload the current page to show updated data
    await loadStudents(currentPage);
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
        <p className="small-muted">Total de alunos: {total}</p>
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}