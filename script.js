// script.js — общая логика для всех страниц
document.addEventListener("DOMContentLoaded", () => {
  // Подсветка активной страницы в навигации
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === currentPath || (currentPath === "index.html" && link.getAttribute("href") === "./")) {
      link.classList.add("active");
    }
  });

  // Год в футере
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Заполнение соцсетей из settings.js
  const socialLinks = document.querySelectorAll(".social-link[data-target]");
  socialLinks.forEach(link => {
    const key = link.dataset.target;
    if (SITE_CONFIG.socials[key]) link.href = SITE_CONFIG.socials[key];
  });

  // Рендер проектов (только на projects.html)
  const projectsGrid = document.getElementById("projects-grid");
  if (projectsGrid && SITE_CONFIG.projects) {
    projectsGrid.innerHTML = "";
    SITE_CONFIG.projects.forEach(proj => {
      const coverHTML = proj.cover 
        ? `<img src="${proj.cover}" alt="${proj.title}">` 
        : `<span>Нет обложки</span>`;
      
      const card = document.createElement("article");
      card.className = "project-card";
      card.innerHTML = `
        <div class="project-cover">${coverHTML}</div>
        <div class="project-content">
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-desc">${proj.description}</p>
          <a href="${proj.downloadUrl}" class="download-btn" download>Скачать</a>
        </div>
      `;
      projectsGrid.appendChild(card);
    });
  }

  // Загрузка ленты (только на feed.html)
  const feedContainer = document.getElementById("feed-container");
  if (feedContainer && SITE_CONFIG.telegramUsername) {
    const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://t.me/s/${SITE_CONFIG.telegramUsername}`;
    loadTelegramFeed(feedContainer, rssUrl);
  }
});

async function loadTelegramFeed(container, url) {
  container.innerHTML = `<div class="feed-status">Загрузка публикаций...</div>`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.status !== "ok" || !data.items?.length) throw new Error("Нет данных");
    
    container.innerHTML = "";
    data.items.slice(0, 10).forEach(post => {
      const el = document.createElement("article");
      el.className = "post";
      el.innerHTML = `
        <div class="post-date">${new Date(post.pubDate).toLocaleDateString("ru-RU")}</div>
        <div class="post-text">${post.description?.replace(/<[^>]*>/g, "").slice(0, 250)}...</div>
      `;
      container.appendChild(el);
    });
  } catch (e) {
    container.innerHTML = `<div class="feed-status">Не удалось загрузить ленту. Проверьте, что канал публичный, или обновите settings.js.</div>`;
    console.error("Feed load error:", e);
  }
}
