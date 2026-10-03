const line=(speaker,text)=>({speaker,text});
const free=(prompt,context,rows)=>({prompt,contextLabel:'Die Frage im Gespräch',contextStatement:context,reflective:true,options:rows.map(([id,text,speaker,response],i)=>({id,label:String.fromCharCode(65+i),text,reaction:[line(speaker,response)]}))});
const closed=(prompt,context,solution,rows)=>({prompt,contextLabel:'In heutiger Sprache zusammengefasst',contextStatement:context,solution,reflective:false,options:rows.map(([id,text,feedback])=>({id,text,feedback})),hints:['Unterscheide die Forderung, ihre Begründung und die Mittel zu ihrer Durchsetzung.','Prüfe, welcher Bereich betroffen ist und welche Grenze die Aussage tatsächlich nennt.']});
export const chapterFourChoices={
 ch4Authority:free('Was verlangst du vom Herrn?', 'Verwalter: „Ihr habt eure Artikel verteilt. Was genau verlangt ihr von unserem Herrn?“',[
 ['legal','Bestehende Rechte und Pflichten müssen klar geregelt und eingehalten werden.','overseer','Über einzelne Pflichten kann man vielleicht reden. Zwei Vertreter dürfen morgen wiederkommen.'],
 ['articles','Unsere Beschwerden sollen an den Zwölf Artikeln geprüft werden.','peter','Ein gedrucktes Blatt entscheidet hier kein Recht, sagt er. Aber es zeigt, dass unser Dorf nicht allein steht.'],
 ['gospel','Auch Herrschaft muss sich daran messen lassen, was vor Gott und dem Nächsten gerecht ist.','overseer','Ihr wollt aus dem Evangelium bestimmen, was der Herr tun darf? Dann will ich erst hören, wie ihr es auslegt.'],
 ['pressure','Wenn unsere Forderungen weiter abgewiesen werden, wird der Ungehorsam wachsen.','overseer','Ist das eine Drohung? Eine unmittelbare Audienz beim Herrn ist damit ausgeschlossen. Mit eurem Vertreter rede ich erst nach einer ausdrücklichen Begrenzung der Mittel.']]),
 ch4Community:free('Wozu verpflichtet sich die Gemeinde jetzt?', 'Anna: „Gemeinsam haben wir mehr Gewicht. Aber wir müssen wissen, was wir gemeinsam tragen können.“',[
 ['delegation','Eine gemeinsame Abordnung entsenden.','anna','Die Abordnung geht. Wir bleiben zusammen, aber geben ihr ein begrenztes Mandat.'],
 ['withhold_dues','Die Abgaben gemeinsam zurückhalten, bis unsere Beschwerden gehört werden.','peter','Der Wagen bleibt hier. Wenn eine Strafe kommt, müssen wir auch den Vorrat gemeinsam schützen.'],
 ['other_villages','Andere Dörfer schriftlich um Unterstützung bitten.','matthes','Ich nehme die Briefe mit. Die Entscheidung wird damit auch andernorts bekannt.'],
 ['public_meeting','Die Forderungen auf einer öffentlichen Versammlung vertreten.','anna','Dann hört sie nicht nur der Herr. Wer öffentlich spricht, kann sich später nicht einfach verstecken.']]),
 ch4Resistance:free('Was soll die Gruppe tatsächlich tun?', 'Konrad: „Wenn wir beim nächsten Mal wieder zahlen, war alles nur Gerede.“',[
 ['refuse_dues','Die nächsten Abgaben verweigern.','band1','Die Säcke bleiben im Dorf. Wir brauchen Leute, die auch beim Eintreffen des Boten dabeibleiben.'],
 ['block_storehouse','Den Zugang zum Speicher blockieren.','band2','Wir gehen zum Speicher. Dort stehen wir dem Verwalter im Weg; die Versorgung anderer hängt ebenfalls daran.'],
 ['demonstrate','Sichtbar zusammenkommen, ohne den Speicher zu besetzen.','konrad','Dann sehen sie unsere Zahl. Ob sie uns anhören, ist damit noch nicht entschieden.'],
 ['return_to_negotiation','Die Gruppe zurückhalten und noch einmal verhandeln.','peter','Ich gehe mit zum Verwalter. Die anderen müssen wissen, dass wir die Forderungen nicht aufgeben.']]),
 ch4Peasants:closed('Welche Aussage trifft den Kern am präzisesten?', 'Berechtigte Beschwerden und die Art, sie durchzusetzen, müssen getrennt geprüft werden. Christliche Freiheit liefert keinen unmittelbaren Auftrag zum Aufstand.','A',[
 ['A','Eine Forderung kann berechtigt sein, während die Mittel ihrer Durchsetzung problematisch sind.','Ja. Luther unterscheidet Beschwerden von Aufruhr; seine Kritik an den Herren bleibt bestehen.'],
 ['B','Freiheit vor Gott ist kein fertiges politisches Programm.','Das ergänzt den Kern sinnvoll. Es erklärt aber noch nicht die Unterscheidung zwischen Forderung und Mittel.'],
 ['C','Unrechte Herrschaft berechtigt automatisch zum gewaltsamen Aufstand.','Die Ermahnung kritisiert Unrecht, leitet daraus aber gerade keinen automatischen Gewaltauftrag ab.'],
 ['D','Religiöse Begründung und weltlicher Streit sind zu unterscheiden.','Eine sinnvolle Ergänzung. Zunächst ist nach der Tragfähigkeit der Forderung und ihrer Mittel zu fragen.']]),
 ch4Early:free('Wie beurteilst du Luther vorläufig?', 'Sein Freiheitsgedanke von 1520 steht nun neben seiner Friedensermahnung von 1525.',[
 ['consistent','Er folgt seinem Freiheitsverständnis, wenn er zwischen Freiheit vor Gott und äußerer Ordnung unterscheidet.','jakob','Dann müssen wir prüfen, ob diese Unterscheidung die Beschwerden ernst genug nimmt.'],
 ['tension','Zwischen beiden Schriften besteht eine Spannung, aber noch kein eindeutiger Widerspruch.','anna','An dieser Spannung hängt unser Leben. Wir brauchen beides: Freiheit und eine Antwort auf die Lasten.'],
 ['contradiction','Er öffnet mit seiner Freiheitsidee eine Tür und zieht sich bei den gesellschaftlichen Folgen zurück.','konrad','So höre ich es auch. Aber wir sollten seine Gründe prüfen, bevor wir daraus einen Auftrag machen.'],
 ['needs_authority_limit','Entscheidend ist für mich, wo er der Obrigkeit Grenzen setzt.','jakob','Dann schauen wir genau hin: Was darf sie ordnen und worüber darf sie nicht verfügen?']]),
 ch4Boundary:closed('Wo überschreitet der Herr seine Zuständigkeit?', 'Der Herr verbietet eine evangelische Predigt und verlangt, dass alle Untertanen seinen Glauben übernehmen.','A',[
 ['A','Er greift über die äußere Ordnung hinaus auf Glauben und Gewissen zu.','Glauben lässt sich für Luther nicht mit äußerer Gewalt schaffen. Das begrenzt Obrigkeit, ohne jede äußere Ordnung abzuschaffen.'],
 ['B','Damit endet jede Pflicht zum Gehorsam in allen weltlichen Angelegenheiten.','Eine Grenze beim Glauben hebt nicht sämtliche weltlichen Pflichten auf. Prüfe, welche konkrete Anordnung betroffen ist.'],
 ['C','Wer glaubt, muss keine weltlichen Gesetze mehr beachten.','Christliche Freiheit ist kein allgemeiner Freibrief gegen weltliche Regeln.'],
 ['D','Darum müssen geistliche Amtsträger jede weltliche Entscheidung bestimmen.','Die Unterscheidung macht Geistliche nicht zur übergeordneten weltlichen Regierung.']]),
 ch4Theology:free('Mit welcher Begründung willst du jetzt handeln?', 'Jakob: „Die Bibel liegt vor uns. Trotzdem ziehen wir nicht alle dieselbe Grenze zwischen Ordnung und Widerstand.“',[
 ['luther_order','Unrecht kritisieren, aber aus dem Evangelium keinen göttlichen Auftrag zu gewaltsamem Widerstand ableiten.','peter','Dann bringe ich unsere Bedingungen noch einmal zum Herrenhof. Wir brauchen eine Antwort, die unseren Alltag verändert.'],
 ['gospel_critique','Herrschaft öffentlich daran messen, ob sie dem Nächsten dient; gemeinsam verbindliche Bedingungen stellen.','anna','Wir rufen die Gemeinde zusammen. Die Bedingungen gelten auch dann, wenn nicht jeder dieselbe Auslegung teilt.'],
 ['prophetic_resistance','Eine gottwidrige Herrschaft kann den Anspruch auf Gehorsam verlieren; Widerstand kommt für mich in Betracht.','band1','Am Lager streiten wir darüber, was Widerstand heißen soll. Komm und sage, wozu du dich wirklich verpflichtest.'],
 ['hermeneutical_caution','Zuerst unsere Auslegung prüfen: Wir dürfen unseren eigenen Willen nicht einfach Gottes Willen nennen.','jakob','Wir gehen an den Tisch. Während wir prüfen, können andere bereits handeln. Das müssen wir mitbedenken.']]),
 ch4Condition:free('Welche Bedingung soll Peter vorbringen?', 'Eine Vereinbarung könnte einzelne Belastungen begrenzen, aber die Herrschaft nicht grundsätzlich aufheben.',[
 ['services','Keine zusätzlichen Dienste ohne klare Grenze und Vereinbarung.','peter','Der Verwalter lässt den Umfang der zusätzlichen Dienste prüfen. Für die übrigen Pflichten gibt er keine Zusage.'],
 ['articles','Unsere Beschwerden verbindlich an den Artikeln prüfen.','overseer','Die Beschwerden nehme ich an. Der Herr erkennt die Artikel damit nicht als allgemeines Recht an.'],
 ['dues','Keine neuen Abgaben während der Prüfung.','overseer','Bis zur Antwort keine neue zusätzliche Forderung. Die bisherige Abgabe bleibt.'],
 ['representation','Die Gemeinde muss bei künftigen Regelungen gehört werden.','anna','Zwei Vertreter dürfen wiederkommen. Wer sie auswählt und wie verbindlich das wird, müssen wir festhalten.']]),
 ch4Band:free('Wozu verpflichtest du dich am Lager?', 'Ein Mitglied will seine Familie schützen; ein anderes hält bewaffnete Gegenwehr für nötig.',[
 ['resistance_dues','Abgaben verweigern und dafür gemeinsam einstehen.','band1','Dann bleibst du bei denen, die die Säcke schützen. Das ist noch keine Zusage zu jedem weiteren Schritt.'],
 ['resistance_occupation','Den Speicher besetzen, ohne Menschen anzugreifen.','band2','Wir gehen zum Speicher. Du setzt eine Grenze; ob alle sie im Gedränge einhalten, ist ungewiss.'],
 ['resistance_armed_defense','Bewaffnete Verteidigung gegen einen Angriff zulassen.','band2','Du kommst mit zur bewaffneten Gruppe. Wer nur Vorräte schützen wollte, geht nicht selbstverständlich mit.'],
 ['resistance_limit','Die Gruppe nur unterstützen, solange keine Unbeteiligten gefährdet werden.','band1','Dann bleibst du am Rand des Lagers. Wenn sie einen Angriff beschließen, gehst du nicht mit.']]),
 ch4Weingarten:free('Was folgt für unser Dorf aus dem Bericht?', 'Matthes: „In Oberschwaben wurde verhandelt. Die Beschwerden sollen vor Schiedsgerichte. Dafür sollen sich die Haufen auflösen.“',[
 ['support_negotiation','Wir sollten ebenfalls Verhandlungen suchen und die Gruppe zurückrufen.','peter','Ich bringe dem Verwalter die Nachricht. Auch wenn du vorher Widerstand erwogen hast: Dieser Weg steht jetzt wieder offen.'],
 ['conditional_negotiation','Nur unter verbindlichen Bedingungen verhandeln; die Gemeinde bleibt vorerst zusammen.','anna','Dann bleibt unser Treffpunkt bestehen. Die Abordnung verhandelt mit einem Mandat und kommt zu uns zurück.'],
 ['not_transferable','Der Vertrag lässt sich nicht einfach auf unsere Lage übertragen.','jakob','Dann prüfen wir unsere eigenen Bedingungen. Der Bericht beweist weder, dass alle gewinnen, noch dass Gespräche unmöglich sind.'],
 ['reject_retreat','Sich jetzt aufzulösen würde unsere Forderungen preisgeben.','konrad','Die Gruppe bleibt. Damit bleibt aber auch die Gefahr, dass eine Auseinandersetzung uns zu weiteren Schritten drängt.']]),
 ch4Escalation:free('Was tust du angesichts der Nachrichten zuerst?', 'Es gibt Berichte über Übergriffe und über den Einsatz von Truppen. Eine Familie sucht Schutz.',[
 ['protect','Den Menschen am Wagen helfen und sie aus dem Gefahrenbereich bringen.','anna','Der Wagen kommt ins Dorf. Für diese Familie zählt jetzt, dass wir sie nicht zum Mittel unseres Streits machen.'],
 ['warn','Das Dorf vor einem möglichen Truppeneinsatz warnen.','peter','Ich gehe von Haus zu Haus. Der Rauch betrifft uns, auch wenn er noch weit weg ist.'],
 ['join','Zur Gruppe gehen und darauf dringen, dass sie ihre nächsten Schritte begrenzt.','konrad','Dann trittst du zu denen, die bewaffnet weitergehen wollen. Eine Grenze auszusprechen ist leichter, als sie dort durchzusetzen.'],
 ['verify','Mit Matthes prüfen, was belegt ist und was nur als Gerücht umläuft.','matthes','Wir unterscheiden Berichte von Gewissheit. Der Wagen wartet trotzdem nicht darauf, bis jede Nachricht geklärt ist.']]),
 ch4Comparison:closed('Was verändert sich gegenüber der Friedensermahnung?', 'Im April mahnt Luther beide Seiten zum Frieden. Im Mai fordert er nach Berichten über Gewalt ein scharfes Eingreifen gegen aufständische Bauern.','B',[
 ['A','Er ersetzt seine gesamte bisherige Theologie durch eine neue.','Die Schrift zeigt eine verschärfte Beurteilung des Aufruhrs, nicht einfach ein vollständig neues Freiheitsverständnis.'],
 ['B','Er beurteilt den gewaltsamen Aufruhr nun anders und zieht erheblich härtere Konsequenzen.','Die neue Lage verschärft seine Anwendung des Ordnungsgedankens. Ob die Härte dadurch gerechtfertigt ist, bleibt eine eigene Urteilsfrage.'],
 ['C','Nur der Ton ändert sich; für das Handeln bedeutet es nichts.','Die Aufforderung zu gewaltsamem Eingreifen verändert die Konsequenzen erheblich.'],
 ['D','Er erklärt rückwirkend jede Herrschaft für schuldlos.','Die frühere Kritik an den Herren wird durch die neue Schrift nicht einfach als ungeschehen erklärt.']]),
 ch4Risk:free('Welche Gefahr wiegt für dich am schwersten?', 'Peter fürchtet Krieg, Anna die Fortsetzung des Unrechts. Jakob fragt, wer Gottes Willen für sich beansprucht.',[
 ['disorder','Der Zerfall einer Ordnung, die auch Schutz bieten soll.','peter','Wenn Vorräte, Höfe und Menschen ungeschützt sind, trifft es zuerst die, die wenig ausweichen können.'],
 ['unjust_order','Eine Ordnung, die ihre Gewalt zur Fortsetzung des Unrechts nutzt.','anna','Ruhe allein macht eine Herrschaft nicht gerecht. Wer keine Stimme hat, braucht eine Grenze ihrer Macht.'],
 ['both','Aufruhr und ungerechte Herrschaft gefährden Menschen; beide müssen begrenzt werden.','peter','Dann genügt es nicht, eine Seite zu wählen. Wir müssen sagen, welche Mittel wir beiden verwehren.'],
 ['religious_certainty','Die Gewissheit, den eigenen Willen unmittelbar als Gottes Willen durchsetzen zu dürfen.','jakob','Das betrifft auch uns. Wer sich nicht mehr widersprechen lässt, kann Verantwortung hinter seiner Gewissheit verstecken.']]),
 ch4HarshJudgment:free('Wie beurteilst du Luthers schärfere Schrift vorläufig?', 'Seine Begründung und die Folgen seiner Aufforderung liegen nun nebeneinander.',[
 ['consistent','Sie folgt seiner Unterscheidung von christlicher Freiheit und äußerer Ordnung.','jakob','Dann halte auch fest, ob du die konkrete Härte für verhältnismäßig hältst. Eine nachvollziehbare Begründung entscheidet das noch nicht.'],
 ['excessive','Die Sorge um Ordnung ist nachvollziehbar, seine Aufforderung geht jedoch zu weit.','anna','Das trennt den Schutzgedanken von den Menschen, die unter der Gewalt leiden können.'],
 ['contradictory','Die Härte widerspricht für mich dem Anspruch christlicher Freiheit und Nächstenliebe.','konrad','Dieses Urteil wird uns begleiten. Wir müssen ebenso prüfen, ob unsere eigenen Mittel dem Anspruch standhalten.'],
 ['defer_judgment','Ich halte mein Urteil offen, bis die tatsächlichen Folgen deutlicher sind.','matthes','Dann bewahre die Gründe beider Schriften auf. Später kannst du dein Urteil daran prüfen, statt dich nur an den letzten Ton zu erinnern.']])
};
