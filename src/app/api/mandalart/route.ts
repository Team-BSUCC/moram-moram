export async function POST(req: Request) {
  const { topic, existingKeywords = [] } = await req.json();

  const remainingCount = 8 - existingKeywords.length;

  const systemPrompt = `You are an assistant that generates high-quality Korean keywords to populate the outer cells of a Mandarat chart (a 3x3 structured goal-setting matrix).

  The user provides:
  - A central topic (e.g., “다이어트”, “전교 1등”, “개발자 취업”)
  - A list of already suggested or related keywords
  
  Your job is to create a full set of **8 functionally distinct, broad, and actionable planning areas** that can help achieve the central goal.  
  However, the user already has some keywords, so you must generate **only the remaining ${remainingCount} new keywords**.
  
  ---
  
  Key rules:
  
  - Do not include the existing keywords **or anything meaningfully similar to them**.
  - You must avoid keywords that overlap in purpose, function, or strategic role with any existing keywords.
  - The final output must be **a JSON array of exactly ${remainingCount} new Korean nouns or noun phrases**.
  - Do NOT include any of the previously provided keywords, reworded versions, synonyms, or related concepts.
  - Do NOT return any explanation, markdown, code block, or commentary — just the JSON array.
  
  ---
  
  Step-by-step guidance (internal logic):
  
  1. Analyze the central topic and break it into 8 distinct strategic planning areas.
  2. Eliminate any area already covered by the existing keywords or closely related in function.
  3. Choose broad yet concrete planning categories the user can act on or make subplans for.
  4. Avoid keywords that are vague, abstract, emotional, evaluative, result-based, or repetitive.
  5. Make sure each keyword is written as a standalone noun or noun phrase in Korean (no verbs or sentences).
  6. Prefer system-oriented or action-oriented expressions like “시간활용”, “수면패턴”, “정리습관”, etc.
  
  ---
  
  Examples:
  
  중심주제: 유튜브 채널 성장  
  입력됨: ["콘텐츠기획", "업로드일정"]  
  출력:  
  [
    "썸네일제작",
    "촬영준비",
    "편집기술",
    "조회수분석",
    "채널브랜딩",
    "커뮤니티소통"
  ]
  
  중심주제: 다이어트  
  입력됨: []  
  출력:  
  [
    "식습관",
    "운동계획",
    "체중관리",
    "생활패턴",
    "스트레스관리",
    "영양정보",
    "수면관리",
    "동기유지"
  ]
  
  ---
  
  Strict output requirements:
  
  - The following keywords are already suggested and must be **excluded** from your output:
  ${JSON.stringify(existingKeywords)}
  
  - Also avoid any **functionally similar** or **closely related** planning units.
  
  Return **only ${remainingCount} new, non-overlapping keywords** in a valid JSON array.  
  Do not include any existing or related keyword in your response.`;

  const messages = [
    {
      role: 'system',
      content: systemPrompt,
    },
    {
      role: 'user',
      content: topic,
    },
  ];

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(
        JSON.stringify({ error: 'API 호출 실패', detail: errorText }),
        {
          status: 500,
        }
      );
    }

    const data = await response.json();
    const rawText = data.choices?.[0]?.message?.content;

    let aiKeywords: string[] = [];

    try {
      aiKeywords = JSON.parse(rawText);
      if (!Array.isArray(aiKeywords)) throw new Error('JSON 배열 아님');
    } catch {
      return new Response(
        JSON.stringify({ error: 'AI 응답 파싱 실패', raw: rawText }),
        {
          status: 500,
        }
      );
    }

    const finalKeywords = aiKeywords;

    return new Response(JSON.stringify({ ideas: finalKeywords }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: '서버 내부 오류' }), {
      status: 500,
    });
  }
}
