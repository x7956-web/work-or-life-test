const test = {
  slug: "work-or-life",
  accent: "#2563eb",
  title: "你该换工作，还是换活法？",
  subtitle: "判断你的不满来自岗位、节奏、赛道，还是人生结构本身。",
  hook: "很多人以为自己想辞职，其实想换的是生活的组织方式。",
  dimensions: ["工作痛苦来源", "能量恢复方式", "机会反应", "长期期待"],
  resultAxis: ["换岗位", "换节奏", "换赛道", "换活法"],
  questions: [
    ["工作痛苦来源", "周一早上最让你抗拒的通常是？", ["想到要面对某些人和具体任务", "想到一整周又没有喘息空间", "想到别人好像都有新进展", "想到这种日子还会一直重复"]],
    ["工作痛苦来源", "你最常在什么时刻想离开？", ["职责突然变多，却没人说清楚", "下班后连回消息都觉得累", "刷到别人做了新的选择时", "发现时间完全不属于自己时"]],
    ["工作痛苦来源", "你对现在最不舒服的点是？", ["每天卡在具体协作和流程里", "人一直绷着，怎么睡都不够", "总怕自己还在原地打转", "生活被工作挤得没剩多少"]],
    ["工作痛苦来源", "最近一次情绪上来是因为什么？", ["又遇到同一个人或同类破事", "太久没有完整放松过", "看到同龄人已经走到前面", "突然觉得自己没有选择空间"]],
    ["能量恢复方式", "休息两天后，你通常会怎样？", ["只要不回到那个环境就轻松些", "睡够后又能重新处理工作", "一看相关内容又开始不安", "还是不想回到原来的日程里"]],
    ["能量恢复方式", "让你恢复最快的方式是？", ["远离那些具体消耗我的场景", "连续几晚睡好，少被打扰", "暂时不看别人的进度和成绩", "有一天能完全按自己安排来"]],
    ["能量恢复方式", "状态稍微好转时，你会想？", ["也许换个团队会舒服很多", "我只是太久没真正休息了", "我得先弄清那些选择适不适合", "我想重新安排每天怎么过"]],
    ["能量恢复方式", "假期结束前，你最明显的感受是？", ["不想回去面对那套配合方式", "还没缓过来，又要开始硬撑", "别人假期好像都在推进新事", "不想继续被固定日程推着走"]],
    ["对机会的反应", "看到一个不错的新机会，你会先想？", ["它每天具体要和谁配合", "我现在有没有精力接得住", "它是不是很多人都在尝试", "它能不能让生活更有弹性"]],
    ["对机会的反应", "朋友建议你试试新方向时，你更像？", ["先问日常工作到底做什么", "先担心自己会不会更累", "马上去搜很多案例对比", "想它会不会改变时间安排"]],
    ["对机会的反应", "你最容易被哪类内容吸引？", ["真实工作日常和团队氛围", "减少内耗和恢复精力的方法", "普通人重新选择后的经历", "弹性工作和多收入来源"]],
    ["对机会的反应", "面对热门机会，你最常出现的是？", ["想知道落到每天会有多烦", "觉得现在没余力再折腾", "兴奋几天后又开始怀疑自己", "想借它打开另一种生活可能"]],
    ["对当前工作的真实感受", "如果只看工作内容本身，你觉得？", ["内容还行，但当前位置很拧巴", "并不讨厌，只是人快被耗空了", "说不上讨厌，但总怕落后", "内容不是核心，生活状态才是"]],
    ["对当前工作的真实感受", "别人问你“还喜欢这行吗”，你会说？", ["这行可以，但现在这里不太行", "等我缓过来，可能还能继续", "我也不确定，外面变化太快了", "我更在意它把日子变成什么样"]],
    ["对当前工作的真实感受", "你对已有经验的态度更接近？", ["不想浪费，只想换个好发挥的地方", "有积累，但最近状态撑不起它", "怕继续做下去会越来越被动", "希望它能换来更自由的安排"]],
    ["对当前工作的真实感受", "如果现在压力少掉一半，你会？", ["还要看人和职责会不会变", "明显愿意再观察一段时间", "还是会惦记外面的可能性", "仍想调整收入和生活安排"]],
    ["决策触发点", "最容易让你下决心改变的是？", ["边界一次次被打破", "身体和状态一直恢复不过来", "发现别人已经开始往前走了", "越来越受不了被安排的感觉"]],
    ["决策触发点", "你最近最常对自己说的是？", ["不能一直待在这种配合关系里", "我得先把状态养回来", "我是不是又慢了一步", "我想要更多自己说了算的空间"]],
    ["决策触发点", "哪件事最容易压垮你？", ["需求反复变，还没人讲清楚", "休息时间也随时被工作打断", "信息越看越觉得自己走偏了", "每天都没有一点自主安排"]],
    ["决策触发点", "你真正想先解决的问题是？", ["别再被模糊职责来回拉扯", "先让自己睡好、缓过来", "确认那些新选择适不适合我", "重新分配时间、收入和生活重心"]],
    ["风险承受与行动方式", "如果只能先做一个小动作，你会？", ["约聊同领域不同团队的人", "先减少加班和无效消耗", "用两周试一个小项目", "慢慢搭一条工作外的副线"]],
    ["风险承受与行动方式", "你比较能接受的改变方式是？", ["保留经验，换到更清楚的位置", "先把生活规律拉回来再判断", "先试一小步，不急着全押", "分阶段调整收入和时间结构"]],
    ["风险承受与行动方式", "你最不愿意冒的风险是？", ["又进到同样消耗人的环境", "还没恢复就做更大的决定", "被热闹带着走，最后没结果", "为了改变把基本生活弄乱"]],
    ["风险承受与行动方式", "你会怎样判断一个选择值不值？", ["看协作和边界是否清楚", "看它会不会让我更可持续", "看有没有真实反馈证明可行", "看它能否增加弹性和选择"]],
    ["长期期待", "你希望一年后的自己更像？", ["待在一个更顺手的位置上", "工作稳定，人也不再被掏空", "终于知道哪条路值得试", "生活有更多可选择的安排"]],
    ["长期期待", "你最想拥有的安全感来自？", ["职责清楚，合作舒服", "有余力工作，也有余力生活", "知道自己不是盲目跟着跑", "不只靠单一工作支撑生活"]],
    ["长期期待", "你想让工作变成什么样？", ["少一点拉扯，多一点清晰", "忙也可以，但不能一直透支", "能给我真实反馈，不只是想象", "能配合我想要的生活方式"]],
    ["长期期待", "你最想摆脱的循环是？", ["同样的人和事反复消耗我", "累到麻木，再靠周末回血", "看见新可能就心动，看完又慌", "每天都被固定轨道推着走"]],
    ["最不想继续承受的状态", "哪种状态你最不想再忍？", ["明明会做，却总被环境拖住", "醒来就累，做什么都提不起劲", "每天被新信息弄得心里发虚", "没时间经营工作以外的人生"]],
    ["最不想继续承受的状态", "你最怕五年后还在重复什么？", ["处理同样混乱的任务关系", "靠硬撑维持表面正常", "一直比较，一直没有行动证据", "赚钱、时间和生活都缺少弹性"]],
    ["最不想继续承受的状态", "最近最让你心累的声音是？", ["这事怎么又变成我的了", "我真的需要停一下", "他们是不是都开始做别的了", "我不想一直被这样安排"]],
    ["最不想继续承受的状态", "做完测试后，你最想看清什么？", ["是不是具体环境在消耗我", "是不是该先恢复状态再决定", "我是在真实想尝试，还是被影响", "我该从哪里重新安排生活"]]
  ],
  resultTypes: {
    A: {
      typeName: "岗位错配型",
      subtitle: "你真正该换的可能是具体工作环境",
      keyword: "精准换岗",
      score: 78,
      indices: [["岗位适配", 32], ["环境消耗", 86], ["赛道保留", 71]],
      radar: [["环境消耗度", 86], ["能量透支度", 42], ["外界刺激度", 48], ["生活重排需求", 50], ["行动清晰度", 72]],
      conclusion: "你不是完全不适合现在的方向，而是当前岗位、团队、职责或管理方式正在持续消耗你。",
      diagnosis: "你对工作本身并非完全失去兴趣，但每次想到具体上班场景，身体先开始抗拒。你的卡点更像局部错配：环境、边界、任务结构或上级风格让你很难发挥。",
      want: "你想换的不是人生，而是一个不再反复消耗你的具体位置。",
      compareLeft: "继续忍下去会让你把局部问题误判成整个人生问题。",
      compareRight: "精准换岗能保留经验，同时减少无谓消耗。",
      notRecommended: ["裸辞后再想方向", "把所有行业都否定", "只看薪资不看任务结构", "继续用忍耐证明成熟"],
      plan: [["拆解消耗", "写下最消耗你的三个具体场景。"], ["寻找替代", "筛选同赛道但任务结构不同的岗位。"], ["小步谈判", "先谈边界、职责或内部转岗，再决定离开。"]],
      closing: "你不一定要推翻过去。先把真正消耗你的东西找准，很多答案会变得简单。"
    },
    B: {
      typeName: "节奏失衡型",
      subtitle: "你累的不是工作，而是没有恢复系统",
      keyword: "重建节奏",
      score: 64,
      indices: [["职业适配", 68], ["恢复能力", 29], ["倦怠风险", 88]],
      radar: [["环境消耗度", 52], ["能量透支度", 91], ["外界刺激度", 45], ["生活重排需求", 48], ["行动清晰度", 65]],
      conclusion: "你现在最需要的不是立刻换工作，而是先把工作和生活的边界重新建起来。",
      diagnosis: "你对未来仍有期待，但长期高压让你误以为自己已经不适合。很多节奏失衡型的人，一休息就有灵感，一上班就想逃。",
      want: "你想要的其实是可持续的生活，而不是永远处在透支状态。",
      compareLeft: "继续用硬扛解决问题，职业判断会越来越失真。",
      compareRight: "先恢复体力和边界，再做职业选择，成功率更高。",
      notRecommended: ["在疲惫峰值做大决定", "用熬夜换安全感", "把休息当作不努力", "用新工作逃避旧节奏"],
      plan: [["降噪七天", "暂停非必要输入，先恢复睡眠和饮食。"], ["重设边界", "明确哪些任务必须拒绝或延后。"], ["复盘判断", "能量恢复后再判断是否真的要离开。"]],
      closing: "先把自己从透支里带回来。很多职业答案，只有在不累的时候才看得清。"
    },
    C: {
      typeName: "赛道焦虑型",
      subtitle: "你被外界机会刺激，但还没有形成清晰判断",
      keyword: "停止乱比",
      score: 49,
      indices: [["外界刺激", 91], ["真实兴趣", 45], ["验证程度", 34]],
      radar: [["环境消耗度", 45], ["能量透支度", 52], ["外界刺激度", 92], ["生活重排需求", 46], ["行动清晰度", 49]],
      conclusion: "你确实想改变，但这种冲动里有很大一部分来自比较、风口和信息过载。",
      diagnosis: "你看到别人转行、副业、创业，会立刻怀疑自己是不是选错了。问题是，你看到了别人的结果，却没有看到代价和路径。",
      want: "你想换的不是工作，而是对未来的确定感。",
      compareLeft: "继续比较会让你不断推翻自己，却没有真正行动。",
      compareRight: "用小成本验证替代幻想，才能知道自己是否真的适合。",
      notRecommended: ["因为别人赚钱而重来", "把风口当热爱", "边刷边焦虑", "一次性否定所有积累"],
      plan: [["停止输入", "减少职业博主、风口内容和成功案例刺激。"], ["真实验证", "挑一个方向做 14 天小项目。"], ["记录证据", "只根据行动反馈，而不是情绪做决定。"]],
      closing: "焦虑喜欢想象，成长需要证据。先验证，再改变。"
    },
    D: {
      typeName: "生活重构型",
      subtitle: "你该换的不只是工作，而是整套活法",
      keyword: "重排人生",
      score: 86,
      indices: [["生活错位", 92], ["职业弹性", 74], ["重构必要", 88]],
      radar: [["环境消耗度", 56], ["能量透支度", 54], ["外界刺激度", 58], ["生活重排需求", 92], ["行动清晰度", 86]],
      conclusion: "你的不满已经超出岗位层面。你真正想改变的是时间分配、城市关系、收入结构和生活主控感。",
      diagnosis: "你不是单纯讨厌某份工作，而是越来越无法接受这种生活方式。你想要更多自主权、弹性和意义感。",
      want: "你想换的是人生结构：怎么赚钱、怎么生活、怎么安排自己的时间。",
      compareLeft: "只换工作可能短暂缓解，但核心矛盾还会回来。",
      compareRight: "从收入结构、时间结构和城市结构一起重排，才更接近答案。",
      notRecommended: ["只靠换公司解决全部问题", "马上清零重来", "没有现金流就裸奔", "把自由想得太轻松"],
      plan: [["盘点结构", "写下收入、时间、城市、人际四个结构。"], ["设计副线", "建立一个低风险的第二收入或项目。"], ["分阶段迁移", "先改变 20%，再决定是否彻底转身。"]],
      closing: "你要的不是逃离，而是重新拥有生活的主导权。"
    }
  }
};

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
