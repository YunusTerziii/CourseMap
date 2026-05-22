import type { WeekContent } from "@/types/week";

export const week1: WeekContent = {
  id: "week-1",
  weekNumber: 1,
  title: "Introduction and Developer Roadmap",
  zone: "Foundation Zone",
  estimatedMinutes: 210,
  originalMaterialUrl: "/materials/ce103-week-1-intro.en.md_slide.pdf",
  summary:
    "Bilgisayar mühendisliğine başlamadan önce yazılım rolleri, profesyonel geliştirici alışkanlıkları, işletim sistemi mantığı, internetin temel yapı taşları ve komut satırı kültürü öğrenilir.",
  lessonOverview:
    "Bu hafta doğrudan kod yazmıyoruz. Önce bilgisayar mühendisliği alanlarını, yazılımcı yol haritalarını, işletim sistemlerini, internetin temel kavramlarını ve komut satırı kullanımını öğreniyoruz. Bu bilgiler ileride C programlama, algoritmalar, Git, backend, siber güvenlik ve sistem yönetimi gibi konuların temelini oluşturur. Amaç ezber yapmak değil; bilgisayarın, ağların ve geliştirici araçlarının arka planda nasıl düşündüğünü fark etmektir.",
  sections: [
    {
      id: "computer-engineering-roles",
      title: "Computer Engineering Roles",
      simpleExplanation:
        "Bilgisayar mühendisliği tek bir meslek değildir; yazılım, donanım, ağ, veritabanı, güvenlik ve yapay zeka gibi birçok uzmanlık alanını kapsar.",
      detailedExplanation:
        "Bir bilgisayar mühendisi yalnızca uygulama yazan kişi değildir. Yazılım geliştirme kullanıcıların kullandığı ürünleri üretirken, donanım geliştirme işlemci, gömülü sistem ve elektronik bileşenlerle ilgilenir. Ağ yönetimi bilgisayarların birbiriyle güvenilir iletişim kurmasını sağlar. Veritabanı yönetimi verinin doğru, hızlı ve güvenli saklanmasına odaklanır. Siber güvenlik ise sistemleri saldırılardan korur. Bu alanları erken tanımak, derslerde öğrendiğin her kavramın hangi gerçek meslek problemine bağlandığını görmeni sağlar.",
      analogy:
        "Bir hastanedeki farklı uzmanlıklar gibi düşünebilirsin. Herkes sağlık alanındadır ama cerrah, radyolog ve acil doktorunun problemi ele alış biçimi farklıdır.",
      whyItMatters:
        "Kariyer yönünü seçmek, hangi teknolojilere öncelik vereceğini bilmek ve derslerdeki teorik konuları gerçek işlerle ilişkilendirmek için bu rol haritası önemlidir.",
      summary:
        "Bilgisayar mühendisliği geniş bir ekosistemdir. İlk hafta bu ekosistemi görmek, ileride hangi yolda derinleşeceğini seçmene yardım eder.",
      teachingCards: [
        {
          title: "Software Development",
          explanation:
            "Software development, kullanıcının veya kurumun ihtiyacını çalışan bir programa dönüştürme işidir. Bu rol problem analizi, algoritma kurma, kod yazma, test etme, hata düzeltme ve bakım yapma adımlarını içerir. Web sitesi, mobil uygulama, masaüstü programı, API, oyun veya otomasyon sistemi geliştiren kişi çoğunlukla yazılım geliştirme tarafındadır.",
          example:
            "Üniversite yemekhane menüsünü gösteren bir mobil uygulama yapılacaksa; ekranlar, butonlar, veri çekme, giriş sistemi ve hata mesajları software developer işidir."
        },
        {
          title: "Hardware Development",
          explanation:
            "Hardware development, bilgisayarın fiziksel tarafıyla ilgilenir: devreler, sensörler, mikrodenetleyiciler, işlemci mimarisi, PCB tasarımı ve gömülü sistemler. Burada sorun sadece kodun çalışması değildir; elektriksel sinyal, güç tüketimi, kart tasarımı ve cihazın fiziksel dayanıklılığı da önemlidir.",
          example:
            "Bir akıllı bileklik kalp atışını ölçecekse; sensör seçimi, devre tasarımı, batarya kullanımı ve cihazın ölçüm donanımı hardware development konusudur."
        },
        {
          title: "Network Organization and Management",
          explanation:
            "Network management, cihazların birbirine ve internete güvenilir şekilde bağlanmasını sağlar. IP adresleme, router/switch yapılandırması, DNS, firewall, VPN, port yönetimi, bant genişliği ve ağ arızalarını çözme bu alanın parçasıdır. Bu rol 'uygulama nasıl yazılır?' sorusundan çok 'cihazlar nasıl haberleşir?' sorusuna odaklanır.",
          example:
            "Bir laboratuvardaki 40 bilgisayar internete çıkamıyor veya aynı sunucuya bağlanamıyorsa, problemi ağ yöneticisi IP, DNS, router, switch ve firewall üzerinden araştırır."
        },
        {
          title: "Database Organization and Management",
          explanation:
            "Database management, verinin düzenli, hızlı, güvenli ve tutarlı saklanmasını sağlar. Tablo tasarımı, ilişki kurma, SQL sorguları, index, backup, yetkilendirme ve veri bütünlüğü bu alanın konularıdır. Yazılım ekranda veriyi gösterir; veritabanı o verinin doğru yerde, doğru biçimde ve kaybolmadan durmasını sağlar.",
          example:
            "Öğrenci bilgi sisteminde dersler, notlar, yoklama ve transkript bilgileri karışmadan saklanmalıysa database tarafı doğru modellenmelidir."
        },
        {
          title: "Cyber Security and Audit",
          explanation:
            "Cyber security, sistemleri izinsiz erişim, veri sızıntısı, kötü amaçlı yazılım, zayıf parola, yanlış yetkilendirme ve ağ saldırılarına karşı korur. Audit tarafı ise sistemin kurallara ve güvenlik politikalarına uyup uymadığını kontrol eder. Güvenlikçi sadece saldırı yapmayı bilmez; riski ölçer, önlem alır ve sistemi daha dayanıklı hale getirir.",
          example:
            "Bir web sitesinde kullanıcılar başkasının notlarını görebiliyorsa bu yazılım hatasıdır ama etkisi güvenlik problemidir; cyber security bu yetki açığını bulur ve kapatılmasını sağlar."
        }
      ],
      scenarios: [
        {
          problem: "Bir okulun öğrenci kayıt uygulamasında 'not hesaplama' fonksiyonu yanlış sonuç üretiyor.",
          answer: "Software Development",
          reason: "Problem uygulama mantığı ve kod davranışıyla ilgilidir. Fonksiyon, test ve algoritma kontrol edilir."
        },
        {
          problem: "Kampüsteki bilgisayarlar bazen internete bağlanıyor bazen bağlanmıyor.",
          answer: "Network Management",
          reason: "Problem cihazlar arası iletişim, IP, DNS, router, switch veya firewall kaynaklı olabilir."
        },
        {
          problem: "Bir sensör kartı fazla güç tükettiği için cihazın pili iki saatte bitiyor.",
          answer: "Hardware Development",
          reason: "Problem fiziksel cihaz, güç tüketimi, devre tasarımı ve bileşen seçimiyle ilgilidir."
        },
        {
          problem: "Kullanıcı kayıtları bazen tekrar ediyor ve hangi kaydın doğru olduğu anlaşılamıyor.",
          answer: "Database Management",
          reason: "Problem veri modeli, benzersizlik kuralı, tablo ilişkisi veya veri bütünlüğüyle ilgilidir."
        },
        {
          problem: "Bir kullanıcı URL'deki id değerini değiştirerek başka öğrencinin bilgilerini görebiliyor.",
          answer: "Cyber Security",
          reason: "Problem yetkilendirme kontrolü ve veri gizliliği ihlalidir. Güvenlik açığı olarak ele alınır."
        }
      ],
      checklist: [
        { id: "role-map", title: "Yazılım, donanım, ağ, veritabanı ve güvenlik rollerini ayırt edebilirim", difficulty: "easy", estimatedMinutes: 10 },
        { id: "career-fit", title: "En çok ilgimi çeken iki bilgisayar mühendisliği alanını seçtim", difficulty: "easy", estimatedMinutes: 8 },
        { id: "role-output", title: "Her rolün ürettiği somut çıktıya bir örnek verebilirim", difficulty: "medium", estimatedMinutes: 12 }
      ],    },
    {
      id: "developer-roadmaps",
      title: "Developer Roadmaps",
      simpleExplanation:
        "Developer roadmap, bir alanda ilerlemek için hangi konuları hangi sırayla öğrenebileceğini gösteren öğrenme haritasıdır.",
      detailedExplanation:
        "Frontend, backend, DevOps, mobil, DBA veya siber güvenlik gibi alanların her biri farklı araçlar ve temel bilgiler ister. Roadmap sana bir öğrenme rotası verir: önce internet ve komut satırı, sonra Git, bir programlama dili, veri yapıları, frameworkler, test, deployment ve profesyonel pratikler gibi. Roadmap bir zorunluluk listesi değil, kaybolmanı önleyen pusuladır. İyi bir mühendis roadmap'i körü körüne tüketmez; hedeflediği projeye göre sırayı ve derinliği ayarlar.",
      analogy:
        "Bir şehir haritası gibi. Harita tüm yolları gösterir ama nereye gideceğine göre en mantıklı rotayı sen seçersin.",
      whyItMatters:
        "Öğrencilerin en büyük problemi neyi ne zaman öğrenmesi gerektiğini bilememektir. Roadmap bu belirsizliği azaltır ve çalışma motivasyonunu somutlaştırır.",
      summary:
        "Roadmap öğrenmeyi sıraya koyar, ama gerçek gelişim küçük projelerle ve düzenli tekrarlarla olur.",
      checklist: [
        { id: "frontend-backend", title: "Frontend, backend ve DevOps farkını açıklayabilirim", difficulty: "easy", estimatedMinutes: 10 },
        { id: "personal-roadmap", title: "Kendi 8 haftalık mini öğrenme yol haritamı çıkardım", difficulty: "medium", estimatedMinutes: 20 },
        { id: "project-driven", title: "Roadmap maddelerini örnek projelerle ilişkilendirdim", difficulty: "medium", estimatedMinutes: 15 }
      ],    },
    {
      id: "professional-profile",
      title: "Professional Profile and Resume",
      simpleExplanation:
        "Profesyonel e-posta, LinkedIn, GitHub/GitLab ve temiz bir CV; teknik becerilerini görünür yapan temel kariyer araçlarıdır.",
      detailedExplanation:
        "Bilgisayar mühendisliği öğrenirken sadece bilgi edinmezsin, aynı zamanda çalışmalarını kanıtlanabilir hale getirirsin. Profesyonel e-posta ciddi iletişim için gereklidir. LinkedIn görünürlük ve network sağlar. GitHub veya GitLab kodlarını, commit alışkanlığını ve proje kaliteni gösterir. CV ise deneyimini kısa, ölçülebilir ve okunabilir şekilde sunar. Soft skill tarafında net iletişim, öğrenme disiplini, takım çalışması ve problem açıklama becerisi teknik bilgi kadar fark yaratır.",
      analogy:
        "Kod yazmak mutfakta iyi yemek yapmaksa, GitHub vitrindeki tadım menüsüdür; insanlar ne yaptığını oradan görür.",
      whyItMatters:
        "Staj, proje takımı, açık kaynak ve iş başvurularında yalnızca ne bildiğin değil, ne ürettiğini nasıl gösterdiğin de değerlendirilir.",
      summary:
        "Profesyonel profil, öğrencilik boyunca yaptığın işleri düzenli bir portföye dönüştürür.",
      checklist: [
        { id: "professional-email", title: "Profesyonel görünen bir e-posta adresi hazırladım", difficulty: "easy", estimatedMinutes: 5 },
        { id: "github-profile", title: "GitHub/GitLab profilimi açıklama ve fotoğrafla düzenledim", difficulty: "easy", estimatedMinutes: 15 },
        { id: "linkedin-cv", title: "LinkedIn ve CV'mde eğitim/proje alanlarını güncelledim", difficulty: "medium", estimatedMinutes: 25 }
      ],    },
    {
      id: "operating-systems",
      title: "Operating Systems",
      simpleExplanation:
        "İşletim sistemi, donanım ile uygulamalar arasında köprü kuran ve kaynakları yöneten temel sistem yazılımıdır.",
      detailedExplanation:
        "Windows, Linux ve macOS gibi işletim sistemleri CPU, RAM, disk, dosya sistemi, ağ ve çalışan süreçleri yönetir. Bir program dosya okumak, ekrana yazı yazmak veya internete bağlanmak istediğinde doğrudan donanımla konuşmaz; işletim sisteminin sunduğu arayüzleri kullanır. System call kavramı burada önemlidir: uygulama, çekirdek seviyesindeki güvenli işlemleri işletim sisteminden ister. Bu yüzden programlama öğrenirken işletim sistemini anlamak, kodun gerçek bilgisayarda nasıl çalıştığını anlamaktır.",
      analogy:
        "İşletim sistemi bir otel yöneticisi gibidir. Odaları, anahtarları, güvenliği ve çalışanları düzenler; misafirler her şeye doğrudan müdahale etmez.",
      whyItMatters:
        "C programlama, süreçler, dosya işlemleri, bellek yönetimi, Linux komutları, backend deployment ve siber güvenlik için işletim sistemi temeli zorunludur.",
      summary:
        "OS, uygulamaların donanıma güvenli ve düzenli biçimde erişmesini sağlayan ana katmandır.",
      checklist: [
        { id: "os-purpose", title: "İşletim sisteminin temel görevlerini sayabilirim", difficulty: "easy", estimatedMinutes: 10 },
        { id: "system-call", title: "System call kavramını basitçe açıklayabilirim", difficulty: "medium", estimatedMinutes: 15 },
        { id: "windows-linux-macos", title: "Windows, Linux ve macOS kullanım alanlarını karşılaştırdım", difficulty: "easy", estimatedMinutes: 10 }
      ],    },
    {
      id: "internet-basics",
      title: "Internet Basics",
      simpleExplanation:
        "İnternet, cihazların belirli kurallar ve ağ altyapısı üzerinden veri paketleri gönderip aldığı küresel iletişim ağıdır.",
      detailedExplanation:
        "Bir web sitesine girdiğinde bilgisayarın tek parça halinde dev bir dosya almaz. Veriler küçük paketlere bölünür, ağ cihazları üzerinden taşınır ve hedefte tekrar anlamlı hale gelir. Bu iletişim; IP adresleri, portlar, DNS, TCP/UDP, routerlar, denizaltı kabloları ve veri merkezleri gibi birçok katmanın birlikte çalışmasıyla gerçekleşir. İnternet soyut gibi görünse de fiziksel kablolar, yönlendiriciler ve protokoller üzerinde çalışır.",
      analogy:
        "Bir mektubun ülke, şehir, sokak ve bina bilgisiyle taşınması gibi; internet veriyi adresler ve kurallar yardımıyla hedefe ulaştırır.",
      whyItMatters:
        "Web geliştirme, API kullanımı, backend, cloud, güvenlik ve hata ayıklama için internetin temel çalışma mantığını bilmek gerekir.",
      summary:
        "İnternet, protokoller ve fiziksel altyapının birlikte çalıştığı paket tabanlı bir iletişim sistemidir.",
      checklist: [
        { id: "packet-idea", title: "Verinin paketler halinde taşındığını anladım", difficulty: "easy", estimatedMinutes: 8 },
        { id: "protocol-stack", title: "IP, TCP/UDP ve DNS’in aynı iletişim sürecindeki rollerini ayırt edebilirim", difficulty: "medium", estimatedMinutes: 18 },
        { id: "physical-internet", title: "İnternetin fiziksel altyapıya dayandığını açıklayabilirim", difficulty: "easy", estimatedMinutes: 7 }
      ],    },
    {
      id: "ip-address",
      title: "IP Address",
      simpleExplanation:
        "IP adresi, bir cihazın ağ üzerindeki adresidir.",
      detailedExplanation:
        "Bir cihaz internete veya yerel ağa bağlandığında diğer cihazlarla iletişim kurabilmesi için bir adrese ihtiyaç duyar. Bu adrese IP adresi denir. IPv4 adresleri 32 bitten oluşur ve genelde 192.168.1.10 gibi dört parçalı şekilde yazılır. Her parça 0-255 aralığındadır çünkü her biri 8 bittir. Private IP adresleri ev veya okul ağı içinde kullanılırken, public IP adresleri internette dış dünyaya görünen adrestir.",
      analogy:
        "IP adresini ev adresi gibi düşünebilirsin. Bir kargo göndermek için adres gerekiyorsa, internet üzerinden veri göndermek için de IP adresi gerekir.",
      whyItMatters:
        "Backend, network, siber güvenlik, server yönetimi ve web geliştirme alanlarında IP mantığını bilmek zorunludur.",
      summary:
        "IP adresi cihazı bulur; private/public ayrımı ise yerel ağ ile internet arasındaki farkı anlamanı sağlar.",
      checklist: [
        { id: "ip-definition", title: "IP adresinin ne olduğunu anladım", difficulty: "easy", estimatedMinutes: 5 },
        { id: "ipv4-format", title: "IPv4 formatını ve 32 bit mantığını öğrendim", difficulty: "medium", estimatedMinutes: 12 },
        { id: "private-public", title: "Private ve public IP farkını açıklayabilirim", difficulty: "medium", estimatedMinutes: 12 },
        { id: "ip-role", title: "IP’nin internet iletişimindeki rolünü anladım", difficulty: "easy", estimatedMinutes: 8 }
      ],    },
    {
      id: "port",
      title: "Port",
      simpleExplanation:
        "Port, aynı IP adresi üzerindeki farklı uygulama ve servisleri ayıran mantıksal numaradır.",
      detailedExplanation:
        "IP adresi cihazı bulmamızı sağlar, port ise o cihazdaki hangi servise bağlanacağımızı belirtir. Örneğin 192.168.1.10:80 ifadesinde 192.168.1.10 cihazın IP adresidir, 80 ise HTTP servisinin portudur. Aynı bilgisayarda web sunucusu 80 veya 443 portunda, SSH servisi 22 portunda, geliştirme sunucun ise 3000 portunda çalışabilir. TCP ve UDP iletişiminde port numaraları bağlantının doğru uygulamaya ulaşmasını sağlar.",
      analogy:
        "IP adresi bir apartmanın adresiyse, port numarası apartmandaki daire numarası gibidir.",
      whyItMatters:
        "Localhost geliştirme, API bağlantıları, firewall ayarları, Docker, deployment ve siber güvenlikte port bilgisi sürekli karşına çıkar.",
      summary:
        "IP cihazı, port ise cihazdaki servisi hedefler. Bu ikisi birlikte ağ iletişiminin adresini tamamlar.",
      checklist: [
        { id: "port-concept", title: "Port kavramını anladım", difficulty: "easy", estimatedMinutes: 5 },
        { id: "ip-vs-port", title: "IP ve port farkını öğrendim", difficulty: "easy", estimatedMinutes: 8 },
        { id: "common-ports", title: "80, 443, 22 ve 3000 gibi yaygın portları öğrendim", difficulty: "medium", estimatedMinutes: 12 },
        { id: "tcp-udp-port", title: "TCP ve UDP’nin port kullandığını öğrendim", difficulty: "medium", estimatedMinutes: 10 }
      ],    },
    {
      id: "nat-dns",
      title: "NAT, Port Forwarding and DNS",
      simpleExplanation:
        "NAT yerel ağdaki cihazları tek public IP üzerinden internete çıkarabilir; DNS ise alan adlarını IP adreslerine çevirir.",
      detailedExplanation:
        "Evdeki telefon, bilgisayar ve tablet genelde private IP alır. Router, bu cihazların internete çıkarken aynı public IP’yi kullanmasını NAT ile yönetir. Port forwarding ise dışarıdan gelen belirli port isteklerini içerideki belirli cihaza yönlendirmeyi sağlar. DNS tarafında ise insanlar google.com gibi isimleri hatırlar, bilgisayarlar IP adresleriyle iletişim kurar. DNS bu isimleri IP adreslerine çevirerek web deneyimini kullanılabilir hale getirir.",
      analogy:
        "DNS telefon rehberi gibidir: ismi bilirsin, rehber numarayı bulur. NAT ise apartman resepsiyonu gibi gelen-giden paketleri doğru daireyle eşleştirir.",
      whyItMatters:
        "Alan adı bağlama, local server yayınlama, ağ hatalarını çözme, cloud deployment ve güvenlik ayarlarında NAT ve DNS bilgisi pratik olarak gerekir.",
      summary:
        "DNS isimleri IP’ye çevirir; NAT yerel ağ cihazlarının internetle konuşmasını düzenler.",
      checklist: [
        { id: "nat-purpose", title: "NAT’in neden kullanıldığını açıklayabilirim", difficulty: "medium", estimatedMinutes: 12 },
        { id: "port-forwarding", title: "Port forwarding mantığını basit bir örnekle anlatabilirim", difficulty: "medium", estimatedMinutes: 15 },
        { id: "dns-purpose", title: "DNS’in alan adını IP adresine çevirdiğini öğrendim", difficulty: "easy", estimatedMinutes: 8 },
        { id: "domain-flow", title: "Bir alan adına girince yaşanan temel ağ akışını sıralayabilirim", difficulty: "hard", estimatedMinutes: 20 }
      ],    },
    {
      id: "command-line-interface",
      title: "Command Line Interface",
      simpleExplanation:
        "Komut satırı, bilgisayara metin komutlarıyla talimat verdiğin güçlü bir çalışma arayüzüdür.",
      detailedExplanation:
        "Grafik arayüzde klasörlere tıklarsın; komut satırında ise cd, dir/ls, mkdir, copy/cp, del/rm gibi komutlarla aynı işlemleri daha hızlı ve otomatik yapılabilir hale getirirsin. CLI yalnızca eski bir yöntem değildir; yazılım geliştirme dünyasının merkezindedir. Git, paket yöneticileri, derleyiciler, test araçları, Docker ve cloud araçları çoğunlukla komut satırıyla çalışır. Başta soğuk görünür ama düzenli kullanıldığında geliştiricinin kontrol hissini artırır.",
      analogy:
        "Grafik arayüz uzaktan kumanda gibiyse, komut satırı cihazın profesyonel kontrol panelidir.",
      whyItMatters:
        "C derleme, proje çalıştırma, Git kullanımı, sunucu yönetimi ve hata ayıklama için CLI pratiği erken kazanılması gereken bir alışkanlıktır.",
      summary:
        "CLI, geliştirici araçlarını hızlı ve tekrar edilebilir şekilde kullanmanın temel yoludur.",
      checklist: [
        { id: "navigate-cli", title: "Terminalde klasörler arasında gezinebilirim", difficulty: "easy", estimatedMinutes: 10 },
        { id: "file-commands", title: "Dosya/klasör oluşturma, listeleme ve silme komutlarını biliyorum", difficulty: "medium", estimatedMinutes: 18 },
        { id: "run-project", title: "Bir geliştirme komutunu terminalden çalıştırabilirim", difficulty: "medium", estimatedMinutes: 12 }
      ],    },
    {
      id: "windows-productivity",
      title: "Windows Shortcuts and PowerToys",
      simpleExplanation:
        "Klavye kısayolları ve üretkenlik araçları, bilgisayarı daha hızlı ve odaklı kullanmanı sağlar.",
      detailedExplanation:
        "Profesyonel geliştiriciler yalnızca kod bilgisiyle değil, çalışma akışlarının hızıyla da fark yaratır. Alt+Tab, Win+Arrow, Win+V, Ctrl+L, Ctrl+Shift+Esc gibi kısayollar pencere, pano, arama ve görev yönetimini hızlandırır. PowerToys gibi araçlar pencere düzenleme, hızlı arama, renk seçme ve toplu işlem gibi yetenekler sunar. Bunlar küçük görünür ama her gün tekrarlandığı için toplam verimliliği ciddi artırır.",
      analogy:
        "Bir enstrümanda parmak egzersizi yapmak gibi: tek başına müzik değildir ama iyi çalmanın hızını ve akıcılığını sağlar.",
      whyItMatters:
        "Kod yazarken dokümantasyon, terminal, tarayıcı ve editör arasında hızlı geçmek odak kaybını azaltır.",
      summary:
        "Kısayollar ve üretkenlik araçları, mühendislik çalışma ritmini daha akıcı hale getirir.",
      checklist: [
        { id: "shortcut-set", title: "Günlük kullanacağım 8 Windows kısayolunu belirledim", difficulty: "easy", estimatedMinutes: 10 },
        { id: "window-management", title: "Pencereleri klavyeyle düzenleyebiliyorum", difficulty: "easy", estimatedMinutes: 8 },
        { id: "powertoys", title: "PowerToys’un en az iki özelliğinin ne işe yaradığını biliyorum", difficulty: "easy", estimatedMinutes: 8 }
      ],    }
  ],
  keyConcepts: [
    { id: "software-development", term: "Software Development", definition: "Kullanıcı veya sistem ihtiyaçlarını karşılayan yazılım ürünleri tasarlama, kodlama, test etme ve bakımını yapma sürecidir." },
    { id: "roadmap", term: "Roadmap", definition: "Bir alanda ilerlemek için öğrenilecek konuları sıralayan esnek öğrenme haritasıdır." },
    { id: "operating-system", term: "Operating System", definition: "Donanım kaynaklarını yöneten ve uygulamalara güvenli çalışma ortamı sağlayan temel sistem yazılımıdır." },
    { id: "system-call", term: "System Call", definition: "Bir uygulamanın işletim sisteminden dosya, bellek, süreç veya ağ gibi düşük seviye hizmetler istemesidir." },
    { id: "ip-address", term: "IP Address", definition: "Bir cihazın ağ üzerindeki adresidir; cihazların birbirini bulmasını sağlar." },
    { id: "port", term: "Port", definition: "Aynı IP üzerindeki farklı servisleri ayıran mantıksal numaradır." },
    { id: "tcp", term: "TCP", definition: "Verinin sıralı ve güvenilir iletilmesini hedefleyen bağlantı odaklı taşıma protokolüdür." },
    { id: "udp", term: "UDP", definition: "Daha düşük gecikme için bağlantısız ve hafif iletişim sağlayan taşıma protokolüdür." },
    { id: "dns", term: "DNS", definition: "Alan adlarını IP adreslerine çeviren dağıtık isim çözümleme sistemidir." },
    { id: "nat", term: "NAT", definition: "Yerel ağdaki private IP’lerin internette public IP üzerinden iletişim kurmasını sağlayan adres çeviri mekanizmasıdır." },
    { id: "cli", term: "CLI", definition: "Bilgisayarı metin komutlarıyla kontrol etmeyi sağlayan komut satırı arayüzüdür." },
    { id: "file-system", term: "File System", definition: "Dosya ve klasörlerin disk üzerinde nasıl saklandığını ve erişildiğini düzenleyen yapıdır." }
  ],
  practiceTasks: [
    {
      id: "draw-network-flow",
      title: "Draw a website request flow",
      description: "Tarayıcıya bir alan adı yazdığında DNS, IP, port ve server adımlarını basit bir şema olarak çiz.",
      estimatedMinutes: 20
    },
    {
      id: "cli-practice",
      title: "Create a CLI practice folder",
      description: "Terminal ile bir klasör oluştur, içine dosya ekle, listele, yeniden adlandır ve temizle.",
      estimatedMinutes: 25
    },
    {
      id: "profile-polish",
      title: "Polish your developer profile",
      description: "GitHub profil açıklamanı, profil fotoğrafını ve ilk README dosyanı düzenle.",
      estimatedMinutes: 30
    }
  ],};
