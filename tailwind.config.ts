import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6', // Violet 500
          dark: '#6D28D9',    // Violet 700
          light: '#C4B5FD',   // Violet 300
        },
        accent: {
          DEFAULT: '#38BDF8', // Sky 400
          dark: '#0EA5E9',    // Sky 500
        },
        dark: '#1E1B4B',
        'bg-purple': '#F5F3FF', // Violet 50
        'bg-blue': '#F0F9FF',   // Sky 50
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'purple': '0 4px 14px 0 rgba(107, 33, 168, 0.25)',
        'card': '0 2px 15px 0 rgba(30, 27, 75, 0.08)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
        'gradient-accent': 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
        'gradient-hero': 'linear-gradient(135deg, #8B5CF6 0%, #38BDF8 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
