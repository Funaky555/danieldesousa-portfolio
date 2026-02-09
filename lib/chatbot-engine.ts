import { faqEntries } from "./chatbot-faq";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .trim();
}

export function findBestAnswer(
  userMessage: string,
  locale: string
): string | null {
  const normalized = normalize(userMessage);
  const words = normalized.split(/\s+/);

  let bestMatch: { id: string; score: number } | null = null;

  for (const entry of faqEntries) {
    let score = 0;
    for (const keyword of entry.keywords) {
      const normalizedKeyword = normalize(keyword);
      if (normalized.includes(normalizedKeyword)) {
        score += normalizedKeyword.length;
      } else {
        for (const word of words) {
          if (word === normalizedKeyword || normalizedKeyword.includes(word) && word.length >= 3) {
            score += word.length;
          }
        }
      }
    }

    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { id: entry.id, score };
    }
  }

  if (!bestMatch || bestMatch.score < 3) {
    return null;
  }

  const entry = faqEntries.find((e) => e.id === bestMatch!.id);
  if (!entry) return null;

  return entry.answer[locale] || entry.answer["en"];
}

export const fallbackMessages: Record<string, string> = {
  en: "I'm not sure I understand. You can ask me about Daniel's experience, coaching philosophy, services, or contact information. Or feel free to reach out directly at danieldesousa05@gmail.com!",
  pt: "Nao tenho a certeza se compreendi. Pode perguntar-me sobre a experiencia do Daniel, filosofia de treino, servicos ou informacoes de contacto. Ou contacte diretamente em danieldesousa05@gmail.com!",
  es: "No estoy seguro de entender. Puede preguntarme sobre la experiencia de Daniel, filosofia, servicios o contacto. O contacte directamente en danieldesousa05@gmail.com!",
  fr: "Je ne suis pas sur de comprendre. Vous pouvez me poser des questions sur l'experience de Daniel, sa philosophie, ses services ou ses coordonnees. Ou contactez directement danieldesousa05@gmail.com !",
  zh: "我不太确定我理解了您的问题。您可以询问有关Daniel的经验、教练理念、服务或联系方式。或直接发送邮件至 danieldesousa05@gmail.com！",
};
