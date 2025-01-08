"use client"

import React, { useEffect } from "react";

const Ads = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6432516335953538";
    script.async = true;
    script.crossOrigin = "anonymous";

    document.body.appendChild(script);

    return () => {
      // Eliminar el script cuando el componente se desmonte
      document.body.removeChild(script);
    };
  }, []);

  return null; // Este componente no renderiza nada visual
};

export default Ads;
