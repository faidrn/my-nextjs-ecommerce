"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export const useTranslations = () => {
    const { language } = useLanguage();
    const [translation, setTranslation] = useState({});

    useEffect(() => {
        import(`../locales/${language}.json`)
            .then((data) => {
                setTranslation(data.default || data);
            })
            .catch(() => {
                console.error("Error cargando el archivo de idioma:", error);
                setTranslation({});
            });
    }, [language]);

    return translation;
};