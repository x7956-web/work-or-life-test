(function () {
  const copies = {
    card1: `第 1 张封面图\n\n顶部小字：\n想离开前，先看清自己卡在哪里\n\n主标题：\n你该换工作，\n还是换活法？\n\n副标题：\n很多问题，不是辞职能解决的。\n\n视觉：双门版原创封面。左边门写“换工作 / 继续上班”，门内统一成冷灰办公室小场景：高楼窗格、桌面电脑、待办板、文件堆和时钟，表达被工作系统塞满、重复和消耗。右边门写“换活法 / 调整生活”，门内统一成温暖生活小场景：阳光、窗外、绿植、书咖角落和向远处延伸的小路，表达松弛、呼吸感和重新开始。中间人物站在两扇门之间，比例更自然，带一点犹豫和选择感。`,
    card2: `凭第一直觉去选，不要犹豫～\n\n1 如果突然给你三个月带薪假期，\n你第一反应更像：\n\nA. 终于可以好好休息了\nB. 去一个陌生城市待一段时间\nC. 学点一直想学的东西\nD. 认真想想以后的人生\n\n2 最近让你最疲惫的事情更接近：\n\nA. 永远做不完的工作\nB. 不断处理别人的情绪\nC. 日复一日的重复生活\nD. 不知道自己为什么努力`,
    card3: `3 如果未来三年，\n你的生活和现在一模一样。\n你的第一感受是：\n\nA. 可以接受\nB. 有点不甘心\nC. 开始焦虑\nD. 有种喘不过气的感觉\n\n4 你最近最常出现的状态是：\n\nA. 身体累\nB. 情绪累\nC. 对什么都提不起劲\nD. 总觉得人生卡住了\n\n5 看到别人辞职、换城市、转行的时候，\n你心里的真实想法更像：\n\nA. 太冲动了\nB. 挺羡慕的\nC. 我也想试试\nD. 我好像早就想离开了`,
    body: `你该换工作，还是换活法？\n\n很多人以为自己想辞职，\n其实真正想换的可能不是公司，\n而是现在这种生活方式。\n\n如果你最近也有这些感觉：\n\n1. 一想到周一就开始抗拒\n2. 下班后连回消息都觉得累\n3. 看到别人转型又忍不住焦虑\n4. 觉得时间完全不属于自己\n\n那你可以先测一下：\n你是具体工作环境在消耗你，\n还是长期节奏已经透支，\n还是被外界机会刺激，\n还是整套生活结构都该调整。\n\n测完不是让你马上辞职，\n而是先看清楚：\n你到底该换什么。\n\n#测试话题 #性格测试 #趣味心理测试 #心理测试 #趣味测试 #人生选择题 #职业迷茫 #想辞职`
  };

  const originalRender = render;

  render = function () {
    if (isXhsPostRoute()) {
      document.querySelector("#app").innerHTML = renderXhsPost();
      return;
    }
    originalRender();
  };

  document.addEventListener("click", event => {
    const button = event.target.closest("[data-copy-post]");
    if (!button) return;
    copyText(copies[button.dataset.copyPost] || "");
  });

  function isXhsPostRoute() {
    return location.hash.replace(/^#\/?/, "").split("/").filter(Boolean)[0] === "xhs-post";
  }

  function renderXhsPost() {
    return `
      <main class="xhs-post-page">
        <header class="xhs-post-header">
          <div>
            <p>小红书三页图文素材</p>
            <h1>你该换工作，还是换活法？</h1>
          </div>
          <a href="#/test/work-or-life">查看测试</a>
        </header>

        <section class="xhs-material-block">
          ${renderCoverCard()}
          ${copyButton("card1")}
        </section>

        <section class="xhs-material-block">
          ${renderQuestionCard("02", "凭第一直觉去选，不要犹豫～", [
            ["如果突然给你三个月带薪假期，", "你第一反应更像：", ["终于可以好好休息了", "去一个陌生城市待一段时间", "学点一直想学的东西", "认真想想以后的人生"]],
            ["最近让你最疲惫的事情更接近：", "", ["永远做不完的工作", "不断处理别人的情绪", "日复一日的重复生活", "不知道自己为什么努力"]]
          ])}
          ${copyButton("card2")}
        </section>

        <section class="xhs-material-block">
          ${renderQuestionCard("03", "", [
            ["如果未来三年，", "你的生活和现在一模一样。你的第一感受是：", ["可以接受", "有点不甘心", "开始焦虑", "有种喘不过气的感觉"]],
            ["你最近最常出现的状态是：", "", ["身体累", "情绪累", "对什么都提不起劲", "总觉得人生卡住了"]],
            ["看到别人辞职、换城市、转行的时候，", "你心里的真实想法更像：", ["太冲动了", "挺羡慕的", "我也想试试", "我好像早就想离开了"]]
          ], true)}
          ${copyButton("card3")}
        </section>

        <section class="xhs-copy-panel">
          <h2>小红书正文</h2>
          <p>你该换工作，还是换活法？</p>
          <p>很多人以为自己想辞职，其实真正想换的可能不是公司，而是现在这种生活方式。</p>
          <p>测完不是让你马上辞职，而是先看清楚：你到底该换什么。</p>
          <h2>话题标签</h2>
          <p class="xhs-tags">#测试话题 #性格测试 #趣味心理测试 #心理测试 #趣味测试 #人生选择题 #职业迷茫 #想辞职</p>
          <button class="xhs-copy-btn" type="button" data-copy-post="body">复制正文和话题</button>
        </section>
      </main>
    `;
  }

  function renderCoverCard() {
    return `
      <article class="xhs-card xhs-cover-card" aria-label="小红书双门封面图">
        <div class="xhs-topline">想离开前，先看清自己卡在哪里</div>
        <div class="xhs-cover-title">你该换工作，<br>还是换活法？</div>
        <div class="xhs-cover-subtitle">很多问题，不是辞职能解决的。</div>
        <div class="xhs-cover-visual" aria-hidden="true">
          <div class="xhs-door xhs-work-door">
            <span class="xhs-door-label"><b>换工作</b><small>继续上班</small></span>
            <span class="xhs-office-window"><i></i><i></i><i></i><i></i></span>
            <span class="xhs-office-desk"></span>
            <span class="xhs-office-monitor"></span>
            <span class="xhs-task-board"><i></i><i></i><i></i></span>
            <span class="xhs-file-block"></span>
            <span class="xhs-clock-face"></span>
            <span class="xhs-work-pressure"></span>
          </div>
          <div class="xhs-choice-person">
            <span class="xhs-person-head"></span>
            <span class="xhs-person-body"></span>
            <span class="xhs-person-bag"></span>
            <span class="xhs-person-leg is-left"></span>
            <span class="xhs-person-leg is-right"></span>
          </div>
          <div class="xhs-door xhs-life-door">
            <span class="xhs-door-label"><b>换活法</b><small>调整生活</small></span>
            <span class="xhs-light-arch"></span>
            <span class="xhs-sun"></span>
            <span class="xhs-life-window"></span>
            <span class="xhs-tree"><i></i></span>
            <span class="xhs-life-corner"></span>
            <span class="xhs-life-path"></span>
          </div>
        </div>
        <div class="xhs-bottom-note">1 分钟看懂：你想离开的冲动，来自哪里</div>
      </article>
    `;
  }

  function renderQuestionCard(pageNo, intro, questions, compact = false) {
    return `
      <article class="xhs-card xhs-question-card ${compact ? "is-compact" : ""}" aria-label="测试题 ${pageNo}">
        ${intro ? `<div class="xhs-prompt">${intro}</div>` : ""}
        <div class="xhs-question-list">
          ${questions.map((question, index) => renderQuestion(index + (pageNo === "02" ? 1 : 3), question)).join("")}
        </div>
      </article>
    `;
  }

  function renderQuestion(number, question) {
    const [line1, line2, options] = question;
    return `
      <div class="xhs-question-item">
        <h2><span>${number}</span>${line1}</h2>
        ${line2 ? `<h3>${line2}</h3>` : ""}
        <ol class="xhs-options">
          ${options.map((option, index) => `<li><b>${["A", "B", "C", "D"][index]}.</b>${option}</li>`).join("")}
        </ol>
      </div>
    `;
  }

  function copyButton(key) {
    return `<button class="xhs-copy-btn" type="button" data-copy-post="${key}">复制本页文案</button>`;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => showXhsToast("文案已复制"));
      return;
    }
    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "readonly");
    input.style.position = "fixed";
    input.style.left = "-9999px";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    showXhsToast("文案已复制");
  }

  function showXhsToast(text) {
    const oldToast = document.querySelector(".xhs-toast");
    if (oldToast) oldToast.remove();
    const toast = document.createElement("div");
    toast.className = "xhs-toast";
    toast.textContent = text;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1600);
  }

  render();
})();