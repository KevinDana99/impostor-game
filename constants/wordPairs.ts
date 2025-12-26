import { WordPair } from "@/types/game";

export const WORD_PAIRS: WordPair[] = [
  { mainWord: "Perro", impostorWord: "Gato" },
  { mainWord: "Pizza", impostorWord: "Hamburguesa" },
  { mainWord: "Avión", impostorWord: "Helicóptero" },
  { mainWord: "Doctor", impostorWord: "Enfermero" },
  { mainWord: "Fútbol", impostorWord: "Baloncesto" },
  { mainWord: "Playa", impostorWord: "Piscina" },
  { mainWord: "Café", impostorWord: "Té" },
  { mainWord: "Guitarra", impostorWord: "Piano" },
  { mainWord: "Verano", impostorWord: "Primavera" },
  { mainWord: "Libro", impostorWord: "Revista" },
  { mainWord: "Cine", impostorWord: "Teatro" },
  { mainWord: "Coche", impostorWord: "Moto" },
  { mainWord: "Manzana", impostorWord: "Naranja" },
  { mainWord: "Luna", impostorWord: "Sol" },
  { mainWord: "Montaña", impostorWord: "Colina" },
  { mainWord: "Zapatos", impostorWord: "Zapatillas" },
  { mainWord: "Teléfono", impostorWord: "Tablet" },
  { mainWord: "Profesor", impostorWord: "Maestro" },
  { mainWord: "Restaurante", impostorWord: "Cafetería" },
  { mainWord: "Río", impostorWord: "Lago" },
  { mainWord: "Árbol", impostorWord: "Arbusto" },
  { mainWord: "Reloj", impostorWord: "Cronómetro" },
  { mainWord: "Camisa", impostorWord: "Camiseta" },
  { mainWord: "Tren", impostorWord: "Metro" },
  { mainWord: "Nieve", impostorWord: "Granizo" },
  { mainWord: "Pintor", impostorWord: "Escultor" },
  { mainWord: "Tigre", impostorWord: "León" },
  { mainWord: "Silla", impostorWord: "Sillón" },
  { mainWord: "Chocolate", impostorWord: "Caramelo" },
  { mainWord: "Espejo", impostorWord: "Ventana" },
];

export const getRandomWordPair = (): WordPair => {
  const randomIndex = Math.floor(Math.random() * WORD_PAIRS.length);
  return WORD_PAIRS[randomIndex];
};
