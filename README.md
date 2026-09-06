# 🍕 Next Pizza

Веб-приложение для заказа пиццы, разработанное на **Next.js и TypeScript**.

### 🚀 Demo

[Открыть приложение](https://next-pizza-brown-seven.vercel.app/)

### ✨ Возможности

* Каталог пицц и ингредиентов
* Настройка состава и размера пиццы
* Корзина с сохранением выбранных ингредиентов
* Регистрация и авторизация
* Оформление заказа
* Валидация форм
* Адаптивный интерфейс
* Админская роль

### 🛠️ Стек

* Next.js 14, React, TypeScript
* Zustand
* Tailwind CSS, Radix UI
* React Hook Form, Zod
* NextAuth
* Prisma, PostgreSQL
* Axios
* Vercel

### 🏗️ Архитектура

Проект использует **Next.js App Router**, Server/Client Components и Route Handlers.

Состояние корзины — **Zustand**, работа с БД — **Prisma + PostgreSQL**, авторизация — **NextAuth**.

### ▶️ Запуск

```bash
git clone https://github.com/codeRangerProj/next-pizza.git
cd next-pizza
npm install
npm run dev
```

Для работы приложения необходимо настроить переменные окружения и подключить PostgreSQL.

