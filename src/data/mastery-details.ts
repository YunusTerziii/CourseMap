import type { MasteryBlock } from "@/types/week";

export const masteryDetails: Record<string, Record<string, MasteryBlock[]>> = {
  "week-5": {
    "c-intro": [
      {
        title: "C programının en küçük çalışan iskeleti",
        paragraphs: [
          "C'de program genellikle bir veya daha fazla kaynak dosyadan oluşur. Başlangıç seviyesinde en önemli dosya .c uzantılı kaynak dosyadır. Derleyici bu dosyayı okur, makinenin çalıştırabileceği biçime çevirir ve sonuçta executable üretilir.",
          "#include satırı hazır kütüphaneleri programa dahil eder. stdio.h, printf ve scanf gibi temel giriş/çıkış fonksiyonlarını kullanabilmek için eklenir. main fonksiyonu programın başlangıç noktasıdır; işletim sistemi programı çalıştırdığında kontrol önce main içine gelir."
        ],
        codeLanguage: "c",
        code: `#include <stdio.h>

int main(void) {
    printf("Hello, CE103!\\n");
    return 0;
}`,
        bullets: [
          "#include <stdio.h>: standart giriş/çıkış kütüphanesini dahil eder.",
          "int main(void): programın başladığı fonksiyondur ve int sonuç döndürür.",
          "printf(...): ekrana metin yazar.",
          "\\n: yeni satıra geçmek için kullanılır.",
          "return 0: programın başarıyla bittiğini bildirir."
        ]
      },
      {
        title: "Kaynak koddan executable'a giden yol",
        paragraphs: [
          "C kodu doğrudan işlemci tarafından çalıştırılmaz. Önce preprocessor #include ve #define gibi yönergeleri işler. Sonra compiler C kodunu nesne koduna çevirir. Linker, kullanılan kütüphaneleri ve nesne dosyalarını birleştirir. Sonuçta çalıştırılabilir dosya oluşur.",
          "Bir hata compilation aşamasında çıkıyorsa syntax, tip veya eksik tanım problemi olabilir. Linking aşamasında çıkıyorsa fonksiyon bildirimi var ama gerçek tanımı bulunamıyor olabilir. Bu ayrımı bilmek hata ayıklamayı hızlandırır."
        ],
        bullets: [
          "Preprocessing: #include, #define gibi yönergeler işlenir.",
          "Compilation: C kodu nesne koduna çevrilir.",
          "Linking: nesne dosyaları ve kütüphaneler birleştirilir.",
          "Execution: oluşan program işletim sistemi tarafından çalıştırılır."
        ]
      }
    ],
    "c-variables": [
      {
        title: "Değişken nasıl tanımlanır?",
        paragraphs: [
          "Değişken, bellekte bir değeri saklamak için isim verdiğin alandır. C'de değişken kullanmadan önce tipini söylemen gerekir. Çünkü derleyici bellekte ne kadar yer ayrılacağını ve değerin nasıl yorumlanacağını tipe göre belirler.",
          "Tanımlama üç parçadan oluşur: tip, değişken adı ve isteğe bağlı başlangıç değeri. Başlangıç değeri verilmezse yerel değişkenin değeri belirsiz olabilir; bu yüzden başlangıç seviyesinde değişkenleri tanımlarken değer vermek iyi alışkanlıktır."
        ],
        codeLanguage: "c",
        code: `int age = 20;
float average = 82.5f;
double preciseValue = 3.14159;
char grade = 'A';`,
        bullets: [
          "int: tam sayılar için kullanılır.",
          "float/double: ondalıklı sayılar için kullanılır; double daha yüksek hassasiyet sunar.",
          "char: tek karakter tutar ve tek tırnakla yazılır.",
          "Değişken adı rakamla başlamaz; anlamlı ve okunabilir olmalıdır."
        ]
      },
      {
        title: "Atama, karşılaştırma ve format specifier",
        paragraphs: [
          "C'de = operatörü atama yapar; yani sağdaki değeri soldaki değişkene koyar. == ise iki değeri karşılaştırır. Başlangıçta en sık yapılan hatalardan biri if içinde yanlışlıkla = kullanmaktır.",
          "printf ile değişken yazdırırken format specifier kullanılır. Format specifier, yazdırılacak değerin tipini belirtir. Yanlış specifier kullanmak uyarı, bozuk çıktı veya beklenmeyen davranış üretebilir."
        ],
        codeLanguage: "c",
        code: `int score = 85;

printf("Score: %d\\n", score);

if (score == 85) {
    printf("Exact match\\n");
}`,
        bullets: [
          "%d: int yazdırmak için kullanılır.",
          "%f: float/double yazdırmak için kullanılır.",
          "%c: char yazdırmak için kullanılır.",
          "= değeri değiştirir, == sadece karşılaştırır."
        ]
      }
    ],
    "c-control-flow": [
      {
        title: "if / else nasıl yazılır?",
        paragraphs: [
          "if, bir koşul doğruysa belirli kod bloğunu çalıştırır. Koşul yanlışsa else if ile başka koşullar denenebilir veya else ile kalan tüm durumlar yakalanabilir. Koşul parantez içine yazılır; çalışacak kod bloğu süslü parantez içine alınır.",
          "Koşul ifadesi sıfırsa false, sıfır değilse true kabul edilir. Ancak okunabilirlik için koşulu açık yazmak daha iyidir. Örneğin score >= 60 ifadesi, sadece score yazmaktan daha anlaşılırdır."
        ],
        codeLanguage: "c",
        code: `int score = 72;

if (score >= 90) {
    printf("AA\\n");
} else if (score >= 60) {
    printf("Passed\\n");
} else {
    printf("Failed\\n");
}`,
        bullets: [
          "if yalnız başına kullanılabilir.",
          "else if birden fazla koşulu sırayla test eder.",
          "else hiçbir koşul sağlanmazsa çalışır.",
          "Süslü parantez kullanmak tek satırda bile daha güvenli ve okunabilirdir."
        ]
      },
      {
        title: "switch nasıl yazılır ve ne zaman kullanılır?",
        paragraphs: [
          "switch, aynı değişkenin belirli sabit değerlere göre farklı davranış üretmesi gerektiğinde okunabilir bir seçenektir. Her case belirli bir değeri temsil eder. break yazılmazsa program bir sonraki case içine düşmeye devam edebilir; buna fall-through denir.",
          "switch genellikle int, char veya enum gibi ayrık değerlerde kullanılır. Aralık kontrolü gerekiyorsa, örneğin score >= 60 gibi, if/else daha uygundur."
        ],
        codeLanguage: "c",
        code: `char command = 's';

switch (command) {
    case 's':
        printf("Save\\n");
        break;
    case 'q':
        printf("Quit\\n");
        break;
    default:
        printf("Unknown command\\n");
        break;
}`,
        bullets: [
          "case: belirli değeri yakalar.",
          "break: switch bloğundan çıkar.",
          "default: hiçbir case eşleşmezse çalışır.",
          "Aralık karşılaştırmaları için switch değil if/else tercih edilir."
        ]
      },
      {
        title: "for, while ve do-while farkı",
        paragraphs: [
          "for döngüsü genellikle tekrar sayısı belli olduğunda kullanılır. while döngüsü, tekrar sayısından çok koşul devam ettiği sürece çalışması gereken durumlarda uygundur. do-while ise koşul en sonda kontrol edildiği için bloğu en az bir kez çalıştırır.",
          "Döngülerde en kritik nokta, koşulun bir noktada false olacak şekilde değişmesidir. Sayaç artırılmazsa veya koşulu değiştiren işlem unutulursa sonsuz döngü oluşabilir."
        ],
        codeLanguage: "c",
        code: `for (int i = 0; i < 5; i++) {
    printf("%d\\n", i);
}

int passwordOk = 0;
while (passwordOk == 0) {
    printf("Try again\\n");
    passwordOk = 1;
}`,
        bullets: [
          "for: başlangıç, koşul ve güncelleme tek satırda görülür.",
          "while: koşul başta kontrol edilir.",
          "do-while: gövde en az bir kez çalışır.",
          "break döngüden çıkar, continue o turu atlayıp sonraki tura geçer."
        ]
      }
    ],
    "c-functions": [
      {
        title: "Fonksiyon nasıl yazılır?",
        paragraphs: [
          "Fonksiyon, belirli bir işi yapan ve gerektiğinde tekrar çağrılabilen kod bloğudur. C'de fonksiyonun dönüş tipi, adı, parametre listesi ve gövdesi vardır. Parametreler fonksiyonun dışarıdan aldığı değerlerdir; return ise dışarıya sonuç döndürür.",
          "Fonksiyon yazarken hedef tek bir işi net yapmak olmalıdır. Hem veri okuyup hem hesaplayıp hem de ekrana yazan büyük fonksiyonlar yerine, hesaplama ve ekrana yazma gibi görevleri ayırmak daha temizdir."
        ],
        codeLanguage: "c",
        code: `int sum(int a, int b) {
    return a + b;
}

int main(void) {
    int result = sum(3, 4);
    printf("%d\\n", result);
    return 0;
}`,
        bullets: [
          "int sum(...): fonksiyon int değer döndürür.",
          "int a, int b: parametrelerdir.",
          "return a + b: sonucu çağıran yere gönderir.",
          "void dönüş tipi, fonksiyonun değer döndürmediğini belirtir."
        ]
      }
    ]
  },
  "week-6": {
    "cpp-variables": [
      {
        title: "C++ değişken, literal ve const mantığı",
        paragraphs: [
          "C++'ta değişkenler tip ile tanımlanır. Literal, kodun içine doğrudan yazılan değerdir. const ise değişmemesi gereken değeri korumak için kullanılır. Bu üç kavramı ayırmak, tip sistemini anlamanın ilk adımıdır.",
          "Bir değerin program boyunca değişmeyeceğini biliyorsan const kullanmak hem hatayı azaltır hem kodu okuyana niyetini gösterir."
        ],
        codeLanguage: "cpp",
        code: `int age = 19;              // age değişken, 19 literal
const double PI = 3.14159; // PI sabit değer
bool isActive = true;
char letter = 'A';`,
        bullets: [
          "Değişken değeri daha sonra değişebilir.",
          "Literal doğrudan yazılan sabit değerdir.",
          "const değişkenin yeniden atanmasını engeller.",
          "C++ büyük/küçük harfe duyarlıdır: age ve Age farklı isimlerdir."
        ]
      }
    ],
    "cpp-types-io": [
      {
        title: "cin ve cout ile console input/output",
        paragraphs: [
          "cout ekrana çıktı göndermek için, cin kullanıcıdan giriş almak için kullanılır. İkisi de iostream kütüphanesiyle gelir. << operatörü output yönünü, >> operatörü input yönünü gösterir.",
          "Kullanıcıdan alınan veri değişkenin tipine uygun olmalıdır. int bekleyen bir cin içine metin girilirse input stream hata durumuna geçebilir; bu daha ileri seviyede input validation konusu olarak ele alınır."
        ],
        codeLanguage: "cpp",
        code: `#include <iostream>
using namespace std;

int main() {
    int age;
    cout << "Age: ";
    cin >> age;
    cout << "You are " << age << " years old." << endl;
    return 0;
}`,
        bullets: [
          "#include <iostream>: cin/cout için gereklidir.",
          "<< output akışına veri gönderir.",
          ">> input akışından veri okur.",
          "endl yeni satıra geçer ve stream'i flush eder."
        ]
      }
    ],
    "cpp-operators": [
      {
        title: "Operatör türleri ve expression",
        paragraphs: [
          "Operatörler değerler üzerinde işlem yapar. Aritmetik operatörler hesaplama, karşılaştırma operatörleri doğru/yanlış sonucu, mantıksal operatörler ise birden fazla koşulu birleştirme için kullanılır.",
          "Expression, hesaplandığında bir değer üreten ifadedir. Örneğin a + b bir expression'dır; score >= 60 da bool sonuç üreten bir expression'dır."
        ],
        codeLanguage: "cpp",
        code: `int a = 10;
int b = 3;

int sum = a + b;
int remainder = a % b;
bool passed = sum >= 10 && remainder == 1;`,
        bullets: [
          "+, -, *, /, % aritmetik operatörlerdir.",
          ">, <, >=, <=, ==, != karşılaştırma operatörleridir.",
          "&& ve, || veya, ! değil anlamına gelir.",
          "Karmaşık ifadelerde parantez kullanmak niyeti netleştirir."
        ]
      }
    ],
    "cpp-flow-functions": [
      {
        title: "C++ if, switch, loop ve function birlikte nasıl kullanılır?",
        paragraphs: [
          "C++'ta akış kontrolü C'ye çok benzer. if/else koşula göre karar verir, switch sabit seçenekleri ayırır, for/while tekrar kurar. Fonksiyonlar ise bu davranışları anlamlı parçalara böler.",
          "Temiz yaklaşım, kullanıcıdan veri alma, hesaplama ve sonucu yazdırma adımlarını ayrı düşünmektir. Böylece kod büyüdüğünde hangi parçanın ne yaptığı anlaşılır kalır."
        ],
        codeLanguage: "cpp",
        code: `#include <iostream>
using namespace std;

string gradeLabel(int score) {
    if (score >= 90) return "Excellent";
    if (score >= 60) return "Passed";
    return "Failed";
}

int main() {
    for (int i = 0; i < 3; i++) {
        int score;
        cin >> score;
        cout << gradeLabel(score) << endl;
    }
    return 0;
}`,
        bullets: [
          "Fonksiyon, not yorumlama davranışını ayrı yere taşır.",
          "for döngüsü üç öğrencinin notunu okumak için kullanılır.",
          "if zinciri aralık kontrolü yaptığı için switch yerine daha uygundur.",
          "return fonksiyon sonucunu çağıran yere verir."
        ]
      }
    ]
  },
  "week-7": {
    "csharp-hello": [
      {
        title: "C# Hello World satır satır",
        paragraphs: [
          "C# programları class yapısı içinde yazılır. Programın başlangıç noktası Main metodudur. Namespace kodu mantıksal olarak gruplar; using satırları ise başka namespace'lerdeki hazır sınıfları kısa adla kullanmayı sağlar.",
          "static void Main(string[] args) ifadesinde static, program başlamadan nesne oluşturmadan çağrılabileceğini; void değer döndürmediğini; string[] args ise komut satırı argümanlarını temsil eder."
        ],
        codeLanguage: "csharp",
        code: `using System;

namespace CE103 {
    class Program {
        static void Main(string[] args) {
            Console.WriteLine("Hello, C#");
        }
    }
}`,
        bullets: [
          "using System: Console sınıfını kullanmayı kolaylaştırır.",
          "namespace CE103: kodu mantıksal alanda toplar.",
          "class Program: program kodunu taşıyan sınıftır.",
          "Console.WriteLine: ekrana yazı yazar ve yeni satıra geçer."
        ]
      }
    ],
    "csharp-types": [
      {
        title: "C# değişken, tip güvenliği ve dönüşüm",
        paragraphs: [
          "C# tip güvenli bir dildir. Değişken hangi tipte tanımlandıysa o tipe uygun değer tutmalıdır. Bu sayede derleyici birçok hatayı program çalışmadan önce yakalar.",
          "Console.ReadLine her zaman string döndürür. Sayı gerekiyorsa int.Parse, double.Parse veya TryParse gibi dönüşüm yöntemleri kullanılır. Başlangıç seviyesinde bu ayrım çok önemlidir."
        ],
        codeLanguage: "csharp",
        code: `string name = "Ada";
int age = 20;
double gpa = 3.45;
bool isActive = true;

string input = Console.ReadLine();
int number = int.Parse(input);`,
        bullets: [
          "string çift tırnakla yazılan metindir.",
          "char tek tırnakla yazılan tek karakterdir.",
          "bool sadece true veya false değerlerini alır.",
          "ReadLine sonucu sayı gibi görünse bile önce string olarak gelir."
        ]
      }
    ],
    "csharp-flow": [
      {
        title: "C# if, switch, for, foreach ve while",
        paragraphs: [
          "if/else koşullu kararlar için kullanılır. switch belirli değer seçeneklerini daha düzenli yazmak için uygundur. for sayaçlı tekrarlar için, while koşul devam ettiği sürece çalışacak tekrarlar için, foreach ise koleksiyon elemanlarını tek tek gezmek için kullanılır.",
          "C#'ta switch case sonunda break yazmak çoğu durumda zorunludur. foreach kullanırken koleksiyonun her elemanı geçici bir değişkene alınır; bu, diziler ve listeler için çok okunabilir bir döngü sağlar."
        ],
        codeLanguage: "csharp",
        code: `int score = 75;

if (score >= 60) {
    Console.WriteLine("Passed");
} else {
    Console.WriteLine("Failed");
}

string command = "save";
switch (command) {
    case "save":
        Console.WriteLine("Saved");
        break;
    default:
        Console.WriteLine("Unknown");
        break;
}

int[] numbers = { 1, 2, 3 };
foreach (int number in numbers) {
    Console.WriteLine(number);
}`,
        bullets: [
          "if aralık ve mantıksal koşullarda uygundur.",
          "switch belirli sabit seçeneklerde okunabilirlik sağlar.",
          "for indeks veya sayaç gerektiğinde kullanılır.",
          "foreach koleksiyon gezmek için temiz bir seçenektir.",
          "while koşul false olana kadar çalışır."
        ]
      }
    ],
    "csharp-comments-io": [
      {
        title: "Yorumlar ve console etkileşimi",
        paragraphs: [
          "Yorum satırları programın çalışmasını değiştirmez; kodu okuyan insana niyeti anlatır. İyi yorum, kodun zaten söylediği şeyi tekrarlamaz; neden bu kararın verildiğini açıklar.",
          "Console.ReadLine kullanıcıdan metin alır. Console.Write ve Console.WriteLine çıktı verir; WriteLine çıktıdan sonra yeni satıra geçer, Write aynı satırda kalır."
        ],
        codeLanguage: "csharp",
        code: `// Kullanıcıdan yaş bilgisini alıyoruz çünkü kategori hesaplayacağız.
Console.Write("Age: ");
string input = Console.ReadLine();
int age = int.Parse(input);

Console.WriteLine("Age category will be calculated.");`,
        bullets: [
          "// tek satır yorumdur.",
          "/* ... */ çok satırlı yorum yazmak için kullanılır.",
          "Console.Write aynı satırda kalır.",
          "Console.WriteLine yazdıktan sonra yeni satıra geçer."
        ]
      }
    ]
  },
  "week-8": {
    "java-data-types": [
      {
        title: "Java primitive ve referans tip farkı",
        paragraphs: [
          "Java'da primitive tipler doğrudan temel değerleri temsil eder: int, double, char, boolean gibi. Referans tipler ise nesnelere işaret eder. String en sık kullanılan referans tiplerden biridir.",
          "Bu fark ileride nesne yönelimli programlamada çok önemli olur. Primitive değişken değerin kendisini tutar gibi düşünülür; referans değişken ise bellekteki nesneye erişim sağlar."
        ],
        codeLanguage: "java",
        code: `int age = 20;
double gpa = 3.40;
char grade = 'A';
boolean active = true;
String name = "Ada";`,
        bullets: [
          "int tam sayı tutar.",
          "double ondalıklı sayı tutar.",
          "char tek karakter tutar.",
          "boolean true/false tutar.",
          "String metin için kullanılır ve primitive değildir."
        ]
      }
    ],
    "java-operators-io": [
      {
        title: "Java input/output ve operatörler",
        paragraphs: [
          "Java'da console input almak için başlangıç seviyesinde Scanner sık kullanılır. Scanner System.in üzerinden kullanıcı girdisini okur. Çıktı için System.out.println veya System.out.print kullanılır.",
          "Operatörler C ailesine benzer: aritmetik operatörler hesaplama, karşılaştırma operatörleri boolean sonuç, mantıksal operatörler birden fazla koşulu birleştirme için kullanılır."
        ],
        codeLanguage: "java",
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int a = scanner.nextInt();
        int b = scanner.nextInt();
        System.out.println(a + b);
    }
}`,
        bullets: [
          "import java.util.Scanner: Scanner sınıfını dahil eder.",
          "new Scanner(System.in): klavyeden giriş okuyacak nesne oluşturur.",
          "nextInt(): int değer okur.",
          "System.out.println(): ekrana çıktı verir ve yeni satıra geçer."
        ]
      }
    ],
    "java-flow": [
      {
        title: "Java if, switch, for, enhanced for ve while",
        paragraphs: [
          "Java'da if/else koşula göre karar verir. switch sabit seçenekleri ayırır. for sayaçlı tekrarlar için, while koşul devam ettiği sürece tekrar için kullanılır. Enhanced for, dizi veya koleksiyon elemanlarını tek tek gezmek için kullanılır.",
          "Switch içinde break unutulursa klasik switch yapısında sonraki case'lere geçme davranışı oluşabilir. Bu yüzden başlangıç seviyesinde her case sonuna break yazmak güvenli alışkanlıktır."
        ],
        codeLanguage: "java",
        code: `int score = 75;

if (score >= 60) {
    System.out.println("Passed");
} else {
    System.out.println("Failed");
}

int day = 1;
switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    default:
        System.out.println("Other day");
        break;
}

int[] values = {1, 2, 3};
for (int value : values) {
    System.out.println(value);
}`,
        bullets: [
          "if aralık ve mantıksal koşullarda kullanılır.",
          "switch belirli değer seçeneklerinde kullanılır.",
          "for klasik sayaçlı döngüdür.",
          "for-each dizileri ve koleksiyonları gezmek için okunabilirdir.",
          "while koşul doğru olduğu sürece çalışır."
        ]
      }
    ],
    "java-comments-blocks": [
      {
        title: "Expression, statement, block, scope ve comment",
        paragraphs: [
          "Expression bir değer üretir. Statement bir işi gerçekleştiren komuttur. Block süslü parantezler arasındaki kod grubudur. Scope, bir değişkenin nereden erişilebilir olduğunu belirleyen kapsamdır.",
          "Yorumlar kodun çalışmasını değiştirmez. Tek satırlı yorum // ile, çok satırlı yorum /* ... */ ile yazılır. JavaDoc tarzı yorumlar daha ileri seviyede API dokümantasyonu üretmek için kullanılabilir."
        ],
        codeLanguage: "java",
        code: `int x = 10 + 5; // 10 + 5 bir expression'dır.

if (x > 10) {
    int localValue = x * 2;
    System.out.println(localValue);
}

// localValue burada kullanılamaz; scope if bloğuyla sınırlıdır.`,
        bullets: [
          "Expression değer üretir.",
          "Statement bir komut veya işlem satırıdır.",
          "Block kodu süslü parantezlerle gruplar.",
          "Scope değişkenin geçerli olduğu alanı belirler.",
          "Comment insan için açıklamadır, derleyici çalıştırmaz."
        ]
      }
    ]
  }
};

export function getMasteryDetails(weekId: string, sectionId: string) {
  return masteryDetails[weekId]?.[sectionId] ?? [];
}
