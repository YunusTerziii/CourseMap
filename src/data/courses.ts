import { weeks as ce103Weeks, getWeekById as getCe103WeekById } from "@/data/weeks";
import type { CourseContent, WeekContent, WeekSection } from "@/types/week";

export const defaultCourseId = "ce103";

const ce100WeekCopy: Record<string, { summary: string; lessonOverview: string }> = {
  "ce100-week-1": {
    summary: "Bu hafta algoritma dersinin omurgası kurulur: bir algoritmanın yalnızca sonuç üretmesi değil, büyüyen girdiler karşısında nasıl davrandığı da önemlidir. Course rules, analysis of algorithms ve growth of functions başlıklarıyla doğruluk, maliyet ve büyüme fikrine giriş yapılır.",
    lessonOverview: "CE100'ün ilk haftası, program yazmaktan çok algoritmaya mühendis gibi bakmayı öğretir. Küçük örneklerde çalışan bir çözüm büyük veride yavaşlayabilir; bu yüzden adım sayısı, kaynak kullanımı ve büyüme oranı erken fark edilmelidir. Bu hafta ileride divide-and-conquer, dynamic programming, greedy ve graph algoritmalarını anlamak için kullanılacak analiz dilini hazırlar."
  },
  "ce100-week-2": {
    summary: "Bu hafta özyinelemeli algoritmaların maliyetini recurrence denklemleriyle ifade etmeyi ve divide-and-conquer yaklaşımıyla problemi parçalara ayırmayı çalışırsın.",
    lessonOverview: "Bir algoritma kendi içinde aynı problemin daha küçük hallerini çağırıyorsa, çalışma süresini doğrudan saymak zorlaşır. Recurrence bu tekrar yapısını matematiksel olarak yazar; divide-and-conquer ise problemi böl, alt problemleri çöz ve sonuçları birleştir mantığıyla düzenler. Bu hafta merge sort, binary search ve benzeri klasik algoritmaların neden verimli çalıştığını anlamaya hazırlık yapar."
  },
  "ce100-week-3": {
    summary: "Matrix multiplication ve quick sort üzerinden divide-and-conquer fikrinin iki farklı yüzü görülür: biri hesaplama maliyetini azaltmaya, diğeri sıralamayı daha akıllı bölmeye odaklanır.",
    lessonOverview: "Matris çarpımı ilk bakışta mekanik bir işlem gibi görünür, fakat büyük matrislerde işlem sayısı hızla büyür. Quick sort ise pivot seçimiyle diziyi parçalara ayırır ve sıralama problemini daha küçük alt problemlere böler. Bu hafta algoritmanın yalnızca fikrini değil, seçimlerin performansa nasıl etki ettiğini de gösterir."
  },
  "ce100-week-4": {
    summary: "Heap veri yapısı ve heap sort, öncelik mantığını düzenli bir ağaç yapısına dönüştürür. Bu hafta en büyük/en küçük elemana hızlı erişmenin algoritma tasarımındaki değerini gösterir.",
    lessonOverview: "Heap, tamamen sıralı bir yapı değildir; ama en öncelikli elemana hızlı ulaşmak için yeterli düzeni korur. Bu özellik priority queue, scheduler, graph algoritmaları ve heap sort gibi birçok yerde kullanılır. Haftanın ana fikri, veri yapısının algoritmanın maliyetini doğrudan değiştirdiğini görmektir."
  },
  "ce100-week-5": {
    summary: "Dynamic programming haftasında tekrar eden alt problemler fark edilir. Fibonacci ve matrix-chain multiplication örnekleriyle aynı hesaplamayı defalarca yapmak yerine sonucu saklama ve yeniden kullanma mantığı kurulur.",
    lessonOverview: "Bazı problemler dışarıdan karmaşık görünür ama içinde aynı küçük sorular tekrar tekrar sorulur. Dynamic programming bu tekrarları yakalar, alt problem sonuçlarını saklar ve büyük problemi kontrollü biçimde çözer. Bu hafta brute force düşünceden planlı tablo/memoization düşüncesine geçiş yapar."
  },
  "ce100-week-6": {
    summary: "Matrix chain order ve longest common subsequence, dynamic programming'in daha ciddi iki klasik örneğidir. Amaç doğru alt problem tanımını kurmak ve çözümü tablo üzerinden sistemli biçimde büyütmektir.",
    lessonOverview: "Matris zinciri çarpımında çarpma sırası sonucu değiştirmez ama maliyeti ciddi şekilde değiştirir. LCS probleminde ise iki dizi arasındaki ortak yapı bulunur. Bu hafta DP'de asıl zor kısmın koddan önce geldiğini gösterir: state nedir, geçiş nasıl kurulur, tablo hangi sırayla doldurulur?"
  },
  "ce100-week-7": {
    summary: "Greedy algorithms ve knapsack haftası, her adımda en iyi görünen seçimin ne zaman işe yaradığını ve ne zaman yanıltıcı olabileceğini tartışır.",
    lessonOverview: "Greedy yaklaşım hızlı ve sade olabilir, fakat her problemde doğru sonuç vermez. Activity selection gibi bazı problemlerde yerel en iyi seçim küresel en iyi çözüme götürürken, knapsack varyasyonlarında strateji dikkat ister. Bu hafta algoritma seçerken problem yapısını kanıt ve karşı örneklerle okumayı öne çıkarır."
  },
  "ce100-week-9": {
    summary: "Huffman coding haftasında veri sıkıştırmanın arkasındaki fikir görülür: sık kullanılan sembollere kısa, az kullanılan sembollere uzun kod vererek toplam temsil maliyeti azaltılır.",
    lessonOverview: "Huffman coding, greedy yaklaşımın çok güzel bir uygulamasıdır. Frekans bilgisi kullanılarak bir ağaç kurulur ve değişken uzunluklu kodlar üretilir. Bu hafta algoritmaların yalnızca sayısal problemleri değil, gerçek dünyadaki dosya boyutu ve iletişim maliyeti gibi konuları da nasıl etkilediğini gösterir."
  },
  "ce100-week-10": {
    summary: "Graphs haftasında düğüm, kenar, yön, ağırlık, temsil biçimleri ve traversal mantığıyla ilişkili veriler modellenir. Bağımlılık, bağlantı ve yol kavramları algoritmik zemine oturur.",
    lessonOverview: "Graf, bilgisayar bilimlerinde en güçlü modelleme araçlarından biridir: şehirler ve yollar, ders ön koşulları, sosyal ağlar, dosya bağımlılıkları ve ağ topolojileri graf olarak düşünülebilir. Bu hafta adjacency list/matrix, traversal ve topological order gibi kavramlarla graf problemlerini okumaya giriş yapılır."
  },
  "ce100-week-11": {
    summary: "Shortest path haftası, graf üzerinde iki nokta arasındaki en düşük maliyetli yolu bulma problemini ele alır. Burada 'en kısa' bazen mesafe, bazen süre, bazen maliyet anlamına gelir.",
    lessonOverview: "Harita uygulamaları, network routing, oyun yapay zekası ve lojistik problemleri shortest path fikrine dayanır. Bu hafta grafın kenar ağırlıklarıyla birlikte nasıl yorumlandığını ve bir yolun yalnızca var olup olmadığının değil, maliyetinin de önemli olduğunu gösterir."
  },
  "ce100-week-12": {
    summary: "Hashing and encryption haftasında veri bütünlüğü, özet üretme ve temel kriptografik düşünce tanıtılır. Hash fonksiyonları veriyi sabit uzunluklu bir parmak izine dönüştürür.",
    lessonOverview: "Hashing, parolalardan dosya bütünlüğüne, veri yapılarından dijital güvenliğe kadar birçok yerde karşına çıkar. Bu hafta hash çıktısının neden geri döndürülmesi zor, küçük değişikliklere duyarlı ve karşılaştırma için kullanışlı olması gerektiğini anlamaya odaklanır."
  },
  "ce100-week-13": {
    summary: "Symmetric ve asymmetric encryption haftasında aynı anahtarla şifreleme ile açık/özel anahtar çiftine dayalı şifreleme arasındaki temel fark kurulur.",
    lessonOverview: "Simetrik şifreleme hızlıdır ama anahtar paylaşımı problem yaratır. Asimetrik şifreleme bu paylaşım sorununa farklı bir model getirir: public key paylaşılabilir, private key gizli kalır. Bu hafta güvenli iletişimin yalnızca algoritma değil, anahtar yönetimi meselesi olduğunu gösterir."
  },
  "ce100-week-14": {
    summary: "OTP calculation and file encryption haftası, tek kullanımlık parola üretimi ve dosya şifreleme akışını pratik güvenlik senaryoları üzerinden toparlar.",
    lessonOverview: "OTP, kimlik doğrulamada zaman veya sayaç temelli geçici kod üretme fikrine dayanır. Dosya şifreleme ise verinin saklanırken korunmasını hedefler. Bu hafta kriptografi başlıklarını günlük kullanımda karşılaşılan güvenlik pratikleriyle ilişkilendirir."
  }
};

const ce204WeekCopy: Record<string, { summary: string; lessonOverview: string }> = {
  "ce204-week-1": {
    summary: "Bu hafta dersin zemini kurulur: software engineering disiplini, Java'ya giriş, OOP düşüncesi, class/object ayrımı, methods, constructors, access modifiers ve reusable technology aynı büyük resmin parçaları olarak ele alınır.",
    lessonOverview: "CE204'ün ilk haftası syntax ezberinden önce yazılımı mühendislik ürünü olarak görmeyi sağlar. Software yalnızca çalışan kod değildir; doküman, veri, kalite, bakım, maliyet ve ekip iletişimiyle birlikte düşünülür. Ardından Java ve OOP tarafına geçilerek class, object, method, constructor ve erişim kontrolü gibi temel yapı taşları gerçek proje tasarımına bağlanır."
  },
  "ce204-week-2": {
    summary: "Java inheritance haftasında sınıflar arasındaki üst-alt tür ilişkisi incelenir. Ortak davranışları tekrar yazmadan paylaşmak, ama yanlış kalıtım hiyerarşisi kurmamak ana odaktır.",
    lessonOverview: "Inheritance güçlüdür çünkü ortak alanları ve metotları üst sınıfta toplayabilir. Fakat her benzerlik kalıtım anlamına gelmez; is-a ilişkisi doğru kurulmazsa tasarım kırılgan hale gelir. Bu hafta kalıtımı kod kısaltma hilesi gibi değil, modelleme kararı gibi değerlendirmeyi sağlar."
  },
  "ce204-week-3": {
    summary: "Interfaces haftasında sınıfların hangi davranışı garanti ettiğini tanımlayan sözleşmeler çalışılır. Interface, farklı sınıfların ortak bir kullanım yüzeyi üzerinden konuşmasını sağlar.",
    lessonOverview: "Bir interface, 'bunu yapan her sınıf şu metotları sunmalı' der. Böylece kod belirli sınıflara değil davranışa bağımlı hale gelir. Bu hafta polymorphism, loose coupling ve değişime daha dayanıklı tasarımın neden interface düşüncesiyle güçlendiğini gösterir."
  },
  "ce204-week-4": {
    summary: "UML fundamentals haftasında yazılım tasarımı kod yazmadan önce görsel olarak ifade edilir. Class diagram, ilişkiler, alanlar ve metotlar tasarımın ortak dili haline gelir.",
    lessonOverview: "Büyük sistemleri yalnızca kaynak koda bakarak anlamak zordur. UML, sınıfları ve ilişkileri diyagramla göstererek ekip iletişimini kolaylaştırır. Bu hafta class diagram okumak, ilişki türlerini ayırt etmek ve tasarım kararlarını görsel model üzerinden tartışmak için temel oluşturur."
  },
  "ce204-week-5": {
    summary: "PlantUML haftasında UML diyagramları elle çizilen görseller olmaktan çıkar, metinle üretilebilen ve sürümlenebilen tasarım belgelerine dönüşür.",
    lessonOverview: "PlantUML, diyagramı kod gibi yazmanı sağlar. Bu sayede tasarım değişiklikleri Git ile takip edilebilir, dokümantasyon otomatik üretilebilir ve ekip içinde aynı diyagram tekrar tekrar düzenlenebilir. Bu hafta diagram as code fikrini pratik hale getirir."
  },
  "ce204-week-6": {
    summary: "UMPLE haftasında model ve kod arasındaki sınır incelenir. UML benzeri tanımların gerçek programlama yapılarıyla birlikte kullanılabileceği gösterilir.",
    lessonOverview: "Modelleme çoğu zaman koddan ayrı bir belge gibi kalır; UMPLE bu kopukluğu azaltmaya çalışır. Sınıf, ilişki ve davranış tanımları kod üretimiyle bağlanır. Bu hafta tasarımın yalnızca çizim değil, implementasyona yön veren canlı bir yapı olabileceğini gösterir."
  },
  "ce204-week-7": {
    summary: "Modeling exercises and simple patterns haftasında OOP tasarımı örnek senaryolarla pekiştirilir. Amaç kavramları tek tek bilmekten çok doğru model kurma refleksi geliştirmektir.",
    lessonOverview: "Bir problemi sınıflara ayırırken hangi bilgi kime ait, hangi davranış nerede durmalı, hangi ilişki gereksiz bağımlılık üretir gibi sorular sorulur. Basit pattern fikirleri de tekrar eden tasarım problemlerini tanımaya yardımcı olur. Bu hafta OOP'nin pratik karar tarafını güçlendirir."
  },
  "ce204-week-9": {
    summary: "Design patterns haftası, tekrar eden yazılım tasarım problemlerine verilen isimli çözümleri tanıtır. Pattern, ezberlenecek kalıp değil; belirli bağlamda kullanılan tasarım dilidir.",
    lessonOverview: "Pattern kullanmak, kodu süslü göstermek için değildir. Bir problem tekrar tekrar ortaya çıkıyorsa ve çözüm yapısı biliniyorsa pattern ortak bir isim ve düşünme biçimi sağlar. Bu hafta pattern'in problem, çözüm, sonuç ve trade-off parçalarıyla okunması gerektiğini gösterir."
  },
  "ce204-week-10": {
    summary: "Structural design patterns haftasında sınıf ve nesnelerin daha büyük yapılar halinde nasıl birleştirileceği incelenir. Adapter, Bridge, Composite, Decorator, Facade, Flyweight ve Proxy bu ailenin temel örnekleridir.",
    lessonOverview: "Structural patterns, sistemin parçalarını birbirine bağlama biçimiyle ilgilenir. Bazen uyumsuz arayüzler adapte edilir, bazen karmaşık alt sistem sadeleştirilir, bazen nesnelere dinamik sorumluluk eklenir. Bu hafta kod yapısını büyütürken esnekliği kaybetmemeyi hedefler."
  },
  "ce204-week-11": {
    summary: "Behavioral design patterns haftasında nesneler arasındaki iletişim, sorumluluk aktarımı ve davranış değişimi düzenlenir. Odak, objelerin nasıl birlikte çalıştığıdır.",
    lessonOverview: "Bir sistemde sorun çoğu zaman sınıfların varlığından değil, birbirleriyle nasıl konuştuklarından çıkar. Behavioral patterns; komut verme, gözlemleme, strateji değiştirme, durum yönetme veya sorumluluk zinciri kurma gibi davranış problemlerine çözüm sunar. Bu hafta etkileşimi temiz tutmanın tasarım kalitesini nasıl artırdığını gösterir."
  },
  "ce204-week-12": {
    summary: "Code smells and refactoring haftasında kötü kokan kod sinyalleri tanınır. Refactoring, dış davranışı bozmadan iç yapıyı iyileştirme disiplinidir.",
    lessonOverview: "Uzun metotlar, tekrar eden kod, aşırı büyük sınıflar veya belirsiz sorumluluklar yazılımın bakımını zorlaştırır. Refactoring bu problemleri rastgele düzenleme değil, kontrollü ve test edilebilir küçük adımlarla çözme işidir. Bu hafta temiz kodun yalnızca estetik değil bakım maliyeti meselesi olduğunu gösterir."
  },
  "ce204-week-13": {
    summary: "Composing methods refactoring haftasında uzun ve karmaşık metotları daha küçük, anlamlı ve okunabilir parçalara ayırma teknikleri çalışılır.",
    lessonOverview: "Bir metot çok fazla iş yapıyorsa hem anlaşılması hem test edilmesi hem de değiştirilmesi zorlaşır. Extract Method gibi teknikler niyeti görünür hale getirir; kodun bölümleri isim kazanır. Bu hafta refactoring'in en temel reflekslerinden biri olan davranışı küçük, net parçalara ayırmayı öne çıkarır."
  },
  "ce204-week-14": {
    summary: "Real-world design pattern applications haftasında pattern bilgisi gerçek proje örnekleriyle ilişkilendirilir. Singleton gibi popüler çözümlerin hem faydaları hem riskleri tartışılır.",
    lessonOverview: "Pattern'ler ders slaytlarında temiz görünür; gerçek projelerde ise bağımlılık, test edilebilirlik, lifecycle ve bakım etkileriyle birlikte değerlendirilir. Bu hafta pattern seçerken 'bunu biliyorum' yerine 'bu problem için gerçekten gerekli mi?' sorusunu merkeze alır."
  },
  "ce204-week-15": {
    summary: "Course review haftasında OOP, UML, PlantUML/UMPLE, design patterns ve refactoring başlıkları final öncesi tek çerçevede toparlanır.",
    lessonOverview: "Ders boyunca öğrenilen konular birbirinden kopuk değildir: OOP sınıf ve nesne temelini verir, UML tasarımı görünür kılar, pattern'ler tekrar eden problemlere dil kazandırır, refactoring ise büyüyen kodu sağlıklı tutar. Bu hafta final ve proje değerlendirmesi için bu parçaları bir araya getirir."
  },
  "ce204-week-16": {
    summary: "Final exam information haftasında sınav formatı, beklentiler ve çalışma yönü netleştirilir. Amaç son hafta neye hazırlanacağını belirsiz bırakmamaktır.",
    lessonOverview: "Bu hafta yeni konu yüklemekten çok sınav yapısını ve hazırlık stratejisini anlamaya ayrılır. Hangi başlıkların nasıl değerlendirileceği, hangi materyallerin önemli olduğu ve final öncesi tekrarın nasıl organize edileceği açıklığa kavuşur."
  }
};

function joinTopicTitles(sections: Array<[string, string, string]>) {
  const titles = sections.map(([, title]) => title);
  if (titles.length <= 1) return titles[0] ?? "ana konu";
  return `${titles.slice(0, -1).join(", ")} ve ${titles.at(-1)}`;
}

function ce100Section(id: string, title: string, summary: string): WeekSection {
  return {
    id,
    title,
    simpleExplanation: summary,
    detailedExplanation: `${summary} Bu başlıkta amaç yalnızca kavram adını görmek değil; problemin neden ortaya çıktığını, hangi algoritmik stratejiyle çözüldüğünü, çözümün hangi durumlarda verimli kaldığını ve hangi durumda başka bir yaklaşıma ihtiyaç duyacağını anlamaktır.`,
    analogy: "Algoritma konularını bir mühendislik karar ağacı gibi düşünebilirsin: önce problemi tanırsın, sonra uygun stratejiyi seçersin, en sonunda maliyetini ve doğruluğunu kontrol edersin.",
    whyItMatters: "Algorithms and Programming II dersinde bu konu, büyük problemleri sezgisel değil sistematik biçimde çözebilmek ve çözümün maliyetini savunabilmek için gereklidir.",
    summary,
    checklist: [
      { id: `${id}-pages`, title: "PDF sayfalarini okuyup tamamladim", difficulty: "easy", estimatedMinutes: 20 },
      { id: `${id}-core-idea`, title: "Konunun ana fikrini kendi cumlelerimle aciklayabilirim", difficulty: "medium", estimatedMinutes: 15 }
    ],  };
}

function ce100Week(params: {
  id: string;
  weekNumber: number;
  title: string;
  fileName: string;
  sections: Array<[string, string, string]>;
  estimatedMinutes?: number;
}): WeekContent {
  const topics = joinTopicTitles(params.sections);
  const copy = ce100WeekCopy[params.id];
  return {
    id: params.id,
    courseId: "ce100",
    weekNumber: params.weekNumber,
    title: params.title,
    zone: params.weekNumber <= 4 ? "Algorithm Analysis" : params.weekNumber <= 9 ? "Optimization Strategies" : "Graphs and Cryptography",
    summary: copy?.summary ?? `Bu hafta ${topics} başlıkları algoritma tasarımı ve analiz bakışıyla ele alınır.`,
    lessonOverview: copy?.lessonOverview ?? `Bu hafta ${params.title} konusu, problem yapısı, çözüm stratejisi ve maliyet değerlendirmesi üzerinden çalışılır.`,
    estimatedMinutes: params.estimatedMinutes ?? 180,
    originalMaterialUrl: `/materials/${params.fileName}`,
    sections: params.sections.map(([id, title, summary]) => ce100Section(id, title, summary)),
    keyConcepts: params.sections.map(([id, title, summary]) => ({ id, term: title, definition: summary })),
    practiceTasks: [],  };
}

function pdfSection(courseId: string, id: string, title: string, summary: string): WeekSection {
  return {
    id,
    title,
    simpleExplanation: summary,
    detailedExplanation: `${summary} Bu bölümde kavramı sınıf, nesne, ilişki, sorumluluk ve tasarım kararı açısından okuyorsun. Amaç ezber bir OOP terimi öğrenmek değil; kod büyüdüğünde hangi yapının neden daha okunabilir, genişletilebilir ve bakım yapılabilir olduğunu fark etmektir.`,
    analogy: "Konuyu bir yazılım mimarisi kararı gibi düşünebilirsin: önce değişecek parçaları bulursun, sonra sorumlulukları ayırırsın, en sonunda tasarımın ileride bozulmadan büyüyüp büyüyemeyeceğini kontrol edersin.",
    whyItMatters: "Object-oriented programming dersinde bu konu, sınıfları rastgele yazmak yerine anlamlı sorumluluklara ayırmak ve gerçek projelerde sürdürülebilir tasarım kurmak için gereklidir.",
    summary,
    checklist: [
      { id: `${id}-pages`, title: "PDF sayfalarini okuyup tamamladim", difficulty: "easy", estimatedMinutes: 20 },
      { id: `${id}-design`, title: "Konunun tasarim amacini kendi cumlelerimle aciklayabilirim", difficulty: "medium", estimatedMinutes: 15 }
    ],  };
}

function ce204Week(params: {
  id: string;
  weekNumber: number;
  title: string;
  fileName: string;
  sections: Array<[string, string, string]>;
  estimatedMinutes?: number;
}): WeekContent {
  const topics = joinTopicTitles(params.sections);
  const copy = ce204WeekCopy[params.id];
  return {
    id: params.id,
    courseId: "ce204",
    weekNumber: params.weekNumber,
    title: params.title,
    zone: params.weekNumber <= 7 ? "OOP Modeling" : params.weekNumber <= 11 ? "Design Patterns" : "Refactoring and Review",
    summary: copy?.summary ?? `Bu hafta ${topics} başlıkları nesne yönelimli tasarım bağlamında ele alınır.`,
    lessonOverview: copy?.lessonOverview ?? `Bu hafta ${params.title} konusu; sınıf, nesne, ilişki ve sorumluluk kararları üzerinden çalışılır.`,
    estimatedMinutes: params.estimatedMinutes ?? 180,
    originalMaterialUrl: `/materials/${params.fileName}`,
    sections: params.sections.map(([id, title, summary]) => pdfSection("ce204", id, title, summary)),
    keyConcepts: params.sections.map(([id, title, summary]) => ({ id, term: title, definition: summary })),
    practiceTasks: [],  };
}

const ce100Weeks: WeekContent[] = [
  ce100Week({
    id: "ce100-week-1",
    weekNumber: 1,
    title: "Introduction to Analysis of Algorithms",
    fileName: "ce100-week-1-intro.en.md_slide.pdf",
    sections: [
      ["course-rules", "Course Plan and Rules", "Ders plani, iletisim, sinav ve odev akisi tanitilir."],
      ["algorithm-analysis", "Analysis of Algorithms", "Algoritmalarin dogrulugu ve verimliligi temel seviyede ele alinir."],
      ["growth", "Growth of Functions", "Girdi buyudukce algoritma maliyetinin nasil degistigi incelenir."]
    ],
    estimatedMinutes: 240
  }),
  ce100Week({
    id: "ce100-week-2",
    weekNumber: 2,
    title: "Solving Recurrences and Divide-and-Conquer",
    fileName: "ce100-week-2-recurrence.en.md_slide.pdf",
    sections: [
      ["recurrences", "Solving Recurrences", "Ozyinelemeli algoritmalarin calisma maliyetini ifade eden denklemler incelenir."],
      ["divide-conquer", "Divide-and-Conquer", "Problemi bol, alt problemleri coz ve sonuclari birlestir yaklasimi calisilir."]
    ],
    estimatedMinutes: 200
  }),
  ce100Week({
    id: "ce100-week-3",
    weekNumber: 3,
    title: "Matrix Multiplication and Quick Sort",
    fileName: "ce100-week-3-matrix.en.md_slide.pdf",
    sections: [
      ["matrix-multiplication", "Matrix Multiplication", "Matris carpimi problemi ve algoritmik maliyet dusuncesi ele alinir."],
      ["quick-sort", "Quick Sort", "Bol ve fethet yaklasiminin siralama uzerindeki klasik ornegi incelenir."]
    ],
    estimatedMinutes: 260
  }),
  ce100Week({
    id: "ce100-week-4",
    weekNumber: 4,
    title: "Heap and Heap Sort",
    fileName: "ce100-week-4-heap.en.md_slide.pdf",
    sections: [
      ["heap", "Heap", "Heap veri yapisinin sekil ve siralama ozellikleri tanitilir."],
      ["heapsort", "Heap Sort", "Heap veri yapisi kullanilarak siralama algoritmasi kurulur."]
    ],
    estimatedMinutes: 250
  }),
  ce100Week({
    id: "ce100-week-5",
    weekNumber: 5,
    title: "Dynamic Programming",
    fileName: "ce100-week-5-dp.en.md_slide.pdf",
    sections: [
      ["dp-intro", "Dynamic Programming", "Alt problemlerin tekrar kullanimiyla verimli cozum uretme yaklasimi islenir."],
      ["fibonacci", "Fibonacci Numbers", "Tekrarlanan alt problem fikri Fibonacci ornegiyle gosterilir."],
      ["matrix-chain", "Matrix-Chain Multiplication", "Optimal parantezleme ve maliyet minimizasyonu calisilir."]
    ],
    estimatedMinutes: 220
  }),
  ce100Week({
    id: "ce100-week-6",
    weekNumber: 6,
    title: "Matrix Chain Order and Longest Common Subsequence",
    fileName: "ce100-week-6-lcs.en.md_slide.pdf",
    sections: [
      ["matrix-chain-order", "Matrix Chain Order", "Matris zinciri carpiminda optimal bolme noktalari incelenir."],
      ["lcs", "Longest Common Subsequence", "Iki dizinin en uzun ortak alt dizisini bulma problemi calisilir."],
      ["memoization", "Memoization", "Ozyinelemeli cozumlerin tekrar hesaplama maliyeti azaltma teknigi tanitilir."]
    ],
    estimatedMinutes: 260
  }),
  ce100Week({
    id: "ce100-week-7",
    weekNumber: 7,
    title: "Greedy Algorithms and Knapsack",
    fileName: "ce100-week-7-knapsack.en.md_slide.pdf",
    sections: [
      ["greedy", "Greedy Algorithms", "Her adimda yerel olarak en iyi secimi yapma stratejisi incelenir."],
      ["activity-selection", "Activity Selection Problem", "Cakismayan aktiviteleri secme problemi greedy yaklasimla cozulur."],
      ["knapsack", "Knapsack", "Kisitli kapasite altinda deger maksimizasyonu problemi calisilir."]
    ],
    estimatedMinutes: 230
  }),
  ce100Week({
    id: "ce100-week-9",
    weekNumber: 9,
    title: "Huffman Coding",
    fileName: "ce100-week-9-huffman.en.md_slide.pdf",
    sections: [
      ["huffman", "Huffman Coding", "Frekansa dayali degisken uzunluklu kodlama ve sikistirma mantigi anlatilir."],
      ["compression", "Compression", "Binary temsil ve kod uzunlugu uzerinden veri sikistirma fikri incelenir."]
    ],
    estimatedMinutes: 170
  }),
  ce100Week({
    id: "ce100-week-10",
    weekNumber: 10,
    title: "Graphs",
    fileName: "ce100-week-10-graphs.en.md_slide.pdf",
    sections: [
      ["graphs", "Introduction to Graphs", "Dugum, kenar, yonlu/yonsuz graf ve temsil bicimleri tanitilir."],
      ["topological-order", "Topological Order", "Bagimlilik iliskilerinde siralama fikri calisilir."],
      ["traversal", "Graph Traversal", "Graf uzerinde sistematik gezinme yaklasimlari incelenir."]
    ],
    estimatedMinutes: 360
  }),
  ce100Week({
    id: "ce100-week-11",
    weekNumber: 11,
    title: "Shortest Path",
    fileName: "ce100-week-11-shortestpath.en.md_slide.pdf",
    sections: [["shortest-path", "Shortest Path", "Graf uzerinde iki nokta arasindaki en dusuk maliyetli yolu bulma problemi tanitilir."]],
    estimatedMinutes: 90
  }),
  ce100Week({
    id: "ce100-week-12",
    weekNumber: 12,
    title: "Hashing and Encryption",
    fileName: "ce100-week-12-crypto.en.md_slide.pdf",
    sections: [
      ["hashing", "Cryptographic Hash Functions", "Veriyi sabit uzunluklu ozete donusturen hash fonksiyonlari incelenir."],
      ["checksums", "Checksums and Hash Algorithms", "Butunluk kontrolu ve hash algoritmalari tanitilir."]
    ],
    estimatedMinutes: 100
  }),
  ce100Week({
    id: "ce100-week-13",
    weekNumber: 13,
    title: "Symmetric and Asymmetric Encryption",
    fileName: "ce100-week-13-symenc.en.md_slide.pdf",
    sections: [
      ["symmetric", "Symmetric Encryption", "Ayni anahtarla sifreleme ve cozme mantigi incelenir."],
      ["asymmetric", "Asymmetric Encryption", "Acik ve ozel anahtar fikri temel seviyede tanitilir."],
      ["modes", "Symmetric Encryption Modes", "Blok sifreleme modlari genel mantigiyla ele alinir."]
    ],
    estimatedMinutes: 100
  }),
  ce100Week({
    id: "ce100-week-14",
    weekNumber: 14,
    title: "OTP Calculation and File Encryption",
    fileName: "ce100-week-14-otp.en.md_slide.pdf",
    sections: [["otp-file", "OTP Calculation and File Encryption", "Tek kullanimlik parola hesaplama ve dosya sifreleme basliklari tanitilir."]],
    estimatedMinutes: 80
  })
];

const ce204Weeks: WeekContent[] = [
  ce204Week({
    id: "ce204-week-1",
    weekNumber: 1,
    title: "Software Engineering, Java Introduction and OOP Basics",
    fileName: "ce204-week-1.en.md_slide.pdf",
    sections: [
      ["course-introduction", "Course Introduction", "Ders planı, iletişim kanalları, dönem akışı ve CE204/CEN206 Object-Oriented Programming dersinin çalışma beklentileri tanıtılır."],
      ["software-engineering", "Software and Software Engineering", "Software kavramı, software engineering disiplini, iyi programlama yöntemi ihtiyacı, proje başlangıç noktaları ve yazılım mühendisliği mesleği ele alınır."],
      ["oop-introduction", "What is Object-Oriented Programming?", "Object orientation, Java'da OOP kavramları, procedural programming ile OOP farkı, object model ve object-oriented paradigm incelenir."],
      ["java-introduction", "Introduction to Java", "Programming kavramı, Java'nın tercih edilme nedenleri, Java buzzwords, Java basics, documentation, programming style guidelines ve C++ vs Java karşılaştırması çalışılır."],
      ["classes-objects", "Java Classes and Objects", "Class ve object ayrımı, UML instance diagram, class naming, class variables, class oluşturma, object oluşturma ve class member erişimi örneklerle anlatılır."],
      ["methods-overloading", "Java Methods and Method Overloading", "Java method tanımı, normal/static method örnekleri, method parameters, method overloading ve overloading uygulama biçimleri öğrenilir."],
      ["constructors", "Java Constructors", "Constructor mantığı, no-arg constructor, parameterized constructor, default constructor, default values ve constructor overloading açıklanır."],
      ["access-modifiers", "Java Access Modifiers", "Java access modifier yapısı, görünürlük kontrolü, encapsulation ve sınıf üyelerine erişimi yönetme mantığı çalışılır."],
      ["reusable-technology", "Basing Software Development on Reusable Technology", "Reusable technology, object-oriented frameworks, Java bağlantı kurma, bilgi alışverişi ve Object Client-Server Framework mantığı tanıtılır."]
    ],
    estimatedMinutes: 360
  }),
  ce204Week({
    id: "ce204-week-2",
    weekNumber: 2,
    title: "Java Inheritance",
    fileName: "ce204-week-2.en.md_slide.pdf",
    sections: [
      ["inheritance", "Java Inheritance", "Siniflar arasinda ortak ozellik ve davranislarin miras yoluyla paylasilmasi incelenir."],
      ["hierarchies", "Inheritance Hierarchies", "Siniflari ust-alt tur iliskilerine gore hiyerarsi halinde organize etme fikri calisilir."],
      ["is-a-rule", "The Is-a Rule", "Inheritance kullaniminin dogru olup olmadigini anlamak icin is-a iliskisi degerlendirilir."]
    ],
    estimatedMinutes: 300
  }),
  ce204Week({
    id: "ce204-week-3",
    weekNumber: 3,
    title: "Defining and Implementing Interfaces",
    fileName: "ce204-week-3.en.md_slide.pdf",
    sections: [
      ["interfaces", "Defining an Interface in Java", "Interface, siniflarin uymasi gereken davranis sozlesmesini tanimlar."],
      ["implementation", "Implementing Interfaces", "Siniflarin interface metotlarini gercek davranisa donusturmesi calisilir."],
      ["polymorphism", "Interface-Based Polymorphism", "Farkli siniflarin ayni interface uzerinden kullanilabilmesi incelenir."]
    ],
    estimatedMinutes: 260
  }),
  ce204Week({
    id: "ce204-week-4",
    weekNumber: 4,
    title: "UML Fundamentals",
    fileName: "ce204-week-4.en.md_slide.pdf",
    sections: [
      ["uml-overview", "UML Overview", "Unified Modeling Language ile yazilim tasarimini diyagramlarla ifade etme fikri tanitilir."],
      ["uml-history", "UML History and Evolution", "UML'in neden ortaya ciktigi ve modelleme ihtiyacina nasil cevap verdigi incelenir."],
      ["class-diagrams", "Class Diagrams", "Siniflar, iliskiler, alanlar ve metotlar diyagram uzerinden okunur."]
    ],
    estimatedMinutes: 360
  }),
  ce204Week({
    id: "ce204-week-5",
    weekNumber: 5,
    title: "PlantUML Introduction",
    fileName: "ce204-week-5.en.md_slide.pdf",
    sections: [
      ["plantuml", "PlantUML", "Metin tabanli tanimlarla UML diyagramlari uretme araci tanitilir."],
      ["diagram-as-code", "Diagram as Code", "Diyagramlari kod gibi surumlemek ve tekrar uretmek fikri islenir."]
    ],
    estimatedMinutes: 220
  }),
  ce204Week({
    id: "ce204-week-6",
    weekNumber: 6,
    title: "Introduction to UMPLE",
    fileName: "ce204-week-6.en.md_slide.pdf",
    sections: [
      ["umple", "Introduction to UMPLE", "UML ve programlama dilini birlestiren modelleme yaklasimi tanitilir."],
      ["model-code", "Model and Code Together", "Modelden kod uretme ve tasarimla implementasyonu birlikte dusunme fikri calisilir."]
    ],
    estimatedMinutes: 150
  }),
  ce204Week({
    id: "ce204-week-7",
    weekNumber: 7,
    title: "Modeling Exercises and Simple Patterns",
    fileName: "ce204-week-7.en.md_slide.pdf",
    sections: [
      ["modeling-exercises", "Modeling Exercises", "OOP tasarimini pratik senaryolar uzerinden modelleme alistirmalariyla pekistirme."],
      ["simple-patterns", "Simple Patterns", "Tekrar eden basit tasarim cozumlerini fark etme ve kullanma fikri tanitilir."]
    ],
    estimatedMinutes: 180
  }),
  ce204Week({
    id: "ce204-week-9",
    weekNumber: 9,
    title: "What Are Design Patterns?",
    fileName: "ce204-week-9.en.md_slide.pdf",
    sections: [
      ["patterns", "Design Patterns", "Tekrar eden yazilim tasarim problemlerine verilen adlandirilmis cozumler incelenir."],
      ["patterns-vs-algorithms", "Patterns vs Algorithms", "Pattern ile algoritma arasindaki fark ve kullanim baglami aciklanir."],
      ["pattern-structure", "What Does a Pattern Consist Of?", "Bir pattern'in isim, problem, cozum ve sonuc parcalarindan olusmasi calisilir."]
    ],
    estimatedMinutes: 190
  }),
  ce204Week({
    id: "ce204-week-10",
    weekNumber: 10,
    title: "Structural Design Patterns",
    fileName: "ce204-week-10.en.md_slide.pdf",
    sections: [
      ["structural", "Structural Design Patterns", "Sinif ve nesnelerin daha esnek yapilar kuracak sekilde birlestirilmesi incelenir."],
      ["why-structural", "Why Structural Patterns Matter", "Karmasik yapilari daha okunabilir ve degistirilebilir hale getirme motivasyonu ele alinir."]
    ],
    estimatedMinutes: 260
  }),
  ce204Week({
    id: "ce204-week-11",
    weekNumber: 11,
    title: "Behavioral Design Patterns",
    fileName: "ce204-week-11.en.md_slide.pdf",
    sections: [
      ["behavioral", "Behavioral Design Patterns", "Nesneler arasindaki sorumluluk ve iletisim davranislarini duzenleyen pattern'ler incelenir."],
      ["behavioral-importance", "Why Behavioral Patterns Are Important", "Davranis degisimlerini kodu dagitmadan yonetme fikri calisilir."]
    ],
    estimatedMinutes: 300
  }),
  ce204Week({
    id: "ce204-week-12",
    weekNumber: 12,
    title: "Code Smells and Refactoring Fundamentals",
    fileName: "ce204-week-12.en.md_slide.pdf",
    sections: [
      ["refactoring", "What is Refactoring?", "Kodun dis davranisini degistirmeden ic yapisini iyilestirme fikri tanitilir."],
      ["dirty-clean", "Dirty Code vs Clean Code", "Bakimi zor kod ile okunabilir ve temiz kod arasindaki farklar incelenir."],
      ["code-smells", "Code Smells", "Tasarim veya bakim problemi sinyali veren kod kokulari tanitilir."]
    ],
    estimatedMinutes: 210
  }),
  ce204Week({
    id: "ce204-week-13",
    weekNumber: 13,
    title: "Composing Methods Refactoring",
    fileName: "ce204-week-13.en.md_slide.pdf",
    sections: [
      ["why-refactor", "Why and When to Refactor", "Refactoring'in neden ve ne zaman yapilmasi gerektigi incelenir."],
      ["composing-methods", "Composing Methods", "Uzun veya karmasik metotlari daha kucuk, anlamli parcalara bolme teknikleri calisilir."]
    ],
    estimatedMinutes: 210
  }),
  ce204Week({
    id: "ce204-week-14",
    weekNumber: 14,
    title: "Real-World Design Pattern Applications",
    fileName: "ce204-week-14.en.md_slide.pdf",
    sections: [
      ["case-studies", "Design Pattern Case Studies", "Gercek dunyadaki design pattern kullanimlari vaka calismalariyla incelenir."],
      ["singleton", "Singleton", "Bir siniftan tek nesne olmasi gereken durumlar ve bunun riskleri calisilir."]
    ],
    estimatedMinutes: 160
  }),
  ce204Week({
    id: "ce204-week-15",
    weekNumber: 15,
    title: "Course Review and OOP Fundamentals",
    fileName: "ce204-week-15.en.md_slide.pdf",
    sections: [
      ["review", "Course Review", "Ders boyunca islenen OOP, UML, pattern ve refactoring konulari tekrar edilir."],
      ["oop-fundamentals", "OOP Fundamentals", "Core OOP kavramlari final oncesi toparlanir."]
    ],
    estimatedMinutes: 130
  }),
  ce204Week({
    id: "ce204-week-16",
    weekNumber: 16,
    title: "Final Exam Information",
    fileName: "ce204-week-16-final.en.md_slide.pdf",
    sections: [
      ["final-info", "Final Exam Information", "Final sinav tarihi, formati ve izin verilen/verilmeyen materyaller tanitilir."],
      ["exam-format", "Exam Format", "Sinav yapisi ve hazirlik beklentileri ozetlenir."]
    ],
    estimatedMinutes: 60
  })
];

export const courses: CourseContent[] = [
  {
    id: "ce103",
    code: "CE103",
    title: "Algorithms and Programming I",
    shortTitle: "CE103 Algorithms and Programming I",
    description: "Instructor-provided PDFs for CE103, tracked page by page.",
    status: "active",
    weeks: ce103Weeks
  },
  {
    id: "ce100",
    code: "CE100",
    title: "Algorithms and Programming II",
    shortTitle: "CE100 Algorithms and Programming II",
    description: "Algorithm analysis, divide-and-conquer, dynamic programming, greedy methods, graphs, and cryptography materials tracked page by page.",
    status: "active",
    weeks: ce100Weeks
  },
  {
    id: "ce205",
    code: "CE205",
    title: "Data Structures",
    shortTitle: "CE205 Data Structures",
    description: "PDF materials will be added after the course files are provided.",
    status: "coming-soon",
    weeks: []
  },
  {
    id: "ce204",
    code: "CE204",
    title: "Object-Oriented Programming",
    shortTitle: "CE204 Object-Oriented Programming",
    description: "Inheritance, interfaces, UML, PlantUML, UMPLE, design patterns, refactoring, and final review materials tracked page by page.",
    status: "active",
    weeks: ce204Weeks
  }
];

export function getCourseById(courseId?: string | null) {
  return courses.find((course) => course.id === courseId) ?? courses.find((course) => course.id === defaultCourseId)!;
}

export function getWeekById(weekId: string): WeekContent | undefined {
  return courses.flatMap((course) => course.weeks).find((week) => week.id === weekId) ?? getCe103WeekById(weekId);
}

export function getCourseForWeek(weekId: string) {
  return courses.find((course) => course.weeks.some((week) => week.id === weekId)) ?? getCourseById(defaultCourseId);
}

export function getAllWeeks() {
  return courses.flatMap((course) => course.weeks);
}
