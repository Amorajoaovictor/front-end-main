// Serviço REST mock
// Em produção, substitua por fetch/axios chamando o backend Spring.
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

let students = [
  { id: 1, nome: "Ana Silva", turma: "5A", pai: "Carlos Silva", contato: "carlos@example.com" },
  { id: 2, nome: "Bruno Souza", turma: "6B", pai: "Mariana Souza", contato: "mariana@example.com" },
  { id: 3, nome: "Carla Mendes", turma: "5A", pai: "João Mendes", contato: "joao@example.com" },
  { id: 4, nome: "Daniel Costa", turma: "7A", pai: "Maria Costa", contato: "maria.costa@example.com" },
  { id: 5, nome: "Eduardo Lima", turma: "6B", pai: "Pedro Lima", contato: "pedro@example.com" },
  { id: 6, nome: "Fernanda Rocha", turma: "5A", pai: "Ana Rocha", contato: "ana.rocha@example.com" },
  { id: 7, nome: "Gabriel Santos", turma: "7A", pai: "Lucas Santos", contato: "lucas@example.com" },
  { id: 8, nome: "Helena Dias", turma: "6B", pai: "Rita Dias", contato: "rita@example.com" },
  { id: 9, nome: "Igor Pereira", turma: "5A", pai: "Paulo Pereira", contato: "paulo@example.com" },
  { id: 10, nome: "Julia Alves", turma: "7A", pai: "Sandra Alves", contato: "sandra@example.com" },
  { id: 11, nome: "Kevin Martins", turma: "6B", pai: "Roberto Martins", contato: "roberto@example.com" },
  { id: 12, nome: "Laura Ferreira", turma: "5A", pai: "Lucia Ferreira", contato: "lucia@example.com" }
];

let teachers = [
  { id: 1, nome: "Prof. Maria", disciplina: "Matemática", contato: "maria@escola.com" },
  { id: 2, nome: "Prof. João", disciplina: "Português", contato: "joao@escola.com" },
  { id: 3, nome: "Prof. Ana Paula", disciplina: "Ciências", contato: "anapaula@escola.com" },
  { id: 4, nome: "Prof. Carlos", disciplina: "História", contato: "carlos@escola.com" },
  { id: 5, nome: "Prof. Rita", disciplina: "Geografia", contato: "rita@escola.com" },
  { id: 6, nome: "Prof. Fernando", disciplina: "Educação Física", contato: "fernando@escola.com" }
];

let attendance = []; // {id, studentId, date, present}
let grades = []; // {id, studentId, disciplina, nota, date}

let nextId = 13;

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
  async getStudents(page = 1, limit = 10) {
    await delay(200);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedStudents = students.slice(start, end);
    return {
      data: paginatedStudents,
      total: students.length,
      page,
      limit,
      totalPages: Math.ceil(students.length / limit)
    };
  },
  async getAllStudents() {
    await delay(200);
    return students.slice();
  },
  async addStudent(payload) {
    await delay(200);
    const novo = { id: nextId++, ...payload };
    students.push(novo);
    return novo;
  },
  async getTeachers(page = 1, limit = 10) {
    await delay(200);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedTeachers = teachers.slice(start, end);
    return {
      data: paginatedTeachers,
      total: teachers.length,
      page,
      limit,
      totalPages: Math.ceil(teachers.length / limit)
    };
  },
  async getAllTeachers() {
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