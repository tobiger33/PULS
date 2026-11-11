/* English localization layer: keeps the original interactive logic and German internal enums intact. */
const PULS_EN_MAP: Record<string, string> = {
  'Hackathon · Konzept v17': 'Hackathon · Concept V19 EN',
  'Die Banking-Startseite bleibt unverändert. Eingaben werden direkt unter dem fixierten Score bestätigt und ausgewertet. Der Wealth-Pfad bleibt scrollbar.':
    'The banking home stays unchanged. Plans, questions and sources are handled inline; simulations are not saved automatically. Only the Wealth Journey scrolls.',
  'Widget-Größe': 'Widget size',
  Kompakt: 'Compact',
  'Visueller Stil': 'Visual style',
  Ruhig: 'Calm',
  'Wochenverlauf im Widget': 'Weekly trend in widget',
  'Score als Zahl anzeigen': 'Show numeric score',
  'Welchen Einstieg möchtest du testen?': 'Which view would you like to test?',
  'PULS offen': 'PULS open',
  '↻ Prototyp zurücksetzen': '↻ Reset prototype',
  'Designentscheidung:': 'Design principle:',
  'Lernen wie bei Duolingo: fünf Stationen auf einem geschwungenen Weg, kurze Aufgaben und sichtbarer Fortschritt. Keine täglichen Streaks und keine Score-Punkte für das bloße Anklicken von Lektionen.':
    'Learn like Duolingo: five stages on a winding path, short exercises and visible progress. No daily streaks or score points just for opening lessons.',
  'Standalone HTML · Ohne Backend · Alle Daten synthetisch':
    'Standalone HTML · No backend · All data is synthetic',
  'Interaktive Produktstudie · keine offizielle Bank-App':
    'Interactive product concept · Not an official banking app',
  'Hallo, Lena.': 'Hello, Lena.',
  'Mittwoch, 11. November': 'Wednesday, November 11',
  GESAMTÜBERSICHT: 'ACCOUNT OVERVIEW',
  'Deine Konten und Depots im Überblick': 'Your accounts and investments at a glance',
  Girokonto: 'Current account',
  Depot: 'Investment portfolio',
  'Für dich': 'For you',
  'Persönliche Einblicke': 'Personal insights',
  'Du baust finanzielle Stabilität auf.': "You're building financial stability.",
  '1 nächster Schritt verfügbar': '1 next step available',
  '+0,8 diese Woche ↗': '+0.8 this week ↗',
  'Details öffnen →': 'View details →',
  FinanzPlaner: 'Financial Planner',
  'Einnahmen & Ausgaben': 'Income & expenses',
  'Karten & Services': 'Cards & services',
  'Alle Funktionen': 'All services',
  Übersicht: 'Overview',
  Zahlungen: 'Payments',
  Investieren: 'Invest',
  Profil: 'Profile',
  'Alle Funktionen sind klickbar. Keine echten Bankdaten oder Überweisungen.':
    'All features are interactive. No real banking data or transfers.',
  'Die Nutzerreise': 'THE USER JOURNEY',
  'Ein Widget. Vier Momente.': 'One widget. Four moments.',
  Entdecken: 'Discover',
  'Auf der Banking-Startseite: Score, Veränderung der Woche und subtiler Trend.':
    'On the banking home screen: score, weekly change and a subtle trend.',
  Verstehen: 'Understand',
  'Score entfaltet die Teilbewertungen. Persönliche Eingaben werden im selben Bildschirm bestätigt – ohne Formularseiten.':
    'Tap the score to reveal four sub-scores: two left and two right.',
  Handeln: 'Take action',
  'Ein nächster Schritt oder eine bestätigte Planung – direkt im Widget, ohne neue Seite.':
    'One next step and a Duolingo-style Wealth Journey: five short learning stages with optional real-life activities.',
  Begleiten: 'Get support',
  'Ein festes Eingabefeld für Fragen und Pläne; Beraterkontakt nur auf Wunsch.':
    'Ask the coach, involve an advisor for complex decisions or transition to wealth planning.',
  'Warum Nutzer zurückkehren:': 'Why people return:',
  'Ein relevanter Monatsrückblick, veränderte Lebenssituation oder eine offene Entscheidung. Keine künstlichen täglichen Aufgaben.':
    'A useful monthly review, a change in circumstances or an upcoming decision. No artificial daily chores.',
  'Score-Bereiche ausgewählt aus:': 'Source of the four categories:',
  ', Abschnitt „Potential Data Sources“.': ', section “Potential Data Sources”.',
  'The synthetic assessment is not statistically validated.':
    'The sample figures are illustrative, not empirically validated.',
  'Wochenverlauf ein oder aus': 'Toggle weekly trend',
  'Score zeigen oder verbergen': 'Show or hide score',
  'PULS Financial Health öffnen': 'Open PULS Financial Health',
  Basis: 'Foundation',
  Verhalten: 'Behavior',
  Wissen: 'Knowledge',
  'von 100': 'out of 100',
  'Tippen für Teilbewertungen ↔': 'Tap to see sub-scores ↔',
  Zukunft: 'Future',
  Lebenspläne: 'Life plans',
  Lernen: 'Learning',
  'Vermögen bewahren': 'Preserve your wealth',
  'Cashflow, Wealth Management und Nachfolge': 'Cash flow, wealth management and succession',
  'Vermögen gestalten': 'Manage your wealth',
  'Diversifikation, Steuern, Risiko': 'Diversification, taxes and risk',
  'Vermögen starten': 'Start building wealth',
  'Sparquote, Investments und Automatisierung': 'Savings rate, investing and automation',
  'Sicherheit aufbauen': 'Build financial security',
  'Sparroutine und Notgroschen': 'Savings habit and emergency fund',
  'Jetzt verbessern ↗': 'Improve now ↗',
  'Finanzen verstehen': 'Understand your finances',
  'Überblick über Einnahmen und Ausgaben': 'Overview of income and spending',
  'Abgeschlossen ✓': 'Completed ✓',
  Zurück: 'Back',
  'PULS Coach öffnen': 'Open PULS Coach',
  'Finanzielle Basis: 44 von 100': 'Financial foundation: 44 out of 100',
  'Verhalten: 65 von 100': 'Behavior: 65 out of 100',
  'Finanzwissen: 72 von 100': 'Financial knowledge: 72 out of 100',
  'Financial Health Score 58 von 100, vier Unterbewertungen anzeigen':
    'Financial Health Score 58 out of 100; show six sub-scores on either side',
  'Zukunft: 48 von 100': 'Future: 48 out of 100',
  'Lebensphasen: 60 von 100': 'Life events: 60 out of 100',
  'Lernen: 60 von 100': 'Learning: 60 out of 100',
  'Wealth Journey: Level 1 unten, Level 5 oben; nach oben scrollen':
    'Wealth Journey: level 1 at the bottom, level 5 at the top; scroll upward',
  'Level 5: Vermögen bewahren': 'Level 5: Preserve your wealth',
  'Level 4: Vermögen gestalten': 'Level 4: Manage your wealth',
  'Level 3: Vermögen starten': 'Level 3: Start building wealth',
  'Level 2: Sicherheit aufbauen, dein nächster Schritt':
    'Level 2: Build financial security, your next step',
  'Level 1: Finanzen verstehen': 'Level 1: Understand your finances',
  'Was steht bei dir an? Urlaub, Umzug …': "What's coming up? Vacation, moving …",
  'Persönlichen Plan eingeben': 'Enter a personal plan',
  'Nachricht senden': 'Send message',
  'Finanzielle Basis': 'Financial foundation',
  'DEIN BEFUND': 'YOUR ASSESSMENT',
  'Deine Notreserve ist ausbaufähig.': 'Your emergency savings could be stronger.',
  'Bei notwendigen Ausgaben von etwa 1.800 € reicht deine verfügbare Reserve für rund zwei Monate.':
    'With essential spending of around €1,800, your accessible savings cover about two months.',
  Notreserve: 'Emergency savings',
  '2,0 von 3,0 Monaten': '2.0 of 3.0 months',
  'DEIN NÄCHSTER SCHRITT': 'YOUR NEXT STEP',
  'Notreserve stärken': 'Strengthen your emergency fund',
  'Bis zum beispielhaften Drei-Monats-Ziel fehlen noch 1.800 €. Ein kleiner monatlicher Betrag kann helfen.':
    "You're €1,800 away from the example target of three months of essential expenses. Small monthly contributions can help.",
  'Sparbetrag festlegen': 'Choose a savings amount',
  'Warum diese Empfehlung?': 'Why this recommendation?',
  'Demo-Werte · Keine echte Kontobewegung': 'Demo figures · No real account activity',
  'Finanzielle Basis: 44 von 100 Punkten': 'Financial foundation: 44 out of 100 points',
  'Finanzielle Basis: Diagnose und Empfehlung (ohne vertikales Scrollen)':
    'Financial foundation: assessment and recommendation (no vertical scrolling)',
  'DEINE NÄCHSTE HANDLUNG': 'YOUR NEXT ACTION',
  'Monatlicher Betrag': 'Monthly contribution',
  'Bei diesem Betrag erreichst du das beispielhafte Ziel in':
    "At this rate, you'll reach the example target in",
  '12 Monaten': '12 months',
  ', sofern du die Rücklagen nicht benötigst.':
    ", provided you don't need to draw on these savings.",
  'Plan unverbindlich vormerken': 'Save as a draft plan',
  '‹ Zurück zur Empfehlung': '‹ Back to recommendation',
  'Zusätzlicher monatlicher Sparbetrag': 'Additional monthly savings amount',
  'TRANSPARENT ERKLÄRT': 'HOW THIS WAS CALCULATED',
  'Berechnet aus 3.600 € kurzfristig verfügbaren Rücklagen geteilt durch geschätzte 1.800 € notwendige Monatsausgaben. Andere Konten können diesen Wert verändern.':
    'Calculated from €3,600 of readily available savings divided by estimated essential monthly spending of €1,800. Other accounts may change this figure.',
  'Zurück zur Empfehlung': 'Back to recommendation',
  'Deine Sparroutine ist noch unregelmäßig.': "Your savings habit isn't consistent yet.",
  'In vier der vergangenen sechs Monate hast du Geld zurückgelegt. Das ist eine gute Grundlage.':
    "You saved money in four of the last six months. That's a good starting point.",
  'Monate mit Ersparnissen': 'Months with savings',
  '4 von 6': '4 out of 6',
  'Eine einfache Sparroutine entwickeln': 'Build a simple savings routine',
  'Lege einen Betrag fest, der auch in Monaten mit höheren Ausgaben realistisch ist.':
    'Choose an amount that also feels manageable in months with higher expenses.',
  'Sparroutine planen': 'Plan savings routine',
  'Verhalten: 65 von 100 Punkten': 'Behavior: 65 out of 100 points',
  'Verhalten: Diagnose und Empfehlung (ohne vertikales Scrollen)':
    'Behavior: assessment and recommendation (no vertical scrolling)',
  'Monatlich regelmäßig sparen': 'Save regularly each month',
  'Der Betrag ist ein Entwurf. Er sollte erst nach Prüfung deiner freien Liquidität eingerichtet werden.':
    'This is only a draft. First check that you have enough disposable income to support it.',
  'Routine vormerken': 'Save routine as draft',
  'Monatliche Sparroutine': 'Monthly savings routine',
  Finanzwissen: 'Financial knowledge',
  'Dein Finanzwissen hat eine gute Basis.': 'You have a solid foundation of financial knowledge.',
  'Im Demo-Wissenstest waren vier von fünf Antworten richtig. Vertiefe dein Verständnis von Kaufkraft.':
    'You answered four out of five demo questions correctly. Strengthen your understanding of purchasing power.',
  'Richtig beantwortet': 'Correct answers',
  '4 von 5 Fragen': '4 out of 5 questions',
  'Inflation kurz überprüfen': 'Check your understanding of inflation',
  'Eine konkrete Wissensfrage hilft mehr als ein allgemeiner Lernhinweis.':
    'One specific knowledge question is more helpful than a generic reminder to learn.',
  'Wissensfrage starten': 'Start quick question',
  'Finanzwissen: 72 von 100 Punkten': 'Financial knowledge: 72 out of 100 points',
  'Finanzwissen: Diagnose und Empfehlung (ohne vertikales Scrollen)':
    'Financial knowledge: assessment and recommendation (no vertical scrolling)',
  'Dein Konto erhält 2 % Zinsen, die Preise steigen 4 %. Was passiert mit deiner Kaufkraft?':
    'Your account earns 2% interest while prices rise by 4%. What happens to your purchasing power?',
  'Sie steigt': 'It increases',
  'Sie sinkt': 'It decreases',
  'Sie bleibt gleich': 'It stays the same',
  'Bei deiner Absicherung fehlen noch Angaben.':
    'Some details about your financial protection are missing.',
  'PULS kennt nicht alle Vorsorge- und Versicherungsinformationen. Eine verlässliche Beurteilung ist daher noch nicht möglich.':
    "PULS doesn't have all your pension and insurance information yet, so a reliable assessment isn't possible.",
  Erfassung: 'Data coverage',
  'Teilweise bekannt': 'Partially known',
  'Vorsorge-Überblick vervollständigen': 'Complete your protection overview',
  'Prüfe als Erstes, ob dein Einkommen bei längerer Arbeitsunfähigkeit abgesichert ist.':
    'First, check whether your income is protected against long-term inability to work.',
  'Absicherung einordnen': 'Review your protection',
  'Zukunft: 48 von 100 Punkten': 'Future: 48 out of 100 points',
  'Zukunft: Diagnose und Empfehlung (ohne vertikales Scrollen)':
    'Future: assessment and recommendation (no vertical scrolling)',
  'Ist dein Einkommen bei längerer Arbeitsunfähigkeit abgesichert?':
    "Is your income protected if you're unable to work for an extended period?",
  Ja: 'Yes',
  Nein: 'No',
  'Weiß ich nicht': 'Not sure',
  Lebensphasen: 'Life events',
  'Deine nächsten Pläne verdienen einen Platz.': 'Your upcoming plans deserve attention.',
  'Du hast einen möglichen Umzug erwähnt. Bisher sind Kaution, Einrichtung und neue Fixkosten noch nicht eingeplant.':
    "You mentioned a potential move. The deposit, furnishings and new fixed costs aren't included in your plan yet.",
  Planungsstatus: 'Planning status',
  'Umzug noch nicht kalkuliert': 'Move not yet budgeted',
  'Ein Lebensziel finanziell vorbereiten': 'Prepare financially for a life event',
  'Wähle ein Vorhaben, damit PULS mit Budget und Zeitraum rechnen kann.':
    'Choose a plan so PULS can calculate a budget and timeline.',
  'Vorhaben wählen': 'Choose a life event',
  'Lebensphasen: 60 von 100 Punkten': 'Life events: 60 out of 100 points',
  'Lebensphasen: Diagnose und Empfehlung (ohne vertikales Scrollen)':
    'Life events: assessment and recommendation (no vertical scrolling)',
  'Was möchtest du planen?': 'What would you like to plan?',
  Urlaub: 'Vacation',
  Umzug: 'Moving',
  Gründung: 'Starting a business',
  'Dein Entwurf erscheint unten im Eingabefeld. Du kannst ihn ändern, bevor du ihn absendest.':
    'Your draft will appear in the input field below. You can edit it before sending.',
  'Du bist auf deinem Lernweg.': "You're making progress on your learning journey.",
  'Die Grundlagen sind abgeschlossen. Der nächste sinnvolle Schritt ist finanzielle Sicherheit.':
    "You've completed the basics. Financial security is a useful next topic.",
  Lernweg: 'Learning journey',
  '1 von 5 Stufen abgeschlossen': '1 of 5 stages completed',
  'Sicherheit verstehen': 'Understand financial security',
  'Eine kurze Übung über den Notgroschen, danach optional ein praktischer Sparplan.':
    'A short lesson about emergency savings, followed by an optional practical savings plan.',
  'Lernschritt ausprobieren': 'Try a learning step',
  'Lernen: 60 von 100 Punkten': 'Learning: 60 out of 100 points',
  'Lernen: Diagnose und Empfehlung (ohne vertikales Scrollen)':
    'Learning: assessment and recommendation (no vertical scrolling)',
  'Wofür eignet sich eine Notreserve am ehesten?': 'What is an emergency fund best suited for?',
  'Kurzfristig verfügbar und risikoarm': 'Accessible at short notice and low risk',
  'Ausschließlich für riskante Anlagen': 'Risky investments only',
  'DEIN LERNPFAD': 'YOUR LEARNING PATH',
  '✦ 5 Stationen': '✦ 5 stages',
  'Dein Weg zur Vermögensplanung.': 'Your journey to wealth planning.',
  'Kleine Lernschritte, echte Fortschritte. Finanzbasis, Vermögensaufbau und Schutz – passend zu deiner Lebensphase.':
    'Small learning steps, real progress. Financial foundations, wealth building and protection—suited to your stage of life.',
  Fertig: 'Done',
  'Weiter →': 'Continue →',
  'Ansehen ›': 'View ›',
  'Lernen ist nicht dein Score.': 'Learning is not your score.',
  'Wissen hilft dir, Entscheidungen zu treffen. Dein PULS verändert sich nur, wenn zugrunde liegende Messwerte oder verifiziertes Verhalten sich ändern.':
    'Knowledge helps you make decisions. Your PULS score only changes when underlying measurements or verified behavior change.',
  'Orientiert an Roland Berger / House of Finance & Tech, „The untapped opportunity“, Abb. E, S. 16–17. Die Stationen sind ein PULS-Konzept, kein offizielles Roland-Berger-Programm.':
    'Inspired by Roland Berger / House of Finance & Tech, “The untapped opportunity”, figure E, pp. 16–17. These stages are a PULS concept, not an official Roland Berger program.',
  'Stufe 1: Finanzen verstehen': 'Stage 1: Understand your finances',
  'Stufe 2: Sicherheit aufbauen': 'Stage 2: Build financial security',
  'Stufe 3: Vermögen starten': 'Stage 3: Start building wealth',
  'Stufe 4: Vermögen gestalten': 'Stage 4: Manage your wealth',
  'Stufe 5: Vermögen bewahren': 'Stage 5: Preserve your wealth',
  'WEALTH GUIDE · STUFE 2 VON 5': 'WEALTH GUIDE · STAGE 2 OF 5',
  '◉ Lernstation': '◉ Learning stage',
  '01 · Finanzbasis': '01 · Financial foundation',
  'Budget strukturieren, Spargewohnheit beginnen, Rücklagen bilden':
    'Structure a budget, start saving and build reserves',
  '02 · Vermögen': '02 · Wealth',
  'Sparziele und erste Altersvorsorge verstehen':
    'Understand savings goals and the basics of retirement planning',
  '03 · Absicherung': '03 · Protection',
  'Einkommensschutz und vorhandene Policen prüfen':
    'Review income protection and existing insurance policies',
  '60-SEKUNDEN-WISSENSCHECK': '60-SECOND KNOWLEDGE CHECK',
  'Wo ist Geld für eine unerwartete Reparatur grundsätzlich am passendsten?':
    'Where should money for an unexpected repair generally be kept?',
  'Vollständig in einer Einzelaktie': 'Entirely in one individual stock',
  'Zum Lernpfad zurück': 'Back to learning path',
  'Notreserve von zwei auf drei Monatsausgaben ausbauen. · Kein XP für Trades, keine Anlageempfehlung.':
    'Build emergency savings from two to three months of expenses. · No XP for trading, no investment recommendations.',
  'PULS · Umsetzung': 'PULS · Taking action',
  'Mission 01 · Resilienz': 'Mission 01 · Resilience',
  'Dein Notgroschen.': 'Your emergency fund.',
  'Du hast Rücklagen für 2 Monate. Dein nächstes Ziel ist eine Reserve für 3 Monate notwendiger Ausgaben.':
    'You have savings for two months. Your next goal is to cover three months of essential expenses.',
  'Ziel 5.400 €': 'Target €5,400',
  '2,0 Monate vorhanden': '2.0 months covered',
  '1.800 € fehlen': '€1,800 remaining',
  'Monatlich zurücklegen': 'Set aside each month',
  'Geschätzte Zeit zum Ziel': 'Estimated time to goal',
  '12 Monate': '12 months',
  'Apply to Unlock · Nachgewiesener Fortschritt': 'Apply to Unlock · Verified progress',
  'Plan erstellt': 'Plan created',
  'Regel bestätigt': 'Rule confirmed',
  Verifiziert: 'Verified',
  'Ein Vorschlag verändert den tatsächlichen Score nicht. Die Verbesserung muss erst nachgewiesen werden.':
    'A recommendation does not change your score. Progress must be verified first.',
  'Sparregel in Demo vormerken →': 'Save draft savings rule →',
  'Frage zum Plan stellen': 'Ask about the plan',
  'Monatliche Sparrate': 'Monthly savings contribution',
  'Deine Pläne zählen.': 'Your plans matter.',
  'Kontodaten zeigen, was passiert ist. Du weißt, was als Nächstes kommt. Beides zusammen macht deine Planung besser.':
    "Account data shows what happened. You know what's coming next. Together, they make your planning more effective.",
  '✧ Ich plane etwas – Urlaub, Umzug, Gründung  ›':
    "✧ I'm planning something – vacation, a move, starting a business  ›",
  '◎ Warum ist mein Notgroschen zu klein?  ›': '◎ Why is my emergency fund too small?  ›',
  '◉ Wie berechnet sich mein PULS Score?  ›': '◉ How is my PULS score calculated?  ›',
  'Pläne werden nur mit deiner Bestätigung gespeichert. Sie verändern den gemessenen Score nicht automatisch.':
    "Plans are only saved with your confirmation. They don't automatically change your measured score.",
  'Wenn es komplex wird:': 'When it gets complicated:',
  'Nach deiner Freigabe kann ein Berater die relevanten Fragen und Daten erhalten.':
    'With your permission, an advisor can receive the relevant questions and data.',
  'Beratungsgespräch anfragen ↗': 'Request an advisor call ↗',
  'Regelbasierte Demo ohne Live-KI. Keine Anlageberatung.':
    'Rule-based demo without live AI. Not investment advice.',
  'PULS · Deine Perspektive': 'PULS · Your perspective',
  'Was steht bei dir an?': "What's coming up?",
  'Wir kennen deine Zahlen. Erzähl uns, was du vorhast – auch wenn es noch nicht in deinen Kontodaten steht.':
    "We know your numbers. Tell us what you're planning—even if it's not reflected in your accounts yet.",
  '☼ Urlaub': '☼ Vacation',
  '⌂ Umzug': '⌂ Moving',
  '✦ Gründung': '✦ Starting a business',
  'Dein Vorhaben in deinen Worten': 'Describe your plan in your own words',
  'Ich plane im März einen Urlaub für 1.500 €.': "I'm planning a €1,500 vacation in March.",
  'So funktioniert es': 'How it works',
  'PULS erkennt im Konzeptdemo-Text ein mögliches Ziel und fragt dich anschließend nach Kosten und Zeitraum.':
    'PULS identifies a possible goal from this demo text and then asks about cost and timing.',
  'Nichts wird ohne Bestätigung übernommen.': 'Nothing is saved without confirmation.',
  'Plan unverbindlich auswerten →': 'Explore this plan →',
  Abbrechen: 'Cancel',
  'Demo ohne externes KI-Modell. Nur lokale Texteingabe, keine Bankdatenübertragung.':
    'Demo without an external AI model. Local text input only; no banking data is transmitted.',
  'Zum Beispiel: Ich plane einen Urlaub im März für 1.500 €':
    "For example: I'm planning a €1,500 vacation in March",
  'Vorhaben beschreiben': 'Describe your plan',
  'PULS · Bitte bestätigen': 'PULS · Please confirm',
  'Habe ich dich richtig verstanden?': 'Did I understand correctly?',
  'Aus deinem Text wurde ein möglicher Plan abgeleitet. Du kannst alle Angaben korrigieren.':
    'We interpreted a possible plan from your message. You can correct any details.',
  'Erkanntes Vorhaben': 'Detected plan',
  Zielmonat: 'Target month',
  'Dezember 2026': 'December 2026',
  'Januar 2027': 'January 2027',
  'Februar 2027': 'February 2027',
  'März 2027': 'March 2027',
  'April 2027': 'April 2027',
  'Mai 2027': 'May 2027',
  'Juni 2027': 'June 2027',
  'Juli 2027': 'July 2027',
  'August 2027': 'August 2027',
  'September 2027': 'September 2027',
  'Oktober 2027': 'October 2027',
  'November 2027': 'November 2027',
  'Was PULS damit macht': 'What PULS does with this',
  'Wir betrachten deine finanzielle Belastbarkeit und berechnen eine mögliche monatliche Zielrate. Keine automatische Überweisung, kein Einfluss auf deinen gemessenen Score.':
    'We assess your financial capacity and calculate a possible monthly savings target. No automatic transfer and no impact on your measured score.',
  'Vorhaben bestätigen und prüfen →': 'Confirm and assess plan →',
  'Angaben bearbeiten': 'Edit details',
  'PULS · Deine Planung': 'PULS · Your plan',
  'Urlaub – ohne böse Überraschung.': 'Vacation — without unexpected costs.',
  'Dein Ziel gehört zu deiner persönlichen Planung, nicht automatisch in die Bewertung deiner finanziellen Gesundheit.':
    'Your goal belongs in your financial planning, not automatically in your financial health score.',
  'Geplantes Budget': 'Planned budget',
  'Mit 4 Monaten Vorlauf wären rund': 'With four months to prepare, you would need around',
  '375 € pro Monat': '€375 per month',
  'in einem separaten Spartopf nötig.': 'in a separate savings pot.',
  'Was passiert mit deiner Reserve?': 'What happens to your reserve?',
  'Aktuelle Notreserve': 'Current emergency savings',
  'Reserve bei Zahlung daraus': 'Savings if you pay from this fund',
  'Verbleibende Deckung': 'Remaining coverage',
  '1,2 Monate': '1.2 months',
  Empfehlung: 'Recommendation',
  'Plane die 1.500 € möglichst getrennt von der Notreserve. Prüfe, ob 375 € monatlich zusätzlich zu laufenden Ausgaben und Rücklagenaufbau realistisch sind.':
    'Try to save the €1,500 separately from your emergency fund. Check whether an additional €375 per month is affordable alongside expenses and existing savings goals.',
  'Als persönlichen Plan vormerken →': 'Save as personal plan →',
  'Plan ändern': 'Edit plan',
  'Simulation mit Demo-Daten. Keine Überweisung und keine automatische finanzielle Entscheidung.':
    'Simulation with demo data. No transfers or automated financial decisions.',
  Stufe: 'Stage',
  'Stufe 1': 'Stage 1',
  'Stufe 2': 'Stage 2',
  'Stufe 3': 'Stage 3',
  'Stufe 4': 'Stage 4',
  'Stufe 5': 'Stage 5',
  'von 100 Punkten': 'out of 100 points',
  'Teilbewertungen schließen ↔': 'Close sub-scores ↔',
  'Teilbewertungen schließen': 'Close sub-scores',
  'Tippen für Teilbewertungen': 'Tap to see sub-scores',
  Teilbewertungen: 'Sub-scores',
  'Dein PULS': 'Your PULS',
  'Deine Notreserve ist vollständig.': 'Your emergency fund is fully funded.',
  'Meilenstein erreicht': 'Milestone reached',
  '+3,5 seit letztem Meilenstein': ' +3.5 since last milestone',
  'Demo: keine Benachrichtigungen': 'Demo: no notifications',
  'Zahlungen sind nicht Teil des Prototyps': 'Payments are not part of this prototype',
  'Depot-Demo nicht implementiert': 'Portfolio demo not implemented',
  'Profil-Demo nicht implementiert': 'Profile demo not implemented',
  'Bitte schließe zuerst den Wissenscheck ab.': 'Please complete the knowledge check first.',
  'Lernstation abgeschlossen. Dein PULS-Score bleibt unverändert.':
    'Learning stage completed. Your PULS score is unchanged.',
  '✓ Abgeschlossen': '✓ Completed',
  '✓ Richtig.': '✓ Correct.',
  'Noch nicht ganz.': 'Not quite.',
  'Versuche es erneut.': 'Please try again.',
  'Lernstation abschließen ✓': 'Complete learning stage ✓',
  'Notreserve in der Praxis angehen →': 'Put emergency savings into practice →',
  'Dein PULS-Score bleibt unverändert.': 'Your PULS score remains unchanged.',
  'Sparregel als Demo-Entwurf vorgemerkt. Noch nicht umgesetzt.':
    'Savings rule saved as a demo draft; not implemented.',
  '✓ Sparregel als Demo-Entwurf vorgemerkt. Noch nicht umgesetzt.':
    '✓ Savings rule saved as a demo draft; not implemented.',
  'Simulierten Nachweis ansehen': 'View simulated verification',
  'Sparroutine im Demo-Profil vorgemerkt.': 'Savings routine saved in the demo profile.',
  '✓ Sparroutine im Demo-Profil vorgemerkt.': '✓ Savings routine saved in the demo profile.',
  'Angabe erfasst:': 'Response recorded:',
  'Für eine verlässliche Prüfung werden Vertragsinformationen benötigt. Der Score bleibt vorläufig.':
    'Policy details are required for a reliable assessment. The score remains provisional.',
  '✓ Genau. Die reale Kaufkraft sinkt, weil die Preise schneller steigen.':
    '✓ Correct. Your purchasing power falls because prices are rising faster.',
  'Nicht ganz. Wenn Preise stärker steigen als die Verzinsung, sinkt die Kaufkraft.':
    'Not quite. When prices rise faster than interest earned, purchasing power falls.',
  '✓ Richtig. Eine Reserve muss im Notfall erreichbar sein.':
    '✓ Correct. Your emergency savings need to be accessible when needed.',
  'Risikoanlagen können im falschen Moment an Wert verlieren.':
    'Risky investments can lose value at the worst possible time.',
  'Lernschritt abschließen': 'Complete learning step',
  '✓ Diese Übung ist abgeschlossen.': '✓ This exercise is complete.',
  'Lernstufe abgeschlossen; der Financial Health Score bleibt unverändert.':
    'Learning stage complete; your Financial Health score is unchanged.',
  'Bitte beantworte erst die Übung richtig.': 'Please answer the exercise correctly first.',
  'Nur im Demo-Profil vorgemerkt – keine echte Sparregel erstellt.':
    'Saved as a demo draft only—no real savings rule was created.',
  'Du hast bereits Grundlagenmodule absolviert, aber noch keine neue Übung gestartet.':
    'You have completed basic modules but have not started a new exercise.',
  Sparen: 'Saving',
  'Gut entwickelt': 'Well developed',
  'Im Aufbau': 'Developing',
  'Hier besteht Potenzial': 'Room for improvement',
  'PULS · Bereichsdiagnose': 'PULS · Category assessment',
  'Dieser Teilwert ist eine exemplarische Modellbewertung.':
    'This sub-score is an illustrative model assessment.',
  'Dein Bereichswert': 'Your category score',
  'Einfluss auf den PULS-Gesamtwert abhängig von Gewichtung und Lebensphase.':
    'The impact on the overall PULS score depends on weighting and life stage.',
  'Was steckt dahinter?': 'What is behind this?',
  'Empfohlener nächster Schritt': 'Recommended next step',
  'Konkreten Plan öffnen': 'Open action plan',
  'Mit dem Coach vertiefen': 'Explore with the coach',
  'Zu allen Bereichen': 'Back to all categories',
  'Simulation abgeschlossen: Regelmäßige Einzahlungen und 60 Tage gehaltene Reserve sind nachgewiesen. v0.2 demonstration score recalculated.':
    'Simulation complete: illustrative savings were verified in the demo; the v0.2 score is recalculated.',
  'Die Regel ist für die Demo vorgemerkt. Noch keine Score-Punkte: Es fehlen reale Nachweise.':
    'The rule is saved as a demo draft. No score points yet: actual verification is still missing.',
  'Verifizierten Fortschritt ansehen →': 'View verified progress →',
  'Monate simulieren und prüfen →': 'months simulated and verified →',
  'Sparregel vorgemerkt – keine reale Kontobewegung.':
    'Savings rule saved as a draft—no actual account activity.',
  'Synthetische Einzahlungen und Halteperiode erfolgreich geprüft.':
    'Synthetic deposits and holding period verified successfully.',
  'PULS Antwort': 'PULS response',
  'Du hast derzeit 3.600 € Reserve bei geschätzten notwendigen Ausgaben von 1.800 € im Monat. Das deckt 2 Monate. Für 3 Monate wären 5.400 € nötig. Der Coach erklärt den Rechenweg – nicht, ob du ein Finanzprodukt kaufen solltest.':
    'You currently have €3,600 in emergency savings and estimated essential monthly expenses of €1,800. This covers two months. Three months would require €5,400. The coach explains the calculation; it does not tell you to buy a financial product.',
  'Für einen Umzug brauchst du neben laufenden Kosten meist einen einmaligen Puffer. Prüfe zuerst Kaution, Einrichtung und deine neue monatliche Belastung. Deine vorhandene Notreserve sollte nicht vollständig aufgebraucht werden.':
    'A move often requires a one-off buffer on top of regular costs. Review the deposit, furnishings and your new monthly expenses. Avoid exhausting your emergency savings.',
  'Dein synthetischer PULS-Score ergibt sich aus vier gewichteten Bereichen. Eine Lernübung kann Wissen verbessern; eine belegte Verhaltensänderung wirkt erst bei nachgewiesener Umsetzung. Die Bewertung ist ein Prototyp, keine validierte individuelle Diagnose.':
    'Your synthetic PULS score combines four weighted categories. A lesson can build knowledge; behavior affects the score only after the change is verified. This is a prototype, not a validated personal diagnosis.',
  'Demo: Keine echte Beratungsanfrage erstellt.': 'Demo: no actual advisory request was created.',
  'Ich möchte im Mai umziehen und rechne mit 2.400 €.':
    'I plan to move in May and expect costs of €2,400.',
  'Ich plane eine Selbstständigkeit und brauche etwa 4.000 € Startkapital.':
    'I plan to become self-employed and will need around €4,000 in startup capital.',
  'Persönliches Ziel': 'Personal goal',
  'Bitte beschreibe kurz, was du planst.': 'Please briefly describe what you are planning.',
  'Bitte gib ein realistisches Budget ein.': 'Please enter a realistic budget.',
  'Plan ist vorgemerkt ✓': 'Plan saved as a draft ✓',
  'Persönliches Vorhaben vorgemerkt – unverbindlich.':
    'Personal plan saved as a draft, with no commitment.',
  Sparregel: 'Savings rule',
  'Umzug – ohne böse Überraschung.': 'Moving — without unexpected costs.',
  'Gründung – ohne böse Überraschung.': 'Starting a business — without unexpected costs.',
  'Persönliches Ziel – ohne böse Überraschung.': 'Personal goal — without unexpected costs.',
  'Als persönlichen Plan vormerken': 'Save as a personal plan',
  'Plan ist vorgemerkt': 'Plan saved as a draft',
  'Notreserve von zwei auf drei Monatsausgaben ausbauen.':
    'Increase emergency savings from two to three months of essential expenses.',
  'Keine Anlageempfehlung.': 'Not investment advice.',
  'Deine Einnahmen': 'Your income',
  Grundlagen: 'Basics',
  'Einnahmen und Ausgaben erfassen, Schulden überblicken':
    'Track income, expenses and outstanding debts',
  'Ziele festlegen, Finanzwissen aufbauen': 'Set goals and build financial knowledge',
  'Grundabsicherung und Betrugsrisiken verstehen': 'Understand basic protection and fraud risks',
  'Was gehört zu einem soliden Überblick über deine Finanzen?':
    'What belongs in a complete financial overview?',
  'Nur der Girokontostand': 'Only the current account balance',
  'Einnahmen, Ausgaben und Verpflichtungen': 'Income, expenses and financial obligations',
  'Finanzielle Transparenz ist die Basis für bewusste Entscheidungen.':
    'Financial visibility is the foundation of informed decisions.',
  'Ausgaben und Verbindlichkeiten vollständig erfassen.': 'Record all expenses and liabilities.',
  Sicherheit: 'Security',
  'Eine Reserve soll unerwartete Ausgaben auffangen und daher verlässlich verfügbar sein.':
    'An emergency fund should cover unexpected expenses and remain reliably accessible.',
  Aufbau: 'Wealth building',
  'Sparquote erhöhen und finanzielle Puffer ausbauen':
    'Increase savings rate and financial buffers',
  'Breit gestreute Anlagen, langfristiges Sparen, automatisierte Beiträge kennenlernen':
    'Explore diversification, long-term savings and automated contributions',
  'Familie und langfristige Risiken berücksichtigen': 'Consider family needs and long-term risks',
  'Was ist ein wesentlicher Vorteil einer breiten Streuung?':
    'What is a key benefit of broad diversification?',
  'Sie garantiert Gewinne': 'It guarantees profits',
  'Sie senkt das Risiko einer einzelnen Position': 'It reduces exposure to one individual holding',
  'Diversifikation verteilt spezifische Risiken, schützt aber nicht vor allen Verlusten.':
    'Diversification spreads specific risks but cannot prevent every loss.',
  'Diversifikation und vorhandene Sparpläne prüfen.':
    'Review diversification and existing savings plans.',
  Strategie: 'Strategy',
  'Finanzielle Flexibilität und planbare Liquidität stärken':
    'Improve financial flexibility and predictable liquidity',
  'Vermögensaufteilung, Diversifikation und Steuerthemen verstehen':
    'Understand asset allocation, diversification and taxes',
  'Versicherungsschutz bedarfsgerecht überprüfen': 'Review insurance coverage for suitability',
  'Welche Aussage gehört zu verantwortungsvoller Anlageplanung?':
    'Which statement reflects responsible investment planning?',
  'Risiko und Zeithorizont müssen zur Situation passen':
    'Risk and time horizon should match your circumstances',
  'Maximale Rendite ist immer das wichtigste Ziel': 'Maximizing returns is always the top priority',
  'Strategie richtet sich nach Bedürfnissen, Zielen, Risiken und Zeithorizont.':
    'Your strategy should reflect your needs, goals, risk and time horizon.',
  'Eigene Risiken und Ziele dokumentieren.': 'Record your own risks and goals.',
  Weitblick: 'Long-term perspective',
  'Langfristige Liquidität und Einkommensquellen planen':
    'Plan long-term liquidity and sources of income',
  'Gesamtvermögen strukturieren und Vermögensübergänge verstehen':
    'Structure total wealth and understand transfers of wealth',
  'Nachlassplanung, Vollmachten und Vermögensschutz klären':
    'Review estate planning, powers of attorney and asset protection',
  'Was gehört zu einer guten Nachfolgevorbereitung?':
    'What belongs in effective succession planning?',
  'Nur die Depotgröße': 'Only the size of your portfolio',
  'Wünsche, Dokumente, Zuständigkeiten und Begünstigte':
    'Wishes, documents, responsibilities and beneficiaries',
  'Vorausschauende Planung berücksichtigt Menschen, Dokumente und Ziele.':
    'Forward planning considers people, documents and goals.',
  'Bei komplexem Vermögen passende Beratungsoption prüfen.':
    'Consider professional advice for complex wealth matters.',
  '✓ Richtig. Eine Reserve soll unerwartete Ausgaben auffangen und daher verlässlich verfügbar sein.':
    '✓ Correct. Emergency savings need to cover unexpected expenses and remain accessible.',
  '✓ Richtig. Finanzielle Transparenz ist die Basis für bewusste Entscheidungen.':
    '✓ Correct. Financial visibility supports informed decisions.',
  '✓ Richtig. Diversifikation verteilt spezifische Risiken, schützt aber nicht vor allen Verlusten.':
    '✓ Correct. Diversification spreads risks but does not prevent every loss.',
  '✓ Richtig. Strategie richtet sich nach Bedürfnissen, Zielen, Risiken und Zeithorizont.':
    '✓ Correct. A strategy needs to match your needs, risks and goals.',
  '✓ Richtig. Vorausschauende Planung berücksichtigt Menschen, Dokumente und Ziele.':
    '✓ Correct. Forward planning considers people, documents and goals.',
  'Noch nicht ganz. Eine Reserve soll unerwartete Ausgaben auffangen und daher verlässlich verfügbar sein. Versuche es erneut.':
    'Not quite. Emergency savings should be accessible when needed. Try again.',
  'Noch nicht ganz. Finanzielle Transparenz ist die Basis für bewusste Entscheidungen. Versuche es erneut.':
    'Not quite. A complete overview includes income, expenses and obligations. Try again.',
  'Noch nicht ganz. Diversifikation verteilt spezifische Risiken, schützt aber nicht vor allen Verlusten. Versuche es erneut.':
    'Not quite. Diversification reduces reliance on any one holding. Try again.',
  'Noch nicht ganz. Strategie richtet sich nach Bedürfnissen, Zielen, Risiken und Zeithorizont. Versuche es erneut.':
    'Not quite. Good planning considers risk and your time horizon. Try again.',
  'Noch nicht ganz. Vorausschauende Planung berücksichtigt Menschen, Dokumente und Ziele. Versuche es erneut.':
    'Not quite. Succession planning also involves documents, people and wishes. Try again.',
};
const PULS_EN_MONTHS: Record<string, string> = {
  Januar: 'January',
  Februar: 'February',
  März: 'March',
  April: 'April',
  Mai: 'May',
  Juni: 'June',
  Juli: 'July',
  August: 'August',
  September: 'September',
  Oktober: 'October',
  November: 'November',
  Dezember: 'December',
};
export function pulsEnglish(s: string) {
  const lead = s.match(/^\s*/)?.[0] ?? '',
    end = s.match(/\s*$/)?.[0] ?? '',
    body = s.trim();
  if (!body) return s;
  let t = PULS_EN_MAP[body];
  if (t === undefined) {
    t = body;
    t = t.replace(/^(\d+) Monate$/, (_, n) => n + ' months');
    t = t.replace(/^(\d+) von (\d+) Monaten$/, (_, a, b) => a + ' of ' + b + ' months');
    t = t.replace(/^(\d+) von (\d+)$/, (_, a, b) => a + ' of ' + b);
    t = t.replace(/^(\d+) von (\d+) Aufgaben$/, (_, a, b) => a + ' of ' + b + ' exercises');
    t = t.replace(/^(\d+) von (\d+) Modulen$/, (_, a, b) => a + ' of ' + b + ' modules');
    t = t.replace(/^(\d+) von (\d+) Fragen$/, (_, a, b) => a + ' of ' + b + ' questions');
    t = t.replace(
      /^(\d+(?:[,.]\d+)?) von (\d+(?:[,.]\d+)?) Monaten$/,
      (_, a, b) => a.replace(',', '.') + ' of ' + b.replace(',', '.') + ' months',
    );
    t = t.replace(/^(\d+(?:[,.]\d+)?) Monate$/, (_, n) => n.replace(',', '.') + ' months');
    t = t.replace(
      /^(.+?): (\d+) von 100 Punkten$/,
      (_, a, n) => (PULS_EN_MAP[a] || a) + ': ' + n + ' out of 100 points',
    );
    t = t.replace(
      /^(.+?): (\d+) von 100$/,
      (_, a, n) => (PULS_EN_MAP[a] || a) + ': ' + n + ' out of 100',
    );
    t = t.replace(/^Level (\d+): (.*)$/, (_, n, a) => 'Level ' + n + ': ' + (PULS_EN_MAP[a] || a));
    t = t.replace(/^Stufe (\d+): (.*)$/, (_, n, a) => 'Stage ' + n + ': ' + (PULS_EN_MAP[a] || a));
    t = t.replace(
      /^WEALTH GUIDE · STUFE (\d+) VON 5$/,
      (_, n) => 'WEALTH GUIDE · STAGE ' + n + ' OF 5',
    );
    t = t.replace(
      /^(.+) – ohne böse Überraschung\.$/,
      (_, a) => (PULS_EN_MAP[a] || a) + ' — without unexpected costs.',
    );
    for (const [de, en] of Object.entries(PULS_EN_MONTHS))
      t = t.replace(new RegExp('\\b' + de + '(?= \\d{4})', 'g'), en);
    t = t.replace(
      /^Angabe erfasst: (.*)\. Für eine verlässliche Prüfung werden Vertragsinformationen benötigt\. Der Score bleibt vorläufig\.$/,
      (_, v) =>
        'Response recorded: ' +
        (PULS_EN_MAP[v] || v) +
        '. Policy details are needed for a reliable assessment. The score remains provisional.',
    );
    t = t.replace(
      /^Mit (\d+) Monaten Vorlauf wären rund$/,
      (_, n) => 'With ' + n + ' months to prepare, you would need about',
    );
    t = t.replace(/^([\d.,\s]+) € pro Monat$/, (_, n) => '€' + n.trim() + ' per month');
    t = t.replace(/^([€\d.,\s\u00a0]+) pro Monat$/, (_, n) => n.trim() + ' per month');
    t = t.replace(
      /^(\d{1,3}(?:\.\d{3})*(?:,\d+)?)\s?€$/,
      (_, n) => '€' + n.replace(/\./g, ',').replace(',', '.'),
    );
    t = t.replace(
      /^Plane die (.+) möglichst getrennt von der Notreserve\. Prüfe, ob (.+) monatlich zusätzlich zu laufenden Ausgaben und Rücklagenaufbau realistisch sind\.$/,
      (_, a, b) =>
        'Try to save ' +
        a +
        ' separately from your emergency fund. Check whether ' +
        b +
        ' per month is affordable alongside your regular expenses and other savings goals.',
    );
    t = t.replace(
      /^(.+?) · Kein XP für Trades, keine Anlageempfehlung\.$/,
      (_, a) => (PULS_EN_MAP[a] || a) + ' · No XP for trading; not investment advice.',
    );
    t = t.replace(
      /^(.+?) von 100, vier Unterbewertungen (anzeigen|schließen)$/,
      (_, a, mode) =>
        (PULS_EN_MAP[a] || a) +
        ' out of 100; ' +
        (mode === 'anzeigen' ? 'show' : 'hide') +
        ' four sub-scores',
    );
    t = t.replace(
      /^(\d+) Monate simulieren und prüfen →$/,
      (_, n) => 'Simulate and verify ' + n + ' months →',
    );
    t = t.replace(
      /^([+−-]?[\d.,]+) diese Woche( ↗)?$/,
      (_, n, arrow) => n.replace(',', '.') + ' this week' + (arrow || ''),
    );
  }
  return lead + t + end;
}
