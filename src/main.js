import "./styles.css";
import { test } from "./testData.js";

const keys = ["A", "B", "C", "D"];
const app = document.querySelector("#app");

const state = {
  route: parseRoute(),
  quiz: { index: 0, answers: {} },
  selected: "",
  modal: "",
  toast: ""
};

window.addEventListener("hashchange", () => {
  state.route = parseRoute();
  state.selected = "";
  render();
  requestAnimationFrame(() => window.scrollTo(0, 0));
});

document.addEventListener("click", event => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "home") navigate("/");
  if (action === "start") startQuiz();
  if (action === "answer") chooseAnswer(target.dataset.key);
  if (action === "share") openShare();
  if (action === "restart") startQuiz();
  if (action === "close-modal") closeModal(event, target);
  if (action === "copy-share") copyShare();
});

function parseRoute() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  return {
    page: parts[0] || "home",
    slug: parts[1] || "",
    step: parts[2] || ""
  };
}

function navigate(path) {
  location.hash = path;
}

function startQuiz() {
  state.quiz = { index: 0, answers: {} };
  state.selected = "";
  sessionStorage.removeItem(`answers:${test.slug}`);
  navigate(`/test/${test.slug}/quiz`);
}

function chooseAnswer(key) {
  const question = getQuestions()[state.quiz.index];
  state.selected = key;
  state.quiz.answers[question.id] = key;
  render();

  setTimeout(() => {
    if (state.quiz.index < test.questions.length - 1) {
      state.quiz.index += 1;
      state.selected = "";
      render();
      return;
    }
    sessionStorage.setItem(`answers:${test.slug}`, JSON.stringify(state.quiz.answers));
    navigate(`/test/${test.slug}/loading`);
    render();
    setTimeout(() => navigate(`/test/${test.slug}/result`), 2600);
  }, 260);
}

function getQuestions() {
  return test.questions.map((item, index) => ({
    id: index + 1,
    module: `${item[0]}诊断`,
    text: item[1],
    options: keys.map((key, optionIndex) => ({ key, text: item[2][optionIndex] }))
  }));
}

function computeResult() {
  const stored = sessionStorage.getItem(`answers:${test.slug}`);
  const answers = stored ? JSON.parse(stored) : state.quiz.answers;
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  Object.values(answers).forEach(key => {
    if (counts[key] !== undefined) counts[key] += 1;
  });

  const ranked = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const totalAnswered = Object.values(counts).reduce((sum, value) => sum + value, 0);
  const topCount = ranked[0][1];
  const secondCount = ranked[1][1];
  const margin = topCount - secondCount;
  const primary = topCount > 0 ? ranked[0][0] : "B";
  const secondary = secondCount > 0 && margin <= 4 ? ranked[1][0] : null;
  const confidence = totalAnswered
    ? Math.min(96, Math.round(54 + (topCount / totalAnswered) * 28 + margin * 2.2))
    : 58;
  const data = test.resultTypes[primary];
  const displayScore = Math.round(data.score * 0.68 + confidence * 0.32);
  const dynamicRadar = calculateRadar(counts, primary, confidence, Math.max(1, totalAnswered));
  return { counts, primary, secondary, data, totalAnswered, confidence, displayScore, dynamicRadar };
}

function calculateRadar(counts, primary, confidence, total) {
  return [
    ["环境消耗度", Math.min(96, Math.round(35 + (counts.A / total) * 55 + (primary === "A" ? 6 : 0)))],
    ["能量透支度", Math.min(96, Math.round(35 + (counts.B / total) * 55 + (primary === "B" ? 6 : 0)))],
    ["外界刺激度", Math.min(96, Math.round(35 + (counts.C / total) * 55 + (primary === "C" ? 6 : 0)))],
    ["生活重排需求", Math.min(96, Math.round(35 + (counts.D / total) * 55 + (primary === "D" ? 6 : 0)))],
    ["行动清晰度", confidence]
  ];
}

function render() {
  const { page, step, slug } = state.route;
  if (page === "xhs-studio") {
    app.innerHTML = renderStudioSourceBridge();
    return;
  }
  if (page === "xhs-post") {
    app.innerHTML = renderStudioSourceBridge("小红书三页图文素材页", "CloudBase 静态构建版本会渲染完整三页素材预览。");
    return;
  }
  if (page === "xhs-product") {
    app.innerHTML = renderStudioSourceBridge("商品详情页素材页", "CloudBase 静态构建版本会渲染完整商品主图、详情正文和发货话术。");
    return;
  }
  if (page !== "test") {
    app.innerHTML = renderHome();
    return;
  }
  if (slug !== test.slug) {
    app.innerHTML = renderHome();
    return;
  }
  if (step === "quiz") app.innerHTML = renderQuiz();
  else if (step === "loading") app.innerHTML = renderLoading();
  else if (step === "result") app.innerHTML = renderResult();
  else app.innerHTML = renderCover();
}

function shell(content) {
  return `
    <div class="shell">
      <header class="topbar">
        <button class="brand reset-btn" type="button" data-action="home">
          <span class="mark">测</span>
          <span>答案箱测试</span>
        </button>
        <span class="top-note">32 Questions</span>
      </header>
      ${content}
    </div>
    ${state.modal ? renderModal() : ""}
    ${state.toast ? `<div class="toast">${escapeHtml(state.toast)}</div>` : ""}
  `;
}

function renderHome() {
  return shell(`
    <section class="view cover">
      <div class="cover-panel">
        <div class="eyebrow">career decision test</div>
        <h1>${test.title}</h1>
        <p class="cover-subtitle">${test.hook}</p>
        <div class="dimension-list">
          ${test.dimensions.map(item => `<span>${item}</span>`).join("")}
        </div>
        <button class="solid-btn" type="button" data-action="start">开始测试</button>
        <p class="notice">32 Questions · 4 Dimensions · 4 Outcomes<br>结果仅供个人反思参考</p>
      </div>
    </section>
  `);
}

function renderCover() {
  return renderHome();
}

function renderStudioSourceBridge(title = "小红书素材工作台", note = "完整工作台由 npm run build 同步 src/xhsStudio* 到 dist 后运行。") {
  return `
    <main class="source-studio-page">
      <section class="source-studio-card">
        <p class="eyebrow">xhs material studio</p>
        <h1>${title}</h1>
        <p>${note}</p>
        <div class="source-studio-actions">
          <a href="#/xhs-studio">素材工作台</a>
          <a href="#/test/work-or-life">正式测试页</a>
        </div>
      </section>
    </main>
  `;
}

function renderQuiz() {
  const questions = getQuestions();
  const question = questions[state.quiz.index] || questions[0];
  const progress = Math.round(((state.quiz.index + 1) / questions.length) * 100);
  return shell(`
    <section class="view">
      <div class="progress-wrap">
        <div class="progress-meta">
          <span>${String(state.quiz.index + 1).padStart(2, "0")} / ${questions.length}</span>
          <span>${question.module}</span>
        </div>
        <div class="progress"><span style="--value:${progress}%"></span></div>
      </div>
      <div class="question-card">
        <div class="question-index">${String(question.id).padStart(2, "0")}</div>
        <h1>${question.text}</h1>
        <div class="answers">
          ${question.options.map(option => `
            <button class="answer-btn ${state.selected === option.key ? "selected" : ""}" type="button" data-action="answer" data-key="${option.key}">
              <span class="answer-key">${option.key}</span>
              <span class="answer-text">${option.text}</span>
            </button>
          `).join("")}
        </div>
      </div>
      <p class="small-note">选择后自动进入下一题</p>
    </section>
  `);
}

function renderLoading() {
  const lines = [
    "正在交叉校验 32 道选择信号……",
    "正在识别你的主倾向与副倾向……",
    "正在计算四个维度的稳定性……",
    "正在生成完整诊断报告……"
  ];
  return shell(`
    <section class="loading-view">
      <div class="loader"></div>
      <div class="loading-text">${lines[Math.floor(Date.now() / 700) % lines.length]}</div>
      <div class="progress"><span style="--value:76%"></span></div>
    </section>
  `);
}

function renderResult() {
  const result = computeResult();
  const data = result.data;
  const secondaryText = result.secondary
    ? `你还有明显的「${test.resultAxis[keys.indexOf(result.secondary)]}」副倾向，说明这个问题可以用双路径验证，不必一次性押注。`
    : "";
  return shell(`
    <section class="view">
      <div class="result-head">
        <div class="result-label">${result.totalAnswered || 32}题综合诊断</div>
        <h1>${data.typeName}</h1>
        <p>${data.subtitle}</p>
        ${renderGauge(result.displayScore)}
        <div class="diagnosis-meta">
          <span>主倾向：${test.resultAxis[keys.indexOf(result.primary)]}</span>
          <span>置信度：${result.confidence}%</span>
        </div>
        <div class="index-bars">${data.indices.map(item => renderBar(item[0], item[1])).join("")}</div>
        <div class="quote">${data.conclusion}</div>
        ${secondaryText ? `<p class="secondary-note">${secondaryText}</p>` : ""}
      </div>
      ${section(1, "四维倾向分布", renderTendencyBars(result))}
      ${section(2, "你真正需要改变什么", renderChoiceMap(result.primary))}
      ${section(3, "当前卡点诊断", `<p class="body-text">${data.diagnosis}</p>`)}
      ${section(4, "你真正想要的东西", `<p class="body-text">${data.want}</p>`)}
      ${section(5, "两条路径对比", `<div class="compare-grid"><div><h3>继续原方式</h3><p>${data.compareLeft}</p></div><div><h3>调整后路径</h3><p>${data.compareRight}</p></div></div>`)}
      ${section(6, "能力雷达图", renderRadar(result.dynamicRadar))}
      ${section(7, "当前最不建议做什么", renderList(data.notRecommended))}
      ${section(8, "未来 90 天验证方案", renderPlan(data.plan))}
      ${section(9, "诊断书", `<p class="body-text">诊断关键词：${data.keyword}<br>最适合动作：${data.plan[0][0]} · ${data.plan[1][0]} · ${data.plan[2][0]}<br><br>${data.closing}</p>`)}
      <div class="actions">
        <button class="solid-btn" type="button" data-action="share">分享结果</button>
        <button class="plain-btn" type="button" data-action="restart">重新测试</button>
      </div>
      <p class="small-note">本测试属于趣味型职业探索内容，结果仅供参考。</p>
    </section>
  `);
}

function section(num, title, content) {
  return `<article class="report-section"><div class="section-title"><span>${String(num).padStart(2, "0")}</span><h2>${title}</h2></div>${content}</article>`;
}

function renderGauge(score) {
  const dash = 251.2;
  const offset = dash * (1 - score / 100);
  return `
    <div class="gauge">
      <svg viewBox="0 0 200 118" aria-label="路径清晰度 ${score}">
        <path d="M 20 98 A 80 80 0 0 1 180 98" fill="none" stroke="#d2dae3" stroke-width="13"></path>
        <path d="M 20 98 A 80 80 0 0 1 180 98" fill="none" stroke="var(--accent)" stroke-width="13" stroke-dasharray="${dash}" stroke-dashoffset="${offset}"></path>
      </svg>
      <div class="gauge-score">${score}</div>
      <div class="gauge-caption">路径清晰度</div>
    </div>
  `;
}

function renderBar(label, value) {
  return `<div class="bar-row"><span>${label}</span><span class="bar-track"><span class="bar-fill" style="--value:${value}%"></span></span><span>${value}%</span></div>`;
}

function renderTendencyBars(result) {
  const total = Math.max(1, result.totalAnswered);
  return `
    <p class="body-text">系统会根据 32 道题中四类信号的累计强度判断主结果；如果第二倾向接近，会在报告顶部提示副倾向。</p>
    <div class="index-bars">
      ${keys.map((key, index) => {
        const percent = Math.round((result.counts[key] / total) * 100);
        return renderBar(`${test.resultAxis[index]} · ${cleanTypeName(test.resultTypes[key].typeName)}`, percent);
      }).join("")}
    </div>
  `;
}

function renderChoiceMap(primary) {
  return `<div class="choice-map">${keys.map((key, index) => `<div class="choice-cell ${primary === key ? "active" : ""}">${test.resultAxis[index]}</div>`).join("")}</div>`;
}

function renderRadar(items) {
  const cx = 140;
  const cy = 140;
  const max = 92;
  const points = items.map((item, index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / items.length;
    const radius = (item[1] / 100) * max;
    return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius];
  });
  const polygon = points.map(point => point.join(",")).join(" ");
  const rings = [0.25, 0.5, 0.75, 1].map(scale => {
    const ringPoints = items.map((_, index) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index) / items.length;
      return `${cx + Math.cos(angle) * max * scale},${cy + Math.sin(angle) * max * scale}`;
    }).join(" ");
    return `<polygon points="${ringPoints}" fill="none" stroke="#d2dae3" stroke-width="1"></polygon>`;
  }).join("");
  const labels = items.map((item, index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / items.length;
    return `<text x="${cx + Math.cos(angle) * 118}" y="${cy + Math.sin(angle) * 118}" text-anchor="middle" dominant-baseline="middle">${item[0]}</text>`;
  }).join("");
  return `<div class="radar-wrap"><svg viewBox="0 0 280 280">${rings}<polygon points="${polygon}" fill="var(--accent)" fill-opacity="0.18" stroke="var(--accent)" stroke-width="2"></polygon>${points.map(point => `<circle cx="${point[0]}" cy="${point[1]}" r="3"></circle>`).join("")}${labels}</svg></div>`;
}

function renderList(items) {
  return `<div class="list">${items.map(item => `<div class="list-item"><span>×</span><span>${item}</span></div>`).join("")}</div>`;
}

function renderPlan(phases) {
  return `<div class="plan">${phases.map((phase, index) => `<div class="phase"><span>${index + 1}</span><div><h3>${phase[0]}</h3><p>${phase[1]}</p></div></div>`).join("")}</div>`;
}

function openShare() {
  const result = computeResult();
  state.modal = `我测出了：${test.title}\n\n${result.data.typeName}\n${result.data.subtitle}\n\n关键词：${result.data.keyword}\n\n${location.href}`;
  render();
}

function renderModal() {
  return `<div class="modal-backdrop" data-action="close-modal"><div class="modal"><h2>分享你的结果</h2><div class="share-copy">${escapeHtml(state.modal)}</div><div class="modal-actions"><button class="solid-btn" type="button" data-action="copy-share">复制文案</button><button class="plain-btn" type="button" data-action="close-modal">关闭</button></div></div></div>`;
}

function closeModal(event, target) {
  if (target.classList.contains("modal-backdrop") && event.target !== target) return;
  state.modal = "";
  render();
}

function copyShare() {
  const text = state.modal || "";
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showToast("分享文案已复制"));
    return;
  }
  showToast("请长按复制分享文案");
}

function showToast(text) {
  state.toast = text;
  render();
  setTimeout(() => {
    state.toast = "";
    render();
  }, 1800);
}

function cleanTypeName(typeName) {
  return typeName.replace(/型$/g, "");
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[char]));
}

render();
