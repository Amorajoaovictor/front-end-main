// Serviço REST mock
// Em produção, substitua por fetch/axios chamando o backend Spring.
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

let students = [
  { id: 1, nome: "Ana Silva", turma: "5A", pai: "Carlos Silva", contato: "carlos@example.com" },
  { id: 2, nome: "Bruno Souza", turma: "6B", pai: "Mariana Souza", contato: "mariana@example.com" }
];

let teachers = [
  { id: 1, nome: "Prof. Maria", disciplina: "Matemática", contato: "maria@escola.com" }
];

let attendance = []; // {id, studentId, date, present}
let grades = []; // {id, studentId, disciplina, nota, date}

let nextId = 3;

export const api = {
  async getDashboardStats() {
    await delay(200);
    return {
      alunos: students.length,
      professores: teachers.length,
      presencasHoje: attendance.filter(a => a.date === today()).length,
      notificacoes: 2
    };
  },
  async getStudents() {
    await delay(200);
    return students.slice();
  },
  async addStudent(payload) {
    await delay(200);
    const novo = { id: nextId++, ...payload };
    students.push(novo);
    return novo;
  },
  async getTeachers() {
    await delay(200);
    return teachers.slice();
  },
  async addTeacher(payload) {
    await delay(200);
    const novo = { id: nextId++, ...payload };
    teachers.push(novo);
    return novo;
  },
  async recordAttendance(payload) {
    await delay(100);
    const registro = { id: nextId++, ...payload };
    attendance.push(registro);
    return registro;
  },
  async recordGrade(payload) {
    await delay(100);
    const registro = { id: nextId++, ...payload };
    grades.push(registro);
    return registro;
  },
  async getReports() {
    await delay(200);
    // simples estatísticas
    const mediaNotas = {};
    grades.forEach(g => {
      const key = g.disciplina || "Geral";
      if (!mediaNotas[key]) { mediaNotas[key] = { soma: 0, cnt: 0 }; }
      mediaNotas[key].soma += g.nota;
      mediaNotas[key].cnt += 1;
    });
    const medias = Object.entries(mediaNotas).map(([disc, v]) => ({ disciplina: disc, media: v.soma / v.cnt }));
    return { totalAlunos: students.length, totalProfessores: teachers.length, medias };
  },
  async getParentInfo(studentId) {
    await delay(200);
    const s = students.find(x => x.id === Number(studentId));
    if (!s) return null;
    return { aluno: s, comunicacoes: [{ id:1, texto: "Boletim disponível", date: today() }]};
  }
};

function today() {
  return new Date().toISOString().slice(0,10);
}