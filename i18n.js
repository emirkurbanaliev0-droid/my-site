// src/i18n.js - EXPANDED WITH FRENCH & TURKISH
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: { 
        home: "Home", 
        chat: "AI Tutor", 
        battle: "Battle", 
        network: "Network", 
        profile: "Profile",
        scholarships: "Scholarships",
        visa: "Visa Guide",
        deadlines: "Deadlines",
        exams: "Exam Hub",
        evaluation: "Evaluation",
        resources: "Resources"
      },
      common: {
        loading: "Loading...",
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        search: "Search",
        filter: "Filter",
        signIn: "Sign In",
        signOut: "Sign Out",
        signUp: "Sign Up"
      },
      auth: {
        welcomeBack: "Welcome back!",
        createAccount: "Create your account",
        email: "Email address",
        password: "Password",
        forgotPassword: "Forgot password?",
        noAccount: "Don't have an account?",
        hasAccount: "Already have an account?",
        continueWithGoogle: "Continue with Google"
      },
      profile: {
        title: "My Profile",
        personalInfo: "Personal Information",
        activities: "Activities & Achievements",
        academic: "Academic Records",
        testScores: "Test Scores"
      }
    }
  },
  ru: {
    translation: {
      nav: { 
        home: "Главная", 
        chat: "AI Тьютор", 
        battle: "Сравнение", 
        network: "Сеть", 
        profile: "Профиль",
        scholarships: "Стипендии",
        visa: "Визы",
        deadlines: "Дедлайны",
        exams: "Экзамены",
        evaluation: "Оценка",
        resources: "Ресурсы"
      },
      common: {
        loading: "Загрузка...",
        save: "Сохранить",
        cancel: "Отмена",
        delete: "Удалить",
        edit: "Редактировать",
        search: "Поиск",
        filter: "Фильтр",
        signIn: "Войти",
        signOut: "Выйти",
        signUp: "Регистрация"
      },
      auth: {
        welcomeBack: "С возвращением!",
        createAccount: "Создать аккаунт",
        email: "Email адрес",
        password: "Пароль",
        forgotPassword: "Забыли пароль?",
        noAccount: "Нет аккаунта?",
        hasAccount: "Уже есть аккаунт?",
        continueWithGoogle: "Войти через Google"
      },
      profile: {
        title: "Мой профиль",
        personalInfo: "Личная информация",
        activities: "Активности и достижения",
        academic: "Академические записи",
        testScores: "Результаты тестов"
      }
    }
  },
  kz: {
    translation: {
      nav: { 
        home: "Басты бет", 
        chat: "AI Тьютор", 
        battle: "Салыстыру", 
        network: "Желі", 
        profile: "Профиль",
        scholarships: "Гранттар",
        visa: "Виза",
        deadlines: "Мерзімдер",
        exams: "Емтихандар",
        evaluation: "Бағалау",
        resources: "Ресурстар"
      },
      common: {
        loading: "Жүктелуде...",
        save: "Сақтау",
        cancel: "Болдырмау",
        delete: "Жою",
        edit: "Өңдеу",
        search: "Іздеу",
        filter: "Сүзгі",
        signIn: "Кіру",
        signOut: "Шығу",
        signUp: "Тіркелу"
      },
      auth: {
        welcomeBack: "Қош келдіңіз!",
        createAccount: "Аккаунт жасау",
        email: "Email мекенжайы",
        password: "Құпия сөз",
        forgotPassword: "Құпия сөзді ұмыттыңыз ба?",
        noAccount: "Аккаунт жоқ па?",
        hasAccount: "Аккаунт бар ма?",
        continueWithGoogle: "Google арқылы кіру"
      },
      profile: {
        title: "Менің профилім",
        personalInfo: "Жеке ақпарат",
        activities: "Қызметтер мен жетістіктер",
        academic: "Академиялық жазбалар",
        testScores: "Тест нәтижелері"
      }
    }
  },
  
  // NEW: FRENCH
  fr: {
    translation: {
      nav: { 
        home: "Accueil", 
        chat: "Tuteur IA", 
        battle: "Comparaison", 
        network: "Réseau", 
        profile: "Profil",
        scholarships: "Bourses",
        visa: "Visa",
        deadlines: "Échéances",
        exams: "Examens",
        evaluation: "Évaluation",
        resources: "Ressources"
      },
      common: {
        loading: "Chargement...",
        save: "Enregistrer",
        cancel: "Annuler",
        delete: "Supprimer",
        edit: "Modifier",
        search: "Rechercher",
        filter: "Filtrer",
        signIn: "Se connecter",
        signOut: "Se déconnecter",
        signUp: "S'inscrire"
      },
      auth: {
        welcomeBack: "Bon retour!",
        createAccount: "Créer votre compte",
        email: "Adresse email",
        password: "Mot de passe",
        forgotPassword: "Mot de passe oublié?",
        noAccount: "Pas de compte?",
        hasAccount: "Vous avez déjà un compte?",
        continueWithGoogle: "Continuer avec Google"
      },
      profile: {
        title: "Mon profil",
        personalInfo: "Informations personnelles",
        activities: "Activités et réalisations",
        academic: "Dossier académique",
        testScores: "Résultats des tests"
      },
      ai_intro: "Bonjour! Je suis votre tuteur IA. Posez-moi des questions sur les universités, les examens ou les bourses.",
      details_btn: "Détails →",
      battle_title: "Bataille des universités",
      mentors_title: "Meilleurs mentors"
    }
  },
  
  // NEW: TURKISH
  tr: {
    translation: {
      nav: { 
        home: "Ana Sayfa", 
        chat: "Yapay Zeka Öğretmen", 
        battle: "Karşılaştır", 
        network: "Ağ", 
        profile: "Profil",
        scholarships: "Burslar",
        visa: "Vize",
        deadlines: "Son Tarihler",
        exams: "Sınavlar",
        evaluation: "Değerlendirme",
        resources: "Kaynaklar"
      },
      common: {
        loading: "Yükleniyor...",
        save: "Kaydet",
        cancel: "İptal",
        delete: "Sil",
        edit: "Düzenle",
        search: "Ara",
        filter: "Filtrele",
        signIn: "Giriş Yap",
        signOut: "Çıkış Yap",
        signUp: "Kayıt Ol"
      },
      auth: {
        welcomeBack: "Tekrar hoş geldiniz!",
        createAccount: "Hesap oluştur",
        email: "Email adresi",
        password: "Şifre",
        forgotPassword: "Şifremi unuttum?",
        noAccount: "Hesabınız yok mu?",
        hasAccount: "Zaten hesabınız var mı?",
        continueWithGoogle: "Google ile devam et"
      },
      profile: {
        title: "Profilim",
        personalInfo: "Kişisel bilgiler",
        activities: "Aktiviteler ve başarılar",
        academic: "Akademik kayıtlar",
        testScores: "Test sonuçları"
      },
      ai_intro: "Merhaba! Ben yapay zeka öğretmeninizim. Üniversiteler, sınavlar veya burslar hakkında bana soru sorun.",
      details_btn: "Detaylar →",
      battle_title: "Üniversite Karşılaştırması",
      mentors_title: "En İyi Mentorlar"
    }
  }
};

i18n.use(initReactI18next).init({
    resources,
    lng: "ru", // Default language
    fallbackLng: "en",
    interpolation: { escapeValue: false }
});

export default i18n;