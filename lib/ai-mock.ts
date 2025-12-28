export async function generateContentMock(topic: string, type: 'NEWS' | 'ANALYSIS' | 'BLOG' | 'TUTORIAL' | 'SPONSORED') {
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    return {
        slug: `${slug}-${Date.now()}`,
        en: {
            title: `AI Generated: ${topic}`,
            description: `Deep dive into ${topic} covering market trends and analysis.`,
            content: `
# ${topic}: Comprehensive Overview

**Introduction**
The crypto market is witnessing significant shifts regarding **${topic}**. This article explores the key drivers and potential impacts.

**Market Analysis**
Recent data suggests a bullish divergence. *Volume is increasing* on major exchanges.

## Key Takeaways
* Trend A is accelerating.
* Regulatory concerns remain but are manageable.
* Long-term outlook is positive.

**Conclusion**
Investors should keep a close eye on ${topic} as it develops.
      `
        },
        so: {
            title: `Warbixin: ${topic} (Somali Analysis)`,
            description: `Falanqeyn qoto dheer oo ku saabsan ${topic} iyo saameynta suuqa.`,
            content: `
# ${topic}: Falanqeyn Dhameystiran

**Hordhac**
Suuqa crypto wuxuu marayaa isbedelo waaweyn oo la xiriira **${topic}**. Maqaalkan wuxuu baarayaa waxyaabaha ugu muhiimsan.

**Falanqeynta Suuqa**
Xogta dhowaan soo baxday waxay muujineysaa koror. *Mugga* ayaa kordhaya suuqyada waaweyn.

## Qodobada Muhiimka ah
* Isbedelka A wuu sii kordhayaa.
* Walwalka sharciyeynta wuu jiraa laakiin waa la maarayn karaa.
* Muuqaalka muddada dheer waa mid wanaagsan.

**Gabagabo**
Maalgashadayaashu waa inay isha ku hayaan ${topic} sida ay u hormareyso.
      `
        }
    };
}
