// Loads events from data/events.json, filters overdue events,
// shows up to 6 upcoming events and provides a "näytä lisää" button.
(function () {
  function parseLocalDate(dateStr) {
    if (!dateStr) return null;
    const iso = dateStr.trim();
    const ymd = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (ymd) {
      return new Date(Number(ymd[1]), Number(ymd[2]) - 1, Number(ymd[3]));
    }
    const d = new Date(iso);
    return isNaN(d) ? null : d;
  }

  function formatDateLocal(d) {
    if (!d) return "";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  }

  function toYMD(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  }

  function linkifyText(text) {
    const fragment = document.createDocumentFragment();
    const urlRegex = /https?:\/\/[\w\-./?&=%#]+/g;
    let lastIndex = 0;
    let match;
    while ((match = urlRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }
      const anchor = document.createElement("a");
      anchor.href = match[0];
      anchor.target = "_blank";
      anchor.rel = "noreferrer noopener";
      anchor.textContent = match[0];
      fragment.appendChild(anchor);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
    return fragment;
  }

  async function initEvents() {
    const listEl = document.getElementById("eventList");
    const footerEl = document.getElementById("eventsFooter");
    if (!listEl) return;

    const lang = document.documentElement.lang || localStorage.getItem("squashoulu-lang") || "fi";
    const i18n = {
      fi: {
        noEvents: "Ei tapahtumia.",
        noUpcoming: "Ei tulevia tapahtumia.",
        showMore: "näytä lisää",
        untitled: "(Ilman otsikkoa)",
      },
      en: {
        noEvents: "No events.",
        noUpcoming: "No upcoming events.",
        showMore: "show more",
        untitled: "(Untitled)",
      },
    };
    const msg = i18n[lang] || i18n.fi;

    let events = [];
    try {
      const res = await fetch("data/events.json");
      if (!res.ok) throw new Error(`Failed to load events: ${res.status}`);
      events = await res.json();
      if (!Array.isArray(events)) events = [];
    } catch (err) {
      console.warn(err);
      listEl.innerHTML = `<p class="muted">${msg.noEvents}</p>`;
      return;
    }

    const today = new Date();
    const todayYMD = toYMD(new Date(today.getFullYear(), today.getMonth(), today.getDate()));

    // Map, parse dates, filter overdue, and sort
    const processed = events
      .map((ev) => {
        const d = parseLocalDate(ev.date);
        return Object.assign({}, ev, { __date: d, __ymd: d ? toYMD(d) : null });
      })
      .filter((ev) => ev.__date && ev.__ymd >= todayYMD)
      .sort((a, b) => a.__date - b.__date);

    if (processed.length === 0) {
      listEl.innerHTML = `<p class="muted">${msg.noUpcoming}</p>`;
      return;
    }

    const initialCount = 6;
    let shown = 0;

    function renderRange(start, end) {
      const fragment = document.createDocumentFragment();
      for (let i = start; i < end && i < processed.length; i++) {
        const ev = processed[i];
        const article = document.createElement("article");
        article.className = "event-card";
        const h4 = document.createElement("h4");
        const title = lang === "en" && ev.title_en ? ev.title_en : ev.title;
        h4.textContent = title || msg.untitled;
        const time = document.createElement("time");
        time.setAttribute("datetime", ev.date || "");
        time.textContent = formatDateLocal(ev.__date);
        const desc = document.createElement("p");
        const description = lang === "en" && ev.description_en ? ev.description_en : ev.description;
        if (description) {
          desc.appendChild(linkifyText(description));
        }
        article.appendChild(h4);
        article.appendChild(time);
        article.appendChild(desc);
        fragment.appendChild(article);
      }
      listEl.appendChild(fragment);
      shown = Math.min(end, processed.length);
    }

    // initial render
    listEl.innerHTML = "";
    renderRange(0, Math.min(initialCount, processed.length));

    // show more button
    footerEl.innerHTML = "";
    if (processed.length > shown) {
      const btn = document.createElement("button");
      btn.id = "showMoreEvents";
      btn.className = "link-button";
      btn.textContent = msg.showMore;
      btn.addEventListener("click", () => {
        renderRange(shown, processed.length);
        btn.style.display = "none";
      });
      footerEl.appendChild(btn);
    }
  }

  // Expose initializer
  window.initEvents = initEvents;
})();
