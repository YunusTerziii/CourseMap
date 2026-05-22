export const pdfDetails: Record<string, Record<string, string[]>> = {
  "week-1": {
    "computer-engineering-roles": [
      "PDF, bilgisayar mühendisliği rollerini yazılım geliştirme, donanım geliştirme, ağ organizasyonu ve yönetimi, veritabanı organizasyonu ve yönetimi, test/audit ve siber güvenlik olarak ayırır.",
      "Software development tarafında ihtiyaç analizi, kodlama, test, bakım, hata ayıklama ve sürüm yönetimi birlikte düşünülür.",
      "Hardware development; devre, sensör, kart, güç tüketimi, fiziksel cihaz davranışı ve gömülü sistemlerle ilişkilidir.",
      "Network management; IP adresleme, router/switch, DNS, firewall, VPN, port ve bağlantı problemlerini kapsar.",
      "Database management; verinin nasıl saklanacağı, ilişkilendirileceği, sorgulanacağı, yedekleneceği ve yetkilendirileceği ile ilgilenir.",
      "Cyber security and audit; gizlilik, bütünlük, erişilebilirlik, risk analizi, log inceleme, yetkilendirme ve politika uyumu gibi konuları kapsar.",
      "PDF ayrıca Computer Vision, Social Analytics, Mobility, IoT, Security, Web-Scale IT, Cloud, Smart Machines, Pervasive ve Fintech gibi çağdaş alanları örnekler."
    ],
    "developer-roadmaps": [
      "PDF, roadmap.sh gibi kaynaklardan frontend, backend, DevOps/SRE ve DBA yol haritalarının incelenmesini önerir.",
      "Frontend; HTML, CSS, JavaScript, frameworkler, tarayıcı davranışı ve kullanıcı arayüzü deneyimine odaklanır.",
      "Backend; sunucu tarafı mantık, API, veritabanı erişimi, kimlik doğrulama, güvenlik ve iş kurallarını kapsar.",
      "DevOps/SRE; deployment, otomasyon, monitoring, CI/CD, container, cloud ve sistem sürekliliği gibi konularla ilgilenir.",
      "DBA; veritabanı tasarımı, performans, yedekleme, güvenlik, migration ve yüksek erişilebilirlik konularına yoğunlaşır.",
      "Roadmap okurken hedef her teknolojiyi ezberlemek değil, teknolojinin hangi problemi çözdüğünü ve hangi sırayla öğrenileceğini anlamaktır."
    ],
    "professional-profile": [
      "PDF, ad.soyad formatına yakın profesyonel e-posta kullanımını ve e-posta adresinde gereksiz sayı/karmaşa kullanmamayı vurgular.",
      "LinkedIn profesyonel görünürlük; GitHub, GitLab ve Bitbucket kod portföyü; Docker profili container ekosistemi; ORCID ve ARBİS akademik kimlik için önemlidir.",
      "HackerRank gibi platformlar problem çözme pratiğini gösterir; Publons/akademik profiller araştırma tarafındaki görünürlüğü destekler.",
      "Kariyer.net, Yenibiris, SecretCV gibi iş arama platformları staj ve iş fırsatlarını takip etmek için kullanılabilir.",
      "Soft skills tarafında İngilizce, iletişim, sunum, problem açıklama, takım çalışması ve teknik yazım özellikle vurgulanır.",
      "Google Scholar, Google Patents ve Google Images gibi servisler araştırma, patent ve görsel referans bulmak için ders materyalinde anılır.",
      "Bu bölümün amacı öğrencinin sadece ders geçen kişi değil, görünür ve düzenli teknik kimliği olan bir aday haline gelmesidir."
    ],
    "operating-systems": [
      "PDF, Windows, Linux ve macOS'u geliştirici çalışma ortamının temel parçaları olarak ele alır.",
      "İşletim sistemi süreçleri, belleği, dosya sistemini, cihazları, ağ erişimini ve kullanıcı arayüzünü yönetir.",
      "Program dosya okumak, ağ bağlantısı açmak veya ekrana çıktı vermek istediğinde işletim sisteminin sunduğu servislerden yararlanır.",
      "Windows yaygın masaüstü ve Visual Studio ekosistemiyle; Linux sunucu, terminal ve açık kaynak dünyasıyla; macOS Unix tabanı ve mobil geliştirme ekosistemiyle öne çıkar.",
      "Programlama öğrenirken işletim sistemi bilgisi, kodun bilgisayarda gerçekten hangi kaynakları kullandığını anlamayı sağlar."
    ],
    "internet-basics": [
      "PDF, internetin sadece tarayıcıdan ibaret olmadığını; IP, port, DNS, NAT, TCP/UDP, router, kablo ve servislerden oluşan katmanlı bir sistem olduğunu gösterir.",
      "Submarine cables, internetin ülkeler ve kıtalar arasında fiziksel kablolarla taşındığını anlatmak için özellikle anılır.",
      "TCP bağlantı güvenilirliği ve sıralı veri aktarımıyla; UDP daha hafif ve hızlı aktarım yaklaşımıyla ilişkilidir.",
      "Bir web sitesine girmek; DNS çözümleme, IP adresine ulaşma, doğru porta bağlanma ve sunucudan yanıt alma adımlarını içerir.",
      "Bu temel, ileride backend, web geliştirme, cloud, siber güvenlik ve ağ hatası ayıklama konularının başlangıç noktasıdır."
    ],
    "ip-address": [
      "IPv4 adresleri 32 bitten oluşur ve 192.168.1.10 gibi dört parçalı biçimde yazılır.",
      "Her parça 0-255 aralığındadır; çünkü her parça 8 bitlik bir değeri temsil eder.",
      "Private IP yerel ağ içinde kullanılır; public IP internet üzerinde dış dünyaya görünen adrestir.",
      "Evdeki telefon, bilgisayar ve yazıcı farklı private IP'lere sahip olabilir; internete çıkarken çoğu zaman aynı public IP üzerinden görünürler.",
      "IP adresi cihazı veya hedef ağı bulmaya yardım eder; ama o cihazdaki hangi uygulamaya gidileceğini tek başına söylemez."
    ],
    "port": [
      "Port, aynı IP adresi üzerindeki farklı servisleri ayırır.",
      "80 HTTP, 443 HTTPS, 22 SSH, 3000/5173 gibi portlar geliştirme sunucuları için sık görülen örneklerdir.",
      "192.168.1.10:80 ifadesinde IP cihazı, 80 ise o cihazdaki web servisini temsil eder.",
      "TCP ve UDP iletişiminde port kavramı uygulamaların doğru hedefe ulaşması için kullanılır.",
      "Port kapalıysa IP'ye ulaşmak mümkün olsa bile ilgili servise bağlanılamayabilir."
    ],
    "nat-dns": [
      "NAT, yerel ağdaki private IP kullanan cihazların tek bir public IP üzerinden internete çıkmasını sağlar.",
      "Port forwarding, dışarıdan gelen belirli port isteklerini içerideki belirli cihaza ve porta yönlendirme mantığıdır.",
      "DNS, alan adlarını IP adreslerine çevirir; kullanıcı google.com yazar, bilgisayar bağlantı için IP adresine ihtiyaç duyar.",
      "DNS bozulursa internet bağlantısı varmış gibi görünse bile alan adları çözülemediği için siteler açılmayabilir.",
      "NAT ve DNS özellikle ev ağı, web sunucusu yayınlama, oyun sunucusu, remote access ve güvenlik ayarlarında karşına çıkar."
    ],
    "command-line-interface": [
      "PDF, komut satırını geliştirici için temel bir çalışma aracı olarak tanıtır.",
      "Klasör gezme, dosya listeleme, dosya oluşturma, proje çalıştırma, derleme ve Git komutları CLI üzerinden hızlı ve tekrar edilebilir yapılır.",
      "Temel komutlar; bulunduğun klasörü görme, klasör değiştirme, içerik listeleme, dosya/klasör oluşturma, silme, kopyalama ve program çalıştırma gibi işlemleri kapsar.",
      "CLI öğrenmek, Linux, Git, compiler, test, Docker ve sunucu yönetimi konularında ciddi avantaj sağlar.",
      "Terminal çıktısını okuyabilmek hata ayıklamanın ilk seviyesidir; çünkü çoğu araç hatayı önce terminalde anlatır."
    ],
    "windows-productivity": [
      "PDF, Windows kısayolları ve PowerToys gibi yardımcı araçlarla geliştirici verimliliğini artırmayı hedefler.",
      "Pencere yönetimi, pano geçmişi, hızlı arama, ekran düzenleme ve görev yöneticisi günlük çalışma akışını hızlandırır.",
      "PowerToys; pencere yerleşimi, hızlı başlatma ve üretkenlik yardımcılarıyla özellikle çok pencereli geliştirme ortamlarında faydalıdır.",
      "Kısayol bilmek doğrudan algoritma öğretmez; ama kod yazarken bağlam değiştirme maliyetini azaltır.",
      "Dersin bu kısmı profesyonel alışkanlık kazandırmayı hedefler: araçları tanı, hızlı hareket et, hataya daha az takıl."
    ]
  },
  "week-2": {
    flowgorithm: [
      "PDF, Flowgorithm arayüzünü main window, console window, source code viewer ve variable watch window parçalarıyla tanıtır.",
      "Main window akış diyagramının kurulduğu ana alandır; program mantığı şekiller ve bağlantılarla burada tasarlanır.",
      "Console window input/output işlemlerini gösterir; çıktı baloncuk veya düz metin biçiminde izlenebilir.",
      "Source Code Viewer, akış diyagramının farklı programlama dillerindeki kaynak koda nasıl karşılık gelebileceğini gösterir.",
      "Variable Watch Window, değişkenlerin program adımları ilerledikçe nasıl değer değiştirdiğini gözlemlemek için kullanılır.",
      "Flowgorithm syntax yükünü azaltır; öğrenci önce karar, tekrar, değişken ve çıktı mantığını görsel olarak öğrenir."
    ],
    "algorithm-analysis": [
      "PDF, algoritmayı sadece çalışan adımlar olarak değil, verimlilik açısından da değerlendirme fikrine giriş yapar.",
      "Bir çözümün doğru sonuç üretmesi önemlidir; fakat veri büyüdükçe sürenin ve bellek kullanımının nasıl değiştiği de önemlidir.",
      "Algoritma, problem çözme fikridir; program ise bu fikrin C, C++, Java veya C# gibi bir dilde yazılmış halidir.",
      "Analiz fikri ileride Big-O, zaman karmaşıklığı, bellek karmaşıklığı ve ölçeklenebilirlik konularına bağlanır.",
      "Bu haftada amaç ağır matematik değil, çözümü adım sayısı ve kaynak kullanımı açısından düşünmeye başlamaktır."
    ],
    "ide-compiler": [
      "PDF, C/C++ için Dev-C++, Code::Blocks, MinGW, LLVM, VS Code, Visual Studio, Notepad++, Vi/Vim, Eclipse, NetBeans, CMake ve Make gibi seçenekleri listeler.",
      "Java için VS Code, Notepad++, Eclipse, NetBeans ve build araçları; C# için VS Code ve Visual Studio gibi ortamlar örneklenir.",
      "Editor kod yazılan araçtır; compiler kaynak kodu çalıştırılabilir biçime dönüştürür; IDE birçok geliştirme aracını tek arayüzde toplar.",
      "C/C++ tarafında compiler kurulumu ve PATH ayarı hataları sık görülebilir; Java tarafında JDK, C# tarafında .NET SDK gerekir.",
      "Build tool, projenin hangi dosyalarla ve hangi ayarlarla derleneceğini düzenler."
    ],
    "common-tools": [
      "PDF; Doxygen, SonarLint, CodePen, CodeBeautify, AsciiFlow, Freemind, Mockflow, Wireflow, PlantUML, Draw.io, Putty ve MobaXterm gibi yardımcı araçları listeler.",
      "Docker ve Docker Compose uygulamayı bağımlılıklarıyla birlikte taşınabilir çalıştırmayı; Kubernetes container orkestrasyonunu temsil eder.",
      "Jenkins, Travis CI ve AppVeyor gibi araçlar otomatik build/test/deploy süreçlerini destekler.",
      "Vagrant sanal geliştirme ortamı kurmak için; Putty ve MobaXterm uzak sunucu bağlantıları için kullanılır.",
      "Godbolt derleyici çıktısını incelemek, Python Tutor kodun adım adım nasıl çalıştığını görmek, checksum araçları dosya doğrulamak için yararlıdır.",
      "Bu araçların hepsi aynı anda öğrenilmez; amaç profesyonel geliştirme ekosisteminin IDE'den ibaret olmadığını fark etmektir."
    ]
  },
  "week-3": {
    "scm-intro": [
      "PDF, Git, GitHub, GitLab, Bitbucket, Maven, SVN ve TFS gibi kaynak kod yönetimi ekosisteminden örnekler verir.",
      "SCM; değişiklik geçmişi, geri alma, sahiplik, eşitleme, backup/restore, branching ve merging gibi ihtiyaçları çözer.",
      "Büyük projelerde dosyaları final, final2, son-final gibi isimlerle saklamak sürdürülebilir değildir.",
      "Centralized sistemlerde tek merkezi kaynak öne çıkar; distributed sistemlerde her geliştiricide repository geçmişinin kopyası bulunur.",
      "Sürüm kontrolü, ekipte kimin neyi ne zaman ve neden değiştirdiğini izlenebilir hale getirir."
    ],
    "git-basics": [
      "git init repository başlatır; git add değişiklikleri staging alanına alır; git commit anlamlı bir değişiklik noktası oluşturur.",
      "Commit küçük, açıklayıcı ve tek amaca yönelik olmalıdır.",
      "Staging area, hangi değişikliklerin commit'e gireceğini kontrol etmeyi sağlar.",
      "Commit mesajı sadece teknik kayıt değil, gelecekte kodu okuyacak kişiye bırakılan açıklamadır.",
      "Repository, sadece dosyaların bulunduğu klasör değil, değişiklik geçmişiyle birlikte takip edilen proje alanıdır."
    ],
    "remote-flow": [
      "git fetch uzak depodaki değişiklikleri getirir ama çalışma dalına otomatik uygulamaz.",
      "git pull çoğunlukla fetch + merge/rebase gibi düşünülebilir; uzak değişikliği yerel dala entegre eder.",
      "git push yerel commit'leri GitHub/GitLab gibi remote repository'ye gönderir.",
      "Remote repository ekip üyelerinin ortak buluşma noktasıdır.",
      "Pull yapmadan push denemek bazen rejected hatası verebilir; çünkü uzak repository'de sende olmayan commit'ler olabilir."
    ],
    "branch-merge": [
      "Branch, ana kodu bozmadan yeni özellik veya deneysel değişiklik geliştirmeyi sağlar.",
      "Merge, iki geliştirme çizgisini birleştirir; aynı satırlar farklı değiştirilmişse conflict oluşabilir.",
      "Conflict çözmek, hangi değişikliğin korunacağına bilinçli karar vermektir.",
      "Feature branch mantığı, ekipte aynı anda farklı özelliklerin geliştirilmesini kolaylaştırır.",
      "Branch ile fork karıştırılmamalıdır; branch aynı repository içinde, fork ise repository'nin ayrı bir kopyası olarak düşünülür."
    ],
    "history-tools": [
      "git log geçmişi okumayı; reset staged/commit durumlarını geri almayı; rebase commit geçmişini yeniden tabanlandırmayı sağlar.",
      "Reset ve rebase güçlü komutlardır; özellikle paylaşılmış branch üzerinde dikkatli kullanılmalıdır.",
      "Git decision tree mantığı, hangi durumda hangi komutun uygun olduğunu seçmeye yardım eder.",
      "Log okumak sadece commit listesi görmek değildir; projenin zaman içindeki kararlarını anlamaktır.",
      "Git geçmişini görselleştiren araçlar branch, merge ve commit ilişkilerini kavramayı kolaylaştırır."
    ]
  },
  "week-4": {
    reusability: [
      "PDF, sayHelloTo(name) ve sum(a,b) gibi küçük fonksiyonlarla tekrar kullanılabilir kod fikrini somutlaştırır.",
      "Aynı fonksiyon console application, library ve unit test tarafında kullanılabilir.",
      "Kopyala-yapıştır ile çoğaltılan kod, hata düzeltme ve bakım maliyetini artırır.",
      "Tekrar kullanılabilir fonksiyon, belirli bir işi isimlendirir ve farklı yerlerden çağrılabilir hale getirir.",
      "Bu bölümün amacı öğrenciyi tek dosyalık düşünceden modüler proje düşüncesine taşımaktır."
    ],
    "shared-libraries": [
      "PDF, C, C++, C# ve Java için giriş seviyesinde shared/static library geliştirme mantığını tanıtır.",
      "Library kodu ayrı tutulur; console uygulaması bu library içindeki fonksiyonları çağırır.",
      "Static library derleme/link aşamasında programa bağlanırken shared/dynamic library çalışma zamanında da ayrı bir bileşen olarak düşünülebilir.",
      "C/C++ tarafında header/source ayrımı ve linker kavramı; C#/Java tarafında assembly/package/jar mantığı öne çıkar.",
      "Library tasarlamak, dışarıya hangi fonksiyonların sunulacağını yani API yüzeyini düşünmeyi gerektirir."
    ],
    "unit-testing": [
      "Unit test, bir fonksiyonun beklenen sonucu verip vermediğini otomatik kontrol eder.",
      "sum(a,b) örneğinde beklenen sonuç açıkça yazılır; fonksiyon farklı girişlerle test edilir.",
      "Expected ve actual değerleri karşılaştırılır; fark varsa test başarısız olur.",
      "Testler değişiklik sonrası bozulmaları erken yakalar ve refactor yapmayı güvenli hale getirir.",
      "Manual test insanın hatırlamasına bağlıdır; unit test tekrar çalıştırılabilir otomatik kontroldür."
    ],
    "tdd-ci": [
      "TDD yaklaşımında önce test yazılır, test başarısız olur, sonra minimum kodla test geçer hale getirilir.",
      "CI platformları kod değişikliklerinden sonra build ve test süreçlerini otomatik çalıştırır.",
      "Red-Green-Refactor döngüsü TDD'nin temel sezgisidir: önce kırmızı test, sonra geçen test, sonra temizlik.",
      "CI sayesinde kalite kontrol tek bir geliştiricinin bilgisayarına bağlı kalmaz.",
      "Build kırılması, değişikliklerin otomatik süreçten geçemediğini ve ekip tarafından görülmesi gereken bir problem olduğunu gösterir."
    ]
  },
  "week-5": {
    "c-intro": [
      "PDF, C dilini işletim sistemleri, veritabanları, derleyiciler ve düşük seviyeli yazılımlar için önemli bir dil olarak tanıtır.",
      "Kaynak koddan çalıştırılabilir programa giden akışta preprocessing, compilation, linking ve execution adımları düşünülmelidir.",
      "#include <stdio.h>, main ve printf gibi temel parçalar ilk C programının iskeletidir.",
      "Visual Studio tarafında C console project kurma ve dosya uzantısını .c olarak kullanma gibi pratik adımlar vurgulanır.",
      "C, belleğe yakın çalıştığı için bilgisayarın nasıl çalıştığını hissettiren güçlü bir başlangıç dilidir."
    ],
    "c-variables": [
      "C'de değişkenler bellekte belirli tipte veri tutar; int, float, double ve char gibi tipler farklı veri türleri için kullanılır.",
      "Atama operatörü ile karşılaştırma operatörünü karıştırmamak önemlidir.",
      "Tip seçimi hem bellek kullanımı hem de hesaplama doğruluğu açısından önem taşır.",
      "Değişken isimleri okunabilir olmalı ve tuttuğu değeri anlatmalıdır.",
      "Format specifier kullanımı printf/scanf gibi fonksiyonlarda doğru veri türüyle eşleşmelidir."
    ],
    "c-control-flow": [
      "if/else karar vermeyi; switch çoklu seçenekleri; for, while ve do-while tekrar eden işlemleri ifade eder.",
      "Döngü koşulu yanlış kurulursa sonsuz döngü veya beklenmeyen davranış oluşabilir.",
      "for genellikle tekrar sayısı belli durumlarda; while koşula bağlı tekrar durumlarında kullanılır.",
      "switch çok sayıda belirli seçenek olduğunda if/else zincirinden daha okunabilir olabilir.",
      "Kontrol akışı, algoritmanın bilgisayara adım adım anlatılmasını sağlar."
    ],
    "c-functions": [
      "Fonksiyonlar, problemi küçük ve tekrar kullanılabilir parçalara bölmeyi sağlar.",
      "Parametre, return değeri ve scope kavramları fonksiyonel console programlamanın temelidir.",
      "İyi fonksiyon tek bir işi yapar, adı ne yaptığını anlatır ve test edilmesi kolaydır.",
      "Fonksiyon imzası, fonksiyonun adını, parametrelerini ve döndürdüğü tipi anlatır.",
      "Büyük bir problemi fonksiyonlara bölmek hem okunabilirliği hem hata ayıklamayı kolaylaştırır."
    ]
  },
  "week-6": {
    "cpp-variables": [
      "PDF, C++ değişkenleri, literalleri ve sabitleri örneklerle tanıtır.",
      "int age = 14 örneğinde age değişken, 14 literal değerdir.",
      "const, değişmemesi gereken değerleri korumak ve kodun niyetini açık göstermek için kullanılır.",
      "Değişken isimlendirme kuralları; harf, rakam ve alt çizgi kullanımı, rakamla başlamama ve anlamlı ad seçme gibi pratikleri içerir.",
      "Literal türleri sayı, karakter, string ve boolean değerler üzerinden görülebilir."
    ],
    "cpp-types-io": [
      "C++ temel tipleri int, double, char, bool ve string gibi veri türlerini içerir.",
      "cout ekrana çıktı vermek, cin kullanıcıdan giriş almak için kullanılır.",
      "iostream kütüphanesi console input/output akışının temelidir.",
      "Kullanıcıdan alınan veri doğru tipe okunmazsa program beklenmeyen davranış gösterebilir.",
      "Console input/output, algoritma pratiği yapmak için temiz ve hızlı bir başlangıç sağlar."
    ],
    "cpp-operators": [
      "Aritmetik, karşılaştırma, mantıksal ve atama operatörleri C++ ifadelerinin temelini oluşturur.",
      "= atama yapar, == karşılaştırma yapar; bu fark özellikle başlangıçta kritik önemdedir.",
      "Expression, hesaplanıp bir değer üreten kod parçasıdır.",
      "Mantıksal operatörler &&, || ve ! ile koşulları birleştirmeyi sağlar.",
      "Operatör önceliği karmaşık ifadelerde sonucu etkileyebilir; gerekirse parantez kullanmak okunabilirliği artırır."
    ],
    "cpp-flow-functions": [
      "if/switch karar yapıları; for/while tekrar yapıları; fonksiyonlar ise davranışı isimlendiren parçalardır.",
      "C++'ta akış kontrolü ve fonksiyonlar, daha sonra sınıf ve nesne yönelimli programlama için zemin hazırlar.",
      "Temiz program, uzun tek blok yerine küçük fonksiyonlardan oluşur.",
      "break döngü veya switch akışından çıkmak; continue döngünün o turunu atlamak için kullanılabilir.",
      "Fonksiyonlar parametre alabilir, değer döndürebilir veya sadece bir yan etki gerçekleştirebilir."
    ]
  },
  "week-7": {
    "csharp-hello": [
      "PDF, C# Hello World programını satır satır parçalar: comment, namespace, class ve Main metodu.",
      "C# programının çalışması Main metodundan başlar.",
      "Console.WriteLine, ekrana çıktı vermek için kullanılan temel metottur.",
      "namespace kodu mantıksal olarak gruplar; class C# program yapısının temel kapsayıcısıdır.",
      "static void Main(string[] args) ifadesi programın başlangıç noktasını ve komut satırı argümanlarını temsil eder."
    ],
    "csharp-types": [
      "C# tip güvenliği olan bir dildir; değişkenin tipi ne tür veri tutacağını belirler.",
      "int, double, char, string ve bool gibi tipler temel veri ihtiyaçlarını karşılar.",
      "Derleyici, uyumsuz tip kullanımlarını erken yakalayarak hataları azaltır.",
      "string metin dizisini, char tek karakteri temsil eder; bu ikisi karıştırılmamalıdır.",
      "Tip sistemi ileride class, object ve generic yapılarını anlamak için temel oluşturur."
    ],
    "csharp-flow": [
      "if/else, switch, for, foreach, while ve break gibi yapılar program akışını düzenler.",
      "foreach özellikle koleksiyonlar üzerinde dolaşmak için okunabilir bir yapı sunar.",
      "break, döngü veya switch akışından çıkmak için kullanılır.",
      "Operators ve conditions birlikte kullanılarak programın hangi yoldan ilerleyeceği belirlenir.",
      "Flow control, console programdan daha büyük uygulamalara geçişte de aynı mantıkla kullanılır."
    ],
    "csharp-comments-io": [
      "Comments derleyici tarafından çalıştırılmaz; geliştiriciye kodun niyetini anlatır.",
      "Console.ReadLine kullanıcıdan metin almak, Console.WriteLine çıktı vermek için kullanılır.",
      "Yorumlar ne yaptığını değil, neden yapıldığını açıklayınca daha değerlidir.",
      "Kullanıcıdan alınan metin sayıya çevrilecekse parse/convert işlemleri gerekir.",
      "Console IO, küçük örneklerde programın dış dünyayla iletişim kurmasını sağlar."
    ]
  },
  "week-8": {
    "java-data-types": [
      "PDF, Java data types başlığıyla değişken tiplerinin Java programlamadaki yerini gösterir.",
      "Primitive tipler temel değerleri; referans tipler nesneleri temsil eder.",
      "Tip sistemi, Java'da ileride sınıf ve nesne mantığını anlamak için temel oluşturur.",
      "int, double, char, boolean gibi primitive tipler farklı değer türleri için kullanılır.",
      "String primitive değildir; metin verisini temsil eden referans tip olarak düşünülmelidir."
    ],
    "java-operators-io": [
      "Java operators, değerler üzerinde hesaplama, karşılaştırma ve mantıksal işlem yapmayı sağlar.",
      "Input/output, console programlarında kullanıcıdan veri alma ve sonuç gösterme akışıdır.",
      "Birçok algoritma problemi girdi, işlem ve çıktı zinciriyle düşünülür.",
      "Aritmetik operatörler hesaplama; karşılaştırma operatörleri koşul; mantıksal operatörler birden fazla koşulu birleştirme için kullanılır.",
      "Console IO için Scanner gibi araçlar kullanılabilir; alınan veri doğru tipe dönüştürülmelidir."
    ],
    "java-flow": [
      "Java flow control; if/else, switch, for, foreach, while ve break gibi yapıları içerir.",
      "Koşullar karar vermeyi, döngüler tekrar etmeyi sağlar.",
      "Akış kontrolü olmadan program yalnızca düz sırayla çalışan komutlardan oluşur.",
      "for tekrar sayısı daha net durumlarda; while koşul devam ettiği sürece tekrar gerektiren durumlarda kullanılır.",
      "break, döngüyü veya switch akışını erken bitirmek için kullanılabilir."
    ],
    "java-comments-blocks": [
      "Expression değer üretir; block süslü parantezlerle gruplanan kod alanıdır.",
      "Comments kodun çalışmasını değiştirmez ama geliştiriciye niyeti açıklar.",
      "Block ve scope mantığı, Java'da metot ve sınıf yapılarını anlamaya hazırlık sağlar.",
      "Statement bir işi gerçekleştiren komuttur; expression ise hesaplanıp değer üreten parçadır.",
      "Okunabilir yorum, kötü yazılmış kodu gizlemek için değil, kararın nedenini açıklamak için kullanılır."
    ]
  }
};

export function getPdfDetails(weekId: string, sectionId: string) {
  return pdfDetails[weekId]?.[sectionId] ?? [];
}
