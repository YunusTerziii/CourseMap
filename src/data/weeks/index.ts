import type { WeekContent, WeekSection } from "@/types/week";
import { week1 } from "./week-1";

function section(
  id: string,
  title: string,
  simpleExplanation: string,
  detailedExplanation: string,
  whyItMatters: string,
  checklist: string[]
): WeekSection {
  return {
    id,
    title,
    simpleExplanation,
    detailedExplanation,
    analogy: "Bunu bir atölye düzeni gibi düşünebilirsin: doğru araç doğru yerdeyse öğrenme hızlanır, hata bulmak kolaylaşır ve üretim daha güvenli olur.",
    whyItMatters,
    summary: `${title} konusu, bu haftanın pratik mühendislik becerilerini gerçek proje alışkanlıklarına bağlar.`,
    teachingCards: [
      {
        title: `${title} nedir?`,
        explanation: simpleExplanation,
        example: `Bu konuyu çalışırken önce "hangi problemi çözer?" sorusunu sor. ${title}, yalnızca bir terim değil; ders materyalindeki pratik akışın bir parçasıdır.`
      },
      {
        title: "Nasıl ayırt edilir?",
        explanation: detailedExplanation,
        example: `Bir soruda ${title} geçiyorsa girdilere, kullanılan araca, beklenen çıktıya ve hata durumuna bak. Bu sana konuyu ezberden çıkarıp uygulama seviyesine taşır.`
      },
      {
        title: "Neden önemli?",
        explanation: whyItMatters,
        example: `Checklist'i işaretlemeden önce bu konuyu bir örnekle açıklayabiliyor musun diye kendini test et. Açıklayamıyorsan konu henüz tam oturmamıştır.`
      }
    ],
    scenarios: [
      {
        problem: `${title} ile ilgili bir hata aldığında ilk sorulacak soru nedir?`,
        answer: "Problemin hangi parçada olduğunu bulmak",
        reason: "Önce kavramın amacını, sonra girdiyi, beklenen çıktıyı ve gerçek çıktıyı ayırırsan sorun daha kolay çözülür."
      },
      {
        problem: `Bir arkadaşın ${title} konusunu sadece tanım olarak ezberlemiş ama örnek veremiyor.`,
        answer: "Konu henüz uygulanabilir seviyede değil",
        reason: "Bu platformda hedef tanım ezberi değil; kavramı senaryo, örnek ve pratik üzerinden kullanabilmektir."
      }
    ],
    checklist: checklist.map((item, index) => ({
      id: `${id}-${index + 1}`,
      title: item,
      difficulty: index > 1 ? "medium" : "easy",
      estimatedMinutes: index > 1 ? 15 : 10
    })),  };
}

function weekTemplate(params: {
  id: string;
  weekNumber: number;
  title: string;
  zone: string;
  summary: string;
  lessonOverview: string;
  estimatedMinutes: number;
  originalMaterialUrl: string;
  sectionSpecs: Array<[string, string, string, string, string, string[]]>;
  concepts: Array<[string, string]>;
}): WeekContent {
  return {
    ...params,
    sections: params.sectionSpecs.map((spec) => section(...spec)),
    keyConcepts: params.concepts.map(([term, definition]) => ({
      id: term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      term,
      definition
    })),
    practiceTasks: [
      {
        id: `${params.id}-practice-1`,
        title: "Bir sayfalık çalışma çıktısı hazırla",
        description: "Haftanın ana kavramlarını bir sayfalık şema, tablo veya mini rehber halinde özetle.",
        estimatedMinutes: 25
      },
      {
        id: `${params.id}-practice-2`,
        title: "Bir arkadaşına anlat",
        description: "En zor gelen konuyu teknik terimleri sadeleştirerek bir arkadaşına anlatacak şekilde yaz.",
        estimatedMinutes: 20
      }
    ],  };
}

export const weeks: WeekContent[] = [
  week1,
  weekTemplate({
    id: "week-2",
    weekNumber: 2,
    title: "Software Development Environments",
    zone: "Programming Setup",
    estimatedMinutes: 240,
    originalMaterialUrl: "/materials/ce103-week-2-setup.en.md_slide.pdf",
    summary: "Flowgorithm, algoritma analizi fikri, C/C++/Java/C# geliştirme ortamları ve ortak mühendislik araçları tanıtılır.",
    lessonOverview: "Bu hafta program yazmadan önce geliştirme ortamının nasıl kurulduğunu öğrenirsin. Flowgorithm algoritmaları görsel düşünmeye yardım eder. IDE, compiler, editor, build tool ve yardımcı platformlar ise kaynak koddan çalışan programa giden yolu oluşturur.",
    sectionSpecs: [
      ["flowgorithm", "Flowgorithm", "Akış diyagramı ile algoritma kurmayı sağlayan görsel bir araçtır.", "Flowgorithm; main window, console window, source code viewer ve variable watch window ile algoritmayı programlama dilinden önce anlamanı sağlar.", "Algoritma mantığını syntax yükü olmadan öğrenmek için güçlü bir geçiş aracıdır.", ["Flowgorithm arayüzünü tanıdım", "Input/output şekillerini ayırt edebilirim", "Variable watch ile değişken takibi yapabilirim", "Source Code Viewer'ın amacını açıklayabilirim"]],
      ["algorithm-analysis", "Introduction to Analysis of Algorithms", "Algoritma analizi, çözümün ne kadar verimli çalıştığını anlamaktır.", "Bir problemi çözmek yetmez; çözümün büyüyen veri karşısında nasıl davrandığını da düşünmek gerekir. Bu fikir ileride Big-O, zaman ve bellek karmaşıklığına bağlanır.", "İyi mühendis sadece çalışan değil, ölçeklenebilir çözüm üretir.", ["Algoritma ve program farkını açıklayabilirim", "Verimlilik fikrini örnekle anlatabilirim", "Bir çözümü adım sayısı açısından düşünebilirim"]],
      ["ide-compiler", "IDE, Compiler and Editor Setup", "IDE ve derleyici, kod yazma ve çalıştırma sürecinin ana araçlarıdır.", "Visual Studio, VS Code, Eclipse, NetBeans, Dev-C++, Code::Blocks, MinGW, LLVM, Make ve CMake gibi araçlar farklı diller için geliştirme akışları sunar.", "Kurulum ve araç farklarını bilmek hata ayıklamayı ve proje çalıştırmayı kolaylaştırır.", ["IDE ile editor farkını biliyorum", "Compiler kavramını açıklayabilirim", "C/C++/Java/C# için örnek araç sayabilirim"]],
      ["common-tools", "Common Tools and Platforms", "Geliştiriciler kod dışında dokümantasyon, analiz, çizim, CI ve uzaktan bağlantı araçları kullanır.", "Doxygen, SonarLint, PlantUML, Draw.io, Putty, Docker, Jenkins, Vagrant, Godbolt ve Python Tutor gibi araçlar kod kalitesi, görselleştirme, otomasyon ve öğrenmeyi destekler.", "Profesyonel geliştirme sadece IDE'den ibaret değildir; ekosistemi tanımak üretkenliği artırır.", ["En az beş yardımcı aracın amacını biliyorum", "CI ve Docker kavramlarını ilk seviyede tanıdım", "Kod görselleştirme araçlarının faydasını açıklayabilirim"]]
    ],
    concepts: [["Flowgorithm", "Akış diyagramı ile algoritma tasarlama aracı."], ["IDE", "Kod yazma, çalıştırma ve hata ayıklama özelliklerini birleştiren geliştirme ortamı."], ["Compiler", "Kaynak kodu makinenin çalıştırabileceği biçime dönüştüren araç."], ["CMake", "Çok platformlu build yapılandırma aracı."], ["CI", "Kod değişikliklerini otomatik test/build süreçlerinden geçiren yaklaşım."]]
  }),
  weekTemplate({
    id: "week-3",
    weekNumber: 3,
    title: "Source Code Version Management with Git",
    zone: "Professional Workflow",
    estimatedMinutes: 260,
    originalMaterialUrl: "/materials/ce103-week-3-git.en.md_slide.pdf",
    summary: "SCM kavramı, Git kurulumu, commit, branch, merge, rebase, reset, log ve remote repository akışları öğrenilir.",
    lessonOverview: "Bu hafta kodun geçmişini yönetmeyi öğrenirsin. Git bir kaydetme aracından fazlasıdır; yazılım projesinin zaman çizelgesidir. Hangi değişiklik ne zaman, kim tarafından ve neden yapıldı sorularını izlenebilir hale getirir.",
    sectionSpecs: [
      ["scm-intro", "Source Code Management", "SCM, kaynak kod değişikliklerini takip eden sistemdir.", "Büyük projelerde dosyaları final2-last-real-final gibi adlandırmak sürdürülemez. SCM geçmiş, geri alma, sahiplik, eşitleme ve ekip çalışmasını düzenler.", "Ekip projelerinde iletişim maliyetini ve kayıp riskini azaltır.", ["SCM'in amacını açıklayabilirim", "Backup/restore ve track changes faydalarını biliyorum", "Centralized ve distributed farkını tanıdım"]],
      ["git-basics", "Git Init, Add and Commit", "Git repository, projenin takip edilen geçmişidir.", "git init repository başlatır, git add değişiklikleri staging alanına alır, git commit anlamlı bir geçmiş noktası oluşturur.", "Atomik commit alışkanlığı profesyonel kod inceleme ve hata bulma için kritiktir.", ["Repository başlatabilirim", "Staging area mantığını biliyorum", "Anlamlı commit mesajı yazabilirim"]],
      ["remote-flow", "Pull, Fetch and Push", "Remote repository ekipte kod paylaşım noktasıdır.", "fetch uzak değişiklikleri getirir, pull getirip entegre eder, push yerel commitleri uzak depoya gönderir.", "GitHub/GitLab/Bitbucket akışları staj ve iş hayatının standart pratiğidir.", ["Remote kavramını açıklayabilirim", "Pull/fetch farkını biliyorum", "Push işleminin ne gönderdiğini anladım"]],
      ["branch-merge", "Branching, Merging and Conflicts", "Branch, ana kodu bozmadan paralel çalışma alanı açar.", "Feature branch ile değişiklik izole edilir; merge bu değişiklikleri birleştirir. Aynı satır farklı değiştirilirse conflict çözülür.", "Ekipte güvenli özellik geliştirme ve deney yapma için branch mantığı gerekir.", ["Branch oluşturmanın amacını biliyorum", "Merge conflict neden olur açıklayabilirim", "Basit conflict çözüm akışını biliyorum"]],
      ["history-tools", "Rebase, Reset, Logs and Decision Tree", "Git geçmişini okumak ve gerektiğinde düzenlemek mühendislik kontrolü sağlar.", "log geçmişi gösterir, reset commit/stage durumunu değiştirir, rebase commitleri yeni tabana taşır. Bu komutlar dikkatli kullanılmalıdır.", "Git hatalarını paniklemeden çözmek için geçmiş modelini anlamak gerekir.", ["git log çıktısını okuyabilirim", "reset komutunun riskli olabileceğini biliyorum", "Rebase kavramını yüksek seviyede açıklayabilirim"]]
    ],
    concepts: [["Repository", "Git tarafından takip edilen proje alanı."], ["Commit", "Anlamlı bir değişiklik anı."], ["Branch", "Paralel geliştirme çizgisi."], ["Merge", "İki geliştirme çizgisini birleştirme."], ["Conflict", "Git'in otomatik birleştiremediği çakışma."]]
  }),
  weekTemplate({
    id: "week-4",
    weekNumber: 4,
    title: "Code Reusability and Automated Testing",
    zone: "Quality Engineering",
    estimatedMinutes: 230,
    originalMaterialUrl: "/materials/ce103-week-4-test.en.md_slide.pdf",
    summary: "Shared library geliştirme, console app ile library kullanımı, unit testing, TDD ve CI platformları tanıtılır.",
    lessonOverview: "Bu hafta kodu tekrar kullanılabilir parçalara ayırmayı ve doğru çalıştığını otomatik testlerle kanıtlamayı öğrenirsin. Örnekler sayHelloTo(name) ve sum(a,b) gibi küçük fonksiyonlarla başlar, ama fikir gerçek projelerdeki library/test mimarisinin temelidir.",
    sectionSpecs: [
      ["reusability", "Code Reusability", "Tekrar kullanılabilir kod, aynı işi farklı yerlerde kopyalamadan kullanmanı sağlar.", "Fonksiyonları ve library yapısını ayırmak bakım maliyetini azaltır. Bir sum fonksiyonunu console uygulaması, test runner ve başka modüller kullanabilir.", "Kopyala-yapıştır büyüyen projelerde hata ve bakım yükünü artırır.", ["Library ve executable farkını biliyorum", "Fonksiyonu tekrar kullanılabilir parça olarak görebilirim", "Kopya kod riskini açıklayabilirim"]],
      ["shared-libraries", "Shared and Static Library Development", "Library, başka programların çağırabileceği kod paketidir.", "C, C++, C# ve Java dünyasında library üretme biçimleri farklı olsa da ana fikir aynıdır: API sun, uygulama çağırır.", "Modüler yazılım tasarımı için library mantığı gereklidir.", ["Static/shared library kavramlarını ayırt edebilirim", "API yüzeyi fikrini anladım", "Library kullanan console app mantığını biliyorum"]],
      ["unit-testing", "Unit Testing", "Unit test, küçük bir kod parçasının beklenen sonucu verip vermediğini otomatik kontrol eder.", "sum(2,3) fonksiyonunun 5 döndürmesi gibi net beklentiler testle yazılır. Test, değişiklik sonrası bozulmayı erken yakalar.", "Profesyonel geliştirmede güvenli refactor ve kalite için test şarttır.", ["Test case yazma fikrini anladım", "Expected/actual farkını biliyorum", "Bir fonksiyon için en az iki test düşünebilirim"]],
      ["tdd-ci", "TDD and Continuous Integration", "TDD testi önce düşünmeyi, CI ise testleri otomatik çalıştırmayı teşvik eder.", "TDD'de önce başarısız test yazılır, sonra minimum kodla geçer hale getirilir. CI platformları her değişiklikte build/test çalıştırır.", "Takımda kaliteyi kişisel hafızaya değil otomasyona bağlar.", ["TDD döngüsünü açıklayabilirim", "CI'ın ne zaman çalıştığını biliyorum", "Build kırılması kavramını anladım"]]
    ],
    concepts: [["Unit Test", "Küçük kod birimini otomatik doğrulayan test."], ["TDD", "Testi önce yazmaya dayalı geliştirme yaklaşımı."], ["Static Library", "Derleme/link aşamasında programa bağlanan library."], ["CI", "Değişiklikleri otomatik build/test sürecinden geçirme."]]
  }),
  weekTemplate({
    id: "week-5",
    weekNumber: 5,
    title: "C Functional Console Programming",
    zone: "Programming Basics",
    estimatedMinutes: 300,
    originalMaterialUrl: "/materials/ce103-week-5-c.en.md_slide.pdf",
    summary: "C dili, kaynak koddan binary üretim akışı, temel syntax, fonksiyonel console programlama ve pratik örnekler işlenir.",
    lessonOverview: "Bu hafta düşük seviyeye yakın, hızlı ve klasik bir dil olan C ile console programlama temeline girersin. C; işletim sistemleri, derleyiciler ve gömülü sistemler gibi alanların dilidir.",
    sectionSpecs: [
      ["c-intro", "C Language and Executable Flow", "C kaynak kodu derlenerek çalıştırılabilir binary üretir.", "include, main, printf gibi temel parçalarla başlayan program; preprocessing, compilation, linking ve execution akışından geçer.", "Kodun binary'ye dönüşmesini anlamak bilgisayar mühendisliği bakışını güçlendirir.", ["C'nin kullanım alanlarını biliyorum", "main fonksiyonunun rolünü anladım", "Kaynak koddan executable üretim fikrini açıklayabilirim"]],
      ["c-variables", "Variables, Types and Operators", "Değişken, bellekte veri tutan isimlendirilmiş alandır.", "int, float, double, char gibi tipler verinin bellekte nasıl yorumlanacağını belirler. Operatörler hesaplama ve karşılaştırma yapar.", "Tip disiplini hata ayıklama ve bellek mantığı için kritiktir.", ["Temel C tiplerini sayabilirim", "Atama ve karşılaştırma farkını biliyorum", "Basit ifade değerlendirebilirim"]],
      ["c-control-flow", "Conditions and Loops", "Koşullar karar, döngüler tekrar sağlar.", "if/else ve switch programın hangi yolu izleyeceğini belirler. for, while ve do-while tekrar eden işlemleri kontrollü hale getirir.", "Algoritmaların büyük kısmı karar ve tekrar yapılarıyla ifade edilir.", ["if/else yazabilirim", "for ve while farkını açıklayabilirim", "Sonsuz döngü riskini biliyorum"]],
      ["c-functions", "Functions and Modular Thinking", "Fonksiyon, belirli işi yapan tekrar kullanılabilir kod parçasıdır.", "Parametre, dönüş değeri ve scope kavramları kodu parçalara ayırmayı sağlar. Fonksiyonel console programlama küçük, test edilebilir parçalar üretir.", "Büyük problemleri küçük parçalara bölmek algoritmik düşünmenin temelidir.", ["Fonksiyon imzasını okuyabilirim", "Parametre ve return farkını biliyorum", "Bir problemi fonksiyonlara ayırabilirim"]]
    ],
    concepts: [["main", "C programının giriş noktası."], ["Compiler", "C kodunu makine koduna dönüştüren araç."], ["Variable", "Bellekte veri tutan isimlendirilmiş alan."], ["Loop", "Bir işlemi koşula bağlı tekrar ettiren yapı."], ["Function", "Belirli görevi yapan kod bloğu."]]
  }),
  weekTemplate({
    id: "week-6",
    weekNumber: 6,
    title: "C++ Functional Console Programming",
    zone: "Programming Basics",
    estimatedMinutes: 310,
    originalMaterialUrl: "/materials/ce103-week-6-cpp.en.md_slide.pdf",
    summary: "C++ değişkenler, literaller, sabitler, tipler, input/output, operatörler, akış kontrolü ve fonksiyonlar ele alınır.",
    lessonOverview: "Bu hafta C++ ile console programlama çalışılır. İlk hedef syntax ezberi değil; veri, ifade, karar, döngü ve fonksiyon mantığını C++ üzerinde kurmaktır.",
    sectionSpecs: [
      ["cpp-variables", "Variables, Literals and Constants", "Variable değişebilir veri alanıdır; literal sabit değerin kod içindeki doğrudan yazımıdır.", "int age = 14 örneğinde age değişken, 14 literal değerdir. const ile değişmemesi gereken değer korunur.", "Doğru isimlendirme ve sabit kullanımı kod okunabilirliğini artırır.", ["C++ değişken tanımlayabilirim", "Literal kavramını açıklayabilirim", "const kullanım amacını biliyorum"]],
      ["cpp-types-io", "Data Types and Input/Output", "Tipler verinin türünü, cin/cout ise console iletişimini yönetir.", "int, double, char, bool ve string gibi tipler farklı veri ihtiyaçlarına karşılık gelir. cout çıktı, cin kullanıcı girdisi için kullanılır.", "Console programları algoritma pratiği için en temiz başlangıç ortamıdır.", ["Temel C++ tiplerini sayabilirim", "cout ile çıktı verebilirim", "cin ile kullanıcı girdisi alabilirim"]],
      ["cpp-operators", "Operators and Expressions", "Operatörler değerler üzerinde işlem yapar; expression hesaplanabilir ifadedir.", "Aritmetik, karşılaştırma, mantıksal ve atama operatörleri algoritmanın hesaplama cümlelerini oluşturur.", "Hatalı operatör seçimi mantık hatalarının en yaygın nedenlerindendir.", ["Aritmetik operatörleri biliyorum", "== ve = farkını açıklayabilirim", "Mantıksal operatörlerle koşul kurabilirim"]],
      ["cpp-flow-functions", "Flow Control and Functions", "Program akışı koşul, döngü ve fonksiyonlarla düzenlenir.", "if/switch karar verir, for/while tekrar eder, fonksiyonlar davranışı isimlendirir ve tekrar kullanılabilir hale getirir.", "Temiz programlar küçük ve amaçlı fonksiyonlardan oluşur.", ["if/switch kullanabilirim", "for/while ile tekrar kurabilirim", "Basit fonksiyon yazabilirim"]]
    ],
    concepts: [["Literal", "Kod içinde doğrudan yazılan sabit değer."], ["const", "Değişmemesi gereken değeri koruyan niteleyici."], ["cout", "Console çıktısı için kullanılan C++ stream nesnesi."], ["cin", "Console girdisi için kullanılan C++ stream nesnesi."], ["Expression", "Değer üreten ifade."]]
  }),
  weekTemplate({
    id: "week-7",
    weekNumber: 7,
    title: "C# Functional Console Programming",
    zone: "Managed Languages",
    estimatedMinutes: 320,
    originalMaterialUrl: "/materials/ce103-week-7-csharp.en.md_slide.pdf",
    summary: "C# Hello World, namespace, class, Main metodu, comments, variables, operators, flow control ve console IO işlenir.",
    lessonOverview: "Bu hafta C# ile managed ve nesne yönelimli dünyaya giriş yapılır. C# programı namespace, class ve Main metodu ile başlar. Console.WriteLine gibi ifadelerle çıktı verilir; tip güvenliği ve düzenli proje yapısı vurgulanır.",
    sectionSpecs: [
      ["csharp-hello", "Hello World Anatomy", "C# programının çalışması Main metodu ile başlar.", "namespace kapsayıcıdır, class program yapısının zorunlu parçasıdır, static void Main(string[] args) giriş noktasıdır. Console.WriteLine ekrana yazı basar.", "Programın iskeletini anlamadan syntax parçaları ezber gibi kalır.", ["namespace kavramını biliyorum", "class zorunluluğunu anladım", "Main metodunun giriş noktası olduğunu biliyorum"]],
      ["csharp-types", "Variables and Type Safety", "C# tip güvenliği olan modern bir dildir.", "int, double, char, string, bool gibi tipler verinin nasıl kullanılacağını belirler. Derleyici uyumsuz tipleri erken yakalar.", "Tip güvenliği daha okunabilir ve güvenilir kod yazmayı sağlar.", ["Temel C# tiplerini sayabilirim", "string ve char farkını biliyorum", "Tip hatasının ne olduğunu açıklayabilirim"]],
      ["csharp-flow", "Operators and Flow Control", "C# koşul ve döngü yapılarıyla algoritma akışını kurar.", "if/else, switch, for, foreach, while ve break gibi yapılar karar ve tekrar akışını oluşturur.", "C# syntax'ı ileride OOP ve uygulama geliştirme için temel sağlar.", ["if/else yazabilirim", "for ve foreach farkını tanıdım", "break kullanımını açıklayabilirim"]],
      ["csharp-comments-io", "Comments and Console IO", "Yorumlar geliştiriciye, console IO ise kullanıcıya iletişim sağlar.", "Comments derleyici tarafından çalıştırılmaz; kodun niyetini açıklar. Console.ReadLine ve WriteLine temel etkileşim kurar.", "Temiz açıklama ve kullanıcı girdisi pratik programların başlangıcıdır.", ["Tek satır yorum yazabilirim", "Console çıktısı verebilirim", "Kullanıcıdan değer alma fikrini biliyorum"]]
    ],
    concepts: [["namespace", "C# kodlarını mantıksal olarak gruplayan kapsayıcı."], ["class", "C# program yapısının temel tipi."], ["Main", "Programın çalışmaya başladığı metot."], ["Console.WriteLine", "Console'a çıktı yazan metot."], ["Type Safety", "Tip uyumsuzluklarını erken yakalamaya yardım eden özellik."]]
  }),
  weekTemplate({
    id: "week-8",
    weekNumber: 8,
    title: "Java Functional Console Programming-I",
    zone: "Managed Languages",
    estimatedMinutes: 220,
    originalMaterialUrl: "/materials/ce103-week-8-java-I.en.md_slide.pdf",
    summary: "PDF dosyası Java-I materyalini içerir: Java data types, operators, input/output, expressions, blocks, comments ve flow control başlıkları.",
    lessonOverview: "Bu yüklenen materyal dosyasında slayt başlığı Week-9 olarak geçse de platformda verilen dosya sırasına göre Week 8 olarak sunulur. Java tarafında temel veri tipleri, operatörler, input/output, expression/block/comment ve if/switch/loop gibi akış kontrol yapıları öğrenilir.",
    sectionSpecs: [
      ["java-data-types", "Java Data Types", "Java'da değişkenlerin tipi verinin türünü ve kullanımını belirler.", "Primitive tipler sayılar, karakterler ve boolean değerler için kullanılır; referans tipler nesneleri temsil eder. Tip seçimi bellek ve davranış açısından önemlidir.", "Java öğrenirken tip sistemi OOP'ye geçişin temelidir.", ["Primitive tipleri tanıdım", "Referans tip fikrini biliyorum", "Değişken tanımlama mantığını anladım"]],
      ["java-operators-io", "Java Operators and Input/Output", "Operatörler hesaplama yapar; input/output kullanıcıyla etkileşimi sağlar.", "Aritmetik, karşılaştırma ve mantıksal operatörler expression üretir. Console IO için temel sınıflar ve metotlar kullanılır.", "Algoritma problemlerinin çoğu girdi, işlem ve çıktı zinciridir.", ["Operatör türlerini ayırt edebilirim", "Basit expression okuyabilirim", "Console IO ihtiyacını açıklayabilirim"]],
      ["java-flow", "Java Flow Control", "if, switch ve döngüler programın karar ve tekrar davranışını kurar.", "if/else koşula göre yol seçer, switch çoklu seçeneklerde okunabilirlik sağlar, for/foreach/while tekrar eden işlemleri yönetir, break akışı keser.", "Akış kontrolü algoritmanın omurgasıdır.", ["if/else mantığını biliyorum", "switch kullanım alanını açıklayabilirim", "for, foreach ve while farklarını tanıdım"]],
      ["java-comments-blocks", "Expressions, Blocks and Comments", "Expression değer üretir, block kodu gruplayan kapsamdır, comment geliştirici açıklamasıdır.", "Java'da süslü parantezler scope oluşturur. Yorumlar kodun nedenini anlatır; iyi yorum kötü isimlendirmeyi kapatmak için değil, niyeti netleştirmek için kullanılır.", "Okunabilir Java kodu ileride sınıf ve metot tasarımını kolaylaştırır.", ["Expression ve statement farkını tanıdım", "Block/scope fikrini anladım", "Yorumların nasıl kullanılacağını biliyorum"]]
    ],
    concepts: [["Primitive Type", "Java'da temel değerleri tutan built-in tipler."], ["Operator", "Değerler üzerinde işlem yapan sembol veya yapı."], ["Expression", "Değer üreten kod parçası."], ["Block", "Süslü parantezlerle gruplanan kod alanı."], ["Flow Control", "Programın hangi sırayla çalışacağını belirleyen yapılar."]]
  })
];

export function getWeekById(weekId: string) {
  return weeks.find((week) => week.id === weekId);
}
