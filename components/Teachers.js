'use client';

import React, { useEffect, useState } from "react";
import { api } from "../lib/api";
import Pagination from "./ui/Pagination";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ nome: "", disciplina: "", contato: ""});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    loadTeachers(currentPage);
  }, [currentPage]);

  async function loadTeachers(page) {
    const response = await api.getTeachers(page, itemsPerPage);
    setTeachers(response.data);
    setTotalPages(response.totalPages);
    setTotal(response.total);
  }

  async function handleAdd(e) {
    e.preventDefault();
    const novo = await api.addTeacher(form);
    // Reload the current page to show updated data
    await loadTeachers(currentPage);
    setForm({ nome: "", disciplina: "", contato: ""});
  }

  return (
    <div>
      <div className="card">
        <h3>Cadastro de Professores</h3>
        <form onSubmit={handleAdd}>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
            <input className="input" placeholder="Nome" value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})}/>
            <input className="input" placeholder="Disciplina" value={form.disciplina} onChange={e=>setForm({...form,disciplina:e.target.value})}/>
            <input className="input" placeholder="Contato" value={form.contato} onChange={e=>setForm({...form,contato:e.target.value})}/>
          </div>
          <div style={{marginTop:8}}>
            <button className="button" type="submit">Adicionar professor</button>
          </div>
        </form>
      </div>

      <div className="card">
        <h3>Lista de Professores</h3>
        <p className="small-muted">Total de professores: {total}</p>
        <table className="table">
          <thead><tr><th>Nome</th><th>Disciplina</th><th>Contato</th></tr></thead>
          <tbody>
            {teachers.map(t => (
              <tr key={t.id}><td>{t.nome}</td><td>{t.disciplina}</td><td className="small-muted">{t.contato}</td></tr>
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