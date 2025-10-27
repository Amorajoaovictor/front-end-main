

export function connect(onMessage) {
  let mounted = true;
  // Emite uma notificação a cada 10 segundos
  const interval = setInterval(() => {
    if (!mounted) return;
    const msg = {
      type: "NOTIFICATION",
      payload: {
        text: "Nova mensagem do sistema em " + new Date().toLocaleTimeString(),
        time: new Date().toISOString()
      }
    };
    onMessage(msg);
  }, 10000);

  // Emite um evento inicial
  setTimeout(() => {
    if (mounted) onMessage({ type: "CONNECTED", payload: { text: "Conexão WebSocket mock estabelecida" }});
  }, 300);

  return {
    close() {
      mounted = false;
      clearInterval(interval);
    }
  };
}