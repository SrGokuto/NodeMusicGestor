export function objetoComoTabla(obj: any) {
  const tabla = Object.entries(obj).map(([k, v]) => ({
    Propiedad: k,
    Valor: v?.toString()
  }));
  console.table(tabla);
}